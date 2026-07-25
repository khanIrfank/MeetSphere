import { motion } from 'framer-motion'
import { Star, Quote, CheckCircle2 } from 'lucide-react'
import SectionHeading from '../../../components/common/SectionHeading'
import Reveal from '../../../components/common/Reveal'
import { testimonialPhotos } from '../../../data/images'

const testimonialsList = [
  {
    name: 'Aisha Khan',
    role: 'Head of Engineering at TechScale',
    avatar: testimonialPhotos.user1,
    content: 'MeetSphere completely replaced our old clunky meeting apps. Zero setup time, 1080p video, and instant screen sharing. Essential for our remote engineering team.',
    rating: 5,
  },
  {
    name: 'Rohit Verma',
    role: 'Product Lead at DesignCraft',
    avatar: testimonialPhotos.user2,
    content: 'The speed of MeetSphere is mind-blowing. We schedule daily standups and jump into instant meeting rooms without any delay. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Meera Iyer',
    role: 'Operations Director at GlobalFlow',
    avatar: testimonialPhotos.user3,
    content: 'Our international clients love that they do not need to download software to join our meetings. The link works instantly on mobile and desktop.',
    rating: 5,
  },
  {
    name: 'Devansh Rao',
    role: 'Co-founder at NexusLabs',
    avatar: testimonialPhotos.user4,
    content: 'The in-call chat, host controls, and meeting history features make MeetSphere the cleanest meeting workspace we have ever used.',
    rating: 5,
  },
]

// Duplicate list for seamless infinite marquee loop
const marqueeItems = [...testimonialsList, ...testimonialsList, ...testimonialsList]

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 select-none overflow-hidden border-t border-soft">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-14">
        <Reveal>
          <SectionHeading
            eyebrow="Customer Reviews"
            title="Loved by teams around the globe"
            description="See how thousands of developers, designers, and managers host friction-free meetings every day."
          />
        </Reveal>
      </div>

      {/* Infinite Animated Marquee Row 1 */}
      <div className="flex overflow-hidden space-x-6 py-4 group">
        <div className="flex space-x-6 animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeItems.map((t, idx) => (
            <div
              key={idx}
              className="w-[340px] sm:w-[420px] shrink-0 rounded-3xl border border-soft bg-elevated p-6 shadow-xl hover:border-brand-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <Quote size={24} className="text-brand-500/20" />
                </div>

                <p className="text-xs sm:text-sm font-semibold text-theme-body leading-relaxed mb-4">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-soft">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-brand-500/30 shadow-md"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-extrabold text-theme-heading">{t.name}</p>
                    <CheckCircle2 size={13} className="text-brand-500 shrink-0" />
                  </div>
                  <p className="text-[11px] font-semibold text-theme-sub truncate">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}