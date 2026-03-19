'use client'

import type { ReactNode } from 'react'
import { createGlobalStyle, ThemeProvider as SCThemeProvider } from 'styled-components'

export const theme = {
  colors: {
    background: '#1B2B34',
    surface: '#343D46',
    border: '#4F5B66',
    selection: '#4F5B66',

    text: '#A0AABB',
    textSecondary: '#7A8A96',
    bright: '#D8DEE9',
    muted: '#7A8A96',

    red: '#EC5F67',
    orange: '#F99157',
    yellow: '#FAC863',
    green: '#A8D8A0',
    cyan: '#6BC5C5',
    blue: '#7AABDC',
    purple: '#C594C5',

    primary: '#FAC863',
    accent: '#5FB3B3',
    success: '#99C794',
    error: '#EC5F67',
    warning: '#F99157',
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
