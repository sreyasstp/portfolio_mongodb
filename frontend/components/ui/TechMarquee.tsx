'use client'

const TAGS = [
  'MAGENTO 2', 'ADOBE COMMERCE', 'PHP', 'LARAVEL', 'NEXT.JS', 'GRAPHQL',
  'REST API', 'PWA STUDIO', 'MYSQL', 'MONGODB', 'ELASTICSEARCH', 'AWS',
  'JENKINS', 'FASTLY CDN', 'ALGOLIA', 'NGINX', 'OPENAI API', 'AI CHATBOTS',
  'NODE.JS', 'JAVASCRIPT', 'RAZORPAY', 'GIT',
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const repeated = [...TAGS, ...TAGS]

  return (
    <div className="flex overflow-hidden select-none">
      <div
        className="flex gap-4 shrink-0"
        style={{
          animation: `marquee${reverse ? '-reverse' : ''} 35s linear infinite`,
          willChange: 'transform',
        }}
      >
        {repeated.map((tag, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-mono font-semibold tracking-widest border border-white/10 text-white/30 hover:text-brand hover:border-brand/40 transition-colors duration-300 cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <div className="py-12 overflow-hidden space-y-4 border-y border-white/5 bg-dark-800/20">
      <MarqueeRow />
      <MarqueeRow reverse />
    </div>
  )
}
