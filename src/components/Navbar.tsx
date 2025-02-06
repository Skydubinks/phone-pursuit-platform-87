
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className }: NavLinkProps) => (
  <a href={href} className={cn("nav-link", className)}>
    {children}
  </a>
);

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <nav className="flex flex-col gap-4">
              <NavLink href="/">Accueil</NavLink>
              <NavLink href="/phones">Téléphones</NavLink>
              <NavLink href="/deals">Promotions</NavLink>
              <NavLink href="/support">Support</NavLink>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="mr-4 hidden lg:flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">PHONE PURSUIT</span>
          </a>
          <nav className="flex items-center gap-6">
            <NavLink href="/">Accueil</NavLink>
            <NavLink href="/phones">Téléphones</NavLink>
            <NavLink href="/deals">Promotions</NavLink>
            <NavLink href="/support">Support</NavLink>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              0
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
