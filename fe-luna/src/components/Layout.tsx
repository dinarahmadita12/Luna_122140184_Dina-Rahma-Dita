
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarTrigger } from "@/components/ui/sidebar";
import { NavigationMenu } from "./NavigationMenu";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Heart, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center px-4 py-4">
              <Heart className="h-8 w-8 text-luna-rose mr-2" />
              <span className="text-xl font-semibold bg-gradient-to-r from-luna-purple to-luna-blue bg-clip-text text-transparent">
                Luna 
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <NavigationMenu />
          </SidebarContent>
          <SidebarFooter>
            <div className="px-3 py-2">
              <Button 
                variant="outline" 
                className="w-full justify-start text-muted-foreground"
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 border-b flex items-center px-6">
            <div className="flex-1 flex">
              <SidebarTrigger />
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
          <footer className="border-t p-4 text-center text-sm text-muted-foreground">
            <p>Luna - Menstrual Cycle Tracking App &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
