import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, ArrowRight } from 'lucide-react'
import Button from '../../components/common/Button'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('Fill in all fields to create your account.')
      return
    }
    register(name, email)
    navigate('/app', { replace: true })
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-display text-2xl font-semibold mb-1">Create your account</h1>
      <p className="text-sm text-muted mb-8">Start meeting in under a minute.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted">Full name</span>
          <div className="flex items-center gap-2 rounded-xl border border-soft bg-elevated px-3.5 py-2.5">
            <User size={16} className="text-muted" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Irfan Khan"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted">Email</span>
          <div className="flex items-center gap-2 rounded-xl border border-soft bg-elevated px-3.5 py-2.5">
            <Mail size={16} className="text-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted">Password</span>
          <div className="flex items-center gap-2 rounded-xl border border-soft bg-elevated px-3.5 py-2.5">
            <Lock size={16} className="text-muted" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </label>

        {error && <p className="text-xs text-rose-400">{error}</p>}

        <Button type="submit" className="w-full mt-2" icon={ArrowRight}>
          Create account
        </Button>
      </form>

      <p className="text-sm text-muted mt-8 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-400 font-medium hover:underline">Sign in</Link>
      </p>
    </div>
  )
}
