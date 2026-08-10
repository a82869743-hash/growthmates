import { motion } from "framer-motion";
import { CheckSquare, Sparkles, Smartphone, ShieldCheck, ArrowRight, Layers, Database, Lock } from "lucide-react";

export const IsGrowthMatesRightForMe = () => {
  const checkItems = [
    {
      title: "Flexible Deployment",
      text: "Flexibly use GrowthMates AI as your end-to-end Autonomous Operations Platform, as a point solution for a specific dispatch or RMA use-case, or as a reference architecture to transform your business.",
    },
    {
      title: "Technological & Financial Freedom",
      text: "Gain total technological and financial freedom with a cloud, hardware, and deployment agnostic technology architecture.",
    },
    {
      title: "Total Control Over Platform",
      text: "Have total control over your platform — from fully managed cloud agents to fully self-managed on-premise MCP gateways, and everything in between.",
    },
    {
      title: "Unified Decision Intelligence",
      text: "Deliver unified decision intelligence on top of your existing SAP, Oracle, Xero, and TMS store infrastructure without disruptive rip & replace strategies.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAF9F6] border-b border-[#E7E5DE] text-[#14171F]">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Toshiba Style Modern Vector Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-md h-[400px] flex items-center justify-center">
              
              {/* Phone Mockup Frame */}
              <div className="relative w-56 h-[380px] rounded-[36px] border-4 border-[#14171F] bg-white p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* Phone Speaker Notch */}
                <div className="w-20 h-4 bg-[#14171F] rounded-full mx-auto mb-4" />
                
                {/* Phone Screen UI */}
                <div className="space-y-3">
                  <div className="h-6 w-3/4 bg-[#EEF1FF] rounded-md border border-[#2E5EFF]/20" />
                  <div className="h-14 w-full bg-[#16214F] rounded-xl p-2.5 text-white flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[#FF6A3D] flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-2.5 w-20 bg-white/80 rounded" />
                      <div className="h-2 w-14 bg-white/40 rounded" />
                    </div>
                  </div>
                  
                  {/* Floating Action Cards */}
                  <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E7E5DE] text-[10px] font-mono text-[#5B616E]">
                    ✓ Route optimized: -42 km
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E7E5DE] text-[10px] font-mono text-[#5B616E]">
                    ✓ RMA refund: $185.00 auto-issued
                  </div>
                </div>

                <div className="h-1 w-24 bg-[#14171F]/30 rounded-full mx-auto mt-2" />
              </div>

              {/* Surrounding Floating Illustration Node Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-8 left-4 rounded-2xl bg-white border border-[#E7E5DE] p-3 shadow-lg flex items-center gap-2"
              >
                <div className="h-8 w-8 rounded-xl bg-[#2E5EFF] text-white flex items-center justify-center">
                  <Layers className="h-4 w-4" />
                </div>
                <div className="text-xs font-mono font-bold text-[#14171F]">MCP 1.0 Gateway</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute bottom-12 right-2 rounded-2xl bg-white border border-[#E7E5DE] p-3 shadow-lg flex items-center gap-2"
              >
                <div className="h-8 w-8 rounded-xl bg-[#FF6A3D] text-white flex items-center justify-center">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="text-xs font-mono font-bold text-[#14171F]">SOC2 Compliant</div>
              </motion.div>

            </div>
          </motion.div>

          {/* Right Column: Toshiba Style Checkbox Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[#FF6A3D] uppercase tracking-wider block">
                PLATFORM FIT &amp; ADAPTABILITY
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14171F] font-display tracking-tight leading-tight">
                Is GrowthMates AI <span className="text-[#2E5EFF]">Right for Me?</span>
              </h2>
              <p className="text-base sm:text-lg text-[#5B616E] font-body leading-relaxed">
                Align your Autonomous Supply Chain &amp; Operational Platform to your business strategy, not the other way around. With GrowthMates AI you can:
              </p>
            </div>

            {/* Checkbox Grid Items (Toshiba Style Red Checkbox Boxes) */}
            <div className="space-y-5 pt-2">
              {checkItems.map((item, idx) => (
                <div key={item.title} className="flex items-start gap-4">
                  {/* Square Checkbox Icon matching Toshiba styling */}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FF6A3D] text-white shadow-sm mt-0.5">
                    <CheckSquare className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#14171F] font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5B616E] leading-relaxed font-body">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#2E5EFF] text-white px-7 py-3.5 text-sm font-bold shadow-lg hover:bg-[#1B3BB3] transition-all hover:scale-105"
              >
                Schedule an Architecture Consult <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default IsGrowthMatesRightForMe;
