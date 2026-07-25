import { useState, useEffect, useRef } from 'react'
import { X, Mic, MicOff, Video, VideoOff, Image as ImageIcon, ChevronDown, Info, Loader2 } from 'lucide-react'

export default function NewMeetingPreviewModal({ open, onClose, onStart, userName = 'Irfan Khan' }) {
  const [loading, setLoading] = useState(true)
  const [audioMuted, setAudioMuted] = useState(false)
  const [videoOff, setVideoOff] = useState(false)
  const [alwaysShow, setAlwaysShow] = useState(true)
  const [selectedMic, setSelectedMic] = useState('default-mic')
  const [selectedCam, setSelectedCam] = useState('default-cam')
  const [stream, setStream] = useState(null)
  const videoRef = useRef(null)

  // Initialize camera preview stream
  useEffect(() => {
    let activeStream = null
    if (open) {
      setLoading(true)
      if (!videoOff && navigator.mediaDevices?.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((s) => {
            activeStream = s
            setStream(s)
            setLoading(false)
          })
          .catch(() => {
            setStream(null)
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
        setStream(null)
      }
      setLoading(false)
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [open, videoOff])

  // Attach stream to video element safely ONCE without re-triggering blinking
  useEffect(() => {
    if (videoRef.current && stream) {
      if (videoRef.current.srcObject !== stream) {
        videoRef.current.srcObject = stream
        videoRef.current.play().catch(() => {})
      }
    }
  }, [stream, videoOff])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-up">
      <div className="w-full max-w-2xl bg-[#1a1a20] text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col select-none">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#141418]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500 text-ink-950 font-bold text-[10px]">
              MS
            </span>
            <h3 className="text-sm font-medium text-slate-200">
              {userName}&apos;s MeetSphere Meeting
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-5">
          {/* Video Box */}
          <div className="relative aspect-video rounded-xl bg-slate-950 border border-white/10 overflow-hidden flex items-center justify-center group shadow-inner">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <Loader2 size={36} className="text-brand-400 animate-spin" />
                <p className="text-sm text-slate-300 font-medium">Starting video preview...</p>
              </div>
            ) : !videoOff && stream ? (
              <video
                ref={(el) => {
                  videoRef.current = el
                  if (el && stream && el.srcObject !== stream) {
                    el.srcObject = stream
                    el.play().catch(() => {})
                  }
                }}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover -scale-x-100"
              />
            ) : (
              <div className="relative w-full h-full bg-gradient-to-tr from-slate-950 via-[#0d221b] to-[#123829] flex flex-col items-center justify-center text-center p-4">
                <div className="w-20 h-20 rounded-full bg-brand-500/20 border border-brand-400/40 flex items-center justify-center font-bold text-2xl text-brand-300 shadow-lg mb-2 z-10">
                  {userName.split(' ').map((n) => n[0]).join('')}
                </div>
                <span className="text-xs text-slate-400 z-10 font-medium">
                  {videoOff ? 'Camera is turned off' : 'Preview mode'}
                </span>
              </div>
            )}

            {/* Quick overlay controls */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 z-20">
              <button
                onClick={() => setAudioMuted(!audioMuted)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors text-xs font-medium cursor-pointer ${
                  audioMuted ? 'text-rose-400 hover:bg-rose-500/20' : 'text-slate-200 hover:bg-white/15'
                }`}
              >
                {audioMuted ? <MicOff size={16} /> : <Mic size={16} />}
                <span>Audio</span>
              </button>
              <button
                onClick={() => setVideoOff(!videoOff)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors text-xs font-medium cursor-pointer ${
                  videoOff ? 'text-rose-400 hover:bg-rose-500/20' : 'text-slate-200 hover:bg-white/15'
                }`}
              >
                {videoOff ? <VideoOff size={16} /> : <Video size={16} />}
                <span>Video</span>
              </button>
              <button className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-slate-300 hover:bg-white/15 transition-colors text-xs font-medium">
                <ImageIcon size={16} />
                <span>Backgrounds</span>
              </button>
            </div>
          </div>

          {/* Dropdown selectors row (Fix: Fully interactive select dropdowns with single chevron arrow) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Microphone Selector */}
            <div className="relative flex items-center bg-[#26262d] border border-white/15 rounded-xl px-3 py-2 text-xs">
              <Mic size={16} className="text-slate-400 shrink-0 mr-2 pointer-events-none" />
              <select
                value={selectedMic}
                onChange={(e) => setSelectedMic(e.target.value)}
                className="bg-transparent text-slate-200 outline-none w-full cursor-pointer appearance-none pr-6 z-10 font-medium"
              >
                <option value="default-mic" className="bg-[#26262d] text-white">
                  Built-in Microphone and Speakers
                </option>
                <option value="headset-mic" className="bg-[#26262d] text-white">
                  External Headset (Bluetooth)
                </option>
              </select>
              <ChevronDown size={14} className="text-slate-400 pointer-events-none absolute right-3 z-0" />
            </div>

            {/* Camera Selector */}
            <div className="relative flex items-center bg-[#26262d] border border-white/15 rounded-xl px-3 py-2 text-xs">
              <Video size={16} className="text-slate-400 shrink-0 mr-2 pointer-events-none" />
              <select
                value={selectedCam}
                onChange={(e) => setSelectedCam(e.target.value)}
                className="bg-transparent text-slate-200 outline-none w-full cursor-pointer appearance-none pr-6 z-10 font-medium"
              >
                <option value="default-cam" className="bg-[#26262d] text-white">
                  USB2.0 FHD UVC WebCam
                </option>
                <option value="obs-cam" className="bg-[#26262d] text-white">
                  Integrated HD Camera
                </option>
              </select>
              <ChevronDown size={14} className="text-slate-400 pointer-events-none absolute right-3 z-0" />
            </div>
          </div>

          {/* Footer options & Start button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/10">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={alwaysShow}
                onChange={(e) => setAlwaysShow(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-brand-500 focus:ring-brand-400 h-4 w-4"
              />
              <span>Always show this preview when joining</span>
              <Info size={14} className="text-slate-500 hover:text-slate-300 transition-colors" />
            </label>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => onStart({ audioMuted, videoOff, mic: selectedMic, cam: selectedCam })}
                className="px-6 py-2 bg-brand-500 hover:bg-brand-400 text-ink-950 text-xs font-bold rounded-xl shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
