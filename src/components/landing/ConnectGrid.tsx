import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Layers, Database, Cpu, Globe, Truck, MapPin, DollarSign, Bot, Zap, Lock, Terminal, X, Activity
} from "lucide-react";

interface IntegrationItem {
  name: string;
  category: "erp" | "accounting" | "ai" | "cloud" | "commerce";
  mcpReady: boolean;
  icon: any;
  color: string;
}

const INTEGRATIONS: IntegrationItem[] = [
  { name: "TruckMate", category: "erp", mcpReady: true, icon: Truck, color: "#2E5EFF" },
  { name: "Google Maps", category: "erp", mcpReady: true, icon: MapPin, color: "#FF6A3D" },
  { name: "Xero", category: "accounting", mcpReady: true, icon: DollarSign, color: "#1FAA59" },
  { name: "Blue Yonder", category: "erp", mcpReady: true, icon: Layers, color: "#2E5EFF" },
  { name: "Microsoft 365", category: "cloud", mcpReady: true, icon: Cpu, color: "#7C97FF" },
  { name: "Salesforce", category: "erp", mcpReady: true, icon: Globe, color: "#2E5EFF" },
  
  { name: "SAP ERP", category: "erp", mcpReady: true, icon: Database, color: "#2E5EFF" },
  { name: "Oracle TMS", category: "erp", mcpReady: true, icon: Truck, color: "#FF6A3D" },
  { name: "QuickBooks", category: "accounting", mcpReady: true, icon: DollarSign, color: "#1FAA59" },
  { name: "Slack", category: "cloud", mcpReady: true, icon: Zap, color: "#FF6A3D" },
  { name: "OpenAI GPT-4o", category: "ai", mcpReady: true, icon: Bot, color: "#1FAA59" },
  { name: "Google Gemini 3.1", category: "ai", mcpReady: true, icon: Sparkles, color: "#2E5EFF" },
  
  { name: "Anthropic Claude", category: "ai", mcpReady: true, icon: Bot, color: "#FF6A3D" },
  { name: "AWS Cloud", category: "cloud", mcpReady: true, icon: Cpu, color: "#FF6A3D" },
  { name: "Microsoft Azure", category: "cloud", mcpReady: true, icon: Database, color: "#2E5EFF" },
  { name: "Shopify", category: "commerce", mcpReady: true, icon: Globe, color: "#1FAA59" },
  { name: "WooCommerce", category: "commerce", mcpReady: true, icon: Globe, color: "#2E5EFF" },
  { name: "Stripe", category: "accounting", mcpReady: true, icon: DollarSign, color: "#2E5EFF" },
  
  { name: "HubSpot", category: "erp", mcpReady: true, icon: Layers, color: "#FF6A3D" },
  { name: "Zapier", category: "cloud", mcpReady: true, icon: Zap, color: "#FF6A3D" },
  { name: "PostgreSQL", category: "cloud", mcpReady: true, icon: Database, color: "#2E5EFF" },
  { name: "Snowflake", category: "cloud", mcpReady: true, icon: Database, color: "#7C97FF" },
  { name: "Power BI", category: "cloud", mcpReady: true, icon: Activity, color: "#FF6A3D" },
  { name: "Tableau", category: "cloud", mcpReady: true, icon: Activity, color: "#2E5EFF" },
  
  { name: "Twilio", category: "cloud", mcpReady: true, icon: Zap, color: "#FF6A3D" },
  { name: "SendGrid", category: "cloud", mcpReady: true, icon: Zap, color: "#2E5EFF" },
  { name: "Jira", category: "cloud", mcpReady: true, icon: Layers, color: "#2E5EFF" },
  { name: "Notion", category: "cloud", mcpReady: true, icon: Terminal, color: "#14171F" },
  { name: "Airtable", category: "cloud", mcpReady: true, icon: Database, color: "#FF6A3D" },
  { name: "Monday.com", category: "cloud", mcpReady: true, icon: Activity, color: "#2E5EFF" },
];

const CATEGORIES = [
  { id: "all", label: "All Connectors", count: 30 },
  { id: "erp", label: "ERP & TMS", count: 6 },
  { id: "accounting", label: "Accounting", count: 4 },
  { id: "ai", label: "AI Models", count: 3 },
  { id: "cloud", label: "Cloud & DB", count: 13 },
  { id: "commerce", label: "E-Commerce", count: 4 },
];

const ConnectGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalItem, setActiveModalItem] = useState<IntegrationItem | null>(null);

  const filteredIntegrations = INTEGRATIONS.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="integrations" className="bg-[#FAF9F6] py-20 md:py-28 border-b border-[#E7E5DE] text-[#14171F] relative">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center mb-12 space-y-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
            <Globe className="h-3.5 w-3.5" /> MCP 1.0 ECOSYSTEM GATEWAY
          </span>
          <h2 className="text-4xl font-extrabold text-[#14171F] sm:text-5xl font-display tracking-tight">
            Connect Tools. <span className="text-[#2E5EFF]">Scale Agents.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5B616E] max-w-xl mx-auto font-body">
            GrowthMates integrates natively with 100+ ERP, TMS, cloud infrastructure, and AI model providers. Click any connector below to inspect live MCP 1.0 telemetry.
          </p>
        </motion.div>

        {/* Search & Category Filter Control Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B8F99]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100+ native connectors (e.g. SAP, Xero, Stripe)..."
              className="w-full rounded-full bg-white border border-[#E7E5DE] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#14171F] placeholder-[#8B8F99] focus:outline-none focus:border-[#2E5EFF] shadow-sm font-body"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-[#2E5EFF] text-white shadow-sm font-bold"
                    : "bg-white border border-[#E7E5DE] text-[#5B616E] hover:border-[#2E5EFF] hover:text-[#2E5EFF]"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-[#FAF9F6] text-[#8B8F99]"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* High-Density Connector Cards with Brand Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3.5 max-w-6xl mx-auto">
          {filteredIntegrations.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.button
                key={item.name}
                type="button"
                onClick={() => setActiveModalItem(item)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: idx * 0.015 }}
                className="group relative flex flex-col justify-between p-4 rounded-2xl bg-white border border-[#E7E5DE] shadow-xs hover:border-[#2E5EFF] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left min-h-[105px]"
              >
                {/* Header: Icon + Connected Dot */}
                <div className="flex items-center justify-between w-full">
                  <div className="h-8 w-8 rounded-xl bg-[#FAF9F6] border border-[#E7E5DE] flex items-center justify-center group-hover:border-[#2E5EFF]/40 transition-colors">
                    <IconComp className="h-4 w-4" style={{ color: item.color }} />
                  </div>
                  <span className="flex h-2 w-2 relative" title="MCP 1.0 Gateway Active">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FAA59] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FAA59]" />
                  </span>
                </div>

                {/* Title */}
                <div className="mt-2">
                  <span className="text-xs font-mono font-bold text-[#14171F] group-hover:text-[#2E5EFF] transition-colors truncate block">
                    {item.name}
                  </span>
                </div>

                {/* Footer Tag */}
                <div className="mt-2 flex items-center justify-between w-full pt-1.5 border-t border-[#E7E5DE]/60 text-[10px] font-mono text-[#8B8F99]">
                  <span>MCP 1.0</span>
                  <span className="text-[#2E5EFF] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Inspect &rarr;
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* MCP Gateway Specification Footer Banner */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-[#16214F] text-white p-7 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#2E5EFF]/30">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#7C97FF] uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-[#FF6A3D]" /> MODEL CONTEXT PROTOCOL (MCP 1.0)
            </div>
            <h4 className="text-lg font-bold font-display text-white">
              Zero-Friction Gateway Connector
            </h4>
            <p className="text-xs text-white/80 max-w-xl font-body">
              Connect any REST, GraphQL, or SQL database in under 5 minutes with zero code changes and SOC2 security compliance.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#2E5EFF] px-7 py-3 text-xs font-bold text-white hover:bg-[#1B3BB3] transition-all hover:scale-105 shrink-0 shadow-md"
          >
            Explore MCP Spec <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>

      {/* Interactive Connector Inspection Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E7E5DE] p-6 sm:p-8 shadow-2xl space-y-6 text-[#14171F]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF9F6] text-[#5B616E] hover:text-[#14171F] border border-[#E7E5DE]"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 border-b border-[#E7E5DE] pb-4">
                <div className="h-10 w-10 rounded-2xl bg-[#EEF1FF] flex items-center justify-center border border-[#2E5EFF]/30">
                  <activeModalItem.icon className="h-5 w-5" style={{ color: activeModalItem.color }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-lg font-display text-[#14171F]">{activeModalItem.name}</h3>
                    <span className="text-[10px] font-mono font-bold text-[#1FAA59] bg-[#1FAA59]/10 px-2 py-0.5 rounded-full">
                      ● Active
                    </span>
                  </div>
                  <p className="text-xs text-[#5B616E] font-mono">MCP 1.0 Gateway Connector</p>
                </div>
              </div>

              {/* Live Simulated JSON-RPC Telemetry Payload */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-[#5B616E]">
                  <span>SIMULATED MCP JSON-RPC PAYLOAD</span>
                  <span className="text-[#2E5EFF]">LATENCY: 12ms</span>
                </div>
                <div className="rounded-2xl bg-[#16214F] p-4 text-xs font-mono text-[#7C97FF] space-y-1 shadow-inner border border-[#2E5EFF]/30">
                  <p><span className="text-[#FF6A3D]">"connector"</span>: <span className="text-white">"{activeModalItem.name} Gateway"</span>,</p>
                  <p><span className="text-[#FF6A3D]">"protocol"</span>: <span className="text-white">"MCP/1.0 (Zero-Trust)"</span>,</p>
                  <p><span className="text-[#FF6A3D]">"auth_method"</span>: <span className="text-white">"OAuth2.0 / SAML2.0 SSO"</span>,</p>
                  <p><span className="text-[#FF6A3D]">"status"</span>: <span className="text-[#1FAA59]">"HEALTHY_CONNECTED"</span>,</p>
                  <p><span className="text-[#FF6A3D]">"sync_interval"</span>: <span className="text-white">"Real-time Event Stream"</span></p>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="rounded-full bg-[#FAF9F6] border border-[#E7E5DE] px-5 py-2.5 text-xs font-bold text-[#5B616E] hover:text-[#14171F]"
                >
                  Close Inspection
                </button>
                <a
                  href="/contact"
                  className="rounded-full bg-[#2E5EFF] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#1B3BB3] transition-all shadow-md flex items-center gap-1.5"
                >
                  Request Native Integration <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ConnectGrid;
