import Link from 'next/link'

import { ThemeToggle } from './theme-switcher'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center m-auto">
        <div className="flex gap-6">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            Nova App
          </Link>
          <nav className="flex items-center gap-4 text-sm xl:gap-2">
            <Button
              className="text-foreground/80"
              variant="ghost"
              size="sm"
              asChild
            >
              <Link href="/employees">Funcionários</Link>
            </Button>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
