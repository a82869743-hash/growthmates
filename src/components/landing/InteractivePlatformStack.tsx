import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, Cpu, ArrowRight, MessageSquare, Plus } from "lucide-react";

interface LayerData {
  id: string;
  layerIndex: number;
  layerName: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  gradientId: string;
  hotspotPos: { x: number; y: number };
}

const LAYERS: LayerData[] = [
  {
    id: "layer-1",
    layerIndex: 1,
    layerName: "Layer 1: Applications & Agent Mesh",
    title: "Autonomous Decision Engine",
    subtitle: "Real-Time AI Reasoning & Agent Mesh",
    description:
      "GrowthMates AI adapts to high-velocity operational changes. Enable concurrent agentic execution to solve complex logistics, fleet, and retail workflows without development blackouts.",
    bullets: ["Multi-Agent Execution", "Step-Based Reasoning", "Predictive Analytics", "Real-Time RAG Memory"],
    gradientId: "layer1Grad",
    hotspotPos: { x: 50, y: 18 },
  },
  {
    id: "layer-2",
    layerIndex: 2,
    layerName: "Layer 2: Decision & Analytics Engine",
    title: "Relentless Innovation",
    subtitle: "Computer Vision & Step Reasoning",
    description:
      "Execute real-time computer vision, rate calculations, and driver HOS compliance checks over continuous streaming telemetry data with instant audit logging.",
    bullets: ["Computer Vision AI", "Live Rate Quoting", "Driver HOS Sync", "Margin Enforcement"],
    gradientId: "layer2Grad",
    hotspotPos: { x: 40, y: 36 },
  },
  {
    id: "layer-3",
    layerIndex: 3,
    layerName: "Layer 3: Enterprise Data Core",
    title: "Maximize Existing Investments",
    subtitle: "Zero Rip-and-Replace Integration",
    description:
      "Eliminate costly system overhauls. Our Model Context Protocol (MCP) server hooks directly into your legacy ERP, TMS, OMS, and CRM systems, preserving existing technology investments.",
    bullets: ["SAP & Oracle Connectors", "Xero & QuickBooks Sync", "Model Context Protocol", "Bi-directional Data Sync"],
    gradientId: "layer3Grad",
    hotspotPos: { x: 74, y: 52 },
  },
  {
    id: "layer-4",
    layerIndex: 4,
    layerName: "Layer 4: API & Microservices",
    title: "Modular Agent Framework",
    subtitle: "Plug & Play Microservices Architecture",
    description:
      "Deploy specialized agents for route optimization, freight tracking, rate quoting, and inventory intelligence seamlessly across your entire supply chain network.",
    bullets: ["Open API 3.0 Schema", "100% Microservices Architecture", "API-First Gateway", "Self-Enabled Tech Stack"],
    gradientId: "layer4Grad",
    hotspotPos: { x: 26, y: 68 },
  },
  {
    id: "layer-5",
    layerIndex: 5,
    layerName: "Layer 5: Agnostic Infrastructure",
    title: "Unmatched Unification",
    subtitle: "SOC2 Ready Hardware & OS Agnostic Foundation",
    description:
      "Unify fragmented silos across multi-modal transport and retail networks. Fully hardware, cloud, and OS agnostic with enterprise SOC2 security and SAML 2.0 SSO.",
    bullets: ["Cloud & OS Agnostic", "SAML 2.0 & SSO Auth", "Immutable Audit Logging", "SOC2 Compliant Runtime"],
    gradientId: "baseGrad",
    hotspotPos: { x: 58, y: 84 },
  },
];

export const InteractivePlatformStack = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>("layer-3");

  const activeLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[2];

  return (
    <section className="bg-bg-base py-20 md:py-32 border-b border-border-subtle overflow-hidden text-fg-default font-body relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Toshiba Style Top Section Header */}
        <div className="max-w-4xl mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-dim px-3.5 py-1 text-xs font-semibold text-accent mb-3">
            <Cpu className="h-3.5 w-3.5" /> Interactive Platform Architecture Map
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-accent font-display tracking-tight leading-tight">
            Click to Expand Platform Layers
          </h2>
          <p className="mt-4 text-base md:text-lg text-fg-dim leading-relaxed font-body">
            Click any layer on the 3D cloud cylinder stack or select a feature module below to explore how GrowthMates AI connects to your existing infrastructure.
          </p>
        </div>

        {/* Toshiba Style Interactive Stack & Expanded Feature Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive 3D SVG Cylinder Stack Canvas */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            
            {/* Background Orbit Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
              <svg className="w-full h-full max-w-[500px] max-h-[400px]" viewBox="0 0 500 400" fill="none">
                <ellipse cx="250" cy="200" rx="220" ry="130" stroke="#2E5EFF" strokeWidth="1.5" strokeDasharray="6 6" />
              </svg>
            </div>

            {/* 3D Stack Illustration */}
            <div className="relative w-full max-w-[500px] h-[440px] flex items-center justify-center">
              <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 580 460" fill="none">
                <defs>
                  <linearGradient id="layer1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2E5EFF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#16214F" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="layer2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4171FF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#2E5EFF" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="layer3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6A3D" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#C94A22" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="layer4Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C97FF" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#4F72FF" stopOpacity="0.75" />
                  </linearGradient>
                  <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14171F" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#0B0D12" stopOpacity="0.95" />
                  </linearGradient>
                </defs>

                {/* Layer 5: Agnostic Infrastructure Base */}
                <g onClick={() => setActiveLayerId("layer-5")} className="cursor-pointer group">
                  <ellipse
                    cx="290" cy="370" rx="230" ry="55"
                    fill={activeLayerId === "layer-5" ? "#14171F" : "url(#baseGrad)"}
                    stroke={activeLayerId === "layer-5" ? "#FF6A3D" : "#14171F"}
                    strokeWidth={activeLayerId === "layer-5" ? 3 : 2}
                  />
                  <path d="M60 370 C60 410 520 410 520 370 L520 395 C520 435 60 435 60 395 Z" fill="url(#baseGrad)" opacity="0.9" />
                  <ellipse cx="290" cy="395" rx="230" ry="40" fill="#0B0D12" />
                  <text x="290" y="405" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontFamily="JetBrains Mono" fontWeight="600">
                    Layer 5: Hardware, Cloud &amp; OS Agnostic Foundation
                  </text>
                </g>

                {/* Layer 4: Microservices & API Deck */}
                <g onClick={() => setActiveLayerId("layer-4")} className="cursor-pointer group">
                  <ellipse
                    cx="290" cy="310" rx="220" ry="50"
                    fill="url(#layer4Grad)"
                    stroke={activeLayerId === "layer-4" ? "#FF6A3D" : "#2E5EFF"}
                    strokeWidth={activeLayerId === "layer-4" ? 3 : 1.5}
                  />
                  <path d="M70 310 C70 350 510 350 510 310 L510 330 C510 370 70 370 70 330 Z" fill="url(#layer4Grad)" opacity="0.85" />
                  <rect x="130" y="295" width="90" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.9" />
                  <text x="175" y="310" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Open API 3.0</text>
                  <rect x="235" y="295" width="110" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.9" />
                  <text x="290" y="310" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">MCP 1.0 Server</text>
                  <rect x="360" y="295" width="90" height="22" rx="4" fill="#FFFFFF" fillOpacity="0.9" />
                  <text x="405" y="310" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">API First</text>
                </g>

                {/* Layer 3: Enterprise Data Core */}
                <g onClick={() => setActiveLayerId("layer-3")} className="cursor-pointer group">
                  <ellipse
                    cx="290" cy="245" rx="210" ry="48"
                    fill="url(#layer3Grad)"
                    stroke={activeLayerId === "layer-3" ? "#FFFFFF" : "#FF6A3D"}
                    strokeWidth={activeLayerId === "layer-3" ? 3 : 1.5}
                  />
                  <path d="M80 245 C80 285 500 285 500 245 L500 265 C500 305 80 305 80 265 Z" fill="url(#layer3Grad)" opacity="0.9" />
                  <rect x="120" y="232" width="70" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                  <text x="155" y="246" textAnchor="middle" fill="#16214F" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">IoT Feeds</text>
                  <rect x="205" y="232" width="75" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                  <text x="242" y="246" textAnchor="middle" fill="#16214F" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">SAP ERP</text>
                  <rect x="295" y="232" width="70" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                  <text x="330" y="246" textAnchor="middle" fill="#16214F" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Oracle TMS</text>
                  <rect x="380" y="232" width="75" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                  <text x="417" y="246" textAnchor="middle" fill="#16214F" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Salesforce</text>
                </g>

                {/* Layer 2: Decision & Analytics Engine */}
                <g onClick={() => setActiveLayerId("layer-2")} className="cursor-pointer group">
                  <ellipse
                    cx="290" cy="180" rx="200" ry="45"
                    fill="url(#layer2Grad)"
                    stroke={activeLayerId === "layer-2" ? "#FF6A3D" : "#2E5EFF"}
                    strokeWidth={activeLayerId === "layer-2" ? 3 : 1.5}
                  />
                  <path d="M90 180 C90 220 490 220 490 180 L490 198 C490 238 90 238 90 198 Z" fill="url(#layer2Grad)" opacity="0.85" />
                  <rect x="135" y="168" width="95" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                  <text x="182" y="182" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Step Reasoning</text>
                  <rect x="245" y="168" width="95" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                  <text x="292" y="182" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Computer Vision</text>
                  <rect x="350" y="168" width="95" height="20" rx="4" fill="#FFFFFF" fillOpacity="0.95" />
                  <text x="397" y="182" textAnchor="middle" fill="#2E5EFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="700">Predictive AI</text>
                </g>

                {/* Layer 1: Top Applications & Agent Mesh */}
                <g onClick={() => setActiveLayerId("layer-1")} className="cursor-pointer group">
                  <ellipse
                    cx="290" cy="115" rx="190" ry="42"
                    fill="url(#layer1Grad)"
                    stroke={activeLayerId === "layer-1" ? "#FF6A3D" : "#FFFFFF"}
                    strokeWidth={activeLayerId === "layer-1" ? 3 : 2}
                  />
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

                {/* Hotspot Dots */}
                {LAYERS.map((layer) => {
                  const isSelected = activeLayerId === layer.id;
                  const cx = (layer.hotspotPos.x / 100) * 580;
                  const cy = (layer.hotspotPos.y / 100) * 460;

                  return (
                    <g key={layer.id} onClick={() => setActiveLayerId(layer.id)} className="cursor-pointer">
                      <circle cx={cx} cy={cy} r={isSelected ? 16 : 10} fill="#FF6A3D" fillOpacity={isSelected ? 0.4 : 0.2} className={isSelected ? "animate-ping" : ""} />
                      <circle cx={cx} cy={cy} r={isSelected ? 8 : 6} fill="#FF6A3D" stroke="#FFFFFF" strokeWidth="2" />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Layer Switch Buttons below Stack */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`rounded-full px-3 py-1 text-xs font-mono font-bold transition-all ${
                    activeLayerId === layer.id
                      ? "bg-[#FF6A3D] text-white shadow-sm"
                      : "bg-white border border-border-subtle text-fg-dim hover:text-accent"
                  }`}
                >
                  Layer {layer.layerIndex}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Toshiba-Style Expanded Layer Details Display */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Layer Selection Selector Bar */}
            <div className="border-b border-border-subtle pb-4">
              <span className="text-xs font-mono font-bold text-signal-warm uppercase tracking-wider block mb-1">
                {activeLayer.layerName}
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-accent font-display tracking-tight">
                {activeLayer.title}
              </h3>
              <p className="text-sm font-semibold text-fg-dim font-display mt-1">
                {activeLayer.subtitle}
              </p>
            </div>

            {/* Expanded Layer Detailed Content Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-base text-fg-dim leading-relaxed font-body">
                  {activeLayer.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-fg-default uppercase tracking-wider">
                    KEY ARCHITECTURAL CAPABILITIES
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeLayer.bullets.map((b) => (
                      <div key={b} className="p-3.5 rounded-xl bg-white border border-border-subtle text-xs font-mono font-bold text-fg-default flex items-center gap-2.5 shadow-2xs">
                        <CheckCircle2 className="h-4 w-4 text-[#1FAA59] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-xs font-mono text-fg-dimmer">100% Microservices &amp; API-First</span>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                  >
                    Discuss this layer with engineering <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* Toshiba Style Floating Quick Conversation Button (Bottom-Right) */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-[#16214F] text-white px-6 py-3.5 text-xs font-bold font-display uppercase tracking-wider shadow-2xl hover:bg-[#2E5EFF] transition-all hover:scale-105 border border-white/20"
          >
            <span>START A CONVERSATION</span>
            <Plus className="h-4 w-4 text-[#FF6A3D]" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default InteractivePlatformStack;
