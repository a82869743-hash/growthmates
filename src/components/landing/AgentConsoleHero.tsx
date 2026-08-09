import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AGENT_TASKS = [
  { action: "Optimizing route for 12 stops", details: "Traffic cleared · ETA updated to 14:15", status: "Completed in 1.2s", badge: "Route AI" },
  { action: "Freight rate quoted: $2,340", details: "Lanes: MEL → SYD · Margin +18%", status: "Quoted Live", badge: "Rate Engine" },
  { action: "Inventory reorder triggered", details: "SKU #8841-B · Reorder qty: 450 units", status: "Supplier Synced", badge: "Inventory AI" },
  { action: "HOS compliance audit verified", details: "24 drivers checked · 0 violations", status: "Audit Logged", badge: "Compliance AI" },
];

const AgentConsoleHero = () => {
  const [taskIndex, setTaskIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentFullText = AGENT_TASKS[taskIndex].action;

    if (isTyping) {
      if (displayText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 40);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2500);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayText("");
        setIsTyping(true);
        setTaskIndex((prev) => (prev + 1) % AGENT_TASKS.length);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, taskIndex]);

  const activeTask = AGENT_TASKS[taskIndex];

  return (
    <section className="relative bg-bg-base py-16 md:py-24 lg:py-32 overflow-hidden border-b border-border-subtle">
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column (40% width ~ 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-dim px-3.5 py-1.5 text-xs font-semibold text-accent mb-6">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Enterprise Agentic AI Platform
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-fg-default sm:text-5xl lg:text-6xl leading-[1.08] font-display">
              Build Smarter. Scale Faster.{" "}
              <span className="text-accent">Powered by Agentic AI.</span>
            </h1>

            <p className="mt-6 text-base text-fg-dim leading-relaxed sm:text-lg">
              The enterprise platform that empowers organizations to build custom AI agents,
              automate intelligent workflows, and unlock data-driven growth with complete security and control.
            </p>

            {/* CTAs - Cut down to 2 max */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() =>
                  (window as any).Calendly?.initPopupWidget({
                    url: "https://calendly.com/d-bstsolutions/book-your-free-consultation",
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-white transition-opacity hover:opacity-95 shadow-raised"
              >
                Book a Demo <ArrowUpRight className="h-4 w-4" />
              </button>

              <a
                href="#usecases"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-transparent px-6 py-3.5 text-base font-semibold text-fg-default hover:text-accent transition-colors"
              >
                Explore Use Cases <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Quick stats inline below CTAs */}
            <div className="mt-12 flex items-center gap-8 border-t border-border-subtle pt-6">
              <div>
                <p className="text-2xl font-bold text-fg-default font-display">85%</p>
                <p className="text-xs text-fg-dim">Cost Reduction</p>
              </div>
              <div className="h-8 w-px bg-border-subtle" />
              <div>
                <p className="text-2xl font-bold text-fg-default font-display">92%</p>
                <p className="text-xs text-fg-dim">Efficiency Gain</p>
              </div>
              <div className="h-8 w-px bg-border-subtle" />
              <div>
                <p className="text-2xl font-bold text-fg-default font-display">98%</p>
                <p className="text-xs text-fg-dim">Accuracy Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Live Floating Console Panel (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:col-span-7"
          >
            {/* Subtle dot grid behind console only */}
            <div
              className="absolute -inset-6 opacity-[0.03] rounded-3xl pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#14171F 1px, transparent 1px)`,
                backgroundSize: "16px 16px",
              }}
            />

            <div className="relative rounded-lg bg-bg-surface border border-border-subtle p-6 md:p-8 shadow-floating">
              {/* Console Header Bar */}
              <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                    <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  </div>
                  <span className="text-xs font-mono text-fg-dim uppercase tracking-wider pl-2">
                    GrowthMates AI Console
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-signal-warm-dim px-3 py-1 text-xs font-semibold text-signal-warm">
                  <span className="h-2 w-2 rounded-full bg-signal-warm animate-pulse" />
                  LIVE DEMO
                </div>
              </div>

              {/* Active Typewriter Stream Box */}
              <div className="rounded-md bg-bg-base border border-border-subtle p-5 font-mono text-sm space-y-3 min-h-[140px] flex flex-col justify-center">
                <div className="flex items-center justify-between text-xs text-fg-dimmer border-b border-border-subtle pb-2">
                  <span className="text-accent font-semibold">[{activeTask.badge}]</span>
                  <span>Agent Stream #0492</span>
                </div>

                <div className="text-fg-default font-medium text-base md:text-lg flex items-center gap-1 min-h-[28px]">
                  <span>&gt; {displayText}</span>
                  <span className="inline-block h-5 w-2 bg-accent animate-pulse" />
                </div>

                <p className="text-xs text-fg-dim font-sans">{activeTask.details}</p>
              </div>

              {/* Console Task Feed */}
              <div className="mt-6 space-y-3">
                <p className="text-xs font-semibold text-fg-dimmer uppercase tracking-wider">
                  Recent Agent Executions
                </p>
                {AGENT_TASKS.map((task, idx) => {
                  const isCurrent = idx === taskIndex;
                  return (
                    <div
                      key={task.action}
                      className={`flex items-center justify-between p-3.5 rounded-md text-xs transition-colors border ${
                        isCurrent
                          ? "bg-accent-dim/60 border-accent/30 font-medium"
                          : "bg-bg-surface border-border-subtle text-fg-dim"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isCurrent ? "bg-accent" : "bg-fg-dimmer/40"
                          }`}
                        />
                        <span className={isCurrent ? "text-fg-default font-semibold" : ""}>
                          {task.action}
                        </span>
                      </div>
                      <span
                        className={`font-mono text-[11px] ${
                          isCurrent ? "text-accent font-semibold" : "text-fg-dimmer"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AgentConsoleHero;
