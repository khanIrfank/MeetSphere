import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import Button from '../../components/common/Button'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Enter your email and password to continue.')
      return
    }
    login(email)
    navigate(location.state?.from?.pathname || '/app', { replace: true })
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-display text-2xl font-semibold mb-1">Welcome back</h1>
      <p className="text-sm text-muted mb-8">Sign in to get to your meetings.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              placeholder="••••••••"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </label>

        {error && <p className="text-xs text-rose-400">{error}</p>}

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-brand-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full mt-2" icon={ArrowRight}>
          Sign in
        </Button>
      </form>

      <p className="text-sm text-muted mt-8 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-400 font-medium hover:underline">Create one</Link>
      </p>
    </div>
  )
}
