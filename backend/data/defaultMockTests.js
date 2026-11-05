/**
 * Complete Seed Exams and All-India CBT Mock Tests across 8 Streams
 * Every stream features exactly 10 authentic questions with options,
 * correct answers, explanations, and exam-accurate marking schemes.
 */

const DEFAULT_EXAMS = [
  {
    _id: "exam_jee_adv",
    id: "exam_jee_adv",
    name: "JEE Advanced 2026",
    category: "entrance",
    conductingBody: "IIT Joint Admission Board",
    officialWebsite: "https://jeeadv.ac.in",
    duration: 180,
    sections: ["Physics", "Chemistry", "Mathematics"],
    markingScheme: { correctMarks: 4, negativeMarks: -1, partialMarking: true },
    stages: ["Paper 1", "Paper 2"],
    syllabus: [
      { subject: "Physics", topics: ["Electrodynamics", "Rotational Dynamics", "Optics", "Modern Physics"] },
      { subject: "Chemistry", topics: ["Coordination Compounds", "Thermodynamics", "Organic Reaction Mechanisms"] },
      { subject: "Mathematics", topics: ["Calculus", "Conic Sections", "Probability", "Complex Numbers"] }
    ],
    status: "active",
    accentColor: "from-blue-600 to-indigo-700",
    badge: "Engineering"
  },
  {
    _id: "exam_neet_ug",
    id: "exam_neet_ug",
    name: "NEET UG 2026",
    category: "entrance",
    conductingBody: "National Testing Agency (NTA)",
    officialWebsite: "https://neet.nta.nic.in",
    duration: 200,
    sections: ["Biology (Botany & Zoology)", "Chemistry", "Physics"],
    markingScheme: { correctMarks: 4, negativeMarks: -1, partialMarking: false },
    stages: ["Single Window CBT Medical Test"],
    syllabus: [
      { subject: "Biology", topics: ["Genetics & Evolution", "Human Physiology", "Ecology", "Plant Physiology"] },
      { subject: "Chemistry", topics: ["Organic Chemistry", "Coordination Compounds", "Thermodynamics", "Equilibrium"] },
      { subject: "Physics", topics: ["Mechanics", "Optics", "Electrostatics", "Modern Physics"] }
    ],
    status: "active",
    accentColor: "from-emerald-600 to-teal-700",
    badge: "Medical Entrance"
  },
  {
    _id: "exam_upsc_cse",
    id: "exam_upsc_cse",
    name: "UPSC Civil Services (IAS) 2026",
    category: "civil_services",
    conductingBody: "Union Public Service Commission",
    officialWebsite: "https://upsc.gov.in",
    duration: 120,
    sections: ["General Studies Paper I", "CSAT Paper II"],
    markingScheme: { correctMarks: 2, negativeMarks: -0.66, partialMarking: false },
    stages: ["Prelims", "Mains (Subjective)", "Personality Test (Interview)"],
    syllabus: [
      { subject: "General Studies", topics: ["Indian Polity & Constitution", "Modern History", "Environment & Ecology", "Macroeconomics"] },
      { subject: "CSAT", topics: ["Reading Comprehension", "Logical Reasoning", "Quantitative Aptitude"] }
    ],
    status: "active",
    accentColor: "from-amber-600 to-orange-700",
    badge: "Civil Services"
  },
  {
    _id: "exam_gate_cs",
    id: "exam_gate_cs",
    name: "GATE 2026 (Computer Science & IT)",
    category: "entrance",
    conductingBody: "IIT Joint GATE Organizing Committee",
    officialWebsite: "https://gate2026.iit.ac.in",
    duration: 180,
    sections: ["Engineering Mathematics", "Core Computer Science", "General Aptitude"],
    markingScheme: { correctMarks: 2, negativeMarks: -0.66, partialMarking: false },
    stages: ["Computer-Based Entrance Test"],
    syllabus: [
      { subject: "Systems", topics: ["Operating Systems", "Computer Networks", "Database Management", "Computer Architecture"] },
      { subject: "Theory", topics: ["Theory of Computation", "Compiler Design", "Algorithms & Data Structures"] }
    ],
    status: "active",
    accentColor: "from-cyan-600 to-blue-700",
    badge: "GATE & Masters"
  },
  {
    _id: "exam_cat_mba",
    id: "exam_cat_mba",
    name: "CAT 2026 (IIMs & Top B-Schools)",
    category: "entrance",
    conductingBody: "Indian Institutes of Management",
    officialWebsite: "https://iimcat.ac.in",
    duration: 120,
    sections: ["VARC", "DILR", "QA"],
    markingScheme: { correctMarks: 3, negativeMarks: -1, partialMarking: false },
    stages: ["Computer-Based Test", "WAT & Personal Interview"],
    syllabus: [
      { subject: "VARC", topics: ["Reading Comprehension Passages", "Para Jumbles", "Critical Reasoning"] },
      { subject: "DILR", topics: ["Arrangements", "Caselets & Venn Diagrams", "Matrix & Grids"] },
      { subject: "QA", topics: ["Arithmetic", "Algebra", "Geometry & Mensuration", "Number Systems"] }
    ],
    status: "active",
    accentColor: "from-teal-600 to-emerald-800",
    badge: "Management"
  },
  {
    _id: "exam_swe_faang",
    id: "exam_swe_faang",
    name: "Full-Stack Software Engineer (FAANG / Tier-1)",
    category: "corporate",
    conductingBody: "Global Tech Industry Benchmark",
    officialWebsite: "https://prepai.io/tech",
    duration: 90,
    sections: ["Data Structures & Algorithms", "System Design", "JavaScript & React Core", "Behavioral (STAR)"],
    markingScheme: { correctMarks: 10, negativeMarks: 0, partialMarking: true },
    stages: ["Online Assessment", "Technical Rounds (2x)", "System Design", "Bar Raiser"],
    syllabus: [
      { subject: "Algorithms", topics: ["Dynamic Programming", "Graphs & BFS/DFS", "Sliding Window", "Binary Search"] },
      { subject: "Full-Stack", topics: ["Async JavaScript & Event Loop", "React Reconciliation", "REST & WebSockets", "Database Indexing"] }
    ],
    status: "active",
    accentColor: "from-violet-600 to-purple-800",
    badge: "Corporate & Tech"
  },
  {
    _id: "exam_ssc_cgl",
    id: "exam_ssc_cgl",
    name: "SSC CGL / Banking PO 2026",
    category: "government",
    conductingBody: "Staff Selection Commission & IBPS",
    officialWebsite: "https://ssc.gov.in",
    duration: 60,
    sections: ["General Intelligence", "General Awareness", "Quantitative Aptitude", "English Comprehension"],
    markingScheme: { correctMarks: 2, negativeMarks: -0.5, partialMarking: false },
    stages: ["Tier-I Computer Based Test", "Tier-II Descriptive & Typing"],
    syllabus: [
      { subject: "Quant", topics: ["Percentage & Profit Loss", "Time & Work", "Trigonometry", "Data Interpretation"] },
      { subject: "Reasoning", topics: ["Syllogisms", "Blood Relations", "Coding-Decoding", "Analogy"] }
    ],
    status: "active",
    accentColor: "from-indigo-600 to-blue-800",
    badge: "Govt Recruitment"
  },
  {
    _id: "exam_ielts_abroad",
    id: "exam_ielts_abroad",
    name: "IELTS & GRE Academic (Study Abroad)",
    category: "study_abroad",
    conductingBody: "British Council & ETS",
    officialWebsite: "https://ielts.org",
    duration: 160,
    sections: ["Verbal Reasoning", "Quantitative Reasoning", "Reading Comprehension", "Analytical Writing"],
    markingScheme: { correctMarks: 1, negativeMarks: 0, partialMarking: false },
    stages: ["Standardized Online Diagnostic Test"],
    syllabus: [
      { subject: "Verbal", topics: ["Text Completion", "Sentence Equivalence", "Vocabulary in Context"] },
      { subject: "Reading", topics: ["Academic Literature", "Inference Questions", "Tone & Purpose"] }
    ],
    status: "active",
    accentColor: "from-rose-600 to-pink-700",
    badge: "Study Abroad"
  }
];

const DEFAULT_TESTS = [
  // 1. JEE ADVANCED MOCK TEST (10 Questions)
  {
    _id: "test_cbt_jee",
    id: "test_cbt_jee",
    title: "All-India CBT Mock Test 1 – JEE / Advanced Tier",
    examId: "exam_jee_adv",
    category: "entrance",
    streamBadge: "JEE Advanced",
    durationMinutes: 45,
    totalQuestions: 10,
    totalMarks: 40,
    instructions: "This test comprises 10 questions. Questions 1-7 are Single Choice MCQs (+4, -1). Questions 8-9 are Multiple Select (+4, 0). Question 10 is Numerical Value NAT (+4, 0). Use the on-screen palette to navigate.",
    sections: ["Physics", "Chemistry", "Mathematics"],
    questions: [
      {
        id: "jee_q1",
        number: 1,
        section: "Physics",
        type: "MCQ",
        text: "A charged particle having charge q and mass m enters a uniform magnetic field B perpendicular to its velocity v. What is the radius of the circular path?",
        options: [
          { id: "A", text: "R = (m * v) / (q * B)" },
          { id: "B", text: "R = (q * B) / (m * v)" },
          { id: "C", text: "R = (m * B) / (q * v)" },
          { id: "D", text: "R = (q * v) / (m * B)" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "The centripetal force is supplied by the magnetic Lorentz force: m*v^2 / R = q*v*B => R = (m * v) / (q * B)."
      },
      {
        id: "jee_q2",
        number: 2,
        section: "Physics",
        type: "MCQ",
        text: "In Young's double-slit experiment, if the wavelength of monochromatic light is doubled and distance between slits is halved, the fringe width will:",
        options: [
          { id: "A", text: "Remain unchanged" },
          { id: "B", text: "Become 4 times" },
          { id: "C", text: "Become half" },
          { id: "D", text: "Become 2 times" }
        ],
        correctAnswer: "B",
        marks: 4,
        negativeMarks: -1,
        explanation: "Fringe width β = (λ * D) / d. If λ' = 2λ and d' = d/2, then β' = (2λ * D) / (d / 2) = 4 * β."
      },
      {
        id: "jee_q3",
        number: 3,
        section: "Chemistry",
        type: "MCQ",
        text: "Which of the following coordination complexes is expected to exhibit diamagnetism and inner orbital octahedral geometry?",
        options: [
          { id: "A", text: "[Fe(CN)6]4-" },
          { id: "B", text: "[FeF6]3-" },
          { id: "C", text: "[NiCl4]2-" },
          { id: "D", text: "[CoF6]3-" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "In [Fe(CN)6]4-, Fe is in +2 oxidation state (3d6). CN- is a strong field ligand, forcing pairing of all 6 d-electrons into t2g orbitals with zero unpaired electrons (d2sp3 diamagnetic)."
      },
      {
        id: "jee_q4",
        number: 4,
        section: "Chemistry",
        type: "MCQ",
        text: "According to Le Chatelier's principle, for an exothermic reaction at equilibrium: N2(g) + 3H2(g) ⇌ 2NH3(g), an increase in temperature will:",
        options: [
          { id: "A", text: "Shift equilibrium to the right" },
          { id: "B", text: "Shift equilibrium to the left (favouring reactants)" },
          { id: "C", text: "Have no effect on equilibrium yield" },
          { id: "D", text: "Increase the equilibrium constant Kp" }
        ],
        correctAnswer: "B",
        marks: 4,
        negativeMarks: -1,
        explanation: "For an exothermic reaction (ΔH < 0), adding heat shifts the equilibrium in the endothermic direction (backward to reactants)."
      },
      {
        id: "jee_q5",
        number: 5,
        section: "Mathematics",
        type: "MCQ",
        text: "Evaluate the limit: lim (x -> 0) [sin(5x) / tan(2x)].",
        options: [
          { id: "A", text: "5/2" },
          { id: "B", text: "2/5" },
          { id: "C", text: "1" },
          { id: "D", text: "0" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "lim (x->0) [sin(5x)/(5x) * 5] / [tan(2x)/(2x) * 2] = (1 * 5) / (1 * 2) = 5/2 = 2.5."
      },
      {
        id: "jee_q6",
        number: 6,
        section: "Mathematics",
        type: "MCQ",
        text: "The value of the definite integral ∫ from 0 to π/2 of [sin(x) / (sin(x) + cos(x))] dx is:",
        options: [
          { id: "A", text: "π / 4" },
          { id: "B", text: "π / 2" },
          { id: "C", text: "π" },
          { id: "D", text: "0" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "Using property I = ∫[f(a+b-x)], adding both equations gives 2I = ∫[0 to π/2] 1 dx = π/2 => I = π/4."
      },
      {
        id: "jee_q7",
        number: 7,
        section: "Physics",
        type: "MCQ",
        text: "A Carnot engine operates between temperatures 500 K and 300 K. What is its maximum theoretical thermodynamic efficiency?",
        options: [
          { id: "A", text: "40%" },
          { id: "B", text: "60%" },
          { id: "C", text: "25%" },
          { id: "D", text: "50%" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "Efficiency η = 1 - (Tc / Th) = 1 - (300 / 500) = 0.40 = 40%."
      },
      {
        id: "jee_q8",
        number: 8,
        section: "Mathematics",
        type: "MSQ",
        text: "(Multiple Correct) If a 3x3 real matrix A satisfies A^T = -A (skew-symmetric), which of the following statements MUST be true?",
        options: [
          { id: "A", text: "The determinant of A is zero" },
          { id: "B", text: "All diagonal entries of A are zero" },
          { id: "C", text: "All eigenvalues of A are purely imaginary or zero" },
          { id: "D", text: "A is always invertible" }
        ],
        correctAnswer: ["A", "B", "C"],
        marks: 4,
        negativeMarks: 0,
        explanation: "For odd order skew-symmetric matrix, det(A) = 0 (hence not invertible). Diagonal entries are zero, and eigenvalues are purely imaginary or zero."
      },
      {
        id: "jee_q9",
        number: 9,
        section: "Physics",
        type: "MSQ",
        text: "(Multiple Correct) For an ideal gas undergoing an adiabatic reversible expansion:",
        options: [
          { id: "A", text: "Heat exchange dQ = 0" },
          { id: "B", text: "Temperature of the gas decreases" },
          { id: "C", text: "Internal energy of the gas decreases" },
          { id: "D", text: "Work done on the surroundings is zero" }
        ],
        correctAnswer: ["A", "B", "C"],
        marks: 4,
        negativeMarks: 0,
        explanation: "In adiabatic expansion dQ=0. By 1st law dU = -dW. Since dW > 0 (expansion), dU < 0, hence internal energy and temperature decrease."
      },
      {
        id: "jee_q10",
        number: 10,
        section: "Mathematics",
        type: "NAT",
        text: "Numerical Answer: If f(x) = 3x^2 - 12x + 7, find the minimum value of f(x) for all real x.",
        correctAnswer: "-5",
        marks: 4,
        negativeMarks: 0,
        explanation: "f'(x) = 6x - 12 = 0 => x = 2. f''(x) = 6 > 0 (minimum). Minimum value = 3(4) - 12(2) + 7 = 12 - 24 + 7 = -5."
      }
    ]
  },

  // 2. NEET UG MEDICAL MOCK TEST (10 Questions)
  {
    _id: "test_cbt_neet",
    id: "test_cbt_neet",
    title: "All-India CBT Mock Test – NEET UG Medical Tier",
    examId: "exam_neet_ug",
    category: "entrance",
    streamBadge: "NEET UG",
    durationMinutes: 45,
    totalQuestions: 10,
    totalMarks: 40,
    instructions: "Standard NEET UG marking (+4 for correct, -1 for incorrect). Read each statement carefully before submitting.",
    sections: ["Biology", "Chemistry", "Physics"],
    questions: [
      {
        id: "neet_q1",
        number: 1,
        section: "Biology",
        type: "MCQ",
        text: "Double fertilization is a characteristic feature unique to which group of plants?",
        options: [
          { id: "A", text: "Angiosperms" },
          { id: "B", text: "Gymnosperms" },
          { id: "C", text: "Pteridophytes" },
          { id: "D", text: "Bryophytes" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "Double fertilization (Syngamy forming diploid zygote + Triple Fusion forming triploid endosperm) is unique to Angiosperms."
      },
      {
        id: "neet_q2",
        number: 2,
        section: "Biology",
        type: "MCQ",
        text: "In the human heart, which specialized cardiac tissue acts as the natural primary pacemaker?",
        options: [
          { id: "A", text: "Sinoatrial (SA) Node" },
          { id: "B", text: "Atrioventricular (AV) Node" },
          { id: "C", text: "Bundle of His" },
          { id: "D", text: "Purkinje Fibres" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "The Sinoatrial (SA) node generates rhythmic action potentials at the highest frequency (70-75/min), acting as the primary pacemaker."
      },
      {
        id: "neet_q3",
        number: 3,
        section: "Biology",
        type: "MCQ",
        text: "According to Chargaff's rules, in a double-stranded DNA molecule, which relationship is always TRUE?",
        options: [
          { id: "A", text: "A + G = T + C (Total Purines = Total Pyrimidines)" },
          { id: "B", text: "A + T = G + C" },
          { id: "C", text: "A = G and T = C" },
          { id: "D", text: "A / T = G / C = 2.0" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "Chargaff demonstrated that Adenine pairs with Thymine (A=T) and Guanine with Cytosine (G=C), so A + G = T + C."
      },
      {
        id: "neet_q4",
        number: 4,
        section: "Biology",
        type: "MCQ",
        text: "Which plant hormone is primarily responsible for promoting apical dominance by suppressing lateral buds?",
        options: [
          { id: "A", text: "Auxin (IAA)" },
          { id: "B", text: "Cytokinin" },
          { id: "C", text: "Gibberellic Acid" },
          { id: "D", text: "Abscisic Acid" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "Auxin synthesized at the shoot apex promotes apical dominance. Removing shoot tips allows cytokinins to stimulate lateral bud growth."
      },
      {
        id: "neet_q5",
        number: 5,
        section: "Chemistry",
        type: "MCQ",
        text: "What is the oxidation state of Chromium (Cr) in potassium dichromate (K2Cr2O7)?",
        options: [
          { id: "A", text: "+6" },
          { id: "B", text: "+7" },
          { id: "C", text: "+3" },
          { id: "D", text: "+4" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "2(+1) + 2(Cr) + 7(-2) = 0 => 2 + 2(Cr) - 14 = 0 => 2(Cr) = 12 => Cr = +6."
      },
      {
        id: "neet_q6",
        number: 6,
        section: "Chemistry",
        type: "MCQ",
        text: "Which of the following thermodynamic quantities is an EXTENSIVE property?",
        options: [
          { id: "A", text: "Enthalpy (H)" },
          { id: "B", text: "Temperature (T)" },
          { id: "C", text: "Refractive Index" },
          { id: "D", text: "Density" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "Enthalpy, volume, and internal energy depend on the quantity of matter present, making them extensive properties."
      },
      {
        id: "neet_q7",
        number: 7,
        section: "Chemistry",
        type: "MCQ",
        text: "The Cannizzaro reaction is characteristically exhibited by aldehydes that possess:",
        options: [
          { id: "A", text: "No alpha-hydrogen atom (e.g. Formaldehyde, Benzaldehyde)" },
          { id: "B", text: "At least two alpha-hydrogens" },
          { id: "C", text: "A beta-keto ester group" },
          { id: "D", text: "An aromatic phenolic ring" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "Aldehydes lacking alpha-hydrogen undergo self-oxidation-reduction (disproportionation) in concentrated alkali (Cannizzaro reaction)."
      },
      {
        id: "neet_q8",
        number: 8,
        section: "Physics",
        type: "MCQ",
        text: "A body of mass 2 kg is released from a height of 20 m. Taking g = 10 m/s^2, its kinetic energy just before hitting the ground is:",
        options: [
          { id: "A", text: "400 J" },
          { id: "B", text: "200 J" },
          { id: "C", text: "800 J" },
          { id: "D", text: "100 J" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "By conservation of mechanical energy: KE = Potential Energy lost = m * g * h = 2 * 10 * 20 = 400 Joules."
      },
      {
        id: "neet_q9",
        number: 9,
        section: "Physics",
        type: "MCQ",
        text: "If a cylindrical copper wire of resistance R is stretched uniformly such that its length doubles, its new resistance will be:",
        options: [
          { id: "A", text: "4 R" },
          { id: "B", text: "2 R" },
          { id: "C", text: "R / 2" },
          { id: "D", text: "16 R" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "Since volume V = L * A is constant, when L' = 2L, area becomes A' = A/2. New resistance R' = ρ(2L) / (A/2) = 4 * (ρL/A) = 4R."
      },
      {
        id: "neet_q10",
        number: 10,
        section: "Physics",
        type: "MCQ",
        text: "What is the SI unit of electric permittivity of free space (ε0)?",
        options: [
          { id: "A", text: "C^2 N^-1 m^-2" },
          { id: "B", text: "N m^2 C^-2" },
          { id: "C", text: "C N^-1 m^-1" },
          { id: "D", text: "Farad * meter" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: -1,
        explanation: "From Coulomb's Law F = (1 / 4πε0) * (q1 q2 / r^2) => ε0 = q^2 / (F * r^2) => Coulomb^2 / (Newton * meter^2) = C^2 N^-1 m^-2."
      }
    ]
  },

  // 3. UPSC CIVIL SERVICES PRELIMS (GS PAPER I) (10 Questions)
  {
    _id: "test_cbt_upsc",
    id: "test_cbt_upsc",
    title: "All-India CBT Mock Test – UPSC Civil Services GS Prelims",
    examId: "exam_upsc_cse",
    category: "civil_services",
    streamBadge: "UPSC Prelims",
    durationMinutes: 45,
    totalQuestions: 10,
    totalMarks: 20,
    instructions: "Standard UPSC GS Paper I scheme: +2 for correct response, -0.66 for incorrect response. Read multi-statement premises thoroughly.",
    sections: ["Polity & Governance", "Economy", "Environment & Geography", "History"],
    questions: [
      {
        id: "upsc_q1",
        number: 1,
        section: "Polity & Governance",
        type: "MCQ",
        text: "With reference to the Constitution of India, which one of the following rights was described by Dr. B.R. Ambedkar as the 'Heart and Soul of the Constitution'?",
        options: [
          { id: "A", text: "Right to Equality (Article 14)" },
          { id: "B", text: "Right to Freedom of Speech (Article 19)" },
          { id: "C", text: "Right to Constitutional Remedies (Article 32)" },
          { id: "D", text: "Right to Freedom of Religion (Article 25)" }
        ],
        correctAnswer: "C",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "Article 32 guarantees the right to approach the Supreme Court for enforcement of Fundamental Rights via writs (Habeas Corpus, Mandamus, etc.)."
      },
      {
        id: "upsc_q2",
        number: 2,
        section: "Polity & Governance",
        type: "MCQ",
        text: "Consider the following statements regarding a Money Bill under Article 110:\n1. It can be introduced only in the Lok Sabha on the recommendation of the President.\n2. The Rajya Sabha cannot reject or amend it, only make recommendations within 14 days.\nWhich of the statements given above is/are correct?",
        options: [
          { id: "A", text: "1 only" },
          { id: "B", text: "2 only" },
          { id: "C", text: "Both 1 and 2" },
          { id: "D", text: "Neither 1 nor 2" }
        ],
        correctAnswer: "C",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "Both statements are correct under Articles 109 and 110 of the Constitution of India."
      },
      {
        id: "upsc_q3",
        number: 3,
        section: "Economy",
        type: "MCQ",
        text: "In the context of the Indian economy, what does 'Open Market Operations' (OMOs) conducted by the Reserve Bank of India refer to?",
        options: [
          { id: "A", text: "Borrowing by scheduled commercial banks from RBI" },
          { id: "B", text: "Purchase and sale of government securities in the open market" },
          { id: "C", text: "Lending by commercial banks to priority agriculture sectors" },
          { id: "D", text: "Direct currency issuance by the Ministry of Finance" }
        ],
        correctAnswer: "B",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "OMOs are market operations conducted by the RBI by way of sale/purchase of Government securities to adjust rupee liquidity."
      },
      {
        id: "upsc_q4",
        number: 4,
        section: "Environment & Geography",
        type: "MCQ",
        text: "The Montreal Protocol on Substances that Deplete the Ozone Layer is an international treaty aimed at phasing out the production of:",
        options: [
          { id: "A", text: "Chlorofluorocarbons (CFCs) and Halons" },
          { id: "B", text: "Greenhouse gases like Carbon Dioxide" },
          { id: "C", text: "Persistent Organic Pollutants (POPs)" },
          { id: "D", text: "Nuclear and radioactive waste disposal" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "Adopted in 1987, the Montreal Protocol regulates the production and consumption of nearly 100 man-made ozone-depleting chemicals (ODS)."
      },
      {
        id: "upsc_q5",
        number: 5,
        section: "History",
        type: "MCQ",
        text: "The infamous Anarchical and Revolutionary Crimes Act of 1919 in British India was popularly known as:",
        options: [
          { id: "A", text: "The Rowlatt Act" },
          { id: "B", text: "The Ilbert Bill" },
          { id: "C", text: "The Vernacular Press Act" },
          { id: "D", text: "The Morley-Minto Reforms" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "The Rowlatt Act authorized the British government to imprison individuals suspected of terrorism without trial for up to two years."
      },
      {
        id: "upsc_q6",
        number: 6,
        section: "Environment & Geography",
        type: "MCQ",
        text: "Which significant line of latitude passes roughly through the middle of the Indian landmass across 8 states?",
        options: [
          { id: "A", text: "Tropic of Cancer (23°30' N)" },
          { id: "B", text: "Equator (0°)" },
          { id: "C", text: "Tropic of Capricorn (23°30' S)" },
          { id: "D", text: "Arctic Circle (66°30' N)" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram."
      },
      {
        id: "upsc_q7",
        number: 7,
        section: "Polity & Governance",
        type: "MCQ",
        text: "The landmark 73rd Constitutional Amendment Act, 1992 inserted which Schedule into the Indian Constitution?",
        options: [
          { id: "A", text: "Eleventh Schedule (Panchayati Raj Institutions)" },
          { id: "B", text: "Twelfth Schedule (Municipalities)" },
          { id: "C", text: "Tenth Schedule (Anti-Defection Law)" },
          { id: "D", text: "Seventh Schedule (Union/State Lists)" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "The 73rd Amendment added Part IX and the 11th Schedule containing 29 functional items for Panchayats."
      },
      {
        id: "upsc_q8",
        number: 8,
        section: "Economy",
        type: "MCQ",
        text: "In macroeconomic theory, what is 'Inflation Tax'?",
        options: [
          { id: "A", text: "The penalty imposed by loss of purchasing power on money holders during high inflation" },
          { id: "B", text: "A direct surcharge levied by the government on luxury goods" },
          { id: "C", text: "A customs duty on exported commodities" },
          { id: "D", text: "Taxes paid by commercial banks to the central monetary authority" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "Inflation tax refers to the economic disadvantage suffered by holders of cash because inflation erodes real value of currency."
      },
      {
        id: "upsc_q9",
        number: 9,
        section: "Environment & Geography",
        type: "MCQ",
        text: "The Ecological Footprint metric is standardly expressed in units of:",
        options: [
          { id: "A", text: "Global Hectares (gha)" },
          { id: "B", text: "Parts per million (ppm)" },
          { id: "C", text: "Metric tons of sulfur dioxide" },
          { id: "D", text: "Decibels (dB)" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "Ecological Footprint measures biologically productive land and water area needed to produce consumed resources, expressed in global hectares (gha)."
      },
      {
        id: "upsc_q10",
        number: 10,
        section: "Polity & Governance",
        type: "MCQ",
        text: "The doctrine of 'Basic Structure' of the Indian Constitution was first formally articulated by the Supreme Court in:",
        options: [
          { id: "A", text: "Kesavananda Bharati v. State of Kerala (1973)" },
          { id: "B", text: "Golaknath v. State of Punjab (1967)" },
          { id: "C", text: "Minerva Mills v. Union of India (1980)" },
          { id: "D", text: "Maneka Gandhi v. Union of India (1978)" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "A historic 13-judge bench in Kesavananda Bharati (1973) held that Parliament cannot alter the basic structure or essential framework of the Constitution."
      }
    ]
  },

  // 4. GATE CS & IT ENGINEERING (10 Questions)
  {
    _id: "test_cbt_gate",
    id: "test_cbt_gate",
    title: "All-India CBT Mock Test – GATE Computer Science & Engineering",
    examId: "exam_gate_cs",
    category: "entrance",
    streamBadge: "GATE CS",
    durationMinutes: 45,
    totalQuestions: 10,
    totalMarks: 20,
    instructions: "Standard GATE examination pattern: +2 for correct, -0.66 for incorrect MCQ choices. NAT questions carry no negative marking.",
    sections: ["Algorithms", "Operating Systems", "Computer Networks", "DBMS"],
    questions: [
      {
        id: "gate_q1",
        number: 1,
        section: "Operating Systems",
        type: "MCQ",
        text: "In operating systems, the Banker's Algorithm is primarily deployed for:",
        options: [
          { id: "A", text: "Deadlock Avoidance" },
          { id: "B", text: "Deadlock Detection & Recovery" },
          { id: "C", text: "Mutual Exclusion enforcement" },
          { id: "D", text: "Cache Replacement management" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "The Banker's Algorithm tests for safety by simulating the allocation for predetermined maximum possible amounts of all resources (Deadlock Avoidance)."
      },
      {
        id: "gate_q2",
        number: 2,
        section: "Computer Networks",
        type: "MCQ",
        text: "In TCP congestion control, upon receiving 3 duplicate ACKs for an unacknowledged segment, TCP immediately enters:",
        options: [
          { id: "A", text: "Fast Retransmit & Fast Recovery" },
          { id: "B", text: "Slow Start with cwnd = 1 MSS" },
          { id: "C", text: "Connection Termination Phase (FIN)" },
          { id: "D", text: "Three-way Handshake renegotiation" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "3 duplicate ACKs signify packet loss while connection is still alive, triggering Fast Retransmit without dropping cwnd back to 1."
      },
      {
        id: "gate_q3",
        number: 3,
        section: "Algorithms",
        type: "MCQ",
        text: "What is the worst-case time complexity of Dijkstra's Single Source Shortest Path algorithm implemented using a Min-Heap priority queue on graph G(V, E)?",
        options: [
          { id: "A", text: "O((V + E) log V)" },
          { id: "B", text: "O(V^2)" },
          { id: "C", text: "O(V * E)" },
          { id: "D", text: "O(E log E + V^2)" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "Extracting min takes O(log V) V times, and decrease-key takes O(log V) at most E times, yielding O((V + E) log V)."
      },
      {
        id: "gate_q4",
        number: 4,
        section: "DBMS",
        type: "MCQ",
        text: "In database ACID properties, which property ensures that the execution of concurrent transactions yields an identical state as if transactions executed serially?",
        options: [
          { id: "A", text: "Isolation (Serializability)" },
          { id: "B", text: "Atomicity" },
          { id: "C", text: "Consistency" },
          { id: "D", text: "Durability" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "Isolation guarantees that concurrently running transactions do not interfere with one another and produce serializable outcomes."
      },
      {
        id: "gate_q5",
        number: 5,
        section: "Algorithms",
        type: "MCQ",
        text: "The formal language L = { a^n b^n | n >= 1 } is classified under the Chomsky hierarchy as:",
        options: [
          { id: "A", text: "Context-Free but NOT Regular" },
          { id: "B", text: "Regular Language" },
          { id: "C", text: "Context-Sensitive but NOT Context-Free" },
          { id: "D", text: "Unrestricted Recursively Enumerable" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "Pumping Lemma proves L cannot be parsed by finite automata (memoryless), but can be accepted by a Pushdown Automaton using a stack."
      },
      {
        id: "gate_q6",
        number: 6,
        section: "Operating Systems",
        type: "MCQ",
        text: "Belady's Anomaly (where increasing the number of page frames leads to an INCREASE in page faults) can occur in which page replacement algorithm?",
        options: [
          { id: "A", text: "FIFO (First In First Out)" },
          { id: "B", text: "LRU (Least Recently Used)" },
          { id: "C", text: "Optimal Page Replacement (OPT)" },
          { id: "D", text: "Clock Algorithm with reference bits" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "Belady's Anomaly occurs in non-stack algorithms like FIFO. Stack algorithms like LRU and OPT are immune."
      },
      {
        id: "gate_q7",
        number: 7,
        section: "Algorithms",
        type: "MCQ",
        text: "In a B+ Tree index of order m, pointers to actual database data records are stored exclusively in:",
        options: [
          { id: "A", text: "Leaf Nodes only" },
          { id: "B", text: "Root Node only" },
          { id: "C", text: "All internal and leaf nodes equally" },
          { id: "D", text: "Header block only" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "In B+ trees, internal nodes store only router search keys; all payload data pointers reside at leaf nodes, linked sequentially."
      },
      {
        id: "gate_q8",
        number: 8,
        section: "Computer Networks",
        type: "MCQ",
        text: "Which IP header field prevents a packet from circulating indefinitely in network routing loops?",
        options: [
          { id: "A", text: "Time to Live (TTL)" },
          { id: "B", text: "Header Checksum" },
          { id: "C", text: "Type of Service (ToS)" },
          { id: "D", text: "Identification Field" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "Every router decrements the TTL field by 1. When TTL reaches 0, the packet is discarded and an ICMP Time Exceeded message is sent."
      },
      {
        id: "gate_q9",
        number: 9,
        section: "Algorithms",
        type: "MCQ",
        text: "What is the minimum number of 2-to-1 Multiplexers required to synthesize a standard 2-input XOR logic gate?",
        options: [
          { id: "A", text: "2" },
          { id: "B", text: "1" },
          { id: "C", text: "3" },
          { id: "D", text: "4" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.66,
        explanation: "One 2:1 MUX generates B', and the second 2:1 MUX selects between B and B' using A as select line: A B' + A' B."
      },
      {
        id: "gate_q10",
        number: 10,
        section: "Operating Systems",
        type: "NAT",
        text: "Numerical Answer: Consider a memory hierarchy with cache access time = 2 ns and main memory access time = 20 ns. If the cache hit ratio is 0.90, what is the Average Memory Access Time (AMAT) in nanoseconds?",
        correctAnswer: "4",
        marks: 2,
        negativeMarks: 0,
        explanation: "AMAT = Hit Time + (Miss Rate * Miss Penalty) = 2 ns + (1 - 0.90) * 20 ns = 2 + 2 = 4 ns."
      }
    ]
  },

  // 5. CAT 2026 MANAGEMENT / MBA MOCK TEST (10 Questions)
  {
    _id: "test_cbt_cat",
    id: "test_cbt_cat",
    title: "All-India CBT Mock Test – CAT 2026 IIMs Tier",
    examId: "exam_cat_mba",
    category: "entrance",
    streamBadge: "CAT (IIMs)",
    durationMinutes: 45,
    totalQuestions: 10,
    totalMarks: 30,
    instructions: "Standard CAT IIM grading: +3 marks for correct choice, -1 for incorrect choice. NAT questions have zero negative penalty.",
    sections: ["Quantitative Aptitude (QA)", "DILR", "VARC"],
    questions: [
      {
        id: "cat_q1",
        number: 1,
        section: "Quantitative Aptitude (QA)",
        type: "MCQ",
        text: "If x + (1/x) = 4, what is the exact value of x^3 + (1/x^3)?",
        options: [
          { id: "A", text: "52" },
          { id: "B", text: "64" },
          { id: "C", text: "48" },
          { id: "D", text: "56" }
        ],
        correctAnswer: "A",
        marks: 3,
        negativeMarks: -1,
        explanation: "Using algebraic identity x^3 + 1/x^3 = (x + 1/x)^3 - 3(x + 1/x) = 4^3 - 3(4) = 64 - 12 = 52."
      },
      {
        id: "cat_q2",
        number: 2,
        section: "Quantitative Aptitude (QA)",
        type: "MCQ",
        text: "A train running at a uniform speed of 72 km/h crosses a 200 m long platform in 25 seconds. What is the length of the train?",
        options: [
          { id: "A", text: "300 meters" },
          { id: "B", text: "250 meters" },
          { id: "C", text: "350 meters" },
          { id: "D", text: "400 meters" }
        ],
        correctAnswer: "A",
        marks: 3,
        negativeMarks: -1,
        explanation: "Speed = 72 * (5/18) = 20 m/s. Total distance = speed * time = 20 * 25 = 500 m. Train length = 500 - 200 = 300 m."
      },
      {
        id: "cat_q3",
        number: 3,
        section: "Quantitative Aptitude (QA)",
        type: "MCQ",
        text: "In how many distinct ways can 5 books be arranged on a shelf such that two specific books must always be placed side by side?",
        options: [
          { id: "A", text: "48" },
          { id: "B", text: "24" },
          { id: "C", text: "120" },
          { id: "D", text: "72" }
        ],
        correctAnswer: "A",
        marks: 3,
        negativeMarks: -1,
        explanation: "Tie the 2 books as 1 unit. We arrange 4 units in 4! ways = 24. The 2 books can be arranged in 2! ways = 2. Total = 24 * 2 = 48."
      },
      {
        id: "cat_q4",
        number: 4,
        section: "Quantitative Aptitude (QA)",
        type: "MCQ",
        text: "A sum invested under compound interest compounded annually doubles itself in 4 years. In how many years will it become 8 times itself at the same rate?",
        options: [
          { id: "A", text: "12 years" },
          { id: "B", text: "16 years" },
          { id: "C", text: "8 years" },
          { id: "D", text: "24 years" }
        ],
        correctAnswer: "A",
        marks: 3,
        negativeMarks: -1,
        explanation: "Principal multiplies by 2 in 4 years. To become 8 times (2^3), time required = 3 * 4 = 12 years."
      },
      {
        id: "cat_q5",
        number: 5,
        section: "DILR",
        type: "MCQ",
        text: "In a cohort of 100 students, 60 play cricket, 40 play football, and 20 play both sports. How many students play NEITHER cricket nor football?",
        options: [
          { id: "A", text: "20" },
          { id: "B", text: "10" },
          { id: "C", text: "30" },
          { id: "D", text: "0" }
        ],
        correctAnswer: "A",
        marks: 3,
        negativeMarks: -1,
        explanation: "n(C ∪ F) = n(C) + n(F) - n(C ∩ F) = 60 + 40 - 20 = 80. Neither = 100 - 80 = 20."
      },
      {
        id: "cat_q6",
        number: 6,
        section: "DILR",
        type: "MCQ",
        text: "Five executives A, B, C, D, and E sit in a circle facing the center. A sits immediately to the left of B. C sits between D and E. If D sits directly opposite B, who sits directly opposite A?",
        options: [
          { id: "A", text: "E" },
          { id: "B", text: "C" },
          { id: "C", text: "D" },
          { id: "D", text: "Cannot be determined" }
        ],
        correctAnswer: "A",
        marks: 3,
        negativeMarks: -1,
        explanation: "Clockwise arrangement starting from B: B, A, E, C, D. E sits directly across from A."
      },
      {
        id: "cat_q7",
        number: 7,
        section: "VARC",
        type: "MCQ",
        text: "Identify the grammatically flawed segment: 'Neither of the candidate (A) / have submitted (B) / their original credential documents (C) / for verification (D)'.",
        options: [
          { id: "A", text: "Segment (B) - should be 'has submitted'" },
          { id: "B", text: "Segment (A) - should be 'None of the'" },
          { id: "C", text: "Segment (C) - should be 'his or her'" },
          { id: "D", text: "No error" }
        ],
        correctAnswer: "A",
        marks: 3,
        negativeMarks: -1,
        explanation: "'Neither' as a pronoun takes a singular verb. 'have submitted' is incorrect and must be 'has submitted'."
      },
      {
        id: "cat_q8",
        number: 8,
        section: "VARC",
        type: "MCQ",
        text: "Select the most accurate antonym for the word 'LACONIC':",
        options: [
          { id: "A", text: "Verbose" },
          { id: "B", text: "Succinct" },
          { id: "C", text: "Taciturn" },
          { id: "D", text: "Pithy" }
        ],
        correctAnswer: "A",
        marks: 3,
        negativeMarks: -1,
        explanation: "'Laconic' means using very few words (concise). Its direct opposite is 'Verbose' (using far more words than necessary)."
      },
      {
        id: "cat_q9",
        number: 9,
        section: "VARC",
        type: "MCQ",
        text: "Find the synonym of 'EPHEMERAL':",
        options: [
          { id: "A", text: "Transient" },
          { id: "B", text: "Perennial" },
          { id: "C", text: "Enduring" },
          { id: "D", text: "Immutable" }
        ],
        correctAnswer: "A",
        marks: 3,
        negativeMarks: -1,
        explanation: "Ephemeral means lasting for a very short time; transient is synonymous."
      },
      {
        id: "cat_q10",
        number: 10,
        section: "Quantitative Aptitude (QA)",
        type: "NAT",
        text: "Numerical Answer: The perimeter of an equilateral triangle is 36 cm. Find the square of its altitude (height^2) in cm^2.",
        correctAnswer: "108",
        marks: 3,
        negativeMarks: 0,
        explanation: "Side a = 36 / 3 = 12 cm. Height h = (√3 / 2) * a = (√3 / 2) * 12 = 6√3 cm. h^2 = (6√3)^2 = 36 * 3 = 108."
      }
    ]
  },

  // 6. CORPORATE SWE / TECH INTERVIEW MOCK TEST (10 Questions)
  {
    _id: "test_cbt_swe",
    id: "test_cbt_swe",
    title: "All-India CBT Mock Test – Tier-1 Software Engineer Round",
    examId: "exam_swe_faang",
    category: "corporate",
    streamBadge: "Corporate SWE",
    durationMinutes: 45,
    totalQuestions: 10,
    totalMarks: 40,
    instructions: "Evaluation covers DSA, React reconciliation, System Design, and Concurrency. Scheme: +4 per question, 0 negative marking.",
    sections: ["Data Structures & Algorithms", "Full-Stack Core", "System Design"],
    questions: [
      {
        id: "swe_q1",
        number: 1,
        section: "Data Structures & Algorithms",
        type: "MCQ",
        text: "What is the amortized time complexity of inserting n consecutive elements into a standard Hash Map with open addressing and a good hash function?",
        options: [
          { id: "A", text: "O(n)" },
          { id: "B", text: "O(n log n)" },
          { id: "C", text: "O(n^2)" },
          { id: "D", text: "O(1)" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: 0,
        explanation: "Each insertion is O(1) amortized, so inserting n elements takes O(n) total time."
      },
      {
        id: "swe_q2",
        number: 2,
        section: "Full-Stack Core",
        type: "MCQ",
        text: "In React 18/19, what is the primary optimization provided by wrapping a component with React.memo()?",
        options: [
          { id: "A", text: "Skips rendering if props are shallowly equal to previous props" },
          { id: "B", text: "Stores component state in browser localStorage automatically" },
          { id: "C", text: "Executes component render logic in a background Web Worker" },
          { id: "D", text: "Converts component JSX to WebGL shaders" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: 0,
        explanation: "React.memo is a higher-order component that memoizes the rendered output, skipping re-renders when incoming props remain shallowly unchanged."
      },
      {
        id: "swe_q3",
        number: 3,
        section: "Full-Stack Core",
        type: "MCQ",
        text: "What is the return value of executing `typeof NaN` in standard ECMAScript / JavaScript?",
        options: [
          { id: "A", text: "'number'" },
          { id: "B", text: "'NaN'" },
          { id: "C", text: "'undefined'" },
          { id: "D", text: "'object'" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: 0,
        explanation: "In IEEE 754 floating point arithmetic and JavaScript specification, NaN represents 'Not-a-Number' but belongs to the numeric primitive type."
      },
      {
        id: "swe_q4",
        number: 4,
        section: "System Design",
        type: "MCQ",
        text: "According to Brewer's CAP Theorem, when an asynchronous network partition (P) occurs in a distributed database, architects must choose between:",
        options: [
          { id: "A", text: "Consistency (C) vs Availability (A)" },
          { id: "B", text: "Concurrency (C) vs Performance (P)" },
          { id: "C", text: "Atomicity (A) vs Durability (D)" },
          { id: "D", text: "Latency (L) vs Throughput (T)" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: 0,
        explanation: "Since network partitions (P) are unavoidable in distributed hardware, you must trade off returning the most recent write (Consistency) vs returning a response on every node (Availability)."
      },
      {
        id: "swe_q5",
        number: 5,
        section: "Full-Stack Core",
        type: "MCQ",
        text: "Which HTTP security response header prevents attackers from embedding your website into malicious iframes (Clickjacking defense)?",
        options: [
          { id: "A", text: "X-Frame-Options: DENY" },
          { id: "B", text: "Access-Control-Allow-Origin: *" },
          { id: "C", text: "Strict-Transport-Security: max-age=31536000" },
          { id: "D", text: "Cache-Control: no-store" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: 0,
        explanation: "X-Frame-Options (or CSP frame-ancestors 'none') instructs browsers never to render page contents inside an iframe or frame."
      },
      {
        id: "swe_q6",
        number: 6,
        section: "System Design",
        type: "MCQ",
        text: "Which caching strategy writes data simultaneously to both the cache store AND the backing persistent database before returning a success response?",
        options: [
          { id: "A", text: "Write-Through" },
          { id: "B", text: "Write-Behind (Write-Back)" },
          { id: "C", text: "Cache-Aside (Lazy Loading)" },
          { id: "D", text: "Refresh-Ahead" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: 0,
        explanation: "In Write-Through, the application updates cache and database synchronously. In Write-Behind, database write is queued asynchronously."
      },
      {
        id: "swe_q7",
        number: 7,
        section: "Full-Stack Core",
        type: "MCQ",
        text: "In relational database engines (PostgreSQL, MySQL InnoDB), what index structure is standardly used for indexing primary keys and range queries?",
        options: [
          { id: "A", text: "B+ Tree" },
          { id: "B", text: "Hash Index" },
          { id: "C", text: "Inverted Index" },
          { id: "D", text: "Splay Tree" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: 0,
        explanation: "B+ trees keep all records at linked leaf nodes, providing log(n) lookups while enabling high-efficiency sequential range scanning."
      },
      {
        id: "swe_q8",
        number: 8,
        section: "System Design",
        type: "MCQ",
        text: "In Redis, which primitive command atomically increments the integer value of a key by 1 without requiring external locks?",
        options: [
          { id: "A", text: "INCR" },
          { id: "B", text: "SETADD" },
          { id: "C", text: "APPEND" },
          { id: "D", text: "HINCRBYFLOAT" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: 0,
        explanation: "INCR is executed atomically on the single-threaded event loop of Redis, making it ideal for distributed rate limiters and counters."
      },
      {
        id: "swe_q9",
        number: 9,
        section: "Data Structures & Algorithms",
        type: "MCQ",
        text: "What is the worst-case time complexity of QuickSort on an already sorted array of n elements when using the first element as the pivot?",
        options: [
          { id: "A", text: "O(n^2)" },
          { id: "B", text: "O(n log n)" },
          { id: "C", text: "O(n)" },
          { id: "D", text: "O(log n)" }
        ],
        correctAnswer: "A",
        marks: 4,
        negativeMarks: 0,
        explanation: "When already sorted and first element is pivot, partitions are completely unbalanced (0 and n-1 elements), degenerating recurrence to T(n) = T(n-1) + O(n) = O(n^2)."
      },
      {
        id: "swe_q10",
        number: 10,
        section: "Data Structures & Algorithms",
        type: "NAT",
        text: "Numerical Answer: If an algorithm has time complexity T(n) = 2 T(n/2) + n with T(1) = 1, how many total operations are performed when n = 8?",
        correctAnswer: "32",
        marks: 4,
        negativeMarks: 0,
        explanation: "T(8) = 2*T(4) + 8. T(4) = 2*T(2) + 4. T(2) = 2*T(1) + 2 = 2(1) + 2 = 4. T(4) = 2(4) + 4 = 12. T(8) = 2(12) + 8 = 32."
      }
    ]
  },

  // 7. SSC CGL & BANKING PO MOCK TEST (10 Questions)
  {
    _id: "test_cbt_ssc",
    id: "test_cbt_ssc",
    title: "All-India CBT Mock Test – SSC CGL & Banking PO",
    examId: "exam_ssc_cgl",
    category: "government",
    streamBadge: "SSC / Banking",
    durationMinutes: 45,
    totalQuestions: 10,
    totalMarks: 20,
    instructions: "Standard SSC Tier-I marking: +2 for correct answer, -0.50 for incorrect. Time management is critical.",
    sections: ["Quantitative Aptitude", "General Intelligence & Reasoning", "General Awareness", "English"],
    questions: [
      {
        id: "ssc_q1",
        number: 1,
        section: "Quantitative Aptitude",
        type: "MCQ",
        text: "If the cost price of 15 articles is equal to the selling price of 12 articles, find the profit percentage:",
        options: [
          { id: "A", text: "25%" },
          { id: "B", text: "20%" },
          { id: "C", text: "30%" },
          { id: "D", text: "16.66%" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.5,
        explanation: "Let CP of 1 article = Rs 1. CP of 12 articles = Rs 12. SP of 12 articles = CP of 15 articles = Rs 15. Profit = 15 - 12 = 3. Profit % = (3 / 12) * 100 = 25%."
      },
      {
        id: "ssc_q2",
        number: 2,
        section: "Quantitative Aptitude",
        type: "MCQ",
        text: "What is the Highest Common Factor (HCF) of fractions 2/3, 8/9, 64/81, and 10/27?",
        options: [
          { id: "A", text: "2 / 81" },
          { id: "B", text: "160 / 3" },
          { id: "C", text: "2 / 27" },
          { id: "D", text: "8 / 81" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.5,
        explanation: "HCF of fractions = HCF(numerators) / LCM(denominators) = HCF(2, 8, 64, 10) / LCM(3, 9, 81, 27) = 2 / 81."
      },
      {
        id: "ssc_q3",
        number: 3,
        section: "General Intelligence & Reasoning",
        type: "MCQ",
        text: "In a certain code language, if 'DOCTOR' is written as 'EQEUPS', how will 'NURSE' be written in that code?",
        options: [
          { id: "A", text: "OVSTF" },
          { id: "B", text: "PWTUG" },
          { id: "C", text: "OTSRF" },
          { id: "D", text: "MTQRD" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.5,
        explanation: "Each letter is shifted forward by +1: N->O, U->V, R->S, S->T, E->F => OVSTF."
      },
      {
        id: "ssc_q4",
        number: 4,
        section: "General Intelligence & Reasoning",
        type: "MCQ",
        text: "Syllogism: Statements: (1) All pens are books. (2) Some books are markers. Which conclusion logically follows?",
        options: [
          { id: "A", text: "Some books are pens" },
          { id: "B", text: "All markers are pens" },
          { id: "C", text: "No pen is a book" },
          { id: "D", text: "All books are markers" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.5,
        explanation: "If All pens are books (A -> B), the converse 'Some books are pens' is always universally true."
      },
      {
        id: "ssc_q5",
        number: 5,
        section: "General Awareness",
        type: "MCQ",
        text: "Who was the founder of the Maurya Empire in ancient India with the strategic guidance of Chanakya?",
        options: [
          { id: "A", text: "Chandragupta Maurya" },
          { id: "B", text: "Ashoka the Great" },
          { id: "C", text: "Bindusara" },
          { id: "D", text: "Brihadratha" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.5,
        explanation: "Chandragupta Maurya founded the Maurya Empire in 322 BCE after overthrowing the Nanda dynasty with Chanakya's counsel."
      },
      {
        id: "ssc_q6",
        number: 6,
        section: "General Awareness",
        type: "MCQ",
        text: "Which classical dance tradition originated and flourished in the coastal state of Kerala?",
        options: [
          { id: "A", text: "Kathakali" },
          { id: "B", text: "Bharatanatyam" },
          { id: "C", text: "Kathak" },
          { id: "D", text: "Kuchipudi" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.5,
        explanation: "Kathakali and Mohiniyattam are classical dance dramas native to Kerala."
      },
      {
        id: "ssc_q7",
        number: 7,
        section: "English",
        type: "MCQ",
        text: "Choose the alternative with the correct orthographic spelling:",
        options: [
          { id: "A", text: "Maintenance" },
          { id: "B", text: "Maintainance" },
          { id: "C", text: "Maintanence" },
          { id: "D", text: "Maintinence" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.5,
        explanation: "'Maintenance' is the correct spelling (derived from maintain, but spelled m-a-i-n-t-e-n-a-n-c-e)."
      },
      {
        id: "ssc_q8",
        number: 8,
        section: "English",
        type: "MCQ",
        text: "What is the meaning of the idiomatic phrase 'To bell the cat'?",
        options: [
          { id: "A", text: "To undertake a daring or hazardous task" },
          { id: "B", text: "To feed domestic animals" },
          { id: "C", text: "To reveal a secret prematurely" },
          { id: "D", text: "To flatter a person in power" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.5,
        explanation: "'To bell the cat' originates from Aesop's fable, meaning to attempt an initiative that is dangerous to all."
      },
      {
        id: "ssc_q9",
        number: 9,
        section: "Quantitative Aptitude",
        type: "MCQ",
        text: "Pipes A and B can fill an empty reservoir in 20 minutes and 30 minutes respectively. If both valves open simultaneously, how many minutes will it take to fill the reservoir completely?",
        options: [
          { id: "A", text: "12 minutes" },
          { id: "B", text: "15 minutes" },
          { id: "C", text: "25 minutes" },
          { id: "D", text: "10 minutes" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.5,
        explanation: "Net rate = 1/20 + 1/30 = (3 + 2)/60 = 5/60 = 1/12 reservoir/minute. Time required = 12 minutes."
      },
      {
        id: "ssc_q10",
        number: 10,
        section: "General Awareness",
        type: "MCQ",
        text: "In India, which constitutional institution is empowered to audit all receipts and expenditure of the Government of India under Article 148?",
        options: [
          { id: "A", text: "Comptroller and Auditor General of India (CAG)" },
          { id: "B", text: "Attorney General of India" },
          { id: "C", text: "Finance Commission" },
          { id: "D", text: "NITI Aayog" }
        ],
        correctAnswer: "A",
        marks: 2,
        negativeMarks: -0.5,
        explanation: "The CAG of India (Article 148) is the guardian of the public purse and audits all revenue and expenditure of Union and State governments."
      }
    ]
  },

  // 8. STUDY ABROAD: IELTS & GRE ACADEMIC (10 Questions)
  {
    _id: "test_cbt_ielts",
    id: "test_cbt_ielts",
    title: "All-India CBT Mock Test – IELTS & GRE Study Abroad",
    examId: "exam_ielts_abroad",
    category: "study_abroad",
    streamBadge: "IELTS / GRE",
    durationMinutes: 45,
    totalQuestions: 10,
    totalMarks: 10,
    instructions: "Evaluation covers Verbal Reasoning, Quantitative, and Analytical reading comprehension. Scheme: +1 mark per question, zero negative penalty.",
    sections: ["Verbal Reasoning", "Quantitative Reasoning", "Reading Comprehension"],
    questions: [
      {
        id: "ielts_q1",
        number: 1,
        section: "Verbal Reasoning",
        type: "MCQ",
        text: "Select the word that best completes the sentence: 'Despite the initial hostility between the rival factions, the diplomat's _____ efforts eventually brokered an enduring ceasefire.'",
        options: [
          { id: "A", text: "conciliatory" },
          { id: "B", text: "bellicose" },
          { id: "C", text: "intransigent" },
          { id: "D", text: "pugnacious" }
        ],
        correctAnswer: "A",
        marks: 1,
        negativeMarks: 0,
        explanation: "'Conciliatory' means intended to placate or pacify, contrasting logically with initial hostility."
      },
      {
        id: "ielts_q2",
        number: 2,
        section: "Verbal Reasoning",
        type: "MCQ",
        text: "GRE Vocabulary: The term 'AMELIORATE' most nearly means:",
        options: [
          { id: "A", text: "To improve or make more bearable" },
          { id: "B", text: "To aggravate or worsen" },
          { id: "C", text: "To praise enthusiastically" },
          { id: "D", text: "To delay intentionally" }
        ],
        correctAnswer: "A",
        marks: 1,
        negativeMarks: 0,
        explanation: "'Ameliorate' means to make something bad or unsatisfactory better."
      },
      {
        id: "ielts_q3",
        number: 3,
        section: "Verbal Reasoning",
        type: "MCQ",
        text: "Choose the exact opposite (antonym) of 'PRAGMATIC':",
        options: [
          { id: "A", text: "Quixotic / Idealistic" },
          { id: "B", text: "Empirical" },
          { id: "C", text: "Sensible" },
          { id: "D", text: "Expedient" }
        ],
        correctAnswer: "A",
        marks: 1,
        negativeMarks: 0,
        explanation: "Pragmatic means dealing with things sensibly and realistically; quixotic means exceedingly idealistic and impractical."
      },
      {
        id: "ielts_q4",
        number: 4,
        section: "Reading Comprehension",
        type: "MCQ",
        text: "In IELTS Academic Reading, if a passage states that 'solar panel efficiency has plateaued near 22% in commercial silicon cells', the assertion 'Commercial silicon solar cells routinely convert 40% of sunlight into electricity' is:",
        options: [
          { id: "A", text: "FALSE" },
          { id: "B", text: "TRUE" },
          { id: "C", text: "NOT GIVEN" },
          { id: "D", text: "Ambiguous" }
        ],
        correctAnswer: "A",
        marks: 1,
        negativeMarks: 0,
        explanation: "The assertion directly contradicts the passage facts (22% vs 40%), hence it is unequivocally FALSE."
      },
      {
        id: "ielts_q5",
        number: 5,
        section: "Quantitative Reasoning",
        type: "MCQ",
        text: "If 3x - 5 = 16, what is the value of 6x + 7?",
        options: [
          { id: "A", text: "49" },
          { id: "B", text: "42" },
          { id: "C", text: "35" },
          { id: "D", text: "56" }
        ],
        correctAnswer: "A",
        marks: 1,
        negativeMarks: 0,
        explanation: "3x = 16 + 5 = 21 => x = 7. Therefore, 6(7) + 7 = 42 + 7 = 49."
      },
      {
        id: "ielts_q6",
        number: 6,
        section: "Quantitative Reasoning",
        type: "MCQ",
        text: "A box contains 4 red balls, 6 green balls, and 5 blue balls. If one ball is chosen at random, what is the probability that the ball drawn is NOT red?",
        options: [
          { id: "A", text: "11 / 15" },
          { id: "B", text: "4 / 15" },
          { id: "C", text: "2 / 3" },
          { id: "D", text: "7 / 15" }
        ],
        correctAnswer: "A",
        marks: 1,
        negativeMarks: 0,
        explanation: "Total balls = 4 + 6 + 5 = 15. Non-red balls = 6 + 5 = 11. P(not red) = 11 / 15."
      },
      {
        id: "ielts_q7",
        number: 7,
        section: "Verbal Reasoning",
        type: "MCQ",
        text: "Select the sentence free of dangling modifiers or grammatical ambiguity:",
        options: [
          { id: "A", text: "Having completed the experiment, the researcher recorded the observations." },
          { id: "B", text: "Having completed the experiment, the observations were recorded by the researcher." },
          { id: "C", text: "Having completed the experiment, the laboratory was locked." },
          { id: "D", text: "The researcher, having completed the experiment, the results were published." }
        ],
        correctAnswer: "A",
        marks: 1,
        negativeMarks: 0,
        explanation: "The participatory phrase 'Having completed the experiment' must be immediately followed by the subject who performed it ('the researcher')."
      },
      {
        id: "ielts_q8",
        number: 8,
        section: "Reading Comprehension",
        type: "MCQ",
        text: "When an academic reviewer states an author's methodology is 'rigorous yet excessively pedantic', the tone is:",
        options: [
          { id: "A", text: "Critical of excessive focus on minute details despite admiring accuracy" },
          { id: "B", text: "Unconditionally celebratory" },
          { id: "C", text: "Completely dismissive of the research" },
          { id: "D", text: "Sarcastic and disdainful" }
        ],
        correctAnswer: "A",
        marks: 1,
        negativeMarks: 0,
        explanation: "'Pedantic' denotes overly concerned with formalism and minutiae, presenting a balanced critique alongside 'rigorous'."
      },
      {
        id: "ielts_q9",
        number: 9,
        section: "Quantitative Reasoning",
        type: "MCQ",
        text: "The mean of five integers is 20. If four of the numbers are 15, 18, 22, and 25, find the fifth number:",
        options: [
          { id: "A", text: "20" },
          { id: "B", text: "19" },
          { id: "C", text: "21" },
          { id: "D", text: "23" }
        ],
        correctAnswer: "A",
        marks: 1,
        negativeMarks: 0,
        explanation: "Total sum = 5 * 20 = 100. Sum of 4 given = 15 + 18 + 22 + 25 = 80. Fifth number = 100 - 80 = 20."
      },
      {
        id: "ielts_q10",
        number: 10,
        section: "Verbal Reasoning",
        type: "MCQ",
        text: "GRE Word: 'GREGARIOUS' most closely describes an individual who is:",
        options: [
          { id: "A", text: "Sociable and fond of company" },
          { id: "B", text: "Solitary and introverted" },
          { id: "C", text: "Hostile and aggressive" },
          { id: "D", text: "Careless and reckless" }
        ],
        correctAnswer: "A",
        marks: 1,
        negativeMarks: 0,
        explanation: "Gregarious means fond of company and sociable (from Latin grex, flock/herd)."
      }
    ]
  }
];

module.exports = {
  DEFAULT_EXAMS,
  DEFAULT_TESTS
};
