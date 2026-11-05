const { Question, Result } = require('../mockDB');

// Helper to shuffle array
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Get questions by category
const getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    // In a real app we might pick random questions, but here we just fetch all for that category
    const questions = await Question.find({ category: category }).limit(15);
    
    res.json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all categories available
const getCategories = async (req, res) => {
  try {
    const categories = await Question.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Generate Smart Questions
const generateQuestions = async (req, res) => {
  try {
    const { mode, topic } = req.query;
    let allQs = await Question.find();
    let selected = [];

    const userId = req.user.id;

    if (mode === 'retry') {
      // Find all results, extract wrong question IDs
      const results = await Result.find({ userId });
      const wrongIds = new Set();
      results.forEach(r => {
        r.answers.forEach(ans => {
          if (!ans.isCorrect) wrongIds.add(ans.questionId);
        });
      });
      selected = allQs.filter(q => wrongIds.has(q._id) || wrongIds.has(q.id));
      selected = shuffle(selected).slice(0, 10);
      
    } else if (mode === 'bookmarks') {
      const { Bookmark } = require('../mockDB');
      const bookmarks = await Bookmark.find({ userId });
      const bIds = new Set(bookmarks.map(b => b.questionId));
      selected = allQs.filter(q => bIds.has(q._id) || bIds.has(q.id));

    } else if (mode === 'mock') {
      // Progressive difficulty: 3 easy, 4 med, 3 hard
      let pool = topic ? allQs.filter(q => q.category === topic) : allQs;
      const easy = shuffle(pool.filter(q => q.difficulty.toLowerCase() === 'easy')).slice(0, 3);
      const med = shuffle(pool.filter(q => q.difficulty.toLowerCase() === 'medium')).slice(0, 4);
      const hard = shuffle(pool.filter(q => q.difficulty.toLowerCase() === 'hard')).slice(0, 3);
      selected = [...easy, ...med, ...hard];

    } else if (mode === 'quick') {
      selected = shuffle(allQs).slice(0, 5);
    } else if (mode === 'speed') {
      selected = shuffle(allQs).slice(0, 10);
    } else if (mode === 'mixed') {
      selected = shuffle(allQs).slice(0, 15);
    } else if (mode === 'weakArea') {
      const results = await Result.find({ userId });
      if (!results || results.length === 0) {
        selected = shuffle(allQs).slice(0, 10);
      } else {
        const stats = {};
        results.forEach(r => {
          if (!stats[r.category]) stats[r.category] = {s:0, t:0};
          stats[r.category].s += r.totalScore;
          stats[r.category].t += r.totalQuestions;
        });
        let weakest = null;
        let lowestAcc = 101;
        for (let c in stats) {
          let acc = stats[c].s / stats[c].t;
          if (acc < lowestAcc) { lowestAcc = acc; weakest = c; }
        }
        let weakQs = allQs.filter(q => q.category === weakest);
        selected = shuffle(weakQs).slice(0, 10);
      }
    } else if (mode === 'topic' && topic) {
      let filtered = allQs.filter(q => q.category.toLowerCase() === topic.toLowerCase());
      selected = shuffle(filtered).slice(0, 10);
    } else {
      let cat = topic || 'HR';
      selected = shuffle(allQs.filter(q => q.category.toLowerCase() === cat.toLowerCase())).slice(0, 10);
    }

    res.json(selected);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getQuestionsByCategory,
  getCategories,
  generateQuestions
};
