import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 8px 0;
`

export const Header = styled.div`
  margin-bottom: 32px;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  margin-bottom: 4px;

  &::before {
    content: '> ';
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
`

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  padding: 20px;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`

export const Avatar = styled.div<{ $color: string }>`
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

export const Name = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  margin-bottom: 2px;
`

export const Role = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 11px;
`

export const Bio = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  margin-bottom: 12px;
  line-height: 1.5;
`

export const Links = styled.div`
  display: flex;
  gap: 12px;
`

export const Link = styled.a`
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
