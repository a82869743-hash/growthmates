import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, ChevronDown, Menu, X, ArrowRight, Code, Bot, BarChart3, RefreshCw, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoMark from "../landing/LogoMark";

const serviceLinks = [
  {
    title: "Custom Software Engineering",
    href: "/services/custom-software",
    desc: "Mission-critical enterprise software and modern cloud systems.",
    icon: Code,
  },
  {
    title: "AI Automation & Workflows",
    href: "/services/ai-automation",
    desc: "Custom AI agents, document processing, and automated ops.",
    icon: Bot,
  },
  {
    title: "Data Analytics & Intelligence",
    href: "/services/data-analytics",
    desc: "Real-time data pipelines, dashboards, and predictive ML.",
    icon: BarChart3,
  },
  {
    title: "Digital Transformation",
    href: "/services/digital-transformation",
    desc: "Legacy modernization, cloud migration, and tech stack overhaul.",
    icon: RefreshCw,
  },
  {
    title: "Strategic Advisory & Consulting",
    href: "/services/strategic-consulting",
    desc: "Fractional CTO, architecture reviews, and AI roadmap.",
    icon: Compass,
  },
];

const mainNavLinks = [
  { label: "Home", href: "/" },
  { label: "Solutions Catalog", href: "/solutions" },
  { label: "Case Studies", href: "/use-cases" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const DbstNavigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-base/95 backdrop-blur-md">
      {/* Top Contact Bar */}
      <div className="bg-ink-deep text-ink-fg py-2 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a href="tel:+18005550199" className="flex items-center gap-1.5 hover:text-ink-accent transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>+1 (800) 555-0199</span>
            </a>
            <a href="mailto:solutions@dbst.com" className="flex items-center gap-1.5 hover:text-ink-accent transition-colors">
              <Mail className="w-3.5 h-3.5 text-accent" />
              <span>solutions@dbst.com</span>
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-fg-dimmer">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Headquarters: San Francisco, CA • Sydney, AU</span>
            </span>
            <span className="text-accent font-semibold">Engineering-Grade Consultancy</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Clean D-BST Brand Logo */}
        <Link to="/" className="flex items-center gap-3">
          <LogoMark size="default" variant="full" />
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              location.pathname === "/" ? "text-accent font-semibold" : "text-fg-default"
            )}
          >
            Home
          </Link>

          {/* Services Megamenu Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={cn(
                "flex items-center gap-1 text-sm font-medium py-2 transition-colors hover:text-accent",
                location.pathname.startsWith("/services") ? "text-accent font-semibold" : "text-fg-default"
              )}
            >
              <span>Services</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", servicesOpen && "rotate-180")} />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-0 w-96 p-3 bg-bg-surface border border-border-subtle rounded-md shadow-floating animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[11px] font-mono font-semibold uppercase text-fg-dim px-3 py-1.5 mb-1 border-b border-border-subtle">
                  Consulting Capabilities
                </div>
                <div className="space-y-1">
                  {serviceLinks.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="flex items-start gap-3 p-2.5 rounded-sm hover:bg-accent-tint transition-colors group"
                        onClick={() => setServicesOpen(false)}
                      >
                        <div className="p-2 rounded-sm bg-accent-tint group-hover:bg-accent text-accent group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-fg-default group-hover:text-accent-deep transition-colors">
                            {service.title}
                          </div>
                          <div className="text-xs text-fg-dim line-clamp-1 mt-0.5">
                            {service.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/solutions"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              location.pathname === "/solutions" ? "text-accent font-semibold" : "text-fg-default"
            )}
          >
            Solutions Catalog
          </Link>

          <Link
            to="/use-cases"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              location.pathname === "/use-cases" ? "text-accent font-semibold" : "text-fg-default"
            )}
          >
            Case Studies
          </Link>

          <Link
            to="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              location.pathname === "/about" ? "text-accent font-semibold" : "text-fg-default"
            )}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              location.pathname === "/contact" ? "text-accent font-semibold" : "text-fg-default"
            )}
          >
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent-deep transition-all shadow-flat hover:shadow-raised"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="lg:hidden p-2 text-fg-default hover:text-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border-subtle bg-bg-surface px-4 py-6 space-y-4 animate-in fade-in duration-200">
          <div className="space-y-1">
            <Link
              to="/"
              className="block py-2 text-base font-semibold text-fg-default hover:text-accent"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <div className="py-2">
              <div className="text-xs font-mono uppercase text-fg-dim mb-2 font-bold">Services</div>
              <div className="pl-3 space-y-2 border-l-2 border-border-subtle">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    className="block text-sm text-fg-dim hover:text-accent font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {mainNavLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block py-2 text-base font-semibold text-fg-default hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-border-subtle">
            <Link
              to="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent text-white font-medium text-sm"
              onClick={() => setMobileOpen(false)}
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
