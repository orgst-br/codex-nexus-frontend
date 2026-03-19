import styled from 'styled-components'

type AvatarColor = 'cyan' | 'purple' | 'blue' | 'yellow' | 'orange' | 'green'
type StatVariant = 'processes' | 'founders' | 'mentors' | 'mentees' | 'commits'
type MemberRole = 'founder' | 'mentor' | 'mentee' | 'maintainer'

const AVATAR_COLORS: Record<AvatarColor, { bg: string; border: string; text: string }> = {
  cyan: { bg: 'rgba(95,179,179,0.12)', border: '#5FB3B3', text: '#5FB3B3' },
  purple: { bg: 'rgba(197,148,197,0.12)', border: '#C594C5', text: '#C594C5' },
  blue: { bg: 'rgba(102,153,204,0.12)', border: '#6699CC', text: '#6699CC' },
  yellow: { bg: 'rgba(250,200,99,0.12)', border: '#FAC863', text: '#FAC863' },
  orange: { bg: 'rgba(249,145,87,0.12)', border: '#F99157', text: '#F99157' },
  green: { bg: 'rgba(153,199,148,0.12)', border: '#99C794', text: '#99C794' },
}

const STAT_COLORS: Record<StatVariant, string> = {
  processes: '#D8DEE9',
  founders: '#FAC863',
  mentors: '#6699CC',
  mentees: '#5FB3B3',
  commits: '#99C794',
}

const ROLE_COLORS: Record<MemberRole, { bg: string; text: string }> = {
  founder: { bg: 'rgba(250,200,99,0.12)', text: '#FAC863' },
  mentor: { bg: 'rgba(102,153,204,0.12)', text: '#6699CC' },
  mentee: { bg: 'rgba(95,179,179,0.12)', text: '#5FB3B3' },
  maintainer: { bg: 'rgba(197,148,197,0.12)', text: '#C594C5' },
}

export const Wrapper = styled.div`
  padding: 28px 32px;
  height: 100%;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.text};

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`

export const Header = styled.div`
  margin-bottom: 20px;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
`

export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.bright};
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
`

export const PageCommand = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
  margin-bottom: 14px;
`

export const StatBar = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px 14px;
  background: rgba(52, 61, 70, 0.4);
  border-radius: 6px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  font-size: 11px;
  flex-wrap: wrap;
`

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const StatDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.green};
  flex-shrink: 0;
`

export const StatNumber = styled.span<{ $variant: StatVariant }>`
  color: ${({ $variant }) => STAT_COLORS[$variant]};
  font-weight: 600;
`

export const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`

export const FilterBar = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
`

export const SearchWrap = styled.div`
  position: relative;
  flex: 1;
  min-width: 160px;
`

export const GrepLabel = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.cyan};
  font-size: 12px;
  pointer-events: none;
`

export const GrepInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 7px 12px 7px 42px;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 12px;
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.cyan};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.border};
  }
`

export const FilterTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

export const FilterTag = styled.button<{ $active: boolean }>`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 10px;
  border: 0.5px solid ${({ $active, theme }) => ($active ? theme.colors.cyan : theme.colors.border)};
  color: ${({ $active, theme }) => ($active ? theme.colors.cyan : theme.colors.muted)};
  background: ${({ $active }) => ($active ? 'rgba(95,179,179,0.1)' : 'transparent')};
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.text};
  }
`

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const CardWrapper = styled.div<{ $isYou: boolean; $online: boolean }>`
  border: 0.5px solid ${({ $isYou, theme }) => ($isYou ? theme.colors.cyan : theme.colors.border)};
  border-radius: 10px;
  padding: 20px;
  background: rgba(52, 61, 70, 0.12);
  transition: border-color 0.2s;
  position: relative;
  opacity: ${({ $online }) => ($online ? 1 : 0.8)};

  &:hover {
    border-color: ${({ $isYou, theme }) => ($isYou ? theme.colors.cyan : theme.colors.cyan)};
  }
`

export const Pid = styled.span`
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.border};
  letter-spacing: 0.5px;
`

export const PidYou = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`

export const CardTop = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 12px;
`

export const AvatarWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`

export const AvatarInitials = styled.div<{ $color: AvatarColor }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  border: 1.5px solid ${({ $color }) => AVATAR_COLORS[$color].border};
  background: ${({ $color }) => AVATAR_COLORS[$color].bg};
  color: ${({ $color }) => AVATAR_COLORS[$color].text};
`

export const AvatarImg = styled.img<{ $color: AvatarColor }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.5px solid ${({ $color }) => AVATAR_COLORS[$color].border};
`

export const OnlineIndicator = styled.div<{ $online: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  border: 1.5px solid ${({ theme }) => theme.colors.background};
  background: ${({ $online, theme }) => ($online ? theme.colors.green : theme.colors.border)};
`

export const CardBio = styled.div`
  flex: 1;
  min-width: 0;
`

export const CardName = styled.div<{ $online: boolean }>`
  font-size: 15px;
  font-weight: 600;
  color: ${({ $online, theme }) => ($online ? theme.colors.bright : theme.colors.text)};
  margin-bottom: 4px;
`

export const CardRoles = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 8px;
`

export const RoleBadge = styled.span<{ $role: MemberRole }>`
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 10px;
  letter-spacing: 0.3px;
  background: ${({ $role }) => ROLE_COLORS[$role].bg};
  color: ${({ $role }) => ROLE_COLORS[$role].text};
`

export const Bio = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`

export const CardBottom = styled.div`
  border-top: 0.5px solid rgba(79, 91, 102, 0.4);
  padding-top: 12px;
`

export const CardSkills = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`

export const Skill = styled.span`
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 10px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 0.5px solid rgba(79, 91, 102, 0.5);
`

export const ContribGraph = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 12px;
`

export const ContribBox = styled.div<{ $opacity: number }>`
  width: 8px;
  height: 8px;
  border-radius: 1.5px;
  background: ${({ theme }) => theme.colors.green};
  opacity: ${({ $opacity }) => Math.max(0.1, $opacity * 0.9)};
  flex-shrink: 0;
`

export const ContribCount = styled.span<{ $zero: boolean }>`
  font-size: 10px;
  color: ${({ $zero, theme }) => ($zero ? theme.colors.border : theme.colors.muted)};
  margin-left: 6px;
  white-space: nowrap;
`

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`

export const CardLinks = styled.div`
  display: flex;
  gap: 12px;
  font-size: 11px;
`

export const CardLink = styled.a`
  color: ${({ theme }) => theme.colors.cyan};
  text-decoration: none;
  transition: opacity 0.15s;

  &:hover {
    text-decoration: underline;
  }
`

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const Uptime = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.border};
`

export const ManButton = styled.button`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.muted};
  background: transparent;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 3px 10px;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.cyan};
  }
`

export const CtaCard = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 28px 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.green};
  }
`

export const CtaIcon = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 8px;
`

export const CtaCommand = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.green};
  margin-bottom: 4px;
`

export const CtaText = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.muted};
`
