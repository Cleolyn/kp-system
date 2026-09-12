"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
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

const statusColors: Record<string, string> = {
  PENDING: "bg-slate-100 text-slate-800",
  MEDIATION: "bg-yellow-100 text-yellow-800",
  CONCILIATION: "bg-orange-100 text-orange-800",
  ARBITRATION: "bg-red-100 text-red-800",
  SETTLED: "bg-green-100 text-green-800",
  DISMISSED: "bg-slate-100 text-slate-500",
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
    // Auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the Katarungang Pambarangay Management System
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalCases ?? 0}</div>
            <p className="text-xs text-muted-foreground">All recorded cases</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending / Active</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.pendingCases ?? 0}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Settled Cases</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.settledCases ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.settlementRate ?? 0}% settlement rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Lupon</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.activeLupon ?? 0}</div>
            <p className="text-xs text-muted-foreground">Lupon members</p>
          </CardContent>
        </Card>
      </div>

      {/* Settlement Rate Progress */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <CardTitle className="text-base">Settlement Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-700"
                style={{ width: `${stats?.settlementRate ?? 0}%` }}
              />
            </div>
            <span className="text-sm font-bold text-green-600 w-10 text-right">
              {stats?.settlementRate ?? 0}%
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Cases */}
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Cases</CardTitle>
            <Link
              href="/dashboard/cases"
              className="text-xs text-blue-600 hover:underline"
            >
              View all →
            </Link>
          </CardHeader>
          <CardContent>
            {stats?.recentCases.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No cases recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {stats?.recentCases.map((c) => (
                  <Link
                    key={c.id}
                    href={`/dashboard/cases/${c.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold group-hover:text-blue-600 transition-colors">
                        {c.caseNumber} — {c.complaintTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {c.complainantName} vs. {c.respondentName}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={statusColors[c.status]}
                    >
                      {c.status}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Hearings */}
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            <CardTitle>Upcoming Hearings</CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.upcomingHearings.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No upcoming hearings scheduled.
              </div>
            ) : (
              <div className="space-y-4">
                {stats?.upcomingHearings.map((h) => (
                  <div
                    key={h.id}
                    className="flex flex-col gap-1 p-2 rounded-lg border border-slate-100 bg-slate-50/50"
                  >
                    <p className="text-sm font-medium">
                      {h.case.caseNumber} — {h.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {h.case.complaintTitle}
                    </p>
                    <p className="text-xs font-semibold text-orange-600">
                      {format(new Date(h.scheduledAt), "MMM dd, yyyy h:mm a")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
