export type TerminalLineType =
  | 'system'
  | 'info'
  | 'error'
  | 'warn'
  | 'command'
  | 'output'
  | 'muted'
  | 'success'
  | 'raw'

export interface TerminalLine {
  type: TerminalLineType
  text: string
  id?: string
}

export interface CommandResult {
  output: TerminalLine[]
  sidePanel?: string
  sidePanelProps?: Record<string, unknown>
}

export interface TerminalContext {
  user: { username: string; role: 'mentee' | 'mentor' | 'admin' } | null
  navigate: (route: string) => void
  clearHistory: () => void
}

export interface Command {
  name: string
  aliases: string[]
  description: string
  usage: string
  category: 'navigation' | 'community' | 'social' | 'profile' | 'shell' | 'easter'
  requiresAuth: boolean
  execute: (args: string[], ctx: TerminalContext) => CommandResult
}
