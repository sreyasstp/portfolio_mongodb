import type { Metadata } from 'next'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to access downloads, bookmarks, and your dashboard.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(248,15,1,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(248,15,1,0.05) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md px-4">
        <LoginForm />
      </div>
    </div>
  )
}
