import styled, { keyframes } from 'styled-components'

import type { LogLevel } from './CommunityTerminal'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const LEVEL_COLOR: Record<LogLevel, string> = {
  OK: '#27C93F',
  INFO: '#00D4FF',
  WARN: '#FFA502',
  ERR: '#FF4757',
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`

export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`

export const Dot = styled.span<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`

export const TitleText = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  margin-left: 8px;
`

export const Body = styled.div`
  flex: 1;
  overflow: hidden;
`

export const ScrollArea = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 24px 28px;

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

export const AsciiArt = styled.pre`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 13px;
  line-height: 1.35;
  white-space: pre;
`

export const Spacer = styled.div`
  height: 20px;
`

export const LogBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const LogLine = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  animation: ${fadeIn} 0.2s ease forwards;
`

export const Badge = styled.span<{ $level: LogLevel }>`
  color: ${({ $level }) => LEVEL_COLOR[$level]};
  font-size: 12px;
  white-space: nowrap;
  &::before {
    content: '[ ';
    color: #4a4f58;
  }
  &::after {
    content: ' ]';
    color: #4a4f58;
  }
`

export const LogMessage = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
`

export const PostBlock = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const PostLine = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 13px;
  animation: ${fadeIn} 0.2s ease forwards;
`

export const ProgressWrapper = styled.div`
  margin-top: 8px;
`

export const ProgressBar = styled.div`
  width: 240px;
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  overflow: hidden;
`

export const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 3px;
  transition: width 0.05s linear;
`

export const MessageCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: ${fadeIn} 0.4s ease forwards;
`

export const MessageLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
`

export const MessageText = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  line-height: 1.5;
`

// CLI section
export const CliBlock = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const PromptLine = styled.div`
  display: flex;
  align-items: center;
  min-height: 24px;
`

export const Prompt = styled.span`
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 13px;
`

export const User = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`

export const Host = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`

export const Command = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
`

export const OutputText = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  margin-bottom: 8px;
  padding-left: 4px;
`

export const CliForm = styled.form`
  display: flex;
`

export const CliInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 13px;
  caret-color: ${({ theme }) => theme.colors.primary};
`

export const WelcomeWrapper = styled.div`
  margin-bottom: 12px;
`

export const AsciiRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
`

export const PreTux = styled.pre`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 10px;
  }
`

export const PreLogo = styled.pre`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 10px;
  }
`

export const WelcomeText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  margin-bottom: 4px;
`

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`

export const Separator = styled.div`
  color: ${({ theme }) => theme.colors.border};
  margin: 8px 0;
`

export const HelpWrapper = styled.div`
  margin-bottom: 12px;
`

export const HelpTitle = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 13px;
  margin-bottom: 8px;
`

export const HelpLine = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 2px;
`

export const HelpCmd = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  min-width: 120px;
`

export const HelpDesc = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
`
