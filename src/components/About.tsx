"use client";

import { useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="py-24 md:py-36 relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-radial-[at_0%_50%] from-[rgba(198,166,107,0.02)] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className={`hades-reveal ${inView ? "revealed" : ""}`}>
            <h2 className="font-heading font-bold text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.03em] text-[#F3EFE6]">
              WE DON&apos;T JUST BUILD WEBSITES.
              <br />
              <span className="text-[#C6A66B]">
                WE BUILD DIGITAL SYSTEMS.
              </span>
            </h2>
          </div>

          <div className={`hades-reveal ${inView ? "revealed" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <div className="space-y-6 text-[15px] leading-[1.75] text-[#BEB8AC]">
              <p>
                Hades Digital combines design, development and automation to
                create digital products that help businesses operate, present
                themselves and grow online.
              </p>
              <p>
                We are a global agency with a professional network spanning 6+
                countries. Our developers bring 5+ years of hands-on experience
                in building premium websites, intelligent automations and custom
                software solutions for businesses worldwide.
              </p>
              <p>
                From ambitious startups to established enterprises, we build
                digital systems that perform — not templates that look the same
                as everyone else&apos;s.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                "Premium design approach",
                "5+ years development",
                "Global 6+ countries",
                "AI automation",
                "Custom-built solutions",
                "Modern technology",
                "International delivery",
                "Direct communication",
              ].map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-[12px] uppercase tracking-[0.1em] text-[#8A8478]"
                >
                  <span className="w-1 h-1 rounded-full bg-[#C6A66B]/40 shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
