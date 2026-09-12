"use client";

import { useEffect, useState, useCallback } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, RefreshCw } from "lucide-react";
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

const statusColors: Record<string, string> = {
  PENDING: "bg-slate-100 text-slate-800",
  MEDIATION: "bg-yellow-100 text-yellow-800",
  CONCILIATION: "bg-orange-100 text-orange-800",
  ARBITRATION: "bg-red-100 text-red-800",
  SETTLED: "bg-green-100 text-green-800",
  DISMISSED: "bg-slate-100 text-slate-500",
};

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

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
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cases & Blotters</h2>
          <p className="text-muted-foreground">
            Manage and track all barangay dispute cases
          </p>
        </div>
        <Link
          href="/dashboard/cases/new"
          className={cn(buttonVariants(), "bg-blue-600 hover:bg-blue-500")}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Case
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 py-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="case-search"
            placeholder="Search by name, case no., or title..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val ?? "ALL")}>
          <SelectTrigger className="w-44" id="status-filter">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="MEDIATION">Mediation</SelectItem>
            <SelectItem value="CONCILIATION">Conciliation</SelectItem>
            <SelectItem value="ARBITRATION">Arbitration</SelectItem>
            <SelectItem value="SETTLED">Settled</SelectItem>
            <SelectItem value="DISMISSED">Dismissed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon" onClick={fetchCases} title="Refresh">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold">Case No.</TableHead>
              <TableHead className="font-semibold">Date Filed</TableHead>
              <TableHead className="font-semibold">Complaint</TableHead>
              <TableHead className="font-semibold">Complainant</TableHead>
              <TableHead className="font-semibold">Respondent</TableHead>
              <TableHead className="font-semibold">In-Charge</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Loading cases...
                  </div>
                </TableCell>
              </TableRow>
            ) : cases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                  No cases found. {search && "Try a different search term."}
                </TableCell>
              </TableRow>
            ) : (
              cases.map((c) => (
                <TableRow key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="font-semibold text-blue-700">
                    {c.caseNumber}
                  </TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(c.dateFiled), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="max-w-[160px] truncate">
                    {c.complaintTitle}
                  </TableCell>
                  <TableCell>{c.complainantName}</TableCell>
                  <TableCell>{c.respondentName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {c.personnelInCharge || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[c.status]}
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/dashboard/cases/${c.id}`}
                      className={buttonVariants({ variant: "ghost", size: "sm" })}
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!loading && (
        <p className="text-xs text-muted-foreground">
          Showing {cases.length} case{cases.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
