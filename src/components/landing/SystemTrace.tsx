import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Blocks, Server, Shield, Database } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  {
    id: "orchestration",
    title: "1. Orchestration Layer",
    icon: Brain,
    items: ["Workflow Automation", "LLM Agnostic Engine", "Hybrid Decision Logic"],
    desc: "Central processing core routing agent intent",
  },
  {
    id: "agent-framework",
    title: "2. Agent Framework",
    icon: Blocks,
    items: ["Modular Agents", "Customizable Workflows", "Domain Intelligence"],
    desc: "Specialized multi-agent execution mesh",
  },
  {
    id: "mcp-layer",
    title: "3. MCP Integration Layer",
    icon: Server,
    items: ["External System APIs", "Internal ERP/TMS", "Tool Integration Hub"],
    desc: "Model Context Protocol gateway connectors",
  },
  {
    id: "security",
    title: "4. Security & Governance",
    icon: Shield,
    items: ["SSO / SAML 2.0 Auth", "Data Encryption at Rest", "Immutable Audit Logging"],
    desc: "Enterprise compliance & zero-trust boundary",
  },
  {
    id: "knowledge-memory",
    title: "5. Knowledge & Memory",
    icon: Database,
    items: ["Vector DB RAG Context", "Context-Aware Memory", "Continuous Learning"],
    desc: "Long-term episodic & semantic memory vector store",
  },
];

const SystemTrace = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const pathLength = line.getTotalLength();

    // Prepare path for stroke animation
    gsap.set(line, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          once: true,
        },
      });

      // Animate line draw
      tl.to(line, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: "power2.inOut",
      });

      // Animate nodes lighting up in sequence along timeline
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        tl.to(
          node,
          {
            backgroundColor: "#2E5EFF",
            borderColor: "#2E5EFF",
            color: "#FFFFFF",
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          i * 0.45
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="architecture"
      className="bg-bg-surface py-20 md:py-28 overflow-hidden"
    >
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block rounded-full bg-accent-dim px-3.5 py-1 text-xs font-semibold text-accent mb-3">
            System Sequence Trace
          </span>
          <h2 className="text-3xl font-extrabold text-fg-default sm:text-5xl font-display tracking-tight">
            End-to-End System Architecture Trace
          </h2>
          <p className="mt-3 text-base text-fg-dim">
            Watch operational data flow through GrowthMates' 5-layer modular stack in real time as requests are parsed, reasoned, and executed.
          </p>
        </div>

        {/* Trace Visual Sequence */}
        <div className="relative mt-12 max-w-5xl mx-auto">
          {/* Connecting SVG Path (Desktop) */}
          <svg
            className="absolute top-8 left-0 w-full h-8 hidden md:block z-0 pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 1000 20"
          >
            <path
              d="M 50 10 L 950 10"
              stroke="#E7E5DE"
              strokeWidth="3"
              fill="none"
            />
            <path
              ref={lineRef}
              d="M 50 10 L 950 10"
              stroke="#2E5EFF"
              strokeWidth="3"
              fill="none"
            />
          </svg>

          {/* 5 Nodes Horizontal Layout */}
          <div className="grid gap-6 md:grid-cols-5 relative z-10">
            {LAYERS.map((layer, idx) => {
              const IconComponent = layer.icon;

              return (
                <div key={layer.id} className="flex flex-col items-center text-center group">
                  {/* Node Circle */}
                  <div
                    ref={(el) => (nodesRef.current[idx] = el)}
                    className="h-16 w-16 rounded-full border-2 border-border-subtle bg-bg-base text-fg-dim flex items-center justify-center transition-all duration-300 shadow-flat mb-4"
                  >
                    <IconComponent className="h-7 w-7" />
                  </div>

                  {/* Layer Card Box */}
                  <div className="w-full rounded-md border border-border-subtle bg-bg-base p-4 text-left shadow-flat transition-shadow group-hover:shadow-raised h-full">
                    <h3 className="text-sm font-bold text-fg-default font-display mb-1">
                      {layer.title}
                    </h3>
                    <p className="text-[11px] text-fg-dim leading-snug mb-3 border-b border-border-subtle pb-2">
                      {layer.desc}
                    </p>
                    <ul className="space-y-1.5 text-[11px] text-fg-dim">
                      {layer.items.map((item) => (
                        <li key={item} className="flex items-center gap-1.5">
                          <span className="h-1 w-1 rounded-full bg-accent shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemTrace;
