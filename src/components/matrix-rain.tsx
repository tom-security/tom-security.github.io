'use client'

import { useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:<>?/~'

interface Column {
  x: number
  y: number
  speed: number
  chars: string[]
  opacity: number
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const columns: Column[] = []
    const fontSize = 14
    const columnWidth = 20

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns.length = 0
      const colCount = Math.ceil(canvas.width / columnWidth)
      for (let i = 0; i < colCount; i++) {
        columns.push({
          x: i * columnWidth,
          y: Math.random() * canvas.height,
          speed: 0.5 + Math.random() * 2,
          chars: Array.from({ length: 25 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
          opacity: 0.03 + Math.random() * 0.12,
        })
      }
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 8, 15, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      columns.forEach((col) => {
        col.chars.forEach((char, i) => {
          const yPos = col.y - i * fontSize
          if (yPos < 0 || yPos > canvas.height) return

          const fade = 1 - (i / col.chars.length)
          ctx.fillStyle = `rgba(16, 185, 129, ${col.opacity * fade})`
          ctx.font = `${fontSize}px monospace`
          ctx.fillText(char, col.x, yPos)
        })

        col.y += col.speed

        if (col.y - col.chars.length * fontSize > canvas.height) {
          col.y = -col.chars.length * fontSize
          col.speed = 0.5 + Math.random() * 2
          col.chars = Array.from({ length: 25 }, () => CHARS[Math.floor(Math.random() * CHARS.length)])
        }

        if (Math.random() < 0.01) {
          const idx = Math.floor(Math.random() * col.chars.length)
          col.chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
