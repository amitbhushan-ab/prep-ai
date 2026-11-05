/**
 * PrepAI Unified AI Service
 * Supports Google Gemini API & Groq Cloud API
 * Native fetch is used (Node 18+) without requiring external heavyweight SDKs.
 */

const { findBestManualMatch, generateStructuredAnswer } = require('./knowledgeBase');

// Model candidate chains (in priority order for automatic fallback)
const GROQ_CANDIDATE_MODELS = [
  "llama-3.1-8b-instant",       // Universal free tier on 100% of Groq accounts, blazing 800+ tok/s
  "llama-3.3-70b-versatile",    // Newer 70B if enabled on account
  "llama3-70b-8192",            // Standard 70B
  "mixtral-8x7b-32768",         // High-context MoE
  "gemma2-9b-it"                // Google Gemma on Groq
];

const GEMINI_CANDIDATE_MODELS = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest",
  "gemini-2.0-flash",
  "gemini-1.5-pro"
];

/**
 * Call Google Gemini REST API with automatic model fallback
 */
async function callGemini({ apiKey, model, systemPrompt, userMessage, history = [] }) {
  const modelsToTry = model ? [model, ...GEMINI_CANDIDATE_MODELS.filter(m => m !== model)] : GEMINI_CANDIDATE_MODELS;
  let lastError = null;

  // Build contents payload
  const contents = [];
  if (Array.isArray(history) && history.length > 0) {
    for (const msg of history.slice(-6)) {
      const role = (msg.sender === 'user' || msg.role === 'user') ? 'user' : 'model';
      const text = msg.text || msg.content || '';
      if (text) {
        contents.push({ role, parts: [{ text }] });
      }
    }
  }
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  for (const currentModel of modelsToTry) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${apiKey}`;
    const payload = {
      contents,
      generationConfig: {
        temperature: 0.3,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    };
    if (systemPrompt) {
      payload.systemInstruction = { parts: [{ text: systemPrompt }] };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMessage = errorData.error?.message || `Gemini status ${response.status}`;
        lastError = new Error(`Gemini (${currentModel}): ${errMessage}`);
        // If 404 or model not found, continue to next model
        if (response.status === 404 || errMessage.toLowerCase().includes("not found")) {
          continue;
        }
        throw lastError;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("Gemini returned empty text or was filtered.");
      }

      return {
        text: text.trim(),
        provider: 'gemini',
        model: currentModel
      };
    } catch (err) {
      lastError = err;
      if (err.message.includes("not found") || err.message.includes("404")) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error("Failed to contact Gemini with available models.");
}

/**
 * Call Groq OpenAI-Compatible Chat Completions REST API with automatic model fallback
 */
async function callGroq({ apiKey, model, systemPrompt, userMessage, history = [] }) {
  const url = 'https://api.groq.com/openai/v1/chat/completions';
  const modelsToTry = model ? [model, ...GROQ_CANDIDATE_MODELS.filter(m => m !== model)] : GROQ_CANDIDATE_MODELS;

  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }

  if (Array.isArray(history) && history.length > 0) {
    for (const msg of history.slice(-6)) {
      const role = (msg.sender === 'user' || msg.role === 'user') ? 'user' : 'assistant';
      const content = msg.text || msg.content || '';
      if (content) {
        messages.push({ role, content });
      }
    }
  }
  messages.push({ role: 'user', content: userMessage });

  let lastError = null;

  for (const currentModel of modelsToTry) {
    const payload = {
      model: currentModel,
      messages,
      temperature: 0.3,
      max_tokens: 2048
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errMessage = errorData.error?.message || `Groq status ${response.status}`;
        lastError = new Error(`Groq (${currentModel}): ${errMessage}`);

        // If the model does not exist or user doesn't have access, try the next model in the candidate chain!
        if (
          errMessage.toLowerCase().includes("does not exist") ||
          errMessage.toLowerCase().includes("access to it") ||
          errMessage.toLowerCase().includes("decommissioned") ||
          response.status === 404
        ) {
          console.warn(`[PrepAI] Groq model '${currentModel}' not accessible, falling back to next model...`);
          continue;
        }

        throw lastError;
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      if (!text) {
        throw new Error("Groq returned an empty response.");
      }

      return {
        text: text.trim(),
        provider: 'groq',
        model: currentModel
      };
    } catch (err) {
      lastError = err;
      if (
        err.message.toLowerCase().includes("does not exist") ||
        err.message.toLowerCase().includes("access to it") ||
        err.message.toLowerCase().includes("decommissioned")
      ) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error("Failed to contact Groq with available models.");
}

/**
 * Generate smart contextual follow-up questions from the query & response
 */
function generateFollowUps(topic, query) {
  const qLower = query.toLowerCase();
  if (qLower.includes('code') || qLower.includes('algorithm') || qLower.includes('complexity')) {
    return [
      "Can we optimize the space complexity further?",
      "What are the edge cases (null, empty, duplicates)?",
      "Show how to write unit tests for this in Jest / PyTest"
    ];
  }
  if (qLower.includes('math') || qLower.includes('calculus') || qLower.includes('equation') || qLower.includes('integral')) {
    return [
      "Show an alternative shortcut formula",
      "How was this tested in previous year exam papers?",
      "What are common student pitfalls in this derivation?"
    ];
  }
  return [
    `Give a real exam question on ${topic || 'this concept'}`,
    "Explain this with a simple real-world analogy",
    "Summarize this in a 3-bullet revision note"
  ];
}

/**
 * Main dispatcher: picks Gemini or Groq based on available keys and user selection
 */
async function generateAiTutorResponse({
  message,
  topic = "General Subject",
  mode = "explain",
  examCategory = "entrance",
  history = [],
  apiKey,
  provider = "auto"
}) {
  let effectiveProvider = provider;
  let effectiveKey = (apiKey || "").trim();

  const envGeminiKey = (process.env.GEMINI_API_KEY || "").trim();
  const envGroqKey = (process.env.GROQ_API_KEY || "").trim();

  // If user passed a key directly, detect provider if "auto"
  if (effectiveKey && effectiveProvider === "auto") {
    effectiveProvider = effectiveKey.startsWith("gsk_") ? "groq" : "gemini";
  }

  // If no user key passed, check environment variables
  if (!effectiveKey) {
    if (effectiveProvider === "groq" && envGroqKey) {
      effectiveKey = envGroqKey;
    } else if (effectiveProvider === "gemini" && envGeminiKey) {
      effectiveKey = envGeminiKey;
    } else if (envGeminiKey) {
      effectiveProvider = "gemini";
      effectiveKey = envGeminiKey;
    } else if (envGroqKey) {
      effectiveProvider = "groq";
      effectiveKey = envGroqKey;
    }
  }

  // Build high-precision System Prompt based on Mode
  let systemPrompt = `You are PrepAI, an elite AI Academic, Engineering and Competitive Examination Tutor.
Category context: ${examCategory}. Topic: ${topic}.
Always follow these rules:
1. Provide accurate, clear, and mathematically rigorous explanations.
2. Use markdown formatting: bold key principles, use clean bullet points, and wrap code in \`\`\`language blocks.
3. For mathematical formulas, use KaTeX/LaTeX formatting ($...$ for inline, $$...$$ for display).
4. Keep the tone encouraging, intellectual, and focused on exam mastery without unnecessary fluff.`;

  if (mode === "hint") {
    systemPrompt += `\nCRITICAL: Mode is "HINT ONLY". Do NOT reveal the full solution or final answer yet. Provide a concise Socratic clue or suggest which physical law/theorem/invariant to inspect.`;
  } else if (mode === "topper") {
    systemPrompt += `\nCRITICAL: Mode is "TOPPER SHORTCUT". Deliver high-speed elimination techniques, dimensional analysis tricks, memory mnemonics, and practical 30-second solving methods used by Rank 1 exam toppers.`;
  } else {
    systemPrompt += `\nCRITICAL: Mode is "STEP-BY-STEP EXPLANATION". Break down the problem logically: (1) Governing Principles, (2) Step-by-Step Derivation/Solution, (3) Key Pitfalls to Avoid.`;
  }

  // If we have an active key, make the real LLM call
  if (effectiveKey) {
    try {
      let result;
      if (effectiveProvider === "groq") {
        result = await callGroq({
          apiKey: effectiveKey,
          systemPrompt,
          userMessage: message,
          history
        });
      } else {
        result = await callGemini({
          apiKey: effectiveKey,
          systemPrompt,
          userMessage: message,
          history
        });
      }

      return {
        response: result.text,
        suggestedQuestions: generateFollowUps(topic, message),
        provider: result.provider,
        model: result.model,
        isLiveAi: true
      };
    } catch (err) {
      console.warn(`[PrepAI] Real AI call failed (${effectiveProvider}):`, err.message);
      return {
        response: `⚠️ **AI Service Notice**: Real API call to ${effectiveProvider.toUpperCase()} failed: \`${err.message}\`\n\n*Falling back to PrepAI Local Tutor Engine:*\n\n` +
          getLocalFallbackResponse(message, topic, mode),
        suggestedQuestions: generateFollowUps(topic, message),
        provider: 'fallback',
        model: 'local-heuristic',
        isLiveAi: false,
        apiError: err.message
      };
    }
  }

  // No API key provided: return smart local simulated response
  return {
    response: getLocalFallbackResponse(message, topic, mode),
    suggestedQuestions: generateFollowUps(topic, message),
    provider: 'local',
    model: 'prepai-heuristic-engine',
    isLiveAi: false,
    noKeyNotice: true
  };
}

/**
 * Intelligent local manual response engine
 * Uses curated, verified knowledge bank for all feeded questions and topics
 */
function getLocalFallbackResponse(message, topic, mode) {
  const cleanMsg = (message || "").trim();
  const lower = cleanMsg.toLowerCase();

  // 1. Check if there's a specific match in our manual knowledge bank
  const match = findBestManualMatch(cleanMsg);
  if (match) {
    if (mode === "hint" && match.hint) {
      return match.hint;
    }
    if (mode === "topper" && match.topper) {
      return match.topper;
    }
    return match.explain;
  }

  // 2. Handle common follow-up intents dynamically with real content
  if (lower.includes("3-bullet") || lower.includes("revision note") || lower.includes("summarize")) {
    return `### High-Yield 3-Bullet Revision Summary: "${topic || cleanMsg}"\n\n` +
      `1. **Core Governing Principle**: Always isolate the primary constraint or invariant first (conservation laws in physics, monotonic order in algorithms, fundamental rights in polity).\n` +
      `2. **Critical Edge Case Trap**: Test boundary conditions ($n=0$, $x \\to \\infty$, or empty state) to discard 2 out of 4 options in under 10 seconds.\n` +
      `3. **Topper Speed Rule**: Apply standard first-principles shortcuts rather than computing full algebraic derivations during high-pressure examinations.`;
  }

  if (lower.includes("analogy") || lower.includes("diagram") || lower.includes("intuitive")) {
    return `### Intuitive Real-World Mental Model: "${topic || cleanMsg}"\n\n` +
      `**Real-World Conceptual Model**:\n` +
      `Think of **${topic || "this system"}** like a high-speed airport conveyor belt:\n` +
      `- **The Feed**: Items arrive in arbitrary order.\n` +
      `- **The Coordinator**: Inspects invariants and guarantees priority ordering without halting the belt.\n` +
      `- **The Boundary Protection**: Prevents buffer overflow when sudden surges arrive.\n\n` +
      `**Key Takeaway**: Understanding the invariant makes solving complex derivations or debugging race conditions straightforward.`;
  }

  if (lower.includes("practice question") || lower.includes("exam question") || lower.includes("pyq")) {
    return `### Practice Exam Problem: "${topic || cleanMsg}"\n\n` +
      `**Problem Statement**:\n` +
      `A candidate is given a problem in **${topic || "Core Concepts"}** where input parameters vary over boundary range $[0, 10^5]$.\n` +
      `Which approach guarantees the optimal time and space complexity without diverging at the limit?\n\n` +
      `**Options**:\n` +
      `- (A) Full recursive expansion with no memoization\n` +
      `- (B) Direct monotonic invariant reduction with $O(1)$ space\n` +
      `- (C) Brute-force nested comparison yielding $O(n^2)$\n` +
      `- (D) Ignoring boundary conditions\n\n` +
      `**Correct Answer**: **(B)**\n` +
      `*Explanation*: Option (B) preserves conservation and satisfies time limit constraints under competitive exam grading.`;
  }

  // 3. Structured domain-specific resolution
  return generateStructuredAnswer(cleanMsg, topic, mode);
}

module.exports = {
  generateAiTutorResponse,
  callGemini,
  callGroq,
  GROQ_CANDIDATE_MODELS,
  GEMINI_CANDIDATE_MODELS
};
