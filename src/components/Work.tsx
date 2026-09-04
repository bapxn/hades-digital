"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Coffee Corner",
    category: "Premium Website",
    url: "https://coffecornersite.netlify.app/",
    color: "#c9a96e",
  },
  {
    title: "Aniiverse",
    category: "Digital Experience",
    url: "https://aniiverse.dpdns.org/",
    color: "#ff3355",
  },
  {
    title: "BBQ La Cio",
    category: "Premium Website",
    url: "https://bbqlacio.freebuff.app/",
    color: "#c9a96e",
  },
  {
    title: "Don Restaurant",
    category: "Premium Website",
    url: "https://donrestaurant.freebuff.app/",
    color: "#b8a88a",
  },
  {
    title: "Annie",
    category: "Digital Experience",
    url: "https://www.annie.monster/",
    color: "#60a5fa",
  },
  {
    title: "Mega Yummy",
    category: "Premium Website",
    url: "https://megayummy.freebuff.app/",
    color: "#f59e0b",
  },
];

function IframePreview({ project, isActive }: { project: (typeof projects)[0]; isActive: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-[#151310] overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[rgba(198,166,107,0.15)] border-t-[#C6A66B]/50 animate-spin" />
        </div>
      )}

      <iframe
        src={project.url}
        className="absolute top-0 left-0 border-0 pointer-events-none"
        style={{
          width: "1200px",
          height: "900px",
          transform: "scale(0.38)",
          transformOrigin: "top left",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
        loading={isActive ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        title={`Preview of ${project.title}`}
      />

      {/* Top browser bar */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-[#1A1815]/90 backdrop-blur-sm border-b border-[rgba(198,166,107,0.06)] flex items-center gap-1.5 px-3 z-10">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]/50" />
        <div className="w-2 h-2 rounded-full bg-[#febc2e]/50" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]/50" />
        <div className="flex-1 mx-2">
          <div className="h-4 rounded bg-[rgba(198,166,107,0.05)] flex items-center justify-center px-2">
            <span className="text-[8px] text-[rgba(198,166,107,0.25)] truncate font-mono">
              {project.url.replace("https://", "")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!inView || !isAutoPlaying) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [inView, isAutoPlaying]);

  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.children;
    if (cards[activeIndex]) {
      const card = cards[activeIndex] as HTMLElement;
      const containerWidth = container.offsetWidth;
      const scrollLeft = card.offsetLeft - containerWidth / 2 + card.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeIndex]);

  const handleCardClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="work" ref={ref} className="py-24 md:py-36 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className={`hades-reveal ${inView ? "revealed" : ""}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]/50" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#BEB8AC]">
              Selected Work
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-heading font-bold text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.03em] text-[#F3EFE6]">
              PROJECTS THAT
              <br />
              <span className="text-[#C6A66B]">SPEAK FOR THEMSELVES.</span>
            </h2>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-[#D8C49A] hover:text-[#F3EFE6] transition-colors duration-300 shrink-0 mb-2"
            >
              Start your project
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={`mt-14 md:mt-20 hades-reveal ${inView ? "revealed" : ""}`}
        style={{ transitionDelay: "0.15s" }}
        onMouseEnter={() => { setIsAutoPlaying(false); if (intervalRef.current) clearInterval(intervalRef.current); }}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-6 overflow-x-auto px-6 md:px-10 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {projects.map((project, i) => (
            <button
              key={i}
              onClick={() => handleCardClick(project.url)}
              className={`group relative shrink-0 w-[300px] md:w-[420px] lg:w-[500px] aspect-[4/3] rounded-xl border transition-all duration-500 overflow-hidden cursor-pointer snap-center ${
                i === activeIndex
                  ? "border-[rgba(198,166,107,0.12)] scale-[1.02] shadow-2xl shadow-black/40"
                  : "border-[rgba(198,166,107,0.04)] scale-100 opacity-70 hover:opacity-95"
              }`}
            >
              <IframePreview project={project} isActive={i === activeIndex} />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09]/85 via-[#0B0A09]/20 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-30 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15em] font-medium mb-1.5 block" style={{ color: project.color }}>
                      {project.category}
                    </span>
                    <h3 className="font-heading font-semibold text-[16px] md:text-[18px] text-[#F3EFE6] tracking-[-0.01em]">
                      {project.title}
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-full border border-[rgba(198,166,107,0.2)] flex items-center justify-center bg-[rgba(198,166,107,0.1)] backdrop-blur-sm shrink-0 ml-3 group-hover:bg-[rgba(198,166,107,0.15)] transition-all duration-300">
                    <ExternalLink className="w-3.5 h-3.5 text-[#F3EFE6]" />
                  </div>
                </div>
              </div>

              {i === activeIndex && (
                <div className="absolute top-4 right-4 z-30 w-2 h-2 rounded-full bg-[#C6A66B]/50 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); setIsAutoPlaying(false); if (intervalRef.current) clearInterval(intervalRef.current); }}
              className={`transition-all duration-500 rounded-full cursor-pointer ${
                i === activeIndex
                  ? "w-6 h-1.5 bg-[#C6A66B]/40"
                  : "w-1.5 h-1.5 bg-[#2E2A24] hover:bg-[#3a3630]"
              }`}
              aria-label={`View project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
