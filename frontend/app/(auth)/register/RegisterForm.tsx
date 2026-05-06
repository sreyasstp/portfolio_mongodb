'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Loader2, Terminal } from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'

export function RegisterForm() {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Registration failed.')
      setAuth(data.user, data.access_token)
      router.push('/dashboard')
    } catch (err: any) {
      setErrors({ general: err.message })
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', Icon: User, placeholder: 'John Doe' },
    { name: 'email', label: 'Email', type: 'email', Icon: Mail, placeholder: 'you@example.com' },
    { name: 'password', label: 'Password', type: 'password', Icon: Lock, placeholder: '••••••••' },
    { name: 'password_confirmation', label: 'Confirm Password', type: 'password', Icon: Lock, placeholder: '••••••••' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 border border-white/10">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center shadow-glow mx-auto mb-4">
          <Terminal className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Create account</h1>
        <p className="text-white/40 text-sm mt-1">Join to access free resources</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 rounded-lg bg-brand/10 border border-brand/20 text-sm text-brand">{errors.general}</div>
        )}
        {fields.map(({ name, label, type, Icon, placeholder }) => (
          <div key={name}>
            <label className="block text-xs font-medium text-white/50 mb-1.5">{label}</label>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type={type}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-brand/50 transition-colors text-sm"
              />
            </div>
            {errors[name] && <p className="text-xs text-brand mt-1">{errors[name]}</p>}
          </div>
        ))}

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-sm text-white/40 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-brand hover:underline">Sign in</Link>
      </p>
    </motion.div>
  )
}
