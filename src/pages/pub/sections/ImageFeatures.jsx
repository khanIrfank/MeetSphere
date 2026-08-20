import { motion as m } from 'framer-motion'
import { Users, MessageSquare, Monitor } from 'lucide-react'

const cards = [
  {
    icon: Users,
    image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&q=80',
    title: 'Multi-User Grid View',
    desc: 'Everyone in one clean, auto-balancing grid. No clutter.',
  },
  {
    icon: MessageSquare,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    title: 'In-Call Realtime Chat',
    desc: 'Message the room and share links without interrupting the speaker.',
  },
  {
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    title: '4K Screen Sharing',
    desc: 'One click to broadcast your screen or app at 60FPS.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ImageFeatures() {
  return (
    <section className="py-16 sm:py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <m.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="font-display text-3xl sm:text-5xl font-black text-theme-heading tracking-tight"
          >
            Everything you need,{' '}
            <span className="text-brand-500">built in.</span>
          </m.h2>
          <m.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="mt-4 text-theme-sub text-base sm:text-lg max-w-xl mx-auto font-medium"
          >
            MeetSphere ships with all the tools modern teams need — no plugins, no add-ons.
          </m.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, image, title, desc }, i) => (
            <m.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i + 2}
              className="group bg-elevated rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-soft transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image with icon badge */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Icon Badge */}
                <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg">
                  <Icon size={16} strokeWidth={2.5} />
                </div>
              </div>

              {/* Text */}
              <div className="p-5">
                <h3 className="font-display font-black text-base text-theme-heading mb-1">{title}</h3>
                <p className="text-sm text-theme-sub font-medium leading-relaxed">{desc}</p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
