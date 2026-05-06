'use client'

import useSWR from 'swr'
import { motion } from 'framer-motion'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const SKILL_CATEGORIES = [
  { key: 'magento', label: 'Magento / Adobe Commerce', accent: '#f80f01' },
  { key: 'backend', label: 'Backend & Frameworks', accent: '#3b82f6' },
  { key: 'frontend', label: 'Frontend', accent: '#a855f7' },
  { key: 'ai', label: 'AI & Integrations', accent: '#f59e0b' },
  { key: 'devops', label: 'DevOps & Tools', accent: '#22c55e' },
]

export function SkillsSection() {
  const { data } = useSWR('/api/skills', fetcher)
  const skills = data?.skills ?? []

  const grouped = SKILL_CATEGORIES.map((cat) => ({
    ...cat,
    skills: skills.filter((s: any) => s.category === cat.key),
  })).filter((cat) => cat.skills.length > 0)

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-800/30" />
      <div className="relative page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-brand font-mono text-sm mb-2">// technical skills</p>
          <h2 className="section-heading">What I Work With</h2>
          <p className="text-white/40 mt-3 max-w-md mx-auto text-sm">
            5+ years of hands-on experience across the full Magento 2 and modern web stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {grouped.map((category, catIdx) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, x: catIdx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ backgroundColor: category.accent, opacity: 0.6 }}
              />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: category.accent }} />
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest">{category.label}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill: any, skillIdx: number) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 + skillIdx * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-white/80">{skill.name}</span>
                      <span className="text-xs font-mono" style={{ color: category.accent }}>{skill.proficiency}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: catIdx * 0.1 + skillIdx * 0.05 + 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: category.accent }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
