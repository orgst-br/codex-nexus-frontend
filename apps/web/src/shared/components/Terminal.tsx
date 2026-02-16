'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const COMMANDS = [
  { cmd: 'help', desc: 'list available commands' },
  { cmd: 'member-card', desc: 'open community member cards' },
  { cmd: 'clear', desc: 'clear the terminal' },
  { cmd: 'exit', desc: 'close the split panel' },
]

type HistoryEntry = {
  command: string
  output: string | null
}

type Props = {
  onRoute: (route: string | null) => void
}

export function Terminal({ onRoute }: Props) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: 'welcome', output: '__welcome__' },
  ])
  const [cmdIndex, setCmdIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [history])

  const handleClick = () => {
    inputRef.current?.focus()
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase()

      if (trimmed === 'clear') {
        setHistory([])
        return
      }

      if (trimmed === 'exit') {
        onRoute(null)
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
        onRoute('/member-card')
        setHistory(prev => [...prev, { command: cmd, output: 'Opening member-card...' }])
        return
      }

      if (trimmed === '') {
        setHistory(prev => [...prev, { command: '', output: null }])
        return
      }

      setHistory(prev => [...prev, { command: cmd, output: `command not found: ${trimmed}` }])
    },
    [onRoute],
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
      <TerminalHeader>
        <Dot $color="#ff5f56" />
        <Dot $color="#ffbd2e" />
        <Dot $color="#27c93f" />
        <HeaderTitle>orgst@community:~</HeaderTitle>
      </TerminalHeader>
      <TerminalBody>
        <ScrollArea>
          {history.map((entry, i) => (
            <div key={i}>
              <PromptLine>
                <Prompt>
                  <User>orgst</User>@<Host>community</Host>:~${' '}
                </Prompt>
                <Command>{entry.command}</Command>
              </PromptLine>
              {entry.output && <OutputLine output={entry.output} />}
            </div>
          ))}
          <Form onSubmit={handleSubmit}>
            <PromptLine>
              <Prompt>
                <User>orgst</User>@<Host>community</Host>:~${' '}
              </Prompt>
              <Input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                autoComplete="off"
                spellCheck={false}
              />
            </PromptLine>
          </Form>
          <div ref={bottomRef} />
        </ScrollArea>
      </TerminalBody>
    </Wrapper>
  )
}

function OutputLine({ output }: { output: string }) {
  if (output === '__welcome__') {
    return <WelcomeOutput />
  }
  if (output === '__help__') {
    return <HelpOutput />
  }
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
        <Pre>
          {`
   ____                  __
  / __ \\_________  _____/ /_
 / / / / ___/ __ \\/ ___/ __/
/ /_/ / /  / /_/ (__  ) /_
\\____/_/   \\__, /____/\\__/
          /____/
`}
        </Pre>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`

const Dot = styled.span<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`

const HeaderTitle = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  margin-left: 8px;
`

const TerminalBody = styled.div`
  flex: 1;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`

const ScrollArea = styled.div`
  padding: 16px;
  overflow-y: auto;
  height: 100%;
`

const PromptLine = styled.div`
  display: flex;
  align-items: center;
  min-height: 24px;
`

const Prompt = styled.span`
  white-space: nowrap;
  flex-shrink: 0;
`

const User = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`

const Host = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`

const Command = styled.span`
  color: ${({ theme }) => theme.colors.text};
`

const OutputText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;
`

const Form = styled.form`
  display: flex;
`

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: inherit;
  caret-color: ${({ theme }) => theme.colors.primary};
`

const WelcomeWrapper = styled.div`
  margin-bottom: 12px;
`

const AsciiRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
`

const PreTux = styled.pre`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 10px;
  }
`

const Pre = styled.pre`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 10px;
  }
`

const WelcomeText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`

const Separator = styled.div`
  color: ${({ theme }) => theme.colors.border};
  margin: 8px 0;
`

const HelpWrapper = styled.div`
  margin-bottom: 12px;
`

const HelpTitle = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 8px;
`

const HelpLine = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 2px;
`

const HelpCmd = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  min-width: 120px;
`

const HelpDesc = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`
