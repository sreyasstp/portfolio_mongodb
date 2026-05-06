import Link from 'next/link'
import { Terminal, Github, Linkedin, XIcon, Mail } from 'lucide-react'

const footerLinks = {
  Platform: [
    { label: 'Blog', href: '/blog' },
    { label: 'Extensions', href: '/extensions' },
    { label: 'Resources', href: '/resources' },
  ],
  Learn: [
    { label: 'Certifications', href: '/certifications' },
    { label: 'Magento Guides', href: '/resources?type=guide' },
    { label: 'Cheat Sheets', href: '/resources?type=cheatsheet' },
  ],
  Connect: [
    { label: 'About Me', href: '/about' },
    { label: 'GitHub', href: 'https://github.com', external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sreyastp/', external: true },
  ],
}

const SOCIALS = [
  { Icon: Github,   href: 'https://github.com',                   label: 'GitHub'   },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/sreyastp/', label: 'LinkedIn' },
  { Icon: XIcon,    href: 'https://twitter.com',                    label: 'Twitter'  },
  { Icon: Mail,     href: 'mailto:sreyastp444@gmail.com',          label: 'Email'    },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-900">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="page-container py-14">
        {/* Main grid — brand gets 2fr, each link column 1fr */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 xl:gap-14">

          {/* ── Brand column ── */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="font-mono font-bold text-white">
                sreyas<span className="text-brand">.dev</span>
              </span>
            </Link>

            <p className="text-sm text-white/40 leading-relaxed mb-5 max-w-xs">
              Magento 2 certified developer sharing expertise, extensions, and learning
              resources with the community.
            </p>

            {/* Open to work pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-400/20 bg-green-400/5 mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              <span className="text-xs font-mono text-green-400/70">Open to opportunities</span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/8 text-white/30 hover:text-brand hover:border-brand/40 hover:bg-brand/5 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[11px] font-semibold text-white/25 uppercase tracking-[0.12em] mb-4 font-mono">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25 font-mono">
            &copy; {new Date().getFullYear()} Sreyas. All rights reserved.
          </p>
          <p className="text-xs text-white/25 font-mono">
            Built with <span className="text-brand/70">Laravel</span>
            <span className="text-white/15 mx-1.5">+</span>
            <span className="text-brand/70">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
