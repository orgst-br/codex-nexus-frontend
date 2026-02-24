'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { type LoginInput, loginSchema } from '@/entities/session/schema/SessionSchema'
import { useLogin } from '@/features/auth-login/hooks/useLogin'

import {
  Card,
  Container,
  Field,
  FieldError,
  Form,
  GlobalError,
  Header,
  Input,
  Label,
  Logo,
  SubmitButton,
  Subtitle,
  Title,
} from './LoginForm.styles'

export const LoginForm = () => {
  const { login, isPending, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  return (
    <Container>
      <Card>
        <Header>
          <Logo>$ orgst --login</Logo>
          <Title>Bem-vindo de volta</Title>
          <Subtitle>Entre com suas credenciais para acessar a plataforma</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit(login)}>
          {error && <GlobalError>{error.message}</GlobalError>}

          <Field>
            <Label htmlFor="identifier">email ou usuário</Label>
            <Input
              id="identifier"
              type="text"
              placeholder="seu@email.com"
              autoComplete="username"
              {...register('identifier')}
            />
            {errors.identifier && <FieldError>{errors.identifier.message}</FieldError>}
          </Field>

          <Field>
            <Label htmlFor="password">senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password && <FieldError>{errors.password.message}</FieldError>}
          </Field>

          <SubmitButton type="submit" disabled={isPending}>
            {isPending ? 'entrando...' : '> entrar'}
          </SubmitButton>
        </Form>
      </Card>
    </Container>
  )
}
