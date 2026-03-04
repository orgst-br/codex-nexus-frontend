'use client'

import styled from 'styled-components'

import { ProfileRegister } from '@/features/auth-profile-register/UI/ProfileRegister'
import { WelcomeSystem } from '@/features/welcome-system/UI/WelcomeSystem'

export function WelcomeRegisterPage() {
  return (
    <Container>
      <LeftPanel>
        <WelcomeSystem />
      </LeftPanel>
      <RightPanel>
        <ProfileRegister />
      </RightPanel>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`

const LeftPanel = styled.aside`
  width: 42%;
  min-width: 320px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`

const RightPanel = styled.main`
  flex: 1;
  overflow-y: auto;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
`
