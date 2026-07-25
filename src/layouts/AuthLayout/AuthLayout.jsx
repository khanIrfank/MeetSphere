import { Link, Outlet } from 'react-router-dom'
import { Video, ShieldCheck, Users, CalendarClock } from 'lucide-react'
import ThemeToggle from '../../components/common/ThemeToggle'

const perks = [
  { icon: ShieldCheck, text: 'Encrypted meetings by default' },
  { icon: Users, text: 'Unlimited participants on every plan' },
  { icon: CalendarClock, text: 'Schedule in seconds, join from anywhere' },
]

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface select-none">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-elevated border-r border-soft relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg relative z-10">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-ink-950">
            <Video size={17} strokeWidth={2.5} />
          </span>
          MeetSphere
        </Link>

        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-3xl font-semibold leading-tight mb-6">
            One link. Every conversation that matters.
          </h2>
          <ul className="space-y-4">
            {perks.map((p) => (
              <li key={p.text} className="flex items-center gap-3 text-muted">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/15 text-brand-400 shrink-0">
                  <p.icon size={17} />
                </span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-muted relative z-10">© {new Date().getFullYear()} MeetSphere</p>
      </div>

      <div className="flex flex-col p-6 sm:p-12">
        <div className="flex items-center justify-between mb-8 lg:justify-end">
          <Link to="/" className="flex lg:hidden items-center gap-2 font-display font-semibold text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-ink-950">
              <Video size={17} strokeWidth={2.5} />
            </span>
            MeetSphere
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
