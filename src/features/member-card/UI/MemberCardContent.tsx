'use client'

import styled from 'styled-components'

const AVATAR_COLORS = ['#FF6AC1', '#B392F0', '#00D4FF', '#27C93F', '#FF9D00', '#FF4757'] as const

const MOCK_MEMBERS = [
  {
    name: 'Tiago Monteiro',
    initials: 'TM',
    role: 'co-founder / software engineer / mentor',
    bio: 'Engenheiro de software apaixonado por ensinar e construir comunidades dev.',
    github: 'https://github.com/Tiago-Monteirox',
    linkedin: 'https://linkedin.com/in/tiago-monteiro-e-silva-798300241/',
  },
  {
    name: 'Saphira Xavier',
    initials: 'SX',
    role: 'co-founder / software engineer / mentor',
    bio: 'Someone who loves questioning the "why" and "how" of almost everything!',
    github: 'https://github.com/saphiraxx',
    linkedin: 'https://linkedin.com/in/saphira-cardoso/',
  },
  {
    name: 'Voluntário Dev',
    initials: 'VD',
    role: 'mentorado',
    bio: 'Esse card pode ser seu! Contribua com o projeto e crie seu perfil.',
    github: 'https://github.com/orgst-br/codex-nexus-frontend',
    linkedin: 'https://linkedin.com/in/',
  },
]

export function MemberCardContent() {
  return (
    <Wrapper>
      <Header>
        <Title>Crachá</Title>
        <Subtitle>// membros da comunidade orgst</Subtitle>
      </Header>
      <Grid>
        {MOCK_MEMBERS.map((member, i) => (
          <Card key={member.name}>
            <CardHeader>
              <Avatar $color={AVATAR_COLORS[i % AVATAR_COLORS.length] ?? '#FF9D00'}>
                {member.initials}
              </Avatar>
              <div>
                <Name>{member.name}</Name>
                <Role>{member.role}</Role>
              </div>
            </CardHeader>
            <Bio>{member.bio}</Bio>
            <Links>
              <Link href={member.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>
              <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </Link>
            </Links>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px 0;
`

const Header = styled.div`
  margin-bottom: 32px;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  margin-bottom: 4px;

  &::before {
    content: '> ';
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
`

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  padding: 20px;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`

const Avatar = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $color }) => $color}22;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
  font-size: 14px;
  font-weight: 600;
  border: 1px solid ${({ $color }) => $color}44;
`

const Name = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  margin-bottom: 2px;
`

const Role = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 11px;
`

const Bio = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  margin-bottom: 12px;
  line-height: 1.5;
`

const Links = styled.div`
  display: flex;
  gap: 12px;
`

const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 11px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &::before {
    content: '→ ';
  }
`
