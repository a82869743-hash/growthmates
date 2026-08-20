import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, CheckCircle2, ArrowRight, Layers, Sparkles } from "lucide-react";

interface LayerData {
  id: string;
  layerIndex: number;
  layerName: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  hotspotPos: { x: number; y: number };
}

const LAYERS: LayerData[] = [
  {
    id: "layer-1",
    layerIndex: 1,
    layerName: "Layer 1: Applications & Agent Mesh",
    tabLabel: "Agent Mesh & Apps",
    title: "Autonomous Decision Engine",
    subtitle: "Real-Time AI Reasoning & Cloud Agent Mesh",
    description:
      "GrowthMates AI adapts to high-velocity operational changes. Enable concurrent agentic execution to solve complex logistics, fleet, and retail workflows without development blackouts.",
    bullets: ["Multi-Agent Execution", "Step-Based Reasoning", "Predictive Analytics", "Real-Time RAG Memory"],
    hotspotPos: { x: 80, y: 16 },
  },
  {
    id: "layer-2",
    layerIndex: 2,
    layerName: "Layer 2: Decision & Analytics Engine",
    tabLabel: "AI-Powered Analytics",
    title: "Relentless Innovation",
    subtitle: "Computer Vision & Step Reasoning",
    description:
      "Execute real-time computer vision, rate calculations, and driver HOS compliance checks over continuous streaming telemetry data with instant audit logging.",
    bullets: ["Computer Vision AI", "Live Rate Quoting", "Driver HOS Sync", "Margin Enforcement"],
    hotspotPos: { x: 55, y: 38 },
  },
  {
    id: "layer-3",
    layerIndex: 3,
    layerName: "Layer 3: Enterprise Data Core",
    tabLabel: "Connected Data Sources",
    title: "Maximize Existing Investments",
    subtitle: "Zero Rip-and-Replace Integration",
    description:
      "Eliminate costly system overhauls. Our Model Context Protocol (MCP) server hooks directly into your legacy ERP, TMS, OMS, and CRM systems, preserving existing technology investments.",
    bullets: ["SAP & Oracle Connectors", "Xero & QuickBooks Sync", "Model Context Protocol", "Bi-directional Data Sync"],
    hotspotPos: { x: 78, y: 55 },
  },
  {
    id: "layer-4",
    layerIndex: 4,
    layerName: "Layer 4: API & Microservices",
    tabLabel: "Modular Microservices",
    title: "Modular Agent Framework",
    subtitle: "Plug & Play Microservices",
    description:
      "Deploy specialized agents for route optimization, freight tracking, rate quoting, and inventory intelligence seamlessly across your entire supply chain network.",
    bullets: ["Open API 3.0 Schema", "100% Microservices Architecture", "API-First Gateway", "Self-Enabled Tech Stack"],
    hotspotPos: { x: 38, y: 72 },
  },
  {
    id: "layer-5",
    layerIndex: 5,
    layerName: "Layer 5: Agnostic Infrastructure",
    tabLabel: "Agnostic Infrastructure",
    title: "Unmatched Unification",
    subtitle: "SOC2 Ready Hardware & OS Agnostic Foundation",
    description:
      "Unify fragmented silos across multi-modal transport and retail networks. Fully hardware, cloud, and OS agnostic with enterprise SOC2 security and SAML 2.0 SSO.",
    bullets: ["Cloud & OS Agnostic", "SAML 2.0 & SSO Auth", "Immutable Audit Logging", "SOC2 Compliant Runtime"],
    hotspotPos: { x: 60, y: 88 },
  },
];

export const InteractivePlatformStack = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>("layer-1");

  const activeLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[0];

  return (
    <section className="bg-[#FAF9F6] py-20 md:py-32 overflow-hidden text-[#14171F] font-body relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF] mb-3">
            <Cpu className="h-3.5 w-3.5" /> INTERACTIVE PLATFORM STACK
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#14171F] font-display tracking-tight leading-tight">
            Click to Expand <span className="text-[#2E5EFF]">Platform Layers</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#5B616E] leading-relaxed font-body">
            Click any floating layer on the 3D cloud cylinder stack or select a layer below to explore how GrowthMates AI connects to your existing infrastructure.
          </p>
        </div>

        {/* 3D Stack & Details Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Floating 3D SVG Cloud-Cylinder Stack Canvas */}
          <div className="lg:col-span-7 relative flex flex-col items-center">
            
            {/* Background Orbit Ring Dotted Lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
                className="w-full h-full max-w-[620px] max-h-[480px]"
                viewBox="0 0 600 440"
                fill="none"
              >
                <ellipse cx="320" cy="220" rx="265" ry="155" stroke="#68BCD8" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
                <ellipse cx="320" cy="220" rx="240" ry="130" stroke="#FF6A3D" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                
                {/* Floating telemetry specks */}
                <circle cx="120" cy="180" r="3" fill="#FF6A3D" opacity="0.7" />
                <circle cx="490" cy="120" r="3.5" fill="#2E5EFF" opacity="0.7" />
                <circle cx="180" cy="340" r="2.5" fill="#1FAA59" opacity="0.7" />
                <circle cx="460" cy="300" r="3" fill="#FF6A3D" opacity="0.7" />
              </motion.svg>
            </div>

            {/* Continuous Floating 3D Container Wrapper */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[660px] h-[500px] flex items-center justify-center"
            >
              <svg className="w-full h-full drop-shadow-2xl overflow-visible" viewBox="0 0 680 480" fill="none">
                <defs>
                  {/* Light Cyan-Ice Glass Gradients (Exact Match to Reference Graphic) */}
                  <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#A8E2F2" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#76C7DF" stopOpacity="0.90" />
                    <stop offset="100%" stopColor="#52AEC9" stopOpacity="0.95" />
                  </linearGradient>

                  <linearGradient id="cylinderTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#89D4E8" stopOpacity="0.88" />
                    <stop offset="50%" stopColor="#67BDD5" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#4FAEC8" stopOpacity="0.92" />
                  </linearGradient>

                  <linearGradient id="cylinderSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#56ADC7" stopOpacity="0.90" />
                    <stop offset="100%" stopColor="#3686A2" stopOpacity="0.95" />
                  </linearGradient>

                  <linearGradient id="activeCylinderTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B3EAF7" stopOpacity="0.98" />
                    <stop offset="50%" stopColor="#79D2E8" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#54B8D5" stopOpacity="1" />
                  </linearGradient>

                  {/* Dark Charcoal Base Gradient for Layer 5 */}
                  <linearGradient id="charcoalBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#323842" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#1E2229" stopOpacity="0.98" />
                  </linearGradient>

                  {/* Red / Orange 3D Glossy Sphere Gradient */}
                  <radialGradient id="redSphereGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#FF7A63" />
                    <stop offset="60%" stopColor="#FF462D" />
                    <stop offset="100%" stopColor="#C4200B" />
                  </radialGradient>

                  {/* Soft Drop Glow */}
                  <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* ══ LAYER 5: Agnostic Infrastructure Base (Dark Charcoal Cylinder) ══ */}
                <motion.g
                  onClick={() => setActiveLayerId("layer-5")}
                  animate={{
                    translateY: activeLayerId === "layer-5" ? -14 : 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="cursor-pointer group"
                >
                  <ellipse
                    cx="405" cy="390" rx="200" ry="42"
                    fill="url(#charcoalBaseGrad)"
                    stroke={activeLayerId === "layer-5" ? "#FF6A3D" : "#4A5260"}
                    strokeWidth={activeLayerId === "layer-5" ? 2.5 : 1}
                    filter={activeLayerId === "layer-5" ? "url(#activeGlow)" : undefined}
                  />
                  <path d="M 205 390 C 205 427 605 427 605 390 L 605 415 C 605 452 205 452 205 415 Z" fill="url(#charcoalBaseGrad)" opacity="0.96" />
                  <ellipse cx="405" cy="415" rx="200" ry="37" fill="#171A20" />
                  
                  {/* Wireframe texture */}
                  <line x1="260" y1="400" x2="260" y2="435" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" />
                  <line x1="330" y1="405" x2="330" y2="443" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" />
                  <line x1="405" y1="407" x2="405" y2="447" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" />
                  <line x1="480" y1="405" x2="480" y2="443" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" />
                  <line x1="550" y1="400" x2="550" y2="435" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" />
                  
                  {/* Clean Centered Typography */}
                  <text x="405" y="425" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontFamily="Manrope, sans-serif" fontWeight="700" letterSpacing="0.3">
                    Hardware, Cloud &amp; Operating System • Agnostic Foundation
                  </text>
                </motion.g>

                {/* ══ LAYER 4: API & Modular Microservices (Light Ice Cyan Cylinder) ══ */}
                <motion.g
                  onClick={() => setActiveLayerId("layer-4")}
                  animate={{
                    translateY: activeLayerId === "layer-4" ? -16 : 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="cursor-pointer group"
                >
                  <ellipse
                    cx="405" cy="330" rx="190" ry="40"
                    fill={activeLayerId === "layer-4" ? "url(#activeCylinderTopGrad)" : "url(#cylinderTopGrad)"}
                    stroke={activeLayerId === "layer-4" ? "#FFFFFF" : "#A6E6F5"}
                    strokeWidth={activeLayerId === "layer-4" ? 2.5 : 1}
                    filter={activeLayerId === "layer-4" ? "url(#activeGlow)" : undefined}
                  />
                  <path d="M 215 330 C 215 365 595 365 595 330 L 595 355 C 595 390 215 390 215 355 Z" fill="url(#cylinderSideGrad)" opacity="0.92" />
                  
                  {/* Clean Direct Glass Typography */}
                  <text x="275" y="352" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="Manrope, sans-serif" fontWeight="800">
                    Open API
                  </text>
                  <text x="275" y="366" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Manrope, sans-serif" fontWeight="600" opacity="0.9">
                    3.0 Schema
                  </text>

                  <text x="405" y="352" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="Manrope, sans-serif" fontWeight="800">
                    100% Microservices,
                  </text>
                  <text x="405" y="366" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Manrope, sans-serif" fontWeight="600" opacity="0.9">
                    and API First
                  </text>

                  <text x="530" y="352" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="Manrope, sans-serif" fontWeight="800">
                    Self-Enabled
                  </text>
                  <text x="530" y="366" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Manrope, sans-serif" fontWeight="600" opacity="0.9">
                    Tech Stack
                  </text>
                </motion.g>

                {/* ══ LAYER 3: Enterprise Data Core (Light Ice Cyan Cylinder) ══ */}
                <motion.g
                  onClick={() => setActiveLayerId("layer-3")}
                  animate={{
                    translateY: activeLayerId === "layer-3" ? -18 : 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="cursor-pointer group"
                >
                  <ellipse
                    cx="405" cy="270" rx="180" ry="38"
                    fill={activeLayerId === "layer-3" ? "url(#activeCylinderTopGrad)" : "url(#cylinderTopGrad)"}
                    stroke={activeLayerId === "layer-3" ? "#FFFFFF" : "#A6E6F5"}
                    strokeWidth={activeLayerId === "layer-3" ? 2.5 : 1}
                    filter={activeLayerId === "layer-3" ? "url(#activeGlow)" : undefined}
                  />
                  <path d="M 225 270 C 225 303 585 303 585 270 L 585 295 C 585 328 225 328 225 295 Z" fill="url(#cylinderSideGrad)" opacity="0.92" />
                  
                  {/* Clean Direct Glass Typography */}
                  <text x="270" y="290" textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontFamily="Manrope, sans-serif" fontWeight="800">
                    IOT Devices
                  </text>

                  <text x="360" y="290" textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontFamily="Manrope, sans-serif" fontWeight="800">
                    SAP ERP
                  </text>

                  <text x="450" y="290" textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontFamily="Manrope, sans-serif" fontWeight="800">
                    Oracle TMS
                  </text>

                  <text x="540" y="290" textAnchor="middle" fill="#FFFFFF" fontSize="11.5" fontFamily="Manrope, sans-serif" fontWeight="800">
                    CRM Mesh
                  </text>
                </motion.g>

                {/* ══ LAYER 2: Decision & Analytics Engine (Light Ice Cyan Cylinder) ══ */}
                <motion.g
                  onClick={() => setActiveLayerId("layer-2")}
                  animate={{
                    translateY: activeLayerId === "layer-2" ? -20 : 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="cursor-pointer group"
                >
                  <ellipse
                    cx="405" cy="210" rx="170" ry="36"
                    fill={activeLayerId === "layer-2" ? "url(#activeCylinderTopGrad)" : "url(#cylinderTopGrad)"}
                    stroke={activeLayerId === "layer-2" ? "#FFFFFF" : "#A6E6F5"}
                    strokeWidth={activeLayerId === "layer-2" ? 2.5 : 1}
                    filter={activeLayerId === "layer-2" ? "url(#activeGlow)" : undefined}
                  />
                  <path d="M 235 210 C 235 241 575 241 575 210 L 575 235 C 575 266 235 266 235 235 Z" fill="url(#cylinderSideGrad)" opacity="0.92" />
                  
                  {/* Clean Direct Glass Typography */}
                  <text x="275" y="226" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="Manrope, sans-serif" fontWeight="800">
                    Step Reasoning
                  </text>
                  <text x="275" y="238" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="Manrope, sans-serif" fontWeight="600" opacity="0.9">
                    Engine
                  </text>

                  <text x="360" y="226" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="Manrope, sans-serif" fontWeight="800">
                    Computer
                  </text>
                  <text x="360" y="238" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="Manrope, sans-serif" fontWeight="600" opacity="0.9">
                    Vision
                  </text>

                  <text x="445" y="226" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="Manrope, sans-serif" fontWeight="800">
                    Affinity
                  </text>
                  <text x="445" y="238" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="Manrope, sans-serif" fontWeight="600" opacity="0.9">
                    Analytics
                  </text>

                  <text x="530" y="226" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontFamily="Manrope, sans-serif" fontWeight="800">
                    Predictive
                  </text>
                  <text x="530" y="238" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="Manrope, sans-serif" fontWeight="600" opacity="0.9">
                    Analytics
                  </text>
                </motion.g>

                {/* ══ LAYER 1: Top 3D Cloud Dome with Red Glossy Spheres ══ */}
                <motion.g
                  onClick={() => setActiveLayerId("layer-1")}
                  animate={{
                    translateY: activeLayerId === "layer-1" ? -22 : 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="cursor-pointer group"
                >
                  {/* Top Cylinder Rim */}
                  <ellipse
                    cx="405" cy="150" rx="160" ry="34"
                    fill="url(#cylinderTopGrad)"
                    stroke={activeLayerId === "layer-1" ? "#FFFFFF" : "#A6E6F5"}
                    strokeWidth={activeLayerId === "layer-1" ? 2.5 : 1}
                  />

                  {/* Organic Puffy 3D Cloud Silhouette Dome */}
                  <path
                    d="M 245 150 C 225 132 220 102 245 80 C 265 62 300 60 325 76 C 350 44 415 38 455 62 C 485 40 545 50 565 80 C 595 100 590 134 575 150 Z"
                    fill="url(#cloudGrad)"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeOpacity="0.8"
                    filter={activeLayerId === "layer-1" ? "url(#activeGlow)" : undefined}
                  />

                  {/* 4 Floating 3D Red Spheres */}
                  <g transform="translate(275, 84)">
                    <text x="0" y="-8" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="Manrope, sans-serif" fontWeight="700">
                      Mobile Route
                    </text>
                    <circle cx="0" cy="14" r="14" fill="url(#redSphereGrad)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.2))" />
                    <ellipse cx="-4" cy="8" rx="5" ry="3" fill="#FFFFFF" opacity="0.6" />
                    <rect x="-4" y="9" width="8" height="11" rx="1.5" fill="#FFFFFF" />
                  </g>

                  <g transform="translate(350, 98)">
                    <circle cx="0" cy="14" r="14" fill="url(#redSphereGrad)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.2))" />
                    <ellipse cx="-4" cy="8" rx="5" ry="3" fill="#FFFFFF" opacity="0.6" />
                    <text x="0" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="900">$</text>
                    <text x="0" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="Manrope, sans-serif" fontWeight="700">
                      Rate AI
                    </text>
                  </g>

                  <g transform="translate(425, 78)">
                    <text x="0" y="-8" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="Manrope, sans-serif" fontWeight="700">
                      Fleet Vision
                    </text>
                    <circle cx="0" cy="14" r="14" fill="url(#redSphereGrad)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.2))" />
                    <ellipse cx="-4" cy="8" rx="5" ry="3" fill="#FFFFFF" opacity="0.6" />
                    <circle cx="0" cy="14" r="5" fill="none" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="0" cy="14" r="2" fill="#FFFFFF" />
                  </g>

                  <g transform="translate(505, 98)">
                    <circle cx="0" cy="14" r="14" fill="url(#redSphereGrad)" filter="drop-shadow(0 3px 4px rgba(0,0,0,0.2))" />
                    <ellipse cx="-4" cy="8" rx="5" ry="3" fill="#FFFFFF" opacity="0.6" />
                    <path d="M -4 14 L 4 14 M 1 11 L 4 14 L 1 17" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <text x="0" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontFamily="Manrope, sans-serif" fontWeight="700">
                      RMA Return
                    </text>
                  </g>
                </motion.g>

                {/* ══ LEFT SIDE INDICATOR POINTER TABS (Wide, Perfectly Formatted, Zero Clipping) ══ */}
                {LAYERS.map((layer, idx) => {
                  const isSelected = activeLayerId === layer.id;
                  const yPositions = [115, 218, 278, 338, 398];
                  const y = yPositions[idx];

                  return (
                    <g
                      key={layer.id + "-tab"}
                      onClick={() => setActiveLayerId(layer.id)}
                      className="cursor-pointer group"
                    >
                      {/* Connecting dotted guide line to cylinder */}
                      <line
                        x1="184"
                        y1={y}
                        x2="225"
                        y2={y}
                        stroke={isSelected ? "#2E5EFF" : "#CBD5E1"}
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />

                      {/* Wide Pointer Tag Bubble */}
                      <rect
                        x="12"
                        y={y - 14}
                        width="172"
                        height="28"
                        rx="6"
                        fill={isSelected ? "#2E5EFF" : "#FFFFFF"}
                        stroke={isSelected ? "#2E5EFF" : "#E2E8F0"}
                        strokeWidth="1.5"
                        filter="drop-shadow(0 2px 5px rgba(0,0,0,0.06))"
                      />
                      
                      {/* Arrow Icon */}
                      <polygon
                        points={`24,${y - 4} 30,${y} 24,${y + 4}`}
                        fill={isSelected ? "#FFFFFF" : "#FF6A3D"}
                      />
                      
                      {/* Tab Text */}
                      <text
                        x="36"
                        y={y + 4}
                        fill={isSelected ? "#FFFFFF" : "#14171F"}
                        fontSize="10"
                        fontFamily="Manrope, sans-serif"
                        fontWeight="700"
                      >
                        {layer.tabLabel}
                      </text>
                    </g>
                  );
                })}

                {/* ══ RED HOTSPOT BEACONS ══ */}
                {LAYERS.map((layer) => {
                  const isSelected = activeLayerId === layer.id;
                  const cx = (layer.hotspotPos.x / 100) * 680;
                  const cy = (layer.hotspotPos.y / 100) * 480;

                  return (
                    <g key={layer.id} onClick={() => setActiveLayerId(layer.id)} className="cursor-pointer">
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 13 : 8}
                        fill="#FF462D"
                        fillOpacity={isSelected ? 0.4 : 0.2}
                        className={isSelected ? "animate-ping" : ""}
                      />
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 7 : 5}
                        fill="#FF462D"
                        stroke="#FFFFFF"
                        strokeWidth="1.8"
                      />
                    </g>
                  );
                })}

              </svg>
            </motion.div>

            {/* Quick Layer Switch Segmented Control (Aligned Directly with 3D Cylinder Axis) */}
            <div className="flex items-center justify-center w-full mt-6">
              <div className="inline-flex items-center gap-1.5 rounded-2xl bg-white p-1.5 border border-[#E7E5DE] shadow-sm transform translate-x-0 sm:translate-x-12 md:translate-x-14">
                {LAYERS.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-mono font-bold transition-all ${
                      activeLayerId === layer.id
                        ? "bg-[#2E5EFF] text-white shadow-sm"
                        : "text-[#5B616E] hover:text-[#2E5EFF] hover:bg-[#EEF1FF]"
                    }`}
                  >
                    Layer {layer.layerIndex}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Active Layer Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Layer Title Bar */}
            <div className="border-b border-[#E7E5DE] pb-4">
              <span className="text-xs font-mono font-bold text-[#FF6A3D] uppercase tracking-wider block mb-1">
                {activeLayer.layerName}
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-[#14171F] font-display tracking-tight">
                {activeLayer.title}
              </h3>
              <p className="text-sm font-semibold text-[#5B616E] font-display mt-1">
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
                <p className="text-base text-[#5B616E] leading-relaxed font-body">
                  {activeLayer.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-[#14171F] uppercase tracking-wider">
                    KEY CAPABILITIES
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeLayer.bullets.map((b) => (
                      <div key={b} className="p-3.5 rounded-xl bg-white border border-[#E7E5DE] text-xs font-mono font-bold text-[#14171F] flex items-center gap-2.5 shadow-2xs">
                        <CheckCircle2 className="h-4 w-4 text-[#1FAA59] shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7E5DE] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#8B8F99]">100% Microservices &amp; API-First</span>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E5EFF] hover:underline"
                  >
                    Discuss this layer with engineering <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};

export default InteractivePlatformStack;
