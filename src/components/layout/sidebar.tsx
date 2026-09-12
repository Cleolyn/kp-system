"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Calendar,
  Users,
  Settings,
  LogOut,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

const routes = [
  {
    label: "Overview",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Cases & Blotters",
    icon: FileText,
    href: "/dashboard/cases",
  },
  {
    label: "Hearings",
    icon: Calendar,
    href: "/dashboard/hearings",
  },
  {
    label: "Lupon Members",
    icon: Users,
    href: "/dashboard/members",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    await signOut({ redirectUrl: "/" });
  };

  return (
    <div className="flex flex-col h-full bg-white text-[#1c2b33] border-r border-[#f0f2f5] p-5 justify-between">
      <div>
        {/* Brand Crest & Wordmark */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-2 mb-8 group transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0064e0] text-white shadow-xs">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-[#0a1317]">
                KP SYSTEM
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#0064e0]" />
            </div>
            <p className="text-[11px] font-semibold text-[#8899a6] tracking-wide uppercase">
              Katarungang Pambarangay
            </p>
          </div>
        </Link>

        {/* Section Label */}
        <div className="px-3 mb-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#8899a6]">
            Main Menu
          </p>
        </div>

        {/* Pill Nav links */}
        <nav className="space-y-1.5">
          {routes.map((route) => {
            const isActive =
              route.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(route.href);

            return (
              <Link
                href={route.href}
                key={route.href}
                className={cn(
                  "group flex items-center gap-3.5 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-150",
                  isActive
                    ? "bg-[#14161a] text-white shadow-xs"
                    : "text-[#465a65] hover:text-[#0a1317] hover:bg-[#f5f6f8]"
                )}
              >
                <route.icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-colors",
                    isActive ? "text-white" : "text-[#8899a6] group-hover:text-[#0a1317]"
                  )}
                />
                <span className="truncate">{route.label}</span>
                {isActive && (
                  <span className="ml-auto size-1.5 rounded-full bg-[#0064e0]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Statutory Callout & Logout */}
      <div className="space-y-4 pt-4 border-t border-[#f0f2f5]">
        {/* Reassurance Badge Tile */}
        <div className="rounded-2xl bg-[#f5f6f8] p-3.5 border border-[#e4e6eb]/60">
          <div className="flex items-center gap-2 mb-1 text-[#0064e0]">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-[11px] font-bold uppercase tracking-wide">
              RA 7160 Compliant
            </span>
          </div>
          <p className="text-xs text-[#657786] leading-snug">
            Official statutory dispute conciliation & mediation engine.
          </p>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start rounded-full text-[#657786] hover:text-[#e02424] hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </div>
    </div>
  );
};

