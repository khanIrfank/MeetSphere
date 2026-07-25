import fs from 'fs'
import path from 'path'

const assetsDir = path.resolve('public/assets')
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true })
}

const imagesToDownload = [
  { name: 'callGrid.webp', url: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80&fm=webp' },
  { name: 'laptopCall.webp', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80&fm=webp' },
  { name: 'teamCall.webp', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80&fm=webp' },
  { name: 'dashboardLog.webp', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80&fm=webp' },
  { name: 'user1.webp', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80&fm=webp' },
  { name: 'user2.webp', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80&fm=webp' },
  { name: 'user3.webp', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80&fm=webp' },
  { name: 'user4.webp', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80&fm=webp' },
]

async function downloadAll() {
  for (const item of imagesToDownload) {
    const dest = path.join(assetsDir, item.name)
    console.log(`Downloading ${item.name}...`)
    try {
      const res = await fetch(item.url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buffer = await res.arrayBuffer()
      fs.writeFileSync(dest, Buffer.from(buffer))
      console.log(`Saved ${item.name} (${buffer.byteLength} bytes)`)
    } catch (err) {
      console.error(`Failed to download ${item.name}:`, err.message)
    }
  }
}

downloadAll()
