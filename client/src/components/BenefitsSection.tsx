// Benefits Section Component
// Design: Institutional Elegance - Card-based layout with gold accents
// Features: Four key benefits with icons and descriptions

import { GraduationCap, Home, Banknote, Plane } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: GraduationCap,
      title: "Tuition Fees Covered",
      description: "Full coverage of tuition fees at leading UK universities, removing financial barriers to quality education."
    },
    {
      icon: Home,
      title: "Accommodation Support",
      description: "Comprehensive accommodation allowance to ensure comfortable living during your studies."
    },
    {
      icon: Banknote,
      title: "Monthly Stipend",
      description: "Regular monthly allowance to cover living expenses and personal development opportunities."
    },
    {
      icon: Plane,
      title: "Travel Support",
      description: "International travel assistance and visa support for seamless relocation to the UK."
    }
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-accent font-semibold text-sm mb-3 uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-primary mb-6">Comprehensive Scholarship Benefits</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Our scholarship program is designed to provide complete financial and logistical support, ensuring you can focus entirely on your academic excellence.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="card-embossed p-8 text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-semibold text-primary mb-4">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {benefit.description}
                </p>

                {/* Gold accent line */}
                <div className="mt-6 h-1 w-12 bg-accent mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
