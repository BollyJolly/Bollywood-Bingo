import { useState } from "react";
import { motion } from "framer-motion";
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
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 h-20 border-b border-white/[0.08] bg-[rgba(13,11,22,0.75)] backdrop-blur-[18px]"
        data-testid="navbar"
      >
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <NavbarLogo />

          <nav
            className="hidden items-center gap-1 lg:flex"
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

          <div className="flex items-center gap-2">
            <NavbarActions
              onCreateRoom={() => scrollTo("live-rooms")}
              onWalletClick={() => scrollTo("star-wallet")}
            />

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              data-testid="navbar-menu-toggle"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

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
