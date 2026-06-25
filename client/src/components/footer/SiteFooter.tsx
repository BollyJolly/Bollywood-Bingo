import { FooterLogo } from "./FooterLogo";
import { FooterSocialLink } from "./FooterSocial";
import { footerTagline, legalLinks, quickLinks, socialLinks } from "./footerData";

function FooterLinkGroup({
  title,
  links,
  testIdPrefix,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  testIdPrefix: string;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              data-testid={`${testIdPrefix}-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm text-[#B9B9C5] transition-colors hover:text-[#FF2D75]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer
      className="border-t border-white/10 bg-[#0D0B16] px-5 py-14 sm:px-8 lg:px-12"
      data-testid="site-footer"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <FooterLogo />
              <span className="text-lg font-black text-white">BollyBingo</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#B9B9C5]">
              {footerTagline}
            </p>
          </div>

          <FooterLinkGroup title="Quick Links" links={quickLinks} testIdPrefix="footer-link" />
          <FooterLinkGroup title="Legal" links={legalLinks} testIdPrefix="footer-legal" />

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">
              Social
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <FooterSocialLink
                  key={social.icon}
                  label={social.label}
                  href={social.href}
                  icon={social.icon}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-[#7D7D8E]">
            © 2026 BollyBingo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
