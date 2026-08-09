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
  Cell,
  Legend,
} from "recharts";

const marketGrowthData = [
  { year: "2022", agents: 5.2, ipa: 14.1 },
  { year: "2023", agents: 8.4, ipa: 16.3 },
  { year: "2024", agents: 14.1, ipa: 18.8 },
  { year: "2025", agents: 22.6, ipa: 20.5 },
  { year: "2026", agents: 36.8, ipa: 22.1 },
  { year: "2027", agents: 56.2, ipa: 23.4 },
  { year: "2028", agents: 81.5, ipa: 24.2 },
];

const capabilityData = [
  { capability: "Decision Making", agents: 92, ipa: 28 },
  { capability: "Context Awareness", agents: 88, ipa: 35 },
  { capability: "Adaptive Learning", agents: 85, ipa: 22 },
  { capability: "Cross-System Orchestration", agents: 78, ipa: 45 },
  { capability: "Autonomous Execution", agents: 82, ipa: 18 },
];

const COLORS = {
  agents: "hsl(210, 100%, 45%)",
  ipa: "hsl(215, 15%, 65%)",
};

export const MarketGrowthChart = () => (
  <div className="my-10 rounded-2xl border border-border bg-card p-6">
    <h4 className="text-base font-bold text-foreground mb-1">
      AI Agent Market vs. Traditional IPA Market ($B)
    </h4>
    <p className="text-xs text-muted-foreground mb-6">
      Source: Gartner Market Analysis, McKinsey Global AI Survey 2024–2028 projections
    </p>
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={marketGrowthData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="agentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.agents} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS.agents} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 90%)" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" />
        <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" unit="B" />
        <Tooltip
          contentStyle={{
            background: "hsl(0, 0%, 100%)",
            border: "1px solid hsl(214, 25%, 90%)",
            borderRadius: "8px",
            fontSize: "13px",
          }}
          formatter={(value: number, name: string) => [
            `$${value}B`,
            name === "agents" ? "AI Agents" : "Traditional IPA",
          ]}
        />
        <Legend
          formatter={(value) => (value === "agents" ? "AI Agents" : "Traditional IPA")}
          wrapperStyle={{ fontSize: "12px" }}
        />
        <Area
          type="monotone"
          dataKey="agents"
          stroke={COLORS.agents}
          strokeWidth={2.5}
          fill="url(#agentGrad)"
        />
        <Area
          type="monotone"
          dataKey="ipa"
          stroke={COLORS.ipa}
          strokeWidth={2}
          fill="transparent"
          strokeDasharray="5 5"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const CapabilityComparisonChart = () => (
  <div className="my-10 rounded-2xl border border-border bg-card p-6">
    <h4 className="text-base font-bold text-foreground mb-1">
      Capability Benchmark: AI Agents vs. Traditional IPA
    </h4>
    <p className="text-xs text-muted-foreground mb-6">
      Percentage of enterprise scenarios handled autonomously — Forrester Research 2025
    </p>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={capabilityData}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal stroke="hsl(214, 25%, 90%)" />
        <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(215, 15%, 50%)" unit="%" />
        <YAxis
          dataKey="capability"
          type="category"
          width={160}
          tick={{ fontSize: 11 }}
          stroke="hsl(215, 15%, 50%)"
        />
        <Tooltip
          contentStyle={{
            background: "hsl(0, 0%, 100%)",
            border: "1px solid hsl(214, 25%, 90%)",
            borderRadius: "8px",
            fontSize: "13px",
          }}
          formatter={(value: number, name: string) => [
            `${value}%`,
            name === "agents" ? "AI Agents" : "Traditional IPA",
          ]}
        />
        <Legend
          formatter={(value) => (value === "agents" ? "AI Agents" : "Traditional IPA")}
          wrapperStyle={{ fontSize: "12px" }}
        />
        <Bar dataKey="agents" fill={COLORS.agents} radius={[0, 4, 4, 0]} barSize={14} />
        <Bar dataKey="ipa" fill={COLORS.ipa} radius={[0, 4, 4, 0]} barSize={14} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
