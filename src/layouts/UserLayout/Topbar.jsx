import { Video as VideoIcon } from 'lucide-react'
import ThemeToggle from '../../components/common/ThemeToggle'

export default function Topbar() {
  return (
    <div className="flex md:hidden items-center justify-between border-b border-soft bg-elevated px-3.5 py-2.5 sticky top-0 z-40 select-none">
      <div className="flex items-center gap-2 font-display font-extrabold text-sm text-theme-heading">
        <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-brand-500 text-ink-950 shadow-md shadow-brand-500/20">
          <VideoIcon size={16} strokeWidth={2.5} />
        </span>
        <span className="hidden min-[380px]:inline">MeetSphere</span>
      </div>
      <ThemeToggle size="sm" />
    </div>
  )
}
