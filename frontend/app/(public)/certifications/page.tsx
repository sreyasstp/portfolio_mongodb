'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import useSWR from 'swr'
import { Loader2 } from 'lucide-react'
import {
  Award, BookOpen, ChevronRight, Clock, HelpCircle, Layers, Star, Target,
} from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { CertLevel, LEVEL_COLORS, LEVEL_ORDER } from '@/lib/data/certifications'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const LEVEL_ICONS: Record<CertLevel, React.ReactNode> = {
  Professional: <Layers className="w-4 h-4" />,
  Expert: <Target className="w-4 h-4" />,
  Master: <Star className="w-4 h-4" />,
}

const LEVEL_DESC: Record<CertLevel, string> = {
  Professional: 'Entry-level — 0–12 months experience. Validates core platform knowledge.',
  Expert: '1–3 years experience. Proves advanced implementation skills.',
  Master: '3+ years experience. The highest Adobe Commerce certification.',
}

interface ExamGuide {
  id: string; slug: string; examCode: string; title: string; shortTitle: string;
  level: CertLevel; description: string; questions: number; passingScore: number;
  duration: number; costUSD: number; experience: string; officialUrl: string;
  prerequisites: string[] | null;
  sections: Array<{ id: string; title: string; weight: number; description: string; objectives: string[]; subtopics: string[] }>;
  references: Array<{ title: string; url: string; category: string; description: string }>;
}

export default function CertificationsPage() {
  const levels: CertLevel[] = ['Professional', 'Expert', 'Master']
  const { data, isLoading } = useSWR('/api/exam-guides', fetcher)
  const exams: ExamGuide[] = data?.examGuides ?? []

  return (
    <PublicLayout>
      <div className="page-container py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="text-brand font-mono text-sm mb-2">// certification-exams</p>
          <h1 className="text-4xl md:text-5xl font-black text-gradient mb-4">Adobe Commerce Exam Guide</h1>
          <p className="text-white/50 max-w-2xl leading-relaxed">
            The complete roadmap to Adobe Commerce (Magento) certification — all 7 official exams across Professional, Expert, and Master tiers.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-4 mb-16">
          {[
            { label: 'Total Exams', value: '7', icon: <Award className="w-4 h-4 text-brand" /> },
            { label: 'Exam Tiers', value: '3', icon: <Layers className="w-4 h-4 text-brand" /> },
            { label: 'Issuer', value: 'Adobe', icon: <Star className="w-4 h-4 text-brand" /> },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 flex items-center gap-3">
              {stat.icon}
              <div><p className="text-xl font-black text-white">{stat.value}</p><p className="text-xs text-white/40">{stat.label}</p></div>
            </div>
          ))}
        </motion.div>

        {isLoading && (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="w-8 h-8 text-brand animate-spin" />
          </div>
        )}

        {!isLoading && levels.map((level, li) => {
          const levelExams = exams.filter((e) => e.level === level).sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level])
          if (levelExams.length === 0) return null
          const colors = LEVEL_COLORS[level]
          return (
            <motion.section key={level} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + li * 0.1 }} className="mb-14">
              <div className="flex items-center gap-3 mb-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}>
                  {LEVEL_ICONS[level]}{level}
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
              <p className="text-white/30 text-sm mb-6 ml-1">{LEVEL_DESC[level]}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {levelExams.map((exam, i) => <ExamCard key={exam.slug} exam={exam} index={i} />)}
              </div>
            </motion.section>
          )
        })}

        {!isLoading && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 glass rounded-2xl p-8 text-center">
            <p className="text-brand font-mono text-sm mb-2">// start preparing</p>
            <h2 className="text-2xl font-black text-gradient mb-3">Free Study Resources</h2>
            <p className="text-white/50 mb-6 max-w-lg mx-auto">Curated cheatsheets, notes, and guides to accelerate your Magento certification journey.</p>
            <Link href="/resources" className="btn-primary">Browse Resources</Link>
          </motion.div>
        )}
      </div>
    </PublicLayout>
  )
}

function ExamCard({ exam, index }: { exam: ExamGuide; index: number }) {
  const colors = LEVEL_COLORS[exam.level]
  const LEVEL_ICONS: Record<CertLevel, React.ReactNode> = {
    Professional: <Layers className="w-4 h-4" />,
    Expert: <Target className="w-4 h-4" />,
    Master: <Star className="w-4 h-4" />,
  }
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }} className="group glass-hover rounded-2xl p-6 flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-4">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-mono font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}>{exam.examCode}</span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${colors.bg} ${colors.text} ${colors.border}`}>{LEVEL_ICONS[exam.level]}{exam.level}</span>
      </div>
      <h2 className="font-bold text-white text-base leading-snug mb-2 group-hover:text-brand transition-colors">{exam.shortTitle}</h2>
      <p className="text-sm text-white/40 leading-relaxed mb-5 flex-1">{exam.description.slice(0, 110)}…</p>
      <div className="flex items-center gap-4 text-xs text-white/30 mb-5">
        <span className="flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5" />{exam.questions} questions</span>
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{exam.duration} min</span>
        <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" />{exam.sections.length} sections</span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {exam.sections.slice(0, 3).map((s) => (
          <span key={s.id} className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/40">{s.title.split(' ').slice(0, 3).join(' ')}</span>
        ))}
        {exam.sections.length > 3 && <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/30">+{exam.sections.length - 3} more</span>}
      </div>
      <Link href={`/certifications/${exam.slug}`} className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-400 transition-colors font-medium">
        Explore Exam Guide<ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  )
}
