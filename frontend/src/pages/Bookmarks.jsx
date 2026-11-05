import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Play, Trash2, BookOpen } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const res = await api.get('/api/bookmarks');
      setBookmarks(res.data);
      setLoading(false);
    } catch {
      toast.error('Failed to load bookmarks');
      setLoading(false);
    }
  };

  const removeBookmark = async (id) => {
    try {
      await api.post('/api/bookmarks/toggle', { questionId: id });
      setBookmarks(bookmarks.filter(b => (b._id || b.id) !== id));
      toast.success('Question removed from bookmarks');
    } catch {
      toast.error('Failed to remove bookmark');
    }
  };

  const startPractice = () => {
    if (bookmarks.length === 0) return;
    navigate('/interview/bookmarks?mode=bookmarks');
  };

  if (loading) return <div className="p-12 text-center text-slate-500">Loading your saved questions...</div>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-gradient-to-r from-white to-blue-50 p-6 md:flex-row md:items-center">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">Saved Questions</h1>
          <p className="text-slate-600">Review and practice the questions you've bookmarked.</p>
        </div>
        <Button 
          variant="primary" 
          disabled={bookmarks.length === 0} 
          onClick={startPractice}
          className="flex items-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>Practice All Bookmarked</span>
        </Button>
      </div>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {bookmarks.map((q) => (
            <Card key={q._id || q.id} className="transition-colors hover:border-blue-200">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {q.category}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                      q.difficulty === 'easy' ? 'bg-green-100 text-green-700' : 
                      q.difficulty === 'hard' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-medium text-slate-800">{q.question}</h3>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm italic text-slate-600">
                    <span className="font-bold text-slate-700 not-italic block mb-1">Explanation:</span>
                    {q.explanation}
                  </div>
                </div>
                <button 
                  onClick={() => removeBookmark(q._id || q.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center border-2 border-dashed p-16 text-center">
          <Bookmark className="w-16 h-16 text-slate-200 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">No bookmarks yet</h3>
          <p className="text-slate-500 max-w-sm mb-6">
            Questions you save during practice or interviews will appear here for quick review.
          </p>
          <Button variant="secondary" onClick={() => navigate('/')}>Start Practicing</Button>
        </Card>
      )}
    </div>
  );
};

export default Bookmarks;
