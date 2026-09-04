"use client";

import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Services: [
    "Premium Websites",
    "AI Automations",
    "Custom Software",
    "SaaS Products",
    "Business Dashboards",
    "Digital Experiences",
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  Connect: [
    { label: "Instagram", href: "https://www.instagram.com/hadesltd.io", external: true },
    { label: "Email", href: "mailto:hadesltd.io@gmail.com", external: true },
  ],
};

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith("http") || href.startsWith("mailto")) return;
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-[rgba(198,166,107,0.06)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="py-16 md:py-24 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <span className="font-heading font-bold text-[16px] tracking-[-0.02em] text-[#F3EFE6] block mb-5">
              HADES <span className="text-[#C6A66B] font-light">DIGITAL</span>
            </span>
            <p className="text-[13px] leading-[1.7] text-[#8A8478] max-w-[240px]">
              Digital experiences built to move businesses forward.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-5">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.Services.map((item) => (
                <li key={item}>
                  <span className="text-[13px] text-[#BEB8AC] hover:text-[#D8C49A] transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-5">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.Company.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-[13px] text-[#BEB8AC] hover:text-[#D8C49A] transition-colors duration-300 cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-5">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.Connect.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 text-[13px] text-[#BEB8AC] hover:text-[#D8C49A] transition-colors duration-300"
                  >
                    {item.label}
                    {item.external && <ArrowUpRight className="w-3 h-3 opacity-50" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-[rgba(198,166,107,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#2E2A24] tracking-wide">
            © {new Date().getFullYear()} Hades Digital. All rights reserved.
          </p>
          <p className="text-[11px] text-[#2E2A24] tracking-wide">
            Websites. Automations. Software. Built without compromise.
          </p>
        </div>
      </div>
    </footer>
  );
}
