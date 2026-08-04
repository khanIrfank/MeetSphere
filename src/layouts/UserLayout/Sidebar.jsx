import { NavLink, useNavigate } from 'react-router-dom'
import { Home, CalendarClock, Settings, Video as VideoIcon, LogOut, Sparkles } from 'lucide-react'
import Avatar from '../../components/common/Avatar'
import ThemeToggle from '../../components/common/ThemeToggle'
import { useAuth } from '../../context/AuthContext'
import { usePlan } from '../../context/PlanContext'

export const navItems = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/meetings', label: 'Meetings', icon: CalendarClock },
  { to: '/app/plans', label: 'Room Plans', icon: Sparkles },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const { activePlan, hasActivePlan } = usePlan()
  const navigate = useNavigate()

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col justify-between border-r border-soft bg-elevated/90 backdrop-blur-md py-6 px-4 shadow-sm select-none">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-2.5 font-display font-bold text-lg text-inherit">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-ink-950 shadow-md shadow-brand-500/20">
              <VideoIcon size={20} strokeWidth={2.5} />
            </span>
            <span>MeetSphere</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border-r-4 border-brand-500 shadow-sm'
                    : 'text-muted hover:bg-surface hover:text-inherit'
                }`
              }
            >
              <item.icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Active Room Tier Badge & User Profile Footer */}
      <div className="pt-4 border-t border-soft space-y-3">
        {/* Active Plan Card */}
        <NavLink
          to="/app/plans"
          className={`flex items-center justify-between p-3 rounded-2xl border transition-all group cursor-pointer ${
            hasActivePlan
              ? 'bg-brand-500/10 border-brand-500/20 hover:border-brand-500/40'
              : 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500/50'
          }`}
        >
          <div>
            <p className={`text-[10px] font-extrabold uppercase ${hasActivePlan ? 'text-brand-600 dark:text-brand-400' : 'text-amber-400'}`}>
              {hasActivePlan ? 'Current Room Plan' : 'No Plan Active'}
            </p>
            <p className="text-xs font-extrabold text-theme-heading">
              {hasActivePlan ? activePlan.name : 'Subscribe Plan'}
            </p>
            <p className="text-[10px] font-semibold text-theme-sub">
              {hasActivePlan ? `${activePlan.maxHosts} Hosts • ${activePlan.maxUsers} Users` : 'Required to host calls'}
            </p>
          </div>
          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full group-hover:scale-105 transition-transform ${
            hasActivePlan ? 'bg-brand-500 text-ink-950' : 'bg-amber-500 text-black'
          }`}>
            {hasActivePlan ? 'Manage' : 'Upgrade'}
          </span>
        </NavLink>

        <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-surface/50">
          <Avatar name={user?.name || 'User'} size={38} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold truncate text-inherit">{user?.name || 'User'}</p>
            <p className="text-[11px] text-muted truncate">{user?.email || 'user@meetsphere.com'}</p>
          </div>
        </div>

        <button
          onClick={() => { logout(); navigate('/') }}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  )
}
