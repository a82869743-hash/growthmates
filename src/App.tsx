import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/common/ScrollToTop";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import ROICalculator from "./pages/ROICalculator";
import Enterprise from "./pages/Enterprise";
import Roadmap from "./pages/Roadmap";
import MegaTrans from "./pages/MegaTrans";
import BlogPost from "./pages/BlogPost";
import BlogAdminPage from "./pages/BlogAdmin";
import NotFound from "./pages/NotFound";
import OAuthConsent from "./pages/OAuthConsent";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/assessment" element={<Navigate to="/roi-calculator?tab=assessment" replace />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/contact" element={<Navigate to="/enterprise" replace />} />
          <Route path="/blog" element={<Navigate to="/enterprise" replace />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/megatrans" element={<MegaTrans />} />
          <Route path="/blog/admin" element={<BlogAdminPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
