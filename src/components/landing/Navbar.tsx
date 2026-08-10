import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import LogoMark from "./LogoMark";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "ROI Calculator", href: "/roi-calculator" },
  { label: "Assessment", href: "/assessment" },
  { label: "MegaTrans 2026", href: "/megatrans" },
  { label: "Blog", href: "/blog" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Contact", href: "/contact" },
];

const LOGIN_URL = "https://portal.growthmates.ai/login";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border-subtle bg-bg-surface/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-fg-default">
          <LogoMark />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-fg-default",
                  isActive ? "text-fg-default font-semibold" : "text-fg-dim"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 shadow-flat"
          >
            Login
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-fg-default"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border-subtle bg-bg-surface transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-96 py-5" : "max-h-0"
        )}
      >
        <div className="container flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-base font-medium text-fg-dim hover:text-fg-default"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block w-full text-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Login to Portal
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
