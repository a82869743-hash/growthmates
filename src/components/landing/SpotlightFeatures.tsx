import { motion } from "framer-motion";
import { CheckCircle2, Truck, ShoppingBag, Sprout, ShieldCheck, ArrowRight } from "lucide-react";

interface IndustryFeature {
  id: string;
  eyebrow: string;
  title: string;
  linkText: string;
  description: string;
  bullets: string[];
  visualType: "transportation" | "retail" | "agriculture" | "enterprise";
}

const INDUSTRY_FEATURES: IndustryFeature[] = [
  {
    id: "transportation",
    eyebrow: "WHY GROWTHMATES AI",
    title: "Our Role in Transportation",
    linkText: "Explore Transportation & Logistics AI Solutions",
    description:
      "Technology is the backbone of modern transportation. From fleet dispatching to route optimization and automated freight rate quoting, GrowthMates AI delivers intelligent agent solutions that keep commercial fleets and freight moving safely, securely, and efficiently.",
    bullets: [
      "Autonomous 12-stop route optimization & traffic re-routing",
      "Live freight rate calculation & margin enforcement",
      "Driver HOS compliance auditing & electronic logging sync",
    ],
    visualType: "transportation",
  },
  {
    id: "retail",
    eyebrow: "WHY GROWTHMATES AI",
    title: "Our Role in Retail & E-Commerce",
    linkText: "Explore Retail & E-Commerce AI Solutions",
    description:
      "Intelligence is the catalyst for modern retail growth. GrowthMates AI powers automated RMA refund processing, predictive inventory reordering, and multi-channel order orchestration that maximize customer lifetime value.",
    bullets: [
      "Automated RMA fraud verification & instant customer refunding",
      "Predictive inventory stockout alerts & supplier PO generation",
      "Multi-channel OMS & ERP synchronization across storefronts",
    ],
    visualType: "retail",
  },
  {
    id: "agriculture",
    eyebrow: "WHY GROWTHMATES AI",
    title: "Our Role in Agriculture & AgTech",
    linkText: "Explore Agriculture & AgTech AI Solutions",
    description:
      "Data is the engine of sustainable agriculture. GrowthMates AI deploys autonomous crop telemetry agents, weather risk forecasters, and supply chain tracking solutions that maximize crop yield and streamline farm-to-market distribution.",
    bullets: [
      "Real-time soil sensor & microclimate weather forecasting",
      "Automated harvest dispatching & cold-chain temperature tracking",
      "Farm input inventory monitoring & bulk order automation",
    ],
    visualType: "agriculture",
  },
  {
    id: "enterprise",
    eyebrow: "WHY GROWTHMATES AI",
    title: "Our Role in Enterprise Technology",
    linkText: "Explore Enterprise Security & Infrastructure Solutions",
    description:
      "Security is the foundation of digital transformation. GrowthMates AI connects directly to your existing SAP, Oracle, Xero, and Salesforce infrastructure using Model Context Protocol (MCP) with enterprise SOC2 compliance.",
    bullets: [
      "Model Context Protocol (MCP 1.0) zero-friction gateway",
      "SOC2 ready architecture with SAML 2.0 & SSO authentication",
      "Granular role permissions & immutable audit log security",
    ],
    visualType: "enterprise",
  },
];

/* Ultra-High-Precision 3D Isometric Visual Component */
const IsometricVisual = ({ type }: { type: IndustryFeature["visualType"] }) => {
  if (type === "transportation") {
    return (
      <div className="relative w-full max-w-lg mx-auto h-[420px] flex items-center justify-center">
        <svg className="w-full h-full drop-shadow-2xl overflow-visible" viewBox="0 0 540 420" fill="none">
          <defs>
            <linearGradient id="roadBaseTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E5EFF" />
              <stop offset="100%" stopColor="#1B3BB3" />
            </linearGradient>
            <linearGradient id="roadBaseSideLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16214F" />
              <stop offset="100%" stopColor="#0B1026" />
            </linearGradient>
            <linearGradient id="roadBaseSideRight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0E1638" />
              <stop offset="100%" stopColor="#050814" />
            </linearGradient>
            <linearGradient id="hudGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2330" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#0F121B" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="cabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B66FF" />
              <stop offset="100%" stopColor="#1E4AE6" />
            </linearGradient>
            <linearGradient id="trailerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#EDF2F7" />
            </linearGradient>
            <filter id="hudGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ══ 1. 3D ISOMETRIC HIGHWAY SLAB ══ */}
          <polygon points="270,140 490,250 270,360 50,250" fill="url(#roadBaseTop)" stroke="#4B77FF" strokeWidth="2" />
          <polygon points="50,250 270,360 270,385 50,275" fill="url(#roadBaseSideLeft)" />
          <polygon points="270,360 490,250 490,275 270,385" fill="url(#roadBaseSideRight)" />

          {/* Highway Dashed Centerlines */}
          <line x1="120" y1="215" x2="160" y2="235" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <line x1="190" y1="250" x2="230" y2="270" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <line x1="260" y1="285" x2="300" y2="305" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <line x1="330" y1="320" x2="370" y2="340" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />

          {/* ══ 2. 3D ISOMETRIC COMMERCIAL FREIGHT SEMI-TRUCK ══ */}
          <g transform="translate(15, 10)">
            {/* Cargo Trailer */}
            <polygon points="125,145 90,162.5 90,222.5 125,205" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
            <polygon points="90,162.5 220,227.5 220,287.5 90,222.5" fill="url(#trailerGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
            <polygon points="125,145 255,210 220,227.5 90,162.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

            <line x1="122" y1="178.5" x2="122" y2="238.5" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="155" y1="195" x2="155" y2="255" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="188" y1="211.5" x2="188" y2="271.5" stroke="#CBD5E1" strokeWidth="1.5" />
            <polygon points="90,192.5 220,257.5 220,269.5 90,204.5" fill="#2E5EFF" />

            {/* Trailer Wheels */}
            <g transform="translate(118, 236.5) rotate(26.56)">
              <ellipse cx="0" cy="0" rx="12" ry="7" fill="#14171F" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="0" cy="0" r="3" fill="#94A3B8" />
            </g>
            <g transform="translate(148, 251.5) rotate(26.56)">
              <ellipse cx="0" cy="0" rx="12" ry="7" fill="#14171F" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="0" cy="0" r="3" fill="#94A3B8" />
            </g>

            {/* Cab */}
            <polygon points="255,210 300,232.5 272,246.5 227,224" fill="#2E5EFF" stroke="#1E4AE6" strokeWidth="1.5" />
            <polygon points="220,227.5 275,255 275,298 220,270.5" fill="url(#cabGrad)" stroke="#16214F" strokeWidth="1.5" />
            <polygon points="235,240 266,255.5 266,269 235,253.5" fill="#14171F" stroke="#7C97FF" strokeWidth="1" />
            <polygon points="300,232.5 272,246.5 272,298 300,284" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

            <polygon points="296,252 278,261 278,284 296,275" fill="#14171F" stroke="#94A3B8" strokeWidth="1" />
            <line x1="292" y1="257" x2="282" y2="262" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="292" y1="263" x2="282" y2="268" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="292" y1="269" x2="282" y2="274" stroke="#E2E8F0" strokeWidth="1" />

            <circle cx="276" cy="289" r="3" fill="#FF6A3D" />
            <circle cx="295" cy="280" r="3" fill="#FF6A3D" />

            {/* Cab Wheels */}
            <g transform="translate(238, 280) rotate(26.56)">
              <ellipse cx="0" cy="0" rx="12" ry="7" fill="#14171F" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="0" cy="0" r="3" fill="#94A3B8" />
            </g>
            <g transform="translate(266, 294) rotate(26.56)">
              <ellipse cx="0" cy="0" rx="12" ry="7" fill="#14171F" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="0" cy="0" r="3" fill="#94A3B8" />
            </g>
          </g>

          {/* ══ 3. MATHEMATICALLY ALIGNED TELEMETRICS DOTTED LINES & RADAR TARGETS ══ */}
          {/* Dotted Telemetry Line 1: From HUD Bottom-Left to Cab Antenna */}
          <line x1="330" y1="175" x2="275" y2="235" stroke="#2E5EFF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
          {/* Target Reticle 1 (Cab Antenna) */}
          <g transform="translate(275, 235)">
            <ellipse cx="0" cy="0" rx="18" ry="8" stroke="#2E5EFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="0" cy="0" r="3" fill="#2E5EFF" />
          </g>

          {/* Dotted Telemetry Line 2: From HUD Bottom-Center to Trailer GPS */}
          <line x1="370" y1="175" x2="185" y2="220" stroke="#FF6A3D" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
          {/* Target Reticle 2 (Trailer GPS) */}
          <g transform="translate(185, 220)">
            <ellipse cx="0" cy="0" rx="18" ry="8" stroke="#FF6A3D" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="0" cy="0" r="3" fill="#FF6A3D" />
          </g>

          {/* ══ 4. FLOATING HOLOGRAPHIC GPS TELEMATICS HUD CARD ══ */}
          <g transform="translate(310, 75)">
            <rect
              x="0"
              y="0"
              width="180"
              height="100"
              rx="16"
              fill="url(#hudGlassGrad)"
              stroke="#2E5EFF"
              strokeWidth="2"
              filter="url(#hudGlow)"
            />

            <g transform="translate(14, 20)">
              <circle cx="4" cy="4" r="4" fill="#1FAA59" className="animate-pulse" />
              <text x="14" y="7" fill="#FFFFFF" fontSize="9" fontFamily="Manrope, sans-serif" fontWeight="800" letterSpacing="0.5">
                LIVE GPS TELEMATICS
              </text>
            </g>

            <g transform="translate(14, 42)">
              <rect x="0" y="0" width="152" height="20" rx="6" fill="#1E2738" stroke="#334155" strokeWidth="1" />
              <text x="8" y="13" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                LANE: <tspan fill="#FFFFFF" fontWeight="800">SYD ➔ MEL (878km)</tspan>
              </text>
            </g>

            <g transform="translate(14, 76)">
              <text x="0" y="0" fill="#FF6A3D" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="900">
                ETA 14:30
              </text>
              <text x="75" y="0" fill="#1FAA59" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="800">
                ✓ 0 EXCEPTIONS
              </text>
            </g>
          </g>

          {/* ══ 5. FLOATING 3D SQUIRCLE BADGE ══ */}
          <g transform="translate(242, 12)">
            <rect x="0" y="0" width="56" height="56" rx="18" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="2.5" className="drop-shadow-xl" />
            <Truck className="h-7 w-7 text-[#2E5EFF] translate-x-3.5 translate-y-3.5" />
          </g>
        </svg>
      </div>
    );
  }

  if (type === "retail") {
    return (
      <div className="relative w-full max-w-lg mx-auto h-[420px] flex items-center justify-center">
        <svg className="w-full h-full drop-shadow-2xl overflow-visible" viewBox="0 0 540 420" fill="none">
          <defs>
            <linearGradient id="retailTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6A3D" />
              <stop offset="100%" stopColor="#E65124" />
            </linearGradient>
            <linearGradient id="retailSideLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16214F" />
              <stop offset="100%" stopColor="#0B1026" />
            </linearGradient>
            <linearGradient id="retailSideRight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0E1638" />
              <stop offset="100%" stopColor="#050814" />
            </linearGradient>
            <linearGradient id="boxTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F1F5F9" />
            </linearGradient>
            <linearGradient id="boxSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="laserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E5EFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2E5EFF" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* ══ 1. 3D ISOMETRIC FULFILLMENT SLAB ══ */}
          <polygon points="270,140 490,250 270,360 50,250" fill="url(#retailTopGrad)" stroke="#FFA384" strokeWidth="2" />
          <polygon points="50,250 270,360 270,385 50,275" fill="url(#retailSideLeft)" />
          <polygon points="270,360 490,250 490,275 270,385" fill="url(#retailSideRight)" />

          <line x1="160" y1="195" x2="380" y2="305" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="105" y1="222" x2="325" y2="332" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />
          <line x1="160" y1="305" x2="380" y2="195" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />

          {/* ══ 2. LEFT SIDE: SMART OPTICAL RMA SCANNER CONVEYOR ══ */}
          <g transform="translate(10, 15)">
            <polygon points="80,200 210,265 190,275 60,210" fill="#1E2738" stroke="#334155" strokeWidth="1.5" />
            <polygon points="60,210 190,275 190,285 60,220" fill="#0F172A" />

            <g transform="translate(75, 185)">
              <polygon points="20,0 40,10 20,20 0,10" fill="url(#boxTopGrad)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="0,10 20,20 20,40 0,30" fill="url(#boxSideGrad)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="20,20 40,10 40,30 20,40" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
              <polygon points="16,2 24,6 8,14 0,10" fill="#FF6A3D" />
            </g>

            <g transform="translate(115, 195)">
              <path d="M 0,35 L 0,-10 L 28,-24 L 56,-10 L 56,35" fill="none" stroke="#2E5EFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="28" cy="-20" r="4" fill="#14171F" stroke="#2E5EFF" strokeWidth="1.5" />
              <circle cx="28" cy="-20" r="1.5" fill="#1FAA59" />
              <polygon points="28,-18 0,28 56,28" fill="url(#laserGrad)" opacity="0.85" />
              <line x1="4" y1="28" x2="52" y2="28" stroke="#2E5EFF" strokeWidth="1.5" />
            </g>

            <g transform="translate(125, 210)">
              <polygon points="24,0 48,12 24,24 0,12" fill="url(#boxTopGrad)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="0,12 24,24 24,46 0,34" fill="url(#boxSideGrad)" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="24,24 48,12 48,34 24,46" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
              <rect x="6" y="20" width="12" height="5" rx="1" fill="#14171F" />
              <polygon points="20,2 28,6 8,16 0,12" fill="#2E5EFF" />
            </g>
          </g>

          {/* ══ 3. RIGHT SIDE: SMART HIGH-BAY INVENTORY RACK SYSTEM ══ */}
          <g transform="translate(235, 175)">
            <line x1="0" y1="40" x2="0" y2="-40" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="60" y1="70" x2="60" y2="-10" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="30" y1="25" x2="30" y2="-55" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="90" y1="55" x2="90" y2="-25" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

            <polygon points="30,25 90,55 60,70 0,40" fill="#1E2738" stroke="#475569" strokeWidth="1.5" />
            <g transform="translate(10, 20)">
              <polygon points="14,0 28,7 14,14 0,7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="0,7 14,14 14,26 0,19" fill="#E2E8F0" />
              <polygon points="14,14 28,7 28,19 14,26" fill="#CBD5E1" />
            </g>
            <g transform="translate(36, 33)">
              <polygon points="14,0 28,7 14,14 0,7" fill="#2E5EFF" stroke="#1E4AE6" strokeWidth="1" />
              <polygon points="0,7 14,14 14,26 0,19" fill="#1E4AE6" />
              <polygon points="14,14 28,7 28,19 14,26" fill="#16214F" />
            </g>

            <polygon points="30,-15 90,15 60,30 0,0" fill="#1E2738" stroke="#475569" strokeWidth="1.5" />
            <g transform="translate(12, -20)">
              <polygon points="14,0 28,7 14,14 0,7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="0,7 14,14 14,26 0,19" fill="#E2E8F0" />
              <polygon points="14,14 28,7 28,19 14,26" fill="#CBD5E1" />
            </g>
            <g transform="translate(38, -7)">
              <polygon points="14,0 28,7 14,14 0,7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="0,7 14,14 14,26 0,19" fill="#E2E8F0" />
              <polygon points="14,14 28,7 28,19 14,26" fill="#CBD5E1" />
            </g>

            <g transform="translate(15, 68) rotate(26.56)">
              <rect x="0" y="0" width="60" height="12" rx="3" fill="#14171F" stroke="#1FAA59" strokeWidth="1" />
              <circle cx="5" cy="6" r="2" fill="#1FAA59" />
              <text x="11" y="8.5" fill="#FFFFFF" fontSize="5.5" fontFamily="JetBrains Mono, monospace" fontWeight="800">
                1,420 UNITS OK
              </text>
            </g>
          </g>

          {/* ══ 4. MATHEMATICALLY ALIGNED TELEMETRY DOTTED LINES & RADAR TARGETS ══ */}
          {/* Dotted Line 1: From HUD Bottom-Left to RMA Scanner */}
          <line x1="330" y1="170" x2="145" y2="210" stroke="#FF6A3D" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
          {/* Target Reticle 1 (RMA Scanner) */}
          <g transform="translate(145, 210)">
            <ellipse cx="0" cy="0" rx="18" ry="8" stroke="#FF6A3D" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="0" cy="0" r="3" fill="#FF6A3D" />
          </g>

          {/* Dotted Line 2: From HUD Bottom-Center to Inventory Rack */}
          <line x1="370" y1="170" x2="275" y2="225" stroke="#1FAA59" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
          {/* Target Reticle 2 (Inventory Rack) */}
          <g transform="translate(275, 225)">
            <ellipse cx="0" cy="0" rx="18" ry="8" stroke="#1FAA59" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="0" cy="0" r="3" fill="#1FAA59" />
          </g>

          {/* ══ 5. FLOATING HOLOGRAPHIC 3-IN-1 RETAIL & E-COMMERCE HUD CARD ══ */}
          <g transform="translate(310, 65)">
            <rect
              x="0"
              y="0"
              width="180"
              height="105"
              rx="16"
              fill="url(#hudGlassGrad)"
              stroke="#FF6A3D"
              strokeWidth="2"
              filter="url(#hudGlow)"
            />

            <g transform="translate(12, 18)">
              <circle cx="4" cy="4" r="4" fill="#1FAA59" className="animate-pulse" />
              <text x="14" y="7" fill="#FFFFFF" fontSize="9" fontFamily="Manrope, sans-serif" fontWeight="800" letterSpacing="0.5">
                RETAIL ORCHESTRATION AI
              </text>
            </g>

            <g transform="translate(12, 38)">
              <rect x="0" y="0" width="156" height="18" rx="5" fill="#1E2738" stroke="#334155" strokeWidth="1" />
              <text x="6" y="12" fill="#94A3B8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                RMA: <tspan fill="#1FAA59" fontWeight="800">#8924 PASS ($148.50)</tspan>
              </text>
            </g>

            <g transform="translate(12, 60)">
              <rect x="0" y="0" width="156" height="18" rx="5" fill="#1E2738" stroke="#334155" strokeWidth="1" />
              <text x="6" y="12" fill="#94A3B8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                STOCK: <tspan fill="#FF6A3D" fontWeight="800">1,420 UNITS (AUTO-PO)</tspan>
              </text>
            </g>

            <g transform="translate(12, 92)">
              <text x="0" y="0" fill="#2E5EFF" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="900">
                ✓ SHOPIFY &amp; ERP SYNCED
              </text>
            </g>
          </g>

          {/* ══ 6. FLOATING 3D SQUIRCLE BADGE ══ */}
          <g transform="translate(242, 12)">
            <rect x="0" y="0" width="56" height="56" rx="18" fill="#FFFFFF" stroke="#FF6A3D" strokeWidth="2.5" className="drop-shadow-xl" />
            <ShoppingBag className="h-7 w-7 text-[#FF6A3D] translate-x-3.5 translate-y-3.5" />
          </g>
        </svg>
      </div>
    );
  }

  if (type === "agriculture") {
    return (
      <div className="relative w-full max-w-lg mx-auto h-[420px] flex items-center justify-center">
        <svg className="w-full h-full drop-shadow-2xl overflow-visible" viewBox="0 0 540 420" fill="none">
          <defs>
            <linearGradient id="agriTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1FAA59" />
              <stop offset="100%" stopColor="#107C3E" />
            </linearGradient>
            <linearGradient id="agriSideLeft" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#16214F" />
              <stop offset="100%" stopColor="#0B1026" />
            </linearGradient>
            <linearGradient id="agriSideRight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0E1638" />
              <stop offset="100%" stopColor="#050814" />
            </linearGradient>
            <linearGradient id="droneBeamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="siloMetalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
            <linearGradient id="greenhouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* ══ 1. 3D ISOMETRIC AGTECH FIELD SLAB ══ */}
          <polygon points="270,140 490,250 270,360 50,250" fill="url(#agriTopGrad)" stroke="#4ADE80" strokeWidth="2" />
          <polygon points="50,250 270,360 270,385 50,275" fill="url(#agriSideLeft)" />
          <polygon points="270,360 490,250 490,275 270,385" fill="url(#agriSideRight)" />

          <line x1="85" y1="225" x2="225" y2="295" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.6" />
          <line x1="115" y1="210" x2="255" y2="280" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.6" />
          <line x1="145" y1="195" x2="285" y2="265" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" strokeOpacity="0.6" />

          {/* Microclimate IoT Soil Probes */}
          <g transform="translate(130, 260)">
            <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="8" stroke="#4ADE80" strokeWidth="1.5" className="animate-ping" />
            <line x1="0" y1="0" x2="0" y2="-14" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="0" cy="-14" r="3" fill="#FF6A3D" />
          </g>
          <g transform="translate(195, 235)">
            <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            <line x1="0" y1="0" x2="0" y2="-14" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="0" cy="-14" r="3" fill="#FF6A3D" />
          </g>

          {/* ══ 2. LEFT SIDE: 3D HYDROPONIC SMART GREENHOUSE & WEATHER MAST ══ */}
          <g transform="translate(75, 175)">
            <polygon points="35,0 0,17.5 0,57.5 35,40" fill="#FFFFFF" stroke="#4ADE80" strokeWidth="1.5" />
            <polygon points="35,40 85,65 85,25 35,0" fill="url(#greenhouseGrad)" stroke="#4ADE80" strokeWidth="1.5" />
            <polygon points="35,-15 0,2.5 35,20 70,2.5" fill="url(#greenhouseGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
            <polygon points="35,-15 70,2.5 105,20 70,2.5" fill="#FFFFFF" fillOpacity="0.8" stroke="#4ADE80" strokeWidth="1.5" />

            <line x1="20" y1="20" x2="60" y2="40" stroke="#1FAA59" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="32" x2="60" y2="52" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" />

            <g transform="translate(-10, 15)">
              <line x1="0" y1="35" x2="0" y2="-15" stroke="#FFFFFF" strokeWidth="2" />
              <polygon points="-8,-12 0,-16 8,-12 0,-8" fill="#2E5EFF" stroke="#FFFFFF" strokeWidth="1" />
              <circle cx="-5" cy="-15" r="2" fill="#FF6A3D" />
              <circle cx="5" cy="-15" r="2" fill="#FF6A3D" />
            </g>
          </g>

          {/* ══ 3. AUTONOMOUS AGTECH SURVEY DRONE ══ */}
          <g transform="translate(130, 95)">
            <polygon points="35,12 0,75 70,75" fill="url(#droneBeamGrad)" />
            <ellipse cx="35" cy="75" rx="35" ry="12" stroke="#4ADE80" strokeWidth="1.5" strokeDasharray="3 3" />

            <rect x="23" y="4" width="24" height="12" rx="5" fill="#14171F" stroke="#2E5EFF" strokeWidth="1.5" />
            <circle cx="35" cy="10" r="2.5" fill="#1FAA59" />

            <line x1="12" y1="2" x2="58" y2="18" stroke="#CBD5E1" strokeWidth="2.5" />
            <line x1="12" y1="18" x2="58" y2="2" stroke="#CBD5E1" strokeWidth="2.5" />

            <ellipse cx="12" cy="2" rx="9" ry="3.5" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1.5" />
            <ellipse cx="58" cy="2" rx="9" ry="3.5" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1.5" />
            <ellipse cx="12" cy="18" rx="9" ry="3.5" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1.5" />
            <ellipse cx="58" cy="18" rx="9" ry="3.5" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1.5" />
          </g>

          {/* ══ 4. RIGHT SIDE: SOLID 3D METALLIC GRAIN SILO & REEFER DISPATCH BAY ══ */}
          <g transform="translate(225, 145)">
            <rect x="12" y="20" width="56" height="75" fill="url(#siloMetalGrad)" stroke="#64748B" strokeWidth="1.5" />
            
            <ellipse cx="40" cy="40" rx="28" ry="10" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <ellipse cx="40" cy="65" rx="28" ry="10" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            <ellipse cx="40" cy="95" rx="28" ry="10" fill="#475569" stroke="#64748B" strokeWidth="1.5" />

            <path d="M 12,20 C 12,-10 68,-10 68,20 Z" fill="#2E5EFF" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="40" cy="5" r="4" fill="#FFFFFF" stroke="#1E4AE6" strokeWidth="1.5" />

            <line x1="60" y1="20" x2="60" y2="92" stroke="#16214F" strokeWidth="2" />
            <line x1="56" y1="35" x2="64" y2="35" stroke="#16214F" strokeWidth="1.5" />
            <line x1="56" y1="50" x2="64" y2="50" stroke="#16214F" strokeWidth="1.5" />
            <line x1="56" y1="65" x2="64" y2="65" stroke="#16214F" strokeWidth="1.5" />
            <line x1="56" y1="80" x2="64" y2="80" stroke="#16214F" strokeWidth="1.5" />

            <g transform="translate(60, 50)">
              <polygon points="25,0 50,12.5 25,25 0,12.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
              <polygon points="0,12.5 25,25 25,50 0,37.5" fill="#2E5EFF" stroke="#1E4AE6" strokeWidth="1" />
              <polygon points="25,25 50,12.5 50,37.5 25,50" fill="#16214F" />
              
              <rect x="4" y="20" width="18" height="8" rx="2" fill="#14171F" />
              <text x="6" y="26" fill="#4ADE80" fontSize="5.5" fontFamily="JetBrains Mono, monospace" fontWeight="900">-4°C</text>

              <circle cx="8" cy="46" r="4" fill="#14171F" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="36" cy="42" r="4" fill="#14171F" stroke="#FFFFFF" strokeWidth="1.5" />
            </g>
          </g>

          {/* ══ 5. MATHEMATICALLY ALIGNED TELEMETRY DOTTED LINES & RADAR TARGETS ══ */}
          {/* Dotted Line 1: From HUD Bottom-Left to Survey Drone */}
          <line x1="330" y1="170" x2="165" y2="145" stroke="#4ADE80" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
          {/* Target Reticle 1 (Survey Drone) */}
          <g transform="translate(165, 145)">
            <ellipse cx="0" cy="0" rx="18" ry="8" stroke="#4ADE80" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="0" cy="0" r="3" fill="#4ADE80" />
          </g>

          {/* Dotted Line 2: From HUD Bottom-Center to Silo & Reefer Dock */}
          <line x1="370" y1="170" x2="285" y2="225" stroke="#2E5EFF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
          {/* Target Reticle 2 (Silo & Reefer Dock) */}
          <g transform="translate(285, 225)">
            <ellipse cx="0" cy="0" rx="18" ry="8" stroke="#2E5EFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="0" cy="0" r="3" fill="#2E5EFF" />
          </g>

          {/* ══ 6. FLOATING HOLOGRAPHIC AGTECH HARVEST TELEMATICS HUD CARD ══ */}
          <g transform="translate(310, 65)">
            <rect
              x="0"
              y="0"
              width="180"
              height="105"
              rx="16"
              fill="url(#hudGlassGrad)"
              stroke="#1FAA59"
              strokeWidth="2"
              filter="url(#hudGlow)"
            />

            <g transform="translate(12, 18)">
              <circle cx="4" cy="4" r="4" fill="#1FAA59" className="animate-pulse" />
              <text x="14" y="7" fill="#FFFFFF" fontSize="9" fontFamily="Manrope, sans-serif" fontWeight="800" letterSpacing="0.5">
                AGTECH TELEMATICS AI
              </text>
            </g>

            <g transform="translate(12, 38)">
              <rect x="0" y="0" width="156" height="18" rx="5" fill="#1E2738" stroke="#334155" strokeWidth="1" />
              <text x="6" y="12" fill="#94A3B8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                SOIL: <tspan fill="#4ADE80" fontWeight="800">68% MOISTURE · 24°C</tspan>
              </text>
            </g>

            <g transform="translate(12, 60)">
              <rect x="0" y="0" width="156" height="18" rx="5" fill="#1E2738" stroke="#334155" strokeWidth="1" />
              <text x="6" y="12" fill="#94A3B8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
                HARVEST: <tspan fill="#FF6A3D" fontWeight="800">-4°C REEFER DISPATCH</tspan>
              </text>
            </g>

            <g transform="translate(12, 92)">
              <text x="0" y="0" fill="#2E5EFF" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="900">
                ✓ BULK INPUT ORDERS OK
              </text>
            </g>
          </g>

          {/* ══ 7. FLOATING 3D SQUIRCLE BADGE ══ */}
          <g transform="translate(242, 12)">
            <rect x="0" y="0" width="56" height="56" rx="18" fill="#FFFFFF" stroke="#1FAA59" strokeWidth="2.5" className="drop-shadow-xl" />
            <Sprout className="h-7 w-7 text-[#1FAA59] translate-x-3.5 translate-y-3.5" />
          </g>
        </svg>
      </div>
    );
  }

  // ══ 4. ENTERPRISE TECHNOLOGY & SECURITY (MCP 1.0 & SOC2 VAULT) ══
  return (
    <div className="relative w-full max-w-lg mx-auto h-[420px] flex items-center justify-center">
      <svg className="w-full h-full drop-shadow-2xl overflow-visible" viewBox="0 0 540 420" fill="none">
        <defs>
          <linearGradient id="secTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E4AE6" />
            <stop offset="100%" stopColor="#16214F" />
          </linearGradient>
          <linearGradient id="secSideLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#16214F" />
            <stop offset="100%" stopColor="#0B1026" />
          </linearGradient>
          <linearGradient id="secSideRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0E1638" />
            <stop offset="100%" stopColor="#050814" />
          </linearGradient>
          <linearGradient id="serverGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#252C3D" />
            <stop offset="100%" stopColor="#14171F" />
          </linearGradient>
          <linearGradient id="vaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A63" />
            <stop offset="100%" stopColor="#FF462D" />
          </linearGradient>
        </defs>

        {/* ══ 1. 3D ISOMETRIC SECURITY FOUNDATION SLAB ══ */}
        <polygon points="270,140 490,250 270,360 50,250" fill="url(#secTopGrad)" stroke="#4B77FF" strokeWidth="2" />
        <polygon points="50,250 270,360 270,385 50,275" fill="url(#secSideLeft)" />
        <polygon points="270,360 490,250 490,275 270,385" fill="url(#secSideRight)" />

        {/* Fiber Optic Data Bus Grid Lines across Floor */}
        <line x1="140" y1="205" x2="360" y2="315" stroke="#4B77FF" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="85" y1="232" x2="305" y2="342" stroke="#4B77FF" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="140" y1="315" x2="360" y2="205" stroke="#FF6A3D" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* ══ 2. LEFT/CENTER: 3D DUAL DATACENTER SERVER BLADE CLUSTER ══ */}
        <g transform="translate(15, 10)">
          {/* Server Rack 1 (Left Blade Cabinet) */}
          <g transform="translate(85, 150)">
            <polygon points="35,0 70,17.5 35,35 0,17.5" fill="#2E5EFF" stroke="#1E4AE6" strokeWidth="1.5" />
            <polygon points="0,17.5 35,35 35,115 0,97.5" fill="url(#serverGrad1)" stroke="#334155" strokeWidth="1.5" />
            <polygon points="35,35 70,17.5 70,97.5 35,115" fill="#14171F" stroke="#334155" strokeWidth="1.5" />

            <line x1="40" y1="45" x2="65" y2="32.5" stroke="#334155" strokeWidth="1.5" />
            <circle cx="45" cy="42" r="1.5" fill="#1FAA59" />
            <circle cx="55" cy="37" r="1.5" fill="#2E5EFF" />

            <line x1="40" y1="65" x2="65" y2="52.5" stroke="#334155" strokeWidth="1.5" />
            <circle cx="45" cy="62" r="1.5" fill="#FF6A3D" />
            <circle cx="55" cy="57" r="1.5" fill="#1FAA59" />

            <line x1="40" y1="85" x2="65" y2="72.5" stroke="#334155" strokeWidth="1.5" />
            <circle cx="45" cy="82" r="1.5" fill="#1FAA59" />
            <circle cx="55" cy="77" r="1.5" fill="#2E5EFF" />

            <line x1="40" y1="105" x2="65" y2="92.5" stroke="#334155" strokeWidth="1.5" />
            <circle cx="45" cy="102" r="1.5" fill="#1FAA59" />
            <circle cx="55" cy="97" r="1.5" fill="#1FAA59" />
          </g>

          {/* Server Rack 2 (Right Blade Cabinet) */}
          <g transform="translate(145, 180)">
            <polygon points="35,0 70,17.5 35,35 0,17.5" fill="#2E5EFF" stroke="#1E4AE6" strokeWidth="1.5" />
            <polygon points="0,17.5 35,35 35,115 0,97.5" fill="url(#serverGrad1)" stroke="#334155" strokeWidth="1.5" />
            <polygon points="35,35 70,17.5 70,97.5 35,115" fill="#14171F" stroke="#334155" strokeWidth="1.5" />

            <line x1="40" y1="45" x2="65" y2="32.5" stroke="#334155" strokeWidth="1.5" />
            <circle cx="45" cy="42" r="1.5" fill="#1FAA59" />
            <circle cx="55" cy="37" r="1.5" fill="#1FAA59" />

            <line x1="40" y1="65" x2="65" y2="52.5" stroke="#334155" strokeWidth="1.5" />
            <circle cx="45" cy="62" r="1.5" fill="#2E5EFF" />
            <circle cx="55" cy="57" r="1.5" fill="#1FAA59" />

            <line x1="40" y1="85" x2="65" y2="72.5" stroke="#334155" strokeWidth="1.5" />
            <circle cx="45" cy="82" r="1.5" fill="#1FAA59" />
            <circle cx="55" cy="77" r="1.5" fill="#FF6A3D" />
          </g>

          {/* 3D Model Context Protocol (MCP 1.0) Gateway Router Pod */}
          <g transform="translate(125, 235)">
            <polygon points="25,0 50,12.5 25,25 0,12.5" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1.5" />
            <polygon points="0,12.5 25,25 25,45 0,32.5" fill="#1E4AE6" />
            <polygon points="25,25 50,12.5 50,32.5 25,45" fill="#16214F" />
            <rect x="6" y="18" width="14" height="6" rx="1.5" fill="#14171F" />
            <text x="8" y="23" fill="#4ADE80" fontSize="4.5" fontFamily="JetBrains Mono, monospace" fontWeight="900">MCP</text>
          </g>
        </g>

        {/* ══ 3. RIGHT SIDE: 3D CRYPTOGRAPHIC ZERO-TRUST SECURITY VAULT NODE ══ */}
        <g transform="translate(260, 185)">
          <polygon points="35,0 70,17.5 35,35 0,17.5" fill="url(#vaultGrad)" stroke="#FFFFFF" strokeWidth="1.5" />
          <polygon points="0,17.5 35,35 35,65 0,47.5" fill="#C4200B" />
          <polygon points="35,35 70,17.5 70,47.5 35,65" fill="#8B1405" />

          <g transform="translate(18, 12)">
            <ShieldCheck className="h-8 w-8 text-white drop-shadow-md" />
          </g>

          <g transform="translate(20, 75)">
            <rect x="0" y="0" width="34" height="14" rx="4" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1" />
            <text x="7" y="10" fill="#14171F" fontSize="6.5" fontFamily="Manrope, sans-serif" fontWeight="900">SAP</text>
          </g>
          <g transform="translate(60, 55)">
            <rect x="0" y="0" width="42" height="14" rx="4" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1" />
            <text x="6" y="10" fill="#14171F" fontSize="6.5" fontFamily="Manrope, sans-serif" fontWeight="900">ORACLE</text>
          </g>
        </g>

        {/* ══ 4. MATHEMATICALLY ALIGNED TELEMETRY DOTTED LINES & RADAR TARGETS ══ */}
        {/* Dotted Line 1: From HUD Bottom-Left to MCP Gateway */}
        <line x1="330" y1="170" x2="165" y2="245" stroke="#2E5EFF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
        {/* Target Reticle 1 (MCP Gateway) */}
        <g transform="translate(165, 245)">
          <ellipse cx="0" cy="0" rx="18" ry="8" stroke="#2E5EFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <circle cx="0" cy="0" r="3" fill="#2E5EFF" />
        </g>

        {/* Dotted Line 2: From HUD Bottom-Center to Cryptographic Vault */}
        <line x1="370" y1="170" x2="295" y2="220" stroke="#FF6A3D" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.85" />
        {/* Target Reticle 2 (Cryptographic Vault) */}
        <g transform="translate(295, 220)">
          <ellipse cx="0" cy="0" rx="18" ry="8" stroke="#FF6A3D" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <circle cx="0" cy="0" r="3" fill="#FF6A3D" />
        </g>

        {/* ══ 5. FLOATING HOLOGRAPHIC SOC2 & MCP 1.0 GATEWAY HUD CARD ══ */}
        <g transform="translate(310, 65)">
          <rect
            x="0"
            y="0"
            width="180"
            height="105"
            rx="16"
            fill="url(#hudGlassGrad)"
            stroke="#2E5EFF"
            strokeWidth="2"
            filter="url(#hudGlow)"
          />

          <g transform="translate(12, 18)">
            <circle cx="4" cy="4" r="4" fill="#1FAA59" className="animate-pulse" />
            <text x="14" y="7" fill="#FFFFFF" fontSize="9" fontFamily="Manrope, sans-serif" fontWeight="800" letterSpacing="0.5">
              ENTERPRISE SECURITY &amp; MCP
            </text>
          </g>

          <g transform="translate(12, 38)">
            <rect x="0" y="0" width="156" height="18" rx="5" fill="#1E2738" stroke="#334155" strokeWidth="1" />
            <text x="6" y="12" fill="#94A3B8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              GATEWAY: <tspan fill="#2E5EFF" fontWeight="800">MCP 1.0 SERVER (LIVE)</tspan>
            </text>
          </g>

          <g transform="translate(12, 60)">
            <rect x="0" y="0" width="156" height="18" rx="5" fill="#1E2738" stroke="#334155" strokeWidth="1" />
            <text x="6" y="12" fill="#94A3B8" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
              SECURITY: <tspan fill="#1FAA59" fontWeight="800">SOC2 TYPE II · SAML 2.0</tspan>
            </text>
          </g>

          <g transform="translate(12, 92)">
            <text x="0" y="0" fill="#FF6A3D" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="900">
              ✓ AUDIT LOGS IMMUTABLE
            </text>
          </g>
        </g>

        {/* ══ 6. FLOATING 3D SQUIRCLE BADGE ══ */}
        <g transform="translate(242, 12)">
          <rect x="0" y="0" width="56" height="56" rx="18" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="2.5" className="drop-shadow-xl" />
          <ShieldCheck className="h-7 w-7 text-[#2E5EFF] translate-x-3.5 translate-y-3.5" />
        </g>
      </svg>
    </div>
  );
};

const SpotlightFeatures = () => {
  return (
    <section className="bg-[#FAF9F6]">
      {INDUSTRY_FEATURES.map((feature, idx) => {
        const isEven = idx % 2 === 0;
        const bgClass = isEven ? "bg-[#FAF9F6]" : "bg-[#FFFFFF]";

        return (
          <div key={feature.id} className={`${bgClass} py-20 md:py-28 text-[#14171F]`}>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid items-center gap-12 lg:grid-cols-12">
                
                {/* Text Content Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"} space-y-5`}
                >
                  <span className="text-xs font-mono font-bold tracking-widest text-[#5B616E] uppercase block">
                    {feature.eyebrow}
                  </span>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E5EFF] font-display tracking-tight leading-tight">
                    {feature.title}
                  </h2>

                  <p className="text-base sm:text-lg text-[#5B616E] leading-relaxed font-body">
                    {feature.description}
                  </p>

                  <ul className="pt-2 space-y-3">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3 text-sm font-semibold text-[#14171F]">
                        <CheckCircle2 className="h-5 w-5 text-[#2E5EFF] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <a
                      href={`/solutions/${feature.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#2E5EFF] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1E4AE6] transition-all"
                    >
                      {feature.linkText} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>

                {/* Ultra-Rich 3D Isometric Visual Column */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <IsometricVisual type={feature.visualType} />
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default SpotlightFeatures;
