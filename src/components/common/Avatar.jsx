const palette = ['bg-brand-500', 'bg-brand-600', 'bg-emerald-600', 'bg-teal-600', 'bg-lime-600']

function hashName(name = '') {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return Math.abs(hash)
}

export default function Avatar({ name = 'U', size = 40, className = '' }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('')
  const color = palette[hashName(name) % palette.length]

  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold text-ink-950 shrink-0 ${color} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials || 'U'}
    </div>
  )
}
