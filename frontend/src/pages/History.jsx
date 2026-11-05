import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { Calendar, CheckCircle, XCircle, Info, Eye, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/api/results/history');
        setHistory(res.data);
        setLoading(false);
      } catch {
        toast.error('Failed to load history');
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const openReview = (result) => {
    setSelectedResult(result);
  };

  const closeReview = () => {
    setSelectedResult(null);
  };

  if (loading) return <div className="animate-soft-pulse p-12 text-center text-slate-500">Loading your history...</div>;

  return (
    <div className="animate-fade-in mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Interview History</h1>
        <p className="text-slate-600">Review your past performances and identify areas for improvement.</p>
      </div>

      <div className="space-y-4">
        {history.length > 0 ? (
          history.map((item) => (
            <Card key={item._id} className="animate-rise-in transition-colors hover:border-blue-200">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {item.mode === 'Standard' ? `${item.category} Session` : `${item.mode || 'Practice'} Mode`}
                  </h3>
                </div>
                
                <div className="flex w-full items-center space-x-6 sm:w-auto">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none mb-1">Score</p>
                    <p className={`text-xl font-bold ${item.totalScore/item.totalQuestions >= 0.7 ? 'text-green-600' : 'text-orange-600'}`}>
                      {Math.round((item.totalScore / item.totalQuestions) * 100)}%
                    </p>
                  </div>
                  <Button variant="secondary" onClick={() => openReview(item)} className="p-2.5">
                    <Eye className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="animate-rise-in py-16 text-center">
            <p className="text-slate-500 mb-4">You haven't completed any interviews yet.</p>
            <Button variant="primary" onClick={() => (window.location.href = '/')}>Start Your First Interview</Button>
          </Card>
        )}
      </div>

      {/* Review Modal */}
      {selectedResult && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="animate-rise-in flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Session Review</h2>
                <p className="text-sm text-slate-500">{selectedResult.category} • {new Date(selectedResult.createdAt).toLocaleDateString()}</p>
              </div>
              <button onClick={closeReview} className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="border-b border-slate-100 bg-white px-6 py-3 text-sm text-slate-600">
              Total score: <span className="font-semibold text-slate-800">{selectedResult.totalScore}/{selectedResult.totalQuestions}</span> (
              {Math.round((selectedResult.totalScore / selectedResult.totalQuestions) * 100)}%)
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto bg-white p-6">
              {selectedResult.answers.map((ans, idx) => (
                <div key={idx} className="rounded-xl border border-slate-100 p-5 transition-colors hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-bold text-slate-800">Q{idx + 1}: {ans.question}</h3>
                    {ans.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Your Answer</p>
                      <p className={`text-sm p-3 rounded-lg border ${ans.isCorrect ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
                        {ans.userAnswer || <span className="italic">No answer provided</span>}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Correct Answer</p>
                      <p className="text-sm p-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-800 font-medium">
                        {ans.correctAnswer}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-start space-x-2 text-xs text-slate-600 bg-slate-100 p-3 rounded-lg">
                    <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <p><span className="font-bold text-slate-700">Expert Explanation:</span> {ans.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <Button variant="primary" onClick={closeReview}>Close Review</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
