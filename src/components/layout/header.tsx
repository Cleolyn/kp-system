"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { UserButton, Show, SignInButton } from "@clerk/nextjs";

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Show when="signed-in">
          <div className="flex items-center gap-3">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8 shadow-sm",
                },
              }}
            />
          </div>
        </Show>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </SignInButton>
        </Show>
      </div>
    </header>
  );
};
