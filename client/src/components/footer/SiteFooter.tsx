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
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-bb-text">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              data-testid={`${testIdPrefix}-${link.label.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm text-bb-muted transition-colors hover:text-bb-primary"
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
      className="border-t border-bb-border bg-bb-bg px-5 py-14 sm:px-8 lg:px-12"
      data-testid="site-footer"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <FooterLogo />
              <span className="text-lg font-black text-bb-text">BollyBingo</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bb-muted">
              {footerTagline}
            </p>
          </div>

          <FooterLinkGroup title="Quick Links" links={quickLinks} testIdPrefix="footer-link" />
          <FooterLinkGroup title="Legal" links={legalLinks} testIdPrefix="footer-legal" />

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-bb-text">
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

        <div className="mt-12 border-t border-bb-border pt-6 text-center">
          <p className="text-sm text-bb-muted">
            © 2026 BollyBingo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
