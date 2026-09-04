"use client";

import { useRef } from "react";
import { useInView } from "react-intersection-observer";

const stats = [
  { number: "5+", label: "Years of Development", sub: "Experience" },
  { number: "6+", label: "Countries in", sub: "Our Network" },
  { number: "Global", label: "Client", sub: "Delivery" },
  { number: "Custom", label: "Digital", sub: "Solutions" },
];

export default function TrustStrip() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-16 md:py-24 border-t border-[rgba(198,166,107,0.06)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`hades-reveal ${inView ? "revealed" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="font-heading font-bold text-[2.5rem] md:text-[3.5rem] leading-none tracking-[-0.03em] text-[#F3EFE6]">
                {stat.number}
              </div>
              <div className="mt-3 text-[12px] uppercase tracking-[0.15em] text-[#BEB8AC]">
                <span>{stat.label}</span>
                <br />
                <span>{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
