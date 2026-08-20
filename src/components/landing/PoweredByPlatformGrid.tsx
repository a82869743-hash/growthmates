import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, Network } from "lucide-react";
import { DOMAIN_PLATFORM_DATA, DOMAIN_KEYS, matchDomainFromPrompt, PlatformCardDomain } from "@/lib/promptDataStore";

export const PoweredByPlatformGrid = () => {
  const [activeKeyIdx, setActiveKeyIdx] = useState<number>(0);
  const [currentDomain, setCurrentDomain] = useState<PlatformCardDomain>(DOMAIN_PLATFORM_DATA.dispatch);
  const [isLockedByPrompt, setIsLockedByPrompt] = useState<boolean>(false);

  // Auto-cycle through domain data every 4.5s if not locked by user search
  useEffect(() => {
    if (isLockedByPrompt) return;
    const timer = setInterval(() => {
      setActiveKeyIdx((prev) => {
        const nextIdx = (prev + 1) % DOMAIN_KEYS.length;
        setCurrentDomain(DOMAIN_PLATFORM_DATA[DOMAIN_KEYS[nextIdx]]);
        return nextIdx;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [isLockedByPrompt]);

  // Listen for real-time prompt changes from the search bar above
  useEffect(() => {
    const handlePromptEvent = (e: any) => {
      const prompt: string = e.detail?.prompt || "";
      if (!prompt.trim()) {
        setIsLockedByPrompt(false);
        setCurrentDomain(DOMAIN_PLATFORM_DATA[DOMAIN_KEYS[activeKeyIdx]] || DOMAIN_PLATFORM_DATA.dispatch);
        return;
      }
      setIsLockedByPrompt(true);
      const matched = matchDomainFromPrompt(prompt);
      setCurrentDomain(matched);
    };

    window.addEventListener("growthmates:prompt-change" as any, handlePromptEvent);
    return () => window.removeEventListener("growthmates:prompt-change" as any, handlePromptEvent);
  }, [activeKeyIdx]);

  return (
    <section className="py-20 md:py-28 bg-[#FAF9F6] text-[#14171F]">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
            <Sparkles className="h-3.5 w-3.5" /> AUTONOMOUS AGENT PLATFORM
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-[#14171F]">
            Powered by the <span className="text-[#2E5EFF]">GrowthMates AI platform</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5B616E] font-body">
            Everything enterprise leaders need to build, deploy, and govern autonomous AI agents.
          </p>

          {/* Active Solution Indicator */}
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="text-xs font-mono text-[#8B8F99]">Active Solution:</span>
            <span className="px-3 py-1 rounded-full bg-white border border-[#E7E5DE] text-xs font-mono font-bold text-[#2E5EFF] shadow-2xs">
              {currentDomain.solutionTitle}
            </span>
          </div>
        </div>

        {/* 4-Card Bento Grid (Clean Layout, Calibrated Spacing & Zero Collisions) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          
          {/* ══ Card 1: Agent Runtime ══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-white border border-[#E7E5DE] p-6 sm:p-7 flex flex-col justify-between shadow-raised hover:shadow-floating transition-all duration-300 min-h-[470px]"
          >
            <div>
              <span className="text-xs font-mono font-bold text-[#5B616E] uppercase tracking-wider block mb-2">
                Agent Runtime
              </span>
              <h3 className="text-2xl font-extrabold font-display text-[#14171F] leading-tight mb-4">
                Describe It. Deploy It.
              </h3>

              {/* Graphic: Non-overlapping Orbital Prompt & Deploy Row */}
              <div className="relative my-4 h-48 w-full flex flex-col items-center justify-between">
                {/* Dotted Background Circle */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 220 190">
                  <circle cx="110" cy="75" r="62" stroke="#2E5EFF" strokeWidth="1.5" strokeDasharray="5 5" fill="none" opacity="0.35" />
                </svg>

                {/* Centered Prompt Bubble */}
                <div className="relative z-10 pt-4 w-full flex justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDomain.card1.promptBubble}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.25 }}
                      className="rounded-xl bg-[#FAF9F6] border border-[#E7E5DE] px-3.5 py-2.5 text-[11.5px] font-mono text-[#14171F] shadow-sm max-w-[210px] text-center leading-snug"
                    >
                      {currentDomain.card1.promptBubble}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Balanced Action Row */}
                <div className="relative z-10 w-full flex items-center justify-between pt-3 px-1 border-t border-dashed border-[#E7E5DE]/80">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDomain.card1.agentTag}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-lg bg-white border border-[#E7E5DE] px-2.5 py-1 text-[11px] font-mono text-[#5B616E] shadow-2xs whitespace-nowrap"
                    >
                      {currentDomain.card1.agentTag}
                    </motion.div>
                  </AnimatePresence>

                  <div className="rounded-full bg-[#2E5EFF] text-white px-3 py-1 text-xs font-bold font-display shadow-sm flex items-center gap-1 shrink-0">
                    <Sparkles className="h-3 w-3" /> Deploy
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#5B616E] leading-relaxed font-body border-t border-[#E7E5DE] pt-4 mt-2">
              {currentDomain.card1.description}
            </p>
          </motion.div>

          {/* ══ Card 2: Full Stack Infrastructure ══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-3xl bg-[#EEF1FF] border border-[#2E5EFF]/20 p-6 sm:p-7 flex flex-col justify-between shadow-raised hover:shadow-floating transition-all duration-300 min-h-[470px]"
          >
            <div>
              <span className="text-xs font-mono font-bold text-[#2E5EFF] uppercase tracking-wider block mb-2">
                Full Stack Infrastructure
              </span>
              <h3 className="text-2xl font-extrabold font-display text-[#16214F] leading-tight mb-4">
                Build &amp; Scale Your Agents Easily.
              </h3>

              {/* Stack of Capsule Containers */}
              <div className="my-4 space-y-2 max-w-[220px] mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDomain.id + "-capsules"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2"
                  >
                    {currentDomain.card2.capsules.map((cap) => (
                      <div
                        key={cap}
                        className="rounded-xl bg-white border border-[#2E5EFF]/20 p-2.5 text-center text-xs font-bold text-[#16214F] font-display shadow-2xs truncate"
                      >
                        {cap}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className="text-xs text-[#5B616E] leading-relaxed font-body border-t border-[#2E5EFF]/15 pt-4 mt-2">
              {currentDomain.card2.description}
            </p>
          </motion.div>

          {/* ══ Card 3: Integrations & MCP ══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-3xl bg-[#FFF1EC] border border-[#FF6A3D]/25 p-6 sm:p-7 flex flex-col justify-between shadow-raised hover:shadow-floating transition-all duration-300 min-h-[470px]"
          >
            <div>
              <span className="text-xs font-mono font-bold text-[#FF6A3D] uppercase tracking-wider block mb-2">
                Integrations &amp; MCP
              </span>
              <h3 className="text-2xl font-extrabold font-display text-[#14171F] leading-tight mb-4">
                Connect To AI &amp; Legacy Systems.
              </h3>

              {/* Central Hub with 3 Spaced Satellite Nodes */}
              <div className="relative my-4 h-48 w-full flex items-center justify-center">
                {/* Central Hub Icon (Original Orange Squircle) */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6A3D] text-white shadow-lg">
                  <svg
                    className="h-7 w-7 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="3" width="6" height="6" rx="1.5" />
                    <rect x="3" y="15" width="6" height="6" rx="1.5" />
                    <rect x="15" y="15" width="6" height="6" rx="1.5" />
                    <path d="M12 9v3" />
                    <path d="M6 15v-3h12v3" />
                  </svg>
                </div>

                {/* 3 Balanced Satellites */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDomain.id + "-badges"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {currentDomain.card3.badges.map((b) => (
                      <div
                        key={b.text}
                        className={`absolute ${b.posClass} rounded-xl bg-white px-2.5 py-1.5 shadow-md border border-[#FF6A3D]/20 text-[11px] font-bold text-[#14171F] whitespace-nowrap`}
                      >
                        {b.text}
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <p className="text-xs text-[#5B616E] leading-relaxed font-body border-t border-[#FF6A3D]/20 pt-4 mt-2">
              {currentDomain.card3.description}
            </p>
          </motion.div>

          {/* ══ Card 4: Enterprise Control ══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-3xl bg-[#16214F] text-white p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:shadow-2xl transition-all duration-300 min-h-[470px] border border-[#2E5EFF]/30"
          >
            <div>
              <span className="text-xs font-mono font-bold text-[#7C97FF] uppercase tracking-wider block mb-2">
                Enterprise Control
              </span>
              <h3 className="text-2xl font-extrabold font-display text-white leading-tight mb-4">
                Secure Your Operations As They Scale.
              </h3>

              {/* Graphic: 3D Shield Outline */}
              <div className="my-4 h-48 flex items-center justify-center">
                <div className="relative flex h-28 w-24 items-center justify-center">
                  <svg className="w-full h-full text-[#2E5EFF]" viewBox="0 0 100 120" fill="none">
                    <path d="M 50 10 L 90 25 V 65 C 90 95, 50 110, 50 110 C 50 110, 10 95, 10 65 V 25 Z" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path d="M 50 20 L 80 32 V 62 C 80 87, 50 98, 50 98 C 50 98, 20 87, 20 62 V 32 Z" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.8" />
                  </svg>
                  <CheckCircle2 className="absolute h-10 w-10 text-white" />
                </div>
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed font-body border-t border-white/15 pt-4 mt-2">
              {currentDomain.card4.description}
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default PoweredByPlatformGrid;
