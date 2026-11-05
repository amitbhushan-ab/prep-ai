import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Common Components
import Navbar from './components/Navbar';
import { LearnerRoute, ContentRoute, AdminRoute } from './components/PortalProtectedRoute';

// Independent Portal Login Pages
import Login from './pages/Login';
import ContentLogin from './pages/content/ContentLogin';
import AdminLogin from './pages/admin/AdminLogin';

// Learner Portal Pages
import LearnerDashboard from './pages/learner/LearnerDashboard';
import ExamHub from './pages/learner/ExamHub';
import CbtMockTest from './pages/learner/CbtMockTest';
import AiTutor from './pages/learner/AiTutor';
import AiInterviewRoom from './pages/learner/AiInterviewRoom';
import CodingLab from './pages/learner/CodingLab';
import ResumeAnalyzer from './pages/learner/ResumeAnalyzer';
import StudyPlanner from './pages/learner/StudyPlanner';

// Content / Reviewer Portal Pages
import ContentQuestionBank from './pages/content/ContentQuestionBank';
import ContentExamCatalogue from './pages/content/ContentExamCatalogue';
import ContentTestBuilder from './pages/content/ContentTestBuilder';
import ContentReviewQueue from './pages/content/ContentReviewQueue';

// Admin Portal Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAiConfig from './pages/admin/AdminAiConfig';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';

// Legacy & Supportive Pages
import History from './pages/History';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Bookmarks from './pages/Bookmarks';
import VideoInterview from './pages/VideoInterview';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="relative flex min-h-screen flex-col bg-[var(--mc-canvas)] text-[var(--mc-ink)] antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '20px',
              border: '1px solid var(--mc-hairline)',
              background: 'var(--mc-surface)',
              color: 'var(--mc-ink)',
              fontSize: '13px',
              fontWeight: 500,
              boxShadow: 'var(--mc-shadow-lg)',
              padding: '12px 18px',
            },
          }}
        />

        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Independent Portal Dedicated Login Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/content/login" element={<ContentLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Learner Portal Routes */}
            <Route path="/" element={<LearnerRoute><LearnerDashboard /></LearnerRoute>} />
            <Route path="/dashboard" element={<LearnerRoute><LearnerDashboard /></LearnerRoute>} />
            <Route path="/exams" element={<LearnerRoute><ExamHub /></LearnerRoute>} />
            <Route path="/mock-tests" element={<LearnerRoute><CbtMockTest /></LearnerRoute>} />
            <Route path="/ai-tutor" element={<LearnerRoute><AiTutor /></LearnerRoute>} />
            <Route path="/ai-interview" element={<LearnerRoute><AiInterviewRoom /></LearnerRoute>} />
            <Route path="/coding-lab" element={<LearnerRoute><CodingLab /></LearnerRoute>} />
            <Route path="/resume-analyzer" element={<LearnerRoute><ResumeAnalyzer /></LearnerRoute>} />
            <Route path="/planner" element={<LearnerRoute><StudyPlanner /></LearnerRoute>} />

            {/* Protected Content Studio & Reviewer Portal Routes */}
            <Route path="/content" element={<ContentRoute><ContentQuestionBank /></ContentRoute>} />
            <Route path="/content/questions" element={<ContentRoute><ContentQuestionBank /></ContentRoute>} />
            <Route path="/content/exams" element={<ContentRoute><ContentExamCatalogue /></ContentRoute>} />
            <Route path="/content/test-builder" element={<ContentRoute><ContentTestBuilder /></ContentRoute>} />
            <Route path="/content/review" element={<ContentRoute><ContentReviewQueue /></ContentRoute>} />

            {/* Protected Administrative Console Portal Routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/admin/ai-config" element={<AdminRoute><AdminAiConfig /></AdminRoute>} />
            <Route path="/admin/audit" element={<AdminRoute><AdminAuditLogs /></AdminRoute>} />

            {/* Legacy Supportive Routes */}
            <Route path="/history" element={<LearnerRoute><History /></LearnerRoute>} />
            <Route path="/profile" element={<LearnerRoute><Profile /></LearnerRoute>} />
            <Route path="/leaderboard" element={<LearnerRoute><Leaderboard /></LearnerRoute>} />
            <Route path="/bookmarks" element={<LearnerRoute><Bookmarks /></LearnerRoute>} />
            <Route path="/video-practice/:roomId" element={<LearnerRoute><VideoInterview /></LearnerRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
