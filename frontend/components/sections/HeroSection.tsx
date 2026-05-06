'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Download, Github, Award } from 'lucide-react'
import { useState, useEffect } from 'react'

const CODE_LINE = `$sreyas = ['magento2', 'adobe-commerce', 'nextjs', 'ai'];`

// ─── Scramble Text ────────────────────────────────────────────────────────────
const SCRAMBLE_POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%*!?&<>[]{}/'

function ScrambleText({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const [chars, setChars] = useState<string[]>(() => text.split(''))

  useEffect(() => {
    const timeout = setTimeout(() => {
      const letters = text.split('')
      const totalFrames = letters.length * 4
      let frame = 0

      const id = setInterval(() => {
        frame++
        setChars(
          letters.map((char, i) => {
            if (char === ' ') return ' '
            const revealFrame = Math.floor(i * (totalFrames / letters.length))
            if (frame >= revealFrame) return char
            return SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)]
          })
        )
        if (frame >= totalFrames) clearInterval(id)
      }, 28)

      return () => clearInterval(id)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay])

  return <span className={className}>{chars.join('')}</span>
}

// ─── Cycling Role Title ───────────────────────────────────────────────────────
const ROLES = ['Expert.', 'Developer.', 'Specialist.']

function CycleRole() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % ROLES.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className="relative inline-block"
      style={{ overflow: 'hidden', verticalAlign: 'bottom' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '105%', rotateX: -30 }}
          animate={{ y: 0, rotateX: 0 }}
          exit={{ y: '-105%', rotateX: 30 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-brand"
          style={{ textShadow: 'none' }}
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ─── Typewriter Code ──────────────────────────────────────────────────────────
function TypewriterCode({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) {
        clearInterval(id)
        setDone(true)
      }
    }, 36)
    return () => clearInterval(id)
  }, [text])

  return (
    <div className="inline-flex items-center gap-2 font-mono text-sm bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white/70 max-w-full overflow-x-auto">
      <span className="text-brand select-none flex-shrink-0">›</span>
      <span className="text-green-400/80">{displayed}</span>
      {!done && <span className="w-0.5 h-4 bg-brand animate-pulse flex-shrink-0" />}
    </div>
  )
}

// ─── Count Up ─────────────────────────────────────────────────────────────────
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const step = 16
    const increment = to / (1800 / step)
    const id = setInterval(() => {
      start += increment
      if (start >= to) { setCount(to); clearInterval(id) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(id)
  }, [to])

  return <>{count}{suffix}</>
}

const STATS = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 1, suffix: '', label: 'Adobe Certification' },
  { value: 5, suffix: '+', label: 'Commerce Projects' },
  { value: 3, suffix: '', label: 'PWAs Built' },
]

const STACK = ['Magento 2', 'PHP 8', 'Next.js', 'GraphQL', 'React', 'MySQL', 'Redis', 'Docker']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Dot-matrix background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.35,
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Diagonal gradient wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(135deg, rgba(255,0,0,0.04) 0%, transparent 50%),
            linear-gradient(225deg, rgba(59,130,246,0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Top-left brand smear */}
      <div
        className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,0,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(255,0,0,0.1)' }}
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: 'rgba(59,130,246,0.1)' }}
      />

      {/* Bottom edge fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }}
      />

      <div className="relative z-10 page-container w-full py-28 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 xl:gap-16 items-center w-full">

          {/* ─── Left: text content ─────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status badge */}
            {/* <motion.div variants={itemVariants} className="mb-5">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-sm font-mono text-white/60 border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                Open to new opportunities
              </span>
            </motion.div> */}

            {/* Heading block */}
            <motion.div variants={itemVariants} className="mb-6 relative">
              <div className="absolute -left-5 top-0 bottom-0 w-px bg-gradient-to-b from-brand/60 via-brand/20 to-transparent hidden lg:block" />

              <p className="font-mono text-xs sm:text-sm text-white/30 mb-4 tracking-wide">
                <span className="text-brand/50">{'// '}</span>
                <span>adobe-commerce · certified · 4.5 yrs</span>
              </p>

              <p className="text-white/40 text-base font-mono mb-2">
                hey, I&apos;m{' '}
                <motion.span className="text-white/70" whileHover={{ color: '#fff' }}>
                  Sreyas
                </motion.span>{' '}
                <motion.span
                  animate={{ rotate: [0, 14, -8, 14, 0] }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="inline-block"
                >
                  👋
                </motion.span>
              </p>

              <h1
                className="font-black leading-[0.88] tracking-tighter select-none"
                style={{ fontSize: 'clamp(3.2rem, 7vw, 6.5rem)' }}
              >
                <span className="block relative">
                  <ScrambleText
                    text="MAGENTO 2"
                    delay={400}
                    className="bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent"
                  />
                  <motion.span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                    }}
                    initial={{ backgroundPositionX: '-100%' }}
                    animate={{ backgroundPositionX: '300%' }}
                    transition={{ duration: 0.9, delay: 1.2, ease: 'easeInOut' }}
                  />
                </span>
                <span className="block mt-1">
                  <CycleRole />
                </span>
              </h1>

              <motion.div
                className="mt-5 h-px w-24 bg-gradient-to-r from-brand to-transparent"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.6, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Role badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-lg text-sm font-mono font-medium border text-brand border-brand/30 bg-brand/10">
                Adobe Commerce Developer
              </span>
              <span className="px-3 py-1 rounded-lg text-sm font-mono font-medium border text-white/40 border-white/10 bg-white/5">
                AI-Augmented Dev
              </span>
            </motion.div>

            {/* Typewriter code */}
            <motion.div variants={itemVariants} className="mb-8">
              <TypewriterCode text={CODE_LINE} />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-white/50 max-w-xl mb-10 leading-relaxed"
            >
              Adobe Commerce developer with 4.5 years of experience building scalable,
              high-performance e-commerce solutions — now leveraging{' '}
              <span className="text-brand">AI</span> to build smarter, more efficient stores.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <Link href="/blog" className="btn-primary text-base">
                Read the Blog
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/extensions" className="btn-ghost text-base">
                Free Extensions
                <Download className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base font-medium text-white/40 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* ─── Right: stats + cards (desktop only) ────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex flex-col gap-4"
          >
            {/* 2×2 stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              {STATS.map(({ value, suffix, label }) => (
                <div
                  key={label}
                  className="glass rounded-2xl p-5 text-center hover:bg-white/[0.08] transition-colors"
                >
                  <div className="text-3xl font-black text-brand mb-1 tabular-nums">
                    <CountUp to={value} suffix={suffix} />
                  </div>
                  <div className="text-xs text-white/30 font-mono leading-tight">{label}</div>
                </div>
              ))}
            </motion.div>

            {/* Certification card */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-brand" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-mono text-white/30 mb-0.5">adobe certified</p>
                <p className="text-sm font-semibold text-white leading-snug">
                  Commerce Business Practitioner
                </p>
                <p className="text-xs text-brand/60 font-mono mt-0.5">AD0-E708 · Expert</p>
              </div>
            </motion.div>

            {/* Stack tags */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-4">
              <p className="text-[11px] font-mono text-white/30 mb-3">// current stack</p>
              <div className="flex flex-wrap gap-2">
                {STACK.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats — mobile only */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="lg:hidden mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
        >
          {STATS.map(({ value, suffix, label }) => (
            <div
              key={label}
              className="bg-dark-900 px-6 py-5 text-center hover:bg-dark-800/50 transition-colors"
            >
              <div className="text-3xl font-black text-brand mb-1 tabular-nums">
                <CountUp to={value} suffix={suffix} />
              </div>
              <div className="text-xs text-white/30 font-mono leading-tight">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-px h-14 bg-gradient-to-b from-brand/60 to-transparent"
        />
        <span className="text-[10px] text-white/20 font-mono tracking-widest uppercase">scroll</span>
      </motion.div>
    </section>
  )
}
