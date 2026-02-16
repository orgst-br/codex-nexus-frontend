'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { SplitLayout } from '@/shared/components/SplitLayout'

import { MemberCardContent } from './member-card/MemberCardContent'

export default function HomePage() {
  const router = useRouter()
  const [activeRoute, setActiveRoute] = useState<string | null>(null)

  const handleRoute = (route: string | null) => {
    setActiveRoute(route)
    if (route) {
      router.push(route, { scroll: false })
    } else {
      router.push('/', { scroll: false })
    }
  }

  return (
    <SplitLayout activeRoute={activeRoute} onRoute={handleRoute}>
      {activeRoute === '/member-card' && <MemberCardContent />}
    </SplitLayout>
  )
}
