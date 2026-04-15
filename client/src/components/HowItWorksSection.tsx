// How It Works Section Component
// Design: Institutional Elegance - Step-by-step process with visual hierarchy
// Features: Four-step process with numbered indicators and descriptions

import { CheckCircle2 } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Fill the Application Form",
      description: "Complete our comprehensive application form with your academic and personal information. Takes approximately 15 minutes."
    },
    {
      number: "02",
      title: "Get Screened",
      description: "Our expert team reviews your application against our scholarship criteria. We assess academic merit and potential."
    },
    {
      number: "03",
      title: "Receive Guidance",
      description: "Selected candidates receive personalized guidance on university selection, course options, and visa procedures."
    },
    {
      number: "04",
      title: "Proceed with Scholarship Support",
      description: "Upon final approval, receive full scholarship support and begin your journey at a leading UK university."
    }
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-accent font-semibold text-sm mb-3 uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-primary mb-6">How It Works</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Our streamlined process ensures a smooth journey from application to scholarship award.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 left-1/2 w-full h-0.5 bg-accent/20 transform translate-x-1/2" />
              )}

              {/* Step Card */}
              <div className="relative z-10 text-center">
                {/* Number Circle */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center font-serif text-3xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-semibold text-primary mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Check mark */}
                <div className="flex justify-center">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-foreground/70 mb-6">Ready to start your scholarship journey?</p>
          <a href="/apply" className="btn-primary">
            Begin Your Application
          </a>
        </div>
      </div>
    </section>
  );
}
