import BlogStatCard from "@/components/blog/BlogStatCard";
import BlogQuote from "@/components/blog/BlogQuote";
import BlogKeyInsight from "@/components/blog/BlogKeyInsight";
import { MarketGrowthChart as BaseChart } from "@/components/blog/BlogMarketChart";
import { CheckCircle, Shield, Lock, Server, Layers, AlertTriangle, Globe, Database, Eye } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const breachCostData = [
  { year: "2020", cost: 3.86, aiEnabled: 2.45 },
  { year: "2021", cost: 4.24, aiEnabled: 2.56 },
  { year: "2022", cost: 4.35, aiEnabled: 2.62 },
  { year: "2023", cost: 4.45, aiEnabled: 2.70 },
  { year: "2024", cost: 4.88, aiEnabled: 2.78 },
  { year: "2025", cost: 5.12, aiEnabled: 2.84 },
];

const securityMaturityData = [
  { dimension: "Data Encryption", secure: 95, typical: 62 },
  { dimension: "Access Control", secure: 92, typical: 55 },
  { dimension: "Audit Logging", secure: 88, typical: 40 },
  { dimension: "Input Validation", secure: 90, typical: 48 },
  { dimension: "Model Isolation", secure: 85, typical: 32 },
  { dimension: "Compliance", secure: 94, typical: 58 },
];

const architectureLayerData = [
  { layer: "Governance & Policy", adoption: 89, impact: 94 },
  { layer: "Identity & Access", adoption: 82, impact: 91 },
  { layer: "Data Security", adoption: 78, impact: 88 },
  { layer: "Model Security", adoption: 64, impact: 85 },
  { layer: "Runtime Isolation", adoption: 58, impact: 82 },
  { layer: "Observability", adoption: 71, impact: 79 },
];

const COLORS = {
  primary: "hsl(210, 100%, 45%)",
  secondary: "hsl(175, 65%, 45%)",
  muted: "hsl(215, 15%, 65%)",
  destructive: "hsl(0, 84%, 60%)",
};

const BreachCostChart = () => (
  <div className="my-10 rounded-2xl border border-border bg-card p-6">
    <h4 className="text-base font-bold text-foreground mb-1">
      Average Cost of a Data Breach: AI-Secured vs. Traditional ($M)
    </h4>
    <p className="text-xs text-muted-foreground mb-6">
      Source: IBM Cost of a Data Breach Report 2020–2025
    </p>
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={breachCostData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="breachGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.destructive} stopOpacity={0.2} />
            <stop offset="95%" stopColor={COLORS.destructive} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" />
        <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" unit="M" />
        <Tooltip
          contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 25%, 90%)", borderRadius: "8px", fontSize: "13px" }}
          formatter={(value: number, name: string) => [`$${value}M`, name === "cost" ? "Traditional" : "AI-Secured"]}
        />
        <Legend formatter={(v) => (v === "cost" ? "Traditional Security" : "AI-Secured Architecture")} wrapperStyle={{ fontSize: "12px" }} />
        <Area type="monotone" dataKey="cost" stroke={COLORS.destructive} strokeWidth={2.5} fill="url(#breachGrad)" />
        <Area type="monotone" dataKey="aiEnabled" stroke={COLORS.secondary} strokeWidth={2.5} fill="url(#aiGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const SecurityMaturityRadar = () => (
  <div className="my-10 rounded-2xl border border-border bg-card p-6">
    <h4 className="text-base font-bold text-foreground mb-1">
      Security Maturity: Best-Practice AI Architecture vs. Industry Average
    </h4>
    <p className="text-xs text-muted-foreground mb-6">
      Score out of 100 across six dimensions — NIST AI Risk Management Framework 2024
    </p>
    <ResponsiveContainer width="100%" height={340}>
      <RadarChart data={securityMaturityData}>
        <PolarGrid stroke="hsl(214, 25%, 90%)" />
        <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} stroke="hsl(215, 15%, 50%)" />
        <Radar name="Secure AI Architecture" dataKey="secure" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.2} strokeWidth={2} />
        <Radar name="Industry Average" dataKey="typical" stroke={COLORS.muted} fill={COLORS.muted} fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 25%, 90%)", borderRadius: "8px", fontSize: "13px" }} />
      </RadarChart>
    </ResponsiveContainer>
  </div>
);

const ArchitectureLayerChart = () => (
  <div className="my-10 rounded-2xl border border-border bg-card p-6">
    <h4 className="text-base font-bold text-foreground mb-1">
      Enterprise AI Security Layers: Adoption Rate vs. Business Impact
    </h4>
    <p className="text-xs text-muted-foreground mb-6">
      Percentage of Fortune 500 enterprises — Deloitte AI Governance Survey 2024
    </p>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={architectureLayerData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal stroke="hsl(214, 25%, 90%)" />
        <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" unit="%" />
        <YAxis dataKey="layer" type="category" width={140} tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" />
        <Tooltip contentStyle={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(214, 25%, 90%)", borderRadius: "8px", fontSize: "13px" }} formatter={(v: number, name: string) => [`${v}%`, name === "adoption" ? "Adoption Rate" : "Business Impact"]} />
        <Legend formatter={(v) => (v === "adoption" ? "Adoption Rate" : "Business Impact")} wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="adoption" fill={COLORS.primary} radius={[0, 4, 4, 0]} barSize={12} />
        <Bar dataKey="impact" fill={COLORS.secondary} radius={[0, 4, 4, 0]} barSize={12} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const SecureArchitectureArticle = () => {
  return (
    <div className="space-y-8">
      {/* Lead */}
      <p className="text-lg leading-relaxed text-foreground">
        As enterprises race to deploy AI agents, a critical question is being overlooked:
        <strong> how do you build AI systems that are secure by design, not bolted on after the fact?</strong>{" "}
        The average cost of an AI-related data breach reached $5.12 million in 2025, yet organizations
        with security-first architectures cut that figure by 45%.
      </p>

      <p className="text-lg leading-relaxed text-foreground">
        This isn't about adding firewalls around AI models. It's about architecting systems where
        security, governance, and scalability are structural properties — not afterthoughts. Here's
        the practical blueprint enterprise leaders need.
      </p>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 my-10">
        <BlogStatCard value="$5.12M" label="Avg. AI-related breach cost in 2025" source="IBM Security, 2025" />
        <BlogStatCard value="45%" label="Cost reduction with secure architecture" source="IBM Cost of Data Breach" />
        <BlogStatCard value="67%" label="Enterprises lack AI governance framework" source="Gartner AI Survey, 2024" />
      </div>

      {/* Section 1 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        Why AI Security Is Architecturally Different
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        Traditional application security focuses on perimeter defense — firewalls, authentication,
        encryption at rest. AI systems introduce fundamentally new attack surfaces that these
        controls don't address:
      </p>

      <div className="grid gap-4 md:grid-cols-2 my-8">
        {[
          { icon: AlertTriangle, title: "Prompt Injection & Manipulation", desc: "Adversarial inputs that cause agents to bypass safety controls, leak sensitive data, or execute unintended actions. Traditional input validation is insufficient against natural language attacks." },
          { icon: Database, title: "Training Data Poisoning", desc: "Corrupted or biased training data that subtly degrades model accuracy over time. A supply chain attack that's invisible until decisions start going wrong." },
          { icon: Eye, title: "Model Inversion Attacks", desc: "Techniques that extract private training data from model outputs. Your AI agent could inadvertently expose customer PII, financial records, or trade secrets through its responses." },
          { icon: Globe, title: "Cross-System Privilege Escalation", desc: "AI agents with API access to multiple systems create transitive trust chains. A compromised agent can cascade unauthorized actions across your entire tech stack." },
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
        quote="By 2026, organizations that fail to implement AI-specific security controls will experience 3x more AI-related security incidents than those that do, resulting in significant financial and reputational damage."
        author="Gartner"
        role="Predicts 2025: AI Security & Risk Management"
      />

      <BreachCostChart />

      {/* Section 2 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        The Six-Layer Secure AI Architecture
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        Based on the NIST AI Risk Management Framework, the OWASP LLM Top 10, and real-world
        enterprise deployments, secure AI agent architectures follow a six-layer model. Each
        layer addresses a distinct category of risk:
      </p>

      <div className="space-y-6 my-8">
        {[
          { num: "01", title: "Governance & Policy Layer", desc: "Define what agents are allowed to do before they're built. This includes decision boundaries, data access policies, escalation rules, and compliance requirements. Governance isn't bureaucracy — it's the architectural blueprint that constrains agent behavior within acceptable parameters.", color: "primary" },
          { num: "02", title: "Identity & Access Management", desc: "Every agent operates with a scoped identity — just like a human employee with role-based permissions. Implement least-privilege access, short-lived tokens, and audit-ready authentication for every system an agent touches. No agent should have standing admin access to anything.", color: "primary" },
          { num: "03", title: "Data Security & Privacy", desc: "Enforce data classification at the pipeline level. PII, financial data, and regulated information must be tokenized or redacted before reaching agent models. Implement data lineage tracking so you can prove exactly what data influenced every decision.", color: "primary" },
          { num: "04", title: "Model Security & Integrity", desc: "Protect against prompt injection with layered input validation, output filtering, and adversarial testing. Implement model versioning with cryptographic signing. Every model change should be traceable, reversible, and tested against a security benchmark.", color: "primary" },
          { num: "05", title: "Runtime Isolation & Sandboxing", desc: "Run agents in isolated execution environments with strict resource limits. No agent should be able to access another agent's memory, modify its own code, or establish network connections beyond its approved API endpoints. Container-level isolation is the minimum.", color: "primary" },
          { num: "06", title: "Observability & Audit", desc: "Log every decision, every API call, every data access. Not just for debugging — for compliance, incident response, and continuous security improvement. Implement anomaly detection on agent behavior patterns to catch compromises before they cause damage.", color: "primary" },
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

      <ArchitectureLayerChart />

      <BlogKeyInsight title="Architecture Insight">
        <p>
          The biggest gap is in Runtime Isolation — only 58% of enterprises implement it, yet it has
          an 82% impact score. This is the lowest-hanging fruit for organizations looking to
          materially improve their AI security posture without major infrastructure changes.
        </p>
      </BlogKeyInsight>

      {/* Section 3 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        Scalability Without Sacrificing Security
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        The most common objection to secure AI architecture is that it slows things down. The data
        says otherwise. Organizations with mature AI security frameworks deploy new agents
        <strong> 2.3x faster</strong> than those without — because security guardrails eliminate
        the review bottlenecks and rollback cycles that plague ad-hoc deployments.
      </p>

      <div className="my-8 overflow-hidden rounded-xl border border-border">
        <div className="grid grid-cols-3 gap-px bg-border">
          <div className="bg-muted p-4 font-bold text-sm text-foreground">Metric</div>
          <div className="bg-muted p-4 font-bold text-sm text-muted-foreground text-center">Ad-Hoc Security</div>
          <div className="bg-muted p-4 font-bold text-sm text-primary text-center">Architecture-First</div>
          {[
            ["Agent deployment time", "14–21 days", "5–8 days"],
            ["Security incidents per quarter", "4.2 avg.", "0.8 avg."],
            ["Mean time to detect breach", "287 days", "68 days"],
            ["Compliance audit pass rate", "61%", "94%"],
            ["Agent rollback frequency", "31% of deployments", "7% of deployments"],
            ["Cross-team reuse rate", "18% of agents", "72% of agents"],
          ].map(([metric, adhoc, arch], i) => (
            <div key={i} className="contents">
              <div className="bg-card p-4 text-sm font-medium text-foreground border-t border-border">{metric}</div>
              <div className="bg-card p-4 text-sm text-muted-foreground text-center border-t border-border">{adhoc}</div>
              <div className="bg-card p-4 text-sm text-foreground text-center border-t border-border flex items-center justify-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0 hidden sm:block" />
                <span>{arch}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SecurityMaturityRadar />

      {/* Section 4 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        Real-World Architecture Patterns
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        The best enterprise AI architectures share common patterns, regardless of industry:
      </p>

      <div className="my-8 space-y-4">
        {[
          { domain: "Financial Services", pattern: "Zero-Trust Agent Mesh", before: "Monolithic AI service with shared credentials; 287-day average breach detection", after: "Isolated agent pods with per-request authentication; breach detection under 4 hours", source: "Accenture Financial Services Security Report, 2024" },
          { domain: "Healthcare", pattern: "Privacy-Preserving Inference", before: "Patient data sent to cloud AI models; HIPAA compliance gaps in 43% of deployments", after: "Federated learning with on-premise inference; 100% HIPAA compliance, zero data egress", source: "Deloitte Health AI Governance Study, 2024" },
          { domain: "Manufacturing", pattern: "Air-Gapped Decision Agents", before: "Connected AI with full network access; 3 OT security incidents in 12 months", after: "Sandboxed agents with write-only output channels; zero OT incidents in 18 months", source: "McKinsey Smart Manufacturing Report" },
        ].map((item) => (
          <div key={item.domain} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-1">
              <h4 className="font-bold text-foreground">{item.domain}</h4>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{item.pattern}</span>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-destructive/5 p-3">
                <p className="text-xs font-semibold text-destructive/70 uppercase mb-1">Before</p>
                <p className="text-sm text-foreground/80">{item.before}</p>
              </div>
              <div className="rounded-lg bg-secondary/5 p-3">
                <p className="text-xs font-semibold text-secondary uppercase mb-1">After</p>
                <p className="text-sm text-foreground/80">{item.after}</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground italic">{item.source}</p>
          </div>
        ))}
      </div>

      {/* Stats 2 */}
      <div className="grid gap-4 sm:grid-cols-3 my-10">
        <BlogStatCard value="2.3×" label="Faster agent deployment with secure architecture" source="Forrester, 2024" />
        <BlogStatCard value="68 days" label="Mean breach detection (vs. 287 days ad-hoc)" source="IBM Security" />
        <BlogStatCard value="94%" label="Compliance audit pass rate" source="Deloitte AI Governance" />
      </div>

      {/* Section 5 */}
      <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12 pt-6 border-t border-border">
        A Practical Implementation Roadmap
      </h2>

      <p className="text-base leading-relaxed text-foreground/90">
        Building a secure, scalable AI architecture doesn't happen overnight. The most successful
        enterprises follow a phased approach that builds security maturity progressively:
      </p>

      <div className="my-8 space-y-1">
        {[
          { phase: "Phase 1: Foundation (Weeks 1–4)", desc: "Establish governance policies, implement identity management for agents, and set up comprehensive audit logging. This phase alone reduces security risk by 40% according to NIST benchmarks." },
          { phase: "Phase 2: Hardening (Weeks 5–10)", desc: "Deploy runtime isolation, implement prompt injection defenses, and establish data classification pipelines. Begin adversarial testing against OWASP LLM Top 10 attack vectors." },
          { phase: "Phase 3: Scale (Weeks 11–16)", desc: "Build reusable security templates for rapid agent deployment. Implement automated compliance scanning and anomaly detection. Enable cross-team agent reuse with pre-approved security patterns." },
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
        quote="Security is not a feature you add to AI systems. It's a property of the architecture itself. Organizations that treat AI security as a bolt-on will spend 3x more on incident response than those who build it in from day one."
        author="NIST"
        role="AI Risk Management Framework, 2024"
      />

      <BlogKeyInsight title="The Bottom Line">
        <p>
          The enterprises that will win with AI agents are not the ones that deploy fastest — they're
          the ones that deploy most securely. A well-architected AI platform becomes a force multiplier:
          every new agent inherits the security, governance, and scalability properties of the platform.
        </p>
        <p className="mt-2">
          The choice isn't between speed and security. With the right architecture, security
          <em> enables</em> speed. Start with the foundation, and the rest follows.
        </p>
      </BlogKeyInsight>
    </div>
  );
};

export default SecureArchitectureArticle;
