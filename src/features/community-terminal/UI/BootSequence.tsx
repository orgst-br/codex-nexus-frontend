'use client'

import styled, { keyframes } from 'styled-components'

import type { BootLogEntry } from '../hooks/useBoot'

const BIOS_LOGO = `
╔══════════════════════════════════════════════╗
║                                              ║
║  ██████╗ ██████╗  ██████╗ ███████╗████████╗  ║
║ ██╔═══██╗██╔══██╗██╔════╝ ██╔════╝╚══██╔══╝  ║
║ ██║   ██║██████╔╝██║  ███╗███████╗   ██║     ║
║ ██║   ██║██╔══██╗██║   ██║╚════██║   ██║     ║
║ ╚██████╔╝██║  ██║╚██████╔╝███████║   ██║     ║
║  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝     ║
║                                              ║
║           DEV_PLATFORM v1.0.0                ║
║         (c) 2026 Orgst, Inc.                 ║
║                                              ║
╚══════════════════════════════════════════════╝`

type Level = BootLogEntry['level']

interface BootSequenceProps {
  visibleLogs: BootLogEntry[]
  postLines: string[]
  progress: number
  showProgress: boolean
}

export function BootSequence({
  visibleLogs,
  postLines,
  progress,
  showProgress,
}: BootSequenceProps) {
  return (
    <>
      <BiosLogo>{BIOS_LOGO}</BiosLogo>

      <LogBlock>
        {visibleLogs.map((entry, i) => (
          <LogLine key={i}>
            <Badge $level={entry.level}>{entry.level}</Badge>
            <LogMessage>{entry.message}</LogMessage>
          </LogLine>
        ))}
      </LogBlock>

      {postLines.length > 0 && (
        <PostBlock>
          {postLines.map((line, i) => (
            <PostLine key={i}>{line}</PostLine>
          ))}
        </PostBlock>
      )}

      {showProgress && (
        <ProgressWrapper>
          <ProgressRow>
            <ProgressBar $pct={progress} />
            <ProgressPct>{progress}%</ProgressPct>
          </ProgressRow>
        </ProgressWrapper>
      )}
    </>
  )
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`

const BiosLogo = styled.pre`
  color: ${({ theme }) => theme.colors.cyan};
  font-size: 11px;
  line-height: 1.3;
  white-space: pre;
  margin-bottom: 16px;
`

const LogBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const LogLine = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  animation: ${fadeIn} 0.2s ease forwards;
`

const BADGE_COLOR: Record<Level, 'green' | 'cyan' | 'orange' | 'red'> = {
  OK: 'green',
  INFO: 'cyan',
  WARN: 'orange',
  ERR: 'red',
}

const Badge = styled.span<{ $level: Level }>`
  color: ${({ $level, theme }) => theme.colors[BADGE_COLOR[$level]]};
  font-size: 11px;
  white-space: nowrap;
  &::before {
    content: '[ ';
    color: ${({ theme }) => theme.colors.border};
  }
  &::after {
    content: ' ]';
    color: ${({ theme }) => theme.colors.border};
  }
`

const LogMessage = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
`

const PostBlock = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const PostLine = styled.div`
  color: ${({ theme }) => theme.colors.yellow};
  font-size: 12px;
  animation: ${fadeIn} 0.2s ease forwards;
`

const ProgressWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const ProgressBar = styled.div<{ $pct: number }>`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.cyan};
  letter-spacing: 1px;
  &::before {
    content: '${({ $pct }) => {
      const filled = Math.round(($pct / 100) * 28)
      const empty = 28 - filled
      return '█'.repeat(filled) + '░'.repeat(empty)
    }}';
  }
`

const ProgressPct = styled.span`
  color: ${({ theme }) => theme.colors.green};
  font-size: 12px;
  min-width: 36px;
`
