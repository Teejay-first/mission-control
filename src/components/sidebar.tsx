"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/tasks", label: "Tasks", icon: "▣" },
  { href: "/projects", label: "Projects", icon: "◈" },
  { href: "/memory", label: "Memory", icon: "◉" },
  { href: "/team", label: "Team", icon: "◈" },
  { href: "/office", label: "Office", icon: "◇" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#0a0a0a] border-r border-[#222222] fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-[#222222]">
        <h1 className="text-[#00ff88] text-lg font-bold tracking-wider glow-green-text">
          MISSION CONTROL
        </h1>
        <p className="text-[#888888] text-xs mt-1">Hermes Agent v1.0</p>
      </div>

      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 mb-2 rounded transition-all ${
                isActive
                  ? "bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30"
                  : "text-[#888888] hover:text-[#e0e0e0] hover:bg-[#161616]"
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#222222]">
        <div className="text-[#888888] text-xs space-y-1">
          <div className="flex justify-between">
            <span>Status:</span>
            <span className="text-[#00ff88]">● Active</span>
          </div>
          <div className="flex justify-between">
            <span>Sessions:</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
