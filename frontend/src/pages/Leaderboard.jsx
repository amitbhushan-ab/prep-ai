import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { 
  Trophy, 
  Sparkles, 
  MessageSquare, 
  Video, 
  UserPlus, 
  UserCheck, 
  Calendar, 
  Clock, 
  Check, 
  X, 
  Send, 
  ChevronRight, 
  Phone, 
  ShieldCheck, 
  Search, 
  Users, 
  ExternalLink,
  Flame,
  BookOpen,
  Award,
  VideoOff,
  Mic,
  Filter
} from 'lucide-react';
import { AuthContext } from '../context/auth-context';
import toast from 'react-hot-toast';
import FloatingFrap from '../components/FloatingFrap';

const INITIAL_PEERS = [
  {
    id: 'peer_aarav_1',
    name: 'Aarav Sharma',
    targetExam: 'JEE Advanced 2026',
    stream: 'engineering',
    score: 98,
    streak: 24,
    testsCompleted: 38,
    status: 'online',
    tag: 'AIR 14 Tier',
    bio: 'Top 50 ranker in All-India CBT Mocks. Strong in Rotational Dynamics & Coordination Chemistry.',
    availableFor: ['Mock Interview', 'Doubt Solving', 'Speed Drills']
  },
  {
    id: 'peer_priya_2',
    name: 'Priya Patel',
    targetExam: 'NEET UG Medical 2026',
    stream: 'medical',
    score: 96,
    streak: 19,
    testsCompleted: 32,
    status: 'online',
    tag: '690+ Scorer',
    bio: 'Consistently scoring 680+ in NEET Mock Papers. Happy to practice Plant Physiology & Bio Case Studies.',
    availableFor: ['Peer Mock Interview', 'Biology Flashcards', 'Revision']
  },
  {
    id: 'peer_stud111',
    name: 'Stud111',
    targetExam: 'Tier-1 SWE & Corporate',
    stream: 'tech',
    score: 94,
    streak: 14,
    testsCompleted: 26,
    status: 'online',
    tag: 'Full-Stack SWE',
    bio: 'Practicing distributed systems, concurrency, and algorithm rounds. Available for evening mock interviews!',
    availableFor: ['Coding Pair Session', 'System Design', 'Mock Interview']
  },
  {
    id: 'peer_vikram_3',
    name: 'Vikramaditya Roy',
    targetExam: 'UPSC CSE Prelims & Mains',
    stream: 'civil_services',
    score: 93,
    streak: 35,
    testsCompleted: 45,
    status: 'in_session',
    tag: 'GS Prelims Top 1%',
    bio: 'Focusing on Constitutional Law, Modern History, and Ethics case studies. Open for DAF interview practice.',
    availableFor: ['DAF Personality Mock', 'Answer Writing Review', 'Current Affairs']
  },
  {
    id: 'peer_sneha_4',
    name: 'Sneha Rao',
    targetExam: 'GATE Computer Science 2026',
    stream: 'engineering',
    score: 95,
    streak: 22,
    testsCompleted: 29,
    status: 'online',
    tag: 'GATE CS AIR 42 Tier',
    bio: 'OS, DBMS, and TOC enthusiast. Let’s do 30-min rapid recall and PYQ problem-solving sessions.',
    availableFor: ['Core CS Drills', 'Code Pairing', 'Mock Test Review']
  },
  {
    id: 'peer_rohan_5',
    name: 'Rohan Mehta',
    targetExam: 'CAT 2026 / IIMs',
    stream: 'management',
    score: 97,
    streak: 28,
    testsCompleted: 34,
    status: 'online',
    tag: '99.8%ile Quant',
    bio: 'Targeting top IIMs. Practicing DILR arrangement puzzles and WAT-PI mock interviews.',
    availableFor: ['DILR Pair Solving', 'PI Mock Interview', 'Quant Speed Drills']
  },
  {
    id: 'peer_ananya_6',
    name: 'Ananya Gupta',
    targetExam: 'IELTS Academic & GRE',
    stream: 'study_abroad',
    score: 92,
    streak: 16,
    testsCompleted: 21,
    status: 'online',
    tag: 'Band 8.5 Speaking',
    bio: 'IELTS Band 8.5 target. Let’s do 1-on-1 Part 2 Cue Card speech practice and discursive arguments.',
    availableFor: ['Speaking Partner', 'GRE Argument Drills', 'University Review']
  }
];

const Leaderboard = () => {
  const [peers, setPeers] = useState(INITIAL_PEERS);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'friends', 'meetings'
  const [selectedStream, setSelectedStream] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Friend connections state (persisted)
  const [connections, setConnections] = useState(() => {
    try {
      const saved = localStorage.getItem('prepai_peer_connections');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Scheduled meetings state (persisted)
  const [scheduledMeetings, setScheduledMeetings] = useState(() => {
    try {
      const saved = localStorage.getItem('prepai_peer_meetings');
      return saved ? JSON.parse(saved) : [
        {
          id: 'meet_demo_1',
          peerId: 'peer_aarav_1',
          peerName: 'Aarav Sharma',
          date: 'Tomorrow, Nov 06',
          time: '06:00 PM - 06:45 PM',
          agenda: 'Rotational Dynamics & Torque PYQ Drill',
          roomId: 'peer-aarav-study-room',
          status: 'confirmed'
        }
      ];
    } catch {
      return [];
    }
  });

  // Modals state
  const [chatPeer, setChatPeer] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [currentMessageInput, setCurrentMessageInput] = useState('');

  const [schedulePeer, setSchedulePeer] = useState(null);
  const [meetingDate, setMeetingDate] = useState('Tomorrow, Nov 06');
  const [meetingTime, setMeetingTime] = useState('06:00 PM - 06:45 PM');
  const [meetingAgenda, setMeetingAgenda] = useState('Peer Mock Interview & Strategy Review');
  const [meetingNotes, setMeetingNotes] = useState('');

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('prepai_peer_connections', JSON.stringify(connections));
  }, [connections]);

  useEffect(() => {
    localStorage.setItem('prepai_peer_meetings', JSON.stringify(scheduledMeetings));
  }, [scheduledMeetings]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/api/results/leaderboard');
        if (res.data && res.data.length > 0) {
          // Merge API data with rich interactive profiles
          const apiUsers = res.data.map((u, idx) => ({
            id: u.id || `api_user_${idx}`,
            name: u.name,
            score: u.score || 90,
            targetExam: 'Top Performer',
            stream: 'tech',
            streak: 10 + (idx * 2),
            testsCompleted: 15 + idx,
            status: 'online',
            tag: `Rank #${idx + 1}`,
            bio: 'Active practitioner on PrepAI. Open for peer mock interviews and concept discussions.',
            availableFor: ['Mock Interview', 'Doubt Discussion']
          }));

          // Avoid duplicates by name
          const existingNames = new Set(apiUsers.map(u => u.name.toLowerCase()));
          const extraDefaults = INITIAL_PEERS.filter(p => !existingNames.has(p.name.toLowerCase()));
          setPeers([...apiUsers, ...extraDefaults]);
        }
      } catch {
        // Fallback to initial peer list
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  // Friend Request Handler
  const handleToggleFriend = (peer) => {
    const currentStatus = connections[peer.id];
    if (!currentStatus) {
      setConnections(prev => ({ ...prev, [peer.id]: 'requested' }));
      toast.success(`Friend request sent to ${peer.name}!`, { icon: '🤝' });
      // Simulate acceptance after 2.5s for realistic feel
      setTimeout(() => {
        setConnections(prev => ({ ...prev, [peer.id]: 'connected' }));
        toast.success(`${peer.name} accepted your connection request!`, { icon: '🎉' });
      }, 2500);
    } else if (currentStatus === 'requested') {
      toast("Request already pending", { icon: '⏳' });
    } else {
      toast.success(`You and ${peer.name} are study partners!`, { icon: '👥' });
    }
  };

  // Direct Video Call Launcher
  const handleStartVideoCall = (peer) => {
    const currentUserId = user?.id || user?._id || 'guest';
    const sortedIds = [String(currentUserId), String(peer.id)].sort();
    const roomId = `practice-${sortedIds[0]}-${sortedIds[1]}`;
    toast.success(`Launching 1-on-1 Video Call with ${peer.name}...`, { icon: '📹' });
    navigate(`/video-practice/${roomId}`);
  };

  // Direct Chat Drawer Handlers
  const handleOpenChat = (peer) => {
    setChatPeer(peer);
    if (!chatMessages[peer.id]) {
      setChatMessages(prev => ({
        ...prev,
        [peer.id]: [
          { sender: 'peer', text: `Hi! I'm ${peer.name}. I saw your focus on ${peer.targetExam}. Would you like to practice a mock round or schedule a study sync?`, time: '10:00 AM' }
        ]
      }));
    }
  };

  const handleSendMessage = () => {
    if (!currentMessageInput.trim() || !chatPeer) return;
    const newMsg = { sender: 'me', text: currentMessageInput.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    
    setChatMessages(prev => ({
      ...prev,
      [chatPeer.id]: [...(prev[chatPeer.id] || []), newMsg]
    }));

    const sentText = currentMessageInput;
    setCurrentMessageInput('');

    // Simulated peer reply after 1s
    setTimeout(() => {
      const peerReplies = [
        `Sounds great! I'm reviewing my error log right now. Let's do a 20-minute video session.`,
        `Got it! Let me know what time works best for you, or book a slot using the Meeting button above.`,
        `That's a tricky concept! I tackled that in yesterday's mock test. Let's practice questions on it.`
      ];
      const randomReply = peerReplies[Math.floor(Math.random() * peerReplies.length)];
      setChatMessages(prev => ({
        ...prev,
        [chatPeer.id]: [...(prev[chatPeer.id] || []), { sender: 'peer', text: randomReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
      }));
    }, 1200);
  };

  // Schedule Meeting Handler
  const handleConfirmMeeting = (e) => {
    e.preventDefault();
    if (!schedulePeer) return;

    const newMeeting = {
      id: `meet_${Date.now()}`,
      peerId: schedulePeer.id,
      peerName: schedulePeer.name,
      date: meetingDate,
      time: meetingTime,
      agenda: meetingAgenda,
      notes: meetingNotes,
      roomId: `meeting-${schedulePeer.id}-${Date.now().toString().slice(-4)}`,
      status: 'confirmed'
    };

    setScheduledMeetings(prev => [newMeeting, ...prev]);
    setSchedulePeer(null);
    setMeetingNotes('');
    toast.success(`1-on-1 Session with ${schedulePeer.name} scheduled for ${meetingDate} at ${meetingTime}!`, { icon: '📅', duration: 4000 });
  };

  // Filtered Peers
  const filteredPeers = peers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.targetExam.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStream = selectedStream === 'all' || p.stream === selectedStream;

    if (activeTab === 'friends') {
      return matchesSearch && matchesStream && connections[p.id] === 'connected';
    }

    return matchesSearch && matchesStream;
  });

  return (
    <div className="min-h-screen bg-[#07080a] text-[#cdcdcd] py-8 px-4 sm:px-6 lg:px-8 rc-grid-pattern">
      <div className="mx-auto max-w-6xl space-y-6">
        
        {/* Sleek Dark Header Banner (High Contrast) */}
        <div className="rounded-2xl border border-[#242728] bg-[#0d0d0d] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-[#ffc533]/5 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mc-keycap text-[10px] text-[#ffc533] mb-2 font-mono">
                <Trophy className="h-3 w-3" />
                <span>ELITE PERFORMERS & PEER COLLABORATION NETWORK</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Peer Study Network & Top Rankers
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-white/50 max-w-2xl leading-relaxed">
                Connect directly with verified high-scorers across engineering, medical, civil services, and tech. Chat in real-time, initiate 1-on-1 video practice sessions, and schedule personalized study meetings.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="rounded-xl bg-[#101111] border border-[#242728] p-3 text-center min-w-[100px]">
                <div className="text-xl font-bold font-mono text-[#59d499]">98%</div>
                <div className="text-[10px] font-mono uppercase text-white/40 mt-0.5">Top Accuracy</div>
              </div>
              <div className="rounded-xl bg-[#101111] border border-[#242728] p-3 text-center min-w-[100px]">
                <div className="text-xl font-bold font-mono text-[#57c1ff]">{Object.values(connections).filter(s => s === 'connected').length}</div>
                <div className="text-[10px] font-mono uppercase text-white/40 mt-0.5">Study Partners</div>
              </div>
              <div className="rounded-xl bg-[#101111] border border-[#242728] p-3 text-center min-w-[100px]">
                <div className="text-xl font-bold font-mono text-[#ffc533]">{scheduledMeetings.length}</div>
                <div className="text-[10px] font-mono uppercase text-white/40 mt-0.5">Scheduled Meets</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs & Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#242728] pb-4">
          {/* Main View Tabs */}
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Top Rankers', icon: Trophy, count: peers.length },
              { id: 'friends', label: 'My Study Partners', icon: Users, count: Object.values(connections).filter(s => s === 'connected').length },
              { id: 'meetings', label: 'Scheduled Meetings', icon: Calendar, count: scheduledMeetings.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-[#18191a] border border-[#57c1ff] text-[#57c1ff] shadow-sm'
                    : 'bg-[#101111] border border-[#242728] text-white/60 hover:text-white'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#07080a] text-white/50 border border-[#242728]">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Search by name, exam or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[#242728] bg-[#101111] pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/30 focus:border-[#57c1ff] focus:outline-none"
            />
          </div>
        </div>

        {/* Stream Filter Pills (Visible when in performer lists) */}
        {activeTab !== 'meetings' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] uppercase font-mono text-white/40 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Filter Stream:
            </span>
            {[
              { id: 'all', label: 'All Streams' },
              { id: 'engineering', label: 'JEE / GATE Engineering' },
              { id: 'medical', label: 'NEET UG Medical' },
              { id: 'civil_services', label: 'UPSC Civil Services' },
              { id: 'tech', label: 'Tech & SWE FAANG' },
              { id: 'management', label: 'CAT / IIM MBA' },
              { id: 'study_abroad', label: 'Study Abroad / IELTS' }
            ].map(stream => (
              <button
                key={stream.id}
                onClick={() => setSelectedStream(stream.id)}
                className={`rounded-md px-2.5 py-1 text-[11px] whitespace-nowrap transition border ${
                  selectedStream === stream.id
                    ? 'bg-[#18191a] border-[#57c1ff] text-[#57c1ff] font-medium'
                    : 'bg-[#101111] border-[#242728] text-white/50 hover:text-white'
                }`}
              >
                {stream.label}
              </button>
            ))}
          </div>
        )}

        {/* VIEW 1: Scheduled Meetings View */}
        {activeTab === 'meetings' && (
          <div className="rounded-xl bg-[#0d0d0d] p-6 border border-[#242728] space-y-4">
            <div className="flex items-center justify-between border-b border-[#242728] pb-3">
              <div>
                <h3 className="text-sm font-semibold text-white">Your Scheduled 1-on-1 Sessions</h3>
                <p className="text-xs text-white/50">Personal video mock interviews & study sessions booked with peers</p>
              </div>
              <span className="mc-keycap text-[10px] text-[#59d499]">
                {scheduledMeetings.length} Confirmed
              </span>
            </div>

            {scheduledMeetings.length === 0 ? (
              <div className="py-12 text-center text-xs text-white/40 space-y-2">
                <Calendar className="h-8 w-8 mx-auto text-white/20 mb-2" />
                <p>No upcoming 1-on-1 meetings scheduled yet.</p>
                <p className="text-[11px] text-white/30">Click "Schedule Meeting" on any top ranker's card to book a personal practice slot.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scheduledMeetings.map(m => (
                  <div key={m.id} className="rounded-xl bg-[#101111] p-5 border border-[#242728] space-y-3 relative hover:border-[#57c1ff]/40 transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="mc-keycap text-[10px] text-[#ffc533] uppercase">
                          CONFIRMED SESSION
                        </span>
                        <h4 className="mt-1 text-sm font-semibold text-white">{m.peerName}</h4>
                        <div className="text-xs text-[#57c1ff] font-medium mt-0.5">{m.agenda}</div>
                      </div>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#59d499] animate-pulse" title="Ready to connect" />
                    </div>

                    <div className="rounded-lg bg-[#07080a] p-3 text-xs text-white/70 space-y-1 font-mono border border-[#242728]">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-[#ffc533]" />
                        <span>{m.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-[#57c1ff]" />
                        <span>{m.time}</span>
                      </div>
                      {m.notes && <div className="text-[11px] text-white/40 pt-1">Note: "{m.notes}"</div>}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => navigate(`/video-practice/${m.roomId}`)}
                        className="mc-btn mc-btn-primary text-xs py-1.5 px-3 bg-[#59d499] text-black font-semibold hover:bg-[#48c388] flex items-center gap-1.5"
                      >
                        <Video className="h-3.5 w-3.5" />
                        <span>Join 1-on-1 Video Room</span>
                      </button>

                      <button
                        onClick={() => {
                          setScheduledMeetings(prev => prev.filter(item => item.id !== m.id));
                          toast.success("Meeting cancelled");
                        }}
                        className="text-[11px] text-rose-400 hover:underline"
                      >
                        Cancel Slot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: Top Rankers & Study Peers Cards */}
        {activeTab !== 'meetings' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 8 Cols: Performer Cards List */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center justify-between text-xs text-white/50 px-1 font-mono">
                <span>Displaying {filteredPeers.length} practitioners</span>
                <span>Real-time practice availability active</span>
              </div>

              {filteredPeers.length === 0 ? (
                <div className="rounded-xl bg-[#0d0d0d] p-12 text-center text-xs text-white/40 border border-[#242728]">
                  No practitioners found matching your filter criteria.
                </div>
              ) : (
                filteredPeers.map((peer, idx) => {
                  const isFriend = connections[peer.id] === 'connected';
                  const isRequested = connections[peer.id] === 'requested';

                  return (
                    <div 
                      key={peer.id}
                      className="rounded-xl bg-[#0d0d0d] p-5 border border-[#242728] hover:border-[rgba(255,255,255,0.2)] transition space-y-4 shadow-sm"
                    >
                      {/* Top Bar: Rank, Avatar, Name, Accuracy */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          {/* Rank Badge */}
                          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono font-bold text-xs ${
                            idx === 0 ? 'bg-[#ffc533] text-black ring-2 ring-[#ffc533]/40' :
                            idx === 1 ? 'bg-slate-300 text-black ring-2 ring-slate-300/40' :
                            idx === 2 ? 'bg-[#d97706] text-white ring-2 ring-[#d97706]/40' :
                            'bg-[#18191a] text-white/70 border border-[#242728]'
                          }`}>
                            #{idx + 1}
                          </div>

                          {/* Avatar & Info */}
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white text-sm">{peer.name}</h3>
                              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-[#18191a] text-[#57c1ff] border border-[#242728]">
                                {peer.tag}
                              </span>
                              <span className="h-2 w-2 rounded-full bg-[#59d499]" title="Online now" />
                            </div>
                            <p className="text-xs text-white/50 font-mono mt-0.5">
                              {peer.targetExam}
                            </p>
                          </div>
                        </div>

                        {/* Accuracy & Stats */}
                        <div className="flex items-center gap-4 text-right">
                          <div className="rounded-lg bg-[#101111] px-3 py-1.5 border border-[#242728]">
                            <div className="text-base font-bold font-mono text-[#59d499]">{peer.score}%</div>
                            <div className="text-[9px] font-mono uppercase text-white/40">Accuracy</div>
                          </div>
                          <div className="rounded-lg bg-[#101111] px-3 py-1.5 border border-[#242728] hidden sm:block">
                            <div className="text-base font-bold font-mono text-[#ffc533] flex items-center justify-center gap-1">
                              <Flame className="h-3.5 w-3.5 fill-current" /> {peer.streak}d
                            </div>
                            <div className="text-[9px] font-mono uppercase text-white/40">Streak</div>
                          </div>
                        </div>
                      </div>

                      {/* Bio & Available For Badges */}
                      <div className="rounded-lg bg-[#101111] p-3 border border-[#242728]/70 text-xs text-white/70 leading-relaxed">
                        <p>{peer.bio}</p>
                        {peer.availableFor && (
                          <div className="mt-2 flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#242728]">
                            <span className="text-[10px] font-mono text-white/40">Available For:</span>
                            {peer.availableFor.map((item, i) => (
                              <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#07080a] text-[#57c1ff] border border-[#242728]">
                                {item}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons Toolbar: Connect / Chat / Video Call / Schedule */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#242728]/60">
                        {/* Friend Request Button */}
                        <button
                          onClick={() => handleToggleFriend(peer)}
                          className={`mc-btn text-xs py-1.5 px-3 flex items-center gap-1.5 transition ${
                            isFriend 
                              ? 'bg-[#18191a] border border-[#59d499] text-[#59d499]'
                              : isRequested
                              ? 'bg-[#18191a] border border-[#ffc533] text-[#ffc533]'
                              : 'mc-btn-outline text-white/80 hover:text-white'
                          }`}
                        >
                          {isFriend ? (
                            <>
                              <UserCheck className="h-3.5 w-3.5" />
                              <span>Friends ✓</span>
                            </>
                          ) : isRequested ? (
                            <>
                              <Clock className="h-3.5 w-3.5 animate-spin" />
                              <span>Request Sent ⏳</span>
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-3.5 w-3.5" />
                              <span>Add Friend</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-2">
                          {/* Direct Chat Button */}
                          <button
                            onClick={() => handleOpenChat(peer)}
                            className="mc-btn mc-btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
                          >
                            <MessageSquare className="h-3.5 w-3.5 text-[#57c1ff]" />
                            <span>Chat</span>
                          </button>

                          {/* 1-on-1 Video Call Button */}
                          <button
                            onClick={() => handleStartVideoCall(peer)}
                            className="mc-btn mc-btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5 border-[#59d499]/50 text-[#59d499] hover:bg-[#59d499]/10"
                          >
                            <Video className="h-3.5 w-3.5" />
                            <span>Video Call</span>
                          </button>

                          {/* Schedule 1-on-1 Meeting Button */}
                          <button
                            onClick={() => setSchedulePeer(peer)}
                            className="mc-btn mc-btn-primary text-xs py-1.5 px-3.5 flex items-center gap-1.5 bg-[#57c1ff] text-black font-semibold hover:bg-[#43b0ec]"
                          >
                            <Calendar className="h-3.5 w-3.5 fill-current" />
                            <span>Schedule Meeting</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            {/* Right 4 Cols: Quick Guide & Pro Tips */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-xl bg-[#0d0d0d] p-5 border border-[#242728] space-y-3">
                <div className="flex items-center gap-2 text-white font-semibold text-xs">
                  <Sparkles className="h-4 w-4 text-[#ffc533]" />
                  <span>How to Rank & Connect?</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                  Rankings dynamically reflect accuracy across CBT mock tests and live interview simulations.
                </p>
                <ul className="space-y-2 text-xs text-white/70">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#59d499]" />
                    <span>Complete 10-question mock tests to build accuracy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#57c1ff]" />
                    <span>Invite top scorers for 1-on-1 peer mock video rounds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ffc533]" />
                    <span>Schedule personal study meetings to stay accountable</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-[#0d0d0d] p-5 border border-[#242728] space-y-3">
                <div className="flex items-center gap-2 text-white font-semibold text-xs">
                  <Video className="h-4 w-4 text-[#59d499]" />
                  <span>Live Video Practice Rooms</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                  Clicking "Video Call" connects you directly with camera, microphone, and real-time screen sharing.
                </p>
                <div className="rounded-lg bg-[#101111] p-3 text-[11px] text-white/60 border border-[#242728]">
                  💡 <strong className="text-white">Pro Tip:</strong> Send a friendly greeting via Chat first before jumping on a Video Call!
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* MODAL 1: Personal Meeting Scheduler Modal */}
      {schedulePeer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0d0d0d] border border-[#242728] p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-[#242728] pb-4">
              <div>
                <span className="mc-keycap text-[10px] text-[#57c1ff]">SCHEDULE 1-ON-1 SESSION</span>
                <h3 className="mt-1 text-lg font-semibold text-white">Book Practice Slot with {schedulePeer.name}</h3>
                <p className="text-xs text-white/50">{schedulePeer.targetExam} • {schedulePeer.score}% Avg Accuracy</p>
              </div>
              <button 
                onClick={() => setSchedulePeer(null)}
                className="text-white/40 hover:text-white p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmMeeting} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-white/60 block mb-1.5">Select Date</label>
                <select
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs text-white focus:border-[#57c1ff] focus:outline-none"
                >
                  <option value="Today (Evening Slot)">Today (Evening Slot)</option>
                  <option value="Tomorrow, Nov 06">Tomorrow, Nov 06</option>
                  <option value="Friday, Nov 07">Friday, Nov 07</option>
                  <option value="Saturday Weekend Mock, Nov 08">Saturday Weekend Mock, Nov 08</option>
                  <option value="Sunday Grand Review, Nov 09">Sunday Grand Review, Nov 09</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-white/60 block mb-1.5">Select Time Slot (45 Mins)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '10:00 AM - 10:45 AM',
                    '02:00 PM - 02:45 PM',
                    '04:30 PM - 05:15 PM',
                    '06:00 PM - 06:45 PM',
                    '08:00 PM - 08:45 PM',
                    '09:30 PM - 10:15 PM'
                  ].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setMeetingTime(time)}
                      className={`rounded-lg p-2 text-xs border text-center transition ${
                        meetingTime === time
                          ? 'bg-[#18191a] border-[#57c1ff] text-[#57c1ff] font-semibold'
                          : 'bg-[#101111] border-[#242728] text-white/60 hover:text-white'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-white/60 block mb-1.5">Meeting Agenda & Goal</label>
                <select
                  value={meetingAgenda}
                  onChange={(e) => setMeetingAgenda(e.target.value)}
                  className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs text-white focus:border-[#57c1ff] focus:outline-none"
                >
                  <option value="Peer Mock Interview & Strategy Review">Peer Mock Interview (Technical & Behavioral)</option>
                  <option value="Concept Doubt Clearing & Problem Solving">Concept Doubt Clearing & High-Yield Questions</option>
                  <option value="Live Code Pairing & Algorithm Speed Run">Live Code Pairing & Algorithm Speed Run</option>
                  <option value="Mock Test Error Analysis & Weak Spot Review">Mock Test Error Analysis & Weak Spot Review</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-white/60 block mb-1.5">Personal Note / Topic Details (Optional)</label>
                <textarea
                  rows={2}
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  placeholder="e.g. Let's practice 5 questions on Electromagnetism or Concurrency..."
                  className="w-full rounded-lg border border-[#242728] bg-[#101111] p-2.5 text-xs text-white placeholder-white/30 focus:border-[#57c1ff] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#242728]">
                <button
                  type="button"
                  onClick={() => setSchedulePeer(null)}
                  className="mc-btn mc-btn-outline text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mc-btn mc-btn-primary text-xs py-2 px-5 bg-[#57c1ff] text-black font-semibold hover:bg-[#43b0ec]"
                >
                  Confirm & Lock Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: 1-on-1 Direct Chat Drawer */}
      {chatPeer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs">
          <div className="h-full w-full max-w-md bg-[#0d0d0d] border-l border-[#242728] flex flex-col justify-between shadow-2xl">
            {/* Chat Top Header */}
            <div className="p-4 border-b border-[#242728] flex items-center justify-between bg-[#101111]">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#18191a] border border-[#242728] flex items-center justify-center font-bold text-xs text-[#57c1ff]">
                  {chatPeer.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
                    {chatPeer.name}
                    <span className="h-2 w-2 rounded-full bg-[#59d499]" />
                  </h4>
                  <span className="text-[10px] text-white/40 font-mono">{chatPeer.targetExam}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleStartVideoCall(chatPeer)}
                  title="Launch Instant Video Call"
                  className="rounded-md border border-[#242728] p-1.5 text-[#59d499] hover:bg-[#59d499]/10 transition"
                >
                  <Video className="h-4 w-4" />
                </button>
                <button
                  onClick={() => { const p = chatPeer; setChatPeer(null); setSchedulePeer(p); }}
                  title="Schedule Personal Meeting"
                  className="rounded-md border border-[#242728] p-1.5 text-[#57c1ff] hover:bg-[#57c1ff]/10 transition"
                >
                  <Calendar className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChatPeer(null)}
                  className="rounded-md border border-[#242728] p-1.5 text-white/50 hover:text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(chatMessages[chatPeer.id] || []).map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'me'
                      ? 'bg-[#57c1ff] text-black font-medium rounded-tr-none'
                      : 'bg-[#18191a] text-white border border-[#242728] rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-white/30 font-mono mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Conversation Starters */}
            <div className="p-2 border-t border-[#242728] bg-[#07080a] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {[
                "Let's practice a 15-min mock interview!",
                "Are you free for a video call?",
                "Can you review question #3 from today's test?"
              ].map((starter, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentMessageInput(starter); }}
                  className="rounded-full bg-[#101111] px-2.5 py-1 text-[10px] text-white/60 whitespace-nowrap border border-[#242728] hover:text-white"
                >
                  {starter}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 border-t border-[#242728] bg-[#101111] flex items-center gap-2">
              <input
                type="text"
                placeholder={`Message ${chatPeer.name}...`}
                value={currentMessageInput}
                onChange={(e) => setCurrentMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 rounded-lg border border-[#242728] bg-[#07080a] px-3 py-2 text-xs text-white placeholder-white/30 focus:border-[#57c1ff] focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessageInput.trim()}
                className="rounded-lg bg-[#57c1ff] p-2 text-black disabled:opacity-40 hover:bg-[#43b0ec] transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      <FloatingFrap />
    </div>
  );
};

export default Leaderboard;
