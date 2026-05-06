'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Github, Linkedin, MapPin, Briefcase } from 'lucide-react'

const LINKS = [
  { label: 'GitHub', Icon: Github, href: 'https://github.com' },
  { label: 'LinkedIn', Icon: Linkedin, href: 'https://linkedin.com' },
  { label: 'Email', Icon: Mail, href: 'mailto:sreyastp444@gmail.com' },
]

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-brand/8 via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(248,15,1,1) 1px, transparent 1px), linear-gradient(90deg, rgba(248,15,1,1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative page-container">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Open to work badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-green-400/30 text-green-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Open to new opportunities
            </span>
          </div>

          <p className="text-brand font-mono text-sm mb-4">// let&apos;s connect</p>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Looking for my next
            <br />
            <span className="text-gradient">great role.</span>
          </h2>

          <p className="text-white/40 max-w-xl mx-auto mb-4 text-lg leading-relaxed">
            Adobe Commerce Developer with 4.5 years of experience. If you&apos;re building something
            great and need a Magento expert on your team — let&apos;s talk.
          </p>

          <div className="flex items-center justify-center gap-2 text-white/30 text-sm mb-10">
            <MapPin className="w-3.5 h-3.5" />
            <span>Palakkad, Kerala, India · Open to remote</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a href="mailto:sreyastp444@gmail.com" className="btn-primary text-base">
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
            <Link href="/portfolio" className="btn-ghost text-base">
              <Briefcase className="w-4 h-4" />
              View My Work
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8 max-w-xs mx-auto">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/20 font-mono">or find me on</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            {LINKS.map(({ label, Icon, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5 px-5 py-2.5 glass rounded-xl text-sm text-white/50 hover:text-white hover:border-white/20 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}
