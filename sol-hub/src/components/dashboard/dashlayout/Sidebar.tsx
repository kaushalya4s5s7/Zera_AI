"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Code2,
  User,
  FileText,
  BookOpen,
  FlaskConical,
  Shield,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Build",
      path: "/pages/dashboard/",
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      name: "Analytics",
      path: "/pages/dashboard/build",
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "Profile",
      path: "/pages/dashboard/profile",
      icon: <User className="w-5 h-5" />,
    },
    {
      name: "Reports",
      path: "/pages/dashboard/reports",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "Documentation",
      path: "/pages/dashboard/docs",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      name: "Test Suite",
      path: "/pages/dashboard/test",
      icon: <FlaskConical className="w-5 h-5" />,
    },
    {
      name: "Audit",
      path: "/pages/dashboard/audit",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      name: "Settings",
      path: "/pages/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <aside className="bg-sidebar w-64 p-5 shadow-lg border-r border-sidebar-border flex flex-col z-10">
      <div className="flex items-center gap-3 mb-8 px-4 pt-2">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <Shield className="w-5 h-5 text-black" />
        </div>
        <h1 className="text-xl font-bold text-sidebar-foreground">
          SecureWeb3
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-item ${isActive ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-5 border-t border-sidebar-border">
        <div className="sidebar-item">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <span>Help & Support</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
