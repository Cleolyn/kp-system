"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { ChevronLeft, Calendar, RefreshCw, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { KPFormGenerator } from "@/components/pdf/KPFormGenerator";
import { format } from "date-fns";

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

const statusColors: Record<string, string> = {
  PENDING: "bg-slate-100 text-slate-800",
  MEDIATION: "bg-yellow-100 text-yellow-800",
  CONCILIATION: "bg-orange-100 text-orange-800",
  ARBITRATION: "bg-red-100 text-red-800",
  SETTLED: "bg-green-100 text-green-800",
  DISMISSED: "bg-slate-100 text-slate-500",
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
      <div className="p-8 flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-muted-foreground">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="p-8">
        <p className="text-red-500">Case not found.</p>
        <Link href="/dashboard/cases" className={cn(buttonVariants(), "mt-4")}>
          ← Back to Cases
        </Link>
      </div>
    );
  }

  // Build data structure for PDF generator
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
    <div className="p-8 space-y-6">
      {/* Top bar */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/cases"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-bold tracking-tight">
              {caseData.caseNumber}
            </h2>
            <Badge className={statusColors[caseData.status]}>
              {caseData.status}
            </Badge>
          </div>
          <div className="flex gap-2 flex-wrap">
            {/* Status updater */}
            <Select
              onValueChange={handleStatusChange}
              value={caseData.status}
              disabled={updatingStatus}
            >
              <SelectTrigger className="w-44" id="status-updater">
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

            {/* Schedule Hearing Dialog */}
            <Dialog open={hearingOpen} onOpenChange={setHearingOpen}>
              <DialogTrigger
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "cursor-pointer"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Hearing
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule a Hearing</DialogTitle>
                  <DialogDescription>
                    Set the date, time, and type for the next hearing.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleScheduleHearing} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hearing-date">Date & Time *</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="hearing-type">Type</Label>
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
                        <SelectItem value="MEDIATION">Mediation</SelectItem>
                        <SelectItem value="CONCILIATION">Conciliation</SelectItem>
                        <SelectItem value="ARBITRATION">Arbitration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hearing-notes">Notes</Label>
                    <Input
                      id="hearing-notes"
                      placeholder="Any notes for this hearing..."
                      value={hearingForm.notes}
                      onChange={(e) =>
                        setHearingForm((p) => ({
                          ...p,
                          notes: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setHearingOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={savingHearing}>
                      {savingHearing ? "Saving..." : "Schedule"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <KPFormGenerator
              formNumber={7}
              caseData={pdfCaseData}
              buttonText="KP Form 7"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Case Details</TabsTrigger>
          <TabsTrigger value="hearings">
            Hearings ({caseData.hearings.length})
          </TabsTrigger>
          <TabsTrigger value="forms">
            <FileText className="mr-1 h-3 w-3" />
            KP Forms
          </TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{caseData.complaintTitle}</CardTitle>
              <CardDescription>
                Filed on{" "}
                {format(new Date(caseData.dateFiled), "MMMM dd, yyyy")}
                {caseData.personnelInCharge &&
                  ` • In-charge: ${caseData.personnelInCharge}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {caseData.complaintDetails}
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-blue-400">
              <CardHeader>
                <CardTitle className="text-base">Complainant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium w-16 text-muted-foreground">
                    Name
                  </span>
                  <span>{caseData.complainantName}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium w-16 text-muted-foreground">
                    Age
                  </span>
                  <span>{caseData.complainantAge ?? "—"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium w-16 text-muted-foreground">
                    Address
                  </span>
                  <span>{caseData.complainantAddress ?? "—"}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-red-400">
              <CardHeader>
                <CardTitle className="text-base">Respondent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium w-16 text-muted-foreground">
                    Name
                  </span>
                  <span>{caseData.respondentName}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium w-16 text-muted-foreground">
                    Age
                  </span>
                  <span>{caseData.respondentAge ?? "—"}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium w-16 text-muted-foreground">
                    Address
                  </span>
                  <span>{caseData.respondentAddress ?? "—"}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Hearings Tab */}
        <TabsContent value="hearings" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hearing History</CardTitle>
                <CardDescription>
                  All scheduled and past hearings for this case.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setHearingOpen(true)}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Add Hearing
              </Button>
            </CardHeader>
            <CardContent>
              {caseData.hearings.length === 0 ? (
                <div className="text-sm text-muted-foreground py-8 text-center">
                  No hearings scheduled yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {caseData.hearings.map((h) => (
                    <div
                      key={h.id}
                      className="flex items-start gap-4 p-4 rounded-lg border bg-slate-50/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {h.type}
                          </Badge>
                          <span className="text-sm font-medium text-slate-700">
                            {format(
                              new Date(h.scheduledAt),
                              "MMMM dd, yyyy — h:mm a"
                            )}
                          </span>
                        </div>
                        {h.notes && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {h.notes}
                          </p>
                        )}
                      </div>
                      {new Date(h.scheduledAt) > new Date() ? (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          Upcoming
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-100 text-slate-600 text-xs">
                          Past
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* KP Forms Tab */}
        <TabsContent value="forms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Official KP Forms</CardTitle>
              <CardDescription>
                Auto-fill and download official Katarungang Pambarangay forms
                with this case's data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { num: 7, name: "Complainant's Form", desc: "Formal complaint registration" },
                  { num: 8, name: "Notice of Hearing (PB)", desc: "Punong Barangay notice to complainant" },
                  { num: 9, name: "Summons Form", desc: "Notice to respondent to appear" },
                  { num: 10, name: "Notice of Hearing", desc: "Schedule of conciliation hearing" },
                  { num: 16, name: "Amicable Settlement", desc: "Kasunduan between parties" },
                  { num: 20, name: "Certificate to File Action", desc: "Certification for court filing" },
                ].map((form) => (
                  <div
                    key={form.num}
                    className="flex flex-col gap-3 p-4 rounded-xl border border-dashed bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {form.num}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">
                          KP Form {form.num}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {form.name}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {form.desc}
                    </p>
                    <KPFormGenerator
                      formNumber={form.num}
                      caseData={pdfCaseData}
                      buttonText={`Generate Form ${form.num}`}
                      variant="secondary"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
