import { PublicLayout } from '@/components/layout/PublicLayout'
import { HeroSection } from '@/components/sections/HeroSection'
import { TechMarquee } from '@/components/ui/TechMarquee'
// import { FeaturedProjects } from '@/components/sections/FeaturedProjects' // Commented out: no works to show yet
import { SkillsSection } from '@/components/sections/SkillsSection'
import { FeaturedExtensions } from '@/components/sections/FeaturedExtensions'
import { FeaturedBlogs } from '@/components/sections/FeaturedBlogs'
import { CTASection } from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <TechMarquee />
      {/* <FeaturedProjects /> */}{/* Commented out: no works to show yet */}
      <SkillsSection />
      <FeaturedExtensions />
      <FeaturedBlogs />
      <CTASection />
    </PublicLayout>
  )
}
