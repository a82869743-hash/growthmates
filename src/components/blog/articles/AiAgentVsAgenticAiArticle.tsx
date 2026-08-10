import { motion } from "framer-motion";
import { CheckCircle2, Bot, Brain, Sparkles, ArrowRight, Zap, ShieldCheck } from "lucide-react";

export const AiAgentVsAgenticAiArticle = () => {
  return (
    <div className="space-y-10 text-[#14171F] font-body leading-relaxed">
      
      {/* Article Lead Excerpt */}
      <p className="text-base sm:text-lg text-[#5B616E] font-medium leading-relaxed border-l-4 border-[#2E5EFF] pl-4">
        As enterprises race to adopt artificial intelligence, a critical distinction has emerged between basic <strong>AI Agents</strong> and true <strong>Agentic AI</strong>. While traditional AI agents perform narrow, rule-based tasks with constant human oversight, Agentic AI introduces autonomous reasoning, long-term memory, and goal-driven decision execution across complex business workflows.
      </p>

      {/* Main Infographic Image */}
      <div className="rounded-2xl overflow-hidden border border-[#E7E5DE] shadow-xl bg-white p-2">
        <img
          src="/images/ai-agent-vs-agentic-ai.png"
          alt="AI Agent vs Agentic AI - Understanding the Difference"
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>

      {/* Section 1: Core Definitions */}
      <div className="grid md:grid-cols-2 gap-6 pt-4">
        {/* Left Card: AI Agent */}
        <div className="rounded-2xl bg-white border border-[#E7E5DE] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-[#E7E5DE] pb-3">
            <div className="h-9 w-9 rounded-xl bg-[#EEF1FF] text-[#2E5EFF] flex items-center justify-center font-bold">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-display text-[#14171F]">AI Agent</h3>
              <span className="text-[10px] font-mono text-[#8B8F99] uppercase">Rule-Based Task Executor</span>
            </div>
          </div>
          <p className="text-xs text-[#5B616E] leading-relaxed">
            An AI Agent is a system that can perceive its environment, process information, and take actions based strictly on predefined instructions and fixed decision trees.
          </p>
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-[#14171F] uppercase font-mono block">Key Characteristics:</span>
            <ul className="text-xs text-[#5B616E] space-y-1.5 list-disc pl-4 font-body">
              <li>Follows predefined rules &amp; scripts</li>
              <li>Performs specific, isolated tasks</li>
              <li>Limited memory &amp; contextual awareness</li>
              <li>Requires human guidance for complex decisions</li>
            </ul>
          </div>
        </div>

        {/* Right Card: Agentic AI */}
        <div className="rounded-2xl bg-[#16214F] text-white p-6 shadow-xl space-y-4 border border-[#2E5EFF]/40">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="h-9 w-9 rounded-xl bg-[#FF6A3D] text-white flex items-center justify-center font-bold shadow-md">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-display text-white">Agentic AI</h3>
              <span className="text-[10px] font-mono text-[#7C97FF] uppercase">Autonomous Decision Engine</span>
            </div>
          </div>
          <p className="text-xs text-white/80 leading-relaxed">
            Agentic AI goes beyond simple task execution — it can plan, reason, learn, and make decisions autonomously to achieve high-level operational goals.
          </p>
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-[#7C97FF] uppercase font-mono block">Key Characteristics:</span>
            <ul className="text-xs text-white/90 space-y-1.5 list-disc pl-4 font-body">
              <li>Autonomous decision-making &amp; planning</li>
              <li>Goal-oriented &amp; self-adaptive</li>
              <li>Long-term memory &amp; continuous learning</li>
              <li>Works independently with minimal human intervention</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 2: Interactive Matrix Table */}
      <div className="space-y-4 pt-6">
        <h2 className="text-2xl font-extrabold text-[#14171F] font-display">
          Side-by-Side Comparison Matrix
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-[#E7E5DE] shadow-sm bg-white">
          <table className="w-full text-left text-xs font-body">
            <thead className="bg-[#FAF9F6] border-b border-[#E7E5DE] text-[#5B616E] font-mono uppercase text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-bold">ASPECT</th>
                <th className="py-3.5 px-4 font-bold text-[#2E5EFF]">AI AGENT</th>
                <th className="py-3.5 px-4 font-bold text-[#14171F]">AGENTIC AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5DE] text-[#14171F]">
              <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                <td className="py-3.5 px-4 font-bold font-mono text-[#5B616E]">Decision Making</td>
                <td className="py-3.5 px-4 text-[#5B616E]">Rule-based / Predefined</td>
                <td className="py-3.5 px-4 font-bold text-[#14171F]">Autonomous / Goal-driven</td>
              </tr>
              <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                <td className="py-3.5 px-4 font-bold font-mono text-[#5B616E]">Scope</td>
                <td className="py-3.5 px-4 text-[#5B616E]">Narrow / Specific Tasks</td>
                <td className="py-3.5 px-4 font-bold text-[#14171F]">Broad / End-to-End Workflows</td>
              </tr>
              <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                <td className="py-3.5 px-4 font-bold font-mono text-[#5B616E]">Memory</td>
                <td className="py-3.5 px-4 text-[#5B616E]">Short-term</td>
                <td className="py-3.5 px-4 font-bold text-[#14171F]">Long-term &amp; Continuous Learning</td>
              </tr>
              <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                <td className="py-3.5 px-4 font-bold font-mono text-[#5B616E]">Human Involvement</td>
                <td className="py-3.5 px-4 text-[#5B616E]">High</td>
                <td className="py-3.5 px-4 font-bold text-[#14171F]">Low (Human-in-the-loop optional)</td>
              </tr>
              <tr className="hover:bg-[#FAF9F6]/60 transition-colors">
                <td className="py-3.5 px-4 font-bold font-mono text-[#5B616E]">Adaptability</td>
                <td className="py-3.5 px-4 text-[#5B616E]">Low to Moderate</td>
                <td className="py-3.5 px-4 font-bold text-[#1FAA59]">High (Self-adjusting)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Why Enterprise Supply Chains Need Agentic AI */}
      <div className="space-y-4 pt-6">
        <h2 className="text-2xl font-extrabold text-[#14171F] font-display">
          Why Modern Logistics Requires Agentic AI Over Simple Chatbots
        </h2>
        <p className="text-sm text-[#5B616E] leading-relaxed">
          Traditional automation tools require explicit code updates whenever operational circumstances shift — such as weather delays, port strikes, or sudden inventory spikes. In contrast, <strong>GrowthMates Agentic AI</strong> evaluates real-time telemetry, accesses live TMS/ERP databases via MCP 1.0 gateways, and dynamically re-routes shipments or auto-issues refunds without manual intervention.
        </p>
      </div>

    </div>
  );
};

export default AiAgentVsAgenticAiArticle;
