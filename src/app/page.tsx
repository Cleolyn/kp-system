"use client";

import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scale, Shield, ArrowRight, UserPlus, LogIn } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Logo / Header */}
        <div className="flex flex-col items-center space-y-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              KP System
            </h1>
            <p className="text-blue-300/80 text-sm mt-1">
              Katarungang Pambarangay Management
            </p>
          </div>
        </div>

        {/* Card */}
        <Card className="border-slate-700/50 bg-slate-800/80 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-400" />
              <CardTitle className="text-white text-lg">
                Clerk Authentication
              </CardTitle>
            </div>
            <CardDescription className="text-slate-400">
              Secure access for authorized barangay personnel
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Signed-in View */}
            <Show when="signed-in">
              <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserButton showName />
                </div>
              </div>
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants(),
                  "w-full bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
                )}
              >
                Enter KP Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Show>

            {/* Signed-out View */}
            <Show when="signed-out">
              <div className="space-y-3">
                <SignInButton mode="modal">
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/25 cursor-pointer">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In with Clerk
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-200 hover:bg-slate-700/50 cursor-pointer"
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create New Account (Sign Up)
                  </Button>
                </SignUpButton>
              </div>
            </Show>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 pt-2 border-t border-slate-700/40">
            <p className="text-center text-xs text-slate-400">
              Secured by Clerk Identity Infrastructure
            </p>
          </CardFooter>
        </Card>

        <p className="text-center text-xs text-slate-500">
          Republic Act No. 7160 — Local Government Code of 1991
        </p>
      </div>
    </div>
  );
}
