const { Bookmark, Question } = require('../mockDB');

const toggleBookmark = async (req, res) => {
  try {
    const { questionId } = req.body;
    const userId = req.user.id;

    const existing = await Bookmark.findOne({ userId, questionId });

    if (existing) {
      await Bookmark.deleteOne({ userId, questionId });
      res.status(200).json({ message: 'Bookmark removed', action: 'removed' });
    } else {
      await Bookmark.create({ userId, questionId });
      res.status(201).json({ message: 'Bookmark added', action: 'added' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarks = await Bookmark.find({ userId });
    
    // Fetch actual question details
    const questionIds = bookmarks.map(b => b.questionId);
    const allQuestions = await Question.find();
    const bookmarkedQuestions = allQuestions.filter(q => questionIds.includes(q._id) || questionIds.includes(q.id));
    
    res.json(bookmarkedQuestions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  toggleBookmark,
  getBookmarks
};
