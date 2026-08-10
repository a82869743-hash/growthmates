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
    items: ["External System APIs", "Internal ERP / TMS", "Tool Integration Hub"],
    desc: "Model Context Protocol gateway connectors",
  },
  {
    id: "security",
    title: "4. Security Layer",
    icon: Shield,
    items: ["SSO / SAML 2.0 Auth", "Data Encryption at Rest", "Immutable Audit Logging"],
    desc: "Enterprise compliance & zero-trust boundary",
  },
  {
    id: "knowledge-memory",
    title: "5. Knowledge & Memory",
    icon: Database,
    items: ["Vector DB RAG Context", "Context-Aware Memory", "Continuous Learning"],
    desc: "Long-term episodic & semantic memory store",
  },
];

const SystemTrace = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const pathLength = line.getTotalLength();

    // Prepare line for stroke-dashoffset animation
    gsap.set(line, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Prepare cards for fade-in animation
    gsap.set(cardsRef.current, {
      opacity: 0,
      y: 15,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          once: true,
        },
      });

      // Animate line draw left-to-right
      tl.to(line, {
        strokeDashoffset: 0,
        duration: 2.4,
        ease: "power2.inOut",
      });

      // Animate each node lighting up and its label/card fading in as line reaches it
      nodesRef.current.forEach((node, i) => {
        const card = cardsRef.current[i];
        const stepTime = i * 0.48;

        if (node) {
          tl.to(
            node,
            {
              backgroundColor: "#2E5EFF",
              borderColor: "#2E5EFF",
              color: "#FFFFFF",
              scale: 1.1,
              duration: 0.35,
              ease: "back.out(1.7)",
            },
            stepTime
          );
        }

        if (card) {
          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power2.out",
            },
            stepTime + 0.1
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="architecture"
      className="bg-bg-surface py-20 md:py-28 border-b border-border-subtle overflow-hidden text-fg-default font-body"
    >
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block rounded-full bg-accent-dim px-3.5 py-1 text-xs font-semibold text-accent mb-3 font-mono">
            System Trace
          </span>
          <h2 className="text-3xl font-extrabold text-fg-default sm:text-5xl font-display tracking-tight">
            System Trace Architecture
          </h2>
          <p className="mt-3 text-base text-fg-dim leading-relaxed">
            Watch operational requests flow left-to-right through GrowthMates' 5-layer platform stack in sequence: Orchestration &rarr; Agent Framework &rarr; MCP Layer &rarr; Security &rarr; Knowledge/Memory.
          </p>
        </div>

        {/* Horizontal Sequence Diagram */}
        <div className="relative mt-12 max-w-5xl mx-auto">
          {/* Connecting Line (SVG Path - Desktop) */}
          <svg
            className="absolute top-8 left-0 w-full h-8 hidden md:block z-0 pointer-events-none"
            preserveAspectRatio="none"
            viewBox="0 0 1000 20"
          >
            {/* Background track line */}
            <path
              d="M 50 10 L 950 10"
              stroke="#E7E5DE"
              strokeWidth="3"
              fill="none"
            />
            {/* Animated drawing line */}
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
                  {/* Node Circle Pin */}
                  <div
                    ref={(el) => (nodesRef.current[idx] = el)}
                    className="h-16 w-16 rounded-full border-2 border-border-subtle bg-bg-base text-fg-dim flex items-center justify-center transition-all duration-300 shadow-flat mb-4"
                  >
                    <IconComponent className="h-7 w-7" />
                  </div>

                  {/* Fading Label Card Box */}
                  <div
                    ref={(el) => (cardsRef.current[idx] = el)}
                    className="w-full rounded-md border border-border-subtle bg-bg-base p-4 text-left shadow-flat transition-shadow group-hover:shadow-raised h-full"
                  >
                    <h3 className="text-xs font-bold text-fg-default font-display mb-1">
                      {layer.title}
                    </h3>
                    <p className="text-[11px] text-fg-dim leading-snug mb-3 border-b border-border-subtle pb-2">
                      {layer.desc}
                    </p>
                    <ul className="space-y-1 text-[10px] text-fg-dim font-mono">
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
