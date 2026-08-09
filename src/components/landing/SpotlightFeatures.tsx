import { motion } from "framer-motion";
import { CheckCircle2, Cpu, Shield, Zap, Layers, Link2, BarChart2 } from "lucide-react";

interface Feature {
  id: string;
  title: string;
  badge: string;
  description: string;
  bullets: string[];
  visualType: "nodes" | "stat" | "timeline" | "security" | "integrations" | "architecture";
}

const FEATURES: Feature[] = [
  {
    id: "rapid-deployment",
    badge: "Speed to Value",
    title: "Rapid No-Code Agent Deployment",
    description:
      "Launch specialized AI agents in days, not months. Configure step-based decision logic and prompt chains without touching backend infrastructure.",
    bullets: [
      "Step-based configuration editor",
      "Instant sandbox testing and prompt simulation",
      "One-click deployment to enterprise production",
    ],
    visualType: "timeline",
  },
  {
    id: "modular-framework",
    badge: "Modular Architecture",
    title: "Modular Agent Framework",
    description:
      "Deploy specialized agents for freight tracking, rate quoting, driver scheduling, or inventory intelligence — wired together cleanly to execute multi-step goals.",
    bullets: [
      "Composable multi-agent orchestrator",
      "Domain-tuned decision prompts",
      "Autonomous exception handling",
    ],
    visualType: "nodes",
  },
  {
    id: "seamless-integrations",
    badge: "Universal Connectivity",
    title: "Seamless API & System Integrations",
    description:
      "Connect effortlessly with ERP, TMS, CRM, mapping providers, and LLM providers via our Model Context Protocol (MCP) server & secure API gateway.",
    bullets: [
      "Built-in MCP server protocol support",
      "Bidirectional sync with SAP, Oracle, and Salesforce",
      "Real-time webhook and event bus triggers",
    ],
    visualType: "integrations",
  },
  {
    id: "security-compliance",
    badge: "Enterprise Security",
    title: "Enterprise-Grade Security & Governance",
    description:
      "Keep operational data protected with SSO/SAML 2.0 authentication, granular role-based access control, end-to-end data encryption, and full audit logs.",
    bullets: [
      "SOC2 compliant data architecture",
      "Complete operational audit trail logging",
      "Privacy-by-design vector memory isolation",
    ],
    visualType: "security",
  },
  {
    id: "measurable-roi",
    badge: "Business Impact",
    title: "Measurable ROI & Performance Analytics",
    description:
      "Track operational savings and execution accuracy in real time with built-in analytics dashboards and continuous human-in-the-loop feedback.",
    bullets: [
      "Real-time cost savings & hour tracking",
      "Human-in-the-loop accuracy scoring",
      "Executive summary performance export",
    ],
    visualType: "stat",
  },
];

const FeatureVisual = ({ type }: { type: Feature["visualType"] }) => {
  if (type === "nodes") {
    return (
      <div className="rounded-lg bg-bg-surface border border-border-subtle p-8 shadow-raised w-full max-w-md mx-auto">
        <div className="text-xs font-mono text-fg-dim border-b border-border-subtle pb-3 mb-6 flex justify-between">
          <span>ORCHESTRATOR NODE</span>
          <span className="text-accent font-semibold">Active Mesh</span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-center p-3 rounded-md bg-accent text-white font-mono text-sm font-semibold shadow-flat">
            Dispatch Master Agent
          </div>
          <div className="flex justify-center">
            <div className="h-6 w-0.5 bg-accent/40" />
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
            <div className="p-2.5 rounded-md bg-bg-muted border border-border-subtle text-fg-default font-medium">
              Route AI
            </div>
            <div className="p-2.5 rounded-md bg-accent-dim text-accent border border-accent/20 font-semibold">
              Rate AI
            </div>
            <div className="p-2.5 rounded-md bg-bg-muted border border-border-subtle text-fg-default font-medium">
              Fuel AI
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "stat") {
    return (
      <div className="rounded-lg bg-bg-surface border border-border-subtle p-8 shadow-raised w-full max-w-md mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-signal-warm-dim px-3 py-1 text-xs font-semibold text-signal-warm">
          REAL-TIME OUTCOME
        </div>
        <div className="text-5xl font-extrabold text-fg-default font-display tracking-tight">
          $1.2M+
        </div>
        <p className="text-sm font-medium text-fg-dim">
          Annual operational savings verified across enterprise fleet deployments
        </p>
        <div className="pt-4 border-t border-border-subtle flex justify-around text-xs font-mono text-fg-dim">
          <div>
            <span className="block text-fg-default font-bold text-base">94%</span>
            Auto-Processed
          </div>
          <div className="w-px bg-border-subtle" />
          <div>
            <span className="block text-fg-default font-bold text-base">4.2x</span>
            Speed Increase
          </div>
        </div>
      </div>
    );
  }

  if (type === "timeline") {
    return (
      <div className="rounded-lg bg-bg-surface border border-border-subtle p-6 shadow-raised w-full max-w-md mx-auto space-y-3 font-sans">
        <div className="text-xs font-mono text-fg-dim uppercase tracking-wider mb-4 border-b border-border-subtle pb-2">
          Deployment Lifecycle (Day 1 - Day 3)
        </div>
        {[
          { day: "Day 1", title: "Select Pre-Built Template", status: "Done" },
          { day: "Day 2", title: "Connect MCP Data Connectors", status: "Done" },
          { day: "Day 3", title: "Go Live in Production", status: "Active" },
        ].map((item, idx) => (
          <div
            key={item.day}
            className={`flex items-center justify-between p-3 rounded-md text-xs border ${
              item.status === "Active"
                ? "bg-accent-dim border-accent/40 font-semibold text-fg-default"
                : "bg-bg-base border-border-subtle text-fg-dim"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-accent font-bold">{item.day}</span>
              <span>{item.title}</span>
            </div>
            <CheckCircle2
              className={`h-4 w-4 ${
                item.status === "Active" ? "text-accent" : "text-fg-dimmer"
              }`}
            />
          </div>
        ))}
      </div>
    );
  }

  if (type === "security") {
    return (
      <div className="rounded-lg bg-bg-surface border border-border-subtle p-8 shadow-raised w-full max-w-md mx-auto space-y-4">
        <div className="flex items-center gap-3 text-fg-default border-b border-border-subtle pb-4">
          <Shield className="h-6 w-6 text-accent" />
          <div>
            <h4 className="font-semibold text-sm font-display">Zero-Trust Agent Runtime</h4>
            <p className="text-xs text-fg-dim">Isolated execution & encrypted memory</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-md bg-bg-base border border-border-subtle">
            <span className="text-fg-dimmer block text-[10px] uppercase font-mono">AUTH</span>
            <span className="font-semibold text-fg-default">SAML 2.0 / SSO</span>
          </div>
          <div className="p-3 rounded-md bg-bg-base border border-border-subtle">
            <span className="text-fg-dimmer block text-[10px] uppercase font-mono">AUDIT</span>
            <span className="font-semibold text-fg-default">Immutable Logs</span>
          </div>
          <div className="p-3 rounded-md bg-bg-base border border-border-subtle">
            <span className="text-fg-dimmer block text-[10px] uppercase font-mono">ENCRYPTION</span>
            <span className="font-semibold text-fg-default">AES-256 Bit</span>
          </div>
          <div className="p-3 rounded-md bg-bg-base border border-border-subtle">
            <span className="text-fg-dimmer block text-[10px] uppercase font-mono">COMPLIANCE</span>
            <span className="font-semibold text-fg-default">SOC2 Ready</span>
          </div>
        </div>
      </div>
    );
  }

  // Integrations
  return (
    <div className="rounded-lg bg-bg-surface border border-border-subtle p-8 shadow-raised w-full max-w-md mx-auto font-mono text-xs space-y-3">
      <div className="flex items-center justify-between text-fg-dim border-b border-border-subtle pb-3">
        <span>MCP GATEWAY</span>
        <span className="text-accent">CONNECTED</span>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2">
        {["SAP ERP", "Oracle TMS", "Salesforce", "Google Maps", "OpenAI", "PostgreSQL"].map((sys) => (
          <div
            key={sys}
            className="p-3 rounded-md bg-bg-base border border-border-subtle flex items-center justify-between"
          >
            <span className="text-fg-default font-medium">{sys}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
        ))}
      </div>
    </div>
  );
};

const SpotlightFeatures = () => {
  return (
    <section className="border-b border-border-subtle">
      {FEATURES.map((feature, idx) => {
        const isEven = idx % 2 === 0;
        const bgClass = isEven ? "bg-bg-base" : "bg-bg-muted";

        return (
          <div key={feature.id} className={`${bgClass} py-16 md:py-24 border-b border-border-subtle last:border-b-0`}>
            <div className="container">
              <div
                className={`grid items-center gap-12 lg:grid-cols-12 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Text Content Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <span className="inline-block rounded-full bg-accent-dim px-3.5 py-1 text-xs font-semibold text-accent mb-4">
                    {feature.badge}
                  </span>

                  <h2 className="text-3xl font-extrabold text-fg-default sm:text-4xl leading-tight font-display">
                    {feature.title}
                  </h2>

                  <p className="mt-4 text-base text-fg-dim leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-3 text-sm text-fg-default">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Visual Column */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
                  <FeatureVisual type={feature.visualType} />
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
