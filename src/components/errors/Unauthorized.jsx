import Button from '../common/Button'
import { ShieldAlert } from 'lucide-react'

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/15 text-brand-400">
        <ShieldAlert size={28} />
      </span>
      <h1 className="text-xl font-semibold">Sign in to continue</h1>
      <p className="text-muted max-w-sm">You need to be signed in to view this page.</p>
      <Button to="/login" className="mt-2">Go to sign in</Button>
    </div>
  )
}
