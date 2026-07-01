import { cn } from "@/lib/utils";

type NavbarNavLinkProps = {
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
  testId?: string;
};

export function NavbarNavLink({ label, href, isActive, onClick, testId }: NavbarNavLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      data-testid={testId}
      className={cn(
        "rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-150",
        isActive
          ? "bg-bb-primary/10 text-bb-primary"
          : "text-bb-muted hover:bg-bb-surface hover:text-bb-text",
      )}
    >
      {label}
    </a>
  );
}
