'use client'

import { useEffect, useRef, useState } from 'react'

import {
  AsciiArt,
  Badge,
  Body,
  Dot,
  Footer,
  LogBlock,
  LogLine,
  LogMessage,
  MessageCard,
  MessageLabel,
  MessageStatus,
  MessageText,
  PostBlock,
  PostLine,
  ProgressBar,
  ProgressFill,
  ProgressWrapper,
  ScrollArea,
  Spacer,
  StatusValue,
  TermIcon,
  TitleBar,
  TitleText,
  Wrapper,
} from './WelcomeSystem.styles'

export type LogLevel = 'OK' | 'INFO' | 'WARN' | 'ERR'

type BootLogEntry = {
  level: LogLevel
  message: string
  delay: number
}

type Props = {
  onComplete?: () => void
}

type Phase = 'booting' | 'post' | 'progress' | 'done'

const ASCII_ART = `   
   ||  DEV_PLATFORM_ORGST  v1.0.0
   ||  (c) 2024 Orgst, Inc. All rights reserved.
                       > ||  Starting system boot sequence...
 (_ _) SYSTEM_READY
`

const BOOT_SEQUENCE: BootLogEntry[] = [
  { level: 'OK', message: 'Started Kernel Thread.', delay: 120 },
  { level: 'OK', message: 'Detected hardware_soul at /dev/human0', delay: 180 },
  { level: 'OK', message: 'Verifying integrity of past_experiences...', delay: 240 },
  { level: 'OK', message: 'Mounting ~/dreams --read-only', delay: 150 },
  { level: 'OK', message: 'Allocating mental_cache for innovation.', delay: 200 },
  { level: 'OK', message: 'Establishing peer-to-peer empathy link...', delay: 300 },
  { level: 'INFO', message: 'Visualizing the invisible. Nexus online.', delay: 350 },
  { level: 'OK', message: 'sh ./init_registration_protocol.sh', delay: 400 },
]

const POST_BOOT = [
  { text: '> Initializing registration_protocol.sh', delay: 300 },
  { text: '> Loading assets...', delay: 500 },
]

export function WelcomeSystem({ onComplete }: Props) {
  const [visibleLogs, setVisibleLogs] = useState<BootLogEntry[]>([])
  const [postLines, setPostLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<Phase>('booting')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleLogs, postLines, progress])

  useEffect(() => {
    let cancelled = false
    let accumulated = 0

    BOOT_SEQUENCE.forEach((entry, i) => {
      accumulated += entry.delay
      setTimeout(() => {
        if (cancelled) return
        setVisibleLogs(prev => [...prev, entry])
        if (i === BOOT_SEQUENCE.length - 1) setPhase('post')
      }, accumulated)
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (phase !== 'post') return
    let cancelled = false
    let accumulated = 0

    POST_BOOT.forEach((line, i) => {
      accumulated += line.delay
      setTimeout(() => {
        if (cancelled) return
        setPostLines(prev => [...prev, line.text])
        if (i === POST_BOOT.length - 1) setPhase('progress')
      }, accumulated)
    })

    return () => {
      cancelled = true
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'progress') return
    let cancelled = false
    const DURATION = 2400
    const STEPS = 50
    const interval = DURATION / STEPS

    let step = 0
    const timer = setInterval(() => {
      if (cancelled) return
      step++
      setProgress(Math.round((step / STEPS) * 100))
      if (step >= STEPS) {
        clearInterval(timer)
        setPhase('done')
        onComplete?.()
      }
    }, interval)

    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [phase, onComplete])

  return (
    <Wrapper>
      <TitleBar>
        <Dot $color="#ff5f56" />
        <Dot $color="#ffbd2e" />
        <Dot $color="#27c93f" />
        <TitleText>root@weorgst: ~</TitleText>
      </TitleBar>

      <Body>
        <ScrollArea>
          <AsciiArt>{ASCII_ART}</AsciiArt>

          <Spacer />

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

          {phase === 'progress' || phase === 'done' ? (
            <ProgressWrapper>
              <ProgressBar>
                <ProgressFill $pct={progress} />
              </ProgressBar>
            </ProgressWrapper>
          ) : null}

          <Spacer />

          {phase === 'done' && (
            <MessageCard>
              <MessageLabel>// SYSTEM_MESSAGE</MessageLabel>
              <MessageText>
                Welcome to the inner circle. Access requires valid credentials.
              </MessageText>
              <MessageStatus>
                Status: <StatusValue>WAITING_FOR_INPUT...</StatusValue>
              </MessageStatus>
            </MessageCard>
          )}

          <div ref={bottomRef} />
        </ScrollArea>
      </Body>

      <Footer>
        <TermIcon>{'> _'}</TermIcon>
      </Footer>
    </Wrapper>
  )
}
