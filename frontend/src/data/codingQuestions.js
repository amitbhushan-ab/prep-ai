export const CODING_QUESTIONS = [
  // ─── Arrays & Hashing (1 - 6) ───────────────────────────────────
  {
    id: 'two-sum',
    number: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' },
      { input: 'nums = [3, 3], target = 6', output: '[0, 1]', explanation: 'nums[0] + nums[1] == 6, we return [0, 1].' }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    hint: 'Use a hash map to record the complement of each number (target - num). Check if the complement was already seen in O(1) time.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) {\n      return [map.get(diff), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      python: `def twoSum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []`,
      cpp: `#include <vector>\n#include <unordered_map>\n\nstd::vector<int> twoSum(std::vector<int>& nums, int target) {\n    std::unordered_map<int, int> seen;\n    for (int i = 0; i < nums.size(); i++) {\n        int diff = target - nums[i];\n        if (seen.count(diff)) return {seen[diff], i};\n        seen[nums[i]] = i;\n    }\n    return {};\n}`,
      java: `import java.util.HashMap;\nimport java.util.Map;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) {\n                return new int[] { map.get(diff), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}`
    },
    testCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', expected: '[0, 1]' }
    ]
  },
  {
    id: 'valid-anagram',
    number: 2,
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    description: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true', explanation: 'Both words contain the same characters with identical counts.' },
      { input: 's = "rat", t = "car"', output: 'false', explanation: 'Characters do not match.' }
    ],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    hint: 'Count the frequency of each character in an array of size 26 or a hash map. Both strings must produce identical frequency counts.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) (26 English lowercase characters)',
    starterCode: {
      javascript: `function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (let c of s) count[c] = (count[c] || 0) + 1;\n  for (let c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}`,
      python: `def isAnagram(s: str, t: str) -> bool:\n    if len(s) != len(t): return False\n    counts = {}\n    for c in s: counts[c] = counts.get(c, 0) + 1\n    for c in t:\n        if c not in counts or counts[c] == 0: return False\n        counts[c] -= 1\n    return True`,
      cpp: `#include <string>\n#include <vector>\n\nbool isAnagram(std::string s, std::string t) {\n    if (s.length() != t.length()) return false;\n    std::vector<int> count(26, 0);\n    for (char c : s) count[c - 'a']++;\n    for (char c : t) {\n        if (--count[c - 'a'] < 0) return false;\n    }\n    return true;\n}`,
      java: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (char c : s.toCharArray()) count[c - 'a']++;\n        for (char c : t.toCharArray()) {\n            if (--count[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n}`
    },
    testCases: [
      { input: 's = "anagram", t = "nagaram"', expected: 'true' },
      { input: 's = "rat", t = "car"', expected: 'false' },
      { input: 's = "a", t = "ab"', expected: 'false' }
    ]
  },
  {
    id: 'group-anagrams',
    number: 3,
    title: 'Group Anagrams',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    description: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase.',
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' },
      { input: 'strs = ["a"]', output: '[["a"]]' }
    ],
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.'
    ],
    hint: 'Use the sorted string or character count tuple as a hash map key to group matching anagrams.',
    timeComplexity: 'O(n * k log k)',
    spaceComplexity: 'O(n * k)',
    starterCode: {
      javascript: `function groupAnagrams(strs) {\n  const map = {};\n  for (let str of strs) {\n    const sorted = str.split('').sort().join('');\n    if (!map[sorted]) map[sorted] = [];\n    map[sorted].push(str);\n  }\n  return Object.values(map);\n}`,
      python: `from collections import defaultdict\n\ndef groupAnagrams(strs: list[str]) -> list[list[str]]:\n    groups = defaultdict(list)\n    for s in strs:\n        groups[tuple(sorted(s))].append(s)\n    return list(groups.values())`,
      cpp: `#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\n\nstd::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {\n    std::unordered_map<std::string, std::vector<std::string>> map;\n    for (const auto& s : strs) {\n        std::string key = s;\n        std::sort(key.begin(), key.end());\n        map[key].push_back(s);\n    }\n    std::vector<std::vector<std::string>> result;\n    for (auto& p : map) result.push_back(p.second);\n    return result;\n}`,
      java: `import java.util.*;\n\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] ca = s.toCharArray();\n            Arrays.sort(ca);\n            String key = String.valueOf(ca);\n            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n}`
    },
    testCases: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expected: '[["eat","tea","ate"],["tan","nat"],["bat"]]' },
      { input: 'strs = [""]', expected: '[[""]]' }
    ]
  },
  {
    id: 'top-k-frequent-elements',
    number: 4,
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    description: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order. Your algorithm\'s time complexity must be better than O(n log n).',
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1, 2]' },
      { input: 'nums = [1], k = 1', output: '[1]' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      'k is in the range [1, the number of unique elements in the array].',
      'It is guaranteed that the answer is unique.'
    ],
    hint: 'Bucket sort allows finding the top k elements in O(n) linear time by indexing an array by element frequency.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starterCode: {
      javascript: `function topKFrequent(nums, k) {\n  const freq = {};\n  nums.forEach(n => freq[n] = (freq[n] || 0) + 1);\n  const buckets = Array.from({ length: nums.length + 1 }, () => []);\n  for (let num in freq) {\n    buckets[freq[num]].push(Number(num));\n  }\n  const res = [];\n  for (let i = buckets.length - 1; i >= 0 && res.length < k; i--) {\n    res.push(...buckets[i]);\n  }\n  return res.slice(0, k);\n}`,
      python: `def topKFrequent(nums: list[int], k: int) -> list[int]:\n    from collections import Counter\n    count = Counter(nums)\n    buckets = [[] for _ in range(len(nums) + 1)]\n    for num, freq in count.items():\n        buckets[freq].append(num)\n    res = []\n    for i in range(len(buckets) - 1, 0, -1):\n        for n in buckets[i]:\n            res.append(n)\n            if len(res) == k: return res\n    return res`,
      cpp: `#include <vector>\n#include <unordered_map>\n\nstd::vector<int> topKFrequent(std::vector<int>& nums, int k) {\n    std::unordered_map<int, int> count;\n    for (int n : nums) count[n]++;\n    std::vector<std::vector<int>> buckets(nums.size() + 1);\n    for (auto& p : count) buckets[p.second].push_back(p.first);\n    std::vector<int> res;\n    for (int i = nums.size(); i >= 0 && res.size() < k; i--) {\n        for (int n : buckets[i]) {\n            res.push_back(n);\n            if (res.size() == k) return res;\n        }\n    }\n    return res;\n}`,
      java: `import java.util.*;\n\nclass Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);\n        List<Integer>[] buckets = new List[nums.length + 1];\n        for (int key : count.keySet()) {\n            int freq = count.get(key);\n            if (buckets[freq] == null) buckets[freq] = new ArrayList<>();\n            buckets[freq].add(key);\n        }\n        int[] res = new int[k];\n        int idx = 0;\n        for (int i = buckets.length - 1; i >= 0 && idx < k; i--) {\n            if (buckets[i] != null) {\n                for (int n : buckets[i]) {\n                    res[idx++] = n;\n                    if (idx == k) return res;\n                }\n            }\n        }\n        return res;\n    }\n}`
    },
    testCases: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', expected: '[1, 2]' },
      { input: 'nums = [1], k = 1', expected: '[1]' }
    ]
  },
  {
    id: 'product-of-array-except-self',
    number: 5,
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operator.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' }
    ],
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30'
    ],
    hint: 'Compute running prefix products from left to right, then multiply by suffix products from right to left in a second pass.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) extra space (excluding output array)',
    starterCode: {
      javascript: `function productExceptSelf(nums) {\n  const res = new Array(nums.length).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < nums.length; i++) {\n    res[i] = prefix;\n    prefix *= nums[i];\n  }\n  let suffix = 1;\n  for (let i = nums.length - 1; i >= 0; i--) {\n    res[i] *= suffix;\n    suffix *= nums[i];\n  }\n  return res;\n}`,
      python: `def productExceptSelf(nums: list[int]) -> list[int]:\n    n = len(nums)\n    res = [1] * n\n    prefix = 1\n    for i in range(n):\n        res[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= suffix\n        suffix *= nums[i]\n    return res`,
      cpp: `#include <vector>\n\nstd::vector<int> productExceptSelf(std::vector<int>& nums) {\n    int n = nums.size();\n    std::vector<int> res(n, 1);\n    int prefix = 1;\n    for (int i = 0; i < n; i++) {\n        res[i] = prefix;\n        prefix *= nums[i];\n    }\n    int suffix = 1;\n    for (int i = n - 1; i >= 0; i--) {\n        res[i] *= suffix;\n        suffix *= nums[i];\n    }\n    return res;\n}`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        int prefix = 1;\n        for (int i = 0; i < n; i++) {\n            res[i] = prefix;\n            prefix *= nums[i];\n        }\n        int suffix = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= suffix;\n            suffix *= nums[i];\n        }\n        return res;\n    }\n}`
    },
    testCases: [
      { input: 'nums = [1, 2, 3, 4]', expected: '[24, 12, 8, 6]' },
      { input: 'nums = [-1, 1, 0, -3, 3]', expected: '[0, 0, 9, 0, 0]' }
    ]
  },
  {
    id: 'longest-consecutive-sequence',
    number: 6,
    title: 'Longest Consecutive Sequence',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    description: 'Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.',
    examples: [
      { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4.' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' }
    ],
    constraints: [
      '0 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    hint: 'Insert all numbers into a hash set. Only begin counting sequences starting from numbers that do not have (num - 1) in the set.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starterCode: {
      javascript: `function longestConsecutive(nums) {\n  const numSet = new Set(nums);\n  let longest = 0;\n  for (const n of numSet) {\n    if (!numSet.has(n - 1)) {\n      let length = 1;\n      while (numSet.has(n + length)) {\n        length++;\n      }\n      longest = Math.max(longest, length);\n    }\n  }\n  return longest;\n}`,
      python: `def longestConsecutive(nums: list[int]) -> int:\n    num_set = set(nums)\n    longest = 0\n    for n in num_set:\n        if (n - 1) not in num_set:\n            length = 1\n            while (n + length) in num_set:\n                length += 1\n            longest = max(longest, length)\n    return longest`,
      cpp: `#include <vector>\n#include <unordered_set>\n#include <algorithm>\n\nint longestConsecutive(std::vector<int>& nums) {\n    std::unordered_set<int> set(nums.begin(), nums.end());\n    int longest = 0;\n    for (int n : set) {\n        if (!set.count(n - 1)) {\n            int length = 1;\n            while (set.count(n + length)) length++;\n            longest = std::max(longest, length);\n        }\n    }\n    return longest;\n}`,
      java: `import java.util.*;\n\nclass Solution {\n    public int longestConsecutive(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int n : nums) set.add(n);\n        int longest = 0;\n        for (int n : set) {\n            if (!set.contains(n - 1)) {\n                int length = 1;\n                while (set.contains(n + length)) length++;\n                longest = Math.max(longest, length);\n            }\n        }\n        return longest;\n    }\n}`
    },
    testCases: [
      { input: 'nums = [100, 4, 200, 1, 3, 2]', expected: '4' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', expected: '9' }
    ]
  },

  // ─── Two Pointers (7 - 10) ──────────────────────────────────────
  {
    id: 'valid-palindrome',
    number: 7,
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    category: 'Two Pointers',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', output: 'true' }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    hint: 'Use two pointers from left and right inward, skipping non-alphanumeric characters without allocating a new reversed string.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function isPalindrome(s) {\n  let l = 0, r = s.length - 1;\n  while (l < r) {\n    while (l < r && !/[a-zA-Z0-9]/.test(s[l])) l++;\n    while (l < r && !/[a-zA-Z0-9]/.test(s[r])) r--;\n    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;\n    l++;\n    r--;\n  }\n  return true;\n}`,
      python: `def isPalindrome(s: str) -> bool:\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and not s[l].isalnum(): l += 1\n        while l < r and not s[r].isalnum(): r -= 1\n        if s[l].lower() != s[r].lower(): return False\n        l, r = l + 1, r - 1\n    return True`,
      cpp: `#include <string>\n#include <cctype>\n\nbool isPalindrome(std::string s) {\n    int l = 0, r = s.length() - 1;\n    while (l < r) {\n        while (l < r && !isalnum(s[l])) l++;\n        while (l < r && !isalnum(s[r])) r--;\n        if (tolower(s[l]) != tolower(s[r])) return false;\n        l++; r--;\n    }\n    return true;\n}`,
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;\n            l++; r--;\n        }\n        return true;\n    }\n}`
    },
    testCases: [
      { input: 's = "A man, a plan, a canal: Panama"', expected: 'true' },
      { input: 's = "race a car"', expected: 'false' },
      { input: 's = " "', expected: 'true' }
    ]
  },
  {
    id: 'three-sum',
    number: 8,
    title: '3Sum',
    difficulty: 'Medium',
    category: 'Two Pointers',
    description: 'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,1,1]', output: '[]' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]' }
    ],
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5'
    ],
    hint: 'Sort the array first. Loop through each element and use two pointers (left and right) on the remaining array, advancing pointers past duplicates.',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1) extra space',
    starterCode: {
      javascript: `function threeSum(nums) {\n  nums.sort((a, b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const sum = nums[i] + nums[l] + nums[r];\n      if (sum === 0) {\n        res.push([nums[i], nums[l], nums[r]]);\n        while (l < r && nums[l] === nums[l + 1]) l++;\n        while (l < r && nums[r] === nums[r - 1]) r--;\n        l++; r--;\n      } else if (sum < 0) {\n        l++;\n      } else {\n        r--;\n      }\n    }\n  }\n  return res;\n}`,
      python: `def threeSum(nums: list[int]) -> list[list[int]]:\n    nums.sort()\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i - 1]: continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s == 0:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l + 1]: l += 1\n                while l < r and nums[r] == nums[r - 1]: r -= 1\n                l, r = l + 1, r - 1\n            elif s < 0:\n                l += 1\n            else:\n                r -= 1\n    return res`,
      cpp: `#include <vector>\n#include <algorithm>\n\nstd::vector<std::vector<int>> threeSum(std::vector<int>& nums) {\n    std::sort(nums.begin(), nums.end());\n    std::vector<std::vector<int>> res;\n    for (int i = 0; i < (int)nums.size() - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int l = i + 1, r = nums.size() - 1;\n        while (l < r) {\n            int s = nums[i] + nums[l] + nums[r];\n            if (s == 0) {\n                res.push_back({nums[i], nums[l], nums[r]});\n                while (l < r && nums[l] == nums[l + 1]) l++;\n                while (l < r && nums[r] == nums[r - 1]) r--;\n                l++; r--;\n            } else if (s < 0) l++;\n            else r--;\n        }\n    }\n    return res;\n}`,
      java: `import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.length - 1;\n            while (l < r) {\n                int s = nums[i] + nums[l] + nums[r];\n                if (s == 0) {\n                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (s < 0) l++;\n                else r--;\n            }\n        }\n        return res;\n    }\n}`
    },
    testCases: [
      { input: 'nums = [-1,0,1,2,-1,-4]', expected: '[[-1,-1,2],[-1,0,1]]' },
      { input: 'nums = [0,0,0]', expected: '[[0,0,0]]' }
    ]
  },
  {
    id: 'container-with-most-water',
    number: 9,
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: 'Two Pointers',
    description: 'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.',
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'The max area is formed between lines of height 8 and 7 with width 7 (7 * 7 = 49).' },
      { input: 'height = [1,1]', output: '1' }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    hint: 'Initialize pointers at both boundaries. In each step, calculate area = min(height[l], height[r]) * (r - l) and move the pointer with the smaller height inward.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function maxArea(height) {\n  let max = 0, l = 0, r = height.length - 1;\n  while (l < r) {\n    const h = Math.min(height[l], height[r]);\n    max = Math.max(max, h * (r - l));\n    if (height[l] < height[r]) l++;\n    else r--;\n  }\n  return max;\n}`,
      python: `def maxArea(height: list[int]) -> int:\n    l, r = 0, len(height) - 1\n    max_w = 0\n    while l < r:\n        h = min(height[l], height[r])\n        max_w = max(max_w, h * (r - l))\n        if height[l] < height[r]: l += 1\n        else: r -= 1\n    return max_w`,
      cpp: `#include <vector>\n#include <algorithm>\n\nint maxArea(std::vector<int>& height) {\n    int l = 0, r = height.size() - 1, maxA = 0;\n    while (l < r) {\n        int h = std::min(height[l], height[r]);\n        maxA = std::max(maxA, h * (r - l));\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return maxA;\n}`,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        int l = 0, r = height.length - 1, maxA = 0;\n        while (l < r) {\n            int h = Math.min(height[l], height[r]);\n            maxA = Math.max(maxA, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxA;\n    }\n}`
    },
    testCases: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', expected: '49' },
      { input: 'height = [1,1]', expected: '1' }
    ]
  },
  {
    id: 'trapping-rain-water',
    number: 10,
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Two Pointers',
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'The elevation map traps 6 units of rain water.' },
      { input: 'height = [4,2,0,3,2,5]', output: '9' }
    ],
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    hint: 'Use two pointers maintain maxLeft and maxRight. Move the pointer on the smaller side since the water trapped there is bounded strictly by its own max height.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function trap(height) {\n  let l = 0, r = height.length - 1;\n  let maxL = 0, maxR = 0, water = 0;\n  while (l < r) {\n    if (height[l] <= height[r]) {\n      if (height[l] >= maxL) maxL = height[l];\n      else water += maxL - height[l];\n      l++;\n    } else {\n      if (height[r] >= maxR) maxR = height[r];\n      else water += maxR - height[r];\n      r--;\n    }\n  }\n  return water;\n}`,
      python: `def trap(height: list[int]) -> int:\n    l, r = 0, len(height) - 1\n    maxL, maxR, water = 0, 0, 0\n    while l < r:\n        if height[l] <= height[r]:\n            if height[l] >= maxL: maxL = height[l]\n            else: water += maxL - height[l]\n            l += 1\n        else:\n            if height[r] >= maxR: maxR = height[r]\n            else: water += maxR - height[r]\n            r -= 1\n    return water`,
      cpp: `#include <vector>\n#include <algorithm>\n\nint trap(std::vector<int>& height) {\n    int l = 0, r = height.size() - 1, maxL = 0, maxR = 0, water = 0;\n    while (l < r) {\n        if (height[l] <= height[r]) {\n            if (height[l] >= maxL) maxL = height[l];\n            else water += maxL - height[l];\n            l++;\n        } else {\n            if (height[r] >= maxR) maxR = height[r];\n            else water += maxR - height[r];\n            r--;\n        }\n    }\n    return water;\n}`,
      java: `class Solution {\n    public int trap(int[] height) {\n        int l = 0, r = height.length - 1, maxL = 0, maxR = 0, water = 0;\n        while (l < r) {\n            if (height[l] <= height[r]) {\n                if (height[l] >= maxL) maxL = height[l];\n                else water += maxL - height[l];\n                l++;\n            } else {\n                if (height[r] >= maxR) maxR = height[r];\n                else water += maxR - height[r];\n                r--;\n            }\n        }\n        return water;\n    }\n}`
    },
    testCases: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6' },
      { input: 'height = [4,2,0,3,2,5]', expected: '9' }
    ]
  },

  // ─── Sliding Window (11 - 14) ───────────────────────────────────
  {
    id: 'best-time-to-buy-and-sell-stock',
    number: 11,
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Sliding Window',
    description: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'In this case, no transactions are done and max profit = 0.' }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    hint: 'Keep track of the minimum price encountered so far. At each day, the potential profit is prices[i] - minPrice.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function maxProfit(prices) {\n  let minPrice = Infinity, maxProfit = 0;\n  for (let price of prices) {\n    if (price < minPrice) minPrice = price;\n    else if (price - minPrice > maxProfit) maxProfit = price - minPrice;\n  }\n  return maxProfit;\n}`,
      python: `def maxProfit(prices: list[int]) -> int:\n    min_p, max_p = float('inf'), 0\n    for p in prices:\n        if p < min_p: min_p = p\n        elif p - min_p > max_p: max_p = p - min_p\n    return max_p`,
      cpp: `#include <vector>\n#include <algorithm>\n\nint maxProfit(std::vector<int>& prices) {\n    int minP = 1e9, maxP = 0;\n    for (int p : prices) {\n        minP = std::min(minP, p);\n        maxP = std::max(maxP, p - minP);\n    }\n    return maxP;\n}`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        int minP = Integer.MAX_VALUE, maxP = 0;\n        for (int p : prices) {\n            if (p < minP) minP = p;\n            else if (p - minP > maxP) maxP = p - minP;\n        }\n        return maxP;\n    }\n}`
    },
    testCases: [
      { input: 'prices = [7,1,5,3,6,4]', expected: '5' },
      { input: 'prices = [7,6,4,3,1]', expected: '0' }
    ]
  },
  {
    id: 'longest-substring-without-repeating-characters',
    number: 12,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with length 3.' }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    hint: 'Maintain a sliding window [l, r] and a set of current window characters. Shrink from the left whenever a duplicate is found.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m, n))',
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {\n  const set = new Set();\n  let l = 0, maxLen = 0;\n  for (let r = 0; r < s.length; r++) {\n    while (set.has(s[r])) {\n      set.delete(s[l++]);\n    }\n    set.add(s[r]);\n    maxLen = Math.max(maxLen, r - l + 1);\n  }\n  return maxLen;\n}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:\n    seen = set()\n    l = 0\n    max_len = 0\n    for r in range(len(s)):\n        while s[r] in seen:\n            seen.remove(s[l])\n            l += 1\n        seen.add(s[r])\n        max_len = max(max_len, r - l + 1)\n    return max_len`,
      cpp: `#include <string>\n#include <unordered_set>\n#include <algorithm>\n\nint lengthOfLongestSubstring(std::string s) {\n    std::unordered_set<char> set;\n    int l = 0, maxLen = 0;\n    for (int r = 0; r < s.length(); r++) {\n        while (set.count(s[r])) set.erase(s[l++]);\n        set.insert(s[r]);\n        maxLen = std::max(maxLen, r - l + 1);\n    }\n    return maxLen;\n}`,
      java: `import java.util.*;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Set<Character> set = new HashSet<>();\n        int l = 0, maxLen = 0;\n        for (int r = 0; r < s.length(); r++) {\n            while (set.contains(s.charAt(r))) set.remove(s.charAt(l++));\n            set.add(s.charAt(r));\n            maxLen = Math.max(maxLen, r - l + 1);\n        }\n        return maxLen;\n    }\n}`
    },
    testCases: [
      { input: 's = "abcabcbb"', expected: '3' },
      { input: 's = "bbbbb"', expected: '1' },
      { input: 's = "pwwkew"', expected: '3' }
    ]
  },
  {
    id: 'longest-repeating-character-replacement',
    number: 13,
    title: 'Longest Repeating Character Replacement',
    difficulty: 'Medium',
    category: 'Sliding Window',
    description: 'You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times. Return the length of the longest substring containing the same letter you can get after performing the above operations.',
    examples: [
      { input: 's = "ABAB", k = 2', output: '4', explanation: 'Replace the two "A"s with two "B"s or vice versa.' },
      { input: 's = "AABABBA", k = 1', output: '4', explanation: 'Replace the middle "A" with "B" to form "AABBBBA". Substring "BBBB" has length 4.' }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's consists of only uppercase English letters.',
      '0 <= k <= s.length'
    ],
    hint: 'A window of size (r - l + 1) is valid if (window_length - max_frequency_char) <= k.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) (26 English uppercase characters)',
    starterCode: {
      javascript: `function characterReplacement(s, k) {\n  const count = {};\n  let l = 0, maxCount = 0, maxLen = 0;\n  for (let r = 0; r < s.length; r++) {\n    count[s[r]] = (count[s[r]] || 0) + 1;\n    maxCount = Math.max(maxCount, count[s[r]]);\n    if ((r - l + 1) - maxCount > k) {\n      count[s[l]]--;\n      l++;\n    }\n    maxLen = Math.max(maxLen, r - l + 1);\n  }\n  return maxLen;\n}`,
      python: `def characterReplacement(s: str, k: int) -> int:\n    count = {}\n    l = 0\n    max_f = 0\n    max_len = 0\n    for r in range(len(s)):\n        count[s[r]] = count.get(s[r], 0) + 1\n        max_f = max(max_f, count[s[r]])\n        if (r - l + 1) - max_f > k:\n            count[s[l]] -= 1\n            l += 1\n        max_len = max(max_len, r - l + 1)\n    return max_len`,
      cpp: `#include <string>\n#include <vector>\n#include <algorithm>\n\nint characterReplacement(std::string s, int k) {\n    std::vector<int> count(26, 0);\n    int l = 0, maxF = 0, maxLen = 0;\n    for (int r = 0; r < s.length(); r++) {\n        maxF = std::max(maxF, ++count[s[r] - 'A']);\n        if ((r - l + 1) - maxF > k) {\n            count[s[l++] - 'A']--;\n        }\n        maxLen = std::max(maxLen, r - l + 1);\n    }\n    return maxLen;\n}`,
      java: `class Solution {\n    public int characterReplacement(String s, int k) {\n        int[] count = new int[26];\n        int l = 0, maxF = 0, maxLen = 0;\n        for (int r = 0; r < s.length(); r++) {\n            maxF = Math.max(maxF, ++count[s.charAt(r) - 'A']);\n            if ((r - l + 1) - maxF > k) {\n                count[s.charAt(l++) - 'A']--;\n            }\n            maxLen = Math.max(maxLen, r - l + 1);\n        }\n        return maxLen;\n    }\n}`
    },
    testCases: [
      { input: 's = "ABAB", k = 2', expected: '4' },
      { input: 's = "AABABBA", k = 1', expected: '4' }
    ]
  },
  {
    id: 'minimum-window-substring',
    number: 14,
    title: 'Minimum Window Substring',
    difficulty: 'Hard',
    category: 'Sliding Window',
    description: 'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.',
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'The minimum window substring "BANC" includes "A", "B", and "C" from string t.' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' }
    ],
    constraints: [
      'm == s.length, n == t.length',
      '1 <= m, n <= 10^5',
      's and t consist of uppercase and lowercase English letters.'
    ],
    hint: 'Track character requirements of t in a hash table. Expand right until all requirements are met, then contract left to minimize window length.',
    timeComplexity: 'O(m + n)',
    spaceComplexity: 'O(m + n)',
    starterCode: {
      javascript: `function minWindow(s, t) {\n  if (!s || !t) return "";\n  const dict = {};\n  for (let c of t) dict[c] = (dict[c] || 0) + 1;\n  let required = Object.keys(dict).length;\n  let l = 0, formed = 0;\n  const windowCounts = {};\n  let ans = [-1, 0, 0]; // [len, l, r]\n  for (let r = 0; r < s.length; r++) {\n    const c = s[r];\n    windowCounts[c] = (windowCounts[c] || 0) + 1;\n    if (dict[c] && windowCounts[c] === dict[c]) formed++;\n    while (l <= r && formed === required) {\n      if (ans[0] === -1 || r - l + 1 < ans[0]) {\n        ans = [r - l + 1, l, r];\n      }\n      const charL = s[l];\n      windowCounts[charL]--;\n      if (dict[charL] && windowCounts[charL] < dict[charL]) formed--;\n      l++;\n    }\n  }\n  return ans[0] === -1 ? "" : s.substring(ans[1], ans[2] + 1);\n}`,
      python: `def minWindow(s: str, t: str) -> str:\n    from collections import Counter\n    if not s or not t: return ""\n    target = Counter(t)\n    required = len(target)\n    l = 0\n    formed = 0\n    window = {}\n    ans = float("inf"), None, None\n    for r, c in enumerate(s):\n        window[c] = window.get(c, 0) + 1\n        if c in target and window[c] == target[c]: formed += 1\n        while l <= r and formed == required:\n            if r - l + 1 < ans[0]: ans = (r - l + 1, l, r)\n            char_l = s[l]\n            window[char_l] -= 1\n            if char_l in target and window[char_l] < target[char_l]: formed -= 1\n            l += 1\n    return "" if ans[0] == float("inf") else s[ans[1]:ans[2] + 1]`,
      cpp: `#include <string>\n#include <vector>\n#include <unordered_map>\n\nstd::string minWindow(std::string s, std::string t) {\n    std::vector<int> map(128, 0);\n    for (char c : t) map[c]++;\n    int counter = t.size(), begin = 0, end = 0, d = 1e9, head = 0;\n    while (end < s.size()) {\n        if (map[s[end++]]-- > 0) counter--;\n        while (counter == 0) {\n            if (end - begin < d) d = end - (head = begin);\n            if (map[s[begin++]]++ == 0) counter++;\n        }\n    }\n    return d == 1e9 ? "" : s.substr(head, d);\n}`,
      java: `class Solution {\n    public String minWindow(String s, String t) {\n        int[] map = new int[128];\n        for (char c : t.toCharArray()) map[c]++;\n        int count = t.length(), begin = 0, end = 0, d = Integer.MAX_VALUE, head = 0;\n        while (end < s.length()) {\n            if (map[s.charAt(end++)]-- > 0) count--;\n            while (count == 0) {\n                if (end - begin < d) d = end - (head = begin);\n                if (map[s.charAt(begin++)]++ == 0) count++;\n            }\n        }\n        return d == Integer.MAX_VALUE ? "" : s.substring(head, head + d);\n    }\n}`
    },
    testCases: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', expected: '"BANC"' },
      { input: 's = "a", t = "a"', expected: '"a"' }
    ]
  },

  // ─── Stack (15 - 18) ───────────────────────────────────────────
  {
    id: 'valid-parentheses',
    number: 15,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.',
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}".'
    ],
    hint: 'Use a stack to push matching closing brackets whenever an opening bracket is met. Verify the top matches on closing bracket.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starterCode: {
      javascript: `function isValid(s) {\n  const stack = [];\n  const pairs = { '(': ')', '{': '}', '[': ']' };\n  for (let c of s) {\n    if (pairs[c]) stack.push(pairs[c]);\n    else if (stack.pop() !== c) return false;\n  }\n  return stack.length === 0;\n}`,
      python: `def isValid(s: str) -> bool:\n    stack = []\n    pairs = {'(': ')', '{': '}', '[': ']'}\n    for c in s:\n        if c in pairs:\n            stack.append(pairs[c])\n        elif not stack or stack.pop() != c:\n            return False\n    return len(stack) == 0`,
      cpp: `#include <string>\n#include <stack>\n\nbool isValid(std::string s) {\n    std::stack<char> st;\n    for (char c : s) {\n        if (c == '(') st.push(')');\n        else if (c == '{') st.push('}');\n        else if (c == '[') st.push(']');\n        else if (st.empty() || st.top() != c) return false;\n        else st.pop();\n    }\n    return st.empty();\n}`,
      java: `import java.util.Stack;\n\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}`
    },
    testCases: [
      { input: 's = "()"', expected: 'true' },
      { input: 's = "()[]{}"', expected: 'true' },
      { input: 's = "(]"', expected: 'false' }
    ]
  },
  {
    id: 'min-stack',
    number: 16,
    title: 'Min Stack',
    difficulty: 'Medium',
    category: 'Stack',
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).\nImplement the `MinStack` class with methods `push(val)`, `pop()`, `top()`, and `getMin()`.',
    examples: [
      { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: '[null,null,null,null,-3,null,0,-2]' }
    ],
    constraints: [
      '-2^31 <= val <= 2^31 - 1',
      'Methods pop, top and getMin will always be called on non-empty stacks.'
    ],
    hint: 'Store each element as a pair (val, currentMin) or maintain a parallel minStack alongside the primary stack.',
    timeComplexity: 'O(1) for all operations',
    spaceComplexity: 'O(n)',
    starterCode: {
      javascript: `class MinStack {\n  constructor() {\n    this.stack = [];\n  }\n  push(val) {\n    const min = this.stack.length === 0 ? val : Math.min(val, this.getMin());\n    this.stack.push({ val, min });\n  }\n  pop() {\n    this.stack.pop();\n  }\n  top() {\n    return this.stack[this.stack.length - 1].val;\n  }\n  getMin() {\n    return this.stack[this.stack.length - 1].min;\n  }\n}`,
      python: `class MinStack:\n    def __init__(self):\n        self.stack = []\n    def push(self, val: int) -> None:\n        m = val if not self.stack else min(val, self.stack[-1][1])\n        self.stack.append((val, m))\n    def pop(self) -> None:\n        self.stack.pop()\n    def top(self) -> int:\n        return self.stack[-1][0]\n    def getMin(self) -> int:\n        return self.stack[-1][1]`,
      cpp: `#include <stack>\n#include <algorithm>\n\nclass MinStack {\n    std::stack<std::pair<int, int>> st;\npublic:\n    MinStack() {}\n    void push(int val) {\n        int m = st.empty() ? val : std::min(val, st.top().second);\n        st.push({val, m});\n    }\n    void pop() { st.pop(); }\n    int top() { return st.top().first; }\n    int getMin() { return st.top().second; }\n};`,
      java: `import java.util.Stack;\n\nclass MinStack {\n    private Stack<int[]> stack = new Stack<>();\n    public MinStack() {}\n    public void push(int val) {\n        int min = stack.isEmpty() ? val : Math.min(val, stack.peek()[1]);\n        stack.push(new int[]{val, min});\n    }\n    public void pop() { stack.pop(); }\n    public int top() { return stack.peek()[0]; }\n    public int getMin() { return stack.peek()[1]; }\n}`
    },
    testCases: [
      { input: 'push(-2), push(0), push(-3), getMin()', expected: '-3' },
      { input: 'pop(), top(), getMin()', expected: '-2' }
    ]
  },
  {
    id: 'evaluate-reverse-polish-notation',
    number: 17,
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'Medium',
    category: 'Stack',
    description: 'You are given an array of strings `tokens` that represents an arithmetic expression in a Reverse Polish Notation. Evaluate the expression. Return an integer that represents the value of the expression. Valid operators are `+`, `-`, `*`, and `/`. Division truncates toward zero.',
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: '9', explanation: '((2 + 1) * 3) = 9' },
      { input: 'tokens = ["4","13","5","/","+"]', output: '6', explanation: '(4 + (13 / 5)) = 6' }
    ],
    constraints: [
      '1 <= tokens.length <= 10^4',
      'tokens[i] is either an operator or an integer in the range [-200, 200].'
    ],
    hint: 'Iterate through tokens. Push numbers to the stack. When an operator is found, pop two numbers, apply the operator, and push the result back.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starterCode: {
      javascript: `function evalRPN(tokens) {\n  const stack = [];\n  for (const t of tokens) {\n    if (['+', '-', '*', '/'].includes(t)) {\n      const b = stack.pop();\n      const a = stack.pop();\n      if (t === '+') stack.push(a + b);\n      else if (t === '-') stack.push(a - b);\n      else if (t === '*') stack.push(a * b);\n      else stack.push(Math.trunc(a / b));\n    } else {\n      stack.push(Number(t));\n    }\n  }\n  return stack[0];\n}`,
      python: `def evalRPN(tokens: list[str]) -> int:\n    stack = []\n    for t in tokens:\n        if t in "+-*/":\n            b, a = stack.pop(), stack.pop()\n            if t == '+': stack.append(a + b)\n            elif t == '-': stack.append(a - b)\n            elif t == '*': stack.append(a * b)\n            else: stack.append(int(a / b))\n        else:\n            stack.append(int(t))\n    return stack[0]`,
      cpp: `#include <vector>\n#include <string>\n#include <stack>\n\nint evalRPN(std::vector<std::string>& tokens) {\n    std::stack<int> st;\n    for (const auto& t : tokens) {\n        if (t == "+" || t == "-" || t == "*" || t == "/") {\n            int b = st.top(); st.pop();\n            int a = st.top(); st.pop();\n            if (t == "+") st.push(a + b);\n            else if (t == "-") st.push(a - b);\n            else if (t == "*") st.push(a * b);\n            else st.push(a / b);\n        } else {\n            st.push(std::stoi(t));\n        }\n    }\n    return st.top();\n}`,
      java: `import java.util.Stack;\n\nclass Solution {\n    public int evalRPN(String[] tokens) {\n        Stack<Integer> st = new Stack<>();\n        for (String t : tokens) {\n            if ("+-*/".contains(t) && t.length() == 1) {\n                int b = st.pop();\n                int a = st.pop();\n                if (t.equals("+")) st.push(a + b);\n                else if (t.equals("-")) st.push(a - b);\n                else if (t.equals("*")) st.push(a * b);\n                else st.push(a / b);\n            } else {\n                st.push(Integer.parseInt(t));\n            }\n        }\n        return st.pop();\n    }\n}`
    },
    testCases: [
      { input: 'tokens = ["2","1","+","3","*"]', expected: '9' },
      { input: 'tokens = ["4","13","5","/","+"]', expected: '6' }
    ]
  },
  {
    id: 'daily-temperatures',
    number: 18,
    title: 'Daily Temperatures',
    difficulty: 'Medium',
    category: 'Stack',
    description: 'Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i-th` day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.',
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
      { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' }
    ],
    constraints: [
      '1 <= temperatures.length <= 10^5',
      '30 <= temperatures[i] <= 100'
    ],
    hint: 'Use a monotonic decreasing stack storing (temperature, index). When a warmer day arrives, pop cooler days and resolve their wait difference.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starterCode: {
      javascript: `function dailyTemperatures(temperatures) {\n  const res = new Array(temperatures.length).fill(0);\n  const stack = []; // indices\n  for (let i = 0; i < temperatures.length; i++) {\n    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n      const prevIdx = stack.pop();\n      res[prevIdx] = i - prevIdx;\n    }\n    stack.push(i);\n  }\n  return res;\n}`,
      python: `def dailyTemperatures(temperatures: list[int]) -> list[int]:\n    res = [0] * len(temperatures)\n    stack = []\n    for i, t in enumerate(temperatures):\n        while stack and t > temperatures[stack[-1]]:\n            prev = stack.pop()\n            res[prev] = i - prev\n        stack.append(i)\n    return res`,
      cpp: `#include <vector>\n#include <stack>\n\nstd::vector<int> dailyTemperatures(std::vector<int>& temperatures) {\n    std::vector<int> res(temperatures.size(), 0);\n    std::stack<int> st;\n    for (int i = 0; i < temperatures.size(); i++) {\n        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {\n            int prev = st.top(); st.pop();\n            res[prev] = i - prev;\n        }\n        st.push(i);\n    }\n    return res;\n}`,
      java: `import java.util.Stack;\n\nclass Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        int[] res = new int[temperatures.length];\n        Stack<Integer> st = new Stack<>();\n        for (int i = 0; i < temperatures.length; i++) {\n            while (!st.isEmpty() && temperatures[i] > temperatures[st.peek()]) {\n                int prev = st.pop();\n                res[prev] = i - prev;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n}`
    },
    testCases: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', expected: '[1,1,4,2,1,1,0,0]' },
      { input: 'temperatures = [30,40,50,60]', expected: '[1,1,1,0]' }
    ]
  },

  // ─── Binary Search (19 - 22) ────────────────────────────────────
  {
    id: 'binary-search',
    number: 19,
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Binary Search',
    description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`. You must write an algorithm with O(log n) runtime complexity.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.'
    ],
    hint: 'Halve the search boundary in each iteration by inspecting the middle element: mid = l + Math.floor((r - l) / 2).',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = l + Math.floor((r - l) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return -1;\n}`,
      python: `def search(nums: list[int], target: int) -> int:\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = l + (r - l) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return -1`,
      cpp: `#include <vector>\n\nint search(std::vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n}`
    },
    testCases: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', expected: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', expected: '-1' }
    ]
  },
  {
    id: 'search-a-2d-matrix',
    number: 20,
    title: 'Search a 2D Matrix',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: 'You are given an `m x n` integer matrix `matrix` with two properties:\n1. Integers in each row are sorted from left to right.\n2. The first integer of each row is greater than the last integer of the previous row.\nGiven an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise.',
    examples: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true' },
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', output: 'false' }
    ],
    constraints: [
      'm == matrix.length, n == matrix[i].length',
      '1 <= m, n <= 100',
      '-10^4 <= matrix[i][j], target <= 10^4'
    ],
    hint: 'Treat the m x n matrix as a flattened sorted array of length m * n. An index idx maps to row = Math.floor(idx / n) and col = idx % n.',
    timeComplexity: 'O(log(m * n))',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function searchMatrix(matrix, target) {\n  const m = matrix.length, n = matrix[0].length;\n  let l = 0, r = m * n - 1;\n  while (l <= r) {\n    const mid = l + Math.floor((r - l) / 2);\n    const val = matrix[Math.floor(mid / n)][mid % n];\n    if (val === target) return true;\n    if (val < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return false;\n}`,
      python: `def searchMatrix(matrix: list[list[int]], target: int) -> bool:\n    m, n = len(matrix), len(matrix[0])\n    l, r = 0, m * n - 1\n    while l <= r:\n        mid = (l + r) // 2\n        val = matrix[mid // n][mid % n]\n        if val == target: return True\n        elif val < target: l = mid + 1\n        else: r = mid - 1\n    return False`,
      cpp: `#include <vector>\n\nbool searchMatrix(std::vector<std::vector<int>>& matrix, int target) {\n    int m = matrix.size(), n = matrix[0].size();\n    int l = 0, r = m * n - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        int val = matrix[mid / n][mid % n];\n        if (val == target) return true;\n        if (val < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return false;\n}`,
      java: `class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        int m = matrix.length, n = matrix[0].length;\n        int l = 0, r = m * n - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            int val = matrix[mid / n][mid % n];\n            if (val == target) return true;\n            if (val < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return false;\n    }\n}`
    },
    testCases: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', expected: 'true' },
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13', expected: 'false' }
    ]
  },
  {
    id: 'find-minimum-in-rotated-sorted-array',
    number: 21,
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: 'Suppose an array of length `n` sorted in ascending order is rotated between 1 and `n` times. Given the sorted rotated array `nums` of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.',
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'Original array was [1,2,3,4,5] rotated 3 times.' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0' },
      { input: 'nums = [11,13,15,17]', output: '11' }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 5000',
      '-5000 <= nums[i] <= 5000',
      'All the integers of nums are unique.'
    ],
    hint: 'Compare nums[mid] with nums[right]. If nums[mid] > nums[right], the minimum lies in the right half (l = mid + 1). Otherwise, it lies in the left half including mid (r = mid).',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function findMin(nums) {\n  let l = 0, r = nums.length - 1;\n  while (l < r) {\n    const mid = l + Math.floor((r - l) / 2);\n    if (nums[mid] > nums[r]) l = mid + 1;\n    else r = mid;\n  }\n  return nums[l];\n}`,
      python: `def findMin(nums: list[int]) -> int:\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[r]: l = mid + 1\n        else: r = mid\n    return nums[l]`,
      cpp: `#include <vector>\n\nint findMin(std::vector<int>& nums) {\n    int l = 0, r = nums.size() - 1;\n    while (l < r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] > nums[r]) l = mid + 1;\n        else r = mid;\n    }\n    return nums[l];\n}`,
      java: `class Solution {\n    public int findMin(int[] nums) {\n        int l = 0, r = nums.length - 1;\n        while (l < r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] > nums[r]) l = mid + 1;\n            else r = mid;\n        }\n        return nums[l];\n    }\n}`
    },
    testCases: [
      { input: 'nums = [3,4,5,1,2]', expected: '1' },
      { input: 'nums = [4,5,6,7,0,1,2]', expected: '0' }
    ]
  },
  {
    id: 'search-in-rotated-sorted-array',
    number: 22,
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Binary Search',
    description: 'There is an integer array `nums` sorted in ascending order (with distinct values). Prior to being passed to your function, `nums` is possibly rotated. Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.',
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' }
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i], target <= 10^4',
      'All values of nums are unique.'
    ],
    hint: 'One half of the array is always strictly sorted. Determine which half is sorted, then check if target falls within that sorted half.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function search(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = l + Math.floor((r - l) / 2);\n    if (nums[mid] === target) return mid;\n    // Left half is sorted\n    if (nums[l] <= nums[mid]) {\n      if (target >= nums[l] && target < nums[mid]) r = mid - 1;\n      else l = mid + 1;\n    } else {\n      // Right half is sorted\n      if (target > nums[mid] && target <= nums[r]) l = mid + 1;\n      else r = mid - 1;\n    }\n  }\n  return -1;\n}`,
      python: `def search(nums: list[int], target: int) -> int:\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]: r = mid - 1\n            else: l = mid + 1\n        else:\n            if nums[mid] < target <= nums[r]: l = mid + 1\n            else: r = mid - 1\n    return -1`,
      cpp: `#include <vector>\n\nint search(std::vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[l] <= nums[mid]) {\n            if (target >= nums[l] && target < nums[mid]) r = mid - 1;\n            else l = mid + 1;\n        } else {\n            if (target > nums[mid] && target <= nums[r]) l = mid + 1;\n            else r = mid - 1;\n        }\n    }\n    return -1;\n}`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (target >= nums[l] && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (target > nums[mid] && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n}`
    },
    testCases: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', expected: '4' },
      { input: 'nums = [4,5,6,7,0,1,2], target = 3', expected: '-1' }
    ]
  },

  // ─── Linked List (23 - 27) ─────────────────────────────────────
  {
    id: 'reverse-linked-list',
    number: 23,
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    description: 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', output: '[2,1]' },
      { input: 'head = []', output: '[]' }
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    hint: 'Maintain three pointers: prev (initially null), curr (head), and nextNode. Reverse pointers iteratively.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`,
      python: `def reverseList(head):\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev`,
      cpp: `struct ListNode { int val; ListNode *next; ListNode(int x) : val(x), next(nullptr) {} };\n\nListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while (curr) {\n        ListNode* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}`,
      java: `class ListNode { int val; ListNode next; ListNode(int x) { val = x; } }\n\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null, curr = head;\n        while (curr != null) {\n            ListNode next = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = next;\n        }\n        return prev;\n    }\n}`
    },
    testCases: [
      { input: 'head = [1,2,3,4,5]', expected: '[5,4,3,2,1]' },
      { input: 'head = [1,2]', expected: '[2,1]' }
    ]
  },
  {
    id: 'merge-two-sorted-lists',
    number: 24,
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: 'Linked List',
    description: 'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' }
    ],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100'
    ],
    hint: 'Use a sentinel dummy head node and iteratively attach the smaller of the two current list nodes.',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {\n  const dummy = { val: 0, next: null };\n  let curr = dummy;\n  while (list1 && list2) {\n    if (list1.val <= list2.val) {\n      curr.next = list1;\n      list1 = list1.next;\n    } else {\n      curr.next = list2;\n      list2 = list2.next;\n    }\n    curr = curr.next;\n  }\n  curr.next = list1 || list2;\n  return dummy.next;\n}`,
      python: `def mergeTwoLists(list1, list2):\n    dummy = curr = ListNode(0)\n    while list1 and list2:\n        if list1.val <= list2.val:\n            curr.next = list1\n            list1 = list1.next\n        else:\n            curr.next = list2\n            list2 = list2.next\n        curr = curr.next\n    curr.next = list1 or list2\n    return dummy.next`,
      cpp: `ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n    ListNode dummy(0);\n    ListNode* tail = &dummy;\n    while (list1 && list2) {\n        if (list1->val <= list2->val) {\n            tail->next = list1; list1 = list1->next;\n        } else {\n            tail->next = list2; list2 = list2->next;\n        }\n        tail = tail->next;\n    }\n    tail->next = list1 ? list1 : list2;\n    return dummy.next;\n}`,
      java: `class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        while (list1 != null && list2 != null) {\n            if (list1.val <= list2.val) {\n                curr.next = list1; list1 = list1.next;\n            } else {\n                curr.next = list2; list2 = list2.next;\n            }\n            curr = curr.next;\n        }\n        curr.next = list1 != null ? list1 : list2;\n        return dummy.next;\n    }\n}`
    },
    testCases: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', expected: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', expected: '[]' }
    ]
  },
  {
    id: 'reorder-list',
    number: 25,
    title: 'Reorder List',
    difficulty: 'Medium',
    category: 'Linked List',
    description: 'You are given the head of a singly linked-list: L0 -> L1 -> … -> Ln-1 -> Ln. Reorder the list to be on the following form: L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> … You may not modify the values in the list\'s nodes. Only nodes themselves may be changed.',
    examples: [
      { input: 'head = [1,2,3,4]', output: '[1,4,2,3]' },
      { input: 'head = [1,2,3,4,5]', output: '[1,5,2,4,3]' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [1, 5 * 10^4].'
    ],
    hint: 'Find the middle node using slow/fast pointers, reverse the second half of the list, then merge the two halves alternately.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function reorderList(head) {\n  if (!head || !head.next) return;\n  // 1. Find middle\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n  }\n  // 2. Reverse second half\n  let prev = null, curr = slow.next;\n  slow.next = null;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  // 3. Merge\n  let p1 = head, p2 = prev;\n  while (p2) {\n    const tmp1 = p1.next, tmp2 = p2.next;\n    p1.next = p2;\n    p2.next = tmp1;\n    p1 = tmp1;\n    p2 = tmp2;\n  }\n}`,
      python: `def reorderList(head) -> None:\n    if not head or not head.next: return\n    slow, fast = head, head\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n    prev, curr = None, slow.next\n    slow.next = None\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    p1, p2 = head, prev\n    while p2:\n        t1, t2 = p1.next, p2.next\n        p1.next, p2.next = p2, t1\n        p1, p2 = t1, t2`,
      cpp: `void reorderList(ListNode* head) {\n    if (!head || !head->next) return;\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }\n    ListNode *prev = nullptr, *curr = slow->next;\n    slow->next = nullptr;\n    while (curr) { ListNode* nxt = curr->next; curr->next = prev; prev = curr; curr = nxt; }\n    ListNode *p1 = head, *p2 = prev;\n    while (p2) {\n        ListNode *t1 = p1->next, *t2 = p2->next;\n        p1->next = p2; p2->next = t1;\n        p1 = t1; p2 = t2;\n    }\n}`,
      java: `class Solution {\n    public void reorderList(ListNode head) {\n        if (head == null || head.next == null) return;\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }\n        ListNode prev = null, curr = slow.next;\n        slow.next = null;\n        while (curr != null) { ListNode nxt = curr.next; curr.next = prev; prev = curr; curr = nxt; }\n        ListNode p1 = head, p2 = prev;\n        while (p2 != null) {\n            ListNode t1 = p1.next, t2 = p2.next;\n            p1.next = p2; p2.next = t1;\n            p1 = t1; p2 = t2;\n        }\n    }\n}`
    },
    testCases: [
      { input: 'head = [1,2,3,4]', expected: '[1,4,2,3]' },
      { input: 'head = [1,2,3,4,5]', expected: '[1,5,2,4,3]' }
    ]
  },
  {
    id: 'remove-nth-node-from-end-of-list',
    number: 26,
    title: 'Remove Nth Node From End of List',
    difficulty: 'Medium',
    category: 'Linked List',
    description: 'Given the `head` of a linked list, remove the `n-th` node from the end of the list and return its head.',
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
      { input: 'head = [1], n = 1', output: '[]' }
    ],
    constraints: [
      'The number of nodes in the list is sz.',
      '1 <= sz <= 30',
      '1 <= n <= sz'
    ],
    hint: 'Use two pointers fast and slow with an n-step gap between them starting from a dummy pre-head node.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function removeNthFromEnd(head, n) {\n  const dummy = { val: 0, next: head };\n  let fast = dummy, slow = dummy;\n  for (let i = 0; i <= n; i++) fast = fast.next;\n  while (fast) {\n    fast = fast.next;\n    slow = slow.next;\n  }\n  slow.next = slow.next.next;\n  return dummy.next;\n}`,
      python: `def removeNthFromEnd(head, n: int):\n    dummy = ListNode(0, head)\n    fast = slow = dummy\n    for _ in range(n + 1): fast = fast.next\n    while fast:\n        fast, slow = fast.next, slow.next\n    slow.next = slow.next.next\n    return dummy.next`,
      cpp: `ListNode* removeNthFromEnd(ListNode* head, int n) {\n    ListNode dummy(0, head);\n    ListNode *fast = &dummy, *slow = &dummy;\n    for (int i = 0; i <= n; i++) fast = fast->next;\n    while (fast) { fast = fast->next; slow = slow->next; }\n    slow->next = slow->next->next;\n    return dummy.next;\n}`,
      java: `class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode fast = dummy, slow = dummy;\n        for (int i = 0; i <= n; i++) fast = fast.next;\n        while (fast != null) { fast = fast.next; slow = slow.next; }\n        slow.next = slow.next.next;\n        return dummy.next;\n    }\n}`
    },
    testCases: [
      { input: 'head = [1,2,3,4,5], n = 2', expected: '[1,2,3,5]' },
      { input: 'head = [1], n = 1', expected: '[]' }
    ]
  },
  {
    id: 'linked-list-cycle',
    number: 27,
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    category: 'Linked List',
    description: 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Return `true` if there is a cycle, otherwise return `false`.',
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle where the tail connects to the 1st node (0-indexed).' },
      { input: 'head = [1,2], pos = 0', output: 'true' },
      { input: 'head = [1], pos = -1', output: 'false' }
    ],
    constraints: [
      'The number of the nodes in the list is in the range [0, 10^4].'
    ],
    hint: 'Floyd\'s Tortoise and Hare algorithm: slow moves 1 step, fast moves 2 steps. If they ever point to the same node, a cycle exists.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}`,
      python: `def hasCycle(head) -> bool:\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast: return True\n    return False`,
      cpp: `bool hasCycle(ListNode *head) {\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true;\n    }\n    return false;\n}`,
      java: `public class Solution {\n    public boolean hasCycle(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n}`
    },
    testCases: [
      { input: 'head = [3,2,0,-4], pos = 1', expected: 'true' },
      { input: 'head = [1], pos = -1', expected: 'false' }
    ]
  },

  // ─── Trees (28 - 33) ───────────────────────────────────────────
  {
    id: 'invert-binary-tree',
    number: 28,
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    category: 'Trees',
    description: 'Given the `root` of a binary tree, invert the tree, and return its root.',
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', output: '[2,3,1]' },
      { input: 'root = []', output: '[]' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].'
    ],
    hint: 'Recursively swap left and right child pointers of each node.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) where h is tree height',
    starterCode: {
      javascript: `function invertTree(root) {\n  if (!root) return null;\n  const temp = root.left;\n  root.left = invertTree(root.right);\n  root.right = invertTree(temp);\n  return root;\n}`,
      python: `def invertTree(root):\n    if not root: return None\n    root.left, root.right = invertTree(root.right), invertTree(root.left)\n    return root`,
      cpp: `TreeNode* invertTree(TreeNode* root) {\n    if (!root) return nullptr;\n    TreeNode* tmp = root->left;\n    root->left = invertTree(root->right);\n    root->right = invertTree(tmp);\n    return root;\n}`,
      java: `class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        if (root == null) return null;\n        TreeNode tmp = root.left;\n        root.left = invertTree(root.right);\n        root.right = invertTree(tmp);\n        return root;\n    }\n}`
    },
    testCases: [
      { input: 'root = [4,2,7,1,3,6,9]', expected: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', expected: '[2,3,1]' }
    ]
  },
  {
    id: 'maximum-depth-of-binary-tree',
    number: 29,
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    category: 'Trees',
    description: 'Given the `root` of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].'
    ],
    hint: 'Depth of current node is 1 + max(depth(left), depth(right)).',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    starterCode: {
      javascript: `function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}`,
      python: `def maxDepth(root) -> int:\n    if not root: return 0\n    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
      cpp: `int maxDepth(TreeNode* root) {\n    if (!root) return 0;\n    return 1 + std::max(maxDepth(root->left), maxDepth(root->right));\n}`,
      java: `class Solution {\n    public int maxDepth(TreeNode root) {\n        if (root == null) return 0;\n        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n    }\n}`
    },
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expected: '3' },
      { input: 'root = [1,null,2]', expected: '2' }
    ]
  },
  {
    id: 'same-tree',
    number: 30,
    title: 'Same Tree',
    difficulty: 'Easy',
    category: 'Trees',
    description: 'Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.',
    examples: [
      { input: 'p = [1,2,3], q = [1,2,3]', output: 'true' },
      { input: 'p = [1,2], q = [1,null,2]', output: 'false' }
    ],
    constraints: [
      'The number of nodes in both trees is in the range [0, 100].'
    ],
    hint: 'If both nodes are null, return true. If only one is null or values differ, return false. Recursively check children.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    starterCode: {
      javascript: `function isSameTree(p, q) {\n  if (!p && !q) return true;\n  if (!p || !q || p.val !== q.val) return false;\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}`,
      python: `def isSameTree(p, q) -> bool:\n    if not p and not q: return True\n    if not p or not q or p.val != q.val: return False\n    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
      cpp: `bool isSameTree(TreeNode* p, TreeNode* q) {\n    if (!p && !q) return true;\n    if (!p || !q || p->val != q->val) return false;\n    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);\n}`,
      java: `class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        if (p == null && q == null) return true;\n        if (p == null || q == null || p.val != q.val) return false;\n        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n    }\n}`
    },
    testCases: [
      { input: 'p = [1,2,3], q = [1,2,3]', expected: 'true' },
      { input: 'p = [1,2], q = [1,null,2]', expected: 'false' }
    ]
  },
  {
    id: 'lowest-common-ancestor-of-a-binary-search-tree',
    number: 31,
    title: 'Lowest Common Ancestor of a BST',
    difficulty: 'Medium',
    category: 'Trees',
    description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."',
    examples: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6' },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^5].',
      'All Node.val are unique.'
    ],
    hint: 'Leverage the BST ordering. If both p and q values are less than root, go left. If both are greater, go right. The first split node is the LCA.',
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function lowestCommonAncestor(root, p, q) {\n  let curr = root;\n  while (curr) {\n    if (p.val < curr.val && q.val < curr.val) curr = curr.left;\n    else if (p.val > curr.val && q.val > curr.val) curr = curr.right;\n    else return curr;\n  }\n  return null;\n}`,
      python: `def lowestCommonAncestor(root, p, q):\n    curr = root\n    while curr:\n        if p.val < curr.val and q.val < curr.val: curr = curr.left\n        elif p.val > curr.val and q.val > curr.val: curr = curr.right\n        else: return curr`,
      cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    TreeNode* curr = root;\n    while (curr) {\n        if (p->val < curr->val && q->val < curr->val) curr = curr->left;\n        else if (p->val > curr->val && q->val > curr->val) curr = curr->right;\n        else return curr;\n    }\n    return nullptr;\n}`,
      java: `class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        TreeNode curr = root;\n        while (curr != null) {\n            if (p.val < curr.val && q.val < curr.val) curr = curr.left;\n            else if (p.val > curr.val && q.val > curr.val) curr = curr.right;\n            else return curr;\n        }\n        return null;\n    }\n}`
    },
    testCases: [
      { input: 'root = [6,2,8,0,4,7,9], p = 2, q = 8', expected: '6' },
      { input: 'root = [6,2,8,0,4,7,9], p = 2, q = 4', expected: '2' }
    ]
  },
  {
    id: 'binary-tree-level-order-traversal',
    number: 32,
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    category: 'Trees',
    description: 'Given the `root` of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].'
    ],
    hint: 'Use a Queue for breadth-first search. In each level loop, process queue.length nodes simultaneously.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    starterCode: {
      javascript: `function levelOrder(root) {\n  if (!root) return [];\n  const res = [];\n  const queue = [root];\n  while (queue.length) {\n    const levelSize = queue.length;\n    const currentLevel = [];\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n      currentLevel.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    res.push(currentLevel);\n  }\n  return res;\n}`,
      python: `from collections import deque\n\ndef levelOrder(root) -> list[list[int]]:\n    if not root: return []\n    res, q = [], deque([root])\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.popleft()\n            level.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        res.append(level)\n    return res`,
      cpp: `#include <vector>\n#include <queue>\n\nstd::vector<std::vector<int>> levelOrder(TreeNode* root) {\n    if (!root) return {};\n    std::vector<std::vector<int>> res;\n    std::queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        int sz = q.size();\n        std::vector<int> level;\n        for (int i = 0; i < sz; i++) {\n            TreeNode* node = q.front(); q.pop();\n            level.push_back(node->val);\n            if (node->left) q.push(node->left);\n            if (node->right) q.push(node->right);\n        }\n        res.push_back(level);\n    }\n    return res;\n}`,
      java: `import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>> res = new ArrayList<>();\n        if (root == null) return res;\n        Queue<TreeNode> q = new LinkedList<>();\n        q.offer(root);\n        while (!q.isEmpty()) {\n            int sz = q.size();\n            List<Integer> level = new ArrayList<>();\n            for (int i = 0; i < sz; i++) {\n                TreeNode node = q.poll();\n                level.add(node.val);\n                if (node.left != null) q.offer(node.left);\n                if (node.right != null) q.offer(node.right);\n            }\n            res.add(level);\n        }\n        return res;\n    }\n}`
    },
    testCases: [
      { input: 'root = [3,9,20,null,null,15,7]', expected: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', expected: '[[1]]' }
    ]
  },
  {
    id: 'validate-binary-search-tree',
    number: 33,
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    category: 'Trees',
    description: 'Given the `root` of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys strictly less than the node\'s key.\n- The right subtree of a node contains only nodes with keys strictly greater than the node\'s key.\n- Both the left and right subtrees must also be binary search trees.',
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'The root node\'s value is 5 but its right child\'s value is 4.' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].'
    ],
    hint: 'Pass down valid boundaries (minVal, maxVal) recursively. Left child upper bound is node.val, right child lower bound is node.val.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    starterCode: {
      javascript: `function isValidBST(root, min = -Infinity, max = Infinity) {\n  if (!root) return true;\n  if (root.val <= min || root.val >= max) return false;\n  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);\n}`,
      python: `def isValidBST(root, min_val=float('-inf'), max_val=float('inf')) -> bool:\n    if not root: return True\n    if root.val <= min_val or root.val >= max_val: return False\n    return isValidBST(root.left, min_val, root.val) and isValidBST(root.right, root.val, max_val)`,
      cpp: `bool isValidBST(TreeNode* root, long long minVal = -1e18, long long maxVal = 1e18) {\n    if (!root) return true;\n    if (root->val <= minVal || root->val >= maxVal) return false;\n    return isValidBST(root->left, minVal, root->val) && isValidBST(root->right, root->val, maxVal);\n}`,
      java: `class Solution {\n    public boolean isValidBST(TreeNode root) {\n        return validate(root, null, null);\n    }\n    private boolean validate(TreeNode node, Integer min, Integer max) {\n        if (node == null) return true;\n        if ((min != null && node.val <= min) || (max != null && node.val >= max)) return false;\n        return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n    }\n}`
    },
    testCases: [
      { input: 'root = [2,1,3]', expected: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', expected: 'false' }
    ]
  },

  // ─── Graphs (34 - 36) ──────────────────────────────────────────
  {
    id: 'number-of-islands',
    number: 34,
    title: 'Number of Islands',
    difficulty: 'Medium',
    category: 'Graphs',
    description: 'Given an `m x n` 2D binary grid `grid` which represents a map of `\'1\'`s (land) and `\'0\'`s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.',
    examples: [
      { input: 'grid = [\n  ["1","1","1","1","0"],\n  ["1","1","0","1","0"],\n  ["1","1","0","0","0"],\n  ["0","0","0","0","0"]\n]', output: '1' },
      { input: 'grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]', output: '3' }
    ],
    constraints: [
      'm == grid.length, n == grid[i].length',
      '1 <= m, n <= 300',
      'grid[i][j] is \'0\' or \'1\'.'
    ],
    hint: 'Iterate over every cell. When a \'1\' is discovered, increment island count and run BFS/DFS to sink all connected land cells by flipping them to \'0\'.',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
    starterCode: {
      javascript: `function numIslands(grid) {\n  if (!grid || !grid.length) return 0;\n  let islands = 0;\n  const m = grid.length, n = grid[0].length;\n  function dfs(r, c) {\n    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] !== '1') return;\n    grid[r][c] = '0'; // mark visited\n    dfs(r + 1, c); dfs(r - 1, c);\n    dfs(r, c + 1); dfs(r, c - 1);\n  }\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) {\n      if (grid[r][c] === '1') {\n        islands++;\n        dfs(r, c);\n      }\n    }\n  }\n  return islands;\n}`,
      python: `def numIslands(grid: list[list[str]]) -> int:\n    if not grid: return 0\n    m, n = len(grid), len(grid[0])\n    islands = 0\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] != '1': return\n        grid[r][c] = '0'\n        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)\n    for r in range(m):\n        for c in range(n):\n            if grid[r][c] == '1':\n                islands += 1\n                dfs(r, c)\n    return islands`,
      cpp: `#include <vector>\n\nvoid dfs(std::vector<std::vector<char>>& grid, int r, int c) {\n    if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] != '1') return;\n    grid[r][c] = '0';\n    dfs(grid, r + 1, c); dfs(grid, r - 1, c);\n    dfs(grid, r, c + 1); dfs(grid, r, c - 1);\n}\n\nint numIslands(std::vector<std::vector<char>>& grid) {\n    int count = 0;\n    for (int r = 0; r < grid.size(); r++) {\n        for (int c = 0; c < grid[0].size(); c++) {\n            if (grid[r][c] == '1') { count++; dfs(grid, r, c); }\n        }\n    }\n    return count;\n}`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        int count = 0;\n        for (int r = 0; r < grid.length; r++) {\n            for (int c = 0; c < grid[0].length; c++) {\n                if (grid[r][c] == '1') { count++; dfs(grid, r, c); }\n            }\n        }\n        return count;\n    }\n    private void dfs(char[][] grid, int r, int c) {\n        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;\n        grid[r][c] = '0';\n        dfs(grid, r + 1, c); dfs(grid, r - 1, c);\n        dfs(grid, r, c + 1); dfs(grid, r, c - 1);\n    }\n}`
    },
    testCases: [
      { input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', expected: '2' },
      { input: 'grid = [["1","0"],["0","1"]]', expected: '2' }
    ]
  },
  {
    id: 'clone-graph',
    number: 35,
    title: 'Clone Graph',
    difficulty: 'Medium',
    category: 'Graphs',
    description: 'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (`val`) and a list (`List[Node]`) of its neighbors.',
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' }
    ],
    constraints: [
      'The number of nodes in the graph is in the range [0, 100].',
      '1 <= Node.val <= 100',
      'Node.val is unique for each node.'
    ],
    hint: 'Use a hash map mapping original node pointers to their cloned node counterparts to avoid infinite recursion on cycles.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    starterCode: {
      javascript: `function cloneGraph(node) {\n  if (!node) return null;\n  const visited = new Map();\n  function dfs(curr) {\n    if (visited.has(curr)) return visited.get(curr);\n    const copy = { val: curr.val, neighbors: [] };\n    visited.set(curr, copy);\n    for (const neighbor of curr.neighbors) {\n      copy.neighbors.push(dfs(neighbor));\n    }\n    return copy;\n  }\n  return dfs(node);\n}`,
      python: `def cloneGraph(node):\n    if not node: return None\n    visited = {}\n    def dfs(curr):\n        if curr in visited: return visited[curr]\n        copy = Node(curr.val)\n        visited[curr] = copy\n        for nei in curr.neighbors:\n            copy.neighbors.append(dfs(nei))\n        return copy\n    return dfs(node)`,
      cpp: `#include <unordered_map>\n#include <vector>\n\nclass Node { public: int val; std::vector<Node*> neighbors; Node(int _val) : val(_val) {} };\n\nstd::unordered_map<Node*, Node*> visited;\nNode* cloneGraph(Node* node) {\n    if (!node) return nullptr;\n    if (visited.count(node)) return visited[node];\n    Node* copy = new Node(node->val);\n    visited[node] = copy;\n    for (Node* nei : node->neighbors) copy->neighbors.push_back(cloneGraph(nei));\n    return copy;\n}`,
      java: `import java.util.*;\n\nclass Solution {\n    private Map<Node, Node> visited = new HashMap<>();\n    public Node cloneGraph(Node node) {\n        if (node == null) return null;\n        if (visited.containsKey(node)) return visited.get(node);\n        Node copy = new Node(node.val);\n        visited.put(node, copy);\n        for (Node nei : node.neighbors) copy.neighbors.add(cloneGraph(nei));\n        return copy;\n    }\n}`
    },
    testCases: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', expected: '[[2,4],[1,3],[2,4],[1,3]]' }
    ]
  },
  {
    id: 'course-schedule',
    number: 36,
    title: 'Course Schedule',
    difficulty: 'Medium',
    category: 'Graphs',
    description: 'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`. Return `true` if you can finish all courses. Otherwise, return `false`.',
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Cycle exists.' }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000'
    ],
    hint: 'Topological sort (Kahn\'s BFS algorithm with in-degrees) or DFS cycle detection. If a cycle exists, return false.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {\n  const inDegree = new Array(numCourses).fill(0);\n  const adj = Array.from({ length: numCourses }, () => []);\n  for (const [course, pre] of prerequisites) {\n    adj[pre].push(course);\n    inDegree[course]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numCourses; i++) {\n    if (inDegree[i] === 0) queue.push(i);\n  }\n  let taken = 0;\n  while (queue.length) {\n    const node = queue.shift();\n    taken++;\n    for (const next of adj[node]) {\n      if (--inDegree[next] === 0) queue.push(next);\n    }\n  }\n  return taken === numCourses;\n}`,
      python: `def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:\n    from collections import deque\n    in_degree = [0] * numCourses\n    adj = [[] for _ in range(numCourses)]\n    for c, p in prerequisites:\n        adj[p].append(c)\n        in_degree[c] += 1\n    q = deque([i for i in range(numCourses) if in_degree[i] == 0])\n    taken = 0\n    while q:\n        node = q.popleft()\n        taken += 1\n        for nxt in adj[node]:\n            in_degree[nxt] -= 1\n            if in_degree[nxt] == 0: q.append(nxt)\n    return taken == numCourses`,
      cpp: `#include <vector>\n#include <queue>\n\nbool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {\n    std::vector<int> inDegree(numCourses, 0);\n    std::vector<std::vector<int>> adj(numCourses);\n    for (auto& pre : prerequisites) {\n        adj[pre[1]].push_back(pre[0]);\n        inDegree[pre[0]]++;\n    }\n    std::queue<int> q;\n    for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n    int taken = 0;\n    while (!q.empty()) {\n        int curr = q.front(); q.pop();\n        taken++;\n        for (int next : adj[curr]) {\n            if (--inDegree[next] == 0) q.push(next);\n        }\n    }\n    return taken == numCourses;\n}`,
      java: `import java.util.*;\n\nclass Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        int[] inDegree = new int[numCourses];\n        List<Integer>[] adj = new List[numCourses];\n        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();\n        for (int[] p : prerequisites) {\n            adj[p[1]].add(p[0]);\n            inDegree[p[0]]++;\n        }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.offer(i);\n        int taken = 0;\n        while (!q.isEmpty()) {\n            int node = q.poll();\n            taken++;\n            for (int nxt : adj[node]) if (--inDegree[nxt] == 0) q.offer(nxt);\n        }\n        return taken == numCourses;\n    }\n}`
    },
    testCases: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', expected: 'true' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', expected: 'false' }
    ]
  },

  // ─── Dynamic Programming & Backtracking (37 - 40) ───────────────
  {
    id: 'climbing-stairs',
    number: 37,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    description: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      { input: 'n = 2', output: '2', explanation: 'There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps.' },
      { input: 'n = 3', output: '3', explanation: '1. 1 + 1 + 1, 2. 1 + 2, 3. 2 + 1' }
    ],
    constraints: [
      '1 <= n <= 45'
    ],
    hint: 'ways(n) = ways(n - 1) + ways(n - 2). This is identical to the Fibonacci recurrence.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    starterCode: {
      javascript: `function climbStairs(n) {\n  if (n <= 2) return n;\n  let prev1 = 1, prev2 = 2;\n  for (let i = 3; i <= n; i++) {\n    const curr = prev1 + prev2;\n    prev1 = prev2;\n    prev2 = curr;\n  }\n  return prev2;\n}`,
      python: `def climbStairs(n: int) -> int:\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b`,
      cpp: `int climbStairs(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int c = a + b;\n        a = b; b = c;\n    }\n    return b;\n}`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b;\n            a = b; b = c;\n        }\n        return b;\n    }\n}`
    },
    testCases: [
      { input: 'n = 2', expected: '2' },
      { input: 'n = 3', expected: '3' },
      { input: 'n = 5', expected: '8' }
    ]
  },
  {
    id: 'coin-change',
    number: 38,
    title: 'Coin Change',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`. You may assume that you have an infinite number of each kind of coin.',
    examples: [
      { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1], amount = 0', output: '0' }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    hint: 'dp[i] represents the minimum coins for amount i. Transition: dp[i] = min(dp[i], 1 + dp[i - coin]) for all coin <= i.',
    timeComplexity: 'O(amount * coins.length)',
    spaceComplexity: 'O(amount)',
    starterCode: {
      javascript: `function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (i - coin >= 0) {\n        dp[i] = Math.min(dp[i], 1 + dp[i - coin]);\n      }\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}`,
      python: `def coinChange(coins: list[int], amount: int) -> int:\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for coin in coins:\n            if i - coin >= 0:\n                dp[i] = min(dp[i], 1 + dp[i - coin])\n    return -1 if dp[amount] == float('inf') else dp[amount]`,
      cpp: `#include <vector>\n#include <algorithm>\n\nint coinChange(std::vector<int>& coins, int amount) {\n    std::vector<int> dp(amount + 1, 1e9);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        for (int coin : coins) {\n            if (i - coin >= 0) dp[i] = std::min(dp[i], 1 + dp[i - coin]);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}`,
      java: `import java.util.Arrays;\n\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (i - coin >= 0) dp[i] = Math.min(dp[i], 1 + dp[i - coin]);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}`
    },
    testCases: [
      { input: 'coins = [1,2,5], amount = 11', expected: '3' },
      { input: 'coins = [2], amount = 3', expected: '-1' },
      { input: 'coins = [1], amount = 0', expected: '0' }
    ]
  },
  {
    id: 'longest-increasing-subsequence',
    number: 39,
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: 'Given an integer array `nums`, return the length of the longest strictly increasing subsequence. A subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.',
    examples: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4.' },
      { input: 'nums = [0,1,0,3,2,3]', output: '4' }
    ],
    constraints: [
      '1 <= nums.length <= 2500',
      '-10^4 <= nums[i] <= 10^4'
    ],
    hint: 'Maintain an array `tails` storing the smallest tail of all increasing subsequences of various lengths. Use binary search (patience sorting) in O(n log n).',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    starterCode: {
      javascript: `function lengthOfLIS(nums) {\n  const tails = [];\n  for (const n of nums) {\n    let l = 0, r = tails.length;\n    while (l < r) {\n      const mid = (l + r) >> 1;\n      if (tails[mid] < n) l = mid + 1;\n      else r = mid;\n    }\n    tails[l] = n;\n  }\n  return tails.length;\n}`,
      python: `import bisect\n\ndef lengthOfLIS(nums: list[int]) -> int:\n    tails = []\n    for n in nums:\n        idx = bisect.bisect_left(tails, n)\n        if idx == len(tails): tails.append(n)\n        else: tails[idx] = n\n    return len(tails)`,
      cpp: `#include <vector>\n#include <algorithm>\n\nint lengthOfLIS(std::vector<int>& nums) {\n    std::vector<int> tails;\n    for (int n : nums) {\n        auto it = std::lower_bound(tails.begin(), tails.end(), n);\n        if (it == tails.end()) tails.push_back(n);\n        else *it = n;\n    }\n    return tails.size();\n}`,
      java: `import java.util.*;\n\nclass Solution {\n    public int lengthOfLIS(int[] nums) {\n        int[] tails = new int[nums.length];\n        int len = 0;\n        for (int n : nums) {\n            int i = Arrays.binarySearch(tails, 0, len, n);\n            if (i < 0) i = -(i + 1);\n            tails[i] = n;\n            if (i == len) len++;\n        }\n        return len;\n    }\n}`
    },
    testCases: [
      { input: 'nums = [10,9,2,5,3,7,101,18]', expected: '4' },
      { input: 'nums = [0,1,0,3,2,3]', expected: '4' }
    ]
  },
  {
    id: 'subsets',
    number: 40,
    title: 'Subsets',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    description: 'Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
    examples: [
      { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
      { input: 'nums = [0]', output: '[[],[0]]' }
    ],
    constraints: [
      '1 <= nums.length <= 10',
      '-10 <= nums[i] <= 10',
      'All the numbers of nums are unique.'
    ],
    hint: 'Backtracking: at each index, decide whether to include nums[i] or exclude it, branching until the base case index == nums.length.',
    timeComplexity: 'O(n * 2^n)',
    spaceComplexity: 'O(n)',
    starterCode: {
      javascript: `function subsets(nums) {\n  const res = [];\n  function backtrack(start, curr) {\n    res.push([...curr]);\n    for (let i = start; i < nums.length; i++) {\n      curr.push(nums[i]);\n      backtrack(i + 1, curr);\n      curr.pop();\n    }\n  }\n  backtrack(0, []);\n  return res;\n}`,
      python: `def subsets(nums: list[int]) -> list[list[int]]:\n    res = []\n    def backtrack(start, curr):\n        res.append(list(curr))\n        for i in range(start, len(nums)):\n            curr.append(nums[i])\n            backtrack(i + 1, curr)\n            curr.pop()\n    backtrack(0, [])\n    return res`,
      cpp: `#include <vector>\n\nvoid backtrack(std::vector<int>& nums, int start, std::vector<int>& curr, std::vector<std::vector<int>>& res) {\n    res.push_back(curr);\n    for (int i = start; i < nums.size(); i++) {\n        curr.push_back(nums[i]);\n        backtrack(nums, i + 1, curr, res);\n        curr.pop_back();\n    }\n}\n\nstd::vector<std::vector<int>> subsets(std::vector<int>& nums) {\n    std::vector<std::vector<int>> res;\n    std::vector<int> curr;\n    backtrack(nums, 0, curr, res);\n    return res;\n}`,
      java: `import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        List<List<Integer>> res = new ArrayList<>();\n        backtrack(nums, 0, new ArrayList<>(), res);\n        return res;\n    }\n    private void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> res) {\n        res.add(new ArrayList<>(curr));\n        for (int i = start; i < nums.length; i++) {\n            curr.add(nums[i]);\n            backtrack(nums, i + 1, curr, res);\n            curr.remove(curr.size() - 1);\n        }\n    }\n}`
    },
    testCases: [
      { input: 'nums = [1,2,3]', expected: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
      { input: 'nums = [0]', expected: '[[],[0]]' }
    ]
  }
];
