import 'styled-components'

import type { AppTheme } from '@/shared/providers/ThemeProvider'

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
