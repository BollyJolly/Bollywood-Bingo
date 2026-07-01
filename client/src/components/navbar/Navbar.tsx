import { useState } from "react";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import { NavbarActions } from "./NavbarActions";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarNavLink } from "./NavbarNavLink";
import { navLinks } from "./navbarData";
import { useActiveSection } from "./useActiveSection";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isLinkActive = (sectionId: string | null) => {
    if (sectionId === null) return activeId === "home";
    return activeId === sectionId;
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-bb-border bg-bb-elevated/95 backdrop-blur-md"
        data-testid="navbar"
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-4 sm:px-6 lg:px-8">
          <NavbarLogo />

          <nav
            className="hidden flex-1 items-center justify-center gap-0.5 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <NavbarNavLink
                key={link.id}
                label={link.label}
                href={link.href}
                isActive={isLinkActive(link.sectionId)}
                testId={`nav-${link.id}`}
              />
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <NavbarActions
              onCreateRoom={() => scrollTo("live-rooms")}
              onWalletClick={() => scrollTo("star-wallet")}
            />

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              data-testid="navbar-menu-toggle"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-bb-border text-bb-muted transition-colors hover:bg-bb-surface hover:text-bb-text lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        activeId={activeId}
        onClose={() => setMobileOpen(false)}
        onCreateRoom={() => scrollTo("live-rooms")}
        onWalletClick={() => scrollTo("star-wallet")}
      />
    </>
  );
}
