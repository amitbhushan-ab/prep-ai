// Spaced Repetition Memory Deck Flashcards Data

export const FLASHCARD_CATEGORIES = [
  { id: 'all', label: 'All Subjects' },
  { id: 'physics', label: 'Physics' },
  { id: 'chemistry', label: 'Chemistry' },
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'biology', label: 'Biology' },
  { id: 'cs', label: 'Computer Science' },
  { id: 'polity', label: 'Polity & UPSC' },
  { id: 'aptitude', label: 'Aptitude & Quant' }
];

export const DEFAULT_FLASHCARDS = [
  // --- PHYSICS ---
  {
    id: 1,
    category: 'physics',
    subject: 'Wave Optics',
    front: "What is the condition for maximum constructive interference in Young's Double Slit Experiment (YDSE)?",
    back: "Path difference Δx = n * λ, Phase difference Δφ = 2nπ (where n = 0, ±1, ±2...). Central maxima occurs at n = 0.",
    tip: "Remember: Destructive interference occurs when Δx = (2n - 1) * λ/2."
  },
  {
    id: 2,
    category: 'physics',
    subject: 'Electromagnetism',
    front: "What is the formula for the magnetic force experienced by a charged particle moving in a uniform magnetic field?",
    back: "F = q * (v × B) = q * v * B * sin(θ). If v is perpendicular to B (θ = 90°), the particle undergoes circular motion with radius R = (m * v) / (q * B).",
    tip: "Magnetic force does zero work on the particle since F is always perpendicular to velocity."
  },
  {
    id: 3,
    category: 'physics',
    subject: 'Thermodynamics',
    front: "What is the theoretical maximum thermal efficiency of a Carnot heat engine operating between temperatures T_H and T_C?",
    back: "η = 1 - (T_C / T_H) = (T_H - T_C) / T_H. Temperatures must always be substituted in Kelvin (absolute scale).",
    tip: "No real engine operating between two thermal reservoirs can exceed Carnot efficiency."
  },
  {
    id: 4,
    category: 'physics',
    subject: 'Modern Physics',
    front: "State Einstein's Photoelectric Equation and the definition of Threshold Frequency (ν₀).",
    back: "K_max = h * ν - Φ = h * (ν - ν₀), where Φ is the work function. If incident frequency ν < ν₀, no photoelectric emission occurs regardless of light intensity.",
    tip: "Kinetic energy depends on frequency, while photocurrent depends on light intensity."
  },
  {
    id: 5,
    category: 'physics',
    subject: 'Electrostatics',
    front: "What is Gauss's Law in electrostatics, and what is the electric field inside a charged conducting hollow sphere?",
    back: "Gauss's Law: ∮ E · dA = Q_enclosed / ε₀. Inside a hollow spherical conductor, Q_enclosed = 0, so Electric Field E = 0 everywhere inside, while potential V is constant.",
    tip: "This principle enables electrostatic shielding (Faraday cages)."
  },

  // --- CHEMISTRY ---
  {
    id: 6,
    category: 'chemistry',
    subject: 'Coordination Compounds',
    front: "Explain the Spectrochemical Series and distinguish between Weak Field and Strong Field Ligands.",
    back: "Spectrochemical Series: I⁻ < Br⁻ < Cl⁻ < F⁻ < OH⁻ < H₂O < NH₃ < en < CN⁻ < CO. Strong field ligands (CN⁻, CO) cause large crystal field splitting (Δ₀ > P) leading to low-spin inner orbital complexes.",
    tip: "Strong field ligands force electrons to pair up in t2g orbitals."
  },
  {
    id: 7,
    category: 'chemistry',
    subject: 'Chemical Equilibrium',
    front: "State Le Chatelier's Principle and the effect of increasing pressure on a gaseous equilibrium system.",
    back: "If a dynamic equilibrium is disturbed, the system shifts to counteract the imposed change. Increasing pressure shifts equilibrium toward the side with fewer moles of gas (Δn_g < 0).",
    tip: "Catalysts accelerate forward and reverse rates equally without shifting the equilibrium position (K_eq remains constant)."
  },
  {
    id: 8,
    category: 'chemistry',
    subject: 'Organic Chemistry',
    front: "What is the essential structural requirement for an aldehyde or ketone to undergo the Aldol Condensation reaction?",
    back: "The carbonyl compound must possess at least one α-hydrogen atom adjacent to the carbonyl carbon (e.g., CH₃CHO). Dilute base abstracts the α-proton to generate a nucleophilic enolate ion.",
    tip: "Benzaldehyde and formaldehyde lack α-hydrogens and undergo the Cannizzaro reaction instead."
  },
  {
    id: 9,
    category: 'chemistry',
    subject: 'Chemical Kinetics',
    front: "What is the integrated rate equation and half-life (t₁/₂) formula for a First-Order chemical reaction?",
    back: "k = (2.303 / t) * log([A]₀ / [A]). Half-life: t₁/₂ = ln(2) / k ≈ 0.693 / k. Notice that first-order half-life is completely independent of initial reactant concentration [A]₀.",
    tip: "Radioactive decay is universally a first-order process."
  },
  {
    id: 10,
    category: 'chemistry',
    subject: 'Physical Chemistry',
    front: "What is the Henderson-Hasselbalch equation used to calculate the pH of an acidic buffer solution?",
    back: "pH = pKa + log([Conjugate Base] / [Weak Acid]). When [Conjugate Base] = [Weak Acid], pH = pKa, representing maximum buffer capacity.",
    tip: "For basic buffers: pOH = pKb + log([Conjugate Acid] / [Weak Base])."
  },

  // --- MATHEMATICS ---
  {
    id: 11,
    category: 'mathematics',
    subject: 'Differential Calculus',
    front: "When can L'Hôpital's Rule be applied to evaluate limits, and how does it operate?",
    back: "L'Hôpital's Rule applies ONLY to indeterminate forms of type [0 / 0] or [±∞ / ±∞]. It states: lim [f(x) / g(x)] = lim [f'(x) / g'(x)], differentiating numerator and denominator independently.",
    tip: "Do not use the quotient rule when applying L'Hôpital's rule!"
  },
  {
    id: 12,
    category: 'mathematics',
    subject: 'Probability',
    front: "State Bayes' Theorem for calculating posterior probability P(A|B).",
    back: "P(A|B) = [P(B|A) * P(A)] / P(B) = [P(B|A) * P(A)] / [∑ P(B|Aᵢ) * P(Aᵢ)]. It computes the revised probability of hypothesis A after observing evidence B.",
    tip: "P(A) is prior probability, P(B|A) is likelihood, and P(A|B) is posterior probability."
  },
  {
    id: 13,
    category: 'mathematics',
    subject: 'Linear Algebra',
    front: "What is the characteristic equation used to find the eigenvalues (λ) of an n × n square matrix A?",
    back: "det(A - λ * I) = 0, where I is the n × n identity matrix. The sum of eigenvalues equals the Trace of A, and the product of eigenvalues equals the Determinant of A.",
    tip: "If det(A) = 0, at least one eigenvalue must be zero (matrix is non-invertible)."
  },
  {
    id: 14,
    category: 'mathematics',
    subject: 'Integral Calculus',
    front: "State the Integration by Parts formula and the LIATE rule for prioritizing the first function u(x).",
    back: "∫ u dv = u * v - ∫ v du. LIATE priority order for u(x): Logarithmic, Inverse trigonometric, Algebraic, Trigonometric, Exponential.",
    tip: "Pick u(x) as the function that simplifies upon differentiation."
  },
  {
    id: 15,
    category: 'mathematics',
    subject: 'Coordinate Geometry',
    front: "What is the condition for two lines a₁x + b₁y + c₁ = 0 and a₂x + b₂y + c₂ = 0 to be perpendicular?",
    back: "Condition: a₁ * a₂ + b₁ * b₂ = 0 (product of slopes m₁ * m₂ = -1). For parallel lines: a₁ / a₂ = b₁ / b₂ ≠ c₁ / c₂.",
    tip: "Distance from point (x₀, y₀) to line ax + by + c = 0 is |ax₀ + by₀ + c| / √(a² + b²)."
  },

  // --- BIOLOGY ---
  {
    id: 16,
    category: 'biology',
    subject: 'Plant Physiology',
    front: "What anatomical adaptation (Kranz anatomy) enables C4 plants (like maize and sugarcane) to avoid photorespiration?",
    back: "Mesophyll cells fix CO₂ into 4-carbon oxaloacetate via PEP carboxylase. Malate is transported to bundle sheath cells where Rubisco operates under high CO₂ concentration, preventing oxygenase activity.",
    tip: "C4 plants exhibit high photosynthetic efficiency and zero photorespiration."
  },
  {
    id: 17,
    category: 'biology',
    subject: 'Human Physiology',
    front: "Trace the sequential cardiac electrical conduction pathway responsible for heart contractions.",
    back: "SA Node (natural pacemaker, ~72 bpm) → Intermodal pathways → AV Node (causes 0.1s physiological delay) → Bundle of His → Right and Left Bundle Branches → Purkinje Fibers in ventricular myocardium.",
    tip: "The AV nodal delay ensures atria empty completely before ventricles contract."
  },
  {
    id: 18,
    category: 'biology',
    subject: 'Genetics & Evolution',
    front: "State the Hardy-Weinberg equilibrium equation and the 5 conditions required for allele frequencies to remain constant.",
    back: "p² + 2pq + q² = 1 and p + q = 1. Conditions: (1) Large population size, (2) Random mating, (3) No mutation, (4) No gene flow (migration), (5) No natural selection.",
    tip: "2pq represents the frequency of heterozygous carriers in the population."
  },
  {
    id: 19,
    category: 'biology',
    subject: 'Cellular Respiration',
    front: "What is the net ATP yield from one molecule of glucose through complete aerobic respiration?",
    back: "Approximately 30 to 32 ATP molecules: Glycolysis (2 ATP net + 2 NADH), Link Reaction (2 NADH), Krebs Cycle (2 GTP/ATP + 6 NADH + 2 FADH₂), and Oxidative Phosphorylation in ETC.",
    tip: "1 NADH yields ~2.5 ATP, and 1 FADH₂ yields ~1.5 ATP via ATP synthase."
  },
  {
    id: 20,
    category: 'biology',
    subject: 'Excretory System',
    front: "How does the counter-current multiplier mechanism in the loop of Henle and vasa recta concentrate urine?",
    back: "The descending limb is permeable to water but impermeable to NaCl; ascending limb actively pumps NaCl out while impermeable to water. This creates a hyperosmotic medullary gradient (up to 1200 mOsm/L).",
    tip: "Antidiuretic hormone (ADH / Vasopressin) inserts aquaporins in collecting ducts to reclaim water."
  },

  // --- COMPUTER SCIENCE ---
  {
    id: 21,
    category: 'cs',
    subject: 'Data Structures & Algorithms',
    front: "What is the time complexity of QuickSort in the worst case and average case, and how can the worst case be avoided?",
    back: "Worst Case: O(n²) when the pivot selection creates maximally skewed partitions (e.g. already sorted array with first element as pivot). Average Case: O(n log n). Mitigation: Randomized pivot or Median-of-Three pivot.",
    tip: "QuickSort operates in-place (O(log n) stack space for recursive calls)."
  },
  {
    id: 22,
    category: 'cs',
    subject: 'Distributed Systems',
    front: "State the CAP Theorem and explain why a distributed system can only guarantee two out of the three properties.",
    back: "Consistency, Availability, Partition Tolerance (CAP). Because physical network partitions (P) are unavoidable in distributed infrastructure, the system must choose between Consistency (CP - error out) or Availability (AP - return stale data) during partition.",
    tip: "CA cannot exist across a distributed network because you cannot disable network partitions."
  },
  {
    id: 23,
    category: 'cs',
    subject: 'Database Systems',
    front: "Explain the four ACID properties of relational database management systems.",
    back: "Atomicity (all or nothing transaction), Consistency (preserves schema constraints and invariants), Isolation (concurrent transactions do not interfere; serializability), Durability (committed data survives server crashes).",
    tip: "Write-Ahead Logging (WAL) is the foundational mechanism ensuring durability."
  },
  {
    id: 24,
    category: 'cs',
    subject: 'Algorithms',
    front: "State the Master Theorem condition for dividing recurrences of the form T(n) = a * T(n/b) + f(n).",
    back: "Let c_crit = log_b(a). Case 1: If f(n) = O(n^c) where c < c_crit, T(n) = Θ(n^log_b(a)). Case 2: If f(n) = Θ(n^c_crit), T(n) = Θ(n^log_b(a) * log n). Case 3: If f(n) = Ω(n^c) where c > c_crit, T(n) = Θ(f(n)).",
    tip: "MergeSort: T(n) = 2T(n/2) + O(n) → a=2, b=2, log_2(2)=1 → Case 2 → Θ(n log n)."
  },
  {
    id: 25,
    category: 'cs',
    subject: 'Operating Systems',
    front: "What are the four necessary Coffman conditions required for a deadlock to occur in an operating system?",
    back: "(1) Mutual Exclusion (non-shareable resources), (2) Hold and Wait (process holds resource while requesting another), (3) No Preemption (resource cannot be forcibly taken), (4) Circular Wait (closed loop of processes waiting).",
    tip: "Breaking any single condition guarantees prevention of deadlock."
  },

  // --- POLITY & UPSC ---
  {
    id: 26,
    category: 'polity',
    subject: 'Constitutional Law',
    front: "Which Article grants Parliament the power to amend the Indian Constitution, and what constitutes the Basic Structure doctrine?",
    back: "Article 368 of Part XX. In Kesavananda Bharati (1973), the Supreme Court ruled Parliament can amend any part of the Constitution, but CANNOT alter or destroy its 'Basic Structure' (Judicial Review, Federalism, Secularism, Rule of Law).",
    tip: "The Basic Structure doctrine acts as an absolute check on parliamentary constituent power."
  },
  {
    id: 27,
    category: 'polity',
    subject: 'Fundamental Rights',
    front: "List the 5 Prerogative Writs issued by the Supreme Court (Article 32) and High Courts (Article 226) for the enforcement of Fundamental Rights.",
    back: "(1) Habeas Corpus (produce the body), (2) Mandamus (command a public authority to perform legal duty), (3) Prohibition (prevent lower court from exceeding jurisdiction), (4) Certiorari (quash an illegal order of lower court), (5) Quo-Warranto (inquire into legality of holding a public office).",
    tip: "Article 226 has wider jurisdiction than Article 32 because High Courts can issue writs for legal rights as well as fundamental rights."
  },
  {
    id: 28,
    category: 'polity',
    subject: 'Economy & Governance',
    front: "What is the difference between Policy Repo Rate and Reverse Repo Rate operated by the Reserve Bank of India (RBI)?",
    back: "Repo Rate is the interest rate at which RBI lends short-term liquidity to commercial banks against government securities. Reverse Repo Rate is the rate at which RBI absorbs surplus liquidity from commercial banks.",
    tip: "Raising the Repo Rate increases borrowing costs, slowing credit expansion and dampening inflation."
  },
  {
    id: 29,
    category: 'polity',
    subject: 'Modern Indian History',
    front: "When and why was the Quit India Movement launched, and what famous slogan was coined by Mahatma Gandhi?",
    back: "Launched on 8 August 1942 at the Gowalia Tank Maidan (Mumbai) following the failure of the Cripps Mission to offer immediate self-government during WWII. Slogan: 'Do or Die' (Karo ya Maro).",
    tip: "Aruna Asaf Ali famously hoisted the Indian National Congress flag at Gowalia Tank during the movement."
  },
  {
    id: 30,
    category: 'polity',
    subject: 'Preamble & Amendments',
    front: "Which three words were added to the Preamble of the Indian Constitution by the 42nd Constitutional Amendment Act, 1976?",
    back: "'Socialist', 'Secular', and 'Integrity' (changing 'unity of the Nation' to 'unity and integrity of the Nation').",
    tip: "The 42nd Amendment is often termed the 'Mini Constitution' due to its comprehensive additions."
  },

  // --- APTITUDE & QUANT ---
  {
    id: 31,
    category: 'aptitude',
    subject: 'Work & Time',
    front: "If Person A completes a job in 'a' days and Person B completes the same job in 'b' days, how many days do they take working together?",
    back: "Combined time = (a * b) / (a + b) days. Or via 1-day work efficiency: Combined 1-day work = (1/a + 1/b) = (a + b)/(a * b).",
    tip: "Using the LCM method to assume Total Work in units makes multi-person questions much faster."
  },
  {
    id: 32,
    category: 'aptitude',
    subject: 'Compound Interest',
    front: "What is the 'Rule of 72' in financial mathematics for estimating compound interest growth?",
    back: "Years to double investment ≈ 72 / (Annual Interest Rate R). For example, at an interest rate of 8% per annum, money doubles in approximately 72 / 8 = 9 years.",
    tip: "For 3x growth (tripling money), use the Rule of 114: Years ≈ 114 / R."
  },
  {
    id: 33,
    category: 'aptitude',
    subject: 'Percentages & Profit/Loss',
    front: "What is the formula for calculating overall net percentage change when a quantity is successively changed by +a% and +b%?",
    back: "Net Change % = [a + b + (a * b) / 100] %. If a change is a decrease, substitute it with a negative sign (e.g., a discount of 20% means a = -20).",
    tip: "If price increases by x% and then decreases by x%, the net result is always a loss of (x²/100)%."
  },
  {
    id: 34,
    category: 'aptitude',
    subject: 'Mixtures & Alligation',
    front: "State the Alligation Rule formula for finding the ratio of quantities of two ingredients mixed at prices C (cheaper) and D (dearer) to achieve mean price M.",
    back: "(Quantity of Cheaper) / (Quantity of Dearer) = (Price of Dearer - Mean Price) / (Mean Price - Price of Cheaper) = (D - M) / (M - C).",
    tip: "All prices must be expressed in identical units per quantity."
  },
  {
    id: 35,
    category: 'aptitude',
    subject: 'Permutations & Combinations',
    front: "What is the difference between Permutation ⁿPᵣ and Combination ⁿCᵣ, and what is the relation between them?",
    back: "ⁿPᵣ = n! / (n - r)! (order matters, arrangements). ⁿCᵣ = n! / [r! * (n - r)!] (order does not matter, selections). Relation: ⁿPᵣ = r! * ⁿCᵣ. Also: ⁿCᵣ = ⁿCₙ₋ᵣ.",
    tip: "Selecting a committee is a combination; assigning specific executive seats is a permutation."
  }
];
