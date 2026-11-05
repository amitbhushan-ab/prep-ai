const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.join(__dirname, 'db.json');

// Initialize database file
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({
    users: [],
    questions: [],
    results: []
  }, null, 2));
}

const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

const createModel = (collectionName) => {
  const db = readDB();
  if (!db[collectionName]) {
    db[collectionName] = [];
    writeDB(db);
  }
  return {
    findOne: async (query) => {
      const db = readDB();
      return db[collectionName].find(item => {
        let match = true;
        for (let key in query) {
          if (item[key] !== query[key]) match = false;
        }
        return match;
      }) || null;
    },
    findById: async (id) => {
      const db = readDB();
      return db[collectionName].find(item => item._id === id || item.id === id) || null;
    },
    find: (query = {}) => {
      const db = readDB();
      let results = db[collectionName];
      for (let key in query) {
        results = results.filter(item => item[key] === query[key]);
      }
      return {
        limit: function(count) {
          if (typeof count === 'number') results = results.slice(0, count);
          return this;
        },
        sort: function(opts) { 
          // rudimentary sort by createdAt desc if needed
          if (opts && opts.createdAt === -1) {
            results = results.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
          }
          return this; 
        },
        then: function(resolve) { resolve(results); }
      };
    },
    create: async (data) => {
      const db = readDB();
      const newItem = { ...data, _id: crypto.randomBytes(12).toString('hex'), id: crypto.randomBytes(12).toString('hex'), createdAt: new Date().toISOString() };
      db[collectionName].push(newItem);
      writeDB(db);
      return { ...newItem, save: async () => newItem };
    },
    insertMany: async (dataArray) => {
      const db = readDB();
      const newItems = dataArray.map(item => ({ ...item, _id: crypto.randomBytes(12).toString('hex'), createdAt: new Date().toISOString() }));
      db[collectionName] = [...db[collectionName], ...newItems];
      writeDB(db);
      return newItems;
    },
    countDocuments: async () => {
      const db = readDB();
      return db[collectionName].length;
    },
    distinct: async (field) => {
        const db = readDB();
        const items = db[collectionName].map(item => item[field]);
        return [...new Set(items)];
    },
    findByIdAndUpdate: async (id, patch) => {
      const db = readDB();
      const index = db[collectionName].findIndex(item => item._id === id || item.id === id);
      if (index === -1) return null;
      const updated = {
        ...db[collectionName][index],
        ...patch,
        updatedAt: new Date().toISOString()
      };
      db[collectionName][index] = updated;
      writeDB(db);
      return updated;
    },
    deleteOne: async (query) => {
      const db = readDB();
      const initialLength = db[collectionName].length;
      db[collectionName] = db[collectionName].filter(item => {
        let match = true;
        for (let key in query) {
          if (item[key] !== query[key]) match = false;
        }
        return !match;
      });
      writeDB(db);
      return { deletedCount: initialLength - db[collectionName].length };
    }
  };
};

module.exports = {
  User: createModel('users'),
  Question: createModel('questions'),
  Result: createModel('results'),
  Bookmark: createModel('bookmarks'),
  Exam: createModel('exams'),
  Test: createModel('tests'),
  Attempt: createModel('attempts'),
  Interview: createModel('interviews'),
  StudyPlan: createModel('studyPlans'),
  Flashcard: createModel('flashcards'),
  AuditLog: createModel('auditLogs'),
  Rubric: createModel('rubrics')
};
