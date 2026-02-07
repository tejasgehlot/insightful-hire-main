import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import RoleSelection from "./pages/auth/RoleSelection";
import SignupRecruiter from "./pages/auth/SignupRecruiter";
import SignupCandidate from "./pages/auth/SignupCandidate";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import CandidateDashboard from "./pages/candidate/Dashboard";
import BrowseJD from "./pages/candidate/BrowseJD";
import Assessment from "./pages/candidate/Assessment";
import JDLibrary from "./pages/recruiter/JDLibrary";
import LeaderBoard from "./pages/recruiter/LeaderBoard";
import UploadNew from "./pages/recruiter/UploadNew";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          
          {/* Auth */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/role-selection" element={<RoleSelection />} />
          <Route path="/auth/signup/recruiter" element={<SignupRecruiter />} />
          <Route path="/auth/signup/candidate" element={<SignupCandidate />} />
          
          {/* Candidate */}
          <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
          <Route path="/browse-jd" element={<BrowseJD />} />
          <Route path="/assessment/:jobId" element={<Assessment />} />

          {/* Recruiter */}
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/jd/library" element={<JDLibrary />} />
          <Route path="/jd/new" element={<UploadNew />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
