"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  Calendar,
  RefreshCw,
  Clock,
  ShieldCheck,
  User,
  Printer,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { KPFormGenerator } from "@/components/pdf/KPFormGenerator";
import { format, differenceInDays } from "date-fns";

interface Hearing {
  id: string;
  scheduledAt: string;
  type: string;
  notes?: string;
  outcome?: string;
}

interface CaseDetail {
  id: string;
  caseNumber: string;
  dateFiled: string;
  complaintTitle: string;
  complaintDetails: string;
  complainantName: string;
  complainantAge?: number;
  complainantAddress?: string;
  respondentName: string;
  respondentAge?: number;
  respondentAddress?: string;
  status: string;
  personnelInCharge?: string;
  hearings: Hearing[];
  createdAt: string;
  updatedAt: string;
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

const STATUSES = [
  "PENDING",
  "MEDIATION",
  "CONCILIATION",
  "ARBITRATION",
  "SETTLED",
  "DISMISSED",
];

export default function CaseDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [hearingOpen, setHearingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "hearings" | "forms">("details");
  const [hearingForm, setHearingForm] = useState({
    scheduledAt: "",
    type: "MEDIATION",
    notes: "",
  });
  const [savingHearing, setSavingHearing] = useState(false);

  const fetchCase = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cases/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCaseData(data);
      }
    } catch (err) {
      console.error("Failed to fetch case:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCase();
  }, [id]);

  const handleStatusChange = async (newStatus: string | null) => {
    if (!caseData || !newStatus) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/cases/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setCaseData(data);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleScheduleHearing = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingHearing(true);
    try {
      const res = await fetch(`/api/cases/${id}/hearings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hearingForm),
      });
      if (res.ok) {
        setHearingOpen(false);
        setHearingForm({ scheduledAt: "", type: "MEDIATION", notes: "" });
        fetchCase();
      }
    } catch (err) {
      console.error("Failed to schedule hearing:", err);
    } finally {
      setSavingHearing(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 md:p-16 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-3 border-[#0064e0] border-t-transparent" />
          <p className="text-sm font-semibold text-[#8899a6]">Loading docket details...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="p-8 max-w-xl mx-auto text-center space-y-4">
        <p className="text-base font-bold text-[#e02424]">Docket record not found.</p>
        <Link href="/dashboard/cases" className="btn-pill-primary inline-flex">
          ← Back to Cases Registry
        </Link>
      </div>
    );
  }

  const daysElapsed = Math.min(
    15,
    Math.max(1, differenceInDays(new Date(), new Date(caseData.dateFiled)))
  );
  const countdownPercent = Math.round((daysElapsed / 15) * 100);

  const pdfCaseData = {
    case_number: caseData.caseNumber,
    status: caseData.status,
    complaint_title: caseData.complaintTitle,
    date_filed: caseData.dateFiled,
    complaint_details: caseData.complaintDetails,
    personnel_in_charge: caseData.personnelInCharge,
    complainant: {
      name: caseData.complainantName,
      age: caseData.complainantAge,
      address: caseData.complainantAddress,
    },
    respondent: {
      name: caseData.respondentName,
      age: caseData.respondentAge,
      address: caseData.respondentAddress,
    },
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* 1. Top Breadcrumb & Docket Header */}
      <div className="flex flex-col gap-3 pb-4 border-b border-[#f0f2f5]">
        <Link
          href="/dashboard/cases"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#657786] hover:text-[#0a1317] w-fit transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Blotter Dockets</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono text-sm font-bold text-[#0064e0] bg-[#0064e0]/8 px-3 py-1 rounded-full border border-[#0064e0]/20">
                {caseData.caseNumber}
              </span>
              {getStatusBadge(caseData.status)}
              <span className="text-xs text-[#8899a6]">
                Filed {format(new Date(caseData.dateFiled), "MMMM d, yyyy")}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0a1317]">
              {caseData.complaintTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <KPFormGenerator
              formNumber={7}
              caseData={pdfCaseData}
              buttonText="Download KP Form 7"
              variant="outline"
              className="btn-pill-secondary text-xs"
            />
          </div>
        </div>
      </div>

      {/* 2. Statutory 15-Day Mediation Countdown Progress Meter */}
      <div className="rounded-[24px] border border-[#f0f2f5] bg-white p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-[#f59e0b]" />
            <span className="text-xs font-bold text-[#0a1317] uppercase tracking-wider">
              Statutory Mediation Window (RA 7160 Sec. 410)
            </span>
          </div>
          <span className="text-xs font-bold text-[#657786]">
            Day {daysElapsed} of 15 Calendar Days ({15 - daysElapsed} days remaining)
          </span>
        </div>
        <div className="w-full bg-[#f0f2f5] rounded-full h-2.5 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700",
              daysElapsed > 12 ? "bg-[#e02424]" : daysElapsed > 8 ? "bg-[#f59e0b]" : "bg-[#0064e0]"
            )}
            style={{ width: `${countdownPercent}%` }}
          />
        </div>
      </div>

      {/* 3. 2-Column PDP Layout: Main Content vs Sticky Right Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Pill Tabs + Views */}
        <div className="lg:col-span-8 space-y-6">
          {/* Pill Tabs Navigation */}
          <div className="flex items-center gap-2 border-b border-[#f0f2f5] pb-4 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("details")}
              className={cn(
                "rounded-full px-5 py-2 text-xs md:text-sm font-bold transition-all cursor-pointer",
                activeTab === "details"
                  ? "bg-[#14161a] text-white shadow-2xs"
                  : "bg-white text-[#465a65] border border-[#e4e6eb] hover:bg-[#f5f6f8]"
              )}
            >
              Case Details & Narrative
            </button>
            <button
              onClick={() => setActiveTab("hearings")}
              className={cn(
                "rounded-full px-5 py-2 text-xs md:text-sm font-bold transition-all cursor-pointer",
                activeTab === "hearings"
                  ? "bg-[#14161a] text-white shadow-2xs"
                  : "bg-white text-[#465a65] border border-[#e4e6eb] hover:bg-[#f5f6f8]"
              )}
            >
              Hearings Timeline ({caseData.hearings.length})
            </button>
            <button
              onClick={() => setActiveTab("forms")}
              className={cn(
                "rounded-full px-5 py-2 text-xs md:text-sm font-bold transition-all cursor-pointer",
                activeTab === "forms"
                  ? "bg-[#14161a] text-white shadow-2xs"
                  : "bg-white text-[#465a65] border border-[#e4e6eb] hover:bg-[#f5f6f8]"
              )}
            >
              Official KP Forms (1–28)
            </button>
          </div>

          {/* TAB 1: DETAILS */}
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Complaint Narrative Card ({rounded.xxxl} 32px rounded) */}
              <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#f0f2f5] mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#0a1317]">
                      Dispute Narrative & Sworn Statement
                    </h3>
                    <p className="text-xs text-[#657786]">
                      Officer In-Charge: {caseData.personnelInCharge || "Barangay Punong Barangay"}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs font-mono">
                    Form 7 Attached
                  </Badge>
                </div>
                <div className="bg-[#fbfcff] rounded-2xl p-5 border border-[#f0f2f5] text-sm text-[#1c2b33] leading-relaxed whitespace-pre-wrap font-sans">
                  {caseData.complaintDetails}
                </div>
              </div>

              {/* Complainant vs Respondent 2-Up Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Complainant Card */}
                <div className="rounded-2xl bg-white border border-[#f0f2f5] p-6 shadow-2xs">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#f0f2f5]">
                    <div className="size-8 rounded-full bg-[#0064e0]/10 text-[#0064e0] flex items-center justify-center">
                      <User className="size-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0064e0]">
                        Complainant (Nagsusumbong)
                      </span>
                      <h4 className="text-sm font-bold text-[#0a1317]">
                        {caseData.complainantName}
                      </h4>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs text-[#465a65]">
                    <div className="flex justify-between py-1 border-b border-[#f0f2f5]">
                      <span className="font-medium text-[#8899a6]">Age</span>
                      <span className="font-bold text-[#0a1317]">{caseData.complainantAge ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f0f2f5]">
                      <span className="font-medium text-[#8899a6]">Address</span>
                      <span className="font-bold text-[#0a1317] text-right truncate max-w-[200px]">
                        {caseData.complainantAddress ?? "Barangay Resident"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-[#8899a6]">Jurisdiction</span>
                      <span className="font-bold text-[#00875a]">Verified Resident</span>
                    </div>
                  </div>
                </div>

                {/* Respondent Card */}
                <div className="rounded-2xl bg-white border border-[#f0f2f5] p-6 shadow-2xs">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#f0f2f5]">
                    <div className="size-8 rounded-full bg-[#e02424]/10 text-[#e02424] flex items-center justify-center">
                      <User className="size-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#e02424]">
                        Respondent (Ipinagsusumbong)
                      </span>
                      <h4 className="text-sm font-bold text-[#0a1317]">
                        {caseData.respondentName}
                      </h4>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs text-[#465a65]">
                    <div className="flex justify-between py-1 border-b border-[#f0f2f5]">
                      <span className="font-medium text-[#8899a6]">Age</span>
                      <span className="font-bold text-[#0a1317]">{caseData.respondentAge ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f0f2f5]">
                      <span className="font-medium text-[#8899a6]">Address</span>
                      <span className="font-bold text-[#0a1317] text-right truncate max-w-[200px]">
                        {caseData.respondentAddress ?? "Barangay Resident"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="font-medium text-[#8899a6]">Summons</span>
                      <span className="font-bold text-[#0064e0]">KP Form 9 Issued</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HEARINGS */}
          {activeTab === "hearings" && (
            <div className="space-y-6">
              <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#f0f2f5] mb-6">
                  <div>
                    <h3 className="text-base font-bold text-[#0a1317]">
                      Conciliation Hearing Timeline
                    </h3>
                    <p className="text-xs text-[#657786]">
                      Chronological logs of mediation & pangkat sessions
                    </p>
                  </div>
                  <button
                    onClick={() => setHearingOpen(true)}
                    className="btn-pill-cobalt text-xs px-4 py-2 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="size-3.5" />
                    <span>Schedule Hearing</span>
                  </button>
                </div>

                {caseData.hearings.length === 0 ? (
                  <div className="py-12 text-center text-sm text-[#8899a6]">
                    No hearings scheduled yet. Use the "Schedule Hearing" button above.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {caseData.hearings.map((h, i) => (
                      <div
                        key={h.id}
                        className="rounded-2xl border border-[#f0f2f5] bg-[#fbfcff] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-[#0064e0]/10 text-[#0064e0] px-3 py-0.5 text-xs font-bold">
                              Session #{i + 1} • {h.type}
                            </span>
                            <span className="text-xs font-bold text-[#0a1317]">
                              {format(new Date(h.scheduledAt), "MMMM dd, yyyy • h:mm a")}
                            </span>
                          </div>
                          {h.notes && (
                            <p className="text-xs text-[#657786] pt-1 leading-relaxed">
                              {h.notes}
                            </p>
                          )}
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            Notice Sent
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: KP FORMS */}
          {activeTab === "forms" && (
            <div className="space-y-6">
              <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs">
                <div className="pb-4 border-b border-[#f0f2f5] mb-6">
                  <h3 className="text-base font-bold text-[#0a1317]">
                    Official DILG Katarungang Pambarangay Forms
                  </h3>
                  <p className="text-xs text-[#657786]">
                    Instantly generate print-ready PDFs populated with this docket's verified information.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { num: 7, name: "Complainant's Form", desc: "Formal complaint statement under oath." },
                    { num: 8, name: "Notice of Hearing (PB)", desc: "Summons to complainant for initial appearance." },
                    { num: 9, name: "Summons to Respondent", desc: "Formal subpoena to respondent to answer charges." },
                    { num: 10, name: "Notice of Hearing", desc: "Conciliation session schedule announcement." },
                    { num: 16, name: "Amicable Settlement", desc: "Binding Kasunduan mutual accord agreement." },
                    { num: 20, name: "Certificate to File Action", desc: "Endorsement to Court / MTC after failed conciliation." },
                  ].map((form) => (
                    <div
                      key={form.num}
                      className="rounded-2xl border border-[#f0f2f5] bg-white p-5 hover:border-[#0064e0]/40 transition-all flex flex-col justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-[#0064e0] bg-[#0064e0]/10 px-2.5 py-0.5 rounded-full">
                            KP FORM {form.num}
                          </span>
                          <Printer className="size-4 text-[#8899a6]" />
                        </div>
                        <h4 className="text-sm font-bold text-[#0a1317]">
                          {form.name}
                        </h4>
                        <p className="text-xs text-[#657786]">
                          {form.desc}
                        </p>
                      </div>

                      <KPFormGenerator
                        formNumber={form.num}
                        caseData={pdfCaseData}
                        buttonText={`Download Form ${form.num}`}
                        variant="secondary"
                        className="btn-pill-secondary text-xs w-full justify-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Sticky PDP Summary Rail */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
          <div className="rounded-[28px] bg-white border border-[#f0f2f5] p-6 shadow-sm space-y-6">
            <div className="pb-4 border-b border-[#f0f2f5]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0064e0] block mb-1">
                Docket Action Center
              </span>
              <h3 className="text-lg font-extrabold text-[#0a1317]">
                Case Management Rail
              </h3>
            </div>

            {/* Primary Action CTA: Cobalt Pill Button */}
            <div className="space-y-2.5">
              <button
                onClick={() => setHearingOpen(true)}
                className="w-full btn-pill-cobalt text-sm py-3 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="size-4" />
                <span>Schedule Next Hearing</span>
              </button>

              <KPFormGenerator
                formNumber={caseData.status === "SETTLED" ? 16 : 7}
                caseData={pdfCaseData}
                buttonText={caseData.status === "SETTLED" ? "Print KP-16 Settlement" : "Print KP-7 Blotter"}
                variant="outline"
                className="w-full btn-pill-secondary text-xs py-2.5 justify-center"
              />
            </div>

            {/* Status Selector */}
            <div className="space-y-1.5 pt-4 border-t border-[#f0f2f5]">
              <label className="text-xs font-bold text-[#657786]">
                Update Dispute Status
              </label>
              <Select
                onValueChange={handleStatusChange}
                value={caseData.status}
                disabled={updatingStatus}
              >
                <SelectTrigger className="w-full" id="status-updater">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Docket Specifications Rail */}
            <div className="space-y-2.5 pt-4 border-t border-[#f0f2f5] text-xs">
              <div className="flex justify-between text-[#657786]">
                <span>Docket Reference</span>
                <span className="font-mono font-bold text-[#0a1317]">{caseData.caseNumber}</span>
              </div>
              <div className="flex justify-between text-[#657786]">
                <span>Conciliation Sessions</span>
                <span className="font-bold text-[#0a1317]">{caseData.hearings.length} completed</span>
              </div>
              <div className="flex justify-between text-[#657786]">
                <span>Jurisdiction</span>
                <span className="font-bold text-[#00875a]">Katarungang Pambarangay</span>
              </div>
              <div className="flex justify-between text-[#657786]">
                <span>Resolution Target</span>
                <span className="font-bold text-[#0064e0]">Day 15 (RA 7160)</span>
              </div>
            </div>

            {/* Reassurance Strip */}
            <div className="rounded-2xl bg-[#f5f6f8] p-4 border border-[#e4e6eb]/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#0064e0]">
                <ShieldCheck className="size-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Official Record
                </span>
              </div>
              <p className="text-[11px] text-[#657786] leading-snug">
                All changes made here update the official barangay ledger and Turso cloud database in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Hearing Dialog */}
      <Dialog open={hearingOpen} onOpenChange={setHearingOpen}>
        <DialogContent className="rounded-[28px]">
          <DialogHeader>
            <DialogTitle>Schedule Conciliation Hearing</DialogTitle>
            <DialogDescription>
              Set the date, time, and conciliation level for docket {caseData.caseNumber}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleHearing} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="hearing-date">Hearing Date & Time *</Label>
              <Input
                id="hearing-date"
                type="datetime-local"
                required
                value={hearingForm.scheduledAt}
                onChange={(e) =>
                  setHearingForm((p) => ({
                    ...p,
                    scheduledAt: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hearing-type">Conciliation Stage</Label>
              <Select
                value={hearingForm.type}
                onValueChange={(v) =>
                  setHearingForm((p) => ({ ...p, type: v ?? "MEDIATION" }))
                }
              >
                <SelectTrigger id="hearing-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MEDIATION">Mediation (Punong Barangay)</SelectItem>
                  <SelectItem value="CONCILIATION">Conciliation (Pangkat)</SelectItem>
                  <SelectItem value="ARBITRATION">Arbitration Hearing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hearing-notes">Agenda / Notes</Label>
              <Input
                id="hearing-notes"
                placeholder="Specific matters or evidence requested..."
                value={hearingForm.notes}
                onChange={(e) =>
                  setHearingForm((p) => ({
                    ...p,
                    notes: e.target.value,
                  }))
                }
              />
            </div>
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setHearingOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="cobalt"
                disabled={savingHearing}
              >
                {savingHearing ? "Saving Session..." : "Confirm Schedule"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
