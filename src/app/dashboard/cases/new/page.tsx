"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ChevronLeft, Scale, ShieldCheck, FileCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const PERSONNEL = [
  "Maria Santos (Barangay Secretary)",
  "Jose Reyes (Punong Barangay)",
  "Ana Villanueva (Lupon Executive)",
  "Roberto Aquino (Lupon Member)",
];

export default function NewCasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    complaintTitle: "",
    complaintDetails: "",
    complainantName: "",
    complainantAge: "",
    complainantAddress: "",
    respondentName: "",
    respondentAge: "",
    respondentAddress: "",
    personnelInCharge: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save blotter docket.");
        setLoading(false);
        return;
      }

      router.push(`/dashboard/cases/${data.id}`);
    } catch {
      setError("Network or server connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-3 pb-4 border-b border-[#f0f2f5]">
        <Link
          href="/dashboard/cases"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#657786] hover:text-[#0a1317] w-fit transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Blotter Dockets</span>
        </Link>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0064e0]">
              Dispute Intake Protocol
            </span>
            <span className="size-1 rounded-full bg-[#8899a6]" />
            <span className="text-xs font-bold text-[#657786]">KP Form 7</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0a1317]">
            File New Blotter Docket
          </h1>
          <p className="text-sm text-[#657786] mt-1">
            Record sworn complaint details and initialize mandatory statutory mediation under RA 7160.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-xs font-bold text-[#e02424]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Card 1: Dispute Overview & Narrative */}
        <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs space-y-6">
          <div className="pb-4 border-b border-[#f0f2f5]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8899a6] block mb-1">
              Section 1
            </span>
            <h3 className="text-lg font-bold text-[#0a1317]">
              Complaint & Incident Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="complaintTitle" className="text-xs font-bold text-[#1c2b33]">
                Complaint Title / Cause of Action *
              </Label>
              <Input
                id="complaintTitle"
                name="complaintTitle"
                placeholder="e.g. Boundary & Right-of-Way Dispute"
                required
                value={form.complaintTitle}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personnelInCharge" className="text-xs font-bold text-[#1c2b33]">
                Officer In-Charge / Assigned Mediator
              </Label>
              <Select
                value={form.personnelInCharge}
                onValueChange={(val) =>
                  setForm((prev) => ({
                    ...prev,
                    personnelInCharge: (val as string) || "",
                  }))
                }
              >
                <SelectTrigger id="personnelInCharge">
                  <SelectValue placeholder="Select Lupon officer..." />
                </SelectTrigger>
                <SelectContent>
                  {PERSONNEL.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complaintDetails" className="text-xs font-bold text-[#1c2b33]">
              Sworn Narration of Facts & Specific Relief Sought *
            </Label>
            <Textarea
              id="complaintDetails"
              name="complaintDetails"
              placeholder="Detail the specific incidents, exact dates, location in the barangay, and the resolution requested by the complainant..."
              className="min-h-[140px] rounded-xl border-[#e4e6eb] p-4 text-sm font-sans focus-visible:border-[#0064e0]"
              required
              value={form.complaintDetails}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Card 2: Complainant (Nagsusumbong) */}
        <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs space-y-6">
          <div className="pb-4 border-b border-[#f0f2f5]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0064e0] block mb-1">
              Section 2
            </span>
            <h3 className="text-lg font-bold text-[#0a1317]">
              Complainant Information (Nagsusumbong)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="complainantName" className="text-xs font-bold text-[#1c2b33]">
                Full Legal Name *
              </Label>
              <Input
                id="complainantName"
                name="complainantName"
                placeholder="e.g. Juan C. Dela Cruz"
                required
                value={form.complainantName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="complainantAge" className="text-xs font-bold text-[#1c2b33]">
                Age
              </Label>
              <Input
                id="complainantAge"
                name="complainantAge"
                type="number"
                min="1"
                max="120"
                placeholder="e.g. 42"
                value={form.complainantAge}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="complainantAddress" className="text-xs font-bold text-[#1c2b33]">
                Residential Address in Barangay
              </Label>
              <Input
                id="complainantAddress"
                name="complainantAddress"
                placeholder="e.g. Zone 4, Barangay Poblacion"
                value={form.complainantAddress}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Respondent (Ipinagsusumbong) */}
        <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs space-y-6">
          <div className="pb-4 border-b border-[#f0f2f5]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#e02424] block mb-1">
              Section 3
            </span>
            <h3 className="text-lg font-bold text-[#0a1317]">
              Respondent Information (Ipinagsusumbong)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="respondentName" className="text-xs font-bold text-[#1c2b33]">
                Full Legal Name *
              </Label>
              <Input
                id="respondentName"
                name="respondentName"
                placeholder="e.g. Pedro S. Penduko"
                required
                value={form.respondentName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="respondentAge" className="text-xs font-bold text-[#1c2b33]">
                Age
              </Label>
              <Input
                id="respondentAge"
                name="respondentAge"
                type="number"
                min="1"
                max="120"
                placeholder="e.g. 38"
                value={form.respondentAge}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="respondentAddress" className="text-xs font-bold text-[#1c2b33]">
                Residential Address (for Summons delivery)
              </Label>
              <Input
                id="respondentAddress"
                name="respondentAddress"
                placeholder="e.g. Zone 4, Barangay Poblacion"
                value={form.respondentAddress}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Reassurance Banner */}
        <div className="rounded-2xl bg-[#f5f6f8] border border-[#e4e6eb] p-5 flex items-start gap-3">
          <ShieldCheck className="size-5 text-[#0064e0] shrink-0 mt-0.5" />
          <div className="text-xs text-[#657786] leading-relaxed">
            <span className="font-bold text-[#0a1317]">Legal Statutory Compliance: </span>
            Submitting this blotter entry will assign a permanent docket code, log the case into Turso libSQL cloud storage, and trigger the mandatory 15-day Punong Barangay mediation period pursuant to Section 410 of Republic Act 7160.
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f0f2f5]">
          <Link
            href="/dashboard/cases"
            className="btn-pill-secondary text-sm px-6 py-2.5"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            variant="cobalt"
            disabled={loading}
            className="px-8 py-3 text-sm flex items-center gap-2"
          >
            <span>{loading ? "Recording Docket..." : "Record Blotter & Open Docket"}</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
