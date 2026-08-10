import { useLang } from '../lib/lang-context'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="w-full bg-black border-t border-neutral-900 px-6 md:px-8 py-8 flex items-center justify-between">
      <p className="text-neutral-500 text-xs md:text-sm">
        © 2026 — {t.footer.rights}
      </p>
      <div className="flex gap-4">
        <a href="#" className="text-neutral-500 text-xs md:text-sm hover:text-white transition-colors">
          GitHub
        </a>
        <a href="#" className="text-neutral-500 text-xs md:text-sm hover:text-white transition-colors">
          LinkedIn
        </a>
      </div>
    </footer>
  )
}