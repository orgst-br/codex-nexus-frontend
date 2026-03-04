import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const focusGlow = keyframes`
  from { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.3); }
  to   { box-shadow: 0 0 0 4px rgba(0, 212, 255, 0); }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 40px 48px;
  height: 100%;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.surface};

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
`

export const TitleRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`

export const Caret = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1;
`

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 11px;
  letter-spacing: 1.5px;
  font-weight: 500;
`

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  padding: 0 12px;
  background: ${({ theme }) => theme.colors.background};
  transition: border-color 0.15s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
    animation: ${focusGlow} 0.4s ease forwards;
  }
`

export const InputPrompt = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 13px;
  flex-shrink: 0;
`

export const StyledInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 13px;
  padding: 12px 0;
  caret-color: ${({ theme }) => theme.colors.accent};

  &::placeholder {
    color: ${({ theme }) => theme.colors.border};
  }
`

export const InputIcon = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  flex-shrink: 0;
`

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 16px;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export const BrowseButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 11px;
  letter-spacing: 1px;
  padding: 4px 10px;
  cursor: pointer;
  white-space: nowrap;
  transition:
    border-color 0.15s,
    color 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const TextareaRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.background};
  transition: border-color 0.15s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

export const TextareaPrompt = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 13px;
  flex-shrink: 0;
  padding-top: 1px;
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
  caret-color: ${({ theme }) => theme.colors.accent};
  line-height: 1.6;

  &::placeholder {
    color: ${({ theme }) => theme.colors.border};
  }
`

export const RowFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`

export const ForgotLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: inherit;
  font-size: 12px;
  text-decoration: underline;
  text-underline-offset: 3px;
  padding: 0;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const ExecuteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 14px 28px;
  cursor: pointer;
  transition:
    opacity 0.15s,
    transform 0.1s;

  &:hover:not(:disabled) {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ExecuteIcon = styled.span`
  font-size: 12px;
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

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0;
`

export const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`

export const FooterText = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
`

export const LoginLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.accent};
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 0;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.75;
  }
`
