
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Explore from "./pages/Explore";
import Services from "./pages/Services"; 
import ExperienceDetail from "./pages/ExperienceDetail";
import Bookings from "./pages/Bookings";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/explore" replace />} 
          />
          <Route 
            path="/explore" 
            element={
              <Layout fullWidth>
                <Explore />
              </Layout>
            } 
          />
          <Route 
            path="/services" 
            element={
              <Layout>
                <Services />
              </Layout>
            } 
          />
          <Route 
            path="/experience/:id" 
            element={
              <Layout>
                <ExperienceDetail />
              </Layout>
            } 
          />
          <Route 
            path="/bookings" 
            element={
              <Layout>
                <Bookings />
              </Layout>
            } 
          />
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />
          <Route 
            path="/profile" 
            element={
              <Layout>
              <Profile />              </Layout>
            } 
          />
            <Route            path="*" 
            element={
              <Layout>
                <NotFound />
              </Layout>
            } 
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
