"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  FileText,
  Calendar,
  Users,
  Settings,
  LogOut,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-sky-400",
  },
  {
    label: "Cases & Blotters",
    icon: FileText,
    href: "/dashboard/cases",
    color: "text-violet-400",
  },
  {
    label: "Hearings",
    icon: Calendar,
    href: "/dashboard/hearings",
    color: "text-pink-400",
  },
  {
    label: "Lupon Members",
    icon: Users,
    href: "/dashboard/members",
    color: "text-orange-400",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-slate-400",
  },
];

import { useClerk } from "@clerk/nextjs";

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    await signOut({ redirectUrl: "/" });
  };

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-950 text-white border-r border-slate-700/50">
      <div className="px-4 py-2 flex-1">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 pl-2 mb-10 group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
            <Scale className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">KP System</h1>
            <p className="text-xs text-slate-500 leading-none mt-0.5">
              Katarungang Pambarangay
            </p>
          </div>
        </Link>

        {/* Nav links */}
        <div className="space-y-1">
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
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition-all duration-150",
                  isActive
                    ? "text-white bg-white/10 shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon
                    className={cn(
                      "h-5 w-5 mr-3 transition-colors",
                      isActive ? route.color : "text-zinc-600 group-hover:text-zinc-400"
                    )}
                  />
                  {route.label}
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 py-2 border-t border-slate-700/50">
        <Button
          variant="ghost"
          className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};
