'use client'

import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  padding: 48px 24px;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  margin-bottom: 8px;

  &::before {
    content: '> ';
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
`

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 24px;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: 600;
`

const Name = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  margin-bottom: 2px;
`

const Role = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 12px;
`

const Bio = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  margin-bottom: 16px;
  line-height: 1.5;
`

const Links = styled.div`
  display: flex;
  gap: 12px;
`

const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &::before {
    content: '→ ';
  }
`

const MOCK_MEMBERS = [
  {
    name: 'Tiago Monteiro',
    initials: 'TM',
    role: 'co-founder / mentor',
    bio: 'Engenheiro de software apaixonado por ensinar e construir comunidades dev.',
    github: 'https://github.com/Tiago-Monteirox',
    linkedin: 'https://linkedin.com/in/',
  },
  {
    name: 'Saphira Xavier',
    initials: 'SX',
    role: 'co-founder / dev',
    bio: 'Desenvolvedora frontend em constante evolução. Apaixonada por open-source.',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
  },
  {
    name: 'Voluntario Dev',
    initials: 'VD',
    role: 'mentorado',
    bio: 'Esse card pode ser seu! Contribua com o projeto e crie seu perfil.',
    github: 'https://github.com/orgst/codex-nexus',
    linkedin: 'https://linkedin.com/in/',
  },
]

export default function MemberCardPage() {
  return (
    <Container>
      <Header>
        <Title>Cracha da Comunidade</Title>
        <Subtitle>// membros da comunidade orgst</Subtitle>
      </Header>
      <Grid>
        {MOCK_MEMBERS.map(member => (
          <Card key={member.name}>
            <CardHeader>
              <Avatar>{member.initials}</Avatar>
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
    </Container>
  )
}
