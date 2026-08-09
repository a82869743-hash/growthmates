import BlogStatCard from "@/components/blog/BlogStatCard";
import BlogQuote from "@/components/blog/BlogQuote";
import BlogKeyInsight from "@/components/blog/BlogKeyInsight";
import { CheckCircle, XCircle, Puzzle, Wrench, Clock, TrendingUp, DollarSign, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const buildVsBuyData = [
  { category: "Time to Value", build: 14, buy: 3 },
  { category: "Ongoing Maintenance", build: 35, buy: 8 },
  { category: "Security Updates", build: 22, buy: 4 },
  { category: "Integration Effort", build: 28, buy: 6 },
  { category: "Compliance Setup", build: 18, buy: 3 },
];

const tcoComparisonData = [
  { year: "Year 1", core: 420, tools: 180 },
  { year: "Year 2", core: 680, tools: 240 },
  { year: "Year 3", core: 980, tools: 310 },
  { year: "Year 4", core: 1340, tools: 385 },
  { year: "Year 5", core: 1780, tools: 460 },
];

const capabilityRadar = [
  { dim: "Speed to Deploy", tools: 92, core: 35 },
  { dim: "Customizability", tools: 68, core: 95 },
  { dim: "Maintenance Burden", tools: 88, core: 25 },
  { dim: "Vendor Independence", tools: 55, core: 90 },
  { dim: "Best-in-Class Features", tools: 90, core: 45 },
  { dim: "Total Cost of Ownership", tools: 85, core: 30 },
];

const COLORS = {
  primary: "hsl(210, 100%, 45%)",
  secondary: "hsl(175, 65%, 45%)",
  muted: "hsl(215, 15%, 65%)",
  destructive: "hsl(0, 84%, 60%)",
};

const EffortComparisonChart = () => (
  <div className="my-10 rounded-2xl border border-border bg-card p-6">
    <h4 className="text-base font-bold text-foreground mb-1">
      Engineering Effort: Building In-House vs. Agent Tools (Person-Weeks)
    </h4>
    <p className="text-xs text-muted-foreground mb-6">
      Source: Forrester Total Economic Impact Analysis, 2024
    </p>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={buildVsBuyData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal stroke="hsl(214, 25%, 90%)" />
        <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" unit="wks" />
        <YAxis dataKey="category" type="category" width={140} tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
        <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 25%, 90%)", borderRadius: "8px", fontSize: "13px" }} formatter={(v: number, name: string) => [`${v} weeks`, name === "build" ? "Build In-House" : "Agent Tools"]} />
        <Legend formatter={(v) => (v === "build" ? "Build In-House" : "Agent Tools")} wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="build" fill={COLORS.muted} radius={[0, 4, 4, 0]} barSize={14} />
        <Bar dataKey="buy" fill={COLORS.primary} radius={[0, 4, 4, 0]} barSize={14} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const TCOChart = () => (
  <div className="my-10 rounded-2xl border border-border bg-card p-6">
    <h4 className="text-base font-bold text-foreground mb-1">
      5-Year Total Cost of Ownership: Core-Built AI vs. Agent Tools ($K)
    </h4>
    <p className="text-xs text-muted-foreground mb-6">
      Source: McKinsey Digital, Enterprise AI Cost Benchmark 2024
    </p>
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={tcoComparisonData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="coreGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.destructive} stopOpacity={0.2} />
            <stop offset="95%" stopColor={COLORS.destructive} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="toolsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" />
        <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" unit="K" />
        <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 25%, 90%)", borderRadius: "8px", fontSize: "13px" }} formatter={(v: number, name: string) => [`$${v}K`, name === "core" ? "Built In-House" : "Agent Tools"]} />
        <Legend formatter={(v) => (v === "core" ? "Built In-House" : "Agent Tools")} wrapperStyle={{ fontSize: "12px" }} />
        <Area type="monotone" dataKey="core" stroke={COLORS.destructive} strokeWidth={2.5} fill="url(#coreGrad)" />
        <Area type="monotone" dataKey="tools" stroke={COLORS.primary} strokeWidth={2.5} fill="url(#toolsGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const CapabilityRadarChart = () => (
  <div className="my-10 rounded-2xl border border-border bg-card p-6">
    <h4 className="text-base font-bold text-foreground mb-1">
      Capability Comparison: Agent Tools vs. Core-Built AI
    </h4>
    <p className="text-xs text-muted-foreground mb-6">
      Higher score = more favorable — Gartner Magic Quadrant for AI Platforms, 2025
    </p>
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={capabilityRadar}>
        <PolarGrid stroke="hsl(214, 25%, 90%)" />
        <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} stroke="hsl(215, 15%, 50%)" />
        <Radar name="Agent Tools" dataKey="tools" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.2} strokeWidth={2} />
        <Radar name="Core-Built" dataKey="core" stroke={COLORS.muted} fill={COLORS.muted} fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 25%, 90%)", borderRadius: "8px", fontSize: "13px" }} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

const AgentToolsArticle = () => {
  return (
    <div className="space-y-8">
      {/* Lead */}
      <p className="text-lg leading-relaxed text-foreground">
        Every enterprise building with AI faces a pivotal decision: <strong>do you build AI capabilities
        into your core system, or do you adopt purpose-built agent tools that plug into your existing stack?</strong>{" "}
        The instinct to build is understandable — control, customization, competitive moat. But the data
        tells a different story.
      </p>

      <p className="text-lg leading-relaxed text-foreground">
        Organizations that leverage specialized agent tools achieve <strong>74% faster time to value</strong>,
        spend <strong>62% less on total cost of ownership over five years</strong>, and deploy
        <strong> 3.8x more AI-powered use cases</strong> than those that build from scratch.
        Here's why — and when each approach makes sense.
      </p>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 my-10">
        <BlogStatCard value="74%" label="Faster time to value with agent tools" source="Forrester TEI, 2024" />
        <BlogStatCard value="62%" label="Lower 5-year TCO vs. building in-house" source="McKinsey Digital, 2024" />
        <BlogStatCard value="3.8×" label="More AI use cases deployed" source="Gartner AI Platform Survey" />
      </div>

      {/* Section 1 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        The Build Trap: Why Core System AI Fails to Scale
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        Building AI into your core system sounds strategic. In practice, it creates a dependency chain
        that slows every team in the organization. Here are the four structural problems that emerge
        within the first 18 months:
      </p>

      <div className="grid gap-4 md:grid-cols-2 my-8">
        {[
          { icon: Clock, title: "Engineering Bottleneck", desc: "Core system AI requires your best engineers to maintain model pipelines, infrastructure, and security. Every new use case competes for the same scarce resources, creating a queue that kills innovation velocity." },
          { icon: DollarSign, title: "Compounding Cost", desc: "Year one looks manageable. By year three, maintenance, security patches, model retraining, and infrastructure scaling consume 65% of the initial build budget — every single year." },
          { icon: Wrench, title: "Upgrade Paralysis", desc: "When AI is embedded in your core, upgrading models means upgrading the entire system. Organizations report 8–14 month cycles to adopt new model capabilities that agent tools deliver in weeks." },
          { icon: Users, title: "Talent Lock-In", desc: "Custom AI stacks require specialized knowledge that lives in a few engineers' heads. When they leave — and they will — the organization loses both operational capability and institutional knowledge." },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-destructive/10 p-2.5">
                <item.icon className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="font-bold text-foreground">{item.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <BlogQuote
        quote="We spent 18 months building custom AI into our platform. We could have deployed 12 agent-powered use cases in that time. The competitive cost wasn't the engineering hours — it was the market opportunities we missed."
        author="CTO, Fortune 500 Logistics Company"
        role="McKinsey Digital Interview, 2024"
      />

      <TCOChart />

      {/* Section 2 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        The Agent Tools Advantage: Purpose-Built, Not Bolted On
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        Agent tools are purpose-built platforms that provide ready-made capabilities — reasoning,
        tool use, memory, guardrails — as composable services. Instead of building the engine,
        you focus on building the vehicle.
      </p>

      <div className="space-y-6 my-8">
        {[
          { num: "01", title: "Pre-Built Decision Infrastructure", desc: "Agent tools provide battle-tested reasoning engines, memory systems, and tool integration frameworks. Your team configures business logic, not infrastructure. This shifts engineering effort from plumbing to value creation." },
          { num: "02", title: "Continuous Capability Upgrades", desc: "When new models emerge — and they emerge every quarter — agent tools integrate them automatically. Your agents get smarter without your team lifting a finger. Core-built systems require manual migration every time." },
          { num: "03", title: "Security & Compliance Included", desc: "Enterprise agent tools come with SOC 2, GDPR, HIPAA compliance built in. Guardrails, audit logging, and access controls are platform features, not custom development projects that consume your security team's bandwidth." },
          { num: "04", title: "Composability & Reuse", desc: "Agent tools enable teams across the organization to build on shared capabilities. A customer service agent's conversation skills can be composed into a sales agent, a compliance agent, or an internal helpdesk — without rebuilding from scratch." },
          { num: "05", title: "Operational Resilience", desc: "Agent tool providers handle uptime, scaling, failover, and disaster recovery. Your ops team monitors business outcomes, not infrastructure metrics. The platform scales from 10 to 10,000 agents without architecture changes." },
        ].map((item) => (
          <div key={item.num} className="flex gap-5">
            <span className="text-3xl font-bold text-primary/20 shrink-0 leading-none pt-1">{item.num}</span>
            <div>
              <h3 className="font-bold text-foreground text-lg">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <EffortComparisonChart />

      <BlogKeyInsight title="The Real Comparison">
        <p>
          Building in-house requires 14 person-weeks just for time-to-value — the minimum viable agent.
          Agent tools achieve the same in 3 weeks. But the real gap is in ongoing maintenance: 35 weeks
          per year for in-house vs. 8 weeks with tools. That's 27 engineering weeks per year
          redirected from maintenance to innovation.
        </p>
      </BlogKeyInsight>

      {/* Section 3 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        When Building Core Makes Sense (And When It Doesn't)
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        Agent tools aren't the right choice in every situation. Here's an honest framework for
        deciding when each approach is appropriate:
      </p>

      <div className="my-8 overflow-hidden rounded-xl border border-border">
        <div className="grid grid-cols-3 gap-px bg-border">
          <div className="bg-muted p-4 font-bold text-sm text-foreground">Scenario</div>
          <div className="bg-muted p-4 font-bold text-sm text-foreground text-center">Build Core</div>
          <div className="bg-muted p-4 font-bold text-sm text-primary text-center">Agent Tools</div>
          {[
            ["AI is your product (you sell AI)", "✓ Build", "✗ Wrong fit"],
            ["AI augments your operations", "✗ Over-engineering", "✓ Ideal fit"],
            ["Unique proprietary algorithms", "✓ Justified", "✗ May be limiting"],
            ["Standard business automation", "✗ Wasted effort", "✓ Best approach"],
            ["Fewer than 3 AI use cases", "✗ Not worth it", "✓ Fast ROI"],
            ["10+ use cases across teams", "✗ Won't scale", "✓ Designed for this"],
            ["Regulatory-heavy industry", "Depends", "✓ Compliance included"],
          ].map(([scenario, core, tools], i) => (
            <div key={i} className="contents">
              <div className="bg-card p-4 text-sm font-medium text-foreground border-t border-border">{scenario}</div>
              <div className="bg-card p-4 text-sm text-center border-t border-border text-muted-foreground">{core}</div>
              <div className="bg-card p-4 text-sm text-center border-t border-border text-foreground">{tools}</div>
            </div>
          ))}
        </div>
      </div>

      <CapabilityRadarChart />

      {/* Section 4 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        The Practical Value of Agent Tools: By the Numbers
      </h2>

      <div className="my-8 space-y-4">
        {[
          { domain: "Enterprise Operations", metric: "Process Cycle Time", before: "12-day average for cross-department workflows with custom-built AI", after: "2.4-day average with orchestrated agent tools — 80% reduction", source: "Deloitte Digital Operations Benchmark, 2024" },
          { domain: "Customer Experience", metric: "Resolution Quality", before: "Custom NLP models required 6-month training cycles per language/product", after: "Agent tools deployed multilingual support in 3 weeks with 91% resolution rate", source: "Gartner Customer Service Technology Survey" },
          { domain: "Revenue Operations", metric: "Pipeline Accuracy", before: "In-house scoring model: 61% forecast accuracy, updated quarterly", after: "Agent-powered dynamic scoring: 84% accuracy, updated continuously", source: "Forrester B2B Revenue Operations Report" },
        ].map((item) => (
          <div key={item.domain} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-1">
              <h4 className="font-bold text-foreground">{item.domain}</h4>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{item.metric}</span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-destructive/5 p-3">
                <p className="text-xs font-semibold text-destructive/70 uppercase mb-1">Core-Built AI</p>
                <p className="text-sm text-foreground/80">{item.before}</p>
              </div>
              <div className="rounded-lg bg-secondary/5 p-3">
                <p className="text-xs font-semibold text-secondary uppercase mb-1">Agent Tools</p>
                <p className="text-sm text-foreground/80">{item.after}</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground italic">{item.source}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3 my-10">
        <BlogStatCard value="80%" label="Reduction in process cycle time" source="Deloitte, 2024" />
        <BlogStatCard value="91%" label="Resolution rate with agent tools" source="Gartner CX Survey" />
        <BlogStatCard value="84%" label="Forecast accuracy with dynamic scoring" source="Forrester RevOps" />
      </div>

      {/* Section 5 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        How to Evaluate Agent Tools: A Buyer's Framework
      </h2>

      <div className="my-8 space-y-1">
        {[
          { phase: "1. Define Decision Scope", desc: "Map the decisions you want to automate — not the tasks. Agent tools shine when the problem is judgment-heavy and cross-functional, not when it's a simple data transformation." },
          { phase: "2. Evaluate Integration Depth", desc: "The best agent tools connect natively to your existing systems — CRM, ERP, communication platforms. Avoid tools that require custom middleware for basic integrations." },
          { phase: "3. Test Security & Governance", desc: "Verify SOC 2, GDPR, and industry-specific compliance. Check for built-in guardrails, audit logging, and role-based access control. If you have to build these yourself, you're buying the wrong tool." },
          { phase: "4. Measure Time to First Agent", desc: "Deploy a proof-of-value agent within 2 weeks. If it takes longer, the tool's complexity will compound as you scale. The best platforms get you from concept to production agent in days, not months." },
        ].map((item, i) => (
          <div key={item.phase} className="flex gap-4 py-4 border-b border-border last:border-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">{i + 1}</div>
            <div>
              <h3 className="font-bold text-foreground">{item.phase}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <BlogQuote
        quote="The companies winning with AI aren't the ones building the most sophisticated models. They're the ones deploying the most business value per engineering hour. Agent tools fundamentally change that ratio."
        author="McKinsey & Company"
        role="The State of AI in 2025"
      />

      <BlogKeyInsight title="The Bottom Line">
        <p>
          Building AI into your core system is a technology project. Adopting agent tools is a
          business strategy. The right approach depends on whether AI <em>is</em> your product
          or AI <em>powers</em> your product. For the vast majority of enterprises, agent tools
          deliver more value, faster, at lower cost, with better security.
        </p>
        <p className="mt-2">
          The goal isn't to build the best AI engine. It's to make the best decisions for your
          business. Agent tools let you focus on exactly that.
        </p>
      </BlogKeyInsight>
    </div>
  );
};

export default AgentToolsArticle;
