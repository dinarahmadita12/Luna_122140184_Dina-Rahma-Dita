
import { Calendar, Heart, Pill, Smile, ThermometerSun, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <Heart className="h-4 w-4" />
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: <Calendar className="h-4 w-4" />
  },
  {
    name: "Mood",
    path: "/mood",
    icon: <Smile className="h-4 w-4" />
  },
  {
    name: "Symptoms",
    path: "/symptoms",
    icon: <ThermometerSun className="h-4 w-4" />
  },
  {
    name: "Medications",
    path: "/medications",
    icon: <Pill className="h-4 w-4" />
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings className="h-4 w-4" />
  }
];

export function NavigationMenu() {
  const location = useLocation();

  return (
    <div className="px-3 py-2">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
