'use client'

import {
  Avatar,
  Bio,
  Card,
  CardHeader,
  Grid,
  Header,
  Link,
  Links,
  Name,
  Role,
  Subtitle,
  Title,
  Wrapper,
} from './MemberCard.styles'

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

export function MemberCard() {
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
