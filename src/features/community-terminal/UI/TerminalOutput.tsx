'use client'

import styled, { keyframes, useTheme } from 'styled-components'

import type { TerminalLine } from '../commands/types'

interface OutputEntryProps {
  lines: TerminalLine[]
}

export function OutputEntry({ lines }: OutputEntryProps) {
  const theme = useTheme()

  const lineColor: Record<TerminalLine['type'], string> = {
    system: theme.colors.green,
    info: theme.colors.cyan,
    error: theme.colors.red,
    warn: theme.colors.orange,
    command: theme.colors.yellow,
    output: theme.colors.text,
    muted: theme.colors.muted,
    success: theme.colors.green,
    raw: theme.colors.text,
  }

  return (
    <>
      {lines.map((line, i) => (
        <OutputLine key={i} style={{ color: lineColor[line.type] }}>
          {line.text}
        </OutputLine>
      ))}
    </>
  )
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(3px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const OutputLine = styled.div`
  font-size: 12px;
  line-height: 1.55;
  white-space: pre;
  animation: ${fadeIn} 0.15s ease forwards;
  font-family: inherit;
`
