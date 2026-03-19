'use client'

import { useCallback, useState } from 'react'

const STORAGE_KEY = 'orgst_terminal_history'
const MAX_HISTORY = 100

function loadHistory(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function saveHistory(history: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-MAX_HISTORY)))
  } catch {}
}

export function useHistory() {
  const [history, setHistory] = useState<string[]>(() => loadHistory())
  const [index, setIndex] = useState(-1)

  const push = useCallback((cmd: string) => {
    if (!cmd.trim()) return
    setHistory(prev => {
      const next = [...prev.filter(h => h !== cmd), cmd]
      saveHistory(next)
      return next
    })
    setIndex(-1)
  }, [])

  const navigateUp = useCallback(
    (currentInput: string): string => {
      const cmds = history
      if (cmds.length === 0) return currentInput
      const next = Math.min(index + 1, cmds.length - 1)
      setIndex(next)
      return cmds[cmds.length - 1 - next] ?? currentInput
    },
    [history, index],
  )

  const navigateDown = useCallback((): string => {
    if (index <= 0) {
      setIndex(-1)
      return ''
    }
    const next = index - 1
    setIndex(next)
    return history[history.length - 1 - next] ?? ''
  }, [history, index])

  const reset = useCallback(() => setIndex(-1), [])

  return { history, push, navigateUp, navigateDown, reset }
}
