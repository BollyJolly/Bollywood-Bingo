import { StarWalletCard } from "./StarWalletCard";
import { starWalletFooterNote, starWalletItems } from "./starWalletData";

export function StarWalletSection() {
  return (
    <section
      id="star-wallet"
      className="relative overflow-hidden bg-gradient-to-br from-[#0D0B16] via-[#25103A] to-[#1a0a28] px-5 py-24 sm:px-8 lg:px-12 lg:py-28"
      data-testid="section-star-wallet"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,45,117,0.12),transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_80%,rgba(139,92,246,0.1),transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Star Wallet
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-[#B9B9C5]">
            Use stars to create and join exciting Bingo rooms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {starWalletItems.map((item, index) => (
            <StarWalletCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-lg text-center text-sm leading-relaxed text-[#B9B9C5]/90">
          {starWalletFooterNote}
        </p>
      </div>
    </section>
  );
}
