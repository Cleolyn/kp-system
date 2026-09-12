"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import {
  Scale,
  Shield,
  ArrowRight,
  FileCheck2,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  Gavel,
  ChevronRight,
  FileText,
  Search,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#1c2b33] flex flex-col selection:bg-[#0064e0] selection:text-white">
      {/* 1. Saturated Statutory Notice Banner */}
      <aside aria-label="Statutory Notice" className="bg-[#ffd700] text-[#0a1317] text-xs md:text-sm font-bold py-2.5 px-4 text-center tracking-tight flex items-center justify-center gap-2">
        <span className="inline-flex size-2 rounded-full bg-[#0a1317]" />
        <span>
          Republic Act No. 7160 Statutory Notice: 15-Day Mediation & Conciliation Window Enforcement Active
        </span>
        <span className="hidden sm:inline text-xs font-normal underline underline-offset-2 ml-1 cursor-pointer">
          Read Guidelines
        </span>
      </aside>

      {/* 2. Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#f0f2f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Wordmark & Crest */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0064e0] text-white shadow-xs">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-[#0a1317]">
                KP SYSTEM
              </span>
              <span className="text-[11px] font-bold text-[#657786] block -mt-1 tracking-wider uppercase">
                Katarungang Pambarangay
              </span>
            </div>
          </Link>

          {/* Navigation Pill Links */}
          <nav className="hidden md:flex items-center gap-2">
            <a
              href="#features"
              className="rounded-full px-4 py-1.5 text-sm font-bold text-[#465a65] hover:text-[#0a1317] hover:bg-[#f5f6f8] transition-colors"
            >
              Blotter Registry
            </a>
            <a
              href="#mediation"
              className="rounded-full px-4 py-1.5 text-sm font-bold text-[#465a65] hover:text-[#0a1317] hover:bg-[#f5f6f8] transition-colors"
            >
              Mediation & Hearings
            </a>
            <a
              href="#forms"
              className="rounded-full px-4 py-1.5 text-sm font-bold text-[#465a65] hover:text-[#0a1317] hover:bg-[#f5f6f8] transition-colors"
            >
              KP Forms (1–28)
            </a>
            <a
              href="#lupon"
              className="rounded-full px-4 py-1.5 text-sm font-bold text-[#465a65] hover:text-[#0a1317] hover:bg-[#f5f6f8] transition-colors"
            >
              Lupon Roster
            </a>
          </nav>

          {/* Right CTAs / Auth */}
          <div className="flex items-center gap-3">
            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="btn-pill-primary text-xs sm:text-sm py-2 px-5 sm:px-6"
              >
                Go to Console
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
                <button className="btn-pill-secondary text-xs sm:text-sm py-2 px-5 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn-pill-primary text-xs sm:text-sm py-2 px-5 sm:px-6 cursor-pointer">
                  Get Started
                </button>
              </SignUpButton>
            </Show>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Stark White Canvas + Tight Typography) */}
      <main className="flex-1">
        <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0064e0]/20 bg-[#0064e0]/8 px-4 py-1 text-xs font-bold text-[#0064e0] mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Republic Act 7160 • Barangay Justice Modernization</span>
          </div>

          {/* Hero Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0a1317] max-w-4xl mx-auto leading-[1.08]">
            The Modern Operating System for Barangay Justice.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-[#465a65] max-w-2xl mx-auto font-normal leading-relaxed">
            Standardize complaint intake, track statutory 15-day conciliation deadlines, auto-generate official KP Forms, and certify court referrals seamlessly.
          </p>

          {/* Dual-CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="btn-pill-primary text-base px-8 py-3.5 flex items-center gap-2"
              >
                Open Dashboard Console
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard/cases/new"
                className="btn-pill-cobalt text-base px-8 py-3.5 flex items-center gap-2"
              >
                File New Blotter
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Show>

            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="btn-pill-primary text-base px-8 py-3.5 flex items-center gap-2 cursor-pointer">
                  Access Portal
                  <ArrowRight className="h-4 w-4" />
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn-pill-secondary text-base px-8 py-3 flex items-center gap-2 cursor-pointer">
                  Register Barangay Personnel
                </button>
              </SignUpButton>
            </Show>
          </div>

          {/* Hero Showcase Container ({rounded.feature} 40px rounding) */}
          <div className="mt-16 rounded-[32px] sm:rounded-[40px] border border-[#f0f2f5] bg-[#f5f6f8] p-4 sm:p-8 shadow-[0_10px_40px_rgba(20,22,26,0.06)] relative overflow-hidden text-left">
            <div className="rounded-[24px] sm:rounded-[32px] bg-white border border-[#e4e6eb] p-6 sm:p-10">
              {/* Showcase Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#f0f2f5] gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-[#14161a] text-white">
                    <Gavel className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0a1317]">
                      Barangay Blotter & Dispute Resolution Engine
                    </h3>
                    <p className="text-xs text-[#657786]">
                      Pangkat Tagapagkasundo Live Arbitration Docket
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00875a]/10 text-[#00875a] border border-[#00875a]/20 px-3 py-1 text-xs font-bold">
                    <span className="size-1.5 rounded-full bg-[#00875a]" />
                    Live System
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0064e0]/10 text-[#0064e0] border border-[#0064e0]/20 px-3 py-1 text-xs font-bold">
                    Turso Edge libSQL
                  </span>
                </div>
              </div>

              {/* Showcase Mock Interface Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {/* Docket 1 */}
                <div className="rounded-2xl border border-[#f0f2f5] p-5 bg-[#fbfcff]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#8899a6]">
                      KP-2026-0042
                    </span>
                    <span className="rounded-full bg-[#f59e0b]/15 text-[#b45309] px-2.5 py-0.5 text-[11px] font-bold">
                      Mediation
                    </span>
                  </div>
                  <h4 className="font-bold text-[#0a1317] text-sm mb-1">
                    Boundary & Easement Dispute
                  </h4>
                  <p className="text-xs text-[#657786] mb-4">
                    Complainant: Santos vs. Respondent: Reyes
                  </p>
                  <div className="flex items-center justify-between text-xs pt-3 border-t border-[#f0f2f5]">
                    <span className="text-[#657786] flex items-center gap-1">
                      <Clock className="size-3.5 text-[#f59e0b]" />
                      Day 6 of 15 Window
                    </span>
                    <span className="font-bold text-[#0064e0]">KP Form 7</span>
                  </div>
                </div>

                {/* Docket 2 */}
                <div className="rounded-2xl border border-[#f0f2f5] p-5 bg-[#fbfcff]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#8899a6]">
                      KP-2026-0038
                    </span>
                    <span className="rounded-full bg-[#00875a]/10 text-[#00875a] px-2.5 py-0.5 text-[11px] font-bold">
                      Settled
                    </span>
                  </div>
                  <h4 className="font-bold text-[#0a1317] text-sm mb-1">
                    Collection of Small Debt (PHP 15,000)
                  </h4>
                  <p className="text-xs text-[#657786] mb-4">
                    Complainant: Dela Cruz vs. Respondent: Tan
                  </p>
                  <div className="flex items-center justify-between text-xs pt-3 border-t border-[#f0f2f5]">
                    <span className="text-[#00875a] flex items-center gap-1 font-bold">
                      <CheckCircle2 className="size-3.5" />
                      Amicable Settlement
                    </span>
                    <span className="font-bold text-[#0064e0]">KP Form 16</span>
                  </div>
                </div>

                {/* Docket 3 */}
                <div className="rounded-2xl border border-[#f0f2f5] p-5 bg-[#fbfcff]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#8899a6]">
                      KP-2026-0031
                    </span>
                    <span className="rounded-full bg-[#e02424]/10 text-[#e02424] px-2.5 py-0.5 text-[11px] font-bold">
                      Certified to Court
                    </span>
                  </div>
                  <h4 className="font-bold text-[#0a1317] text-sm mb-1">
                    Property Damage & Trespass
                  </h4>
                  <p className="text-xs text-[#657786] mb-4">
                    Complainant: Aquino vs. Respondent: Gomez
                  </p>
                  <div className="flex items-center justify-between text-xs pt-3 border-t border-[#f0f2f5]">
                    <span className="text-[#657786] flex items-center gap-1">
                      <FileCheck2 className="size-3.5 text-[#e02424]" />
                      MTC Jurisdiction Endorsed
                    </span>
                    <span className="font-bold text-[#0064e0]">KP Form 20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Three-Up Feature Grid ({rounded.xxxl} 32px Showcase Cards) */}
        <section id="features" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a1317] tracking-tight">
              Engineered for Barangay Legal Accuracy.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#657786] max-w-2xl mx-auto">
              Built strictly according to DILG regulations and Republic Act No. 7160 Book III Title I Chapter 7.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-8 hover:shadow-lg hover:shadow-black/5 transition-all">
              <div className="size-12 rounded-2xl bg-[#0064e0]/10 flex items-center justify-center text-[#0064e0] mb-6">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1317] mb-2">
                Digital Blotter & Incident Intake
              </h3>
              <p className="text-sm text-[#657786] leading-relaxed mb-6">
                Comprehensive blotter logging with auto-assigned docket sequences, party relations, incident taxonomy, and immediate summons drafting.
              </p>
              <div className="pt-4 border-t border-[#f0f2f5] flex items-center justify-between text-xs font-bold text-[#0064e0]">
                <span>Instant KP Form 7</span>
                <ArrowRight className="size-3.5" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-8 hover:shadow-lg hover:shadow-black/5 transition-all">
              <div className="size-12 rounded-2xl bg-[#ffd700]/20 flex items-center justify-center text-[#0a1317] mb-6">
                <Clock className="h-6 w-6 text-[#b45309]" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1317] mb-2">
                15-Day Statutory Countdown
              </h3>
              <p className="text-sm text-[#657786] leading-relaxed mb-6">
                Enforces the mandatory 15-day Punong Barangay mediation period before constitution of the Pangkat Tagapagkasundo conciliation panel.
              </p>
              <div className="pt-4 border-t border-[#f0f2f5] flex items-center justify-between text-xs font-bold text-[#0064e0]">
                <span>Statutory Tracking</span>
                <ArrowRight className="size-3.5" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-8 hover:shadow-lg hover:shadow-black/5 transition-all">
              <div className="size-12 rounded-2xl bg-[#00875a]/10 flex items-center justify-center text-[#00875a] mb-6">
                <FileCheck2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0a1317] mb-2">
                Official KP Forms 1 through 28
              </h3>
              <p className="text-sm text-[#657786] leading-relaxed mb-6">
                Generate ready-to-print Notices, Summons, Subpoenas, Pangkat Constitutions, Amicable Settlements, and Certifications to File Action.
              </p>
              <div className="pt-4 border-t border-[#f0f2f5] flex items-center justify-between text-xs font-bold text-[#0064e0]">
                <span>Automated DILG Templates</span>
                <ArrowRight className="size-3.5" />
              </div>
            </div>
          </div>
        </section>

        {/* 5. 4-Up Reassurance Grid (why-buy-tile pattern) */}
        <section className="py-16 bg-[#f8f9fa] border-y border-[#f0f2f5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tile 1 */}
              <div className="rounded-2xl bg-white border border-[#f0f2f5] p-6 shadow-2xs">
                <Shield className="h-6 w-6 text-[#0064e0] mb-3" />
                <h4 className="text-sm font-bold text-[#0a1317] mb-1">
                  RA 7160 Compliant
                </h4>
                <p className="text-xs text-[#657786] leading-relaxed">
                  Strictly enforces statutory mediation protocol and jurisdiction limits under Philippine law.
                </p>
              </div>

              {/* Tile 2 */}
              <div className="rounded-2xl bg-white border border-[#f0f2f5] p-6 shadow-2xs">
                <Users className="h-6 w-6 text-[#0064e0] mb-3" />
                <h4 className="text-sm font-bold text-[#0a1317] mb-1">
                  Lupon Member Roster
                </h4>
                <p className="text-xs text-[#657786] leading-relaxed">
                  Assign Lupon Tagapamayapa members and track individual mediator case loads with ease.
                </p>
              </div>

              {/* Tile 3 */}
              <div className="rounded-2xl bg-white border border-[#f0f2f5] p-6 shadow-2xs">
                <Calendar className="h-6 w-6 text-[#0064e0] mb-3" />
                <h4 className="text-sm font-bold text-[#0a1317] mb-1">
                  Hearing Scheduler
                </h4>
                <p className="text-xs text-[#657786] leading-relaxed">
                  Synchronize barangay session halls, hearing dates, minutes, and participant attendance.
                </p>
              </div>

              {/* Tile 4 */}
              <div className="rounded-2xl bg-white border border-[#f0f2f5] p-6 shadow-2xs">
                <CheckCircle2 className="h-6 w-6 text-[#00875a] mb-3" />
                <h4 className="text-sm font-bold text-[#0a1317] mb-1">
                  Court Certification
                </h4>
                <p className="text-xs text-[#657786] leading-relaxed">
                  Automate Certification to File Action when conciliation fails, ready for formal court filing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Dark Promo Strip ({rounded.xxxl} bg-[#0a1317]) */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-[#0a1317] text-white p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#ffd700] mb-2 block">
                Official Civic Technology
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Modernize Your Barangay Justice Administration.
              </h3>
              <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                Empower your Barangay Captain, Lupon Members, and Barangay Secretary with real-time case tracking, tamper-proof docket logs, and automated DILG compliance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Show when="signed-in">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto text-center rounded-full bg-[#0064e0] text-white hover:bg-[#004fc4] px-8 py-3.5 text-sm font-bold shadow-xs transition-all"
                >
                  Enter Console
                </Link>
              </Show>

              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="w-full sm:w-auto rounded-full bg-[#0064e0] text-white hover:bg-[#004fc4] px-8 py-3.5 text-sm font-bold shadow-xs transition-all cursor-pointer">
                    Sign In to Portal
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="w-full sm:w-auto rounded-full border-2 border-white text-white hover:bg-white/10 px-8 py-3.5 text-sm font-bold transition-all cursor-pointer">
                    Create Account
                  </button>
                </SignUpButton>
              </Show>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Clean Footer with Hairline Dividers */}
      <footer className="border-t border-[#f0f2f5] bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#657786]">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#14161a] text-white">
              <Scale className="h-4 w-4" />
            </div>
            <span className="font-bold text-[#0a1317]">
              KP System • Katarungang Pambarangay Management
            </span>
          </div>

          <p className="text-center sm:text-right">
            Pursuant to Republic Act No. 7160 (Local Government Code of 1991). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

