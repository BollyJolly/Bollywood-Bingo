export function NavbarLogo() {
  return (
    <a
      href="#"
      className="group flex items-center gap-2.5"
      data-testid="navbar-logo"
      onClick={(event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <div
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFC83D] to-[#F59E0B] shadow-[0_0_20px_rgba(255,200,61,0.35)] transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <span className="text-sm font-black text-[#0D0B16]">77</span>
      </div>
      <span className="text-lg font-bold tracking-tight">
        <span className="text-white">Bolly</span>
        <span className="text-[#FF2D75]">Bingo</span>
      </span>
    </a>
  );
}
