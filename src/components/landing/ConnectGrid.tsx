import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Layers, Database, Cpu, Globe } from "lucide-react";

interface IntegrationItem {
  name: string;
  category: "erp" | "accounting" | "ai" | "cloud" | "commerce";
  mcpReady: boolean;
}

const INTEGRATIONS: IntegrationItem[] = [
  { name: "TruckMate", category: "erp", mcpReady: true },
  { name: "Google Maps", category: "erp", mcpReady: true },
  { name: "Xero", category: "accounting", mcpReady: true },
  { name: "Blue Yonder", category: "erp", mcpReady: true },
  { name: "Microsoft 365", category: "cloud", mcpReady: true },
  { name: "Salesforce", category: "erp", mcpReady: true },
  
  { name: "SAP ERP", category: "erp", mcpReady: true },
  { name: "Oracle TMS", category: "erp", mcpReady: true },
  { name: "QuickBooks", category: "accounting", mcpReady: true },
  { name: "Slack", category: "cloud", mcpReady: true },
  { name: "OpenAI GPT-4o", category: "ai", mcpReady: true },
  { name: "Google Gemini 3.1", category: "ai", mcpReady: true },
  
  { name: "Anthropic Claude", category: "ai", mcpReady: true },
  { name: "AWS Cloud", category: "cloud", mcpReady: true },
  { name: "Microsoft Azure", category: "cloud", mcpReady: true },
  { name: "Shopify", category: "commerce", mcpReady: true },
  { name: "WooCommerce", category: "commerce", mcpReady: true },
  { name: "Stripe", category: "accounting", mcpReady: true },
  
  { name: "HubSpot", category: "erp", mcpReady: true },
  { name: "Zapier", category: "cloud", mcpReady: true },
  { name: "PostgreSQL", category: "cloud", mcpReady: true },
  { name: "Snowflake", category: "cloud", mcpReady: true },
  { name: "Power BI", category: "cloud", mcpReady: true },
  { name: "Tableau", category: "cloud", mcpReady: true },
  
  { name: "Twilio", category: "cloud", mcpReady: true },
  { name: "SendGrid", category: "cloud", mcpReady: true },
  { name: "Jira", category: "cloud", mcpReady: true },
  { name: "Notion", category: "cloud", mcpReady: true },
  { name: "Airtable", category: "cloud", mcpReady: true },
  { name: "Monday.com", category: "cloud", mcpReady: true },
];

const CATEGORIES = [
  { id: "all", label: "All Connectors" },
  { id: "erp", label: "ERP & TMS" },
  { id: "accounting", label: "Accounting" },
  { id: "ai", label: "AI Models" },
  { id: "cloud", label: "Cloud & DB" },
  { id: "commerce", label: "E-Commerce" },
];

const ConnectGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredIntegrations = INTEGRATIONS.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="integrations" className="bg-[#FAF9F6] py-20 md:py-28 border-b border-[#E7E5DE] text-[#14171F]">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center mb-12 space-y-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF1FF] border border-[#2E5EFF]/20 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#2E5EFF]">
            <Globe className="h-3.5 w-3.5" /> ECOSYSTEM GATEWAY
          </span>
          <h2 className="text-4xl font-extrabold text-[#14171F] sm:text-5xl font-display tracking-tight">
            Connect Tools. <span className="text-[#2E5EFF]">Scale Agents.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5B616E] max-w-xl mx-auto font-body">
            GrowthMates integrates natively with the world's leading ERP, TMS, cloud infrastructure, and AI model providers.
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
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#2E5EFF] text-white shadow-sm"
                    : "bg-white border border-[#E7E5DE] text-[#5B616E] hover:border-[#2E5EFF] hover:text-[#2E5EFF]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dense Bordered Connector Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3.5 max-w-6xl mx-auto">
          {filteredIntegrations.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: idx * 0.015 }}
              className="group relative flex flex-col items-center justify-between p-4 rounded-2xl bg-white border border-[#E7E5DE] shadow-xs hover:border-[#2E5EFF] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 min-h-[90px]"
            >
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span className="text-xs font-mono font-bold text-[#14171F] group-hover:text-[#2E5EFF] transition-colors truncate">
                  {item.name}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#1FAA59] shrink-0" title="Active Connector" />
              </div>

              <div className="mt-3 flex items-center justify-between w-full pt-2 border-t border-[#E7E5DE]/60">
                <span className="text-[10px] font-mono text-[#8B8F99] uppercase">MCP 1.0</span>
                <CheckCircle2 className="h-3.5 w-3.5 text-[#2E5EFF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* MCP Gateway Specification Footer Banner */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl bg-[#16214F] text-white p-7 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#2E5EFF]/30">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#7C97FF] uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-[#FF6A3D]" /> MODEL CONTEXT PROTOCOL (MCP 1.0)
            </div>
            <h4 className="text-lg font-bold font-display text-white">
              Zero-Friction Gateway Connector
            </h4>
            <p className="text-xs text-white/70 max-w-xl">
              Connect any REST, GraphQL, or SQL database in under 5 minutes with zero code changes and SOC2 security compliance.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#2E5EFF] px-6 py-3 text-xs font-bold text-white hover:bg-[#1B3BB3] transition-all hover:scale-105 shrink-0 shadow-md"
          >
            Explore MCP Spec <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ConnectGrid;
