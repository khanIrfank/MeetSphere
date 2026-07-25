import { NavLink, useNavigate } from 'react-router-dom'
import { Home, CalendarClock, Settings, Video as VideoIcon, LogOut } from 'lucide-react'
import Avatar from '../../components/common/Avatar'
import ThemeToggle from '../../components/common/ThemeToggle'
import { useAuth } from '../../context/AuthContext'

export const navItems = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/meetings', label: 'Meetings', icon: CalendarClock },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
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

      {/* User Profile Footer */}
      <div className="pt-4 border-t border-soft">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl mb-2 bg-surface/50">
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
