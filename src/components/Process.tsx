"use client";

import { useRef } from "react";
import { useInView } from "react-intersection-observer";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We begin by deeply understanding your business, goals, audience and competitive landscape. Every decision starts with insight.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We architect a clear plan — defining scope, technology, timelines and measurable outcomes before a single line of code is written.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We craft interfaces that are beautiful, intuitive and conversion-focused. Every pixel serves a purpose, every interaction tells a story.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "We build with modern, scalable technology — clean code, rigorous testing and performance-first engineering at every stage.",
  },
  {
    number: "05",
    title: "Launch & Scale",
    description:
      "We deploy, monitor and optimize. Your digital product doesn't just launch — it evolves and grows with your business.",
  },
];

export default function Process() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="process" ref={ref} className="py-24 md:py-36 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial-[at_50%_100%] from-[rgba(198,166,107,0.02)] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className={`hades-reveal ${inView ? "revealed" : ""}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]/50" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#BEB8AC]">
              How We Work
            </span>
          </div>
          <h2 className="font-heading font-bold text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.03em] text-[#F3EFE6] max-w-[700px]">
            A PROVEN PROCESS.
            <br />
            <span className="text-[#C6A66B]">EXCEPTIONAL RESULTS.</span>
          </h2>
        </div>

        <div className="mt-16 md:mt-24">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`hades-reveal ${inView ? "revealed" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="group grid md:grid-cols-[80px,200px,1fr] gap-4 md:gap-8 py-8 md:py-10 border-t border-[rgba(198,166,107,0.06)] hover:border-[rgba(198,166,107,0.12)] transition-colors duration-500">
                <div className="font-heading font-bold text-[2rem] md:text-[2.5rem] leading-none tracking-[-0.03em] text-[#2E2A24] group-hover:text-[#C6A66B]/40 transition-colors duration-500">
                  {step.number}
                </div>
                <h3 className="font-heading font-semibold text-[18px] md:text-[20px] tracking-[-0.01em] text-[#F3EFE6]">
                  {step.title}
                </h3>
                <p className="text-[14px] leading-[1.75] text-[#BEB8AC] max-w-[520px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
