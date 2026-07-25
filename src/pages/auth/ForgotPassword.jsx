import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import Button from '../../components/common/Button'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  if (sent) {
    return (
      <div className="w-full max-w-sm text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/15 text-brand-400 mb-5">
          <CheckCircle2 size={26} />
        </span>
        <h1 className="font-display text-2xl font-semibold mb-2">Check your inbox</h1>
        <p className="text-sm text-muted mb-8">
          If an account exists for <span className="text-inherit">{email}</span>, we've sent a link to reset your password.
        </p>
        <Link to="/login" className="text-sm text-brand-400 font-medium hover:underline">Back to sign in</Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-display text-2xl font-semibold mb-1">Reset your password</h1>
      <p className="text-sm text-muted mb-8">Enter your email and we'll send you a reset link.</p>

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

        <Button type="submit" className="w-full mt-2" icon={ArrowRight}>
          Send reset link
        </Button>
      </form>

      <p className="text-sm text-muted mt-8 text-center">
        <Link to="/login" className="text-brand-400 font-medium hover:underline">Back to sign in</Link>
      </p>
    </div>
  )
}
