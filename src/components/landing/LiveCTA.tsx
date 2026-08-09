import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LiveCTA = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = prompt.trim();
    if (trimmed) {
      navigate(`/contact?query=${encodeURIComponent(trimmed)}`);
    } else {
      navigate("/contact");
    }
  };

  return (
    <section className="bg-accent-deep py-20 md:py-28 text-white relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-accent-on-dark mb-6">
            <Sparkles className="h-3.5 w-3.5 text-accent-on-dark" />
            Ready to Automate?
          </div>

          <h2 className="text-3xl font-extrabold sm:text-5xl font-display tracking-tight leading-tight">
            Tell us what you want to automate.
          </h2>

          <p className="mt-4 text-base text-white/70 max-w-xl mx-auto">
            Test your idea directly or schedule a live working session with our AI solution engineers.
          </p>

          {/* Embedded Mini Agent Prompt Bar */}
          <form
            onSubmit={handlePromptSubmit}
            className="mt-10 max-w-2xl mx-auto rounded-full bg-white/10 border border-white/20 p-2 flex flex-col sm:flex-row items-center gap-2 shadow-floating backdrop-blur-md"
          >
            <div className="flex items-center gap-3 px-4 flex-1 w-full">
              <span className="text-accent-on-dark font-mono font-bold text-sm">&gt;</span>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Automate freight rate quotes &amp; dispatch scheduling..."
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 rounded-full bg-accent px-6 py-3 text-xs font-semibold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 shadow-flat"
            >
              Start Building <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Secondary Action */}
          <div className="mt-8 flex justify-center items-center gap-6">
            <button
              onClick={() =>
                (window as any).Calendly?.initPopupWidget({
                  url: "https://calendly.com/d-bstsolutions/book-your-free-consultation",
                })
              }
              className="text-xs font-semibold text-white/80 hover:text-white underline underline-offset-4 transition-colors"
            >
              Or Book a Live Demo Session &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveCTA;
