export function NavbarLogo() {
  return (
    <a
      href="#"
      className="group flex shrink-0 items-center gap-2.5"
      data-testid="navbar-logo"
      onClick={(event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-bb-primary shadow-sm transition-transform duration-200 group-hover:scale-[1.02]"
        aria-hidden="true"
      >
        <span className="text-sm font-bold text-white">B</span>
      </div>
      <span className="text-[17px] font-semibold tracking-tight text-bb-text">
        Bolly<span className="text-bb-primary">Bingo</span>
      </span>
    </a>
  );
}
