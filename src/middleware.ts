import { type NextRequest, NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password']
const PROTECTED_PREFIX = ['/portal', '/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_ROUTES.some(route => pathname.startsWith(route))
  const isProtected = PROTECTED_PREFIX.some(prefix => pathname.startsWith(prefix))

  const token = request.cookies.get('orgst-token')?.value

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL('/portal/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
