import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Universities from "./pages/Universities";
import Visa from "./pages/Visa";
import Finances from "./pages/Finances";
import Documents from "./pages/Documents";
import Resources from "./pages/Resources";
import AITools from "./pages/AITools";
import AskAI from "./pages/AskAI";
import Profile from "./pages/Profile";
import ProfileBuilder from "./pages/ProfileBuilder";
import Settings from "./pages/Settings";
import SerbiaInterest from "./pages/SerbiaInterest";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import CancellationPolicy from "./pages/CancellationPolicy";
import Pricing from "./pages/Pricing";
import Preferences from "./pages/Preferences";
import Discover from "./pages/Discover";
import Recommendations from "./pages/Recommendations";
import Saved from "./pages/Saved";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/cancellation" element={<CancellationPolicy />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/" element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="applications" element={<Applications />} />
              <Route path="universities" element={<Universities />} />
              <Route path="visa" element={<Visa />} />
              <Route path="finances" element={<Finances />} />
              <Route path="documents" element={<Documents />} />
              <Route path="resources" element={<Resources />} />
              <Route path="ai-tools" element={<AITools />} />
              <Route path="ask-ai" element={<AskAI />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profilebuilder" element={<ProfileBuilder />} />
              <Route path="settings" element={<Settings />} />
              <Route path="serbia-interest" element={<SerbiaInterest />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
