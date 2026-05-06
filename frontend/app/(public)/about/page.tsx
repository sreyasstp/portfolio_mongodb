'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail, MapPin, Briefcase } from 'lucide-react'

const skills = [
  {
    category: 'Magento / Adobe Commerce',
    items: ['Magento 2', 'Adobe Commerce', 'Adobe Commerce Cloud', 'PWA Studio', 'GraphQL APIs', 'REST APIs', 'Algolia Search', 'Fastly CDN'],
  },
  {
    category: 'Backend & Frameworks',
    items: ['PHP', 'Laravel', 'Node.js', 'MySQL', 'MongoDB', 'Elasticsearch', 'AWS', 'Nginx', 'PHP-FPM'],
  },
  {
    category: 'Frontend',
    items: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'PWA Studio', 'Responsive Design'],
  },
  {
    category: 'AI & Integrations',
    items: ['OpenAI API', 'AI Chatbots', 'Google Maps API', 'Razorpay', 'Cashfree', 'ERP Integration'],
  },
  {
    category: 'Tools & Practices',
    items: ['Git', 'Jenkins CI/CD', 'Postman', 'SEO Optimization', 'Server Infrastructure', 'SWAT Compliance'],
  },
]

const timeline = [
  {
    period: 'Apr 2024 – Present',
    title: 'E-commerce Developer',
    company: 'Tech9logy Creators, Haryana',
    desc: 'Custom Magento commands for ERP integration, AI chatbot with OpenAI API, store locator with Google Maps, Cashfree & Razorpay payment gateways, Node.js + MongoDB APIs, server infrastructure management.',
  },
  {
    period: 'Sep 2021 – Apr 2024',
    title: 'Software Engineer',
    company: 'Experion Technologies, Kochi',
    desc: 'Delivered 5+ end-to-end Magento/Adobe Commerce projects, built 3 PWAs, Fastly CDN + Algolia Search integration, multistore Adobe Commerce Cloud setup, ERP data migration, Magento version upgrades.',
  },
  {
    period: '2025',
    title: 'Adobe Commerce Professional Developer',
    company: 'Adobe Certification',
    desc: 'Achieved Adobe Commerce Professional Developer certification, validating expertise across the full Adobe Commerce platform.',
  },
  {
    period: '2017 – 2021',
    title: 'B.Tech – Electrical & Electronics Engineering',
    company: 'NSS Engineering College, Palakkad',
    desc: 'Bachelor of Technology with a foundation in engineering and problem-solving that transitioned into a full-stack e-commerce career.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <div className="page-container py-16">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-green-400/30 text-green-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Open to new opportunities
            </div>

            <p className="text-brand font-mono text-sm mb-3">// about me</p>
            <h1 className="text-4xl md:text-5xl font-black text-gradient mb-6 leading-tight">
              Adobe Commerce<br />Developer
            </h1>
            <p className="text-white/60 leading-relaxed mb-4">
              I&apos;m Sreyas T P — an Adobe Commerce (Magento 2) Developer with 4.5 years of experience
              in backend development, third-party integrations, and e-commerce platform optimization.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              I&apos;ve delivered 5+ Magento/Adobe Commerce projects including PWAs and frontend
              implementations, with deep expertise in GraphQL & REST APIs, payment gateway integrations,
              and scalable custom module development.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Currently at Tech9logy Creators building complex integrations, AI-powered features, and
              managing full Magento server infrastructure. Holding the{' '}
              <span className="text-brand font-medium">Adobe Commerce Professional Developer</span> certification (2025).
            </p>

            <div className="flex items-center gap-2 text-white/30 text-sm mb-8">
              <MapPin className="w-3.5 h-3.5" />
              <span>Palakkad, Kerala, India · Open to remote</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="mailto:sreyastp444@gmail.com" className="btn-primary">
                <Mail className="w-4 h-4" />
                sreyastp444@gmail.com
              </a>
              <Link href="/portfolio" className="btn-ghost">
                View Work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats card */}
          <div className="glass rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { value: '4.5', label: 'Years Experience', sub: 'in Magento / Adobe Commerce' },
                { value: '1', label: 'Adobe Certification', sub: 'Professional Developer 2025' },
                { value: '5+', label: 'Projects Delivered', sub: 'Magento / Adobe Commerce' },
                { value: '3', label: 'PWAs Built', sub: 'with PWA Studio' },
              ].map(({ value, label, sub }) => (
                <div key={label} className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-brand mb-0.5">{value}</div>
                  <div className="text-xs text-white/60 font-medium">{label}</div>
                  <div className="text-xs text-white/25 mt-0.5">{sub}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3">
              {[
                { Icon: Github, href: 'https://github.com', label: 'GitHub' },
                { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { Icon: Mail, href: 'mailto:sreyastp444@gmail.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/40 hover:text-brand hover:border-brand/50 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="mb-10">
            <p className="text-brand font-mono text-sm mb-2">// technical skills</p>
            <h2 className="section-heading">What I Work With</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="mb-10">
            <p className="text-brand font-mono text-sm mb-2">// experience & education</p>
            <h2 className="section-heading">Career Timeline</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[7.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-brand via-white/10 to-transparent hidden sm:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 sm:gap-10"
                >
                  <div className="flex-shrink-0 w-24 sm:w-28 text-right pt-1">
                    <span className="text-xs font-mono text-brand/80 leading-tight">{item.period}</span>
                  </div>
                  <div className="relative flex-1">
                    <div className="absolute -left-[2.65rem] top-2 w-3 h-3 rounded-full bg-brand shadow-glow hidden sm:block" />
                    <div className="glass rounded-xl p-5 hover:border-white/15 transition-colors">
                      <div className="flex items-start gap-2 mb-1">
                        <Briefcase className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-bold text-white leading-snug">{item.title}</h3>
                          <p className="text-xs text-brand font-mono mt-0.5">{item.company}</p>
                        </div>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed mt-3">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial from-brand/8 via-transparent to-transparent" />
          <div className="relative z-10">
            <p className="text-brand font-mono text-sm mb-3">// hiring?</p>
            <h2 className="text-3xl font-black text-gradient mb-4">Let&apos;s work together</h2>
            <p className="text-white/50 max-w-lg mx-auto mb-8">
              I&apos;m actively looking for my next role. If you&apos;re building an e-commerce platform
              and need an experienced Adobe Commerce developer, reach out.
            </p>
            <a href="mailto:sreyastp444@gmail.com" className="btn-primary">
              <Mail className="w-4 h-4" />
              sreyastp444@gmail.com
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
