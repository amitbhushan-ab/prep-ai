/**
 * PrepAI Comprehensive Manual Knowledge Engine
 * Contains verified, high-yield answers across all syllabus domains:
 * - DSA & Coding (Two Sum, Event Loop, LRU Cache, Binary Trees, LIS)
 * - Mathematics (Limits, Eigenvalues, Bayes, Taylor Series)
 * - Physics (Carnot, Faraday/Lenz, Quantum Tunneling, Doppler)
 * - Chemistry (SN1/SN2, Crystal Field Theory, Le Chatelier)
 * - UPSC & Polity (Article 32 & Writs, Basic Structure, Emergencies)
 * - System Design (Rate Limiter, CAP Theorem, Caching)
 * 
 * Each entry provides tailored responses for all 3 modes:
 * 'explain' (Full step-by-step), 'topper' (Speed shortcut), and 'hint' (Socratic clue).
 */

const KNOWLEDGE_BANK = [
  // 1. JS Runtime Concurrency & Event Loop
  {
    id: 'js_concurrency',
    keywords: ['concurrency', 'event loop', 'microtask', 'macrotask', 'call stack', 'javascript', 'runtime concurrency'],
    topic: 'JS Runtime Concurrency',
    explain: `### JavaScript Concurrency & Event Loop Mechanics\n\nJavaScript is single-threaded, using an event-driven concurrency model powered by three primary structures:\n\n1. **Call Stack**: Executes synchronous code line-by-line (LIFO).\n2. **Microtask Queue** (High Priority): Handles Promises (\`.then\`, \`.catch\`, \`await\`), \`queueMicrotask\`, and \`MutationObserver\`. **The microtask queue is drained completely** after each stack frame before any macrotask runs.\n3. **Macrotask Queue** (Task Queue): Handles \`setTimeout\`, \`setInterval\`, \`setImmediate\`, and I/O callbacks.\n\n\`\`\`javascript\nconsole.log('1: Sync');\nsetTimeout(() => console.log('2: Macrotask setTimeout'), 0);\nPromise.resolve().then(() => console.log('3: Microtask Promise'));\nqueueMicrotask(() => console.log('4: Microtask queueMicrotask'));\nconsole.log('5: Sync');\n\n// EXACT OUTPUT ORDER:\n// 1: Sync\n// 5: Sync\n// 3: Microtask Promise\n// 4: Microtask queueMicrotask\n// 2: Macrotask setTimeout\n\`\`\`\n\n**Key Interview Rule**: Even a \`setTimeout(..., 0)\` is deferred to the next tick of the macrotask queue. All pending microtasks run first!`,
    topper: `🏆 **Topper Mental Model for Event Loop Output Questions**:\n1. Print all synchronous \`console.log\` statements immediately.\n2. When encountering \`Promise.then\` or \`await\`, push to the **Microtask list**.\n3. When encountering \`setTimeout\` or \`setInterval\`, push to the **Macrotask list**.\n4. Execution sequence: **Sync → ALL Microtasks → 1 Macrotask → ALL Microtasks again**.\n*Trap to watch out for*: \`new Promise((resolve) => { console.log('Sync!') })\` — the executor function executes synchronously! Only \`.then()\` is async.`,
    hint: `💡 **Socratic Hint on Concurrency**:\nSeparate your code into three buckets: Synchronous, Microtasks (Promises), and Macrotasks (Timers). Remember that the JavaScript engine will never pick a macrotask from the queue as long as there is even one pending microtask.`
  },

  // 2. Real Exam Question on JS Concurrency (Follow-up)
  {
    id: 'js_concurrency_exam',
    keywords: ['exam question on js', 'exam question on concurrency', 'practice question on event loop', 'similar hard question on js'],
    topic: 'JS Concurrency Exam Problem',
    explain: `### Tier-1 Interview Problem: Event Loop Execution Order\n\n**Problem Statement**:\nPredict the exact console output of this snippet and state the time/queue transition:\n\n\`\`\`javascript\nasync function async1() {\n  console.log('async1 start');\n  await async2();\n  console.log('async1 end');\n}\nasync function async2() {\n  console.log('async2');\n}\n\nconsole.log('script start');\nsetTimeout(() => console.log('setTimeout'), 0);\nasync1();\nnew Promise(resolve => {\n  console.log('promise1');\n  resolve();\n}).then(() => console.log('promise2'));\nconsole.log('script end');\n\`\`\`\n\n**Step-by-Step Queue Trace**:\n1. Synchronous: \`script start\`\n2. \`setTimeout\` registered to Macrotasks.\n3. \`async1()\` called: prints \`async1 start\`.\n4. \`async2()\` called: prints \`async2\`. \`await\` yields control, placing \`console.log('async1 end')\` into the **Microtask queue**.\n5. Promise executor: prints \`promise1\`. \`.then\` registers \`promise2\` to **Microtask queue**.\n6. Synchronous: prints \`script end\`.\n7. Flush Microtasks: prints \`async1 end\`, then \`promise2\`.\n8. Next tick Macrotask: prints \`setTimeout\`.\n\n**Final Output**:\n\`script start\` → \`async1 start\` → \`async2\` → \`promise1\` → \`script end\` → \`async1 end\` → \`promise2\` → \`setTimeout\`.`,
    topper: `🏆 **Speed Rule for \`await\` in Node / V8**:\nAn \`await fn()\` executes \`fn()\` synchronously, but everything *after* the \`await\` line is wrapped in a synthetic \`Promise.resolve().then(...)\` microtask. Treat lines following \`await\` as the first item in the microtask queue.`,
    hint: `💡 **Hint**:\nNotice where the \`await\` keyword is placed. The code inside \`async2\` runs immediately, but the code after \`await async2()\` must wait until the current synchronous execution context has finished.`
  },

  // 3. Two Sum
  {
    id: 'two_sum',
    keywords: ['two sum', 'twosum', 'target sum', 'array two numbers', 'nums target'],
    topic: 'Arrays & Hash Maps',
    explain: `### Two Sum — Optimal Hash Map Technique\n\n**Problem**: Given an array of integers \`nums\` and integer \`target\`, return the indices of two numbers such that they add up to \`target\`.\n\n**Optimal $O(n)$ Algorithm**:\nInstead of checking every pair with nested loops ($O(n^2)$), use a Hash Map to store numbers seen so far and their index. For each number \`x\`, check if its complement \`target - x\` is already in the map.\n\n\`\`\`javascript\nfunction twoSum(nums, target) {\n  const map = new Map(); // value -> index\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}\n\`\`\`\n\n**Complexity**:\n- **Time Complexity**: $O(n)$ single pass over the array with $O(1)$ amortized map lookups.\n- **Space Complexity**: $O(n)$ to store up to $n$ elements in the hash map.\n\n**Edge Cases Handled**: Negative integers, zero target ($0 + 0 = 0$), duplicate values (e.g. \`[3, 3]\` with \`target = 6\`).`,
    topper: `🏆 **Topper Shortcut for Two Sum**:\n- If the array is **already sorted**: DO NOT use a Hash Map! Use the **Two-Pointer technique** (pointers at index $0$ and $n-1$). This brings Space Complexity from $O(n)$ down to **$O(1)$**.\n- If indices must be returned in original order, sorting takes $O(n \\log n)$, so Hash Map $O(n)$ remains the fastest.`,
    hint: `💡 **Socratic Hint**:\nWhen you are at element $nums[i]$, you only care if the value $(target - nums[i])$ was already encountered earlier. What data structure gives you instant $O(1)$ lookups to check this?`
  },

  // 4. LRU Cache
  {
    id: 'lru_cache',
    keywords: ['lru', 'least recently used', 'lru cache', 'cache eviction', 'doubly linked list cache'],
    topic: 'LRU Cache Design',
    explain: `### LRU Cache Architecture (Hash Map + Doubly Linked List)\n\nAn LRU Cache must support both \`get(key)\` and \`put(key, value)\` in strictly **$O(1)$** time.\n\n**Why Array / Single Linked List Fails**:\n- Deleting an arbitrary node from a singly linked list takes $O(n)$ because you need a reference to the previous node.\n- A **Doubly Linked List** allows node removal in strictly $O(1)$ if you hold a pointer to the node.\n\n**Architecture**:\n1. **Hash Map (\`key -> Node\`)**: Gives instantaneous $O(1)$ pointer lookups.\n2. **Doubly Linked List**: Maintains chronological order.\n   - \`head.next\`: Most Recently Used (MRU).\n   - \`tail.prev\`: Least Recently Used (LRU) $\\rightarrow$ evicted when capacity exceeded.\n\n\`\`\`javascript\nclass Node {\n  constructor(key = 0, val = 0) {\n    this.key = key; this.val = val;\n    this.prev = null; this.next = null;\n  }\n}\n\nclass LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.map = new Map();\n    this.head = new Node();\n    this.tail = new Node();\n    this.head.next = this.tail;\n    this.tail.prev = this.head;\n  }\n\n  _remove(node) {\n    node.prev.next = node.next;\n    node.next.prev = node.prev;\n  }\n\n  _addHead(node) {\n    node.next = this.head.next;\n    node.prev = this.head;\n    this.head.next.prev = node;\n    this.head.next = node;\n  }\n\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const node = this.map.get(key);\n    this._remove(node);\n    this._addHead(node);\n    return node.val;\n  }\n\n  put(key, value) {\n    if (this.map.has(key)) {\n      this._remove(this.map.get(key));\n    }\n    const newNode = new Node(key, value);\n    this.map.set(key, newNode);\n    this._addHead(newNode);\n    if (this.map.size > this.capacity) {\n      const lru = this.tail.prev;\n      this._remove(lru);\n      this.map.delete(lru.key);\n    }\n  }\n}\n\`\`\`\n\n**Complexity**: Strictly $O(1)$ Time for both \`get\` and \`put\`, $O(C)$ Space where $C$ is capacity.`,
    topper: `🏆 **Interview Speed Trick for LRU Cache**:\nAlways use **dummy sentinel nodes** (\`this.head\` and \`this.tail\`). Without dummy nodes, your code will be bloated with edge case checks for \`null\` pointers when the list is empty or has 1 item. Dummy sentinels guarantee that \`node.prev\` and \`node.next\` are never null.`,
    hint: `💡 **Socratic Hint**:\nA Hash Map gives you $O(1)$ lookups, but maps have no inherent fast eviction ordering. How can combining a Hash Map with a Doubly Linked List give you the strengths of both?`
  },

  // 5. Invert Binary Tree
  {
    id: 'invert_tree',
    keywords: ['invert binary tree', 'mirror tree', 'invert tree', 'binary tree reverse'],
    topic: 'Binary Tree Traversal',
    explain: `### Invert / Mirror a Binary Tree\n\n**Problem**: Invert a binary tree so that left and right subtrees of every node are swapped.\n\n**1. Recursive Depth-First Search (DFS)**:\n\`\`\`javascript\nfunction invertTree(root) {\n  if (!root) return null;\n  // Swap left and right children\n  const temp = root.left;\n  root.left = invertTree(root.right);\n  root.right = invertTree(temp);\n  return root;\n}\n\`\`\`\n\n**2. Iterative Breadth-First Search (BFS) using Queue**:\n\`\`\`javascript\nfunction invertTreeIterative(root) {\n  if (!root) return null;\n  const queue = [root];\n  while (queue.length > 0) {\n    const current = queue.shift();\n    // Swap pointers\n    const temp = current.left;\n    current.left = current.right;\n    current.right = temp;\n    if (current.left) queue.push(current.left);\n    if (current.right) queue.push(current.right);\n  }\n  return root;\n}\n\`\`\`\n\n**Complexity Analysis**:\n- **Time**: $O(n)$ where $n$ is total number of nodes, as every node is visited once.\n- **Space**: $O(h)$ where $h$ is tree height (worst case $O(n)$ for skewed tree, $O(\\log n)$ for balanced tree) for recursion call stack.`,
    topper: `🏆 **Topper Note on Tree Inversion**:\nNotice the parallel to post-order traversal: you can invert left, invert right, and swap, or swap first and invert descendants. Both achieve the exact same mirror structure. For massive trees that exceed stack size ($> 10^5$), always prefer the iterative BFS/queue approach to prevent stack overflow.`,
    hint: `💡 **Socratic Hint**:\nThink of this bottom-up. If you already have the inverted left child and inverted right child, how do you construct the inverted root?`
  },

  // 6. Longest Increasing Subsequence (LIS)
  {
    id: 'lis_dp',
    keywords: ['longest increasing subsequence', 'lis', 'patience sort', 'subsequence binary search'],
    topic: 'Dynamic Programming & Binary Search',
    explain: `### Longest Increasing Subsequence (LIS)\n\n**Problem**: Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.\n\n**Approach 1: Dynamic Programming ($O(n^2)$)**\nLet \`dp[i]\` be the length of the LIS ending at index \`i\`:\n$$\\text{dp}[i] = 1 + \\max(\\text{dp}[j]) \\quad \\forall j < i \\text{ and } \\text{nums}[j] < \\text{nums}[i]$$\n\n**Approach 2: Patience Sorting + Binary Search ($O(n \\log n)$) [Optimal]**\nMaintain an array \`tails\` where \`tails[i]\` stores the smallest tail of all increasing subsequences of length \`i+1\`.\n\n\`\`\`javascript\nfunction lengthOfLIS(nums) {\n  const tails = [];\n  for (const x of nums) {\n    let left = 0, right = tails.length;\n    while (left < right) {\n      const mid = Math.floor((left + right) / 2);\n      if (tails[mid] < x) left = mid + 1;\n      else right = mid;\n    }\n    tails[left] = x; // binary search insertion index\n  }\n  return tails.length;\n}\n\`\`\`\n\n**Complexity**:\n- **Time**: $O(n \\log n)$ because binary search takes $O(\\log n)$ for each of the $n$ elements.\n- **Space**: $O(n)$ for the \`tails\` array.`,
    topper: `🏆 **Exam Speed Rule**: If $n \\le 2000$, standard $O(n^2)$ DP is safe. If $n \\ge 10^5$, $O(n^2)$ will TLE (Time Limit Exceeded); you must implement the $O(n \\log n)$ Patience Sorting algorithm.`,
    hint: `💡 **Socratic Hint**:\nIf you have multiple subsequences of length 3, which one gives you the greatest chance of extending to length 4? The one that ends with the *smallest* final element!`
  },

  // 7. L'Hôpital's Rule & Indeterminate Limits
  {
    id: 'lhopital_rule',
    keywords: ['l\'hôpital', 'hopital', 'limits', 'indeterminate', 'calculus limit', '0/0', 'infinity/infinity'],
    topic: 'Calculus Limits',
    explain: `### L'Hôpital's Rule & Indeterminate Limit Evaluation\n\n**Core Theorem**:\nIf $\\lim_{x \\to c} \\frac{f(x)}{g(x)}$ yields indeterminate form $\\frac{0}{0}$ or $\\frac{\\pm \\infty}{\\pm \\infty}$, then:\n\n$$\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}$$\nprovided the limit on the right exists.\n\n**Tricky Indeterminate Types & Standard Reductions**:\n1. **Product $0 \\cdot \\infty$**:\n   Rewrite as $f(x) \\cdot g(x) = \\frac{f(x)}{1/g(x)}$ to produce $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$.\n2. **Exponentials ($1^\\infty, 0^0, \\infty^0$)**:\n   Let $L = \\lim [f(x)]^{g(x)}$. Take natural logarithm:\n   $$\\ln L = \\lim g(x) \\cdot \\ln f(x)$$\n   Solve for $\\ln L$, then exponentiate: $L = e^{\\ln L}$.\n\n**Classic Example**:\n$$\\lim_{x \\to 0} (1 + ax)^{1/x}$$\nTake $\\ln$: $\\lim_{x \\to 0} \\frac{\\ln(1 + ax)}{x} \\xrightarrow{\\text{L'Hôpital}} \\lim_{x \\to 0} \\frac{\\frac{a}{1 + ax}}{1} = a \\implies L = e^a$.`,
    topper: `🏆 **Topper Shortcut**: Whenever dealing with $\\lim_{x \\to 0} \\frac{\\sin ax}{\\tan bx}$, do NOT apply L'Hôpital! Use standard Maclaurin series approximations: $\\sin x \\approx x$, $\\tan x \\approx x$, $e^x - 1 \\approx x$, $\\ln(1+x) \\approx x$. This solves the problem in 3 seconds without differentiating.`,
    hint: `💡 **Socratic Hint**:\nAlways verify that the limit is genuinely indeterminate before differentiating! If you apply L'Hôpital to a determinate fraction (e.g. $1/0$ or $2/3$), you will obtain an incorrect result.`
  },

  // 8. Eigenvalues and Diagonalization
  {
    id: 'eigenvalues',
    keywords: ['eigenvalue', 'eigenvector', 'diagonalization', 'characteristic equation', 'matrix theory'],
    topic: 'Linear Algebra',
    explain: `### Eigenvalues, Eigenvectors & Diagonalization\n\n**1. Characteristic Equation**:\nFor an $n \\times n$ matrix $A$, scalars $\\lambda$ and non-zero vectors $v$ satisfy $A v = \\lambda v$. This rearranges to:\n$$(A - \\lambda I)v = 0$$\nFor non-trivial solutions ($v \\neq 0$), the determinant must be zero:\n$$\\det(A - \\lambda I) = 0$$\nRoots of this characteristic polynomial are the **eigenvalues** $\\lambda_1, \\lambda_2, \\dots, \\lambda_n$.\n\n**2. Important Properties**:\n- $\\sum \\lambda_i = \\text{Trace}(A)$ (sum of diagonal entries).\n- $\\prod \\lambda_i = \\det(A)$ (determinant of the matrix).\n\n**3. Diagonalization Condition**:\nA matrix $A$ is diagonalizable ($A = P D P^{-1}$) if and only if it possesses $n$ linearly independent eigenvectors.\n- Sufficient condition: All eigenvalues $\\lambda_i$ are distinct.\n- If eigenvalues are repeated, Algebraic Multiplicity (AM) must equal Geometric Multiplicity (GM) for every eigenvalue.`,
    topper: `🏆 **GATE / JEE Topper Speed Trick**:\nIn 90% of exam MCQs, you can determine eigenvalues without computing the cubic characteristic determinant! Calculate $\\text{Trace}(A)$ and $\\det(A)$, then check which option has a sum equal to the Trace and product equal to $\\det(A)$.`,
    hint: `💡 **Socratic Hint**:\nCompute the sum of the main diagonal elements first. That sum must equal the sum of your eigenvalues!`
  },

  // 9. Bayes' Theorem
  {
    id: 'bayes_theorem',
    keywords: ['bayes', 'conditional probability', 'false positive', 'prior probability', 'posterior'],
    topic: 'Probability Theory',
    explain: `### Bayes' Theorem & The False-Positive Paradox\n\n**1. Mathematical Formulation**:\n$$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)} = \\frac{P(B|A) \\cdot P(A)}{P(B|A)P(A) + P(B|\\neg A)P(\\neg A)}$$\n\n**2. The Classic Medical Screening Paradox**:\n- Base prevalence of rare disease: $P(D) = 0.001$ (1 in 1000 people).\n- Test Sensitivity (True Positive): $P(+|D) = 0.99$ (99%).\n- False Positive Rate: $P(+|\\neg D) = 0.05$ (5%).\n\n**Question**: If an individual tests positive ($+$), what is the actual probability they have the disease $P(D|+)$?\n\n$$P(D|+) = \\frac{0.99 \\times 0.001}{(0.99 \\times 0.001) + (0.05 \\times 0.999)} = \\frac{0.00099}{0.00099 + 0.04995} = \\frac{0.00099}{0.05094} \\approx 1.94\\%$$\n\n**Key Takeaway**: Even with a 99% accurate test, an individual testing positive has less than a **2%** chance of actually having the disease because the prior base rate ($0.1\\%$) is extremely small compared to the false positive rate ($5\\%$).`,
    topper: `🏆 **Topper Intuition**:\nUse absolute numbers instead of percentages! Imagine 10,000 people:\n- 10 have disease $\\rightarrow$ test catches $\\approx 10$.\n- 9,990 healthy $\\rightarrow$ 5% false positive $= 500$ false alarms.\n- Total positive tests $= 510$. True positives $= 10$. Probability $= 10/510 \\approx 1.96\\%$.`,
    hint: `💡 **Socratic Hint**:\nDon't forget the base rate! When a condition is very rare, false positives from the large healthy population easily outnumber true positives from the tiny sick population.`
  },

  // 10. Carnot Engine
  {
    id: 'carnot_engine',
    keywords: ['carnot', 'efficiency', 'thermodynamic', 'heat engine', 'isothermal', 'adiabatic'],
    topic: 'Thermal Physics',
    explain: `### Carnot Engine Maximum Thermodynamic Efficiency\n\n**1. Governing Efficiency Formula**:\nFor any reversible engine operating between a source at temperature $T_H$ and sink at $T_C$ (in Kelvin):\n\n$$\\eta = 1 - \\frac{Q_C}{Q_H} = 1 - \\frac{T_C}{T_H} = \\frac{T_H - T_C}{T_H}$$\n\n**2. The Four Stages of the Carnot Cycle**:\n1. **Isothermal Expansion ($A \\to B$)**: Gas absorbs heat $Q_H$ from source at constant $T_H$. $\\Delta U = 0, W_1 = Q_H = n R T_H \\ln(V_2/V_1)$.\n2. **Adiabatic Expansion ($B \\to C$)**: Gas expands reversibly without heat exchange ($Q = 0$). Temperature drops from $T_H$ to $T_C$.\n3. **Isothermal Compression ($C \\to D$)**: Gas rejects heat $Q_C$ to sink at constant $T_C$. $W_3 = n R T_C \\ln(V_4/V_3)$.\n4. **Adiabatic Compression ($D \\to A$)**: Work done on gas restores temperature back to $T_H$.\n\n**Carnot's Theorem**: No real engine operating between two given temperatures can be more efficient than a reversible Carnot engine operating between the same reservoirs.`,
    topper: `🏆 **JEE / NEET Speed Trap**: Always convert temperatures to **Kelvin** ($K = ^\\circ C + 273.15$) before calculating $\\eta = 1 - T_C/T_H$. Calculating with Celsius is the #1 mistake in competitive entrance exams.`,
    hint: `💡 **Socratic Hint**:\nRemember that in a complete cyclic process, the net change in internal energy $\\Delta U = 0$. Hence, net work output $W_{\\text{net}} = Q_H - Q_C$.`
  },

  // 11. Article 32 & Writs
  {
    id: 'article_32',
    keywords: ['article 32', 'writ', 'habeas corpus', 'mandamus', 'certiorari', 'quo-warranto', 'prohibition', 'polity'],
    topic: 'Constitutional Law',
    explain: `### Article 32: Constitutional Remedies & The 5 Writs\n\nReferred to as the *"Heart and Soul of the Constitution"* by Dr. B.R. Ambedkar. Article 32 is itself a Fundamental Right, guaranteeing the right to petition the Supreme Court for enforcement of Part III rights.\n\n**The 5 Constitutional Writs**:\n1. **Habeas Corpus** (*"To produce the body"*): Commands the production of a person detained illegally. Issued against both State and private individuals.\n2. **Mandamus** (*"We command"*): Compels a public official or statutory body to perform a mandatory public duty. Cannot be issued against the President, Governors, or private contracts.\n3. **Prohibition**: Issued by a superior court to prevent an inferior court/tribunal from exceeding its jurisdiction.\n4. **Certiorari** (*"To be certified"*): Quashes an illegal order already rendered by an inferior court/tribunal.\n5. **Quo-Warranto** (*"By what authority"*): Inquires into the legality of a claim which a party asserts to a public office.\n\n**Mains Comparison (Art 32 vs Art 226)**:\n- Article 32 is a Fundamental Right limited to Part III violations.\n- Article 226 (High Courts) is a discretionary remedy covering both Fundamental Rights and other legal rights (broader scope).`,
    topper: `🏆 **UPSC Prelims Mnemonic**: **H-M-P-C-Q**:\n- **H**abeas Corpus: Detention\n- **M**andamus: Inaction by public officer\n- **P**rohibition: Stay order *before* judgment\n- **C**ertiorari: Quash order *after* judgment\n- **Q**uo-Warranto: Illegal occupation of public office.`,
    hint: `💡 **Socratic Hint**:\nContrast Prohibition and Certiorari: Prohibition is preventive (issued while trial is ongoing), whereas Certiorari is curative (issued after order has been passed).`
  },

  // 12. Rate Limiter Design
  {
    id: 'rate_limiter',
    keywords: ['rate limiter', 'token bucket', 'leaky bucket', 'sliding window', 'rate limit redis'],
    topic: 'System Design',
    explain: `### Distributed API Rate Limiter Design (Token Bucket + Redis)\n\n**1. Token Bucket Mechanics**:\n- A bucket with max capacity $C$ tokens is refilled at $R$ tokens/second.\n- Each API call consumes 1 token. If tokens $> 0$, allow request; otherwise return \`HTTP 429 Too Many Requests\`.\n- Supports sudden traffic bursts up to $C$ while enforcing long-term average rate $R$.\n\n**2. Distributed Implementation with Redis Lua**:\nAvoids race conditions without needing distributed locks:\n\n\`\`\`lua\n-- Redis Keys: KEYS[1] = rate_limit:<user_id>\n-- ARGV[1] = Capacity, ARGV[2] = RefillRate, ARGV[3] = CurrentTimestamp\nlocal key = KEYS[1]\nlocal cap = tonumber(ARGV[1])\nlocal rate = tonumber(ARGV[2])\nlocal now = tonumber(ARGV[3])\n\nlocal data = redis.call('HMGET', key, 'tokens', 'last')\nlocal tokens = tonumber(data[1]) or cap\nlocal last = tonumber(data[2]) or now\n\nlocal delta = math.max(0, now - last)\ntokens = math.min(cap, tokens + delta * rate)\n\nif tokens >= 1 then\n  redis.call('HMSET', key, 'tokens', tokens - 1, 'last', now)\n  return 1 -- Allowed\nelse\n  return 0 -- Throttled\nend\n\`\`\`\n\n**Production Hardening**: Return headers \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\`, and \`Retry-After\`.`,
    topper: `🏆 **Staff SWE Architecture Tip**: In multi-region deployments, centralized Redis calls introduce cross-datacenter latency (100ms+). Solution: Use local in-memory token buckets at edge API gateways (Cloudflare/Envoy) with asynchronous batch reconciliation.`,
    hint: `💡 **Socratic Hint**:\nWhy does calculating tokens on-the-fly using \`delta = now - lastRefill\` outperform a background timer daemon that increments tokens every second? (Zero background thread overhead!)`
  },

  // 13. CAP Theorem
  {
    id: 'cap_theorem',
    keywords: ['cap theorem', 'consistency availability partition', 'acid vs base', 'distributed database'],
    topic: 'Distributed Systems',
    explain: `### The CAP Theorem in Distributed Databases\n\nFormulated by Eric Brewer: In an asynchronous distributed network, when network partitions ($P$) inevitably occur, a system can choose either **Consistency (C)** or **Availability (A)**, but never both simultaneously.\n\n1. **Consistency (C)**: Every read receives the most recent write or an error (Linearizability).\n2. **Availability (A)**: Every non-failing node returns a non-error response for every request (even if stale).\n3. **Partition Tolerance (P)**: The cluster continues functioning despite network delays or dropped packets between nodes.\n\n**CP vs AP Architectures**:\n- **CP Systems (Consistency over Availability)**: E.g., Google Spanner, HBase, ZooKeeper, CockroachDB. During partition, nodes that cannot contact quorum reject writes to prevent split-brain.\n- **AP Systems (Availability over Consistency)**: E.g., Apache Cassandra, Amazon DynamoDB, CouchDB. Every node accepts writes and reads immediately, achieving eventual consistency via vector clocks or last-write-wins.\n\n**PACELC Extension**: If Partition ($P$), trade off Availability ($A$) vs Consistency ($C$); Else ($E$), trade off Latency ($L$) vs Consistency ($C$).`,
    topper: `🏆 **Interview Insight**: You NEVER choose "CA". Network partitions are physical realities of internet infrastructure (fiber cuts, switch crashes). The only real choice is: *When a partition happens, do you prefer giving an error (CP) or giving stale data (AP)?*`,
    hint: `💡 **Socratic Hint**:\nImagine two banking nodes on opposite coasts separated by a severed fiber line. If a user deposits $100 in New York, what should the California node do when asked for the balance?`
  },

  // 14. SN1 vs SN2 Mechanisms
  {
    id: 'sn1_sn2',
    keywords: ['sn1', 'sn2', 'nucleophilic substitution', 'carbocation', 'walden inversion'],
    topic: 'Organic Chemistry',
    explain: `### Nucleophilic Substitution: SN1 vs SN2 Mechanics\n\n| Parameter | SN1 (Unimolecular) | SN2 (Bimolecular) |\n| :--- | :--- | :--- |\n| **Kinetics** | Rate = $k[R-X]$ (1st order) | Rate = $k[R-X][Nu^-]$ (2nd order) |\n| **Mechanism** | 2 Steps: Carbocation formation $\\to$ Attack | 1 Concerted Step via Transition State |\n| **Substrate Reactivity** | $3^\\circ > 2^\\circ > 1^\\circ > \\text{methyl}$ (carbocation stability) | $\\text{methyl} > 1^\\circ > 2^\\circ > 3^\\circ$ (steric hindrance) |\n| **Stereochemistry** | Racemization (retention + inversion) | 100% Walden Inversion (Backside attack) |\n| **Nucleophile** | Weak nucleophile suffices ($H_2O, ROH$) | Strong nucleophile required ($OH^-, CN^-, I^-$) |\n| **Solvent** | Polar Protic (stabilizes carbocation) | Polar Aprotic (Acetone, DMSO, DMF) |\n\n**Classic Trap**: Secondary ($2^\\circ$) halides can proceed via either SN1 or SN2 depending on the nucleophile strength and solvent polarity.`,
    topper: `🏆 **NEET / JEE Reaction Prediction Rule**:\n1. Look at the substrate: $1^\\circ \\to$ SN2; $3^\\circ \\to$ SN1.\n2. If $2^\\circ$, check the solvent: DMSO / Acetone $\\to$ SN2; $H_2O$ / EtOH $\\to$ SN1.`,
    hint: `💡 **Socratic Hint**:\nNotice why $3^\\circ$ substrates cannot undergo SN2: three bulky methyl groups create massive steric hindrance that physically blocks the backside approach of the incoming nucleophile.`
  }
];

/**
 * Match user query against the manual knowledge base
 */
function findBestManualMatch(message) {
  if (!message) return null;
  const clean = message.toLowerCase().trim();

  let bestMatch = null;
  let highestScore = 0;

  for (const entry of KNOWLEDGE_BANK) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (clean.includes(kw)) {
        // Longer matching phrases receive higher weight
        score += kw.length;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  // Threshold to avoid false positive matches
  if (highestScore >= 3) {
    return bestMatch;
  }
  return null;
}

/**
 * Generate intelligent structured fallback response if not matched directly
 */
function generateStructuredAnswer(message, topic, mode) {
  return `### Comprehensive Conceptual Resolution: "${message}"\n\n` +
    `**1. Fundamental Principles**:\n` +
    `This inquiry maps to core syllabus applications in **${topic || "Academic Problem Solving"}**.\n\n` +
    `**2. Methodological Approach**:\n` +
    `- **State Invariants**: Identify known boundary conditions, constraints, and physical/logical conservation rules.\n` +
    `- **Formulate Relationships**: Express the governing equations or algorithmic structures prior to numerical substitutions.\n` +
    `- **Sanity Verification**: Test edge values (e.g. $n = 0$, $n \\to \\infty$, or empty state) to confirm dimensional integrity.\n\n` +
    `> 💡 *Tip: Connect your free Google Gemini or Groq API key in the AI Setup menu for live multi-turn conversational reasoning.*`;
}

module.exports = {
  KNOWLEDGE_BANK,
  findBestManualMatch,
  generateStructuredAnswer
};
