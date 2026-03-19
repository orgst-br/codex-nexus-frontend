'use client'

import { useRef, useState } from 'react'

import {
  AvatarCircle,
  AvatarPreview,
  BioCounter,
  BioWrapper,
  CommandLabel,
  DiffBox,
  DiffHeader,
  DiffLine,
  DiffLineCyan,
  DiffLineKey,
  DiffLinePlus,
  DiffLineVal,
  Field,
  FieldHint,
  FieldLabel,
  FieldReq,
  Form,
  Header,
  HeaderCaret,
  HeaderCommand,
  HiddenFileInput,
  IconToggle,
  InputPrompt,
  InputWrap,
  PillButton,
  PillGroup,
  PortfolioField,
  RowFields,
  SectionDivider,
  SectionLine,
  SectionText,
  StepBar,
  StepBars,
  StyledInput,
  StyledTextarea,
  SubmitButton,
  Subtitle,
  SubtitleBranch,
  Tag,
  TagClose,
  TagInput,
  TagInputArea,
  Title,
  TitleRow,
  UploadInfo,
  UploadLabel,
  UploadZone,
  ValidationMsg,
  Wrapper,
} from './ProfileRegister.styles'

type Role = 'mentee' | 'mentor' | 'maintainer'

type ProfileFormData = {
  email: string
  username: string
  password: string
  displayName: string
  role: Role
  avatarFile: File | null
  bio: string
  skills: string[]
  github: string
  linkedin: string
  portfolio: string
}

type Props = {
  onSubmit?: (data: ProfileFormData) => void
  isLoading?: boolean
}

function getPasswordStrength(pwd: string): 0 | 1 | 2 | 3 | 4 {
  if (pwd.length === 0) return 0
  if (pwd.length < 6) return 1
  if (pwd.length < 8) return 2
  const hasSymbol = /[^a-zA-Z0-9]/.test(pwd)
  const hasUpper = /[A-Z]/.test(pwd)
  if (pwd.length >= 12 && hasSymbol && hasUpper) return 4
  if (pwd.length >= 8 && (hasSymbol || hasUpper)) return 3
  return 2
}

const STRENGTH_MSG: Record<number, string> = {
  0: '',
  1: '⚠ entropy: weak — too short',
  2: '⚠ entropy: medium — try adding symbols',
  3: '✓ entropy: strong',
  4: '✓ entropy: excellent',
}

export function ProfileRegister({ onSubmit, isLoading = false }: Props) {
  const [form, setForm] = useState<ProfileFormData>({
    email: '',
    username: '',
    password: '',
    displayName: '',
    role: 'mentee',
    avatarFile: null,
    bio: '',
    skills: ['React', 'TypeScript', 'Node.js'],
    github: '',
    linkedin: '',
    portfolio: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set =
    (field: keyof ProfileFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
    }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setForm(prev => ({ ...prev, avatarFile: file }))
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    const val = skillInput.trim()
    if (val && !form.skills.includes(val)) {
      setForm(prev => ({ ...prev, skills: [...prev.skills, val] }))
    }
    setSkillInput('')
  }

  const removeSkill = (skill: string) => {
    setForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(form)
  }

  const strength = getPasswordStrength(form.password)
  const canSubmit =
    !isLoading && form.email.length > 0 && form.username.length > 0 && form.password.length >= 8

  const socialCount = [form.github, form.linkedin, form.portfolio].filter(Boolean).length

  return (
    <Wrapper>
      <Header>
        <TitleRow>
          <HeaderCaret>{'>'}</HeaderCaret>
          <Title>
            <HeaderCommand>git init</HeaderCommand> --identity
          </Title>
        </TitleRow>
        <Subtitle>
          [ Forking a new contributor on branch <SubtitleBranch>main</SubtitleBranch> ]
        </Subtitle>
        <StepBars>
          <StepBar $state="active" />
          <StepBar $state="future" />
          <StepBar $state="future" />
        </StepBars>
      </Header>

      <Form onSubmit={handleSubmit}>
        <SectionDivider>
          <SectionLine />
          <SectionText>// CREDENTIALS</SectionText>
          <SectionLine />
        </SectionDivider>

        <Field>
          <FieldLabel>
            <CommandLabel>set-env USER_EMAIL</CommandLabel>
            <FieldReq>*</FieldReq>
            <FieldHint>--primary-key</FieldHint>
          </FieldLabel>
          <InputWrap>
            <InputPrompt>{'>'}</InputPrompt>
            <StyledInput
              type="email"
              placeholder="your@email.dev"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
              spellCheck={false}
            />
          </InputWrap>
          {form.email.includes('@') && form.email.includes('.') && (
            <ValidationMsg $variant="ok">✓ valid email format detected</ValidationMsg>
          )}
        </Field>

        <Field>
          <FieldLabel>
            <CommandLabel>set-env USER_ID</CommandLabel>
            <FieldReq>*</FieldReq>
            <FieldHint>--unique --lowercase</FieldHint>
          </FieldLabel>
          <InputWrap>
            <InputPrompt>{'>'}</InputPrompt>
            <StyledInput
              type="text"
              placeholder="dev_zero"
              value={form.username}
              onChange={set('username')}
              autoComplete="off"
              spellCheck={false}
            />
            {form.username.length > 0 && (
              <IconToggle as="span" $color="ok">
                ✓
              </IconToggle>
            )}
          </InputWrap>
          {form.username.length > 0 && (
            <ValidationMsg $variant="ok">✓ username available</ValidationMsg>
          )}
        </Field>

        <Field>
          <FieldLabel>
            <CommandLabel>set-env USER_SECRET --mask</CommandLabel>
            <FieldReq>*</FieldReq>
          </FieldLabel>
          <InputWrap>
            <InputPrompt>{'>'}</InputPrompt>
            <StyledInput
              type={showPassword ? 'text' : 'password'}
              placeholder="min 8 chars"
              value={form.password}
              onChange={set('password')}
              autoComplete="new-password"
            />
            <IconToggle
              type="button"
              onClick={() => setShowPassword(v => !v)}
              aria-label="toggle password">
              {showPassword ? '◉' : '◎'}
            </IconToggle>
          </InputWrap>
          {form.password.length > 0 && (
            <>
              <StepBars $asStrength>
                {[1, 2, 3, 4].map(level =>
                  strength >= level ? (
                    <StepBar key={level} $state="strength" $strengthLevel={strength} />
                  ) : (
                    <StepBar key={level} $state="future" />
                  ),
                )}
              </StepBars>
              {STRENGTH_MSG[strength] && (
                <ValidationMsg $variant={strength <= 1 ? 'err' : strength === 2 ? 'warn' : 'ok'}>
                  {STRENGTH_MSG[strength]}
                </ValidationMsg>
              )}
            </>
          )}
        </Field>

        <SectionDivider>
          <SectionLine />
          <SectionText>// IDENTITY</SectionText>
          <SectionLine />
        </SectionDivider>

        <Field>
          <FieldLabel>
            <CommandLabel>export DISPLAY_NAME</CommandLabel>
            <FieldReq>*</FieldReq>
          </FieldLabel>
          <InputWrap>
            <InputPrompt>{'>'}</InputPrompt>
            <StyledInput
              type="text"
              placeholder="Your full name"
              value={form.displayName}
              onChange={set('displayName')}
              autoComplete="name"
              spellCheck={false}
            />
          </InputWrap>
        </Field>

        <Field>
          <FieldLabel>
            <CommandLabel>chmod 755 --role</CommandLabel>
            <FieldReq>*</FieldReq>
            <FieldHint>select your permission level</FieldHint>
          </FieldLabel>
          <PillGroup>
            {(['mentee', 'mentor', 'maintainer'] as Role[]).map(r => (
              <PillButton
                key={r}
                type="button"
                $active={form.role === r}
                onClick={() => setForm(prev => ({ ...prev, role: r }))}>
                {r === 'mentee' ? '◇' : r === 'mentor' ? '◆' : '★'} {r}
              </PillButton>
            ))}
          </PillGroup>
        </Field>

        <Field>
          <FieldLabel>
            <CommandLabel>upload --target ~/profile/avatar</CommandLabel>
          </FieldLabel>
          <UploadZone onClick={() => fileInputRef.current?.click()}>
            <AvatarCircle>
              {avatarPreview ? <AvatarPreview src={avatarPreview} alt="avatar preview" /> : '+'}
            </AvatarCircle>
            <UploadInfo>
              <UploadLabel>git push --best-pic</UploadLabel>
              Drop image or click to upload
              <br />
              <span>.jpg .png .webp — max 2MB</span>
            </UploadInfo>
          </UploadZone>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
          />
        </Field>

        <Field>
          <FieldLabel>
            <CommandLabel>cat &gt;&gt; README.md</CommandLabel>
            <FieldHint>who is the human behind the terminal?</FieldHint>
          </FieldLabel>
          <BioWrapper>
            <InputPrompt $top>{'>'}</InputPrompt>
            <StyledTextarea
              placeholder="Map your history, your stack, and the dreams you're currently compiling..."
              value={form.bio}
              onChange={set('bio')}
              maxLength={280}
              spellCheck={false}
            />
            <BioCounter $warn={form.bio.length > 250} $limit={form.bio.length === 280}>
              {form.bio.length} / 280 chars
            </BioCounter>
          </BioWrapper>
        </Field>

        <SectionDivider>
          <SectionLine />
          <SectionText>// DEPENDENCIES</SectionText>
          <SectionLine />
        </SectionDivider>

        <Field>
          <FieldLabel>
            <CommandLabel>export PATH=$PATH:~/skills</CommandLabel>
            <FieldHint>type and press enter to add</FieldHint>
          </FieldLabel>
          <TagInputArea>
            {form.skills.map(skill => (
              <Tag key={skill}>
                {skill}
                <TagClose type="button" onClick={() => removeSkill(skill)}>
                  ×
                </TagClose>
              </Tag>
            ))}
            <TagInput
              type="text"
              placeholder="+ add skill..."
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
            />
          </TagInputArea>
        </Field>

        <RowFields>
          <Field>
            <FieldLabel>
              <CommandLabel>ln -s /github ~/</CommandLabel>
            </FieldLabel>
            <InputWrap>
              <InputPrompt>{'>'}</InputPrompt>
              <StyledInput
                type="text"
                placeholder="@username"
                value={form.github}
                onChange={set('github')}
                autoComplete="off"
              />
            </InputWrap>
          </Field>

          <Field>
            <FieldLabel>
              <CommandLabel>ln -s /linkedin ~/</CommandLabel>
            </FieldLabel>
            <InputWrap>
              <InputPrompt>{'>'}</InputPrompt>
              <StyledInput
                type="text"
                placeholder="in/username"
                value={form.linkedin}
                onChange={set('linkedin')}
                autoComplete="off"
              />
            </InputWrap>
          </Field>
        </RowFields>

        <PortfolioField>
          <FieldLabel>
            <CommandLabel>ln -s /portfolio ~/</CommandLabel>
          </FieldLabel>
          <InputWrap>
            <InputPrompt>{'>'}</InputPrompt>
            <StyledInput
              type="url"
              placeholder="https://your-site.dev"
              value={form.portfolio}
              onChange={set('portfolio')}
              autoComplete="off"
            />
          </InputWrap>
        </PortfolioField>

        <DiffBox>
          <DiffHeader>// PRE-COMMIT DIFF</DiffHeader>
          {form.email && (
            <DiffLine>
              <DiffLinePlus>+</DiffLinePlus>
              <DiffLineKey>email:</DiffLineKey>
              <DiffLineVal>{form.email}</DiffLineVal>
            </DiffLine>
          )}
          {form.username && (
            <DiffLine>
              <DiffLinePlus>+</DiffLinePlus>
              <DiffLineKey>user_id:</DiffLineKey>
              <DiffLineVal>{form.username}</DiffLineVal>
            </DiffLine>
          )}
          {form.role && (
            <DiffLine>
              <DiffLinePlus>+</DiffLinePlus>
              <DiffLineKey>role:</DiffLineKey>
              <DiffLineCyan>{form.role}</DiffLineCyan>
            </DiffLine>
          )}
          {form.skills.length > 0 && (
            <DiffLine>
              <DiffLinePlus>+</DiffLinePlus>
              <DiffLineKey>skills:</DiffLineKey>
              <DiffLineVal>{form.skills.join(', ')}</DiffLineVal>
            </DiffLine>
          )}
          {socialCount > 0 && (
            <DiffLine>
              <DiffLinePlus>+</DiffLinePlus>
              <DiffLineKey>links:</DiffLineKey>
              <DiffLineCyan>
                {socialCount} symlink{socialCount > 1 ? 's' : ''}
              </DiffLineCyan>
            </DiffLine>
          )}
        </DiffBox>

        <SubmitButton type="submit" disabled={!canSubmit}>
          {isLoading ? 'committing...' : 'sudo system start user-session'} ▶
        </SubmitButton>
      </Form>
    </Wrapper>
  )
}
