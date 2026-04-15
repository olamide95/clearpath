// Hero Section Component
// Design: Institutional Elegance - Asymmetric layout with premium imagery
// Features: Hero background, headline, CTA buttons, trust-building elements

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center py-20 md:py-0 overflow-hidden"
      style={{
        backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310419663028495100/bV9ouY5gcvJPLKCquxywbd/scholarship-hero-bg-KuGMNyDUQbDmwoREWFYdnx.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <div className="mb-6 animate-fade-in-up">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-4">
                Fully Funded Opportunity
              </span>
            </div>

            <h1 className="text-white mb-6 leading-tight animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Unlock Fully Funded UK Scholarship Opportunities
            </h1>

            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-md leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Transform your future with comprehensive scholarship support covering tuition, accommodation, and living expenses. Join thousands of successful scholars.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <Link href="/apply">
                <span className="btn-primary flex items-center justify-center gap-2 group inline-block">
                  Apply Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <button className="btn-secondary flex items-center justify-center gap-2">
                View Benefits
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-8 border-t border-white/20 flex-wrap animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div>
                <p className="text-accent font-bold text-2xl">500+</p>
                <p className="text-white/80 text-sm">Scholars Supported</p>
              </div>
              <div>
                <p className="text-accent font-bold text-2xl">£2M+</p>
                <p className="text-white/80 text-sm">Funding Awarded</p>
              </div>
              <div>
                <p className="text-accent font-bold text-2xl">98%</p>
                <p className="text-white/80 text-sm">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right: Illustration (on desktop) */}
          <div className="hidden lg:flex justify-center items-center mt-8 lg:mt-0 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028495100/bV9ouY5gcvJPLKCquxywbd/scholarship-benefits-illustration-LFa6wCPYAJFhN6oMFcz22x.webp"
              alt="Scholarship Benefits"
              className="w-full max-w-md drop-shadow-lg animate-fade-in-up"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
