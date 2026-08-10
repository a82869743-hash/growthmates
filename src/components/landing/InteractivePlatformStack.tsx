import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface HotspotPoint {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  layerName: string;
  dotPos: { x: number; y: number };
  layoutPosition: "top-center" | "top-right" | "bottom-left" | "bottom-right";
}

const HOTSPOTS: HotspotPoint[] = [
  {
    id: "autonomous-automation",
    title: "Autonomous Decision Intelligence",
    subtitle: "Real-Time Decision Logic",
    description:
      "GrowthMates AI adapts to high-velocity operational changes. Enable concurrent agentic execution targeted to solve complex transport, freight, and retail workflows without development downtime.",
    bullets: ["Multi-Agent Execution", "Step-Based Reasoning", "Predictive Analytics", "Real-Time RAG Memory"],
    layerName: "Layer 1: Applications & Agent Mesh",
    dotPos: { x: 50, y: 16 },
    layoutPosition: "top-center",
  },
  {
    id: "seamless-integration",
    title: "Seamless Enterprise Integration",
    subtitle: "Zero Rip-and-Replace",
    description:
      "Eliminate costly system overhauls. Our Model Context Protocol (MCP) server hooks directly into your legacy ERP, TMS, OMS, and CRM systems, preserving existing technology investments.",
    bullets: ["SAP & Oracle Connectors", "Xero & QuickBooks Sync", "Model Context Protocol", "Bi-directional Data Sync"],
    layerName: "Layer 3: Data & Enterprise Core",
    dotPos: { x: 74, y: 38 },
    layoutPosition: "top-right",
  },
  {
    id: "modular-agent-mesh",
    title: "Modular Agent Mesh",
    subtitle: "Plug & Play Capabilities",
    description:
      "Deploy specialized agents for route optimization, freight tracking, rate quoting, and inventory intelligence seamlessly across your entire supply chain.",
    bullets: ["Open API 3.0 Schema", "100% Microservices Architecture", "API-First Gateway", "Self-Enabled Tech Stack"],
    layerName: "Layer 4: API & Microservices",
    dotPos: { x: 26, y: 70 },
    layoutPosition: "bottom-left",
  },
  {
    id: "enterprise-security",
    title: "Enterprise Security & Unification",
    subtitle: "SOC2 Ready Foundation",
    description:
      "Unify fragmented silos across multi-modal transport and retail networks. Fully hardware, cloud, and OS agnostic with enterprise SOC2 security and SAML 2.0 SSO.",
    bullets: ["Cloud & OS Agnostic", "SAML 2.0 & SSO Auth", "Immutable Audit Logging", "SOC2 Compliant Runtime"],
    layerName: "Layer 5: Agnostic Infrastructure",
    dotPos: { x: 58, y: 84 },
    layoutPosition: "bottom-right",
  },
];

const InteractivePlatformStack = () => {
  const [activeHotspot, setActiveHotspot] = useState<string>("autonomous-automation");

  const activePoint = HOTSPOTS.find((h) => h.id === activeHotspot) || HOTSPOTS[0];

  return (
    <section className="bg-bg-base py-20 md:py-32 border-b border-border-subtle overflow-hidden text-fg-default font-body">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* GrowthMates AI Headline & Narrative Block */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-accent font-display tracking-tight leading-tight">
            Agentic Decision Intelligence
          </h2>
          <p className="mt-6 text-base md:text-lg text-fg-dim leading-relaxed max-w-3xl font-body">
            GrowthMates AI adapts to high-velocity operational changes, empowering transport, freight, and retail enterprises to build custom AI agents. Deploy concurrent agentic execution to automate complex decision-making, optimize route dispatching, and build a future-proof foundation for enterprise growth.
          </p>
        </div>

        {/* Central Toshiba-Style Interactive 3D Stack Canvas */}
        <div className="relative my-12 pt-8 pb-16">
          
          {/* Main Layout Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">

            {/* Central 3D Cloud Platform Stack Diagram */}
            <div className="lg:col-span-8 lg:col-start-3 relative flex flex-col items-center">
              
              {/* Outer Orbiting Ellipses Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <svg className="w-full h-full max-w-[700px] max-h-[500px]" viewBox="0 0 700 500" fill="none">
                  <ellipse cx="350" cy="250" rx="320" ry="180" stroke="#2E5EFF" strokeWidth="1.5" strokeDasharray="6 6" className="animate-spin-slow opacity-60" />
                  <ellipse cx="350" cy="250" rx="280" ry="140" stroke="#FF6A3D" strokeWidth="1" opacity="0.4" />
                </svg>
              </div>

              {/* 3D Stack Illustration Container */}
              <div className="relative w-full max-w-[580px] h-[460px] flex items-center justify-center">
                
                {/* SVG 3D Cylinder Stack Graphic */}
                <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 580 460" fill="none">
                  <defs>
                    <linearGradient id="layer1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2E5EFF" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#16214F" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id="layer2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4171FF" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#2E5EFF" stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="layer3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5F88FF" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#3B66F5" stopOpacity="0.75" />
                    </linearGradient>
                    <linearGradient id="layer4Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C97FF" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#4F72FF" stopOpacity="0.65" />
                    </linearGradient>
                    <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#14171F" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#0B0D12" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>

                  {/* Layer 5: Dark Base Deck - Agnostic Infrastructure */}
                  <g className="transition-opacity duration-300">
                    <ellipse cx="290" cy="370" rx="230" ry="55" fill="url(#baseGrad)" stroke="#14171F" strokeWidth="2" />
                    <path d="M60 370 C60 410 520 410 520 370 L520 395 C520 435 60 435 60 395 Z" fill="url(#baseGrad)" opacity="0.9" />
                    <ellipse cx="290" cy="395" rx="230" ry="40" fill="#0B0D12" />
                    <text x="290" y="405" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="JetBrains Mono" fontWeight="600" opacity="0.9">
                      Hardware, Cloud &amp; Operating System Agnostic
                    </text>
                  </g>

                  {/* Layer 4: Microservices & API Deck */}
                  <g className="transition-opacity duration-300">
                    <ellipse cx="290" cy="310" rx="220" ry="50" fill="url(#layer4Grad)" stroke="#2E5EFF" strokeWidth="1.5" />
                    <path d="M70 310 C70 350 510 350 510 310 L510 330 C510 370 70 370 70 330 Z" fill="url(#layer4Grad)" opacity="0.85" />
                    <rect x="130" y="295" width="90" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.9" />
                    <text x="175" y="310" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Open API 3.0</text>
                    
                    <rect x="235" y="295" width="110" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.9" />
                    <text x="290" y="310" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">MCP 1.0 Server</text>
                    
                    <rect x="360" y="295" width="90" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.9" />
                    <text x="405" y="310" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">API First</text>
                  </g>

                  {/* Layer 3: Data & Enterprise Core */}
                  <g className="transition-opacity duration-300">
                    <ellipse cx="290" cy="245" rx="210" ry="48" fill="url(#layer3Grad)" stroke="#2E5EFF" strokeWidth="1.5" />
                    <path d="M80 245 C80 285 500 285 500 245 L500 265 C500 305 80 305 80 265 Z" fill="url(#layer3Grad)" opacity="0.85" />
                    <rect x="120" y="232" width="70" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                    <text x="155" y="246" textAnchor="middle" fill="#16214F" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">IoT Feeds</text>

                    <rect x="205" y="232" width="75" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                    <text x="242" y="246" textAnchor="middle" fill="#16214F" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">SAP ERP</text>

                    <rect x="295" y="232" width="70" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                    <text x="330" y="246" textAnchor="middle" fill="#16214F" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Oracle TMS</text>

                    <rect x="380" y="232" width="75" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                    <text x="417" y="246" textAnchor="middle" fill="#16214F" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Salesforce</text>
                  </g>

                  {/* Layer 2: Decision Analytics Deck */}
                  <g className="transition-opacity duration-300">
                    <ellipse cx="290" cy="180" rx="200" ry="45" fill="url(#layer2Grad)" stroke="#2E5EFF" strokeWidth="1.5" />
                    <path d="M90 180 C90 220 490 220 490 180 L490 198 C490 238 90 238 90 198 Z" fill="url(#layer2Grad)" opacity="0.85" />
                    <rect x="135" y="168" width="95" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                    <text x="182" y="182" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Step Reasoning</text>

                    <rect x="245" y="168" width="95" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                    <text x="292" y="182" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Computer Vision</text>

                    <rect x="350" y="168" width="95" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                    <text x="397" y="182" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Predictive AI</text>
                  </g>

                  {/* Layer 1: Top Cloud Deck - Applications & AI Agent Mesh */}
                  <g className="transition-opacity duration-300">
                    <ellipse cx="290" cy="115" rx="190" ry="42" fill="url(#layer1Grad)" stroke="#FFFFFF" strokeWidth="2" />
                    <path d="M140 115 C140 70 200 60 230 85 C260 55 330 55 360 85 C390 65 440 85 440 115 Z" fill="#2E5EFF" opacity="0.95" />
                    
                    <g transform="translate(160, 85)">
                      <circle cx="20" cy="15" r="14" fill="#FF6A3D" />
                      <text x="20" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Route</text>
                    </g>
                    <g transform="translate(230, 75)">
                      <circle cx="20" cy="15" r="14" fill="#FF6A3D" />
                      <text x="20" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Rate</text>
                    </g>
                    <g transform="translate(300, 75)">
                      <circle cx="20" cy="15" r="14" fill="#FF6A3D" />
                      <text x="20" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">Fleet</text>
                    </g>
                    <g transform="translate(370, 85)">
                      <circle cx="20" cy="15" r="14" fill="#FF6A3D" />
                      <text x="20" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">RMA</text>
                    </g>
                  </g>

                  {/* Connecting Pointer Lines & Hotspot Dots */}
                  {HOTSPOTS.map((hotspot) => {
                    const isSelected = activeHotspot === hotspot.id;
                    const cx = (hotspot.dotPos.x / 100) * 580;
                    const cy = (hotspot.dotPos.y / 100) * 460;

                    return (
                      <g key={hotspot.id} onClick={() => setActiveHotspot(hotspot.id)} className="cursor-pointer">
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? 16 : 10}
                          fill="#FF6A3D"
                          fillOpacity={isSelected ? 0.35 : 0.2}
                          className={isSelected ? "animate-ping" : ""}
                        />
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? 8 : 6}
                          fill="#FF6A3D"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Hotspot Click Overlays */}
                {HOTSPOTS.map((hotspot) => {
                  const isSelected = activeHotspot === hotspot.id;

                  return (
                    <button
                      key={hotspot.id}
                      onClick={() => setActiveHotspot(hotspot.id)}
                      style={{
                        left: `${hotspot.dotPos.x}%`,
                        top: `${hotspot.dotPos.y}%`,
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2 transition-transform hover:scale-125 focus:outline-none ${
                        isSelected ? "z-30 scale-110" : "z-20"
                      }`}
                      aria-label={hotspot.title}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Surrounding GrowthMates AI Callout Headlines */}
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            
            {/* Top-Right Callout: Seamless Enterprise Integration */}
            <div
              onClick={() => setActiveHotspot("seamless-integration")}
              className={`cursor-pointer border-t-2 pt-4 transition-all duration-300 ${
                activeHotspot === "seamless-integration"
                  ? "border-signal-warm text-fg-default"
                  : "border-border-subtle text-fg-dim hover:border-accent"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-accent font-display">
                  Seamless Enterprise Integration
                </h3>
                <span className="h-2.5 w-2.5 rounded-full bg-signal-warm" />
              </div>
              <p className="mt-2 text-sm text-fg-dim leading-relaxed">
                Connect GrowthMates MCP server directly to your existing SAP, Oracle, Xero, and TMS infrastructure without replacing legacy code.
              </p>
            </div>

            {/* Bottom-Left Callout: Modular Agent Mesh */}
            <div
              onClick={() => setActiveHotspot("modular-agent-mesh")}
              className={`cursor-pointer border-t-2 pt-4 transition-all duration-300 ${
                activeHotspot === "modular-agent-mesh"
                  ? "border-signal-warm text-fg-default"
                  : "border-border-subtle text-fg-dim hover:border-accent"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-accent font-display">
                  Modular Agent Mesh
                </h3>
                <span className="h-2.5 w-2.5 rounded-full bg-signal-warm" />
              </div>
              <p className="mt-2 text-sm text-fg-dim leading-relaxed">
                Deploy specialized agents independently or chain them into coordinated multi-agent workflows across your entire enterprise.
              </p>
            </div>

            {/* Bottom-Right Callout: Enterprise Security & Unification */}
            <div
              onClick={() => setActiveHotspot("enterprise-security")}
              className={`cursor-pointer border-t-2 pt-4 transition-all duration-300 ${
                activeHotspot === "enterprise-security"
                  ? "border-signal-warm text-fg-default"
                  : "border-border-subtle text-fg-dim hover:border-accent"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-accent font-display">
                  Enterprise Security &amp; Unification
                </h3>
                <span className="h-2.5 w-2.5 rounded-full bg-signal-warm" />
              </div>
              <p className="mt-2 text-sm text-fg-dim leading-relaxed">
                Hardware, cloud, and OS agnostic foundation with enterprise SAML SSO, encrypted vector memory, and SOC2 compliance.
              </p>
            </div>

            {/* Top-Center Callout: Autonomous Decision Intelligence */}
            <div
              onClick={() => setActiveHotspot("autonomous-automation")}
              className={`cursor-pointer border-t-2 pt-4 transition-all duration-300 ${
                activeHotspot === "autonomous-automation"
                  ? "border-signal-warm text-fg-default"
                  : "border-border-subtle text-fg-dim hover:border-accent"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-accent font-display">
                  Autonomous Decision Intelligence
                </h3>
                <span className="h-2.5 w-2.5 rounded-full bg-signal-warm" />
              </div>
              <p className="mt-2 text-sm text-fg-dim leading-relaxed">
                Step-based AI reasoning over live operational data with real-time auditability and human-in-the-loop controls.
              </p>
            </div>

          </div>

          {/* Active Hotspot Inspector Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePoint.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="mt-12 rounded-xl bg-bg-surface border-2 border-accent p-8 shadow-floating max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-signal-warm uppercase tracking-wider block mb-1">
                    SELECTED HOTSPOT: {activePoint.layerName}
                  </span>
                  <h4 className="text-2xl font-extrabold text-fg-default font-display">
                    {activePoint.title} — <span className="text-accent">{activePoint.subtitle}</span>
                  </h4>
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-accent-dim px-4 py-1.5 text-xs font-bold text-accent">
                  <Sparkles className="h-4 w-4" /> GrowthMates AI Core
                </div>
              </div>

              <p className="text-sm text-fg-dim leading-relaxed mb-6">
                {activePoint.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {activePoint.bullets.map((b) => (
                  <div key={b} className="p-3 rounded-md bg-bg-base border border-border-subtle text-xs font-mono font-semibold text-fg-default flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default InteractivePlatformStack;
