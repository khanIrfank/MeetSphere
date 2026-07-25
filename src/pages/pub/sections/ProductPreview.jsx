import { motion } from 'framer-motion'
import { MessageSquare, Mic, ScreenShare, Users, Sparkles, Play } from 'lucide-react'
import Reveal from '../../../components/common/Reveal'
import SectionHeading from '../../../components/common/SectionHeading'
import { productShots, meetingFeatureVideo } from '../../../data/images'

const shots = [
  { img: productShots.callGrid, title: 'Multi-User Grid View', desc: 'Everyone in one clean, auto-balancing grid. No clutter.', icon: Users },
  { img: productShots.laptopCall, title: 'In-Call Realtime Chat', desc: 'Message the room and share links without interrupting the speaker.', icon: MessageSquare },
  { img: productShots.teamCall, title: '4K Screen Sharing', desc: 'One click to broadcast your screen or app at 60FPS.', icon: ScreenShare },
]

export default function ProductPreview() {
  return (
    <section className="max-w-8xl mx-auto px-5 sm:px-14 py-24 sm:py-32 select-none">
      <Reveal>
        <SectionHeading
          eyebrow="Inside MeetSphere"
          title="What it actually looks like to meet on MeetSphere"
          description="Designed to feel instant and natural. Here is a live peak into the room experience."
        />
      </Reveal>

      {/* Main Video & Shot Showcase */}
      <div className="mt-16 rounded-3xl border border-brand-500/30 bg-elevated p-4 sm:p-6 shadow-2xl overflow-hidden">
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black shadow-inner group mb-8 border border-white/10">
          <video
            ref={(el) => {
              if (el) {
                el.playbackRate = 1.5
              }
            }}
            src={meetingFeatureVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain bg-black"
          />

          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
            <p className="text-xs font-extrabold text-white">Full App Demo · 1.5x Speed</p>
          </div>
        </div>

        {/* 3 Interactive Feature Shots */}
        <div className="grid md:grid-cols-3 gap-6">
          {shots.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl border border-soft bg-surface overflow-hidden shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-ink-950 font-bold shadow-lg">
                  <s.icon size={17} />
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-extrabold text-base text-theme-heading mb-1">{s.title}</h3>
                <p className="text-xs font-semibold text-theme-sub">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}