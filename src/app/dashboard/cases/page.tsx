"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, RefreshCw, ChevronRight, FileText, Filter } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface Case {
  id: string;
  caseNumber: string;
  dateFiled: string;
  complaintTitle: string;
  status: string;
  complainantName: string;
  respondentName: string;
  personnelInCharge?: string;
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
      return <Badge variant="outline">Pending</Badge>;
  }
};

const FILTER_TABS = [
  { id: "ALL", label: "All Dockets" },
  { id: "MEDIATION", label: "Mediation" },
  { id: "CONCILIATION", label: "Conciliation" },
  { id: "ARBITRATION", label: "Arbitration" },
  { id: "SETTLED", label: "Settled" },
  { id: "DISMISSED", label: "Dismissed" },
];

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchCases = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter && statusFilter !== "ALL") params.set("status", statusFilter);

      const res = await fetch(`/api/cases?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setCases(data);
      }
    } catch (err) {
      console.error("Failed to fetch cases:", err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timeout = setTimeout(fetchCases, 300);
    return () => clearTimeout(timeout);
  }, [fetchCases]);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      {/* 1. Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#f0f2f5]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0064e0]">
              Barangay Blotter Registry
            </span>
            <span className="size-1 rounded-full bg-[#8899a6]" />
            <span className="text-xs font-bold text-[#657786]">Official Dockets</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0a1317]">
            Cases & Blotters
          </h1>
          <p className="text-sm text-[#657786] mt-1">
            Browse and monitor active Katarungang Pambarangay dispute proceedings.
          </p>
        </div>

        <Link
          href="/dashboard/cases/new"
          className="btn-pill-cobalt text-sm px-6 py-2.5 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>New Blotter Case</span>
        </Link>
      </div>

      {/* 2. Pill Tabs Filters & Search Pill */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Pill Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {FILTER_TABS.map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer",
                  isActive
                    ? "bg-[#14161a] text-white shadow-2xs"
                    : "bg-white text-[#465a65] border border-[#e4e6eb] hover:bg-[#f5f6f8] hover:text-[#0a1317]"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search & Refresh Pill */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3.5 top-3.5 size-4 text-[#8899a6]" />
            <Input
              id="case-search"
              placeholder="Search docket, parties, or title..."
              className="pl-10 h-10 rounded-full border-[#e4e6eb] bg-white text-xs font-medium focus-visible:ring-[#0064e0]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={fetchCases}
            title="Refresh Dockets"
            className="flex size-10 items-center justify-center rounded-full border border-[#e4e6eb] bg-white text-[#657786] hover:text-[#0a1317] hover:bg-[#f5f6f8] transition-colors"
          >
            <RefreshCw className={cn("size-4", loading && "animate-spin text-[#0064e0]")} />
          </button>
        </div>
      </div>

      {/* 3. Dockets Table Container ({rounded.xxxl} 32px rounded) */}
      <div className="rounded-[28px] md:rounded-[32px] border border-[#f0f2f5] bg-white shadow-2xs overflow-hidden">
        <Table>
          <TableHeader className="bg-[#fbfcff] border-b border-[#f0f2f5]">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold text-xs uppercase tracking-wider text-[#657786] pl-6">
                Docket #
              </TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-[#657786]">
                Date Filed
              </TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-[#657786]">
                Complaint
              </TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-[#657786]">
                Complainant vs Respondent
              </TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-[#657786]">
                In-Charge
              </TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-[#657786]">
                Status
              </TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-[#657786] text-right pr-6">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-16">
                  <div className="flex flex-col items-center justify-center gap-2 text-[#8899a6]">
                    <RefreshCw className="size-5 animate-spin text-[#0064e0]" />
                    <span className="text-xs font-bold">Querying Turso cloud database...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : cases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-16 text-[#8899a6]">
                  <p className="text-sm font-bold text-[#0a1317] mb-1">No dockets matched criteria</p>
                  <p className="text-xs">Try selecting a different filter tab or clearing your search.</p>
                </TableCell>
              </TableRow>
            ) : (
              cases.map((c) => (
                <TableRow key={c.id} className="hover:bg-[#f8f9fa] transition-colors border-b border-[#f0f2f5]">
                  <TableCell className="font-mono font-bold text-xs text-[#0064e0] pl-6 py-4">
                    {c.caseNumber}
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-[#657786]">
                    {format(new Date(c.dateFiled), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="max-w-[180px]">
                    <span className="font-bold text-sm text-[#0a1317] block truncate">
                      {c.complaintTitle}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs">
                    <span className="font-bold text-[#0a1317] block">
                      {c.complainantName}
                    </span>
                    <span className="text-[#8899a6]">
                      vs. {c.respondentName}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-[#657786]">
                    {c.personnelInCharge || "Barangay PB"}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(c.status)}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Link
                      href={`/dashboard/cases/${c.id}`}
                      className="inline-flex items-center gap-1 rounded-full border border-[#e4e6eb] bg-white px-3.5 py-1 text-xs font-bold text-[#14161a] hover:bg-[#14161a] hover:text-white transition-all shadow-2xs"
                    >
                      <span>Open</span>
                      <ChevronRight className="size-3" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!loading && (
        <div className="flex items-center justify-between text-xs text-[#8899a6] px-2">
          <span>Showing {cases.length} docket{cases.length !== 1 ? "s" : ""}</span>
          <span>Republic Act No. 7160 • Section 408-412</span>
        </div>
      )}
    </div>
  );
}

