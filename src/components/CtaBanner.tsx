"use client";

import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";

export default function CtaBanner() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div
          className={`hades-reveal ${inView ? "revealed" : ""} relative overflow-hidden rounded-2xl border border-[rgba(198,166,107,0.06)] bg-gradient-to-br from-[#1A1815] via-[#151310] to-[#0B0A09] p-12 md:p-20 text-center`}
        >
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(198,166,107,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(198,166,107,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-radial-[at_50%_0%] from-[rgba(198,166,107,0.04)] to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2 className="font-heading font-bold text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.1] tracking-[-0.03em] text-[#F3EFE6] max-w-[700px] mx-auto">
              LET&apos;S BUILD
              <br />
              SOMETHING GREAT.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-[#BEB8AC] max-w-[400px] mx-auto">
              Your next project deserves more than a template. It deserves a
              team that builds without compromise.
            </p>
            <button
              onClick={scrollToContact}
              className="hades-btn hades-btn-primary mt-8 cursor-pointer"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-[rgba(198,166,107,0.04)]" />
          <div className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-[rgba(198,166,107,0.04)]" />
        </div>
      </div>
    </section>
  );
}
