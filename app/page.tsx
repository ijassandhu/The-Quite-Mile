import HeroSection from '@/components/hero/HeroSection'
import AccessSection from '@/components/sections/AccessSection'
import CTASection from '@/components/sections/CTASection'
import ExperiencesSection from '@/components/sections/ExperiencesSection'
import FooterSection from '@/components/sections/FooterSection'
import GallerySection from '@/components/sections/GallerySection'
import StorySection from '@/components/sections/StorySection'
import StayShowcaseSection from '@/components/sections/StayShowcaseSection'
import ScrollAtmosphere from '@/components/visuals/ScrollAtmosphere'

export default function Home() {
  return (
    <>
      <ScrollAtmosphere />
      <main className="relative flex flex-1 flex-col overflow-hidden">
        <HeroSection />
        <StorySection />
        <ExperiencesSection />
        <StayShowcaseSection />
        <GallerySection />
        <AccessSection />
        <CTASection />
      </main>
      <FooterSection />
    </>
  )
}
