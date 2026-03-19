'use client'

import { useMemo } from 'react'

import { getCompletions } from '../commands'

export function useAutocomplete(input: string, history: string[]): string {
  return useMemo(() => {
    if (!input.trim()) return ''
    const fromHistory = [...history].reverse().find(h => h.startsWith(input) && h !== input)
    if (fromHistory) return fromHistory
    const completions = getCompletions(input)
    return completions[0] ?? ''
  }, [input, history])
}

export type TokenKind = 'valid' | 'invalid' | 'arg-path' | 'arg-string' | 'flag' | 'pipe' | 'plain'

export function classifyToken(token: string, index: number): TokenKind {
  if (index === 0) {
    const completions = getCompletions(token)
    if (completions.some(c => c === token)) return 'valid'
    if (token.length > 0) return 'invalid'
    return 'plain'
  }
  if (token.startsWith('--') || token.startsWith('-')) return 'flag'
  if (token === '|') return 'pipe'
  if (token.startsWith('~/') || token.startsWith('/')) return 'arg-path'
  return 'arg-string'
}
