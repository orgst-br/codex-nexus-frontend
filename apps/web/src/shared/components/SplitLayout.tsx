'use client'

import styled from 'styled-components'

import { Terminal } from './Terminal'

type Props = {
  activeRoute: string | null
  onRoute: (route: string | null) => void
  children?: React.ReactNode
}

export function SplitLayout({ activeRoute, onRoute, children }: Props) {
  return (
    <Container>
      <TerminalPanel $hasRoute={!!activeRoute}>
        <Terminal onRoute={onRoute} />
      </TerminalPanel>
      {activeRoute && (
        <ContentPanel>
          <PanelHeader>
            <Dot $color="#ff5f56" />
            <Dot $color="#ffbd2e" />
            <Dot $color="#27c93f" />
            <PanelTitle>{activeRoute.replace('/', '')}</PanelTitle>
          </PanelHeader>
          <PanelBody>{children}</PanelBody>
        </ContentPanel>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`

const TerminalPanel = styled.div<{ $hasRoute: boolean }>`
  width: ${({ $hasRoute }) => ($hasRoute ? '40%' : '100%')};
  min-width: 320px;
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    width: ${({ $hasRoute }) => ($hasRoute ? '0' : '100%')};
    min-width: ${({ $hasRoute }) => ($hasRoute ? '0' : '100%')};
    overflow: hidden;
  }
`

const ContentPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 768px) {
    width: 100%;
  }
`

const PanelHeader = styled.div`
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

const PanelTitle = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  margin-left: 8px;
`

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`
