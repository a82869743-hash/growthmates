import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Cpu, CheckCircle2, ArrowRight, Terminal, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TechNode {
  id: string;
  code: string;
  title: string;
  badge: string;
  badgeColor: string;
  date: string;
  shipTime: string;
  timeBoxLabel: string;
  timeBoxValue: string;
  desc: string;
  details: string[];
}

const leftNodes: TechNode[] = [
  {
    id: "sap",
    code: "SAP-S4HANA",
    title: "SAP S/4HANA ERP Database Sync",
    badge: "ERP gRPC",
    badgeColor: "bg-accent-tint text-accent-deep",
    date: "Apr 2026",
    shipTime: "4 days to ship",
    timeBoxLabel: "TIME TO SYNC",
    timeBoxValue: "< 50 ms",
    desc: "Bi-directional event stream connecting SAP material ledgers and inventory quantities.",
    details: ["IDoc event wrapper", "OData v4 RESTlet gateway", "Zero data drift architecture"],
  },
  {
    id: "tms",
    code: "TMS-TRUCKMATE",
    title: "TruckMate Dispatch Telematics",
    badge: "OCR TMS",
    badgeColor: "bg-accent-tint text-accent-deep",
    date: "Jan 2026",
    shipTime: "3 days to ship",
    timeBoxLabel: "TIME TO PARSE",
    timeBoxValue: "1.2 sec",
    desc: "Multimodal LLM vision parser extracting unstructured paper bills-of-lading.",
    details: ["McLeod & TMW connectors", "Driver GPS geofence", "Automated load assignment"],
  },
  {
    id: "iot",
    code: "IOT-MQTT",
    title: "Industrial MES Sensor Telemetry",
    badge: "MQTT IoT",
    badgeColor: "bg-amber-100 text-amber-800",
    date: "Aug 2025",
    shipTime: "7 days to ship",
    timeBoxLabel: "TIME TO CAUSE",
    timeBoxValue: "7 min",
    desc: "OPC-UA and MQTT telemetry stream predicting CNC bearing failure in advance.",
    details: ["PyTorch early-warning ML model", "ClickHouse OLAP time-series store", "Automated work-order dispatch"],
  },
  {
    id: "fin",
    code: "FIN-LEDGER",
    title: "High-Frequency Core Wire Ledger",
    badge: "HSM VAULT",
    badgeColor: "bg-blue-100 text-blue-800",
    date: "Nov 2025",
    shipTime: "2 days to ship",
    timeBoxLabel: "TIME TO RECON",
    timeBoxValue: "< 12 ms",
    desc: "Distributed double-entry wire ledger with in-memory graph fraud detection.",
    details: ["ACID compliance guarantee", "SWIFT/Fedwire match engine", "SOC2 HSM encryption"],
  },
];

export const TechStackExplorer = () => {
  const [activeNode, setActiveNode] = useState<TechNode>(leftNodes[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  // GSAP ScrollTrigger Entrance & Laser Paths
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Animation
      if (diagramRef.current) {
        gsap.fromTo(
          diagramRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: diagramRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. Continuous Dash Flow for Bezier Curves
      pathRefs.current.forEach((path) => {
        if (path) {
          gsap.to(path, {
            strokeDashoffset: -20,
            duration: 1.2,
            repeat: -1,
            ease: "none",
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-bg-base overflow-hidden selection:bg-accent-tint selection:text-accent-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-left max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent-tint text-accent-deep border border-accent/25 text-xs font-mono font-bold uppercase tracking-wider shadow-flat">
            <Cpu className="w-4 h-4 text-accent" />
            <span>MULTI-SYSTEM ARCHITECTURE CONVERGENCE</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-fg-default tracking-tight leading-tight">
            Supported Enterprise <span className="text-accent">Tech Stack &amp; Convergence</span>
          </h2>

          <p className="text-base sm:text-lg text-fg-dim font-body leading-relaxed">
            See how legacy ERPs, TMS telematics, IoT sensors, and financial ledgers converge into one unified D-BST architecture truth.
          </p>
        </div>

        {/* Spread-Style Bezier Flow Convergence Diagram Grid */}
        <div ref={diagramRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left font-mono">
          
          {/* LEFT STACK: 4 Systems Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-bold text-fg-dimmer uppercase tracking-wider mb-2">
              CONNECTED ENTERPRISE SYSTEMS
            </div>

            {leftNodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer shadow-flat ${
                    isSelected
                      ? "bg-white border-accent shadow-floating ring-2 ring-accent/20 scale-[1.02]"
                      : "bg-white/80 border-border-subtle hover:border-accent/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-accent flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-accent" /> {node.code}
                    </span>
                    <span className="text-fg-dimmer font-normal">{node.date}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-fg-default tracking-tight">
                    {node.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs pt-3 mt-3 border-t border-border-subtle/60">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${node.badgeColor}`}>
                      {node.badge}
                    </span>
                    <span className="text-fg-dim font-bold">{node.shipTime}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTER: SVG BEZIER FLOW CURVES */}
          <div className="hidden lg:block lg:col-span-1 relative h-[480px] w-full flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 480" fill="none">
              {/* 4 Curved Bezier Connecting Lines */}
              {[60, 180, 300, 420].map((yStart, idx) => (
                <path
                  key={idx}
                  ref={(el) => (pathRefs.current[idx] = el)}
                  d={`M 0 ${yStart} C 60 ${yStart}, 40 240, 100 240`}
                  stroke="#E8622E"
                  strokeWidth={activeNode.id === leftNodes[idx].id ? "2.5" : "1.5"}
                  strokeDasharray="6 4"
                  opacity={activeNode.id === leftNodes[idx].id ? "1" : "0.3"}
                />
              ))}
            </svg>
            <span className="absolute top-2 left-0 text-[9px] font-mono text-accent font-bold uppercase tracking-widest whitespace-nowrap bg-accent-tint px-2 py-0.5 rounded-full border border-accent/20">
              CONVERGENCE &rarr;
            </span>
          </div>

          {/* RIGHT: MAIN D-BST CORE CONVERGENCE FOCAL CARD */}
          <div className="lg:col-span-5 bg-white border-2 border-accent rounded-3xl p-8 sm:p-10 shadow-floating space-y-8 relative overflow-hidden">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-border-subtle pb-3">
                <span className="font-bold text-accent uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent" /> D-BST CORE ONTOLOGY ENGINE
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-accent text-white font-bold text-[10px]">
                  {activeNode.date}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-accent">
                  ACTIVE TARGET: [{activeNode.code}]
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-fg-default tracking-tight leading-tight">
                  {activeNode.title}
                </h3>
                <p className="text-sm text-fg-dim font-body leading-relaxed pt-1">
                  {activeNode.desc}
                </p>
              </div>

              {/* Big Metric Box (Spread Style: Time to Cause / Time to Sync) */}
              <div className="p-6 bg-[#FFF5F0] border border-accent/30 rounded-2xl space-y-2 text-center shadow-flat">
                <div className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                  {activeNode.timeBoxLabel}
                </div>
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-accent tracking-tight">
                  {activeNode.timeBoxValue}
                </div>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-2 pt-2">
                <div className="text-[10px] font-mono font-bold text-fg-dimmer uppercase tracking-wider">
                  VERIFIED DEPLOYMENT CAPABILITIES
                </div>
                <div className="space-y-2">
                  {activeNode.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-body text-fg-default">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
              <span className="px-3 py-1 rounded-full bg-accent text-white font-bold text-[10px] uppercase tracking-wider">
                RECOMMENDED ARCHITECTURE
              </span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-bold text-xs uppercase tracking-wider hover:bg-accent-deep transition-all shadow-flat"
              >
                <span>REQUEST SPECS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
