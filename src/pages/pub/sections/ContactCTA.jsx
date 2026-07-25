import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../../../components/common/Button'
import Reveal from '../../../components/common/Reveal'
import { ctaBackground } from '../../../data/images'

export default function ContactCTA() {
  return (
    <section className="max-w-8xl mx-auto px-5 sm:px-14 py-20 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl px-8 py-16 sm:py-24 text-center">
          <img src={ctaBackground} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-brand-700/85" />
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl"
          />

          <h2 className="relative font-display text-3xl sm:text-4xl font-semibold text-white max-w-xl mx-auto">
            Your next meeting is one link away
          </h2>
          <p className="relative text-brand-100/90 mt-4 max-w-md mx-auto">
            Create your free MeetSphere room and send the first invite today.
          </p>
          <div className="relative mt-8">
            <Button size="lg" to="/register" className="!bg-white !text-brand-700 hover:!bg-brand-50" icon={ArrowRight}>
              Create your room
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}