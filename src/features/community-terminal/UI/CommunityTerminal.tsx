'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { parseAndExecute } from '../commands'
import type { TerminalLine } from '../commands/types'
import { useBoot } from '../hooks/useBoot'
import { useHistory } from '../hooks/useHistory'
import { BootSequence } from './BootSequence'
import { MOTD } from './MOTD'
import { TerminalInput } from './TerminalInput'
import { OutputEntry } from './TerminalOutput'
import type { PromptContext, PromptRole } from './TerminalPrompt'
import { TerminalPrompt } from './TerminalPrompt'

interface HistoryEntry {
  command: string
  output: TerminalLine[]
}

export function CommunityTerminal() {
  const router = useRouter()

  const { phase, visibleLogs, postLines, progress, autoexecText, skip } = useBoot()

  const [input, setInput] = useState('')
  const [entries, setEntries] = useState<HistoryEntry[]>([])
  const { history, push: pushHistory, navigateUp, navigateDown, reset: resetIndex } = useHistory()

  const user = null as { username: string; role: PromptRole } | null
  const promptContext: PromptContext = user ? 'nexus' : 'lobby'

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [visibleLogs, postLines, progress, entries, phase])

  useEffect(() => {
    if (phase !== 'done') return
    inputRef.current?.focus()
    const handleClick = () => inputRef.current?.focus()
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [phase])

  useEffect(() => {
    if (phase === 'done') return
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') skip()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, skip])

  const handleSubmit = useCallback(() => {
    const trimmed = input.trim()

    if (trimmed === '') {
      setEntries(prev => [...prev, { command: '', output: [] }])
      setInput('')
      return
    }

    pushHistory(trimmed)

    const { lines, sidePanel } = parseAndExecute(
      trimmed,
      {
        user,
        navigate: route => router.push(route),
        clearHistory: () => setEntries([]),
      },
      history,
    )

    setEntries(prev => [...prev, { command: trimmed, output: lines }])
    setInput('')
    resetIndex()

    if (sidePanel) router.push(sidePanel)
  }, [input, history, pushHistory, resetIndex, router, user])

  const handleArrowUp = useCallback(() => {
    setInput(navigateUp(input))
  }, [navigateUp, input])

  const handleArrowDown = useCallback(() => {
    setInput(navigateDown())
  }, [navigateDown])

  const handleClear = useCallback(() => setEntries([]), [])

  return (
    <Wrapper>
      <TitleBar>
        <Dot $color="red" />
        <Dot $color="yellow" />
        <Dot $color="green" />
        <TitleText>fish — orgst@nexus</TitleText>
      </TitleBar>

      <Body>
        <ScrollArea onClick={() => inputRef.current?.focus()}>
          <BootSequence
            visibleLogs={visibleLogs}
            postLines={postLines}
            progress={progress}
            showProgress={
              phase === 'progress' || phase === 'motd' || phase === 'autoexec' || phase === 'done'
            }
          />

          {(phase === 'motd' || phase === 'autoexec' || phase === 'done') && (
            <>
              <Spacer />
              <MOTD isFirstVisit={!user} username={user?.username} />
            </>
          )}

          {phase === 'autoexec' && autoexecText && (
            <>
              <Spacer />
              <PromptLine>
                <TerminalPrompt
                  context={promptContext}
                  username={user?.username}
                  role={user?.role}
                />
                <AutoexecText>{autoexecText}</AutoexecText>
              </PromptLine>
            </>
          )}

          {phase === 'done' && (
            <>
              <Spacer />
              {entries.map((entry, i) => (
                <EntryBlock key={i}>
                  <PromptLine>
                    <TerminalPrompt
                      context={promptContext}
                      username={user?.username}
                      role={user?.role}
                    />
                    <CommandText>{entry.command}</CommandText>
                  </PromptLine>
                  {entry.output.length > 0 && (
                    <OutputBlock>
                      <OutputEntry lines={entry.output} />
                    </OutputBlock>
                  )}
                </EntryBlock>
              ))}

              <PromptLine>
                <TerminalPrompt
                  context={promptContext}
                  username={user?.username}
                  role={user?.role}
                />
                <TerminalInput
                  ref={inputRef}
                  value={input}
                  history={history}
                  onChange={setInput}
                  onSubmit={handleSubmit}
                  onArrowUp={handleArrowUp}
                  onArrowDown={handleArrowDown}
                  onClear={handleClear}
                />
              </PromptLine>
            </>
          )}

          <div ref={bottomRef} />
        </ScrollArea>
      </Body>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`

const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`

const Dot = styled.span<{ $color: 'red' | 'yellow' | 'green' }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $color, theme }) => theme.colors[$color]};
`

const TitleText = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  margin-left: 8px;
`

const Body = styled.div`
  flex: 1;
  overflow: hidden;
`

const ScrollArea = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 20px 22px 32px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`

const Spacer = styled.div`
  height: 16px;
`

const PromptLine = styled.div`
  display: flex;
  align-items: center;
  min-height: 24px;
  gap: 4px;
`

const EntryBlock = styled.div`
  margin-bottom: 4px;
`

const OutputBlock = styled.div`
  padding-left: 4px;
  margin: 2px 0 8px;
`

const CommandText = styled.span`
  color: ${({ theme }) => theme.colors.yellow};
  font-size: 13px;
  margin-left: 4px;
`

const AutoexecText = styled.span`
  color: ${({ theme }) => theme.colors.yellow};
  font-size: 13px;
  margin-left: 4px;
`
