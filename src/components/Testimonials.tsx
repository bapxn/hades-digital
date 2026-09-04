"use client";

import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Hades Digital transformed our entire online presence. The attention to detail and technical execution exceeded every expectation.",
    author: "James Mitchell",
    role: "CEO, Meridian Group",
  },
  {
    quote:
      "Their AI automation work saved us hundreds of hours. The ROI was visible within the first month of deployment.",
    author: "Sarah Chen",
    role: "Operations Director, NovaTech",
  },
  {
    quote:
      "Working with a truly global team that delivers at this level of quality is rare. Hades Digital is the real deal.",
    author: "Marcus Weber",
    role: "Founder, Atlas Ventures",
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 md:py-36 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className={`hades-reveal ${inView ? "revealed" : ""}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]/50" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#BEB8AC]">
              Client Voices
            </span>
          </div>
          <h2 className="font-heading font-bold text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.03em] text-[#F3EFE6] max-w-[600px]">
            TRUSTED BY
            <br />
            <span className="text-[#C6A66B]">AMBITIOUS BUSINESSES.</span>
          </h2>
        </div>

        <div className="mt-16 md:mt-24 grid md:grid-cols-3 gap-px bg-[rgba(198,166,107,0.04)]">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className={`hades-reveal ${inView ? "revealed" : ""} bg-[#0B0A09] p-8 md:p-10 flex flex-col`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <Quote className="w-6 h-6 text-[#C6A66B]/20 mb-6" />
              <p className="text-[15px] leading-[1.75] text-[#D8C49A] flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-8 pt-6 border-t border-[rgba(198,166,107,0.06)]">
                <p className="text-[13px] font-medium text-[#F3EFE6] tracking-[-0.01em]">
                  {testimonial.author}
                </p>
                <p className="text-[11px] text-[#8A8478] mt-1 tracking-wide">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
