'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { type LoginInput, loginSchema } from '@/entities/session/schema/SessionSchema'
import { useSessionStore } from '@/entities/session/store/useSessionStore'
import { useLogin } from '@/features/auth-login/hooks/useLogin'

import {
  Command,
  Container,
  Field,
  FieldHeader,
  ForgotLink,
  Form,
  GlobalError,
  Header,
  Input,
  InputPrompt,
  InputWrap,
  Label,
  LabelHint,
  LastSessionBox,
  LastSessionLabel,
  LastSessionRow,
  OrDivider,
  OrLine,
  OrText,
  SessionArrow,
  SessionAvatar,
  SessionInfo,
  SessionMeta,
  SessionName,
  SubmitButton,
  Subtitle,
  ToggleVisibility,
  ValidationMsg,
  Wrapper,
} from './LoginForm.styles'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isPending, error } = useLogin()

  const session = useSessionStore(s => s.session)
  const lastUser = session?.user ?? null

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors, isValid },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = handleSubmit(async data => {
    try {
      await login(data)
    } catch {}
  })

  const handleLastSessionClick = () => {
    if (!lastUser) return
    setValue('identifier', lastUser.username, { shouldValidate: true })
    setFocus('password')
  }

  const errorMessage = error instanceof Error ? error.message : null

  return (
    <Container>
      <Wrapper>
        <Header>
          <Command>&gt; ssh user@nexus</Command>
          <Subtitle>[ Restoring session — authenticate to resume your process ]</Subtitle>
        </Header>

        {lastUser && (
          <>
            <LastSessionBox>
              <LastSessionLabel>// LAST SESSION</LastSessionLabel>
              <LastSessionRow onClick={handleLastSessionClick} role="button" tabIndex={0}>
                <SessionAvatar $color="#C594C5">
                  {lastUser.username.slice(0, 2).toUpperCase()}
                </SessionAvatar>
                <SessionInfo>
                  <SessionName>{lastUser.username}</SessionName>
                  <SessionMeta>PID — click to resume</SessionMeta>
                </SessionInfo>
                <SessionArrow>&gt;</SessionArrow>
              </LastSessionRow>
            </LastSessionBox>

            <OrDivider>
              <OrLine />
              <OrText>// OR AUTHENTICATE MANUALLY</OrText>
              <OrLine />
            </OrDivider>
          </>
        )}

        <Form onSubmit={onSubmit} noValidate>
          <Field>
            <FieldHeader>
              <Label htmlFor="identifier">set-env USER_ID *</Label>
              <LabelHint>--or-email</LabelHint>
            </FieldHeader>
            <InputWrap $error={!!errors.identifier}>
              <InputPrompt>&gt;</InputPrompt>
              <Input
                id="identifier"
                type="text"
                placeholder="username or email"
                autoComplete="username"
                autoFocus
                {...register('identifier')}
              />
            </InputWrap>
            {errors.identifier && (
              <ValidationMsg $type="error">✗ {errors.identifier.message}</ValidationMsg>
            )}
          </Field>

          <Field>
            <FieldHeader>
              <Label htmlFor="password">set-env USER_SECRET --mask *</Label>
            </FieldHeader>
            <InputWrap $error={!!errors.password}>
              <InputPrompt>&gt;</InputPrompt>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="your secret"
                autoComplete="current-password"
                style={{ paddingRight: '36px' }}
                {...register('password')}
              />
              <ToggleVisibility
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(v => !v)}>
                {showPassword ? '◎' : '◉'}
              </ToggleVisibility>
            </InputWrap>
            {errors.password && (
              <ValidationMsg $type="error">✗ {errors.password.message}</ValidationMsg>
            )}
            <ForgotLink href="/forgot-password">passwd --reset</ForgotLink>
          </Field>

          {errorMessage && (
            <GlobalError>
              ✗ Authentication failed: {errorMessage}
              <br />→ Check your USER_ID and USER_SECRET
            </GlobalError>
          )}

          <SubmitButton type="submit" disabled={!isValid || isPending}>
            {isPending ? 'authenticating...' : 'ssh --connect ▶'}
          </SubmitButton>
        </Form>
      </Wrapper>
    </Container>
  )
}
