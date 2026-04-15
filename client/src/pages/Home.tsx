// Home Page
// Design: Institutional Elegance - Complete landing page with all sections
// Features: Hero, benefits, programs, process, eligibility, contact, footer

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import ProgramsSection from "@/components/ProgramsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import EligibilitySection from "@/components/EligibilitySection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BenefitsSection />
        <ProgramsSection />
        <HowItWorksSection />
        <EligibilitySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
