'use client'

import { useRef, useState } from 'react'

import {
  ActionsRow,
  BrowseButton,
  Caret,
  Divider,
  ExecuteButton,
  ExecuteIcon,
  Field,
  FooterRow,
  FooterText,
  ForgotLink,
  Form,
  Header,
  HiddenFileInput,
  IconButton,
  InputIcon,
  InputPrompt,
  InputRow,
  Label,
  LoginLink,
  RowFields,
  Spinner,
  StyledInput,
  StyledTextarea,
  Subtitle,
  TextareaPrompt,
  TextareaRow,
  Title,
  TitleRow,
  Wrapper,
} from './ProfileRegister.styles'

type ProfileFormData = {
  username: string
  password: string
  avatarPath: string
  bio: string
  linkedin: string
  github: string
}

type Props = {
  onSubmit?: (data: ProfileFormData) => void
  onLoginClick?: () => void
  onForgotPasswordClick?: () => void
  isLoading?: boolean
}

export function ProfileRegister({
  onSubmit,
  onLoginClick,
  onForgotPasswordClick,
  isLoading = false,
}: Props) {
  const [form, setForm] = useState<ProfileFormData>({
    username: '',
    password: '',
    avatarPath: '',
    bio: '',
    linkedin: '',
    github: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange =
    (field: keyof ProfileFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
    }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setForm(prev => ({ ...prev, avatarPath: file.name }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(form)
  }

  return (
    <Wrapper>
      <Header>
        <TitleRow>
          <Caret>{'>'}</Caret>
          <Title>REGISTER_USER</Title>
        </TitleRow>
        <Subtitle>Create your developer identity to proceed.</Subtitle>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>USR/BIN/USERNAME</Label>
          <InputRow>
            <InputPrompt>{'>'}</InputPrompt>
            <StyledInput
              type="text"
              placeholder="dev_zero"
              value={form.username}
              onChange={handleChange('username')}
              autoComplete="off"
              spellCheck={false}
            />
            <InputIcon>&#xf007;</InputIcon>
          </InputRow>
        </Field>

        <Field>
          <Label>ETC/SECURITY/PASSWORD</Label>
          <InputRow>
            <InputPrompt>{'>'}</InputPrompt>
            <StyledInput
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange('password')}
              autoComplete="new-password"
            />
            <IconButton
              type="button"
              onClick={() => setShowPassword(v => !v)}
              aria-label="toggle password">
              {showPassword ? '○' : '⊖'}
            </IconButton>
          </InputRow>
        </Field>

        <Field>
          <Label>HOME/USER/AVATAR_PATH</Label>
          <InputRow>
            <InputPrompt>{'>'}</InputPrompt>
            <StyledInput
              type="text"
              placeholder="/path/to/profile_pic.png"
              value={form.avatarPath}
              onChange={handleChange('avatarPath')}
              readOnly
            />
            <BrowseButton type="button" onClick={() => fileInputRef.current?.click()}>
              BROWSE
            </BrowseButton>
            <HiddenFileInput
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </InputRow>
        </Field>

        <Field>
          <Label>VAR/LOG/BIO.TXT</Label>
          <TextareaRow>
            <TextareaPrompt>{'>'}</TextareaPrompt>
            <StyledTextarea
              placeholder="Describe your stack..."
              value={form.bio}
              onChange={handleChange('bio')}
              rows={4}
              spellCheck={false}
            />
          </TextareaRow>
        </Field>

        <RowFields>
          <Field>
            <Label>NET/LINKEDIN</Label>
            <InputRow>
              <InputPrompt>{'>'}</InputPrompt>
              <StyledInput
                type="text"
                placeholder="in/username"
                value={form.linkedin}
                onChange={handleChange('linkedin')}
                autoComplete="off"
              />
            </InputRow>
          </Field>

          <Field>
            <Label>GIT/REMOTE/ORIGIN</Label>
            <InputRow>
              <InputPrompt>{'>'}</InputPrompt>
              <StyledInput
                type="text"
                placeholder="@username"
                value={form.github}
                onChange={handleChange('github')}
                autoComplete="off"
              />
            </InputRow>
          </Field>
        </RowFields>

        <ActionsRow>
          <ForgotLink type="button" onClick={onForgotPasswordClick}>
            Forgot_Password?
          </ForgotLink>
          <ExecuteButton type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'EXECUTE'}
            <ExecuteIcon>▶</ExecuteIcon>
          </ExecuteButton>
        </ActionsRow>

        <Divider />

        <FooterRow>
          <FooterText>Already have a PID?</FooterText>
          <LoginLink type="button" onClick={onLoginClick}>
            Log_In
          </LoginLink>
        </FooterRow>
      </Form>
    </Wrapper>
  )
}
