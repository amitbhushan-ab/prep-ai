import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { API_BASE } from '../lib/api';
import { Video, VideoOff, Mic, MicOff, Send, PhoneOff, User, MessageSquare } from 'lucide-react';
import { AuthContext } from '../context/auth-context';
import Card from '../components/Card';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const VideoInterview = () => {
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Video States
  const [stream, setStream] = useState(null);
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);

  // Chat States
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState(null);
  const chatEndRef = useRef(null);

  // Initialize Media Stream
  useEffect(() => {
    let localStream = null;

    const startCamera = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setStream(localStream);
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        toast.error("Could not access camera/microphone");
      }
    };

    startCamera();

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // Initialize Socket.io and WebRTC
  useEffect(() => {
    const newSocket = io(API_BASE || undefined);
    setSocket(newSocket);

    // Create RTCPeerConnection
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    peerRef.current = peerConnection;

    // Handle Signaling
    newSocket.emit('join_room', roomId);

    newSocket.on('user_joined', async (data) => {
      toast(`${data.userId.substring(0, 5)} joined. Connecting...`, { icon: '👋' });
      // The person who is already there initiates the call
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      newSocket.emit('call-user', { offer, toRoom: roomId });
    });

    newSocket.on('call-made', async (data) => {
      if (peerConnection.signalingState !== "stable") return;
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      newSocket.emit('make-answer', { answer, toSocket: data.socket });
    });

    newSocket.on('answer-made', async (data) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      setIsConnected(true);
    });

    newSocket.on('ice-candidate', async (data) => {
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (e) {
        console.error("Error adding ice candidate", e);
      }
    });

    // Handle P2P Events
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        newSocket.emit('ice-candidate', { candidate: event.candidate, toRoom: roomId });
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setIsConnected(true);
      }
    };

    // Chat
    newSocket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Add tracks to connection
    if (stream) {
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });
    }

    return () => {
      newSocket.disconnect();
      peerConnection.close();
    };
  }, [roomId, stream]);

  // Scroll Chat to Bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setVideoOn(videoTrack.enabled);
    }
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !socket) return;

    const messageData = {
      roomId,
      message: inputValue,
      senderId: user.id || socket.id,
      senderName: user.name || 'User',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    socket.emit('send_message', messageData);
    setInputValue('');
  };

  const endSession = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    navigate('/dashboard');
    toast.success("Interview session ended");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-900 overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT: Video Section */}
        <div className="flex-[2] relative bg-black flex items-center justify-center p-4">
          <div className="w-full h-full max-w-4xl max-h-[80vh] bg-slate-800 rounded-2xl overflow-hidden shadow-2xl relative border border-slate-700">
            {videoOn ? (
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline 
                className="w-full h-full object-cover mirror"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                  <User size={48} />
                </div>
                <p className="text-xl font-medium">Camera is Off</p>
              </div>
            )}
            
            {/* Overlay Info */}
            <div className="absolute top-6 left-6 flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-600'}`}></div>
              <span className="text-white font-medium drop-shadow-md">
                {isConnected ? 'LIVE INTERVIEW' : 'WAITING FOR PEER...'}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <p className="text-white text-sm font-medium">{user?.name || 'You'} (Candidate)</p>
            </div>

            {/* Remote Peer Video Container */}
            <div className="absolute top-6 right-6 w-48 h-32 md:w-64 md:h-44 bg-slate-700/80 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl z-20 transition-all">
                {isConnected ? (
                  <video 
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center mb-1">
                          <User size={20} className="text-slate-400" />
                      </div>
                      <p className="text-[10px] text-slate-300">Peer Candidate</p>
                      <p className="text-[8px] text-slate-400 mt-1 animate-pulse italic">Connecting...</p>
                  </div>
                )}
                {isConnected && (
                  <div className="absolute bottom-2 left-2 bg-black/40 px-2 py-0.5 rounded text-[8px] text-white">
                    Live Partner
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* RIGHT: Chat Panel */}
        <div className="w-96 bg-white border-l border-slate-200 flex flex-col shadow-2xl">
          <div className="p-4 border-b border-slate-100 flex items-center space-x-2">
            <MessageSquare size={20} className="text-blue-600" />
            <h2 className="font-bold text-slate-800">Interview Chat</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center py-10">
                <p className="text-slate-400 text-sm">No messages yet. Say hello!</p>
              </div>
            )}
            {messages.map((msg, index) => {
              const isSelf = msg.senderId === (user?.id || socket?.id);
              return (
                <div key={index} className={`flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                    isSelf 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                  }`}>
                    {msg.message}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1 text-right">
                    {!isSelf && <span className="font-semibold mr-1">{msg.senderName} •</span>}
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 bg-slate-100 text-slate-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button 
              type="submit" 
              className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM: Controls Bar */}
      <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center space-x-6 px-8 shrink-0">
        <button 
          onClick={toggleMic}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            micOn ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {micOn ? <Mic size={22} /> : <MicOff size={22} />}
        </button>

        <button 
          onClick={toggleVideo}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            videoOn ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {videoOn ? <Video size={22} /> : <VideoOff size={22} />}
        </button>

        <div className="h-8 w-[1px] bg-slate-700 mx-2"></div>

        <button 
          onClick={endSession}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full flex items-center space-x-2 font-bold transition-transform active:scale-95 shadow-lg shadow-red-900/20"
        >
          <PhoneOff size={20} />
          <span>End Session</span>
        </button>
      </div>
    </div>
  );
};

export default VideoInterview;
