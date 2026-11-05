const { User } = require('../mockDB');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const DEFAULT_ACCOUNT_DEFAULTS = Object.freeze({
  targetExam: 'JEE Advanced 2026',
  targetCategory: 'entrance',
  examDate: '2026-05-24',
  readinessScore: 82,
  dailyGoalHours: 4,
  todayCompletedTasks: 3
});

const JWT_EXPIRES_IN = '7d';
const VALID_PORTALS = ['learner', 'content', 'admin'];

const defaultAccounts = [
  { name: 'Ankit Pal', email: 'ankit@prepai.edu', password: 'password123', role: 'learner', streak: 7 },
  { name: 'Dr. Ramesh Sharma', email: 'sme@prepai.edu', password: 'password123', role: 'content_author', streak: 14 },
  { name: 'Master Admin Team', email: 'admin@prepai.io', password: 'password123', role: 'admin', streak: 30 }
];

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

const toSafeUser = (user) => {
  if (!user) return null;
  const { password, ...safe } = { ...user };
  return {
    ...safe,
    role: safe.role || 'learner',
    targetExam: safe.targetExam || DEFAULT_ACCOUNT_DEFAULTS.targetExam,
    targetCategory: safe.targetCategory || DEFAULT_ACCOUNT_DEFAULTS.targetCategory,
    examDate: safe.examDate || DEFAULT_ACCOUNT_DEFAULTS.examDate
  };
};

const createToken = (user, portal) =>
  jwt.sign(
    { user: { id: user.id || user._id, role: user.role, portal } },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

const ensureDefaultAccounts = async () => {
  try {
    for (const account of defaultAccounts) {
      const email = normalizeEmail(account.email);
      const existing = await User.findOne({ email });
      if (existing) continue;

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(account.password, salt);

      await User.create({
        name: account.name,
        email,
        password,
        role: account.role,
        streak: account.streak,
        ...DEFAULT_ACCOUNT_DEFAULTS
      });
    }
  } catch (error) {
    console.warn('Default account initialization skipped:', error.message);
  }
};

const register = async (req, res) => {
  try {
    const { name, password, portal = 'learner', skills } = req.body;
    const email = normalizeEmail(req.body.email);

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    if (!VALID_PORTALS.includes(portal)) {
      return res.status(400).json({ message: `Unknown portal: ${portal}` });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'An account already exists with this email address' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let role = 'learner';
    if (portal === 'admin' || email.includes('admin')) role = 'admin';
    else if (portal === 'content' || email.includes('content') || email.includes('sme')) {
      role = 'content_author';
    }

    const user = await User.create({
      name: String(name).trim(),
      email,
      password: hashedPassword,
      skills: Array.isArray(skills) ? skills : ['Reasoning', 'Technical Analysis'],
      role,
      streak: 1,
      ...DEFAULT_ACCOUNT_DEFAULTS
    });

    res.status(201).json({ token: createToken(user, portal), user: toSafeUser(user), portal });
  } catch (error) {
    console.error('Register failed:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { password, portal = 'learner' } = req.body;
    const email = normalizeEmail(req.body.email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    if (!VALID_PORTALS.includes(portal)) {
      return res.status(400).json({ message: `Unknown portal: ${portal}` });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. No account found with this email.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Incorrect password.' });
    }

    // Portals are independent: a session in one portal never grants another.
    if (portal === 'admin' && user.role !== 'admin') {
      return res.status(403).json({
        message:
          'Access Denied: This portal requires administrative credentials. Learner and content accounts are not authorized for the Admin Console.'
      });
    }
    if (portal === 'content' && user.role !== 'content_author' && user.role !== 'admin') {
      return res.status(403).json({
        message:
          'Access Denied: This portal is restricted to subject-matter experts and content reviewers.'
      });
    }
    if (portal === 'learner' && user.role !== 'learner' && user.role !== 'admin') {
      return res.status(403).json({
        message: 'Access Denied: Please use a learner account for candidate exam modules.'
      });
    }

    res.json({ token: createToken(user, portal), user: toSafeUser(user), portal });
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(toSafeUser(user));
  } catch (error) {
    console.error('getMe failed:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map(toSafeUser));
  } catch (error) {
    console.error('getAllUsers failed:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const PROFILE_FIELDS = ['targetExam', 'targetCategory', 'examDate', 'skills', 'dailyGoalHours'];

const updateProfile = async (req, res) => {
  try {
    const updates = {};
    PROFILE_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No supported profile fields were provided' });
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(toSafeUser(user));
  } catch (error) {
    console.error('updateProfile failed:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

ensureDefaultAccounts();

module.exports = {
  register,
  login,
  getMe,
  getAllUsers,
  updateProfile
};
