import BlogStatCard from "@/components/blog/BlogStatCard";
import BlogQuote from "@/components/blog/BlogQuote";
import BlogKeyInsight from "@/components/blog/BlogKeyInsight";
import { MarketGrowthChart, CapabilityComparisonChart } from "@/components/blog/BlogMarketChart";
import { CheckCircle, XCircle, ArrowRight, Brain, Zap, Target, BarChart3 } from "lucide-react";

const DecisionEngineArticle = () => {
  return (
    <div className="space-y-8">
      {/* Lead paragraph */}
      <p className="text-lg leading-relaxed text-foreground">
        For years, enterprises invested heavily in Intelligent Process Automation (IPA) to digitize repetitive tasks. 
        RPA bots filled forms, extracted data, and moved files between systems. But here's the uncomfortable truth: 
        <strong> 73% of enterprise leaders report that their automation initiatives have plateaued</strong>, 
        unable to handle the complexity of real business decisions.
      </p>

      <p className="text-lg leading-relaxed text-foreground">
        The reason? Traditional automation tools are <em>workflow engines</em>. They follow predefined paths. 
        AI agents are fundamentally different. They are <strong>decision engines</strong> — systems that reason, 
        evaluate context, and take autonomous action across complex, ambiguous business scenarios.
      </p>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-3 my-10">
        <BlogStatCard
          value="$81.5B"
          label="Projected AI Agent Market by 2028"
          source="Gartner, 2025"
        />
        <BlogStatCard
          value="73%"
          label="Enterprises with stalled automation"
          source="McKinsey Global AI Survey"
        />
        <BlogStatCard
          value="4.2×"
          label="Higher ROI vs. Traditional RPA"
          source="Forrester TEI Study, 2024"
        />
      </div>

      {/* Section 1 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        What AI Agents Actually Do (And Why It Matters)
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        An AI agent is a software system that perceives its environment, reasons about goals, and takes 
        action — without requiring a human to define every step. Unlike IPA, which executes a fixed flowchart, 
        an AI agent dynamically adapts its behavior based on context, outcomes, and new information.
      </p>

      <div className="grid gap-6 md:grid-cols-2 my-8">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-foreground">Perception & Understanding</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Agents ingest unstructured data — emails, contracts, sensor feeds, customer conversations — 
            and build a contextual understanding of the situation, not just extract keywords.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-foreground">Goal-Oriented Reasoning</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Rather than following a script, agents evaluate multiple paths toward a business objective, 
            weighing trade-offs and selecting the optimal course of action.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-foreground">Autonomous Execution</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Agents don't just recommend — they act. They execute decisions across systems, trigger 
            workflows, escalate exceptions, and learn from the results.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-foreground">Continuous Learning</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Every outcome feeds back into the agent's decision model. Over time, accuracy improves 
            and human intervention decreases — a compounding advantage.
          </p>
        </div>
      </div>

      <BlogQuote
        quote="By 2028, 33% of enterprise software applications will include agentic AI, up from less than 1% in 2024, enabling 15% of day-to-day work decisions to be made autonomously."
        author="Gartner"
        role="Top Strategic Technology Trends 2025"
      />

      {/* Section 2 - Market Chart */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        The Market Shift: From Workflow Engines to Decision Engines
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        The data is unambiguous. While traditional IPA market growth has decelerated to single-digit 
        percentages, the AI agent market is compounding at over 45% annually. This isn't a marginal 
        upgrade — it's a paradigm shift in how enterprises think about automation.
      </p>

      <MarketGrowthChart />

      <p className="text-base leading-relaxed text-foreground/90">
        According to McKinsey's 2024 Global AI Survey, enterprises deploying AI agents report 
        <strong> 40–60% reduction in decision latency</strong> for complex operational scenarios — 
        supply chain exceptions, customer escalations, compliance reviews — that traditional 
        automation couldn't address at all.
      </p>

      {/* Section 3 - Comparison */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        Beyond IPA: Why "Decision Engine" Is the Right Mental Model
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        The fundamental difference isn't speed or cost — it's cognitive capability. IPA automates 
        <em>tasks</em>. AI agents automate <em>judgment</em>. Here's how the two compare across 
        the dimensions that matter to enterprise leaders:
      </p>

      {/* Comparison table */}
      <div className="my-8 overflow-hidden rounded-xl border border-border">
        <div className="grid grid-cols-3 gap-px bg-border">
          <div className="bg-muted p-4 font-bold text-sm text-foreground">Dimension</div>
          <div className="bg-muted p-4 font-bold text-sm text-foreground text-center">Traditional IPA</div>
          <div className="bg-muted p-4 font-bold text-sm text-primary text-center">AI Agents</div>
          
          {[
            ["Core function", "Execute predefined steps", "Make contextual decisions"],
            ["Handles ambiguity", "Fails or escalates", "Reasons through uncertainty"],
            ["Data input", "Structured fields only", "Structured + unstructured"],
            ["Adaptability", "Requires reprogramming", "Self-adjusting from outcomes"],
            ["Scope", "Single task / process", "Cross-functional orchestration"],
            ["Learning", "None — static rules", "Continuous improvement loop"],
            ["Human oversight", "Required at every exception", "Required at policy boundaries"],
          ].map(([dim, ipa, agent], i) => (
            <div key={i} className="contents">
              <div className="bg-card p-4 text-sm font-medium text-foreground border-t border-border">{dim}</div>
              <div className="bg-card p-4 text-sm text-muted-foreground text-center border-t border-border flex items-center justify-center gap-2">
                <XCircle className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0 hidden sm:block" />
                <span>{ipa}</span>
              </div>
              <div className="bg-card p-4 text-sm text-foreground text-center border-t border-border flex items-center justify-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0 hidden sm:block" />
                <span>{agent}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CapabilityComparisonChart />

      <BlogKeyInsight title="Key Takeaway">
        <p>
          Traditional IPA handles roughly 18–45% of enterprise automation scenarios. AI agents 
          address 78–92% — because they don't require every edge case to be pre-programmed. 
          The gap is widest in decision-making (92% vs. 28%) and adaptive learning (85% vs. 22%).
        </p>
      </BlogKeyInsight>

      {/* Section 4 - Key Features */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        Five Key Features That Define Enterprise AI Agents
      </h2>

      <div className="space-y-6 my-8">
        {[
          {
            num: "01",
            title: "Multi-Step Reasoning Chains",
            desc: "Agents decompose complex business problems into sub-tasks, solve them in sequence or parallel, and synthesize results. A procurement agent doesn't just match a PO to an invoice — it evaluates supplier reliability, contract terms, budget impact, and compliance risk before approving payment.",
          },
          {
            num: "02",
            title: "Tool Use & System Integration",
            desc: "Modern agents interact with APIs, databases, and third-party services as naturally as a human employee would. They query your ERP, update your CRM, send notifications through Slack, and file tickets in Jira — all within a single decision workflow.",
          },
          {
            num: "03",
            title: "Memory & Context Persistence",
            desc: "Unlike stateless automation bots, AI agents maintain working memory across interactions. They remember past decisions, customer preferences, and operational patterns — enabling compounding intelligence over time.",
          },
          {
            num: "04",
            title: "Guardrails & Policy Enforcement",
            desc: "Enterprise agents operate within configurable boundaries. You define the policies — spend limits, approval thresholds, compliance rules — and the agent enforces them autonomously while escalating genuine edge cases to human reviewers.",
          },
          {
            num: "05",
            title: "Explainable Decision Trails",
            desc: "Every decision an agent makes is logged with full reasoning context. Audit trails show not just what happened, but why — critical for regulated industries and executive accountability.",
          },
        ].map((item) => (
          <div key={item.num} className="flex gap-5">
            <span className="text-3xl font-bold text-primary/20 shrink-0 leading-none pt-1">
              {item.num}
            </span>
            <div>
              <h3 className="font-bold text-foreground text-lg">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <BlogQuote
        quote="The shift from process automation to decision automation represents the most significant enterprise technology transition since cloud computing. Organizations that fail to adopt agentic AI by 2027 risk operational obsolescence."
        author="Forrester Research"
        role="The Future of Work, 2025"
      />

      {/* Section 5 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        Real-World Impact: Where Decision Engines Outperform
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        The theoretical advantages become concrete when you examine specific enterprise scenarios 
        where AI agents have replaced or augmented traditional automation:
      </p>

      <div className="my-8 space-y-4">
        {[
          {
            domain: "Supply Chain",
            before: "Rule-based reorder triggers caused 23% overstock and 18% stockout rates",
            after: "Agent-driven demand sensing reduced overstock by 41% and stockouts by 62%",
            source: "Deloitte Supply Chain Analytics, 2024",
          },
          {
            domain: "Customer Operations",
            before: "IPA bots resolved 31% of tickets autonomously; rest escalated to humans",
            after: "AI agents resolve 78% of complex tickets with 94% customer satisfaction",
            source: "McKinsey Digital Operations Report",
          },
          {
            domain: "Financial Compliance",
            before: "Manual review of 100% of transactions; 12-hour average processing time",
            after: "Agent pre-screening with risk scoring; 96% processed in under 3 minutes",
            source: "PwC FinTech Insights, 2024",
          },
        ].map((item) => (
          <div key={item.domain} className="rounded-xl border border-border bg-card p-6">
            <h4 className="font-bold text-foreground">{item.domain}</h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-destructive/5 p-3">
                <p className="text-xs font-semibold text-destructive/70 uppercase mb-1">Before (IPA)</p>
                <p className="text-sm text-foreground/80">{item.before}</p>
              </div>
              <div className="rounded-lg bg-secondary/5 p-3">
                <p className="text-xs font-semibold text-secondary uppercase mb-1">After (AI Agents)</p>
                <p className="text-sm text-foreground/80">{item.after}</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground italic">{item.source}</p>
          </div>
        ))}
      </div>

      {/* Stats row 2 */}
      <div className="grid gap-4 sm:grid-cols-3 my-10">
        <BlogStatCard
          value="62%"
          label="Reduction in stockouts with agent-driven supply chains"
          source="Deloitte, 2024"
        />
        <BlogStatCard
          value="78%"
          label="Complex tickets resolved autonomously"
          source="McKinsey Digital Ops"
        />
        <BlogStatCard
          value="96%"
          label="Compliance transactions processed in under 3 min"
          source="PwC FinTech Insights"
        />
      </div>

      {/* Section 6 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        Getting Started: A Practical Framework
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        Adopting AI agents doesn't require ripping out existing automation. The most successful 
        enterprises follow a phased approach:
      </p>

      <div className="my-8 space-y-1">
        {[
          {
            phase: "Phase 1: Augment",
            desc: "Layer AI agents on top of existing IPA to handle the exceptions and edge cases that currently require human intervention. Immediate ROI, minimal disruption.",
          },
          {
            phase: "Phase 2: Automate Decisions",
            desc: "Identify high-volume decision points — approvals, prioritizations, classifications — and deploy purpose-built agents with clear guardrails and audit trails.",
          },
          {
            phase: "Phase 3: Orchestrate",
            desc: "Connect agents across functions. A single customer inquiry triggers coordinated decisions across support, billing, logistics, and compliance — all handled by collaborating agents.",
          },
        ].map((item, i) => (
          <div key={item.phase} className="flex gap-4 py-4 border-b border-border last:border-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
              {i + 1}
            </div>
            <div>
              <h3 className="font-bold text-foreground">{item.phase}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <BlogKeyInsight title="The Bottom Line">
        <p>
          AI agents are not a better version of IPA. They represent a fundamentally different 
          paradigm — one where software doesn't just follow instructions, but makes intelligent 
          decisions. The enterprises that recognize this distinction and invest accordingly will 
          define the next decade of operational excellence.
        </p>
        <p className="mt-2">
          The question isn't whether to adopt AI agents. It's whether you'll lead the transition 
          or be disrupted by those who do.
        </p>
      </BlogKeyInsight>
    </div>
  );
};

export default DecisionEngineArticle;
