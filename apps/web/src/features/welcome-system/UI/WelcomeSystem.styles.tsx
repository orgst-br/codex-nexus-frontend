import styled, { keyframes } from 'styled-components'

import type { LogLevel } from './WelcomeSystem'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
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

export const MessageStatus = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
`

export const StatusValue = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  animation: ${blink} 1.2s step-start infinite;
`

export const Footer = styled.div`
  padding: 12px 28px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`

export const TermIcon = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 18px;
  opacity: 0.6;
`
