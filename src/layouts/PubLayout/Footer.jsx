import { Video } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-soft mt-24 select-none bg-cyan-900">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5 font-display font-bold text-lg  mb-3">
            <span className="flex h-8 w-8 items-center  justify-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/20">
              <Video size={18} strokeWidth={2.5} />
            </span>
            MeetSphere
          </div>
          <p className="text-sm text-white max-w-xs font-medium leading-relaxed">
            Meetings that stay out of your way. Schedule, join, and chat — nothing else to learn.
          </p>
        </div>
        {[
          { title: 'Product', items: ['Features', 'Pricing', 'Meeting rooms'] },
          { title: 'Company', items: ['About', 'Careers', 'Contact'] },
          { title: 'Resources', items: ['Help center', 'Status', 'FAQ'] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-lg font-extrabold text-white underline  mb-3">{col.title}</h4>
            <ul className="space-y-2 text-sm text-white font-semibold">
              {col.items.map((i) => (
                <li key={i} className="hover:text-brand-500 transition-colors cursor-pointer">{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-soft py-6 text-center text-xs text-white font-semibold">
        © {new Date().getFullYear()} MeetSphere. All rights reserved.
      </div>
    </footer>
  )
}
