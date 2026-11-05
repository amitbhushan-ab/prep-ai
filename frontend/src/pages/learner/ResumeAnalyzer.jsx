import React, { useState } from 'react';
import api from '../../lib/api';
import { 
  FileText, 
  Sparkles, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Bot
} from 'lucide-react';
import toast from 'react-hot-toast';
import FloatingFrap from '../../components/FloatingFrap';

const ResumeAnalyzer = () => {
  const [targetRole, setTargetRole] = useState('Full Stack Software Engineer');
  const [resumeText, setResumeText] = useState(`Experienced Full-Stack Developer with 2+ years building web applications.
Proficient in React, JavaScript, Node.js, Express, and MongoDB.
Developed RESTful APIs and real-time WebSocket communication.
Optimized database queries and integrated responsive UI with Tailwind CSS.
Experienced with Git version control, CI/CD pipelines, and AWS deployment.`);
  
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      toast.error("Please paste your resume or DAF profile text.");
      return;
    }

    setAnalyzing(true);
    try {
      const res = await api.post('/api/prepai/resume/analyze', {
        text: resumeText,
        targetRole
      });
      setAnalysis(res.data);
      toast.success("Resume ATS diagnostic completed!");
    } catch {
      toast.error("Error analyzing profile");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-[#cdcdcd] py-8 px-4 sm:px-6 lg:px-8 rc-grid-pattern">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 mc-keycap text-[10px] text-[#57c1ff]">
            <FileText className="h-3 w-3" />
            <span>DIAGNOSTIC BENCHMARK</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-[#f4f4f6]">
            Resume & DAF Heuristic ATS Analyzer
          </h1>
          <p className="text-xs text-[#9c9c9d]">
            Evaluate keyword density, ATS screening compatibility, and auto-generate tailored interview questions.
          </p>
        </div>

        {/* Input Form & Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Input Text / Role */}
          <div className="lg:col-span-6 rounded-xl bg-[#0d0d0d] p-6 border border-[#242728] space-y-4">
            <div>
              <label className="text-xs text-[#9c9c9d] font-mono block mb-1">Target Examination or Job Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full rounded-md border border-[#242728] bg-[#101111] p-2.5 px-3.5 text-xs sm:text-sm text-[#f4f4f6] focus:border-[#57c1ff] focus:outline-none font-mono"
                placeholder="e.g. Full Stack SWE, UPSC Civil Services IAS"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-[#9c9c9d] font-mono">Resume / DAF Text</label>
                <span className="text-[10px] text-[#6a6b6c] font-mono">
                  {resumeText.trim().split(/\s+/).length} words
                </span>
              </div>
              <textarea
                rows={11}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full rounded-lg border border-[#242728] bg-[#101111] p-3 text-xs sm:text-sm text-[#f4f4f6] focus:border-[#57c1ff] focus:outline-none leading-relaxed font-mono"
                placeholder="Paste your sections..."
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="mc-btn mc-btn-primary w-full text-xs py-2.5 disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5 text-black" />
              <span>{analyzing ? 'Scanning Keywords...' : 'Run ATS Heuristic Diagnostic'}</span>
            </button>
          </div>

          {/* Right: Analysis Results */}
          <div className="lg:col-span-6">
            {analysis ? (
              <div className="rounded-xl bg-[#0d0d0d] p-6 border border-[#242728] space-y-5">
                
                {/* Score Header */}
                <div className="flex items-center justify-between border-b border-[#242728] pb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#f4f4f6]">ATS Match Score</h3>
                    <p className="text-xs text-[#6a6b6c] font-mono">{analysis.targetRole}</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold font-mono text-[#59d499]">{analysis.atsScore}</span>
                    <span className="text-xs font-mono text-[#6a6b6c]">/ 100</span>
                  </div>
                </div>

                {/* Skills Found */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-[#6a6b6c] mb-2">
                    Verified Keywords Detected
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.skillsIdentified?.map((s, idx) => (
                      <span key={idx} className="mc-keycap text-[11px] text-[#59d499] flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-[#ff6161] mb-2">
                    Missing Keywords to Incorporate
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missingKeywords?.map((s, idx) => (
                      <span key={idx} className="mc-keycap text-[11px] text-[#ff6161] flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-md bg-[#101111] p-3.5 text-xs text-[#cdcdcd] border border-[#242728] leading-relaxed">
                  <strong className="text-[#f4f4f6]">Executive Feedback: </strong>
                  {analysis.summaryFeedback}
                </div>

                {/* Tailored Questions from Resume */}
                <div>
                  <h4 className="text-xs font-mono text-[#57c1ff] mb-2 flex items-center gap-1">
                    <Bot className="h-3.5 w-3.5" /> Tailored Questions Likely to be Asked:
                  </h4>
                  <div className="space-y-2">
                    {analysis.tailoredInterviewQuestions?.map((q, idx) => (
                      <div key={idx} className="rounded-md bg-[#101111] p-3 border border-[#242728] text-xs text-[#f4f4f6]">
                        <span className="font-mono text-[#ffc533] mr-1">Q{idx + 1}:</span> {q}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center rounded-xl border border-dashed border-[#242728] p-8 text-center bg-[#0d0d0d] min-h-[300px]">
                <UploadCloud className="h-10 w-10 text-[#6a6b6c] mb-2" />
                <h3 className="font-semibold text-[#cdcdcd] text-xs">No Resume Telemetry Yet</h3>
                <p className="text-xs text-[#6a6b6c] max-w-sm mt-1">
                  Paste your profile on the left to evaluate keyword density against industry standards.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

      <FloatingFrap />
    </div>
  );
};

export default ResumeAnalyzer;
