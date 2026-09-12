"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const PERSONNEL = [
  "Maria Santos",
  "Jose Reyes",
  "Ana Villanueva",
  "Roberto Aquino",
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
        setError(data.error || "Failed to save case.");
        setLoading(false);
        return;
      }

      router.push(`/dashboard/cases/${data.id}`);
    } catch {
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/cases"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Case / Blotter</h2>
          <p className="text-muted-foreground">
            Register a new barangay dispute or incident
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Case Details */}
          <Card>
            <CardHeader>
              <CardTitle>Case Details</CardTitle>
              <CardDescription>
                General information about the complaint.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <Label htmlFor="complaintTitle">Complaint Title *</Label>
                  <Input
                    id="complaintTitle"
                    name="complaintTitle"
                    placeholder="e.g. Boundary Dispute"
                    required
                    value={form.complaintTitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <Label htmlFor="personnelInCharge">Personnel In-Charge</Label>
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
                      <SelectValue placeholder="Select personnel" />
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
                <Label htmlFor="complaintDetails">Complaint Details *</Label>
                <Textarea
                  id="complaintDetails"
                  name="complaintDetails"
                  placeholder="Describe the incident in full detail including time, place, and circumstances..."
                  className="min-h-[120px]"
                  required
                  value={form.complaintDetails}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Complainant */}
          <Card>
            <CardHeader>
              <CardTitle>Complainant</CardTitle>
              <CardDescription>
                Details of the person filing the complaint.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <Label htmlFor="complainantName">Full Name *</Label>
                  <Input
                    id="complainantName"
                    name="complainantName"
                    placeholder="Juan Dela Cruz"
                    required
                    value={form.complainantName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complainantAge">Age</Label>
                  <Input
                    id="complainantAge"
                    name="complainantAge"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="30"
                    value={form.complainantAge}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="complainantAddress">Address</Label>
                  <Input
                    id="complainantAddress"
                    name="complainantAddress"
                    placeholder="123 Barangay St., Brgy. Sample"
                    value={form.complainantAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Respondent */}
          <Card>
            <CardHeader>
              <CardTitle>Respondent</CardTitle>
              <CardDescription>
                Details of the person being complained about.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <Label htmlFor="respondentName">Full Name *</Label>
                  <Input
                    id="respondentName"
                    name="respondentName"
                    placeholder="Pedro Penduko"
                    required
                    value={form.respondentName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="respondentAge">Age</Label>
                  <Input
                    id="respondentAge"
                    name="respondentAge"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="35"
                    value={form.respondentAge}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="respondentAddress">Address</Label>
                  <Input
                    id="respondentAddress"
                    name="respondentAddress"
                    placeholder="456 Barangay St., Brgy. Sample"
                    value={form.respondentAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 border-t pt-6">
              <Link
                href="/dashboard/cases"
                className={buttonVariants({ variant: "outline" })}
              >
                Cancel
              </Link>
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-500"
              >
                {loading ? "Saving..." : "Save Case & View Record"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  );
}
