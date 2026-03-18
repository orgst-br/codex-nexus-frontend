'use client'

import type { ReactNode } from 'react'
import styled from 'styled-components'

import { CommunityTerminal } from '@/features/community-terminal/UI/CommunityTerminal'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <Container>
      <TerminalPanel>
        <CommunityTerminal />
      </TerminalPanel>
      <ContentPanel>{children}</ContentPanel>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`

const TerminalPanel = styled.aside`
  width: 40%;
  min-width: 320px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`

const ContentPanel = styled.main`
  flex: 1;
  overflow-y: auto;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
`
