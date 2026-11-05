/**
 * Curated Bank of Feeded Questions for PrepAI Concept Tutor
 * Organized by examination domain, syllabus category, and difficulty.
 */

export const FEEDED_CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: 'Sparkles' },
  { id: 'coding', label: 'DSA & Coding', icon: 'Code2' },
  { id: 'math', label: 'Mathematics', icon: 'Sigma' },
  { id: 'physics', label: 'Physics', icon: 'Atom' },
  { id: 'chemistry', label: 'Chemistry', icon: 'FlaskConical' },
  { id: 'upsc', label: 'UPSC & Polity', icon: 'Landmark' },
  { id: 'system_design', label: 'System Design', icon: 'Cpu' }
];

export const FEEDED_QUESTIONS = [
  // --- DSA & Coding ---
  {
    id: 'dsa_1',
    category: 'coding',
    badge: 'LeetCode 1',
    difficulty: 'Easy',
    question: 'How to solve Two Sum in O(n) time and O(n) space using a Hash Map?',
    topic: 'Arrays & Hashing'
  },
  {
    id: 'dsa_2',
    category: 'coding',
    badge: 'Tier-1 Interview',
    difficulty: 'Medium',
    question: 'How does the JavaScript Event Loop handle microtasks vs macrotasks?',
    topic: 'JS Runtime Concurrency'
  },
  {
    id: 'dsa_3',
    category: 'coding',
    badge: 'Meta / Google',
    difficulty: 'Medium',
    question: 'How do you design an LRU Cache using a Doubly Linked List and Hash Map?',
    topic: 'System Data Structures'
  },
  {
    id: 'dsa_4',
    category: 'coding',
    badge: 'Binary Trees',
    difficulty: 'Medium',
    question: 'Explain recursive vs iterative Invert Binary Tree with time and space complexity.',
    topic: 'Tree Traversal'
  },
  {
    id: 'dsa_5',
    category: 'coding',
    badge: 'DP Classic',
    difficulty: 'Medium',
    question: 'How to solve Longest Increasing Subsequence in O(n log n) using patience sorting and binary search?',
    topic: 'Dynamic Programming'
  },

  // --- Mathematics ---
  {
    id: 'math_1',
    category: 'math',
    badge: 'JEE / GATE',
    difficulty: 'High Yield',
    question: "Explain L'Hôpital's Rule with tricky indeterminate forms (0/0, ∞/∞, 0·∞, 1^∞).",
    topic: 'Calculus Limits'
  },
  {
    id: 'math_2',
    category: 'math',
    badge: 'Linear Algebra',
    difficulty: 'GATE / Engineering',
    question: 'How to find Eigenvalues and Eigenvectors of a matrix and verify diagonalizability?',
    topic: 'Matrix Theory'
  },
  {
    id: 'math_3',
    category: 'math',
    badge: 'Probability',
    difficulty: 'Data Science',
    question: "Walk through Bayes' Theorem with the medical false-positive trap example.",
    topic: 'Conditional Probability'
  },
  {
    id: 'math_4',
    category: 'math',
    badge: 'Calculus',
    difficulty: 'JEE Advanced',
    question: "Derive Taylor Series expansion for sin(x) and e^x and explain the remainder convergence.",
    topic: 'Series & Sequences'
  },

  // --- Physics ---
  {
    id: 'phy_1',
    category: 'physics',
    badge: 'Thermodynamics',
    difficulty: 'JEE / GATE',
    question: 'Derive the Carnot Engine maximum thermodynamic efficiency η = 1 - T_C/T_H and explain second law.',
    topic: 'Thermal Physics'
  },
  {
    id: 'phy_2',
    category: 'physics',
    badge: 'Electrodynamics',
    difficulty: 'JEE Advanced',
    question: "Explain Faraday's Law and Lenz's Law of electromagnetic induction with negative sign conservation.",
    topic: 'Electromagnetism'
  },
  {
    id: 'phy_3',
    category: 'physics',
    badge: 'Modern Physics',
    difficulty: 'Quantum Mechanics',
    question: 'What is Quantum Tunneling and how does finite potential barrier transmission decay exponentially?',
    topic: 'Wave-Particle Duality'
  },
  {
    id: 'phy_4',
    category: 'physics',
    badge: 'Waves & Sound',
    difficulty: 'PYQ 2024',
    question: 'Derive the Doppler Effect apparent frequency equation for moving source and moving observer.',
    topic: 'Wave Mechanics'
  },

  // --- Chemistry ---
  {
    id: 'chem_1',
    category: 'chemistry',
    badge: 'Organic Chemistry',
    difficulty: 'NEET / JEE',
    question: 'Compare SN1 and SN2 reaction mechanisms: carbocation stability, stereochemistry, and solvent effects.',
    topic: 'Reaction Mechanisms'
  },
  {
    id: 'chem_2',
    category: 'chemistry',
    badge: 'Coordination Compounds',
    difficulty: 'High Weightage',
    question: 'Explain Crystal Field Theory (CFT) splitting of d-orbitals in octahedral vs tetrahedral complexes.',
    topic: 'Inorganic Chemistry'
  },
  {
    id: 'chem_3',
    category: 'chemistry',
    badge: 'Physical Chemistry',
    difficulty: 'NEET / JEE',
    question: "How does Le Chatelier's Principle predict equilibrium shifts when temperature and pressure change?",
    topic: 'Chemical Equilibrium'
  },

  // --- UPSC & Polity ---
  {
    id: 'upsc_1',
    category: 'upsc',
    badge: 'UPSC Mains',
    difficulty: 'Article 32',
    question: 'Explain Article 32 of Indian Constitution and details of the 5 Writs (Habeas Corpus, Mandamus, etc.).',
    topic: 'Constitutional Law'
  },
  {
    id: 'upsc_2',
    category: 'upsc',
    badge: 'Landmark Judgement',
    difficulty: 'Polity Core',
    question: 'What is the Basic Structure Doctrine established in the 1973 Kesavananda Bharati case?',
    topic: 'Judicial Precedents'
  },
  {
    id: 'upsc_3',
    category: 'upsc',
    badge: 'UPSC Prelims',
    difficulty: 'Polity',
    question: 'Explain the difference between National Emergency (Art 352), State Emergency (Art 356) and Financial Emergency (Art 360).',
    topic: 'Emergency Provisions'
  },

  // --- System Design & Tech ---
  {
    id: 'sys_1',
    category: 'system_design',
    badge: 'Architectural Interview',
    difficulty: 'Senior SWE',
    question: 'How do you design a distributed API Rate Limiter using Token Bucket and Redis?',
    topic: 'System Design'
  },
  {
    id: 'sys_2',
    category: 'system_design',
    badge: 'Distributed Systems',
    difficulty: 'Staff Level',
    question: 'Explain the CAP Theorem and how modern databases trade off Consistency vs Availability during network partitions.',
    topic: 'Distributed Databases'
  },
  {
    id: 'sys_3',
    category: 'system_design',
    badge: 'Caching Architecture',
    difficulty: 'Senior SWE',
    question: 'Compare Cache-Aside, Write-Through, and Write-Behind caching strategies with cache invalidation traps.',
    topic: 'High Throughput Systems'
  }
];
