"use client";

import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight, Send, CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const budgetRanges = [
  "$500 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $30,000",
  "$30,000 – $50,000",
  "$50,000+",
];

const serviceOptions = [
  "Premium Website",
  "AI Automation",
  "Custom Software",
  "SaaS Product",
  "Business Dashboard",
  "Digital Experience",
  "Not sure yet",
];

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const submitForm = useMutation(api.contactSubmissions.submit);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      setError("Please select at least one service.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      await submitForm({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        company: (formData.get("company") as string) || undefined,
        services: selectedServices.join(", "),
        budget: (formData.get("budget") as string) || undefined,
        message: formData.get("message") as string,
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit:", err);
      setError("Something went wrong. Please try again or email us directly at hadesltd.io@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-36 relative">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-radial-[at_100%_50%] from-[rgba(198,166,107,0.02)] to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className={`hades-reveal ${inView ? "revealed" : ""}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B]/50" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#BEB8AC]">
                Get in Touch
              </span>
            </div>
            <h2 className="font-heading font-bold text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] tracking-[-0.03em] text-[#F3EFE6]">
              READY TO BUILD
              <br />
              <span className="text-[#C6A66B]">SOMETHING EXTRAORDINARY?</span>
            </h2>
            <p className="mt-6 text-[15px] leading-[1.75] text-[#BEB8AC] max-w-[440px]">
              Tell us about your project and we&apos;ll get back to you within
              24 hours with a detailed proposal.
            </p>

            <div className="mt-12 space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-2 block">
                  Email
                </span>
                <a
                  href="mailto:hadesltd.io@gmail.com"
                  className="text-[15px] text-[#D8C49A] hover:text-[#F3EFE6] transition-colors duration-300"
                >
                  hadesltd.io@gmail.com
                </a>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-2 block">
                  Instagram
                </span>
                <a
                  href="https://www.instagram.com/hadesltd.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[15px] text-[#D8C49A] hover:text-[#F3EFE6] transition-colors duration-300"
                >
                  @hadesltd.io
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-2 block">
                  Response Time
                </span>
                <span className="text-[15px] text-[#D8C49A]">
                  Within 24 hours
                </span>
              </div>
            </div>
          </div>

          <div className={`hades-reveal ${inView ? "revealed" : ""}`} style={{ transitionDelay: "0.15s" }}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <CheckCircle className="w-12 h-12 text-[#C6A66B]/40 mb-6" />
                <h3 className="font-heading font-bold text-[1.5rem] tracking-[-0.02em] text-[#F3EFE6] mb-3">
                  Message Received
                </h3>
                <p className="text-[14px] leading-[1.7] text-[#BEB8AC] max-w-[320px]">
                  Thank you for reaching out. Your project request has been submitted. We&apos;ll review it and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setSelectedServices([]); }}
                  className="mt-8 text-[13px] text-[#8A8478] hover:text-[#F3EFE6] transition-colors duration-300 underline underline-offset-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-2.5 block">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
                      className="hades-input"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-2.5 block">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      className="hades-input"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-2.5 block">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your company (optional)"
                    className="hades-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-3 block">
                    What do you need? *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        disabled={isSubmitting}
                        className={`text-[12px] px-3.5 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                          selectedServices.includes(service)
                            ? "border-[rgba(198,166,107,0.3)] bg-[rgba(198,166,107,0.06)] text-[#C6A66B]"
                            : "border-[rgba(198,166,107,0.06)] text-[#8A8478] hover:border-[rgba(198,166,107,0.12)] hover:text-[#BEB8AC]"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-2.5 block">
                    Budget Range
                  </label>
                  <select name="budget" className="hades-select" disabled={isSubmitting}>
                    <option value="">Select a range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-2.5 block">
                    Tell us about your project *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    placeholder="Describe your project, goals and timeline..."
                    className="hades-textarea"
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <p className="text-[13px] text-red-400 leading-relaxed">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hades-btn hades-btn-primary w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
