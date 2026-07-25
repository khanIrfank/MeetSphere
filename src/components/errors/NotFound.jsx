import { Link } from 'react-router-dom'
import Button from '../common/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
      <span className="font-display text-7xl font-semibold text-brand-500">404</span>
      <h1 className="text-xl font-semibold">This page went off mute and left the call.</h1>
      <p className="text-muted max-w-sm">The page you're looking for doesn't exist or has moved.</p>
      <Button to="/" className="mt-2">Back to home</Button>
    </div>
  )
}
