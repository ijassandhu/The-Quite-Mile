import Container from '@/components/ui/Container'
import { site } from '@/lib/content/site'

export default function HeroHeader() {
  return (
    <header className="absolute left-0 right-0 top-0 z-20">
      {/* Gradient so brand + nav text reads over any sky/image tone */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)',
        }}
      />

      <div className="relative py-7">
        <Container>
          <nav
            className="flex items-center justify-between"
            aria-label="Main navigation"
          >
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-white/90">
              {site.name}
            </span>

            <ul className="hidden items-center gap-8 sm:flex">
              {site.nav.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/55 transition-colors duration-200 hover:text-white/85"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  )
}
