import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface ClientOutcome {
  client: string;
  stat: string;
  statLabel: string;
  quote: string;
  author: string;
  borderRadius: string;
}

const CLIENT_OUTCOMES: ClientOutcome[] = [
  {
    client: "Roadmaster",
    stat: "42%",
    statLabel: "Fleet Idle Time Reduced",
    quote: "GrowthMates gave us instant visibility over 500+ vehicles and eliminated manual dispatch friction.",
    author: "VP of Logistics Operations",
    borderRadius: "48px 48px 12px 48px",
  },
  {
    client: "DigitXl",
    stat: "94%",
    statLabel: "Automated Order Routing",
    quote: "Our operational bottleneck vanished overnight. Order processing speed increased by 4x across peak season.",
    author: "Chief Technology Officer",
    borderRadius: "48px 12px 48px 48px",
  },
  {
    client: "Lumiland",
    stat: "3.8x",
    statLabel: "Faster RMA Resolution",
    quote: "The customer RMA and fraud prevention agents handle support tickets seamlessly with zero human delay.",
    author: "Head of E-Commerce",
    borderRadius: "12px 48px 48px 48px",
  },
  {
    client: "Linfox",
    stat: "99.2%",
    statLabel: "On-Time Dispatch Rate",
    quote: "An indispensable platform for multi-modal freight networks. Real-time rate quoting has boosted our margins.",
    author: "Director of Supply Chain",
    borderRadius: "48px 48px 48px 12px",
  },
];

const ProofBlobs = () => {
  return (
    <section className="bg-bg-base py-20 md:py-28 border-b border-border-subtle overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block rounded-full bg-accent-dim px-3.5 py-1 text-xs font-semibold text-accent mb-3">
            Client Proof &amp; Outcomes
          </span>
          <h2 className="text-3xl font-extrabold text-fg-default sm:text-5xl font-display tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-3 text-base text-fg-dim">
            Here's how enterprise transportation and retail teams achieve measurable impact with GrowthMates AI.
          </p>
        </div>

        {/* Asymmetric Organic Blob Cards Row */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto items-stretch">
          {CLIENT_OUTCOMES.map((item, idx) => {
            const isOffset = idx % 2 === 1;

            return (
              <motion.div
                key={item.client}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ borderRadius: item.borderRadius }}
                className={`bg-bg-surface border border-border-subtle p-7 shadow-raised flex flex-col justify-between transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 ${
                  isOffset ? "lg:translate-y-4" : ""
                }`}
              >
                <div>
                  {/* Client Name Badge */}
                  <div className="flex items-center justify-between border-b border-border-subtle pb-3 mb-5">
                    <span className="text-lg font-black text-fg-default font-display tracking-wide">
                      {item.client}
                    </span>
                    <Quote className="h-4 w-4 text-accent" />
                  </div>

                  {/* Big Stat */}
                  <div className="text-4xl font-extrabold text-accent font-display tracking-tight">
                    {item.stat}
                  </div>
                  <div className="text-xs font-semibold text-fg-default mt-1 mb-4 uppercase tracking-wider">
                    {item.statLabel}
                  </div>

                  {/* Quote */}
                  <p className="text-xs text-fg-dim leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <p className="text-[11px] font-mono text-fg-dimmer">
                    — {item.author}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProofBlobs;
