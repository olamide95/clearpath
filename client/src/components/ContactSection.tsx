// Contact Section Component
// Design: Institutional Elegance - Professional contact information
// Features: Contact details with icons, easy to edit

import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "info@clearpathscholar.com",
      href: "mailto:info@clearpathscholar.com"
    },
   
    {
      icon: MapPin,
      label: "Address",
      value: "London, United Kingdom",
      href: "#"
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Monday - Friday, 9:00 AM - 5:00 PM GMT",
      href: "#"
    }
  ];

  return (
    <section className="section-spacing bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-accent font-semibold text-sm mb-3 uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="text-primary mb-6">Contact Information</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Have questions? We're here to help. Reach out to us through any of these channels.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <a
                key={index}
                href={info.href}
                className="card-embossed p-8 text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300 group block"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                </div>

                {/* Label */}
                <p className="text-sm text-foreground/60 mb-2 uppercase tracking-wider font-semibold">
                  {info.label}
                </p>

                {/* Value */}
                <p className="text-foreground font-semibold group-hover:text-accent transition-colors">
                  {info.value}
                </p>
              </a>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-primary mb-4">
            Response Time
          </h3>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            We aim to respond to all inquiries within 24-48 business hours. For urgent matters, please call us directly during business hours.
          </p>
        </div>
      </div>
    </section>
  );
}
