import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const error = searchParams.get('error')

  if (error || !token) {
    return NextResponse.redirect(new URL('/login?error=oauth_failed', request.url))
  }

  // Redirect to a client page that will store the token
  return NextResponse.redirect(new URL(`/login?token=${token}`, request.url))
}
