import { Link } from "react-router-dom";
import LogoMark from "./LogoMark";

const Footer = () => {
  return (
    <footer className="border-t border-border-subtle bg-accent-deep py-16 text-white">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <LogoMark size="small" onBackground="dark" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Enterprise Agentic AI platform. Build, deploy, and scale custom intelligent agents for complex operations.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">Product & Tools</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/pricing" className="transition-colors hover:text-accent-on-dark">Pricing & Plans</Link></li>
              <li><Link to="/roi-calculator" className="transition-colors hover:text-accent-on-dark">ROI Calculator</Link></li>
              <li><Link to="/roi-calculator?tab=assessment" className="transition-colors hover:text-accent-on-dark">AI Readiness Assessment</Link></li>
              <li><Link to="/roadmap" className="transition-colors hover:text-accent-on-dark">Product Roadmap</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">Use Cases</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/#usecases" className="transition-colors hover:text-accent-on-dark">Transportation & Logistics</Link></li>
              <li><Link to="/#usecases" className="transition-colors hover:text-accent-on-dark">Retail & Supply Chain</Link></li>
              <li><Link to="/megatrans" className="transition-colors hover:text-accent-on-dark">MegaTrans 2026</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">Company</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/enterprise" className="transition-colors hover:text-accent-on-dark">Enterprise Solutions &amp; Contact</Link></li>
              <li><Link to="/enterprise" className="transition-colors hover:text-accent-on-dark">Research &amp; Insights</Link></li>
              <li><span className="cursor-pointer transition-colors hover:text-accent-on-dark">Privacy Policy</span></li>
              <li><span className="cursor-pointer transition-colors hover:text-accent-on-dark">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/40 space-y-1.5">
          <p>Powered by <span className="font-semibold text-white/70">D-BST Solutions Pty Ltd</span> | Melbourne, Australia</p>
          <p>ABN: 36 659 318 911</p>
          <p>© 2026 GrowthMates.ai All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
