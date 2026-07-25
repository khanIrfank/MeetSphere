import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeading from '../../../components/common/SectionHeading'
import Reveal from '../../../components/common/Reveal'

const faqs = [
  { q: 'Do I need to install anything to join a meeting?', a: 'No — MeetSphere runs in your browser. Just open the link and join.' },
  { q: 'Is there a limit on meeting participants?', a: 'Free plans support small group meetings; Pro and Business plans raise the participant limit significantly.' },
  { q: 'Can I schedule a meeting for later?', a: "Yes. Use the Schedule action from your dashboard to set a date, time, and title — you'll get a shareable meeting ID." },
  { q: 'Is chat available during meetings?', a: 'Every meeting room includes a chat panel so participants can share links and notes without interrupting the call.' },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="bg-elevated border-y border-soft">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        </Reveal>
        <div className="mt-12 divide-y divide-[var(--border-soft)] border-t border-b border-soft">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-medium">{f.q}</span>
                <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={18} className={`shrink-0 ${openIndex === i ? 'text-brand-400' : 'text-muted'}`} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-muted leading-relaxed pb-5 pr-8">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}