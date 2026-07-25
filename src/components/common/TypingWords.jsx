import { useState, useEffect } from 'react'

export default function TypingWords({ words = ['Fast', 'Reliable', 'Seamless', 'Encrypted'] }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)

  useEffect(() => {
    if (words.length === 0) return

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1200)
      return () => clearTimeout(timeout)
    }

    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1))
    }, reverse ? 40 : 80)

    return () => clearTimeout(timeout)
  }, [subIndex, index, reverse, words])

  return (
    <span className="text-brand-500 font-extrabold border-r-2 border-brand-500 pr-1 animate-pulse">
      {words[index]?.substring(0, subIndex)}
    </span>
  )
}
