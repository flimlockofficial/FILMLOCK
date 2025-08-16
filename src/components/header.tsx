
"use client";

import Link from "next/link";
import { Menu, Clapperboard, ShieldCheck, MoreVertical, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { logout } from "@/app/admin/login/actions";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const baseNavLinks = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin } = useAdminAuth();

  const navLinks = isAdmin 
    ? [...baseNavLinks, { href: "/admin", label: "Admin Panel", icon: ShieldCheck }] 
    : baseNavLinks;

  const mobileNavLinks = isAdmin 
    ? [...baseNavLinks, { href: "/admin", label: "Admin Panel", icon: ShieldCheck }]
    : baseNavLinks;


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="FilmLock Home">
          <Clapperboard className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-white">
            FILM<span className="text-primary">LOCK</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 transition-colors hover:text-primary flex items-center gap-2",
                  pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)) 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
          </nav>
          
          {isAdmin && (
            <div className="hidden md:flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                    <span className="sr-only">Admin Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => logout()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>


        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
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
                {mobileNavLinks.map((link) => (
                   <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-xl font-medium transition-colors hover:text-primary flex items-center gap-3",
                       (pathname.startsWith(link.href) && link.href !== "/") || pathname === link.href 
                        ? "text-primary" 
                        : "text-foreground"
                    )}
                  >
                     {link.icon && <link.icon className="h-5 w-5" />}
                    {link.label}
                  </Link>
                ))}
                 {isAdmin && (
                    <form action={logout}>
                        <button type="submit" className="text-xl font-medium transition-colors hover:text-primary flex items-center gap-3 text-destructive">
                            <LogOut className="h-5 w-5" />
                            Logout
                        </button>
                    </form>
                 )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
