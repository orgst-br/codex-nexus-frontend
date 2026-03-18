'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
  AsciiArt,
  AsciiRow,
  Badge,
  Body,
  CliBlock,
  CliForm,
  CliInput,
  Command,
  Dot,
  HelpCmd,
  HelpDesc,
  HelpLine,
  HelpTitle,
  HelpWrapper,
  Highlight,
  Host,
  LogBlock,
  LogLine,
  LogMessage,
  MessageCard,
  MessageLabel,
  MessageText,
  OutputText,
  PostBlock,
  PostLine,
  PreLogo,
  PreTux,
  ProgressBar,
  ProgressFill,
  ProgressWrapper,
  Prompt,
  PromptLine,
  ScrollArea,
  Separator,
  Spacer,
  TitleBar,
  TitleText,
  User,
  WelcomeText,
  WelcomeWrapper,
  Wrapper,
} from './CommunityTerminal.styles'

export type LogLevel = 'OK' | 'INFO' | 'WARN' | 'ERR'

type BootLogEntry = {
  level: LogLevel
  message: string
  delay: number
}

type HistoryEntry = {
  command: string
  output: string | null
}

type Phase = 'booting' | 'post' | 'progress' | 'done'

const COMMANDS = [
  { cmd: 'help', desc: 'list available commands' },
  { cmd: 'member-card', desc: 'open community member cards' },
  { cmd: 'register', desc: 'create your profile' },
  { cmd: 'clear', desc: 'clear the terminal' },
  { cmd: 'exit', desc: 'close the split panel' },
]

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
  { level: 'OK', message: 'sh ./init_community_protocol.sh', delay: 400 },
]

const POST_BOOT = [
  { text: '> Initializing community_protocol.sh', delay: 300 },
  { text: '> Loading assets...', delay: 500 },
]

export function CommunityTerminal() {
  const router = useRouter()

  // Boot phase state
  const [visibleLogs, setVisibleLogs] = useState<BootLogEntry[]>([])
  const [postLines, setPostLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<Phase>('booting')

  // CLI state
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [cmdIndex, setCmdIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleLogs, postLines, progress, history])

  // Boot sequence
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
      }
    }, interval)

    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [phase])

  // CLI focus
  useEffect(() => {
    if (phase !== 'done') return
    inputRef.current?.focus()
    const handleClick = () => inputRef.current?.focus()
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [phase])

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase()

      if (trimmed === 'clear') {
        setHistory([])
        return
      }

      if (trimmed === 'exit') {
        router.push('/')
        setHistory(prev => [...prev, { command: cmd, output: 'Panel closed.' }])
        return
      }

      if (trimmed === 'help') {
        setHistory(prev => [...prev, { command: cmd, output: '__help__' }])
        return
      }

      if (trimmed === 'welcome') {
        setHistory(prev => [...prev, { command: cmd, output: '__welcome__' }])
        return
      }

      if (trimmed === 'member-card') {
        router.push('/member-card')
        setHistory(prev => [...prev, { command: cmd, output: 'Opening member-card...' }])
        return
      }

      if (trimmed === 'register') {
        router.push('/register')
        setHistory(prev => [...prev, { command: cmd, output: 'Opening register...' }])
        return
      }

      if (trimmed === '') {
        setHistory(prev => [...prev, { command: '', output: null }])
        return
      }

      setHistory(prev => [...prev, { command: cmd, output: `command not found: ${trimmed}` }])
    },
    [router],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    processCommand(input)
    setInput('')
    setCmdIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const cmds = history.filter(h => h.command.trim() !== '').map(h => h.command)
      if (cmds.length === 0) return
      const next = Math.min(cmdIndex + 1, cmds.length - 1)
      setCmdIndex(next)
      setInput(cmds[cmds.length - 1 - next] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cmdIndex <= 0) {
        setCmdIndex(-1)
        setInput('')
        return
      }
      const cmds = history.filter(h => h.command.trim() !== '').map(h => h.command)
      const next = cmdIndex - 1
      setCmdIndex(next)
      setInput(cmds[cmds.length - 1 - next] ?? '')
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      if (!input) return
      const matches = COMMANDS.filter(c => c.cmd.startsWith(input.toLowerCase()))
      if (matches.length === 1 && matches[0]) {
        setInput(matches[0].cmd)
      }
    }
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault()
      setHistory([])
    }
  }

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

          {(phase === 'progress' || phase === 'done') && (
            <ProgressWrapper>
              <ProgressBar>
                <ProgressFill $pct={progress} />
              </ProgressBar>
            </ProgressWrapper>
          )}

          {phase === 'done' && (
            <>
              <Spacer />
              <MessageCard>
                <MessageLabel>// SYSTEM_MESSAGE</MessageLabel>
                <MessageText>
                  Welcome to the inner circle. Type &apos;help&apos; for available commands.
                </MessageText>
              </MessageCard>
              <Spacer />

              <CliBlock>
                {history.map((entry, i) => (
                  <div key={i}>
                    <PromptLine>
                      <Prompt>
                        <User>orgst</User>@<Host>community</Host>:~${' '}
                      </Prompt>
                      <Command>{entry.command}</Command>
                    </PromptLine>
                    {entry.output && <CliOutputLine output={entry.output} />}
                  </div>
                ))}

                <CliForm onSubmit={handleSubmit}>
                  <PromptLine>
                    <Prompt>
                      <User>orgst</User>@<Host>community</Host>:~${' '}
                    </Prompt>
                    <CliInput
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoComplete="off"
                      spellCheck={false}
                    />
                  </PromptLine>
                </CliForm>
              </CliBlock>
            </>
          )}

          <div ref={bottomRef} />
        </ScrollArea>
      </Body>
    </Wrapper>
  )
}

function CliOutputLine({ output }: { output: string }) {
  if (output === '__welcome__') return <WelcomeOutput />
  if (output === '__help__') return <HelpOutput />
  return <OutputText>{output}</OutputText>
}

function WelcomeOutput() {
  return (
    <WelcomeWrapper>
      <AsciiRow>
        <PreTux>
          {`
       .---.
      |o_o |
      |:_/ |
     //   \\ \\
    (|     | )
   /'\\_   _/\`\\
   \\___)=(___/
`}
        </PreTux>
        <PreLogo>
          {`
   ____                  __
  / __ \\_________  _____/ /_
 / / / / ___/ __ \\/ ___/ __/
/ /_/ / /  / /_/ (__  ) /_
\\____/_/   \\__, /____/\\__/
          /____/
`}
        </PreLogo>
      </AsciiRow>
      <WelcomeText>Welcome!!! Orgst community terminal.</WelcomeText>
      <Separator>----</Separator>
      <WelcomeText>
        Type &apos;<Highlight>help</Highlight>&apos; for available commands.
      </WelcomeText>
      <WelcomeText>
        Type &apos;<Highlight>member-card</Highlight>&apos; to see community members.
      </WelcomeText>
    </WelcomeWrapper>
  )
}

function HelpOutput() {
  return (
    <HelpWrapper>
      <HelpTitle>Available commands:</HelpTitle>
      {COMMANDS.map(({ cmd, desc }) => (
        <HelpLine key={cmd}>
          <HelpCmd>{cmd}</HelpCmd>
          <HelpDesc>- {desc}</HelpDesc>
        </HelpLine>
      ))}
      <Separator />
      <HelpLine>
        <HelpDesc>Tab = autocomplete | ↑↓ = history | Ctrl+L = clear</HelpDesc>
      </HelpLine>
    </HelpWrapper>
  )
}
