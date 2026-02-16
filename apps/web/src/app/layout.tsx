import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { StyledComponentsRegistry } from '@/shared/lib/registry'
import { AppProviders } from '@/shared/providers'

export const metadata: Metadata = {
  title: 'Orgst — Comunidade Dev',
  description: 'Plataforma open-source da comunidade de mentoria dev Orgst',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <AppProviders>{children}</AppProviders>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
