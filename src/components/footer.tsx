import { Clapperboard, Instagram, Send, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto max-w-screen-2xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Link href="/" className="flex items-center gap-2" aria-label="FilmLock Home">
             <Clapperboard className="h-8 w-8 text-primary" />
             <span className="font-headline text-2xl font-bold text-white">
               FILM<span className="text-primary">LOCK</span>
             </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            © {year} FilmLock. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://www.instagram.com/filmlock_official?igsh=MTRiaHlrendzMGVjOA==" target="_blank" rel="noopener noreferrer" aria-label="FilmLock on Instagram">
              <Instagram className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="FilmLock on Youtube">
              <Youtube className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="https://t.me/flimlock" target="_blank" rel="noopener noreferrer" aria-label="FilmLock on Telegram">
              <Send className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
