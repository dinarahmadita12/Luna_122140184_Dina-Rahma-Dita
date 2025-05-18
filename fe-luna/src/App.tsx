
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { WellnessProvider } from "@/contexts/WellnessContext";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import CalendarPage from "./pages/CalendarPage";
import MoodPage from "./pages/MoodPage";
import SymptomsPage from "./pages/SymptomsPage";
import MedicationsPage from "./pages/MedicationsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <WellnessProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/mood" element={<MoodPage />} />
                <Route path="/symptoms" element={<SymptomsPage />} />
                <Route path="/medications" element={<MedicationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </WellnessProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
