'use client'

import { useEffect, useRef, useState } from 'react'

interface TerminalTypingProps {
  lines: string[]
  speed?: number
  delayBetweenLines?: number
  className?: string
}

export function TerminalTyping({ lines, speed = 50, delayBetweenLines = 800, className = '' }: TerminalTypingProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const charRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const typeNext = () => {
      const lineIdx = indexRef.current
      const charIdx = charRef.current

      if (lineIdx >= lines.length) {
        setIsComplete(true)
        return
      }

      const line = lines[lineIdx]

      if (charIdx < line.length) {
        charRef.current = charIdx + 1
        const fullText = lines.slice(0, lineIdx).join('\n') + (lineIdx > 0 ? '\n' : '') + line.slice(0, charIdx + 1)
        setDisplayedText(fullText)
        timeoutRef.current = setTimeout(typeNext, speed)
      } else {
        indexRef.current = lineIdx + 1
        charRef.current = 0
        timeoutRef.current = setTimeout(typeNext, delayBetweenLines)
      }
    }

    timeoutRef.current = setTimeout(typeNext, 500)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [lines, speed, delayBetweenLines])

  const displayLines = displayedText.split('\n')

  return (
    <div className={`font-mono text-sm sm:text-base ${className}`}>
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border/50">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-muted-foreground text-xs">terminal</span>
      </div>
      <div className="space-y-1.5">
        {displayLines.map((line, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-cyber shrink-0">$</span>
            <span className="text-foreground/90">{line}</span>
          </div>
        ))}
        {isComplete && (
          <div className="flex items-start gap-2 mt-1">
            <span className="text-cyber shrink-0">$</span>
            <span className="terminal-cursor text-cyber">▌</span>
          </div>
        )}
      </div>
    </div>
  )
}
