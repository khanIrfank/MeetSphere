import { Video as VideoIcon } from 'lucide-react'
import ThemeToggle from '../../components/common/ThemeToggle'

export default function Topbar() {
  return (
    <div className="flex md:hidden items-center justify-between border-b border-soft bg-elevated px-4 py-3 sticky top-0 z-40 select-none">
      <div className="flex items-center gap-2 font-display font-semibold">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 text-ink-950">
          <VideoIcon size={15} strokeWidth={2.5} />
        </span>
        MeetSphere
      </div>
      <ThemeToggle />
    </div>
  )
}
