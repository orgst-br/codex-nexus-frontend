'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

import { CommunityTerminal } from '@/features/community-terminal/UI/CommunityTerminal'

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Container>
      <TerminalPanel $collapsed={collapsed}>
        <CommunityTerminal onCollapse={() => setCollapsed(true)} />
      </TerminalPanel>

      {collapsed && (
        <ExpandButton onClick={() => setCollapsed(false)} title="Expand terminal">
          ▶
        </ExpandButton>
      )}

      <ContentPanel>{children}</ContentPanel>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`

const TerminalPanel = styled.aside<{ $collapsed: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? '0' : '40%')};
  min-width: ${({ $collapsed }) => ($collapsed ? '0' : '320px')};
  flex-shrink: 0;
  overflow: hidden;
  transition:
    width 0.25s ease,
    min-width 0.25s ease;

  @media (max-width: 768px) {
    display: none;
  }
`

const ExpandButton = styled.button`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: none;
  border-radius: 0 4px 4px 0;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 10px;
  padding: 10px 5px;
  cursor: pointer;
  writing-mode: vertical-rl;
  letter-spacing: 1px;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`

const ContentPanel = styled.main`
  flex: 1;
  overflow-y: auto;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
`
