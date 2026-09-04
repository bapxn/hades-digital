"use client";

import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import {
  Globe,
  Cpu,
  LayoutDashboard,
  Code2,
  Rocket,
  Layers,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Premium Websites",
    description:
      "Custom-designed, conversion-focused websites that establish authority and drive results for ambitious businesses.",
  },
  {
    icon: Cpu,
    title: "AI Automations",
    description:
      "Intelligent workflows and AI-powered systems that eliminate manual processes and scale your operations.",
  },
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "Bespoke software solutions engineered to solve complex business challenges with precision and performance.",
  },
  {
    icon: Layers,
    title: "SaaS Products",
    description:
      "End-to-end product development from concept to launch — scalable, secure and built for growth.",
  },
  {
    icon: LayoutDashboard,
    title: "Business Dashboards",
    description:
      "Real-time analytics and reporting interfaces that transform raw data into actionable business intelligence.",
  },
  {
    icon: Rocket,
    title: "Digital Experiences",
    description:
      "Interactive, immersive digital products that captivate users and elevate your brand beyond expectations.",
  },
];

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" ref={ref} className="py-24 md:py-36 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial-[at_100%_0%] from-[rgba(198,166,107,0.02)] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className={`hades-reveal ${inView ? "revealed" : ""}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]/50" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#BEB8AC]">
              What We Do
            </span>
          </div>
          <h2 className="font-heading font-bold text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.03em] text-[#F3EFE6] max-w-[700px]">
            SERVICES BUILT FOR
            <br />
            <span className="text-[#C6A66B]">SERIOUS BUSINESSES.</span>
          </h2>
          <p className="mt-6 text-[15px] leading-[1.75] text-[#BEB8AC] max-w-[480px]">
            We deliver end-to-end digital solutions — from strategy and design
            through development and deployment.
          </p>
        </div>

        <div className="mt-16 md:mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(198,166,107,0.04)]">
          {services.map((service, i) => (
            <div
              key={i}
              className={`hades-reveal ${inView ? "revealed" : ""} service-card bg-[#0B0A09] p-8 md:p-10 group cursor-default`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 rounded-lg bg-[rgba(198,166,107,0.04)] border border-[rgba(198,166,107,0.06)] flex items-center justify-center group-hover:bg-[rgba(198,166,107,0.08)] group-hover:border-[rgba(198,166,107,0.12)] transition-all duration-500">
                  <service.icon className="w-5 h-5 text-[#BEB8AC] group-hover:text-[#C6A66B] transition-colors duration-500" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#2E2A24] group-hover:text-[#C6A66B]/60 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h3 className="font-heading font-semibold text-[17px] tracking-[-0.01em] text-[#F3EFE6] mb-3">
                {service.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-[#BEB8AC]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
