'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import {
  ArrowLeft,
  BookMarked,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  HelpCircle,
  Layers,
  ListChecks,
  Loader2,
  PlayCircle,
  Star,
  Target,
  Trophy,
  Wrench,
} from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import {
  CertLevel,
  LEVEL_COLORS,
  RefCategory,
} from '@/lib/data/certifications'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExamSection {
  id: string        // aliases section_key from DB
  title: string
  weight: number
  description: string
  objectives: string[]
  subtopics: string[]
  lessons: { id: string }[]
}

interface ExamReference {
  title: string
  url: string
  category: RefCategory
  description: string
}

interface ExamGuide {
  id: string
  slug: string
  examCode: string
  title: string
  shortTitle: string
  level: CertLevel
  description: string
  questions: number
  passingScore: number
  duration: number
  costUSD: number
  experience: string
  officialUrl: string
  prerequisites: string[] | null
  sections: ExamSection[]
  references: ExamReference[]
}

// ─── Icon maps ────────────────────────────────────────────────────────────────

const LEVEL_ICONS: Record<CertLevel, React.ReactNode> = {
  Professional: <Layers className="w-3.5 h-3.5" />,
  Expert: <Target className="w-3.5 h-3.5" />,
  Master: <Star className="w-3.5 h-3.5" />,
}

const REF_ICONS: Record<RefCategory, React.ReactNode> = {
  official: <Trophy className="w-3.5 h-3.5 text-amber-400" />,
  devdocs: <BookOpen className="w-3.5 h-3.5 text-blue-400" />,
  github: <Github className="w-3.5 h-3.5 text-white/60" />,
  training: <GraduationCap className="w-3.5 h-3.5 text-green-400" />,
  tool: <Wrench className="w-3.5 h-3.5 text-purple-400" />,
}

const REF_LABELS: Record<RefCategory, string> = {
  official: 'Official',
  devdocs: 'Dev Docs',
  github: 'GitHub',
  training: 'Training',
  tool: 'Tool',
}

const REF_COLORS: Record<RefCategory, string> = {
  official: 'border-amber-500/20 bg-amber-500/5',
  devdocs: 'border-blue-500/20 bg-blue-500/5',
  github: 'border-white/10 bg-white/5',
  training: 'border-green-500/20 bg-green-500/5',
  tool: 'border-purple-500/20 bg-purple-500/5',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function CertDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data, isLoading: loading } = useSWR(`/api/exam-guides/${slug}`, fetcher)

  const exam: ExamGuide | null = (data?.examGuide as ExamGuide) ?? null

  const [activeSection, setActiveSection] = useState<string>('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const heroRef = useRef<HTMLDivElement>(null)

  // Track which section is in view
  useEffect(() => {
    if (!exam) return
    const observers: IntersectionObserver[] = []

    exam.sections.forEach((section) => {
      const el = sectionRefs.current[section.id]
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id)
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [exam])

  // Show context bar once hero scrolls out of view
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [exam])

  function scrollTo(id: string) {
    const el = sectionRefs.current[id]
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileNavOpen(false)
  }

  // ── Loading state ──
  if (loading) {
    return (
      <PublicLayout>
        <div className="page-container py-32 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand animate-spin" />
        </div>
      </PublicLayout>
    )
  }

  // ── Not found ──
  if (!exam) {
    return (
      <PublicLayout>
        <div className="page-container py-32 text-center">
          <p className="text-brand font-mono text-sm mb-4">// 404</p>
          <h1 className="text-3xl font-black text-white mb-6">Exam not found</h1>
          <Link href="/certifications" className="btn-ghost">
            ← Back to Certifications
          </Link>
        </div>
      </PublicLayout>
    )
  }

  const colors = LEVEL_COLORS[exam.level]
  const refByCategory = groupRefsByCategory(exam.references)

  return (
    <PublicLayout>

      {/* ── Scroll context bar — appears when hero is off-screen ── */}
      <AnimatePresence>
        {!heroVisible && exam && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 left-0 right-0 z-40 border-b border-white/8"
            style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(16px)' }}
          >
            <div className="page-container h-10 flex items-center justify-between gap-4">
              {/* Left: exam identity */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border flex-shrink-0 ${colors.bg} ${colors.text} ${colors.border}`}>
                  {exam.examCode}
                </span>
                <span className="text-white/70 text-sm font-semibold truncate">{exam.shortTitle}</span>
                {activeSection && (
                  <>
                    <ChevronRight className="w-3 h-3 text-white/20 flex-shrink-0" />
                    <span className="text-white/40 text-xs truncate">
                      {exam.sections.find(s => s.id === activeSection)?.title}
                    </span>
                  </>
                )}
              </div>
              {/* Right: section pills */}
              <div className="hidden md:flex items-center gap-1">
                {exam.sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className={`px-2.5 py-1 rounded-md text-xs transition-colors font-mono focus:outline-none border ${
                      activeSection === sec.id
                        ? `${colors.text} ${colors.bg} ${colors.border}`
                        : 'border-transparent text-white/35 hover:text-white/60 hover:bg-white/5'
                    }`}
                  >
                    {sec.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="page-container py-10">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 text-sm text-white/30 mb-8">
          <Link href="/certifications" className="hover:text-white/60 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Certifications
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white/50">{exam.shortTitle}</span>
        </div>

        {/* ── Hero card ── */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${colors.bg} ${colors.text} ${colors.border}`}
                >
                  {exam.examCode}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
                >
                  {LEVEL_ICONS[exam.level]}
                  {exam.level}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                {exam.title}
              </h1>
              <p className="text-white/50 leading-relaxed max-w-2xl">{exam.description}</p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto md:min-w-[340px]">
              {[
                { label: 'Questions', value: exam.questions, icon: <HelpCircle className="w-4 h-4" /> },
                {
                  label: 'Pass Score',
                  value: `${exam.passingScore}/${exam.questions}`,
                  icon: <Target className="w-4 h-4" />,
                },
                { label: 'Duration', value: `${exam.duration} min`, icon: <Clock className="w-4 h-4" /> },
                { label: 'Cost (USD)', value: `$${exam.costUSD}`, icon: <BookMarked className="w-4 h-4" /> },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                >
                  <div className="flex justify-center mb-1 text-brand">{stat.icon}</div>
                  <p className="text-white font-bold text-sm">{stat.value}</p>
                  <p className="text-white/30 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience req */}
          <div className="mt-5 pt-5 border-t border-white/5 flex items-start gap-2 text-sm text-white/40">
            <GraduationCap className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
            <span>
              <span className="text-white/60 font-medium">Required experience: </span>
              {exam.experience}
            </span>
          </div>

          {/* Prerequisites */}
          {exam.prerequisites && exam.prerequisites.length > 0 && (
            <div className="mt-3 flex items-start gap-2 text-sm text-white/40">
              <ListChecks className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
              <span>
                <span className="text-white/60 font-medium">Prerequisites: </span>
                {exam.prerequisites.join(' · ')}
              </span>
            </div>
          )}
        </motion.div>

        {/* ── Mobile nav toggle ── */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            className="w-full glass-hover rounded-xl px-4 py-3 flex items-center justify-between text-sm text-white/70"
          >
            <span className="flex items-center gap-2 font-medium">
              <Code2 className="w-4 h-4 text-brand" />
              Exam Objectives
            </span>
            <ChevronDown
              className={`w-4 h-4 text-white/40 transition-transform ${mobileNavOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {mobileNavOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="glass rounded-xl mt-1 p-3 space-y-1">
                  {exam.sections.map((section) => (
                    <div key={section.id}>
                      <button
                        onClick={() => scrollTo(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between gap-2 focus:outline-none border ${
                          activeSection === section.id
                            ? 'bg-brand/10 text-brand border-brand/20'
                            : 'border-brand/0 text-white/50 hover:text-white/80 hover:bg-white/5'
                        }`}
                      >
                        <span>{section.title}</span>
                        <span
                          className={`text-xs font-mono flex-shrink-0 ${
                            activeSection === section.id ? 'text-brand' : 'text-white/25'
                          }`}
                        >
                          {section.weight}%
                        </span>
                      </button>
                      {section.lessons.length > 0 && (
                        <Link
                          href={`/certifications/${exam.slug}/learn/${section.id}`}
                          onClick={() => setMobileNavOpen(false)}
                          className="ml-3 mt-0.5 mb-1 flex items-center gap-1.5 text-xs text-brand/50 hover:text-brand transition-colors"
                        >
                          <PlayCircle className="w-3 h-3" />
                          {section.lessons.length} lesson{section.lessons.length !== 1 ? 's' : ''} available →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── 3-column layout ── */}
        <div className="flex gap-6 items-start">

          {/* ── LEFT: Sticky sidebar ── */}
          <aside className={`hidden lg:flex flex-col gap-4 w-64 xl:w-72 2xl:w-80 flex-shrink-0 sticky transition-[top] duration-200 ${heroVisible ? 'top-20' : 'top-28'}`}>

            {/* Exam overview mini-card */}
            <div className="glass rounded-xl p-4">
              <p className="text-brand font-mono text-xs mb-3">// exam-overview</p>
              <ul className="space-y-2.5">
                {[
                  { label: 'Code', value: exam.examCode },
                  { label: 'Level', value: exam.level },
                  { label: 'Questions', value: String(exam.questions) },
                  {
                    label: 'Pass Score',
                    value: `${exam.passingScore}/${exam.questions} (${Math.round((exam.passingScore / exam.questions) * 100)}%)`,
                  },
                  { label: 'Duration', value: `${exam.duration} min` },
                  { label: 'Cost', value: `$${exam.costUSD} USD` },
                  { label: 'Sections', value: String(exam.sections.length) },
                ].map((item) => (
                  <li key={item.label} className="flex justify-between text-xs gap-2">
                    <span className="text-white/30">{item.label}</span>
                    <span className="text-white/70 font-medium text-right">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Topics nav */}
            <div className="glass rounded-xl p-4">
              <p className="text-brand font-mono text-xs mb-3">// objectives</p>
              <nav className="space-y-1">
                {exam.sections.map((section, idx) => (
                  <div key={section.id} className="group/row">
                    <button
                      onClick={() => scrollTo(section.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-start gap-2 focus:outline-none border ${
                        activeSection === section.id
                          ? 'bg-brand/10 border-brand/20'
                          : 'border-brand/0 hover:bg-white/5'
                      }`}
                    >
                      <span
                        className={`text-xs font-mono font-bold flex-shrink-0 mt-0.5 w-5 ${
                          activeSection === section.id ? 'text-brand' : 'text-white/20 group-hover/row:text-white/40'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-medium leading-snug ${
                            activeSection === section.id
                              ? 'text-brand'
                              : 'text-white/50 group-hover/row:text-white/80'
                          }`}
                        >
                          {section.title}
                        </p>
                        <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${section.weight}%` }}
                            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              activeSection === section.id ? 'bg-brand' : 'bg-white/20'
                            }`}
                          />
                        </div>
                        <p
                          className={`text-xs mt-0.5 font-mono ${
                            activeSection === section.id ? 'text-brand/70' : 'text-white/20'
                          }`}
                        >
                          {section.weight}%
                        </p>
                      </div>
                    </button>
                    {/* Study link — shown inline under section if it has lessons */}
                    {section.lessons.length > 0 && (
                      <Link
                        href={`/certifications/${exam.slug}/learn/${section.id}`}
                        className="ml-7 mt-0.5 mb-1 flex items-center gap-1.5 text-[11px] text-brand/50 hover:text-brand transition-colors group/link"
                      >
                        <PlayCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{section.lessons.length} lesson{section.lessons.length !== 1 ? 's' : ''} available</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── CENTER: Exam sections ── */}
          <main className="flex-1 min-w-0 space-y-6">
            <p className="text-brand font-mono text-xs hidden lg:block">
              // exam-objectives — {exam.sections.length} sections
            </p>

            {exam.sections.map((section, idx) => (
              <motion.section
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el
                }}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: idx * 0.05 }}
                className="glass rounded-2xl overflow-hidden"
              >
                {/* Section header */}
                <div className="flex items-start justify-between gap-4 p-6 border-b border-white/5">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-xs font-mono text-white/20 mt-1 w-6 flex-shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-bold text-white leading-snug">
                        {section.title}
                      </h2>
                      <p className="text-sm text-white/40 mt-1 leading-relaxed">
                        {section.description}
                      </p>
                      {/* Study button — visible immediately in header */}
                      {section.lessons.length > 0 && (
                        <Link
                          href={`/certifications/${exam.slug}/learn/${section.id}`}
                          className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand/10 border border-brand/20 text-xs font-medium text-brand hover:bg-brand/20 transition-all group"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          Study {section.lessons.length} lesson{section.lessons.length !== 1 ? 's' : ''}
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      )}
                    </div>
                  </div>
                  {/* Weight badge */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <span className={`text-2xl font-black ${colors.text}`}>
                      {section.weight}%
                    </span>
                    <span className="text-xs text-white/25">of exam</span>
                  </div>
                </div>

                {/* Weight bar */}
                <div className="h-0.5 bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${section.weight}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-brand/50"
                  />
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Official objectives */}
                  <div>
                    <p className="text-white/25 font-mono text-xs mb-3 uppercase tracking-wider">
                      Official Objectives
                    </p>
                    <ul className="space-y-2">
                      {section.objectives.map((obj, oi) => (
                        <li key={oi} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                          <span className="flex-shrink-0 font-mono text-xs text-white/20 mt-0.5 w-4">{oi + 1}.</span>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/5" />

                  {/* Study notes */}
                  <div>
                    <p className="text-brand font-mono text-xs mb-3">// what-to-study</p>
                    <ul className="space-y-2.5">
                      {section.subtopics.map((sub, si) => (
                        <motion.li
                          key={si}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: si * 0.03 }}
                          className="flex items-start gap-3 text-sm text-white/60 leading-relaxed"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand/60 mt-2" />
                          {sub}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.section>
            ))}

            {/* Bottom: study CTA — dynamic based on which sections have lessons */}
            {(() => {
              const sectionsWithLessons = exam.sections.filter(s => s.lessons.length > 0)
              if (sectionsWithLessons.length === 0) return null
              const totalLessons = sectionsWithLessons.reduce((n, s) => n + s.lessons.length, 0)
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6"
                >
                  <p className="text-brand font-mono text-xs mb-2">// deep-study-mode</p>
                  <h3 className="text-lg font-black text-white mb-2">
                    Ready to study deeper?
                  </h3>
                  <p className="text-sm text-white/40 mb-5 max-w-xl">
                    {sectionsWithLessons.length === 1
                      ? `The ${sectionsWithLessons[0].title} section has ${totalLessons} detailed lesson${totalLessons !== 1 ? 's' : ''} — code examples, file trees, command references, tables, and exam tips — built from the official dev docs.`
                      : `${sectionsWithLessons.length} sections have detailed lesson content (${totalLessons} lessons total) — code examples, file trees, command references, tables, and exam tips — built from the official dev docs.`
                    }
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {sectionsWithLessons.map(sec => (
                      <Link
                        key={sec.id}
                        href={`/certifications/${exam.slug}/learn/${sec.id}`}
                        className="inline-flex items-center gap-2 btn-primary text-sm"
                      >
                        <PlayCircle className="w-4 h-4" />
                        Study {sec.title} ({sec.weight}%)
                      </Link>
                    ))}
                    <Link href="/certifications" className="btn-ghost text-sm">
                      ← All Exams
                    </Link>
                  </div>
                </motion.div>
              )
            })()}
          </main>

          {/* ── RIGHT: Resources sidebar ── */}
          <aside className={`hidden xl:flex flex-col gap-4 w-64 xl:w-72 2xl:w-80 flex-shrink-0 sticky transition-[top] duration-200 ${heroVisible ? 'top-20' : 'top-28'}`}>

            {/* Official exam link */}
            <div className="glass rounded-xl p-4">
              <p className="text-brand font-mono text-xs mb-3">// official-exam</p>
              <a
                href={exam.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white/60 hover:text-white/90 transition-colors group"
              >
                <ExternalLink className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                <span>Adobe Certification Portal</span>
                <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <div className="mt-3 pt-3 border-t border-white/5 text-xs text-white/25 space-y-1">
                <p>Exam: <span className="text-white/40 font-mono">{exam.examCode}</span></p>
                <p>Issuer: <span className="text-white/40">Adobe</span></p>
                <p>Valid: <span className="text-white/40">2 years</span></p>
              </div>
            </div>

            {/* Reference links grouped by category */}
            {(Object.entries(refByCategory) as [RefCategory, ExamReference[]][]).map(
              ([cat, links]) => (
                <div key={cat} className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {REF_ICONS[cat]}
                    <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                      {REF_LABELS[cat]}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {links.map((ref) => (
                      <li key={ref.url}>
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex items-start gap-2 p-2 rounded-lg border transition-all hover:border-white/20 ${REF_COLORS[cat]}`}
                          title={ref.description}
                        >
                          <ExternalLink className="w-3 h-3 flex-shrink-0 mt-0.5 text-white/20 group-hover:text-white/60 transition-colors" />
                          <span className="text-xs text-white/50 group-hover:text-white/80 leading-snug transition-colors">
                            {ref.title}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </aside>
        </div>

        {/* ── Mobile: Resources (below content) ── */}
        <div className="xl:hidden mt-8">
          <h2 className="text-brand font-mono text-xs mb-4">// reference-links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {exam.references.map((ref) => (
              <a
                key={ref.url}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-start gap-3 p-3 rounded-xl border transition-all hover:border-white/20 ${REF_COLORS[ref.category]}`}
              >
                <div className="flex-shrink-0 mt-0.5">{REF_ICONS[ref.category]}</div>
                <div>
                  <p className="text-sm text-white/70 font-medium group-hover:text-white transition-colors">
                    {ref.title}
                  </p>
                  <p className="text-xs text-white/30 mt-0.5 leading-snug">{ref.description}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-white/20 ml-auto group-hover:text-white/50 transition-colors" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </PublicLayout>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function groupRefsByCategory(refs: ExamReference[]): Partial<Record<RefCategory, ExamReference[]>> {
  const order: RefCategory[] = ['official', 'devdocs', 'github', 'training', 'tool']
  const groups: Partial<Record<RefCategory, ExamReference[]>> = {}
  order.forEach((cat) => {
    const items = refs.filter((r) => r.category === cat)
    if (items.length > 0) groups[cat] = items
  })
  return groups
}
