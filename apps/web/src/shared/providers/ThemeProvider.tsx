'use client'

import type { ReactNode } from 'react'
import { createGlobalStyle, ThemeProvider as SCThemeProvider } from 'styled-components'

export const theme = {
  colors: {
    primary: '#00ff41',
    secondary: '#00d4ff',
    accent: '#ff00ff',
    background: '#0d1117',
    surface: '#161b22',
    text: '#c9d1d9',
    textSecondary: '#8b949e',
    border: '#30363d',
    success: '#00ff41',
    error: '#ff4757',
    warning: '#ffa502',
  },
  fonts: {
    mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  },
} as const

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.mono};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};
  }
`

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <SCThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </SCThemeProvider>
  )
}

export type AppTheme = typeof theme
