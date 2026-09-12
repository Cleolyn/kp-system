"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Search, Plus, Bell, HelpCircle } from "lucide-react";
import { UserButton, Show, SignInButton } from "@clerk/nextjs";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#f0f2f5] bg-white/95 px-6 backdrop-blur-md">
      {/* Left: Mobile Menu & Search Pill */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onMenuClick}
          className="md:hidden flex size-10 items-center justify-center rounded-full border border-[#e4e6eb] bg-white text-[#1c2b33] hover:bg-[#f5f6f8]"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Search Pill */}
        <div className="relative w-full hidden sm:block">
          <div className="flex items-center gap-2.5 rounded-full bg-[#f5f6f8] border border-transparent hover:border-[#e4e6eb] px-4 py-2 text-xs font-semibold text-[#8899a6] transition-all cursor-pointer">
            <Search className="h-3.5 w-3.5 text-[#8899a6]" />
            <span>Search blotter cases, parties, or docket #...</span>
            <kbd className="ml-auto rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#8899a6] border border-[#e4e6eb]">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right: Quick Action CTA, Utility Buttons, Clerk UserButton */}
      <div className="flex items-center gap-3">
        {/* Action CTA: Cobalt Pill */}
        <Link
          href="/dashboard/cases/new"
          className="inline-flex items-center justify-center rounded-full bg-[#0064e0] text-white hover:bg-[#004fc4] px-5 py-2 text-xs md:text-sm font-bold shadow-xs transition-all active:scale-[0.98] gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>New Blotter</span>
        </Link>

        {/* Circular Utility Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            className="flex size-9 items-center justify-center rounded-full border border-[#e4e6eb] bg-white text-[#657786] hover:text-[#0a1317] hover:bg-[#f5f6f8] transition-colors"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
          <button
            className="flex size-9 items-center justify-center rounded-full border border-[#e4e6eb] bg-white text-[#657786] hover:text-[#0a1317] hover:bg-[#f5f6f8] transition-colors"
            title="KP Guidelines & Forms Help"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>

        {/* Auth / Profile */}
        <div className="pl-1 border-l border-[#f0f2f5]">
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-9 w-9 shadow-xs ring-1 ring-[#e4e6eb]",
                },
              }}
            />
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </SignInButton>
          </Show>
        </div>
      </div>
    </header>
  );
};
