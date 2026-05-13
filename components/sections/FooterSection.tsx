import Container from '@/components/ui/Container'
import { site } from '@/lib/content/site'

export default function FooterSection() {
  return (
    <footer className="relative z-10 bg-[#0d0c08] py-10 text-white">
      <Container>
        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/85">{site.name}</p>
            <p className="mt-2 text-sm text-white/45">{site.location}</p>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-5">
              {site.nav.map((link) => (
                <li key={link.label}>
                  <a className="text-sm text-white/45 transition-colors hover:text-white/80" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
