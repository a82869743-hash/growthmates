import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Layers, ShieldCheck, Cpu, ArrowRight, Zap, RefreshCw, Database } from "lucide-react";

interface StackLayer {
  id: number;
  name: string;
  badge: string;
  color: string;
  borderColor: string;
  textColor: string;
  items: string[];
  description: string;
}

const STACK_LAYERS: StackLayer[] = [
  {
    id: 0,
    name: "Layer 1: Action & Execution Output",
    badge: "Autonomous Execution",
    color: "bg-accent",
    borderColor: "border-accent",
    textColor: "text-white",
    items: ["Autonomous Route Dispatch", "Freight Rate Quoting", "Automated RMA Refund", "Exception Alerts"],
    description: "Real-time decision execution across your logistics and retail operations without manual delays.",
  },
  {
    id: 1,
    name: "Layer 2: Specialized Agent Mesh",
    badge: "Multi-Agent Mesh",
    color: "bg-accent-dim",
    borderColor: "border-accent/40",
    textColor: "text-accent",
    items: ["Fleet Mgmt Agent", "Route Optimizer", "Freight Tracker", "Demand Forecaster", "Inventory AI"],
    description: "Domain-tuned AI agents operating collaboratively to solve complex operational challenges.",
  },
  {
    id: 2,
    name: "Layer 3: Decision Engine & Reasoning Core",
    badge: "LLM Reasoning Core",
    color: "bg-bg-surface",
    borderColor: "border-border-subtle",
    textColor: "text-fg-default",
    items: ["Multi-Model Orchestration", "Step-Based Reasoning", "Hybrid Rules Engine", "Audit Trail Log"],
    description: "Evaluates constraints, SLA requirements, and live signals to make optimal operational decisions.",
  },
  {
    id: 3,
    name: "Layer 4: MCP Gateway & API Integration",
    badge: "Model Context Protocol",
    color: "bg-bg-surface",
    borderColor: "border-border-subtle",
    textColor: "text-fg-default",
    items: ["MCP 1.0 Server", "Open API 3.0 Schema", "Real-Time Webhooks", "GPS & Telematics Feeds"],
    description: "Standardized tool & data interface connecting LLMs directly to your internal microservices.",
  },
  {
    id: 4,
    name: "Layer 5: Enterprise Systems & Infrastructure",
    badge: "Zero Rip-and-Replace",
    color: "bg-bg-muted",
    borderColor: "border-border-subtle",
    textColor: "text-fg-dim",
    items: ["SAP ERP", "Oracle TMS", "Xero / QuickBooks", "PostgreSQL / Snowflake", "Cloud Agnostic"],
    description: "Hooks seamlessly into your legacy databases and core infrastructure with zero downtime.",
  },
];

interface CalloutHotspot {
  id: string;
  title: string;
  badge: string;
  targetLayer: number;
  description: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const CALLOUTS: CalloutHotspot[] = [
  {
    id: "relentless-innovation",
    title: "Autonomous Decision Intelligence",
    badge: "Real-Time Reasoning",
    targetLayer: 1,
    description:
      "GrowthMates AI adapts to high-velocity operational changes. Agents reason over live signals instead of rigid rules, continuously optimizing fleet routes, freight quotes, and inventory reorders.",
    position: "top-left",
  },
  {
    id: "maximize-investments",
    title: "Maximize Existing Investments",
    badge: "Zero Rip-and-Replace",
    targetLayer: 4,
    description:
      "Eliminate the need for expensive system overhauls. Our Model Context Protocol (MCP) server hooks directly into your existing SAP, Oracle, Xero, and TMS infrastructure within days.",
    position: "top-right",
  },
  {
    id: "modular-commerce",
    title: "Modular Agent Mesh",
    badge: "Plug & Play Agents",
    targetLayer: 0,
    description:
      "Deploy specialized agents independently or chain them together. From fleet maintenance to RMA fraud detection, each agent operates with complete audit logging and human-in-the-loop control.",
    position: "bottom-left",
  },
  {
    id: "unmatched-unification",
    title: "Unmatched Unification & Security",
    badge: "Enterprise SOC2 Ready",
    targetLayer: 3,
    description:
      "Bridge fragmented silos across transportation and retail workflows. Built with SAML SSO, encrypted vector memory, and fine-grained role permissions for high-consequence enterprise environments.",
    position: "bottom-right",
  },
];

const InteractivePlatformStack = () => {
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [activeCallout, setActiveCallout] = useState<string>("relentless-innovation");

  const currentLayer = STACK_LAYERS[activeLayer];

  return (
    <section className="bg-bg-base py-20 md:py-32 border-b border-border-subtle overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-dim px-3.5 py-1 text-xs font-semibold text-accent mb-3">
            <Cpu className="h-3.5 w-3.5" /> Interactive Architecture Map
          </span>
          <h2 className="text-3xl font-extrabold text-fg-default sm:text-5xl font-display tracking-tight leading-tight">
            The GrowthMates AI Decision Engine
          </h2>
          <p className="mt-3 text-base text-fg-dim max-w-xl mx-auto">
            Click any hotspot or callout below to inspect how our 5-tier architecture unifies legacy infrastructure with autonomous AI agents.
          </p>
        </div>

        {/* Main Interactive Showcase Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Grid Layout: Top Callouts / Center Stack / Bottom Callouts */}
          <div className="grid gap-8 lg:grid-cols-12 items-center">

            {/* Left Column: Top-Left & Bottom-Left Callout Cards (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {CALLOUTS.filter((c) => c.position.includes("left")).map((callout) => {
                const isActive = activeCallout === callout.id;

                return (
                  <motion.div
                    key={callout.id}
                    onClick={() => {
                      setActiveCallout(callout.id);
                      setActiveLayer(callout.targetLayer);
                    }}
                    whileHover={{ scale: 1.02 }}
                    className={`cursor-pointer rounded-lg border p-6 transition-all duration-200 ${
                      isActive
                        ? "bg-bg-surface border-accent shadow-raised"
                        : "bg-bg-surface/60 border-border-subtle hover:border-fg-dimmer/40 shadow-flat"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3 border-b border-border-subtle pb-2">
                      <span className="text-[11px] font-mono font-bold uppercase text-accent">
                        {callout.badge}
                      </span>
                      <span
                        className={`h-3 w-3 rounded-full ${
                          isActive ? "bg-signal-warm animate-ping" : "bg-border-subtle"
                        }`}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-fg-default font-display border-b border-accent/20 pb-1 mb-2">
                      {callout.title}
                    </h3>
                    <p className="text-xs text-fg-dim leading-relaxed">
                      {callout.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Center Column: 3D Stack Graphic with Hotspot Dots (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative my-6 lg:my-0">
              {/* Stack Graphic Box */}
              <div className="w-full max-w-sm space-y-2.5 relative">
                {STACK_LAYERS.map((layer) => {
                  const isSelected = activeLayer === layer.id;

                  return (
                    <motion.div
                      key={layer.id}
                      onClick={() => {
                        setActiveLayer(layer.id);
                        const matchedCallout = CALLOUTS.find((c) => c.targetLayer === layer.id);
                        if (matchedCallout) setActiveCallout(matchedCallout.id);
                      }}
                      whileHover={{ scale: 1.03 }}
                      className={`relative cursor-pointer rounded-md border p-4 transition-all duration-200 ${
                        isSelected
                          ? "bg-accent text-white border-accent shadow-floating z-20 scale-[1.04]"
                          : `${layer.color} ${layer.borderColor} ${layer.textColor} shadow-flat hover:border-accent/60 z-10`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-display uppercase tracking-wide">
                          {layer.name}
                        </span>
                        {isSelected && (
                          <span className="h-2 w-2 rounded-full bg-signal-warm animate-pulse" />
                        )}
                      </div>

                      {/* Item chips inside layer */}
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {layer.items.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              isSelected
                                ? "bg-white/20 text-white font-semibold"
                                : "bg-bg-base/70 text-fg-dim border border-border-subtle"
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Hotspot Pin Dot */}
                      <div
                        className={`absolute -right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded-full border-2 bg-white shadow-raised transition-transform ${
                          isSelected ? "border-signal-warm scale-125 z-30" : "border-accent opacity-60"
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            isSelected ? "bg-signal-warm animate-pulse" : "bg-accent"
                          }`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Top-Right & Bottom-Right Callout Cards (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {CALLOUTS.filter((c) => c.position.includes("right")).map((callout) => {
                const isActive = activeCallout === callout.id;

                return (
                  <motion.div
                    key={callout.id}
                    onClick={() => {
                      setActiveCallout(callout.id);
                      setActiveLayer(callout.targetLayer);
                    }}
                    whileHover={{ scale: 1.02 }}
                    className={`cursor-pointer rounded-lg border p-6 transition-all duration-200 ${
                      isActive
                        ? "bg-bg-surface border-accent shadow-raised"
                        : "bg-bg-surface/60 border-border-subtle hover:border-fg-dimmer/40 shadow-flat"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3 border-b border-border-subtle pb-2">
                      <span className="text-[11px] font-mono font-bold uppercase text-accent">
                        {callout.badge}
                      </span>
                      <span
                        className={`h-3 w-3 rounded-full ${
                          isActive ? "bg-signal-warm animate-ping" : "bg-border-subtle"
                        }`}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-fg-default font-display border-b border-accent/20 pb-1 mb-2">
                      {callout.title}
                    </h3>
                    <p className="text-xs text-fg-dim leading-relaxed">
                      {callout.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Active Layer Inspector Drawer / Detail Box */}
          <div className="mt-12 max-w-4xl mx-auto rounded-lg bg-bg-surface border border-accent/30 p-6 shadow-raised">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase text-accent">
                  SELECTED ARCHITECTURE TIER:
                </span>
                <span className="text-sm font-extrabold text-fg-default font-display">
                  {currentLayer.name}
                </span>
              </div>
              <span className="rounded-full bg-accent-dim px-3 py-0.5 text-xs font-bold text-accent">
                {currentLayer.badge}
              </span>
            </div>

            <p className="text-xs text-fg-dim mb-4 leading-relaxed">
              {currentLayer.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentLayer.items.map((item) => (
                <div
                  key={item}
                  className="p-2.5 rounded bg-bg-base border border-border-subtle text-xs font-mono font-semibold text-fg-default text-center"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractivePlatformStack;
