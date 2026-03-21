'use client'

import { useState } from 'react'

import {
  AvatarImg,
  AvatarInitials,
  AvatarWrap,
  Bio,
  CardBio,
  CardBottom,
  CardFooter,
  CardLink,
  CardLinks,
  CardMeta,
  CardName,
  CardRoles,
  CardSkills,
  CardTop,
  CardWrapper,
  ContribBox,
  ContribCount,
  ContribGraph,
  Feed,
  FilterBar,
  FilterTag,
  FilterTags,
  GrepInput,
  GrepLabel,
  Header,
  ManButton,
  OnlineIndicator,
  PageCommand,
  PageTitle,
  Pid,
  PidYou,
  RoleBadge,
  SearchWrap,
  Skill,
  StatBar,
  StatDot,
  StatItem,
  StatLabel,
  StatNumber,
  Subtitle,
  TitleRow,
  Uptime,
  Wrapper,
} from './MemberCard.styles'

type MemberRole = 'founder' | 'mentor' | 'mentee' | 'maintainer'

type Member = {
  pid: number
  name: string
  initials: string
  avatarUrl?: string
  avatarColor: 'cyan' | 'purple' | 'blue' | 'yellow' | 'orange' | 'green'
  roles: MemberRole[]
  bio: string
  skills: string[]
  commits: number
  weeklyContribs: number[]
  uptimeDays: number
  online: boolean
  github?: string
  linkedin?: string
  portfolio?: string
}

const MOCK_MEMBERS: Member[] = [
  {
    pid: 1,
    name: 'Saphira Cardoso',
    initials: 'SCX',
    avatarColor: 'purple',
    roles: ['founder', 'mentor'],
    bio: 'Someone who loves questioning the "why" and "how" of almost everything!',
    skills: ['Python', 'GraphQL', 'Next.js', 'Data Analysis'],
    commits: 67,
    weeklyContribs: [0.5, 0.6, 0.8, 0.9, 0.7, 0.5, 0.8, 0.6, 0.9, 0.7, 0.8, 0.9],
    uptimeDays: 127,
    online: true,
    github: 'https://github.com/saphiraxx',
    linkedin: 'https://linkedin.com/in/saphira-cardoso/',
    portfolio: 'https://saphira.dev',
  },
  {
    pid: 2,
    name: 'Tiago Monteiro',
    initials: 'TM',
    avatarColor: 'blue',
    roles: ['founder', 'mentor'],
    bio: 'Engenheiro de software apaixonado por ensinar e construir comunidades dev.',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    commits: 42,
    weeklyContribs: [0.1, 0.3, 0.5, 0.2, 0.8, 0.9, 0.6, 0.4, 0.7, 0.3, 0.5, 0.9],
    uptimeDays: 142,
    online: true,
    github: 'https://github.com/Tiago-Monteirox',
    linkedin: 'https://linkedin.com/in/tiago-monteiro-e-silva-798300241/',
    portfolio: 'https://tiago.dev',
  },
  {
    pid: 3,
    name: 'Voluntario Dev',
    initials: 'VD',
    avatarColor: 'cyan',
    roles: ['mentee'],
    bio: 'Esse card pode ser seu! Contribua com o projeto e crie seu perfil.',
    skills: ['JavaScript', 'HTML/CSS'],
    commits: 0,
    weeklyContribs: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
    uptimeDays: 3,
    online: false,
    github: 'https://github.com/orgst-br/codex-nexus-frontend',
    linkedin: 'https://linkedin.com/in/',
  },
]

const ROLE_ORDER: Record<MemberRole, number> = { founder: 0, mentor: 1, maintainer: 2, mentee: 3 }

function sortMembers(members: Member[]): Member[] {
  return [...members].sort((a, b) => {
    const aRank = Math.min(...a.roles.map(r => ROLE_ORDER[r]))
    const bRank = Math.min(...b.roles.map(r => ROLE_ORDER[r]))
    if (aRank !== bRank) return aRank - bRank
    return a.name.localeCompare(b.name)
  })
}

type FilterRole = 'all' | 'founders' | 'mentors' | 'mentees'

const FILTER_MAP: Record<FilterRole, MemberRole | null> = {
  all: null,
  founders: 'founder',
  mentors: 'mentor',
  mentees: 'mentee',
}

const STATS = {
  processes: MOCK_MEMBERS.length,
  founders: MOCK_MEMBERS.filter(m => m.roles.includes('founder')).length,
  mentors: MOCK_MEMBERS.filter(m => m.roles.includes('mentor') && !m.roles.includes('founder'))
    .length,
  mentees: MOCK_MEMBERS.filter(m => m.roles.includes('mentee')).length,
  commits: MOCK_MEMBERS.reduce((acc, m) => acc + m.commits, 0),
}

const CURRENT_USER_PID: number | null = null

export function MemberCard() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterRole>('all')

  const sorted = sortMembers(MOCK_MEMBERS)

  const filtered = sorted.filter(m => {
    const roleFilter = FILTER_MAP[activeFilter]
    if (roleFilter && !m.roles.includes(roleFilter)) return false
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <Wrapper>
      <Header>
        <TitleRow>
          <PageTitle>
            {'>'} <PageCommand>ps aux</PageCommand> --community
          </PageTitle>
        </TitleRow>
        <Subtitle>// listing active processes on the orgst network</Subtitle>
        <StatBar>
          <StatItem>
            <StatDot />
            <StatNumber $variant="processes">{STATS.processes}</StatNumber>
            <StatLabel>processes</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber $variant="founders">{STATS.founders}</StatNumber>
            <StatLabel>founders</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber $variant="mentors">{STATS.mentors}</StatNumber>
            <StatLabel>mentors</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber $variant="mentees">{STATS.mentees}</StatNumber>
            <StatLabel>mentees</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber $variant="commits">{STATS.commits}</StatNumber>
            <StatLabel>total commits</StatLabel>
          </StatItem>
        </StatBar>
      </Header>

      <FilterBar>
        <SearchWrap>
          <GrepLabel>grep</GrepLabel>
          <GrepInput
            type="text"
            placeholder="search members..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </SearchWrap>
        <FilterTags>
          {(['all', 'founders', 'mentors', 'mentees'] as FilterRole[]).map(f => (
            <FilterTag key={f} $active={activeFilter === f} onClick={() => setActiveFilter(f)}>
              {f}
            </FilterTag>
          ))}
        </FilterTags>
      </FilterBar>

      <Feed>
        {filtered.map(member => {
          const isYou = member.pid === CURRENT_USER_PID
          const maxContrib = Math.max(...member.weeklyContribs, 0.1)
          return (
            <CardWrapper key={member.pid} $isYou={isYou} $online={member.online}>
              <Pid>
                PID {String(member.pid).padStart(3, '0')}
                {isYou && <PidYou> // you</PidYou>}
              </Pid>

              <CardTop>
                <AvatarWrap>
                  {member.avatarUrl ? (
                    <AvatarImg
                      src={member.avatarUrl}
                      alt={member.name}
                      $color={member.avatarColor}
                    />
                  ) : (
                    <AvatarInitials $color={member.avatarColor}>{member.initials}</AvatarInitials>
                  )}
                  <OnlineIndicator $online={member.online} />
                </AvatarWrap>

                <CardBio>
                  <CardName $online={member.online}>{member.name}</CardName>
                  <CardRoles>
                    {member.roles.map(r => (
                      <RoleBadge key={r} $role={r}>
                        {r}
                      </RoleBadge>
                    ))}
                  </CardRoles>
                  <Bio>{member.bio}</Bio>
                </CardBio>
              </CardTop>

              <CardBottom>
                <CardSkills>
                  {member.skills.map(s => (
                    <Skill key={s}>{s}</Skill>
                  ))}
                </CardSkills>

                <ContribGraph>
                  {member.weeklyContribs.map((w, i) => (
                    <ContribBox key={i} $opacity={w / maxContrib} />
                  ))}
                  <ContribCount $zero={member.commits === 0}>
                    {member.commits} commit{member.commits !== 1 ? 's' : ''}
                  </ContribCount>
                </ContribGraph>

                <CardFooter>
                  <CardLinks>
                    {member.github && (
                      <CardLink href={member.github} target="_blank" rel="noopener noreferrer">
                        -{'>'} GitHub
                      </CardLink>
                    )}
                    {member.linkedin && (
                      <CardLink href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        -{'>'} LinkedIn
                      </CardLink>
                    )}
                    {member.portfolio && (
                      <CardLink href={member.portfolio} target="_blank" rel="noopener noreferrer">
                        -{'>'} Portfolio
                      </CardLink>
                    )}
                  </CardLinks>
                  <CardMeta>
                    <Uptime>uptime: {member.uptimeDays}d</Uptime>
                    <ManButton type="button">
                      man {member.name.split(' ')[0]?.toLowerCase()}
                    </ManButton>
                  </CardMeta>
                </CardFooter>
              </CardBottom>
            </CardWrapper>
          )
        })}
      </Feed>
    </Wrapper>
  )
}
