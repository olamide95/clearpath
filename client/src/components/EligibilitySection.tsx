// Eligibility Section Component
// Design: Institutional Elegance - Clear requirements with checkmarks
// Features: Eligibility criteria with professional presentation

import { AlertCircle, CheckCircle } from "lucide-react";

export default function EligibilitySection() {
  const requirements = [
    "Applicants must meet academic eligibility requirements",
    "Valid international passport required",
    "Application screening and verification required",
    "Limited slots available",
    "Additional eligibility criteria may apply"
  ];

  return (
    <section className="section-spacing bg-primary/5">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <span className="inline-block text-accent font-semibold text-sm mb-3 uppercase tracking-wider">
              Requirements
            </span>
            <h2 className="text-primary mb-8">Eligibility Criteria</h2>
            <p className="text-foreground/70 mb-8 text-lg leading-relaxed">
              To ensure fairness and quality in our selection process, we have established clear eligibility criteria. Please review these requirements before applying.
            </p>

            {/* Requirements List */}
            <ul className="space-y-4">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-foreground/80">{requirement}</span>
                </li>
              ))}
            </ul>

            {/* Important Note */}
            <div className="mt-8 p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/80">
                  <strong>Important:</strong> Meeting the eligibility criteria does not guarantee scholarship award. All applications are reviewed individually.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className="hidden lg:flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-12 border-t-4 border-accent">
              <div className="text-center">
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-accent" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">
                  Qualified Candidates
                </h3>
                <p className="text-foreground/70 mb-6">
                  We welcome applications from talented students who meet our eligibility requirements and demonstrate academic excellence.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-accent font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Merit-based selection</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-accent font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Fair evaluation process</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-accent font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span>Transparent criteria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
