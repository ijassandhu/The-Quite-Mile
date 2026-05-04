import HeroSection from '@/components/hero/HeroSection'
import StorySection from '@/components/sections/StorySection'

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <StorySection />
    </main>
  )
}
