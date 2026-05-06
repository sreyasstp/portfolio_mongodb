'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSWR from 'swr'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Copy,
  Info,
  Layers,
  Lightbulb,
  Loader2,
  Star,
  Target,
} from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { CertLevel, LEVEL_COLORS } from '@/lib/data/certifications'

const fetcher = (url: string) => fetch(url).then(r => r.json())

// ─── Types ────────────────────────────────────────────────────────────────────

type BlockType =
  | { type: 'heading'; text: string; level?: 2 | 3 }
  | { type: 'paragraph'; text: string }
  | { type: 'code'; language: string; filename?: string; code: string }
  | { type: 'file-tree'; tree: string; caption?: string }
  | { type: 'tip'; title: string; body: string }
  | { type: 'warning'; body: string }
  | { type: 'info'; title: string; body: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'keypoints'; title?: string; items: string[] }
  | { type: 'divider' }

interface LessonContent {
  intro: string
  blocks: BlockType[]
}

interface Lesson {
  id: string
  objectiveIndex: number
  title: string
  slug: string
  content: LessonContent
  sortOrder: number
}

interface SectionNav {
  id: string
  title: string
  weight: number
  objectives: string[]
}

interface ExamNav {
  examCode: string
  title: string
  shortTitle: string
  level: CertLevel
  sections: SectionNav[]
}

interface LearnSection {
  id: string
  title: string
  description: string
  weight: number
  objectives: string[]
  lessons: Lesson[]
}

// ─── Code Block with Copy ─────────────────────────────────────────────────────

function CodeBlock({ language, filename, code }: { language: string; filename?: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [code])

  const langColors: Record<string, string> = {
    php: 'text-violet-400',
    xml: 'text-amber-400',
    json: 'text-green-400',
    bash: 'text-sky-400',
    typescript: 'text-blue-400',
    sql: 'text-orange-400',
  }

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 my-4">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-white/30" />
          {filename && (
            <span className="text-xs font-mono text-white/50">{filename}</span>
          )}
          <span className={`text-xs font-mono font-bold ${langColors[language] ?? 'text-white/30'}`}>
            {language}
          </span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors"
        >
          {copied ? (
            <>
              <ClipboardCheck className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre className="overflow-x-auto p-4 bg-[#0d0d0d] text-sm leading-relaxed">
        <code className="font-mono text-white/75 whitespace-pre">{code}</code>
      </pre>
    </div>
  )
}

// ─── Block Renderer ───────────────────────────────────────────────────────────

function BlockRenderer({ block }: { block: BlockType }) {
  switch (block.type) {
    case 'heading':
      return block.level === 3 ? (
        <h3 className="text-base font-bold text-white mt-6 mb-2">{block.text}</h3>
      ) : (
        <h2 className="text-lg font-bold text-white mt-8 mb-3 pb-2 border-b border-white/5">
          {block.text}
        </h2>
      )

    case 'paragraph':
      return <p className="text-white/65 leading-loose text-[0.9rem] my-3">{block.text}</p>

    case 'code':
      return <CodeBlock language={block.language} filename={block.filename} code={block.code} />

    case 'file-tree':
      return (
        <div className="rounded-xl overflow-hidden border border-white/10 my-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
            <Layers className="w-3.5 h-3.5 text-white/30" />
            <span className="text-xs font-mono text-white/40">file structure</span>
          </div>
          <pre className="overflow-x-auto p-4 bg-[#0d0d0d] text-sm leading-relaxed">
            <code className="font-mono text-white/65 whitespace-pre">{block.tree}</code>
          </pre>
          {block.caption && (
            <p className="px-4 py-2 text-xs text-white/25 border-t border-white/5">{block.caption}</p>
          )}
        </div>
      )

    case 'tip':
      return (
        <div className="my-4 flex gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-4">
          <Lightbulb className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-green-400 mb-1">{block.title}</p>
            <p className="text-sm text-green-300/70 leading-relaxed">{block.body}</p>
          </div>
        </div>
      )

    case 'warning':
      return (
        <div className="my-4 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-300/70 leading-relaxed">{block.body}</p>
        </div>
      )

    case 'info':
      return (
        <div className="my-4 flex gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
          <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-blue-400 mb-1">{block.title}</p>
            <p className="text-sm text-blue-300/70 leading-relaxed">{block.body}</p>
          </div>
        </div>
      )

    case 'table':
      return (
        <div className="my-4 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                {block.headers.map((h, i) => (
                  <th key={i} className="px-4 py-2.5 text-left text-xs font-bold text-white/50 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-2.5 text-white/60 leading-snug align-top ${ci === 0 ? 'font-mono text-xs text-brand/80 font-medium' : ''}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'keypoints':
      return (
        <div className="my-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          {block.title && (
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-brand" />
              <p className="text-xs font-bold text-brand uppercase tracking-wider">{block.title}</p>
            </div>
          )}
          <ul className="space-y-2">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/60 leading-relaxed">
                <Check className="w-3.5 h-3.5 text-brand/60 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'divider':
      return <hr className="my-6 border-white/5" />

    default:
      return null
  }
}

// ─── Level icons ──────────────────────────────────────────────────────────────

const LEVEL_ICONS: Record<CertLevel, React.ReactNode> = {
  Professional: <Layers className="w-3 h-3" />,
  Expert: <Target className="w-3 h-3" />,
  Master: <Star className="w-3 h-3" />,
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LearnSectionPage() {
  const { slug, sectionKey } = useParams<{ slug: string; sectionKey: string }>()

  const { data, isLoading: loading } = useSWR(
    slug && sectionKey ? `/api/exam-guides/${slug}/sections/${sectionKey}` : null,
    fetcher
  )

  const exam = data?.examGuide ?? null
  const section = data?.examGuideSection ?? null
  const lessons = section?.lessons ?? []

  const [activeIndex, setActiveIndex] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const activeLesson = lessons[activeIndex] ?? null

  useEffect(() => {
    setHeaderVisible(true)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [activeIndex])

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setHeaderVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [exam])

  // ── Loading ──
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
  if (!exam || !section) {
    return (
      <PublicLayout>
        <div className="page-container py-32 text-center">
          <p className="text-brand font-mono text-sm mb-4">// 404</p>
          <h1 className="text-2xl font-black text-white mb-6">Section not found</h1>
          <Link href={`/certifications/${slug}`} className="btn-ghost">
            ← Back to Exam Guide
          </Link>
        </div>
      </PublicLayout>
    )
  }

  if (lessons.length === 0) {
    return (
      <PublicLayout>
        <div className="page-container py-32 text-center">
          <p className="text-brand font-mono text-sm mb-4">// coming-soon</p>
          <h1 className="text-2xl font-black text-white mb-6">No lessons yet</h1>
          <Link href={`/certifications/${slug}`} className="btn-ghost">
            ← Back to Exam Guide
          </Link>
        </div>
      </PublicLayout>
    )
  }

  const colors = LEVEL_COLORS[exam.level as CertLevel]

  return (
    <PublicLayout>

      {/* ── Scroll context bar ── */}
      <AnimatePresence>
        {!headerVisible && exam && activeLesson && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 left-0 right-0 z-40 border-b border-white/8"
            style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(16px)' }}
          >
            <div className="page-container h-10 flex items-center justify-between gap-4">
              {/* Left: context */}
              <div className="flex items-center gap-2 min-w-0">
                <span className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border flex-shrink-0 ${colors.bg} ${colors.text} ${colors.border}`}>
                  {exam.examCode}
                </span>
                <span className="text-white/50 text-xs hidden sm:block flex-shrink-0">{section.title}</span>
                <ChevronRight className="w-3 h-3 text-white/20 flex-shrink-0" />
                <span className="text-white/75 text-sm font-semibold truncate">{activeLesson.title}</span>
              </div>
              {/* Right: lesson position + nav */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs font-mono font-bold ${colors.text}`}>
                  {activeIndex + 1}/{lessons.length}
                </span>
                <button
                  onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
                  disabled={activeIndex === 0}
                  className="w-6 h-6 rounded flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveIndex(i => Math.min(lessons.length - 1, i + 1))}
                  disabled={activeIndex === lessons.length - 1}
                  className="w-6 h-6 rounded flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen">

        {/* ── Top Header ── */}
        <div ref={headerRef} className="border-b border-white/5 bg-black/20">
          <div className="page-container py-4">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-white/25 mb-3">
              <Link href="/certifications" className="hover:text-white/50 transition-colors">
                Certifications
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/certifications/${slug}`} className="hover:text-white/50 transition-colors">
                {exam.shortTitle}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/40">{section.title}</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-bold border ${colors.bg} ${colors.text} ${colors.border}`}>
                    {exam.examCode}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}>
                    {LEVEL_ICONS[exam.level as CertLevel]}
                    {exam.level}
                  </span>
                </div>
                <h1 className="text-lg font-black text-white">
                  <span className="text-white/40 font-normal">Study: </span>
                  {section.title}
                  <span className={`ml-2 text-sm font-mono ${colors.text}`}>{section.weight}% of exam</span>
                </h1>
              </div>

              <Link
                href={`/certifications/${slug}`}
                className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to overview
              </Link>
            </div>

            {/* Section-level tabs */}
            <div className="mt-4 flex items-center gap-1">
              {exam.sections.map((sec: SectionNav, i: number) => {
                const isCurrent = sec.id === sectionKey
                const isPast = exam.sections.findIndex((s: SectionNav) => s.id === sectionKey) > i
                return (
                  <Link
                    key={sec.id}
                    href={`/certifications/${slug}/learn/${sec.id}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
                      isCurrent
                        ? `${colors.bg} ${colors.text} ${colors.border} font-semibold`
                        : isPast
                        ? 'border-green-500/20 bg-green-500/5 text-green-400'
                        : 'border-white/8 text-white/35 hover:text-white/60 hover:bg-white/5 hover:border-white/15'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                      isCurrent ? 'bg-current/20' : isPast ? 'bg-green-500/20 text-green-400' : 'bg-white/8 text-white/30'
                    }`}>
                      {isPast ? '✓' : i + 1}
                    </span>
                    {sec.title}
                    {isCurrent && (
                      <span className="text-[10px] font-mono opacity-60">{sec.weight}%</span>
                    )}
                  </Link>
                )
              })}
              {/* Lesson progress within current section */}
              <div className="ml-auto flex items-center gap-2">
                <div className="hidden sm:flex gap-0.5">
                  {lessons.map((_: Lesson, i: number) => (
                    <div
                      key={i}
                      className={`h-1 w-4 rounded-full transition-all ${
                        i < activeIndex ? 'bg-brand' :
                        i === activeIndex ? 'bg-brand/60 w-6' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-mono text-white/30">
                  {activeIndex + 1}/{lessons.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="page-container py-6">
          <div className="flex gap-6 items-start">

            {/* ── Left sidebar: lesson list ── */}
            <aside className={`hidden lg:block w-72 xl:w-80 flex-shrink-0 sticky self-start transition-[top] duration-200 ${headerVisible ? 'top-20' : 'top-28'}`}>
              <div className="glass rounded-xl overflow-hidden">

                {/* Sidebar header */}
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <p className="text-brand font-mono text-xs">// objectives</p>
                  <span className="text-xs font-mono text-white/25">
                    {activeIndex + 1} / {lessons.length}
                  </span>
                </div>

                {/* Progress bar across full width */}
                <div className="h-0.5 bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeIndex + 1) / lessons.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="h-full bg-brand/70"
                  />
                </div>

                <nav className="p-2">
                  {lessons.map((lesson: Lesson, i: number) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveIndex(i)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all group flex items-center gap-3 ${
                        i === activeIndex
                          ? 'bg-brand/10 border border-brand/20'
                          : 'border border-transparent hover:bg-white/5'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        i === activeIndex ? 'bg-brand text-white' :
                        i < activeIndex ? 'bg-green-500/20 text-green-400' : 'bg-white/8 text-white/30 group-hover:bg-white/15'
                      }`}>
                        {i < activeIndex ? '✓' : i + 1}
                      </span>
                      <span className={`text-xs leading-snug ${
                        i === activeIndex ? 'text-brand font-medium' : 'text-white/45 group-hover:text-white/75'
                      }`}>
                        {lesson.title}
                      </span>
                    </button>
                  ))}
                </nav>

                {/* Section weight bar */}
                <div className="mx-4 mb-4 mt-1 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-white/25">Section weight</span>
                    <span className={`font-bold font-mono ${colors.text}`}>{section.weight}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${section.weight}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full bg-brand/60"
                    />
                  </div>
                  <p className="text-xs text-white/25 mt-1">of total exam score</p>
                </div>

                {/* Next section CTA — shown when on last lesson */}
                {(() => {
                  const currentSectionIdx = exam.sections.findIndex((s: SectionNav) => s.id === sectionKey)
                  const nextSection = exam.sections[currentSectionIdx + 1]
                  if (!nextSection) return null
                  const isLastLesson = activeIndex === lessons.length - 1
                  return (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      {isLastLesson ? (
                        <Link
                          href={`/certifications/${slug}/learn/${nextSection.id}`}
                          className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-brand/10 border border-brand/25 text-brand hover:bg-brand/15 transition-all group"
                        >
                          <div className="min-w-0">
                            <p className="text-[10px] font-mono text-brand/60 mb-0.5">next section</p>
                            <p className="text-xs font-semibold truncate">{nextSection.title}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-white/5 bg-white/[0.02]">
                          <div className="min-w-0">
                            <p className="text-[10px] font-mono text-white/20 mb-0.5">next section</p>
                            <p className="text-xs text-white/35 truncate">{nextSection.title}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-white/15 flex-shrink-0" />
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            </aside>

            {/* ── Center: lesson content ── */}
            <main ref={contentRef} className="flex-1 min-w-0">

              {activeLesson && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLesson.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Lesson header */}
                    <div className="glass rounded-2xl p-6 mb-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-brand font-mono text-xs mb-2">
                            // objective {activeLesson.objectiveIndex + 1} of {lessons.length}
                          </p>
                          <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-3">
                            {activeLesson.title}
                          </h2>
                          <p className="text-[0.9rem] text-white/55 leading-loose">
                            {activeLesson.content.intro}
                          </p>
                        </div>
                        {/* Progress circle */}
                        <div className="flex-shrink-0 relative w-14 h-14">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="20" fill="none" strokeWidth="3" className="stroke-white/5" />
                            <motion.circle
                              cx="24" cy="24" r="20" fill="none" strokeWidth="3"
                              strokeDasharray={`${2 * Math.PI * 20}`}
                              initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                              animate={{
                                strokeDashoffset: 2 * Math.PI * 20 * (1 - (activeIndex + 1) / lessons.length)
                              }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              className="stroke-brand"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-brand">
                              {activeIndex + 1}/{lessons.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4 flex gap-1">
                        {lessons.map((_: Lesson, i: number) => (
                          <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`h-1 flex-1 rounded-full transition-all ${
                              i < activeIndex ? 'bg-brand' :
                              i === activeIndex ? 'bg-brand/60' : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Lesson body */}
                    <div className="glass rounded-2xl p-6 mb-6">
                      {activeLesson.content.blocks.map((block: BlockType, i: number) => (
                        <BlockRenderer key={i} block={block} />
                      ))}
                    </div>

                    {/* Prev / Next navigation */}
                    <div className="flex items-center justify-between gap-4">
                      {activeIndex > 0 ? (
                        <button
                          onClick={() => setActiveIndex(activeIndex - 1)}
                          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-sm text-white/50 hover:text-white/80 hover:border-white/20 hover:bg-white/5 transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span className="hidden sm:block">
                            {lessons[activeIndex - 1]?.title.replace(/^Describe\s+/i, '').replace(/^Explain\s+/i, '')}
                          </span>
                          <span className="sm:hidden">Previous</span>
                        </button>
                      ) : (
                        <Link
                          href={`/certifications/${slug}`}
                          className="flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-sm text-white/40 hover:text-white/70 hover:border-white/20 transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back to overview
                        </Link>
                      )}

                      {activeIndex < lessons.length - 1 ? (
                        <button
                          onClick={() => setActiveIndex(activeIndex + 1)}
                          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-brand/10 border border-brand/20 text-sm text-brand hover:bg-brand/20 transition-all"
                        >
                          <span className="hidden sm:block">
                            {lessons[activeIndex + 1]?.title.replace(/^Describe\s+/i, '').replace(/^Explain\s+/i, '')}
                          </span>
                          <span className="sm:hidden">Next</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-400"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Section complete!
                        </motion.div>
                      )}
                    </div>

                  </motion.div>
                </AnimatePresence>
              )}
            </main>

          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
