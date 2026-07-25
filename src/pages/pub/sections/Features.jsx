import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, MessageSquare, CalendarClock, ScreenShare, ShieldCheck, Users, CheckCircle, Sparkles, Mic, Monitor, Zap } from 'lucide-react'
import SectionHeading from '../../../components/common/SectionHeading'
import Reveal from '../../../components/common/Reveal'

const featureTabs = [
  {
    id: 'video',
    icon: Video,
    title: 'Instant HD Video Rooms',
    tag: '1080p WebRTC',
    desc: 'Launch a meeting in under 1 second. Ultra-crisp 1080p video with zero lag and adaptive stream management.',
    previewTitle: 'Ultra-Low Latency Video Engine',
    previewDesc: 'Peer-to-peer WebRTC media channel with 60FPS video rendering and automatic bandwidth balancing.',
    stats: [
      { label: 'Latency', val: '< 35ms' },
      { label: 'Resolution', val: '1080p HD' },
      { label: 'Frame Rate', val: '60 FPS' },
    ],
  },
  {
    id: 'share',
    icon: ScreenShare,
    title: '4K Screen Sharing',
    tag: 'Instant 60FPS',
    desc: 'Share your entire screen or a single app window at 60FPS. Includes crisp text rendering for code & presentations.',
    previewTitle: 'Crystal-Clear Display Broadcast',
    previewDesc: 'High frame-rate screen streaming optimized for code editors, Figma designs, and slides.',
    stats: [
      { label: 'Share Rate', val: '60 FPS' },
      { label: 'Encoding', val: 'VP9 / AV1' },
      { label: 'Audio Share', val: 'Stereo HD' },
    ],
  },
  {
    id: 'chat',
    icon: MessageSquare,
    title: 'Real-Time In-Call Chat',
    tag: 'Live Sync',
    desc: 'Send text, links, and emoji reactions without interrupting the speaker. Synced instantly across all room members.',
    previewTitle: 'Friction-Free Room Messaging',
    previewDesc: 'Side-panel chat drawer with instant emoji reactions floating dynamically over participant screens.',
    stats: [
      { label: 'Message Speed', val: '< 10ms' },
      { label: 'Encryption', val: 'AES-256' },
      { label: 'Reactions', val: 'Emoji Burst' },
    ],
  },
  {
    id: 'schedule',
    icon: CalendarClock,
    title: 'Smart Meeting Scheduling',
    tag: 'Automated',
    desc: 'Schedule meetings ahead of time, generate automatic passcode security, and manage your full meeting history.',
    previewTitle: 'Automated Calendar & History Engine',
    previewDesc: 'Manage upcoming meetings, copy 1-click invite links, and review complete participant logs.',
    stats: [
      { label: 'Passcode', val: 'Automatic' },
      { label: 'Invites', val: '1-Click' },
      { label: 'History Log', val: 'Persistent' },
    ],
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Host Control & Security',
    tag: 'Host Admin',
    desc: 'Mute participants, control room access with passcodes, and end meetings for all members with one click.',
    previewTitle: 'Total Host Security Suite',
    previewDesc: 'Full administrative control over audio mute, participant management, and room locks.',
    stats: [
      { label: 'TLS Level', val: 'v1.3 TLS' },
      { label: 'Host Lock', val: 'Enabled' },
      { label: 'Kick Participant', val: 'Supported' },
    ],
  },
]

export default function Features() {
  const [activeTabId, setActiveTabId] = useState('video')
  const currentTab = featureTabs.find((t) => t.id === activeTabId) || featureTabs[0]

  return (
    <section id="features" className="max-w-8xl mx-auto px-5 sm:px-14 py-24 sm:py-32 select-none">
      <Reveal>
        <SectionHeading
          eyebrow="Interactive Showcase"
          title="Designed differently. Built for speed."
          description="Click through MeetSphere's core features below to experience how our meeting engine powers your team."
        />
      </Reveal>

      {/* Dynamic Unique Split Feature Hub (No Grid Cards!) */}
      <div className="mt-16 grid lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Interactive Feature Selector List */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {featureTabs.map((tab) => {
            const isActive = tab.id === activeTabId
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`w-full text-left p-5 rounded-3xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                  isActive
                    ? 'bg-brand-500/10 border-brand-500 shadow-xl ring-2 ring-brand-500/20'
                    : 'bg-elevated/60 border-soft hover:bg-elevated hover:border-brand-500/30'
                }`}
              >
                <span className={`p-3 rounded-2xl shrink-0 transition-all ${
                  isActive ? 'bg-brand-500 text-ink-950 shadow-md font-bold' : 'bg-surface text-brand-500'
                }`}>
                  <Icon size={22} />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className={`text-base font-extrabold transition-colors ${
                      isActive ? 'text-brand-600 dark:text-brand-400' : 'text-theme-heading'
                    }`}>
                      {tab.title}
                    </p>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/20 shrink-0">
                      {tab.tag}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-theme-sub line-clamp-2">
                    {tab.desc}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Side: Interactive Feature Preview Showcase */}
        <div className="lg:col-span-7 rounded-3xl border border-brand-500/30 bg-elevated p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-6 flex-1 flex flex-col justify-between"
            >
              {/* Feature Header */}
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-400 text-xs font-extrabold mb-3 border border-brand-500/20">
                  <Sparkles size={14} />
                  <span>Feature Showcase</span>
                </span>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-theme-heading">
                  {currentTab.previewTitle}
                </h3>
                <p className="text-sm font-semibold text-theme-sub mt-2 leading-relaxed">
                  {currentTab.previewDesc}
                </p>
              </div>

              {/* Dynamic Mockup Stream Container */}
              <div className="rounded-2xl border border-soft bg-surface p-5 shadow-inner space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-soft">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-extrabold text-theme-heading">Live Engine Metric</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400">STATUS: OPTIMAL</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {currentTab.stats.map((s) => (
                    <div key={s.label} className="p-3 rounded-xl bg-elevated border border-soft text-center">
                      <p className="text-xs font-semibold text-theme-sub">{s.label}</p>
                      <p className="text-sm sm:text-base font-extrabold text-brand-600 dark:text-brand-400 mt-1">{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-soft text-xs font-bold text-theme-sub">
                <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
                  <CheckCircle size={16} />
                  <span>Integrated directly into every MeetSphere room</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}