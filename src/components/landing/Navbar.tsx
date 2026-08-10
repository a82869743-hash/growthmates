import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Truck, ShoppingBag, Sprout, ShieldCheck, Plane, Factory, Zap, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoMark from "./LogoMark";

const INDUSTRIES_LIST = [
  { name: "Transportation & Logistics", icon: Truck, id: "transportation" },
  { name: "Retail & E-Commerce", icon: ShoppingBag, id: "retail" },
  { name: "Agriculture & AgTech", icon: Sprout, id: "agriculture" },
  { name: "Enterprise Security & IT", icon: ShieldCheck, id: "enterprise" },
  { name: "Aviation & Freight Cargo", icon: Plane, id: "transportation" },
  { name: "Smart Manufacturing", icon: Factory, id: "enterprise" },
  { name: "Utilities & Energy Grid", icon: Zap, id: "enterprise" },
  { name: "Banking & Financial Services", icon: Landmark, id: "enterprise" },
];

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
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIndustriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectIndustry = (id: string) => {
    setIndustriesOpen(false);
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#industry-${id}`);
    } else {
      const el = document.getElementById(`industry-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border-subtle bg-bg-surface/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 text-fg-default">
          <LogoMark />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-fg-default",
              location.pathname === "/" ? "text-fg-default font-semibold" : "text-fg-dim"
            )}
          >
            Home
          </Link>

          {/* Interactive Industries Dropdown Button (SDI Reference Style) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIndustriesOpen(!industriesOpen)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200",
                industriesOpen
                  ? "bg-[#EEF1FF] text-[#2E5EFF]"
                  : "text-fg-dim hover:text-fg-default hover:bg-bg-muted"
              )}
            >
              Industries{" "}
              <ChevronDown
                className={cn("h-4 w-4 transition-transform duration-200", industriesOpen && "rotate-180")}
              />
            </button>

            {/* Floating SDI Style Rounded Card Dropdown Modal */}
            {industriesOpen && (
              <div className="absolute top-full left-0 mt-3 w-80 rounded-3xl bg-white border border-[#E7E5DE] p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="text-[11px] font-mono font-bold text-[#8B8F99] uppercase px-3 py-1.5 mb-1">
                  INDUSTRY SOLUTIONS
                </div>
                <div className="space-y-1">
                  {INDUSTRIES_LIST.map((ind) => {
                    const Icon = ind.icon;
                    return (
                      <button
                        key={ind.name}
                        onClick={() => handleSelectIndustry(ind.id)}
                        className="w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-[#14171F] hover:bg-[#EEF1FF] hover:text-[#2E5EFF] transition-colors"
                      >
                        <div className="p-1.5 rounded-xl bg-[#FAF9F6] text-[#2E5EFF] border border-[#E7E5DE]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span>{ind.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => {
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
          mobileOpen ? "max-h-[500px] py-5" : "max-h-0"
        )}
      >
        <div className="container flex flex-col gap-3">
          <div className="text-xs font-mono font-bold text-fg-dimmer uppercase px-1">NAVIGATION</div>
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
