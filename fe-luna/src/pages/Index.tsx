
import { useAuth } from "@/contexts/AuthContext";
import Dashboard from "./DashboardPage";
import AuthPage from "./AuthPage";

export default function Index() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <AuthPage />;
  }
  
  return <Dashboard />;
}
