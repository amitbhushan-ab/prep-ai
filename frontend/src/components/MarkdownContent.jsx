import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

/**
 * Format inline math and LaTeX tokens into readable mathematical representations
 */
function formatMathTokens(text) {
  if (!text) return '';
  return text
    .replace(/\\to/g, '→')
    .replace(/\\rightarrow/g, '→')
    .replace(/\\leftarrow/g, '←')
    .replace(/\\infty/g, '∞')
    .replace(/\\le(q)?/g, '≤')
    .replace(/\\ge(q)?/g, '≥')
    .replace(/\\neq/g, '≠')
    .replace(/\\approx/g, '≈')
    .replace(/\\cdot/g, '·')
    .replace(/\\times/g, '×')
    .replace(/\\pm/g, '±')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\theta/g, 'θ')
    .replace(/\\pi/g, 'π')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\nabla/g, '∇')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\lim_\{([^}]+)\}/g, 'lim($1)');
}

/**
 * Parses inline formatting: **bold**, *italic*, `code`, and $math$
 */
function renderInline(text) {
  if (!text) return null;

  // Split tokens by code `...`, math $...$, bold **...**, italic *...*
  const tokens = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // 1. Inline Code `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      tokens.push(
        <code 
          key={key++} 
          className="rounded px-1.5 py-0.5 text-[12px] font-mono bg-[var(--mc-surface-alt)] border border-[var(--mc-hairline)] text-[var(--mc-accent)] font-medium"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // 2. Math expression $math$
    const mathMatch = remaining.match(/^\$([^$]+)\$/);
    if (mathMatch) {
      const formatted = formatMathTokens(mathMatch[1]);
      tokens.push(
        <span 
          key={key++} 
          className="mx-0.5 inline-block font-mono text-[12.5px] px-1 py-0.2 rounded bg-[var(--mc-surface-alt)] border border-[var(--mc-hairline)] text-[var(--mc-ink)] font-medium"
        >
          {formatted}
        </span>
      );
      remaining = remaining.slice(mathMatch[0].length);
      continue;
    }

    // 3. Bold **bold**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      tokens.push(
        <strong key={key++} className="font-semibold text-[var(--mc-ink)]">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // 4. Italic *italic*
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      tokens.push(
        <em key={key++} className="italic text-[var(--mc-ink)]">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Normal plain text chunk until the next special character (` * $)
    const nextSpecial = remaining.search(/[`*$]/);
    if (nextSpecial === -1) {
      tokens.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      // Unmatched marker, consume 1 char
      tokens.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      tokens.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return tokens;
}

/**
 * Fenced code block with copy action
 */
const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-[var(--mc-hairline-strong)] bg-[#101112] text-white shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#16181a] px-3.5 py-1.5 text-[11px] font-mono text-white/60">
        <div className="flex items-center gap-1.5">
          <Terminal className="h-3.5 w-3.5 text-indigo-400" />
          <span className="uppercase">{language || 'code'}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-0.5 hover:bg-white/10 text-white/70 hover:text-white transition"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-3.5 text-xs font-mono leading-relaxed text-emerald-300">
        <code>{code}</code>
      </pre>
    </div>
  );
};

/**
 * Full MarkdownContent component
 * Parses headers, lists, code blocks, blockquotes, and math blocks
 */
export default function MarkdownContent({ content }) {
  if (!content) return null;

  // Split into lines/blocks
  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeBuffer = [];
  let codeLang = '';
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Check code block fence
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        elements.push(
          <CodeBlock
            key={`code-${key++}`}
            language={codeLang}
            code={codeBuffer.join('\n')}
          />
        );
        inCodeBlock = false;
        codeBuffer = [];
        codeLang = '';
      } else {
        // Start code block
        inCodeBlock = true;
        codeLang = line.replace('```', '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    // Display Math block $$...$$
    if (line.startsWith('$$') && line.endsWith('$$') && line.length > 4) {
      const mathInner = line.slice(2, -2).trim();
      elements.push(
        <div 
          key={`math-${key++}`}
          className="my-2.5 overflow-x-auto rounded-lg border border-[var(--mc-hairline)] bg-[var(--mc-surface-alt)] p-3 text-center font-mono text-sm font-semibold text-[var(--mc-ink)] shadow-xs"
        >
          {formatMathTokens(mathInner)}
        </div>
      );
      continue;
    }

    // Empty line
    if (!line) {
      elements.push(<div key={`sp-${key++}`} className="h-2" />);
      continue;
    }

    // Headings (###, ##, #)
    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={`h4-${key++}`} className="mt-3.5 mb-1.5 text-sm sm:text-base font-semibold tracking-tight text-[var(--mc-ink)] flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--mc-accent)]" />
          {renderInline(line.slice(4))}
        </h4>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h3 key={`h3-${key++}`} className="mt-4 mb-2 text-base sm:text-lg font-semibold tracking-tight text-[var(--mc-ink)] border-b border-[var(--mc-hairline)] pb-1">
          {renderInline(line.slice(3))}
        </h3>
      );
      continue;
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h2 key={`h2-${key++}`} className="mt-4 mb-2 text-lg sm:text-xl font-bold tracking-tight text-[var(--mc-ink)]">
          {renderInline(line.slice(2))}
        </h2>
      );
      continue;
    }

    // Numbered list (e.g. "1. **Title**: ...")
    const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      const num = numMatch[1];
      const rest = numMatch[2];
      elements.push(
        <div key={`li-${key++}`} className="my-1.5 flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-[var(--mc-ink)] pl-1">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--mc-surface-alt)] border border-[var(--mc-hairline)] text-[11px] font-mono font-bold text-[var(--mc-ink)]">
            {num}
          </span>
          <div className="flex-1 pt-0.5">
            {renderInline(rest)}
          </div>
        </div>
      );
      continue;
    }

    // Bullet points (e.g. "- " or "* ")
    if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <div key={`bl-${key++}`} className="my-1 flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-[var(--mc-ink)] pl-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--mc-mute)]" />
          <div className="flex-1">
            {renderInline(line.slice(2))}
          </div>
        </div>
      );
      continue;
    }

    // Blockquote (e.g. "> ...")
    if (line.startsWith('> ')) {
      elements.push(
        <div key={`quote-${key++}`} className="my-2.5 border-l-3 border-[var(--mc-accent)] bg-[var(--mc-surface-alt)]/60 rounded-r-lg px-3.5 py-2 text-xs sm:text-sm italic text-[var(--mc-mute)]">
          {renderInline(line.slice(2))}
        </div>
      );
      continue;
    }

    // Normal paragraph
    elements.push(
      <p key={`p-${key++}`} className="my-1 text-xs sm:text-sm leading-relaxed text-[var(--mc-ink)]">
        {renderInline(line)}
      </p>
    );
  }

  // If codeblock wasn't closed
  if (inCodeBlock && codeBuffer.length > 0) {
    elements.push(
      <CodeBlock
        key={`code-${key++}`}
        language={codeLang}
        code={codeBuffer.join('\n')}
      />
    );
  }

  return <div className="space-y-0.5">{elements}</div>;
}
