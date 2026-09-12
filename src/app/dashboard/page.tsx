"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  Plus,
  ArrowRight,
  Shield,
  Calendar,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface DashboardStats {
  totalCases: number;
  pendingCases: number;
  settledCases: number;
  activeLupon: number;
  settlementRate: number;
  upcomingHearings: Array<{
    id: string;
    scheduledAt: string;
    type: string;
    case: { caseNumber: string; complaintTitle: string; status: string };
  }>;
  recentCases: Array<{
    id: string;
    caseNumber: string;
    complaintTitle: string;
    complainantName: string;
    respondentName: string;
    status: string;
    createdAt: string;
  }>;
}

const getStatusBadge = (status: string) => {
  switch (status?.toUpperCase()) {
    case "SETTLED":
      return <Badge variant="success">Settled</Badge>;
    case "MEDIATION":
      return <Badge variant="attention">Mediation</Badge>;
    case "CONCILIATION":
      return <Badge variant="attention">Conciliation</Badge>;
    case "ARBITRATION":
      return <Badge variant="critical">Arbitration</Badge>;
    case "DISMISSED":
      return <Badge variant="secondary">Dismissed</Badge>;
    default:
      return <Badge variant="outline">Pending Intake</Badge>;
  }
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-8 md:p-12 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-3 border-[#0064e0] border-t-transparent" />
          <p className="text-sm font-semibold text-[#8899a6]">Loading Katarungang Pambarangay console...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* 1. Page Header & Dual CTAs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#f0f2f5]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0064e0]">
              Barangay Justice Operations
            </span>
            <span className="size-1 rounded-full bg-[#8899a6]" />
            <span className="text-xs font-bold text-[#657786]">RA 7160</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0a1317]">
            Console Overview
          </h1>
          <p className="text-sm text-[#657786] mt-1">
            Real-time dispute conciliation, statutory deadlines, and blotter dockets.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/dashboard/cases/new"
            className="btn-pill-cobalt text-sm px-6 py-2.5 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>File Blotter Case</span>
          </Link>
          <Link
            href="/dashboard/cases"
            className="btn-pill-secondary text-sm px-5 py-2.5 flex items-center gap-2"
          >
            <span>All Dockets</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 2. Statutory Banner Strip (Warning / Attention) */}
      <div className="rounded-2xl border border-[#ffd700] bg-[#fffdf0] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ffd700] text-[#0a1317] font-bold text-sm">
            !
          </div>
          <div>
            <p className="text-sm font-bold text-[#0a1317]">
              Mandatory 15-Day Mediation Enforcement
            </p>
            <p className="text-xs text-[#465a65]">
              Active mediation cases must conclude or elevate to Pangkat Tagapagkasundo within 15 calendar days from first appearance.
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/hearings"
          className="self-start sm:self-auto text-xs font-bold text-[#0064e0] hover:underline flex items-center gap-1"
        >
          View hearing schedules <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 3. 4-Up Metrics Grid ({rounded.xxxl} 32px Cards) */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <div className="rounded-[28px] bg-white border border-[#f0f2f5] p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8899a6]">
              Total Cases
            </span>
            <div className="size-9 rounded-full bg-[#f5f6f8] flex items-center justify-center text-[#14161a]">
              <FileText className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0a1317]">
            {stats?.totalCases ?? 0}
          </div>
          <p className="text-xs text-[#657786] mt-2 flex items-center gap-1 font-medium">
            Recorded blotter dockets
          </p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-[28px] bg-white border border-[#f0f2f5] p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b45309]">
              Pending / Active
            </span>
            <div className="size-9 rounded-full bg-[#f59e0b]/15 flex items-center justify-center text-[#b45309]">
              <Clock className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0a1317]">
            {stats?.pendingCases ?? 0}
          </div>
          <p className="text-xs text-[#657786] mt-2 flex items-center gap-1 font-medium">
            Requires hearing or conciliation
          </p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-[28px] bg-white border border-[#f0f2f5] p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00875a]">
              Settled Cases
            </span>
            <div className="size-9 rounded-full bg-[#00875a]/15 flex items-center justify-center text-[#00875a]">
              <CheckCircle className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0a1317]">
            {stats?.settledCases ?? 0}
          </div>
          <p className="text-xs text-[#00875a] mt-2 flex items-center gap-1 font-bold">
            {stats?.settlementRate ?? 0}% resolution rate
          </p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-[28px] bg-white border border-[#f0f2f5] p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0064e0]">
              Lupon Members
            </span>
            <div className="size-9 rounded-full bg-[#0064e0]/15 flex items-center justify-center text-[#0064e0]">
              <Users className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0a1317]">
            {stats?.activeLupon ?? 0}
          </div>
          <p className="text-xs text-[#657786] mt-2 flex items-center gap-1 font-medium">
            Appointed peace conciliators
          </p>
        </div>
      </div>

      {/* 4. Settlement Efficiency Bar */}
      <div className="rounded-[28px] bg-white border border-[#f0f2f5] p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#00875a]" />
            <span className="text-sm font-bold text-[#0a1317]">
              Dispute Amicable Settlement Rate
            </span>
          </div>
          <span className="text-sm font-extrabold text-[#00875a]">
            {stats?.settlementRate ?? 0}%
          </span>
        </div>
        <div className="w-full bg-[#f0f2f5] rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-[#00875a] rounded-full transition-all duration-700"
            style={{ width: `${stats?.settlementRate ?? 0}%` }}
          />
        </div>
      </div>

      {/* 5. 2-Column Split: Recent Cases vs Upcoming Hearings */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        {/* Recent Cases (4 cols) */}
        <div className="lg:col-span-4 rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#f0f2f5] mb-4">
            <div>
              <h2 className="text-base font-bold text-[#0a1317]">
                Recent Blotter Dockets
              </h2>
              <p className="text-xs text-[#657786]">
                Latest filed complaints and dispute proceedings
              </p>
            </div>
            <Link
              href="/dashboard/cases"
              className="text-xs font-bold text-[#0064e0] hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {stats?.recentCases.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#8899a6]">
              No complaints filed yet. Click "File Blotter Case" to start.
            </div>
          ) : (
            <div className="space-y-3">
              {stats?.recentCases.map((c) => (
                <Link
                  key={c.id}
                  href={`/dashboard/cases/${c.id}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-[#f0f2f5] bg-white hover:bg-[#f5f6f8] transition-all group"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-[#0064e0]">
                        {c.caseNumber}
                      </span>
                      <span className="text-xs text-[#8899a6]">•</span>
                      <span className="text-xs text-[#8899a6]">
                        {format(new Date(c.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#0a1317] truncate group-hover:text-[#0064e0] transition-colors">
                      {c.complaintTitle}
                    </h3>
                    <p className="text-xs text-[#657786] truncate">
                      {c.complainantName} vs. {c.respondentName}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {getStatusBadge(c.status)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Hearings (3 cols) */}
        <div className="lg:col-span-3 rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#f0f2f5] mb-4">
            <div>
              <h2 className="text-base font-bold text-[#0a1317]">
                Scheduled Hearings
              </h2>
              <p className="text-xs text-[#657786]">
                Upcoming session hall proceedings
              </p>
            </div>
            <Link
              href="/dashboard/hearings"
              className="text-xs font-bold text-[#0064e0] hover:underline flex items-center gap-1"
            >
              Calendar <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {stats?.upcomingHearings.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#8899a6]">
              No hearings scheduled on the calendar.
            </div>
          ) : (
            <div className="space-y-3">
              {stats?.upcomingHearings.map((h) => (
                <div
                  key={h.id}
                  className="rounded-2xl border border-[#f0f2f5] bg-[#fbfcff] p-4"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#0064e0]">
                      {h.case.caseNumber}
                    </span>
                    <span className="rounded-full bg-[#f5f6f8] border border-[#e4e6eb] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#465a65]">
                      {h.type}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-[#0a1317] truncate mb-2">
                    {h.case.complaintTitle}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#b45309] pt-2 border-t border-[#f0f2f5]">
                    <Calendar className="size-3.5" />
                    <span>{format(new Date(h.scheduledAt), "MMM dd, yyyy • h:mm a")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

