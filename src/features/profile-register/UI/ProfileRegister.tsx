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

export function ProfileRegister({ onSubmit, onLoginClick, isLoading = false }: Props) {
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
          <Title>useradd --new-profile</Title>
        </TitleRow>
        <Subtitle>[ Initializing your identity instance on the main branch 🧠 ]</Subtitle>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>set-env USER_ID</Label>
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
          <Label>set-env USER_SECRET --mask</Label>
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
          <Label>upload --target ~/profile/avatar</Label>
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
              git push --best-pic
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
          <Label>about_me.md</Label>
          <TextareaRow>
            <TextareaPrompt>{'>'}</TextareaPrompt>
            <StyledTextarea
              placeholder="Initializing biography... Who is the human behind the terminal? Map your history, your stack, and the dreams you’re currently compiling."
              value={form.bio}
              onChange={handleChange('bio')}
              rows={4}
              spellCheck={false}
            />
          </TextareaRow>
        </Field>

        <RowFields>
          <Field>
            <Label>ln -s /linkedin ~/</Label>
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
            <Label>ln -s /github ~/</Label>
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
          <ExecuteButton type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'sudo system start user-session'}
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
