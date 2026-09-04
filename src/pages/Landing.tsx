import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import CtaBanner from "@/components/CtaBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="hades-grain">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <div className="hades-divider" />
        <Work />
        <div className="hades-divider" />
        <Services />
        <div className="hades-divider" />
        <Process />
        <div className="hades-divider" />
        <Testimonials />
        <div className="hades-divider" />
        <About />
        <CtaBanner />
        <div className="hades-divider" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
