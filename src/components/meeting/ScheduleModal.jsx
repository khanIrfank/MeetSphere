import { useState } from 'react'
import { X, Clock, Calendar as CalendarIcon } from 'lucide-react'
import Button from '../common/Button'

export default function ScheduleModal({ open, onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

  // Custom styled time selector state (avoids native browser blue popover)
  const [hour, setHour] = useState('10')
  const [minute, setMinute] = useState('00')
  const [ampm, setAmpm] = useState('AM')

  const [duration, setDuration] = useState(30)

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // Convert 12h to 24h format string for consistency
    let h = parseInt(hour, 10)
    if (ampm === 'PM' && h < 12) h += 12
    if (ampm === 'AM' && h === 12) h = 0
    const formattedTime = `${String(h).padStart(2, '0')}:${minute}`

    onCreate({ title, date, time: formattedTime, duration })
    setTitle('')
  }

  const hoursList = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))
  const minutesList = ['00', '15', '30', '45']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-up">
      <div className="w-full max-w-md rounded-2xl border border-soft bg-elevated p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-500/15 text-brand-400">
              <Clock size={18} />
            </div>
            <h2 className="font-display text-lg font-semibold">Schedule a Meeting</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-muted hover:text-inherit hover:bg-surface transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-muted">Meeting title</span>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Design Sync & Review"
              className="rounded-xl border border-soft bg-surface px-4 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors"
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-muted">Date</span>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border border-soft bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors cursor-pointer"
              />
            </label>

            {/* Custom Styled Time Selector (Website Styled, No Blue Native Popovers) */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-muted">Time</span>
              <div className="flex items-center gap-1 bg-surface border border-soft rounded-xl p-1">
                <select
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  className="bg-transparent text-xs font-semibold px-2 py-1.5 outline-none cursor-pointer text-inherit"
                >
                  {hoursList.map((h) => (
                    <option key={h} value={h} className="bg-elevated text-inherit">
                      {h}
                    </option>
                  ))}
                </select>
                <span className="text-xs font-bold text-muted">:</span>
                <select
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  className="bg-transparent text-xs font-semibold px-2 py-1.5 outline-none cursor-pointer text-inherit"
                >
                  {minutesList.map((m) => (
                    <option key={m} value={m} className="bg-elevated text-inherit">
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={ampm}
                  onChange={(e) => setAmpm(e.target.value)}
                  className="bg-brand-500/15 text-brand-400 text-xs font-bold px-2 py-1.5 rounded-lg outline-none cursor-pointer ml-auto"
                >
                  <option value="AM" className="bg-elevated text-inherit">AM</option>
                  <option value="PM" className="bg-elevated text-inherit">PM</option>
                </select>
              </div>
            </div>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-muted">Duration</span>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="rounded-xl border border-soft bg-surface px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 cursor-pointer"
            >
              <option value={15} className="bg-elevated">15 minutes</option>
              <option value={30} className="bg-elevated">30 minutes</option>
              <option value={45} className="bg-elevated">45 minutes</option>
              <option value={60} className="bg-elevated">1 hour</option>
            </select>
          </label>

          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-soft">
            <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="flex-1 font-bold">Schedule Meeting</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
