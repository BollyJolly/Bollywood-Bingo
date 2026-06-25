import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { mobileExtraLinks, navLinks } from "./navbarData";
import { NavbarNavLink } from "./NavbarNavLink";
import { StarWalletPill } from "./StarWalletPill";

type MobileMenuProps = {
  open: boolean;
  activeId: string;
  onClose: () => void;
  onCreateRoom: () => void;
  onWalletClick: () => void;
};

export function MobileMenu({
  open,
  activeId,
  onClose,
  onCreateRoom,
  onWalletClick,
}: MobileMenuProps) {
  const scrollAndClose = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-[#0D0B16] shadow-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            data-testid="mobile-menu"
          >
            <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
              <span className="text-lg font-bold text-white">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                data-testid="mobile-menu-close"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-[#B9B9C5] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <NavbarNavLink
                      label={link.mobileLabel ?? link.label}
                      href={link.href}
                      isActive={
                        link.sectionId === null
                          ? activeId === "home"
                          : activeId === link.sectionId
                      }
                      onClick={() => scrollAndClose(link.href)}
                      testId={`mobile-nav-${link.id}`}
                    />
                  </li>
                ))}
              </ul>

              <div className="my-6 border-t border-white/10" />

              <ul className="space-y-1">
                {mobileExtraLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollAndClose(link.href)}
                      data-testid={`mobile-nav-${link.id}`}
                      className="w-full px-3 py-3 text-left text-sm font-medium text-[#B9B9C5] transition-colors hover:text-[#FF2D75]"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <StarWalletPill onClick={() => { onWalletClick(); onClose(); }} />
              </div>
            </nav>

            <div className="border-t border-white/10 p-5">
              <button
                type="button"
                onClick={() => { onCreateRoom(); onClose(); }}
                data-testid="mobile-nav-create-room"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF2D75] py-3 text-sm font-bold text-white hover:bg-[#E91E63]"
              >
                Create Room
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
