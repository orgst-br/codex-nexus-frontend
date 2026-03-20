import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 40px 24px;
  animation: ${fadeIn} 0.25s ease;
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.colors.text};
`

export const Header = styled.div`
  margin-bottom: 28px;
`

export const Command = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
`

export const Subtitle = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 6px;
`

export const LastSessionBox = styled.div`
  background: rgba(52, 61, 70, 0.4);
  border: 0.5px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 24px;
`

export const LastSessionLabel = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.border};
  letter-spacing: 0.5px;
  margin-bottom: 10px;
`

export const LastSessionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.75;
  }
`

export const SessionAvatar = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  flex-shrink: 0;
  background: ${({ $color }) => `${$color}1a`};
  border: 1.5px solid ${({ $color }) => $color};
  color: ${({ $color }) => $color};
`

export const SessionInfo = styled.div`
  flex: 1;
  min-width: 0;
`

export const SessionName = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.bright};
`

export const SessionMeta = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 1px;
`

export const SessionArrow = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.border};
`

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 24px;
`

export const OrLine = styled.div`
  flex: 1;
  height: 0.5px;
  background: ${({ theme }) => theme.colors.surface};
`

export const OrText = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.border};
  letter-spacing: 1px;
  white-space: nowrap;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const FieldHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Label = styled.label`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.3px;
`

export const LabelHint = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.muted};
`

export const InputWrap = styled.div<{ $error?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border: 0.5px solid ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.border)};
  border-radius: 6px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:hover {
    border-color: ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.muted)};
  }

  &:focus-within {
    border-color: ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.accent)};
    box-shadow: 0 0 0 1px
      ${({ theme, $error }) => ($error ? `${theme.colors.error}26` : `${theme.colors.accent}26`)};
  }
`

export const InputPrompt = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.accent};
  font-size: 13px;
  pointer-events: none;
  user-select: none;
`

export const Input = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.bright};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  padding: 11px 12px 11px 28px;
  width: 100%;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.border};
  }
`

export const ToggleVisibility = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  line-height: 1;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const ForgotLink = styled.a`
  display: block;
  text-align: right;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 4px;
  cursor: pointer;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.mono};
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export const ValidationMsg = styled.div<{ $type: 'error' | 'success' }>`
  font-size: 11px;
  padding-left: 4px;
  color: ${({ theme, $type }) => ($type === 'error' ? theme.colors.error : theme.colors.success)};
`

export const GlobalError = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
  background: ${({ theme }) => `${theme.colors.error}14`};
  border: 0.5px solid ${({ theme }) => `${theme.colors.error}40`};
  border-radius: 6px;
  padding: 10px 14px;
  line-height: 1.6;
`

export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  letter-spacing: 0.3px;
  margin-top: 4px;
  transition:
    background 0.15s,
    transform 0.1s;

  &:hover:not(:disabled) {
    background: #6ec4c4;
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

export const Footer = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
