const { Result, Question } = require('../mockDB');

const submitInterview = async (req, res) => {
  try {
    const { category, answers, timeTaken, mode } = req.body;
    
    let totalScore = 0;
    const processedAnswers = [];

    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (!question) continue;

      const userText = (answer.userAnswer || '').trim();
      let isCorrect = false;
      let partialScore = 0;

      if (question.type === 'mcq') {
        // Simple case-insensitive match for MCQ
        if (userText.toLowerCase() === question.correctAnswer.toLowerCase()) {
          isCorrect = true;
          partialScore = 1;
        }
      } else {
        // Keyword match for Text questions
        let matchedKeywords = 0;
        const lowercaseUserText = userText.toLowerCase();
        
        question.keywords.forEach(kw => {
          if (lowercaseUserText.includes(kw.toLowerCase())) {
            matchedKeywords++;
          }
        });

        const totalKws = question.keywords.length;
        if (totalKws === 0) {
          if (userText.length > 5) { isCorrect = true; partialScore = 1; }
        } else {
          const ratio = matchedKeywords / totalKws;
          if (ratio >= 0.5) {
            isCorrect = true;
            partialScore = 1;
          } else if (ratio > 0) {
            isCorrect = false;
            partialScore = 0.5;
          }
        }
      }
      
      totalScore += partialScore;

      processedAnswers.push({
        questionId: question._id,
        question: question.question,
        userAnswer: answer.userAnswer,
        isCorrect,
        partialScore,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      });
    }

    const resultObj = await Result.create({
      userId: req.user.id,
      category: category || mode,
      totalScore,
      totalQuestions: answers.length,
      answers: processedAnswers,
      timeTaken: timeTaken || 0,
      mode: mode || 'Standard'
    });
    
    res.status(201).json(resultObj);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user.id }).sort({ createdAt: -1 });

    const totalInterviews = results.length;
    let totalScoreAll = 0;
    let totalQsAll = 0;
    
    const categoryStats = {};

    results.forEach(r => {
      totalScoreAll += r.totalScore;
      totalQsAll += r.totalQuestions;

      if (!categoryStats[r.category]) {
        categoryStats[r.category] = { attempts: 0, totalScore: 0, totalQs: 0 };
      }
      categoryStats[r.category].attempts++;
      categoryStats[r.category].totalScore += r.totalScore;
      categoryStats[r.category].totalQs += r.totalQuestions;
    });

    const averageScore = totalInterviews === 0 ? 0 : Math.round((totalScoreAll / totalQsAll) * 100);

    // Generate suggestions based on weakest area
    let weakest = { name: 'None', score: 100 };
    Object.keys(categoryStats).forEach(l => {
      const acc = Math.round((categoryStats[l].totalScore / categoryStats[l].totalQs) * 100);
      if (acc < weakest.score) weakest = { name: l, score: acc };
    });

    const suggestions = [];
    if (weakest.name !== 'None') {
      suggestions.push({
        type: 'weakArea',
        category: weakest.name,
        message: `Your ${weakest.name} accuracy is ${weakest.score}%. Practice this topic more to improve.`,
        action: `/interview/${weakest.name}?mode=topic`
      });
    }
    
    // Add generic suggestion if few interviews
    if (totalInterviews < 3) {
      suggestions.push({
        type: 'general',
        message: 'Complete more interviews to get detailed performance insights.',
        action: '/'
      });
    }

    // Format category stats for chart.js
    const labels = Object.keys(categoryStats);
    const chartData = labels.map(l => Math.round((categoryStats[l].totalScore / categoryStats[l].totalQs) * 100));

    res.json({
      totalInterviews,
      averageScore,
      totalAttemptedQuestions: totalQsAll,
      recentAttempts: results.slice(0, 5), // top 5 recent
      suggestions,
      chart: {
        labels,
        data: chartData
      }
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const getHistory = async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const { User } = require('../mockDB');
    const allResults = await Result.find();
    const allUsers = await User.find();
    
    const userStats = {};

    allResults.forEach(r => {
      if (!userStats[r.userId]) {
        userStats[r.userId] = { totalScore: 0, totalQs: 0 };
      }
      userStats[r.userId].totalScore += r.totalScore;
      userStats[r.userId].totalQs += r.totalQuestions;
    });

    const leaderboard = Object.keys(userStats).map(uid => {
      const stats = userStats[uid];
      const user = allUsers.find(u => u._id === uid || u.id === uid);
      const score = Math.round((stats.totalScore / stats.totalQs) * 100);
      return {
        id: uid,
        name: user ? user.name : 'Unknown',
        score: score
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Top 10

    res.json(leaderboard);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  submitInterview,
  getDashboardStats,
  getHistory,
  getLeaderboard
};
