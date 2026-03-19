'use client'

import styled from 'styled-components'

export type PromptContext = 'lobby' | 'nexus' | 'registering' | 'mentoring'
export type PromptRole = 'mentee' | 'mentor' | 'admin'

interface TerminalPromptProps {
  context?: PromptContext | undefined
  username?: string | undefined
  branch?: string | undefined
  role?: PromptRole | undefined
}

const ROLE_ICON: Record<PromptRole, string> = {
  mentee: '',
  mentor: ' ⚡',
  admin: ' 🔑',
}

export function TerminalPrompt({
  context = 'lobby',
  username = 'newcomer',
  branch = 'main',
  role,
}: TerminalPromptProps) {
  const icon = role ? ROLE_ICON[role] : ''

  return (
    <PromptRow>
      <Seg1>orgst</Seg1>
      <Arrow $from="blue" $to="cyan">
        &#xe0b0;
      </Arrow>
      <Seg2>
        {context === 'lobby' ? 'newcomer' : username}@{context}
      </Seg2>
      <Arrow $from="cyan" $to="surface">
        &#xe0b0;
      </Arrow>
      <Seg3>
        {' '}
        {branch}
        {icon}
      </Seg3>
      <Arrow $from="surface" $to="transparent">
        &#xe0b0;
      </Arrow>
      <DollarSign>$</DollarSign>
    </PromptRow>
  )
}

type ColorKey = 'blue' | 'cyan' | 'surface'

const PromptRow = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  line-height: 1;
  flex-shrink: 0;
  user-select: none;
`

const Seg1 = styled.span`
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  padding: 2px 8px;
`

const Arrow = styled.span<{ $from: ColorKey | 'transparent'; $to: ColorKey | 'transparent' }>`
  color: ${({ $from, theme }) => ($from === 'transparent' ? 'transparent' : theme.colors[$from])};
  background: ${({ $to, theme }) => ($to === 'transparent' ? 'transparent' : theme.colors[$to])};
  font-size: 14px;
  line-height: 1;
`

const Seg2 = styled.span`
  background: ${({ theme }) => theme.colors.cyan};
  color: ${({ theme }) => theme.colors.background};
  padding: 2px 8px;
`

const Seg3 = styled.span`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.green};
  padding: 2px 8px;
`

const DollarSign = styled.span`
  color: ${({ theme }) => theme.colors.red};
  margin-left: 8px;
  margin-right: 6px;
  font-weight: 700;
`
