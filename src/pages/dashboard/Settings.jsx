import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Moon, Sun, LogOut } from 'lucide-react'
import Avatar from '../../components/common/Avatar'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

export default function Settings() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-8 select-none">
      <h1 className="font-display text-2xl font-extrabold text-theme-heading mb-8">Settings</h1>

      {/* Profile Section */}
      <section className="rounded-2xl border border-soft bg-elevated p-6 mb-6 shadow-sm">
        <h2 className="font-extrabold text-sm text-theme-heading mb-5">Profile</h2>
        <div className="flex items-center gap-4 mb-6">
          <Avatar name={user?.name || 'User'} size={56} />
          <div>
            <p className="font-bold text-theme-heading">{user?.name || 'User'}</p>
            <p className="text-xs font-semibold text-theme-sub">{user?.email || 'user@meetsphere.com'}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-theme-sub">Display name</span>
            <div className="flex items-center gap-2 rounded-xl border border-soft bg-surface px-3.5 py-2.5">
              <User size={16} className="text-theme-sub" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-theme-heading font-medium"
              />
            </div>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-theme-sub">Email</span>
            <div className="flex items-center gap-2 rounded-xl border border-soft bg-surface px-3.5 py-2.5 opacity-70">
              <Mail size={16} className="text-theme-sub" />
              <input value={user?.email || 'user@meetsphere.com'} disabled className="flex-1 bg-transparent outline-none text-sm text-theme-heading font-medium" />
            </div>
          </label>
        </div>
      </section>

      {/* Appearance Section */}
      <section className="rounded-2xl border border-soft bg-elevated p-6 mb-6 shadow-sm">
        <h2 className="font-extrabold text-sm text-theme-heading mb-5">Appearance</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold transition-all cursor-pointer ${
              theme === 'dark' ? 'border-brand-500 bg-brand-500/15 text-brand-400 shadow-sm' : 'border-soft text-theme-sub hover:bg-surface'
            }`}
          >
            <Moon size={16} /> Dark
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold transition-all cursor-pointer ${
              theme === 'light' ? 'border-brand-500 bg-brand-500/15 text-brand-600 dark:text-brand-400 shadow-sm' : 'border-soft text-theme-sub hover:bg-surface'
            }`}
          >
            <Sun size={16} /> Light
          </button>
        </div>
      </section>

      {/* Account & Logout Section */}
      <section className="rounded-2xl border border-rose-500/30 bg-elevated p-6 shadow-sm">
        <h2 className="font-extrabold text-sm text-rose-500 mb-2">Account</h2>
        <p className="text-xs text-theme-sub mb-4 font-semibold">
          Sign out of your MeetSphere account on this device.
        </p>
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </section>
    </div>
  )
}
