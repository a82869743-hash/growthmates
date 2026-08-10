import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/common/ScrollToTop";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import ROICalculator from "./pages/ROICalculator";
import Contact from "./pages/Contact";
import Roadmap from "./pages/Roadmap";
import Assessment from "./pages/Assessment";
import Blog from "./pages/Blog";
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/megatrans" element={<MegaTrans />} />
          <Route path="/blog" element={<Blog />} />
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
