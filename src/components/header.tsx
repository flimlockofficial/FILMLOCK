
"use client";

import Link from "next/link";
import { Menu, Clapperboard, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { 
    href: "/movies", 
    label: "Movies",
    subLinks: [
      { href: "/movies/south-indian", label: "South Indian Hindi Dubbed" },
      { href: "/movies/bollywood", label: "Bollywood" },
      { href: "/movies/hollywood", label: "Hollywood" },
      { href: "/movies/anime", label: "Anime" },
    ]
  },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="FilmLock Home">
          <Clapperboard className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-white">
            FILM<span className="text-primary">LOCK</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            link.subLinks ? (
              <DropdownMenu key={link.href}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={cn(
                    "flex items-center gap-1 transition-colors hover:text-primary",
                    pathname.startsWith(link.href) ? "text-primary" : "text-muted-foreground"
                  )}>
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.subLinks.map((subLink) => (
                    <DropdownMenuItem key={subLink.href} asChild>
                      <Link href={subLink.href}>{subLink.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 pt-8">
                {navLinks.map((link) => (
                   <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-xl font-medium transition-colors hover:text-primary",
                       pathname.startsWith(link.href) && href !== "/" || pathname === link.href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
