import Navbar from "@/components/landing/Navbar";
import AgentConsoleHero from "@/components/landing/AgentConsoleHero";
import AgentPromptLauncher from "@/components/landing/AgentPromptLauncher";
import PoweredByPlatformGrid from "@/components/landing/PoweredByPlatformGrid";
import SpotlightFeatures from "@/components/landing/SpotlightFeatures";
import AgentDirectory from "@/components/landing/AgentDirectory";
import SystemTrace from "@/components/landing/SystemTrace";
import InteractivePlatformStack from "@/components/landing/InteractivePlatformStack";
import ConnectGrid from "@/components/landing/ConnectGrid";
import ProofBlobs from "@/components/landing/ProofBlobs";
import LiveCTA from "@/components/landing/LiveCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-bg-base text-fg-default font-body antialiased">
      <Navbar />
      <main>
        <AgentConsoleHero />
        <AgentPromptLauncher />
        <PoweredByPlatformGrid />
        <SpotlightFeatures />
        <AgentDirectory />
        <SystemTrace />
        <InteractivePlatformStack />
        <ConnectGrid />
        <ProofBlobs />
        <LiveCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
