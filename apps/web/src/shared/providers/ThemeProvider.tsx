'use client'

import type { ReactNode } from 'react'
import { createGlobalStyle, ThemeProvider as SCThemeProvider } from 'styled-components'

export const theme = {
  colors: {
    primary: '#eebc01',
    secondary: '#27C93F',
    accent: '#00D4FF',
    background: '#1A1B26',
    surface: '#1E1F2B',
    text: '#E0E0E0',
    textSecondary: '#8B949E',
    border: '#30363D',
    pink: '#FF6AC1',
    purple: '#B392F0',
    orange: '#FF9D00',
    success: '#27C93F',
    error: '#FF4757',
    warning: '#FFA502',
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
