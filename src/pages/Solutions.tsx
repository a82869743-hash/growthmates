import { DbstNavigation } from "@/components/navigation/DbstNavigation";
import { DbstFooter } from "@/components/navigation/DbstFooter";
import { SolutionCatalog } from "@/components/solutions/SolutionCatalog";
import { ConsultationPanel } from "@/components/landing/ConsultationPanel";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const SolutionsPage = () => {
  useDocumentMeta({
    title: "Solution Catalog | D-BST Solutions",
    description: "Explore our catalog of production-ready software architectures, AI automation engines, and data analytics systems across 7 key industries.",
  });

  return (
    <div className="min-h-screen bg-bg-base text-fg-default font-body antialiased">
      <DbstNavigation />
      
      {/* Hero Header */}
      <section className="py-16 bg-bg-surface border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
              Reusable Enterprise Architectures
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-fg-default tracking-tight">
              D-BST Solution Catalog
            </h1>
            <p className="text-base text-fg-dim leading-relaxed">
              Explore battle-tested technical solution blueprints designed to solve recurring operational bottlenecks in logistics, manufacturing, retail, and financial services.
            </p>
          </div>
        </div>
      </section>

      <main>
        <SolutionCatalog />
        <ConsultationPanel />
      </main>

      <DbstFooter />
    </div>
  );
};

export default SolutionsPage;
