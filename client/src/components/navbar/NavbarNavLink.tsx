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
      className={`group relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive ? "text-[#FF2D75]" : "text-[#B9B9C5] hover:text-[#FF2D75]"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#FF2D75] transition-all duration-300 ${
          isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
        }`}
      />
    </a>
  );
}
