'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { SplitLayout } from '@/shared/components/SplitLayout'

import { MemberCardContent } from './MemberCardContent'

export default function MemberCardPage() {
  const router = useRouter()
  const [activeRoute, setActiveRoute] = useState<string | null>('/member-card')

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
