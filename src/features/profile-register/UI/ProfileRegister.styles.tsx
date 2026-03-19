import styled, { css, keyframes } from 'styled-components'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 32px 36px;
  height: 100%;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.mono};

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
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 4px;
`

export const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`

export const HeaderCaret = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.bright};
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
  line-height: 1;
`

export const HeaderCommand = styled.span`
  color: ${({ theme }) => theme.colors.bright};
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`

export const SubtitleBranch = styled.span`
  background: rgba(95, 179, 179, 0.12);
  color: ${({ theme }) => theme.colors.cyan};
  padding: 1px 8px;
  border-radius: 3px;
  font-size: 11px;
`

export const StepBars = styled.div<{ $asStrength?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ $asStrength }) => ($asStrength ? '3px' : '6px')};
  margin-top: ${({ $asStrength }) => ($asStrength ? '4px' : '8px')};
`

type StepState = 'active' | 'complete' | 'future' | 'strength'

const strengthColor = (level: number | undefined, theme: { colors: Record<string, string> }) => {
  if (!level) return theme.colors['surface']
  if (level <= 1) return theme.colors['red']
  if (level === 2) return theme.colors['orange']
  if (level === 3) return theme.colors['yellow']
  return theme.colors['green']
}

export const StepBar = styled.div<{ $state: StepState; $strengthLevel?: number }>`
  height: ${({ $state }) => ($state === 'strength' || $state === 'future' ? '2px' : '3px')};
  width: ${({ $state }) => ($state === 'strength' ? 'flex' : '32px')};
  flex: ${({ $state }) => ($state === 'strength' ? '1' : 'none')};
  border-radius: 2px;
  background: ${({ $state, $strengthLevel, theme }) => {
    if ($state === 'strength') return strengthColor($strengthLevel, theme)
    if ($state === 'active') return theme.colors.cyan
    if ($state === 'complete') return theme.colors.green
    return theme.colors.surface
  }};
`

export const SectionDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 28px 0 20px;
`

export const SectionLine = styled.div`
  flex: 1;
  height: 0.5px;
  background: ${({ theme }) => theme.colors.surface};
`

export const SectionText = styled.span`
  font-size: 10px;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
  white-space: nowrap;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  margin-bottom: 24px;
`

export const PortfolioField = styled(Field)`
  margin-bottom: 24px;
`

export const RowFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const FieldLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  letter-spacing: 0.3px;
`

export const CommandLabel = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`

export const FieldReq = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-size: 9px;
`

export const FieldHint = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 10px;
  margin-left: auto;
`

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.muted};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.cyan};
    box-shadow: 0 0 0 1px rgba(95, 179, 179, 0.15);
  }
`

export const InputPrompt = styled.span<{ $top?: boolean }>`
  color: ${({ theme }) => theme.colors.cyan};
  font-size: 13px;
  flex-shrink: 0;
  pointer-events: none;
  padding-left: 12px;
  ${({ $top }) =>
    $top &&
    css`
      padding-top: 11px;
      align-self: flex-start;
    `}
`

export const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 13px;
  padding: 10px 12px;
  caret-color: ${({ theme }) => theme.colors.cyan};

  &::placeholder {
    color: ${({ theme }) => theme.colors.border};
  }
`

export const IconToggle = styled.button<{ $color?: 'ok' | 'err' }>`
  background: none;
  border: none;
  cursor: ${({ as }) => (as === 'span' ? 'default' : 'pointer')};
  color: ${({ $color, theme }) =>
    $color === 'ok'
      ? theme.colors.green
      : $color === 'err'
        ? theme.colors.red
        : theme.colors.muted};
  font-size: 14px;
  padding: 0 12px 0 0;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.cyan};
  }
`

export const ValidationMsg = styled.div<{ $variant: 'ok' | 'err' | 'warn' }>`
  font-size: 11px;
  padding-left: 4px;
  color: ${({ $variant, theme }) => {
    if ($variant === 'ok') return theme.colors.green
    if ($variant === 'err') return theme.colors.red
    return theme.colors.orange
  }};
`

export const BioWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0;
  background: ${({ theme }) => theme.colors.surface};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 10px 12px 8px;
  position: relative;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.muted};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.cyan};
    box-shadow: 0 0 0 1px rgba(95, 179, 179, 0.15);
  }
`

export const StyledTextarea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 13px;
  resize: none;
  min-height: 72px;
  caret-color: ${({ theme }) => theme.colors.cyan};
  line-height: 1.6;
  padding: 0 0 20px 8px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.border};
  }
`

export const BioCounter = styled.span<{ $warn: boolean; $limit: boolean }>`
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 10px;
  color: ${({ $limit, $warn, theme }) => {
    if ($limit) return theme.colors.red
    if ($warn) return theme.colors.orange
    return theme.colors.border
  }};
`

export const PillGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

export const PillButton = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-family: inherit;
  border: 0.5px solid ${({ $active, theme }) => ($active ? theme.colors.cyan : theme.colors.border)};
  color: ${({ $active, theme }) => ($active ? theme.colors.cyan : theme.colors.muted)};
  background: ${({ $active }) => ($active ? 'rgba(95,179,179,0.12)' : 'transparent')};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
    color: ${({ theme }) => theme.colors.text};
  }
`

export const UploadZone = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.cyan};
  }
`

export const AvatarCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.cyan};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.cyan};
  font-size: 18px;
  background: rgba(95, 179, 179, 0.06);
  flex-shrink: 0;
  overflow: hidden;
`

export const AvatarPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`

export const UploadInfo = styled.div`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 12px;
  line-height: 1.6;

  span {
    color: ${({ theme }) => theme.colors.border};
    font-size: 11px;
  }
`

export const UploadLabel = styled.div`
  color: ${({ theme }) => theme.colors.cyan};
  font-size: 12px;
  margin-bottom: 2px;
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const TagInputArea = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 8px 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  min-height: 40px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.cyan};
  }
`

export const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 11px;
  background: rgba(95, 179, 179, 0.12);
  border: 0.5px solid rgba(95, 179, 179, 0.3);
  color: ${({ theme }) => theme.colors.cyan};
`

export const TagClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: 10px;
  opacity: 0.5;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`

export const TagInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 12px;
  outline: none;
  flex: 1;
  min-width: 80px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`

export const DiffBox = styled.div`
  background: rgba(52, 61, 70, 0.4);
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 20px;
  border: 0.5px solid ${({ theme }) => theme.colors.border};
`

export const DiffHeader = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.muted};
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`

export const DiffLine = styled.div`
  display: flex;
  gap: 8px;
  font-size: 12px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
`

export const DiffLinePlus = styled.span`
  color: ${({ theme }) => theme.colors.green};
  flex-shrink: 0;
`

export const DiffLineKey = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  flex-shrink: 0;
`

export const DiffLineVal = styled.span`
  color: ${({ theme }) => theme.colors.text};
`

export const DiffLineCyan = styled.span`
  color: ${({ theme }) => theme.colors.cyan};
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.cyan};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  letter-spacing: 0.3px;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.accent};
  }

  &:active:not(:disabled) {
    transform: scale(0.99);
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.muted};
    cursor: not-allowed;
  }
`

export const Spinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`
