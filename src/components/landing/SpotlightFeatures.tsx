import { motion } from "framer-motion";
import { CheckCircle2, Truck, ShoppingBag, Sprout, ShieldCheck, ArrowRight } from "lucide-react";

interface IndustryFeature {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  visualType: "transportation" | "retail" | "agriculture" | "enterprise";
}

const INDUSTRY_FEATURES: IndustryFeature[] = [
  {
    id: "transportation",
    eyebrow: "WHY GROWTHMATES AI",
    title: "Our Role in Transportation",
    description:
      "Technology is the backbone of modern transportation. From fleet dispatching to route optimization and automated freight rate quoting, GrowthMates AI delivers intelligent agent solutions that keep fleets and cargo moving safely, securely, and efficiently.",
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

/* 3D Isometric Visual Component matching SDI Presence reference style */
const IsometricVisual = ({ type }: { type: IndustryFeature["visualType"] }) => {
  if (type === "transportation") {
    return (
      <div className="relative w-full max-w-lg mx-auto h-[380px] flex items-center justify-center">
        <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 500 380" fill="none">
          <defs>
            <linearGradient id="basePlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E5EFF" />
              <stop offset="100%" stopColor="#16214F" />
            </linearGradient>
            <linearGradient id="busBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E7E5DE" />
            </linearGradient>
          </defs>

          {/* Gear Base Teeth (SDI Style) */}
          <path
            d="M 120 280 L 150 265 L 180 280 L 210 265 L 240 280 L 270 265 L 300 280 L 330 265 L 360 280 L 380 270 L 380 295 L 120 295 Z"
            fill="#F2F1EC"
            stroke="#2E5EFF"
            strokeWidth="1.5"
          />

          {/* Isometric Blue Road Base Platform */}
          <path d="M 60 250 L 250 150 L 440 250 L 250 350 Z" fill="url(#basePlateGrad)" stroke="#2E5EFF" strokeWidth="2" />
          
          {/* Road Marking Stripes */}
          <path d="M 140 250 L 360 250" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="16 12" />

          {/* 3D Isometric Bus & Transit Vehicle */}
          <g transform="translate(100, 140)">
            {/* Bus Main Chassis */}
            <path d="M 40 50 L 160 110 L 200 90 L 80 30 Z" fill="#2E5EFF" />
            <path d="M 40 50 L 160 110 L 160 150 L 40 90 Z" fill="url(#busBodyGrad)" stroke="#2E5EFF" strokeWidth="2" />
            <path d="M 160 110 L 200 90 L 200 130 L 160 150 Z" fill="#2E5EFF" />
            
            {/* Windows */}
            <path d="M 50 60 L 150 110 L 150 75 L 50 25 Z" fill="#16214F" fillOpacity="0.85" />
            <path d="M 55 65 L 85 80 L 85 70 L 55 55 Z" fill="#7C97FF" />
            <path d="M 95 85 L 125 100 L 125 90 L 95 75 Z" fill="#7C97FF" />
            <path d="M 130 102 L 148 111 L 148 101 L 130 92 Z" fill="#7C97FF" />

            {/* Wheels */}
            <ellipse cx="75" cy="98" rx="14" ry="14" fill="#14171F" stroke="#FFFFFF" strokeWidth="2" />
            <ellipse cx="140" cy="130" rx="14" ry="14" fill="#14171F" stroke="#FFFFFF" strokeWidth="2" />
          </g>

          {/* 3D Solar Streetlight & Camera Terminal */}
          <g transform="translate(310, 80)">
            <rect x="20" y="40" width="8" height="130" rx="4" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="1.5" />
            {/* Solar Panel Top */}
            <path d="M 0 30 L 40 10 L 55 25 L 15 45 Z" fill="#2E5EFF" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Camera */}
            <rect x="24" y="65" width="22" height="12" rx="3" fill="#FF6A3D" />
          </g>

          {/* Transit Shelter Box */}
          <g transform="translate(260, 150)">
            <path d="M 0 30 L 70 0 L 110 20 L 40 50 Z" fill="#EEF1FF" stroke="#2E5EFF" strokeWidth="1.5" />
            <line x1="10" y1="35" x2="10" y2="85" stroke="#2E5EFF" strokeWidth="2" />
            <line x1="105" y1="22" x2="105" y2="72" stroke="#2E5EFF" strokeWidth="2" />
          </g>
        </svg>
      </div>
    );
  }

  if (type === "retail") {
    return (
      <div className="relative w-full max-w-lg mx-auto h-[380px] flex items-center justify-center">
        <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 500 380" fill="none">
          <defs>
            <linearGradient id="retailPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6A3D" />
              <stop offset="100%" stopColor="#16214F" />
            </linearGradient>
          </defs>

          {/* Base Platform */}
          <path d="M 60 250 L 250 150 L 440 250 L 250 350 Z" fill="url(#retailPlateGrad)" stroke="#FF6A3D" strokeWidth="2" />

          {/* 3D Storefront Building */}
          <g transform="translate(140, 110)">
            <path d="M 110 0 L 0 55 L 0 170 L 110 115 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="2" />
            <path d="M 110 0 L 220 55 L 220 170 L 110 115 Z" fill="#EEF1FF" stroke="#2E5EFF" strokeWidth="2" />
            <path d="M 110 0 L 220 55 L 110 110 L 0 55 Z" fill="#2E5EFF" />
            
            {/* Awning Stripes */}
            <path d="M 20 75 L 100 115 L 100 135 L 20 95 Z" fill="#FF6A3D" />
            <path d="M 120 125 L 200 165 L 200 170 L 120 130 Z" fill="#2E5EFF" />

            {/* Shopping Bag Icon Badge */}
            <g transform="translate(90, -30)">
              <circle cx="20" cy="20" r="22" fill="#FFFFFF" stroke="#FF6A3D" strokeWidth="3" />
              <ShoppingBag className="h-6 w-6 text-[#FF6A3D] translate-x-2 translate-y-2" />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  if (type === "agriculture") {
    return (
      <div className="relative w-full max-w-lg mx-auto h-[380px] flex items-center justify-center">
        <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 500 380" fill="none">
          <defs>
            <linearGradient id="farmPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1FAA59" />
              <stop offset="100%" stopColor="#16214F" />
            </linearGradient>
          </defs>

          {/* Base Field Platform */}
          <path d="M 60 250 L 250 150 L 440 250 L 250 350 Z" fill="url(#farmPlateGrad)" stroke="#1FAA59" strokeWidth="2" />
          
          {/* Crop Rows */}
          <path d="M 120 220 L 250 285" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 8" opacity="0.8" />
          <path d="M 160 200 L 290 265" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 8" opacity="0.8" />
          <path d="M 200 180 L 330 245" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="8 8" opacity="0.8" />

          {/* 3D Silo & Drone Node */}
          <g transform="translate(210, 100)">
            <rect x="30" y="40" width="60" height="120" rx="30" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="2" />
            <path d="M 30 60 L 90 60 L 60 20 Z" fill="#2E5EFF" />
            
            {/* Sprout Icon Badge */}
            <g transform="translate(10, -20)">
              <circle cx="20" cy="20" r="22" fill="#FFFFFF" stroke="#1FAA59" strokeWidth="3" />
              <Sprout className="h-6 w-6 text-[#1FAA59] translate-x-2 translate-y-2" />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  // Enterprise Security
  return (
    <div className="relative w-full max-w-lg mx-auto h-[380px] flex items-center justify-center">
      <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 500 380" fill="none">
        <defs>
          <linearGradient id="secPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E5EFF" />
            <stop offset="100%" stopColor="#16214F" />
          </linearGradient>
        </defs>

        <path d="M 60 250 L 250 150 L 440 250 L 250 350 Z" fill="url(#secPlateGrad)" stroke="#2E5EFF" strokeWidth="2" />

        {/* 3D Data Center Server Rack */}
        <g transform="translate(170, 90)">
          <path d="M 80 0 L 0 40 L 0 160 L 80 120 Z" fill="#14171F" stroke="#2E5EFF" strokeWidth="2" />
          <path d="M 80 0 L 160 40 L 160 160 L 80 120 Z" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="2" />
          <path d="M 80 0 L 160 40 L 80 80 L 0 40 Z" fill="#2E5EFF" />

          {/* Server LEDs */}
          <circle cx="30" cy="65" r="4" fill="#1FAA59" />
          <circle cx="45" cy="65" r="4" fill="#2E5EFF" />
          <circle cx="30" cy="95" r="4" fill="#FF6A3D" />
          <circle cx="45" cy="95" r="4" fill="#1FAA59" />

          {/* Shield Badge */}
          <g transform="translate(60, -30)">
            <circle cx="20" cy="20" r="22" fill="#FFFFFF" stroke="#2E5EFF" strokeWidth="3" />
            <ShieldCheck className="h-6 w-6 text-[#2E5EFF] translate-x-2 translate-y-2" />
          </g>
        </g>
      </svg>
    </div>
  );
};

const SpotlightFeatures = () => {
  return (
    <section className="border-b border-[#E7E5DE] bg-[#FAF9F6]">
      {INDUSTRY_FEATURES.map((feature, idx) => {
        const isEven = idx % 2 === 0;
        const bgClass = isEven ? "bg-[#FAF9F6]" : "bg-[#FFFFFF]";

        return (
          <div key={feature.id} className={`${bgClass} py-20 md:py-28 border-b border-[#E7E5DE] last:border-b-0 text-[#14171F]`}>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid items-center gap-12 lg:grid-cols-12">
                
                {/* Text Content Column (Exact SDI Presence Headline Style) */}
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
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#2E5EFF] hover:underline"
                    >
                      Learn more about our {feature.title} solutions <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>

                {/* 3D Isometric Visual Column (SDI Presence Style) */}
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
