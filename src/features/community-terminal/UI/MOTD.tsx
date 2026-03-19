'use client'

import { useRef } from 'react'
import styled, { keyframes } from 'styled-components'

const FORTUNES = [
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"Simplicity is the soul of efficiency." — Austin Freeman',
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
]

function getGreeting(): string {
  const h = new Date().getHours()
  if (h >= 6 && h < 12) return 'Good morning, dev. Coffee loaded. ☕'
  if (h >= 12 && h < 18) return 'Afternoon push incoming. Stay focused. 💪'
  if (h >= 18 && h < 23) return 'Late night debugging? Respect. 🌙'
  return "You're still here? That's commitment. Or insomnia. 🦉"
}

interface MOTDProps {
  username?: string | undefined
  isFirstVisit?: boolean | undefined
  membersOnline?: number | undefined
  openIssues?: number | undefined
}

export function MOTD({
  username,
  isFirstVisit = true,
  membersOnline = 0,
  openIssues = 0,
}: MOTDProps) {
  const today = new Date().toLocaleDateString('en-CA')
  const fortuneRef = useRef(FORTUNES[Math.floor(Math.random() * FORTUNES.length)]!)
  const fortune = fortuneRef.current
  const greeting = getGreeting()

  const welcomeMsg = isFirstVisit
    ? 'Welcome to the inner circle.\nYou were invited to join Orgst.'
    : `Welcome back, ${username ?? 'dev'}.\nLast login: ${today}`

  return (
    <Card>
      <Label>// SYSTEM_MESSAGE</Label>
      <Greeting>{greeting}</Greeting>
      <Divider />
      {welcomeMsg.split('\n').map((line, i) => (
        <Line key={i}>{line}</Line>
      ))}
      <Spacer />
      <Line>Your journey starts with a single</Line>
      <Line>commit. Type &apos;help&apos; to see what&apos;s possible.</Line>
      <Spacer />
      <Quote>{fortune}</Quote>
      <Spacer />
      <Stat>
        Today&apos;s date: <StatVal>{today}</StatVal>
      </Stat>
      {membersOnline > 0 && (
        <Stat>
          Members online: <StatVal>{membersOnline}</StatVal>
        </Stat>
      )}
      {openIssues > 0 && (
        <Stat>
          Open issues: <StatVal>{openIssues}</StatVal>
        </Stat>
      )}
    </Card>
  )
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: ${fadeIn} 0.4s ease forwards;
`

const Label = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 11px;
  margin-bottom: 6px;
`

const Greeting = styled.div`
  color: ${({ theme }) => theme.colors.cyan};
  font-size: 12px;
`

const Divider = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 6px 0;
`

const Line = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
`

const Quote = styled.div`
  color: ${({ theme }) => theme.colors.purple};
  font-style: italic;
  font-size: 11px;
  line-height: 1.5;
`

const Spacer = styled.div`
  height: 6px;
`

const Stat = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 11px;
`

const StatVal = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`
