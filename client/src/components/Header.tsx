// Header Component
// Design: Institutional Elegance - Clean navigation with logo, premium feel
// Features: Responsive navbar, logo, navigation links, CTA button

import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Apply", href: "/apply" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028495100/bV9ouY5gcvJPLKCquxywbd/logo-icon-5ADjzDrUHpUgUrcrR8pAqc.webp"
                alt="ClearPathScholar"
                className="w-10 h-10"
              />
              <span className="hidden sm:inline font-serif text-lg font-bold text-primary">
                ClearPathScholar
              </span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-foreground hover:text-accent font-medium transition-colors hover-gold-underline cursor-pointer">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="/apply">
              <span className="btn-primary inline-block">
                Apply Now
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-secondary/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="text-foreground hover:text-accent font-medium transition-colors block cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/apply">
                <span
                  className="btn-primary w-full text-center inline-block"
                  onClick={() => setIsOpen(false)}
                >
                  Apply Now
                </span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
