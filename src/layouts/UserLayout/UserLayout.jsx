import { NavLink, Outlet } from 'react-router-dom'
import Sidebar, { navItems } from './Sidebar'
import Topbar from './Topbar'

function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-soft bg-elevated flex justify-around py-1.5 px-1 select-none">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] sm:text-xs shrink-0 ${
              isActive ? 'text-brand-400 font-bold' : 'text-muted'
            }`
          }
        >
          <item.icon size={18} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default function UserLayout() {
  return (
    <div className="min-h-screen flex bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
