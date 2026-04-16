// Footer Component
// Design: Institutional Elegance - Premium footer with contact and links
// Features: Contact info, quick links, copyright, professional layout

import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028495100/bV9ouY5gcvJPLKCquxywbd/logo-icon-5ADjzDrUHpUgUrcrR8pAqc.webp"
                alt="ClearPathScholar"
                className="w-10 h-10"
              />
              <span className="font-serif text-xl font-bold">ClearPathScholar</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Unlocking fully funded UK scholarship opportunities for deserving students worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-primary-foreground/80 hover:text-accent transition-colors block">
                  Home
                </a>
              </li>
              <li>
                <a href="/apply" className="text-primary-foreground/80 hover:text-accent transition-colors block">
                  Apply Now
                </a>
              </li>
              <li>
                <a href="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/admin" className="text-primary-foreground/80 hover:text-accent transition-colors block">
                  Admin Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a href="mailto:info@clearpathscholar.com" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm block">
                  info@clearpathscholar.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <a href="tel:+441234567890" className="text-primary-foreground/80 hover:text-accent transition-colors text-sm block">
                  +44 (0) 123 456 7890
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-primary-foreground/80 text-sm">
                  London, United Kingdom
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/70 text-sm">
              © {currentYear} ClearPathScholar. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm block">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors text-sm block">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
