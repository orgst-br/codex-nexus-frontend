'use client'

import { forwardRef } from 'react'
import styled, { useTheme } from 'styled-components'

import { classifyToken, useAutocomplete } from '../hooks/useAutocomplete'

interface TerminalInputProps {
  value: string
  history: string[]
  onChange: (val: string) => void
  onSubmit: () => void
  onArrowUp: () => void
  onArrowDown: () => void
  onClear: () => void
}

export const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  function TerminalInput(
    { value, history, onChange, onSubmit, onArrowUp, onArrowDown, onClear },
    ref,
  ) {
    const theme = useTheme()
    const suggestion = useAutocomplete(value, history)
    const ghostText =
      suggestion && suggestion.startsWith(value) ? suggestion.slice(value.length) : ''

    const tokenColorMap: Record<ReturnType<typeof classifyToken>, string> = {
      valid: theme.colors.yellow,
      invalid: theme.colors.red,
      'arg-path': theme.colors.green,
      'arg-string': theme.colors.cyan,
      flag: theme.colors.orange,
      pipe: theme.colors.purple,
      plain: theme.colors.text,
    }

    const cmdToken = value.split(/\s+/)[0] ?? ''
    const cmdColor =
      value.length > 0 ? tokenColorMap[classifyToken(cmdToken, 0)] : theme.colors.text

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter') {
        e.preventDefault()
        onSubmit()
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        onArrowUp()
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        onArrowDown()
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        if (suggestion) onChange(suggestion)
      }
      if (e.key === 'ArrowRight' && ghostText) {
        e.preventDefault()
        const nextSpace = suggestion.indexOf(' ', value.length)
        onChange(nextSpace === -1 ? suggestion : suggestion.slice(0, nextSpace + 1))
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault()
        onClear()
      }
      if (e.ctrlKey && e.key.toLowerCase() === 'c') {
        e.preventDefault()
        onChange('')
      }
    }

    return (
      <InputWrapper>
        <VisualLayer aria-hidden>
          <TypedPart style={{ color: cmdColor }}>{value}</TypedPart>
          <GhostPart>{ghostText}</GhostPart>
        </VisualLayer>
        <RealInput
          ref={ref}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          autoCapitalize="none"
        />
      </InputWrapper>
    )
  },
)

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`

const VisualLayer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
  font-family: inherit;
  font-size: 13px;
  white-space: pre;
`

const TypedPart = styled.span``

const GhostPart = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  opacity: 0.7;
`

const RealInput = styled.input`
  position: relative;
  flex: 1;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: transparent;
  caret-color: ${({ theme }) => theme.colors.red};
  font-family: inherit;
  font-size: 13px;
  z-index: 1;

  &::selection {
    background: ${({ theme }) => theme.colors.selection};
    color: transparent;
  }
`
