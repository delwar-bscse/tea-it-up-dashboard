"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Clock,
  ClipboardList,
  Upload,
  Flag,
  Edit
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    name: "Tea Times",
    icon: Clock,
    href: "/tea-times",
  },
  {
    name: "Requests",
    icon: ClipboardList,
    href: "/requests",
  },
  {
    name: "Edit Club",
    icon: Edit,
    href: "/edit-clubs",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#142d22] text-white flex flex-col h-screen sticky top-0">
      {/* Header / Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-[#2ea268] p-2 rounded-xl">
          <Flag className="w-6 h-6 text-white fill-white/20" />
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">GolfAdmin</h1>
          <p className="text-xs text-[#8e9e97]">Club Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-[#2ea268] text-white shadow-lg shadow-[#2ea268]/20"
                  : "text-[#8e9e97] hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Action */}
      <div className="px-4 pb-6 mt-auto">
        <button className="w-full bg-[#2ea268] hover:bg-[#288c5a] text-white py-3 px-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors duration-200 font-medium relative overflow-hidden group">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            <span>Upload Tee Times</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#8b5cf6]"></div>
        </button>
      </div>

      {/* Footer / Profile */}
      <div className="p-4 border-t border-[#253c31] bg-[#1a332a]">
        <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
          <div className="w-10 h-10 rounded-full bg-[#2ea268] flex items-center justify-center text-white font-bold text-sm shrink-0">
            CA
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-sm truncate">Club Admin</span>
            <span className="text-xs text-[#8e9e97] truncate">admin@golfclub.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;