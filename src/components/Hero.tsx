"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Video background — fills entire hero */}
      <div className="absolute inset-0 z-0">
        <video
          src="https://res.cloudinary.com/ufhyfxwa/video/upload/From_Klickpin.com-_Holiday_table_setting_ideas_that_feel_fresh_elevated_and_surprisingly_easy_to_recreate_at_home_for_anyone_who_loves_beautiful_d.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Dark overlay with warm tint for brand integration */}
        <div className="absolute inset-0 bg-[#0B0A09]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(198,166,107,0.03)] via-transparent to-[#0B0A09]" />
      </div>

      {/* Content — sits above video */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-32 w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium text-[#BEB8AC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]/50" />
            Global Digital Development Agency
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-[1100px]">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-bold text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.03em] text-[#F3EFE6]"
          >
            WE BUILD DIGITAL
            <br />
            EXPERIENCES THAT
            <br />
            MOVE <span className="text-[#C6A66B]">BUSINESSES.</span>
          </motion.h1>
        </div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 md:mt-10 max-w-[540px] text-[15px] md:text-[16px] leading-[1.65] text-[#BEB8AC] font-light"
        >
          Premium websites, intelligent automations and custom software for
          ambitious businesses worldwide.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollTo("#contact")}
            className="hades-btn hades-btn-primary cursor-pointer"
          >
            Start a Project
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo("#work")}
            className="hades-btn hades-btn-outline cursor-pointer"
          >
            View Our Work
            <ArrowDown className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Service tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-14 md:mt-20 flex items-center gap-3 text-[11px] uppercase tracking-[0.15em] text-[#8A8478]"
        >
          <span>Web Development</span>
          <span className="w-1 h-1 rounded-full bg-[#C6A66B]/30" />
          <span>AI Automation</span>
          <span className="w-1 h-1 rounded-full bg-[#C6A66B]/30" />
          <span>Custom Software</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A8478]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#C6A66B]/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
