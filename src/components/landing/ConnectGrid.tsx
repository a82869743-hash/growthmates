import { motion } from "framer-motion";

const INTEGRATIONS = [
  "TruckMate", "Google Maps", "Xero", "Blue Yonder", "Microsoft 365", "Salesforce",
  "SAP", "Oracle", "QuickBooks", "Slack", "OpenAI", "Google Gemini",
  "Anthropic", "AWS", "Azure", "Shopify", "WooCommerce", "Stripe",
  "HubSpot", "Zapier", "PostgreSQL", "Snowflake", "Power BI", "Tableau",
  "Twilio", "SendGrid", "Jira", "Notion", "Airtable", "Monday.com"
];

const ConnectGrid = () => {
  return (
    <section id="integrations" className="bg-bg-muted py-20 md:py-28 border-b border-border-subtle overflow-hidden">
      <div className="container relative">
        {/* Header Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center mb-14"
        >
          <span className="inline-block rounded-full bg-accent-dim px-3.5 py-1 text-xs font-semibold text-accent mb-3">
            Ecosystem Gateway
          </span>
          <h2 className="text-3xl font-extrabold text-fg-default sm:text-5xl font-display tracking-tight">
            Connect Tools. <span className="text-accent">Scale Agents.</span>
          </h2>
          <p className="mt-3 text-base text-fg-dim max-w-xl mx-auto">
            GrowthMates integrates natively with the world's leading ERP, TMS, cloud infrastructure, and AI model providers.
          </p>
        </motion.div>

        {/* Dense Bordered Grid Wall */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
          {INTEGRATIONS.map((name, idx) => {
            // Opacity calculation based on position relative to center for Replit depth effect
            const row = Math.floor(idx / 6);
            const col = idx % 6;
            const distFromCenter = Math.sqrt(Math.pow(row - 2, 2) + Math.pow(col - 2.5, 2));
            const opacityClass =
              distFromCenter > 2.5
                ? "opacity-40 hover:opacity-100"
                : distFromCenter > 1.5
                ? "opacity-70 hover:opacity-100"
                : "opacity-100";

            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                className={`flex items-center justify-center p-4 rounded-md bg-bg-surface border border-border-subtle shadow-flat transition-all duration-200 hover:border-accent/40 hover:shadow-raised ${opacityClass}`}
              >
                <span className="text-xs font-mono font-semibold text-fg-default text-center truncate">
                  {name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConnectGrid;
