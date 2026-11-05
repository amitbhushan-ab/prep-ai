// Backend Default Interview Tracks (15 questions per track)

const DEFAULT_INTERVIEW_TRACKS = [
  {
    id: 'corporate',
    label: 'Tech & Software Engineering',
    shortLabel: 'Tech & SWE',
    icon: 'Code2',
    defaultRole: 'Full Stack Software Engineer',
    roles: [
      'Full Stack Software Engineer',
      'Backend Engineer (Distributed Systems)',
      'Frontend / React Specialist',
      'DevOps & Cloud Architect',
      'System Design Specialist'
    ],
    description: 'Data structures, distributed systems, concurrency, cloud scalability, and production telemetry.',
    questions: [
      "Could you walk me through the architecture of a full-stack system you designed? Specifically, how did you balance state synchronization, database caching, and API latency?",
      "How does the JavaScript runtime schedule microtasks versus macrotasks in the event loop, and how does this affect frame rendering and asynchronous operations?",
      "Tell me about a challenging production bug you encountered. What systematic logging, distributed tracing, or telemetry did you inspect to isolate the root cause?",
      "Explain the inner workings of database indexing (B-Trees vs Hash indexes). How does column order in a composite index impact query execution plans?",
      "When designing scalable microservices, how do you decide between synchronous REST/gRPC APIs versus asynchronous Kafka/RabbitMQ event-driven messaging?",
      "How do you implement idempotency in distributed financial or payment processing to guarantee zero duplicate charges during network timeouts?",
      "Walk me through your caching strategy. How do you handle cache-aside, write-through, cache stampede (thundering herd), and cache invalidation under high concurrency?",
      "How do you evaluate SQL vs NoSQL for high-write workloads? How does the CAP theorem dictate your choice between consistency and availability during network partitions?",
      "What proactive defense mechanisms do you implement in web applications to guard against XSS, CSRF, and SQL injection attacks?",
      "How do you detect and resolve race conditions in database transactions? Compare optimistic locking with version counters versus pessimistic row-level locking.",
      "Explain your strategy for zero-downtime database schema migrations and backward-compatible REST API versioning across multiple production deployments.",
      "How would you design a distributed rate limiter? Compare Token Bucket, Leaky Bucket, and Sliding Window Counter algorithms across multi-region server clusters.",
      "Describe your CI/CD deployment pipeline. How do you implement automated canary deployments, automated rollbacks, and health checks?",
      "How do you identify and diagnose memory leaks in high-load web servers or browser applications using heap snapshots and profilers?",
      "What key telemetry metrics (Golden Signals: Latency, Traffic, Errors, Saturation) do you monitor to enforce strict Service Level Objectives (SLOs) and SLAs?"
    ]
  },
  {
    id: 'ai_ml',
    label: 'AI & Data Science',
    shortLabel: 'AI / ML & Data',
    icon: 'Brain',
    defaultRole: 'Machine Learning / AI Engineer',
    roles: [
      'Machine Learning Engineer',
      'Data Scientist',
      'Generative AI & LLM Specialist',
      'MLOps & Infrastructure Engineer',
      'Computer Vision / NLP Researcher'
    ],
    description: 'Model architectures, Transformers, RAG pipelines, training dynamics, fine-tuning, and MLOps.',
    questions: [
      "Explain the bias-variance trade-off in machine learning models and how regularization methods (L1 Lasso vs L2 Ridge) mitigate overfitting.",
      "Walk me through the internal mathematics of the self-attention mechanism in Transformers. How are Query, Key, and Value matrices scaled and computed?",
      "What strategies do you employ when training deep neural networks to prevent vanishing or exploding gradients (e.g., Residual connections, LayerNorm, Gradient Clipping)?",
      "How do you evaluate model performance on heavily imbalanced classification datasets? Why is ROC-AUC often misleading compared to Precision-Recall AUC?",
      "Describe the end-to-end architecture of an enterprise Retrieval-Augmented Generation (RAG) system. How do you optimize chunking, vector embeddings, and re-ranking to prevent hallucinations?",
      "Compare full parameter fine-tuning of Large Language Models with Parameter-Efficient Fine-Tuning (PEFT) methods like LoRA and QLoRA.",
      "How do vector databases perform approximate nearest neighbor search? Compare HNSW (Hierarchical Navigable Small World) graphs with Inverted File Index (IVF-PQ).",
      "What optimization techniques do you use to deploy deep learning models to production with minimal inference latency (e.g., Quantization INT8/FP4, TensorRT, vLLM)?",
      "How do you detect and mitigate data drift and concept drift in live production machine learning models?",
      "Explain how explainable AI (XAI) tools like SHAP values and LIME work to interpret non-linear black-box ensemble models for business stakeholders.",
      "How do you handle missing data in tabular datasets? Distinguish between MCAR, MAR, and MNAR and explain your imputation strategy.",
      "Walk me through advanced prompt engineering paradigms: Chain-of-Thought (CoT), Few-Shot in-context learning, and ReAct agentic tool execution.",
      "What is the difference between Batch Normalization and Layer Normalization, and why is Layer Normalization favored in sequential/transformer architectures?",
      "Explain the alignment process of LLMs: how do Reinforcement Learning from Human Feedback (RLHF) and Direct Preference Optimization (DPO) shape conversational safety?",
      "How do you design a reproducible MLOps pipeline covering automated model versioning, feature stores, CI/CD for ML, and experiment tracking?"
    ]
  },
  {
    id: 'upsc',
    label: 'Civil Services & State PCS',
    shortLabel: 'Civil Services',
    icon: 'Landmark',
    defaultRole: 'UPSC CSE Personality Test',
    roles: [
      'UPSC IAS / IPS Personality Board',
      'State Civil Services PCS Interview',
      'Public Policy & Administrative Analyst',
      'Forest & Revenue Services Board'
    ],
    description: 'Constitutional law, cooperative federalism, ethical governance, geopolitical strategy, and social policy.',
    questions: [
      "In your view, how should policymakers harmonize rapid industrial and manufacturing growth with India's net-zero 2070 climate commitments?",
      "Dr. B.R. Ambedkar termed Article 32 the 'Heart and Soul' of the Constitution. In the digital governance era, how do you see judicial protection evolving against state surveillance?",
      "As a District Magistrate facing pre-election communal tension in a sensitive district, what proactive administrative, civil, and security measures would you deploy?",
      "Article 44 envisions a Uniform Civil Code. How should the state balance fundamental religious freedoms (Article 25) with gender equality and secular civil protections?",
      "How should India navigate strategic autonomy in foreign policy amid heightened multipolar tensions between Western alliances and Eastern geopolitical blocs?",
      "What structural interventions are required to resolve agrarian distress beyond loan waivers and price support mechanisms (e.g., value addition, cold chain logistics)?",
      "Evaluate the Digital Personal Data Protection Act. Does it strike an adequate balance between individual privacy and legitimate state security exemptions?",
      "Cooperative federalism often faces friction regarding GST revenue devolution and centrally sponsored schemes. How can fiscal harmony be strengthened?",
      "The Women's Reservation Act mandates 33% legislative seats for women. What grassroot administrative safeguards will prevent the phenomenon of proxy governance ('Sarpanch Pati')?",
      "How would you navigate administrative ethics when facing intense political pressure to bypass regulatory environmental clearance for a high-profile local project?",
      "What structural reforms are imperative in disaster management governance to build cyclone and flood-resilient coastal and urban infrastructure?",
      "Evaluate India's public healthcare architecture. What steps are necessary to bridge the gap between tertiary insurance schemes (Ayushman Bharat) and primary health centers?",
      "Rapid urbanization is leading to urban flooding and waste crises. What master planning and municipal financing reforms would you champion?",
      "What are the major bottlenecks in the implementation of the Supreme Court's Prakash Singh directives on police reforms, and how can accountability be improved?",
      "Analyze the proposal for 'Simultaneous Elections' (One Nation, One Election). What constitutional amendments and federalism challenges must be navigated?"
    ]
  },
  {
    id: 'product_mba',
    label: 'Product Management & MBA / IIM',
    shortLabel: 'Product & MBA',
    icon: 'Target',
    defaultRole: 'Associate Product Manager (APM / PM)',
    roles: [
      'Product Manager (Tech / B2C / B2B)',
      'IIM / Top B-School WAT-PI Candidate',
      'Strategy & Management Consultant',
      'Growth & Product Marketing Lead'
    ],
    description: 'Product sense, prioritization frameworks, root cause metrics, GTM strategy, and IIM business interviews.',
    questions: [
      "Walk me through how you prioritize product features when engineering resources are constrained. How do you apply frameworks like RICE or the Kano model?",
      "Design an emergency safety and panic assistance feature for a ride-sharing app operating in high-density urban markets.",
      "A core metric (e.g., Day-7 User Retention or Checkout Conversion) has unexpectedly dropped by 14% week-over-week. How do you systematically diagnose the root cause?",
      "How do you evaluate and validate Product-Market Fit (PMF) for an early-stage feature before allocating aggressive marketing capital?",
      "Pick a consumer digital product you use daily. Critique its user experience and propose three strategic product initiatives you would build next quarter.",
      "How do you resolve high-stakes disagreements between an engineering lead claiming a feature is infeasible and a sales VP claiming it is vital for contract closing?",
      "How would you design a monetization and pricing tier model for a freemium SaaS tool without cannibalizing organic user adoption?",
      "Explain how you design, run, and interpret an A/B test. How do you account for statistical power, minimum detectable effect, and novelty bias?",
      "Tell me about a time a product launch or feature experiment failed to meet expectations. What post-mortem analysis and strategic pivot did you execute?",
      "Why are you targeting an MBA / Product Management role at this specific junction of your professional trajectory? What unique perspective do you contribute?",
      "Market Sizing Guesstimate: Estimate the annual total addressable market size for electric two-wheelers in Tier-1 and Tier-2 Indian cities.",
      "How do you write a Product Requirement Document (PRD) that provides sufficient technical clarity for engineers while maintaining business alignment for executives?",
      "Two-sided marketplaces face a classic cold-start problem. How would you jumpstart liquidity and user trust on both supply and demand sides?",
      "How do you assess the equilibrium between Customer Acquisition Cost (CAC) and Customer Lifetime Value (LTV) when scaling growth marketing?",
      "How do you handle ethical dilemmas in product design, specifically avoiding dark patterns, algorithmic addiction, and prioritizing user digital well-being?"
    ]
  },
  {
    id: 'finance_banking',
    label: 'Banking, Finance & SSC',
    shortLabel: 'Banking & Finance',
    icon: 'Coins',
    defaultRole: 'Probationary Officer (Banking & Finance)',
    roles: [
      'Bank Probationary Officer (SBI / IBPS / RBI)',
      'Financial Analyst / Investment Banking',
      'SSC CGL Auditor / Inspector',
      'Credit & Risk Analyst'
    ],
    description: 'Monetary policy, NPA resolution, corporate credit appraisal, macroeconomics, and commercial banking.',
    questions: [
      "How does the central bank utilize policy repo rates, Reverse Repo, CRR, and SLR to manage inflationary pressures without choking industrial credit growth?",
      "Explain the lifecycle of a Non-Performing Asset (NPA). Differentiate between Gross and Net NPAs and explain the role of the Insolvency and Bankruptcy Code (IBC).",
      "How do benchmark interest rate adjustments by global central banks (like the US Federal Reserve) impact currency valuation, foreign institutional flows, and domestic inflation?",
      "Differentiate between Fiscal Deficit, Revenue Deficit, and Primary Deficit. Why is fiscal consolidation critical for maintaining sovereign debt ratings?",
      "When appraising a corporate term loan request, which core financial ratios (DSCR, Current Ratio, Debt-Equity) do you scrutinize to assess repayment capability?",
      "Evaluate financial inclusion initiatives in emerging markets. How has digital public infrastructure (like Unified Payments Interface) disrupted legacy branch banking?",
      "What are the Basel III capital adequacy guidelines? Why are Common Equity Tier-1 (CET1) capital and Capital Conservation Buffers essential for financial stability?",
      "Contrast Cost-Push Inflation with Demand-Pull Inflation. Why do policymakers track Core Inflation alongside Headline Consumer Price Index (CPI)?",
      "What is an inverted yield curve in bond markets, and why is it historically interpreted as an early indicator of macroeconomic recession?",
      "What cybersecurity protocols and fraud detection systems should commercial banks deploy to curb phishing, unauthorized API fund transfers, and identity theft?",
      "Distinguish between Scheduled Commercial Banks, Payment Banks, and Small Finance Banks regarding deposit acceptance, credit issuance, and reserve norms.",
      "What factors drive a country's Current Account Deficit (CAD), and how do remittances and software service exports cushion foreign exchange reserves?",
      "Explain the Priority Sector Lending (PSL) mandate for commercial banks and the financial implications of utilizing RIDF deposits when targets are missed.",
      "Explain the financial purpose of derivatives (Futures vs Options). How do institutional treasuries use interest rate and currency swaps to hedge balance sheet risk?",
      "Situational Prompt: A prominent local commercial customer defaults on an installment and alleges clerical billing errors. How do you resolve this with risk compliance and tact?"
    ]
  },
  {
    id: 'gate_core',
    label: 'Core Engineering & GATE / PSU',
    shortLabel: 'GATE & PSU Engg',
    icon: 'Cog',
    defaultRole: 'PSU Graduate Engineer Trainee (GET)',
    roles: [
      'PSU Executive Trainee (ISRO / BARC / IOCL / NTPC)',
      'GATE Top Ranker Technical Board',
      'Embedded & VLSI Hardware Engineer',
      'Power Systems & Grid Engineer'
    ],
    description: 'Thermodynamics, electrical machines, signal sampling, control systems, and PSU interview boards.',
    questions: [
      "Explain the Second Law of Thermodynamics and the Carnot theorem. Why can no real thermal heat engine achieve 100% Carnot efficiency?",
      "Explain the fundamental working principle of a 3-phase induction motor. What causes rotor slip, and why can an induction motor never run at synchronous speed?",
      "State the Nyquist-Shannon sampling theorem. What is aliasing, and how does an analog anti-aliasing low-pass filter prevent signal corruption in digital acquisition?",
      "In classical control systems, how do you determine system stability using Gain Margin, Phase Margin, and Nyquist stability criterion on frequency plots?",
      "Walk through the stress-strain curve for ductile mild steel. Differentiate between proportional limit, yield point, ultimate tensile strength, and necking phenomena.",
      "In digital VLSI design, define setup time and hold time for sequential flip-flops. Why cannot a hold time violation be fixed by simply reducing the operating clock frequency?",
      "State Bernoulli's equation in fluid mechanics. What are the key assumptions required for its application, and where does it break down in real viscous turbulent flows?",
      "What is the purpose of Flexible AC Transmission Systems (FACTS) controllers like STATCOM and SVC in maintaining reactive power compensation and voltage stability?",
      "Compare Harvard architecture with Von Neumann architecture in microcontrollers. Explain the role of Direct Memory Access (DMA) in high-throughput peripheral transfers.",
      "Explain the industrial applications and operational principles of Non-Destructive Testing (NDT) methods like Ultrasonic Testing and Radiography.",
      "How do you construct Shear Force Diagrams (SFD) and Bending Moment Diagrams (BMD) for a simply supported beam with uniformly distributed and concentrated loads?",
      "Compare Fourier's law of thermal conduction, Newton's law of convective cooling, and the Stefan-Boltzmann law of thermal radiation under transient heat transfer.",
      "In Real-Time Operating Systems (RTOS), what is Priority Inversion, and how does the Priority Inheritance Protocol prevent unbounded priority inversion deadlocks?",
      "How do Pulse Width Modulation (PWM) inverter switching topologies mitigate low-order harmonic distortions in motor drive applications?",
      "PSU Board Question: Why do you aspire to serve in a core public sector enterprise (Maharatna/Navratna) over high-compensation private corporate positions?"
    ]
  },
  {
    id: 'medical',
    label: 'Medical & Healthcare (Clinical)',
    shortLabel: 'Medical & Clinical',
    icon: 'Stethoscope',
    defaultRole: 'Resident Medical Officer / Clinical Specialist',
    roles: [
      'Resident Medical Officer (MBBS / NEET PG)',
      'Emergency Medicine & Trauma Specialist',
      'Hospital Administration & Clinical Lead',
      'Clinical Ethics & Patient Counselor'
    ],
    description: 'Clinical emergency triage, medical ethics, patient communication, antimicrobial stewardship, and differential diagnosis.',
    questions: [
      "A 55-year-old patient arrives in the ER with acute retrosternal crushing chest pain radiating to the left jaw and diaphoresis. Outline your immediate first 10 minutes of clinical triage.",
      "Explain the four cardinal principles of medical ethics: Autonomy, Beneficence, Non-Maleficence, and Justice. How do you resolve conflicts between autonomy and beneficence?",
      "Differentiate between Diabetic Ketoacidosis (DKA) and Hyperosmolar Hyperglycemic State (HHS) regarding clinical pathophysiology, laboratory findings, and fluid resuscitation protocols.",
      "What clinical strategies and diagnostic stewardship protocols must hospitals adopt to curb the emergence and transmission of multi-drug resistant hospital-acquired infections (MRSA, CRE)?",
      "Outline the acute management protocol for severe anaphylactic shock: drug dosage, concentration, route of epinephrine administration, and post-stabilization airway monitoring.",
      "How do you break catastrophic bad news (such as sudden patient demise or terminal diagnosis) to grief-stricken family members using the structured SPIKES protocol?",
      "Compare the pathophysiological hemodynamics of Hypovolemic Shock versus Septic Shock. How do systemic vascular resistance and cardiac output guide vasopressor choice?",
      "Walk me through a systematic 6-step interpretation of an Arterial Blood Gas (ABG) report for a patient presenting with high anion gap metabolic acidosis.",
      "How do you clinically assess dehydration severity in pediatric patients presenting with acute gastroenteritis, and when do you escalate from oral rehydration salts (ORS) to IV fluids?",
      "Ethical Scenario: An alert adult patient with internal bleeding refuses a life-saving blood transfusion due to conscientious religious convictions. How do you proceed clinically and legally?",
      "What are the cornerstone regimens in modern Tuberculosis management under national elimination programs, and how do you monitor and manage drug-induced hepatotoxicity?",
      "Explain the acute clinical time window and eligibility criteria for IV thrombolysis with recombinant tissue plasminogen activator (tPA) in acute ischemic stroke.",
      "A postoperative orthopedic patient suddenly develops pleuritic chest pain, tachypnea, and desaturation on room air. Outline your diagnostic workup for acute Pulmonary Embolism.",
      "What are the biomedical waste segregation categories and safety protocols for managing sharps, infectious anatomical waste, and cytotoxic materials in clinical environments?",
      "How do you manage personal clinical burnout, maintain empathy during grueling rotational shifts, and prevent diagnostic fatigue when evaluating repetitive admissions?"
    ]
  },
  {
    id: 'hr',
    label: 'HR Behavioral & Leadership',
    shortLabel: 'HR Behavioral',
    icon: 'Users',
    defaultRole: 'Behavioral STAR Candidate',
    roles: [
      'Culture & Behavioral STAR Candidate',
      'Team Lead / Engineering Manager',
      'People Operations & HR Specialist',
      'Cross-Functional Program Manager'
    ],
    description: 'STAR framework, conflict resolution, situational ownership, constructive feedback, and leadership culture.',
    questions: [
      "Describe a scenario where you had a significant technical disagreement with a team lead or peer. How did you de-escalate the debate and reach a constructive consensus?",
      "Tell me about a time you made an error in judgment or introduced a bug that impacted users. How did you take ownership, communicate with stakeholders, and rectify it?",
      "Give an example of delivering a critical milestone under an aggressive deadline without compromising code quality, architecture standards, or team well-being.",
      "How do you handle receiving direct, constructive critical feedback on your work from a manager or stakeholder? Provide an example of how you acted upon it.",
      "Describe an instance where you had to persuade cross-functional team members (e.g., designers, product managers, or sales) to adopt a significant change in workflow or technology.",
      "Tell me about a time you mentored a junior teammate or peer who was struggling to meet expectations. What specific coaching approach did you employ?",
      "How do you organize and prioritize your deliverables when multiple stakeholders are simultaneously requesting high-priority interventions?",
      "Describe a project that required rapidly mastering an unfamiliar technology stack, tool, or business domain on a very short runway.",
      "Have you ever collaborated with a team member whose working style clashed with your own? How did you ensure collaboration remained professional and productive?",
      "Where do you see yourself evolving professionally over the next 3 to 5 years, and how does this specific organization and role fit into that trajectory?",
      "Tell me about a time you identified a broken internal process, technical debt, or inefficiency and proactively designed a solution without being prompted.",
      "Describe an ethical dilemma or integrity challenge you observed or faced in your academic or professional career and how you handled it.",
      "What workplace values and cultural traits allow you to perform at your highest potential, and what management style do you thrive under best?",
      "Describe a situation where project scope or business requirements shifted abruptly mid-sprint. How did you realign yourself and maintain team morale?",
      "Why should our hiring committee choose you over other equally qualified candidates applying for this position?"
    ]
  },
  {
    id: 'ielts',
    label: 'Study Abroad & IELTS / GRE Speaking',
    shortLabel: 'IELTS & Abroad',
    icon: 'Globe',
    defaultRole: 'IELTS Academic Speaking (Band 9)',
    roles: [
      'IELTS Academic Speaking Candidate',
      'GRE Verbal & Analytical Reasoning',
      'University Admissions & Visa Interview',
      'International Graduate Researcher'
    ],
    description: 'IELTS Band 9 fluency, discursive debate, international academic argumentation, and visa interviews.',
    questions: [
      "Part 1 (Hometown & Roots): Could you describe your hometown and what aspect of its cultural heritage, architectural character, or local community you appreciate most?",
      "Part 1 (Academic Interests): What motivated you to specialize in your chosen academic field, and what global technological challenges do you aim to address?",
      "Part 2 (Cue Card Monologue): Describe an environmental initiative or green technology in your country that has generated a positive social impact. (2-minute structured response).",
      "Part 3 (Discursive Debate): In your perspective, do municipal governments or individual citizens bear greater responsibility for urban climate resilience and waste reduction?",
      "Part 3 (Technology & Society): In what ways has generative artificial intelligence altered language acquisition, translation, and international intercultural communication?",
      "GRE Argumentation: Critique the statement: 'A nation’s true greatness is demonstrated more by its scientific advancements than by its artistic and philosophical contributions.'",
      "University Admissions Interview: Why have you selected this specific university and graduate curriculum for your advanced research over other international institutions?",
      "Visa Officer Interview: What strong socio-economic ties, professional opportunities, and family commitments will ensure your return to your home country upon completing your degree?",
      "Part 2 (Cue Card Monologue): Describe an instance where you had to lead a diverse group of people from different linguistic or cultural backgrounds to accomplish a joint project.",
      "Part 3 (Higher Education): How should university curricula evolve to maintain a rigorous theoretical foundation while equipping students with immediate industry-ready practical skills?",
      "GRE Analytical Reasoning: Evaluate the socio-economic trade-offs between public expenditure on space exploration versus immediate domestic poverty alleviation programs.",
      "Part 1 (Leisure & Culture): How have traditional forms of leisure and cultural celebration in your region evolved under the influence of modern digital media?",
      "Part 3 (Globalization): To what extent does rapid economic globalization threaten indigenous linguistic diversity and local cultural traditions?",
      "Academic Integrity: How do universities abroad enforce research ethics, plagiarism detection, and intellectual honesty, and why is this foundational to scholarly work?",
      "Part 2 (Cue Card Monologue): Describe a book, philosophical text, or mentor that fundamentally transformed your perspective on life and professional ambition."
    ]
  }
];

module.exports = {
  DEFAULT_INTERVIEW_TRACKS
};
