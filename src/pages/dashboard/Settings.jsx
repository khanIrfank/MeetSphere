import { useState } from 'react'
import { User, Mail, Moon, Sun } from 'lucide-react'
import Avatar from '../../components/common/Avatar'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

export default function Settings() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [name, setName] = useState(user?.name || '')

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="font-display text-2xl font-semibold mb-8">Settings</h1>

      <section className="rounded-2xl border border-soft bg-elevated p-6 mb-6">
        <h2 className="font-semibold text-sm mb-5">Profile</h2>
        <div className="flex items-center gap-4 mb-6">
          <Avatar name={user?.name || 'User'} size={56} />
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-muted">{user?.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">Display name</span>
            <div className="flex items-center gap-2 rounded-xl border border-soft bg-surface px-3.5 py-2.5">
              <User size={16} className="text-muted" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">Email</span>
            <div className="flex items-center gap-2 rounded-xl border border-soft bg-surface px-3.5 py-2.5 opacity-70">
              <Mail size={16} className="text-muted" />
              <input value={user?.email || ''} disabled className="flex-1 bg-transparent outline-none text-sm" />
            </div>
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-soft bg-elevated p-6">
        <h2 className="font-semibold text-sm mb-5">Appearance</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme('dark')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
              theme === 'dark' ? 'border-brand-500 bg-brand-500/10 text-brand-400' : 'border-soft text-muted'
            }`}
          >
            <Moon size={16} /> Dark
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
              theme === 'light' ? 'border-brand-500 bg-brand-500/10 text-brand-400' : 'border-soft text-muted'
            }`}
          >
            <Sun size={16} /> Light
          </button>
        </div>
      </section>
    </div>
  )
}
