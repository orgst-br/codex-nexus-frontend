'use client'

import styled, { keyframes } from 'styled-components'

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
`

const Terminal = styled.div`
  max-width: 600px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Dot = styled.span<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`

const TerminalTitle = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  margin-left: 8px;
`

const TerminalBody = styled.div`
  padding: 24px;
`

const Line = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
`

const Prompt = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`

const Command = styled.span`
  color: ${({ theme }) => theme.colors.text};
`

const Output = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background: ${({ theme }) => theme.colors.primary};
  animation: ${blink} 1s step-end infinite;
  vertical-align: text-bottom;
  margin-left: 4px;
`

export default function HomePage() {
  return (
    <Container>
      <Terminal>
        <TerminalHeader>
          <Dot $color="#ff5f56" />
          <Dot $color="#ffbd2e" />
          <Dot $color="#27c93f" />
          <TerminalTitle>orgst@community:~</TerminalTitle>
        </TerminalHeader>
        <TerminalBody>
          <Line>
            <Prompt>$ </Prompt>
            <Command>cat welcome.txt</Command>
          </Line>
          <Line>
            <Output>Bem-vindo ao </Output>
            <Highlight>Orgst</Highlight>
          </Line>
          <Line>
            <Output>Plataforma da comunidade de mentoria dev.</Output>
          </Line>
          <br />
          <Line>
            <Prompt>$ </Prompt>
            <Command>ls ./features</Command>
          </Line>
          <Line>
            <Highlight>member-card/</Highlight>
            <Output> profiles/ projects/ docs/</Output>
          </Line>
          <br />
          <Line>
            <Prompt>$ </Prompt>
            <Cursor />
          </Line>
        </TerminalBody>
      </Terminal>
    </Container>
  )
}
