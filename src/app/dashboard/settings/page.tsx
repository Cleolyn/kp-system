"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Shield,
  Scale,
  Users,
  CheckCircle,
  Save,
  ShieldCheck,
  Server,
} from "lucide-react";

export default function SettingsPage() {
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    username: string;
    role: string;
  } | null>(null);

  const [barangaySettings, setBarangaySettings] = useState({
    barangayName: "Barangay San Antonio",
    municipality: "Pasig City",
    province: "Metro Manila",
    region: "National Capital Region (NCR)",
    hallAddress: "101 General Malvar St., Brgy. San Antonio, Pasig City",
    contactNumber: "(02) 8631-0000",
    email: "lupon@sanantonio.pasig.gov.ph",
    punongBarangay: "Hon. Juan Dela Cruz",
    luponSecretary: "Maria Santos",
    casePrefix: "KP-2026-",
    mediationDaysLimit: "15",
    conciliationDaysLimit: "15",
  });

  const [savedMessage, setSavedMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setCurrentUser(data.user);
      })
      .catch(() => {});

    const saved = localStorage.getItem("kp_barangay_settings");
    if (saved) {
      try {
        setBarangaySettings(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBarangaySettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    localStorage.setItem(
      "kp_barangay_settings",
      JSON.stringify(barangaySettings)
    );
    setTimeout(() => {
      setSaving(false);
      setSavedMessage("Barangay parameters saved successfully!");
      setTimeout(() => setSavedMessage(""), 3500);
    }, 400);
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#f0f2f5]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0064e0]">
              Configuration & Jurisdiction
            </span>
            <span className="size-1 rounded-full bg-[#8899a6]" />
            <span className="text-xs font-bold text-[#657786]">RA 7160 System Parameters</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0a1317]">
            Barangay Settings
          </h1>
          <p className="text-sm text-[#657786] mt-1">
            Configure official municipality details, Lupon officials, and statutory timeline limits.
          </p>
        </div>
      </div>

      {savedMessage && (
        <div className="flex items-center gap-2 rounded-2xl bg-[#00875a]/10 border border-[#00875a]/20 p-4 text-xs font-bold text-[#00875a]">
          <CheckCircle className="size-4" />
          <span>{savedMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Card 1: Barangay Profile */}
        <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#f0f2f5]">
            <div className="size-10 rounded-2xl bg-[#0064e0]/10 flex items-center justify-center text-[#0064e0]">
              <Building2 className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0a1317]">
                Barangay Jurisdiction Profile
              </h3>
              <p className="text-xs text-[#657786]">
                Appears on all printed KP forms, summons, notices, and official certificates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="barangayName" className="text-xs font-bold">Barangay Name</Label>
              <Input
                id="barangayName"
                name="barangayName"
                value={barangaySettings.barangayName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="municipality" className="text-xs font-bold">City / Municipality</Label>
              <Input
                id="municipality"
                name="municipality"
                value={barangaySettings.municipality}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="province" className="text-xs font-bold">Province / Metro Area</Label>
              <Input
                id="province"
                name="province"
                value={barangaySettings.province}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="region" className="text-xs font-bold">Administrative Region</Label>
              <Input
                id="region"
                name="region"
                value={barangaySettings.region}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="hallAddress" className="text-xs font-bold">Barangay Hall Official Address</Label>
              <Input
                id="hallAddress"
                name="hallAddress"
                value={barangaySettings.hallAddress}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contactNumber" className="text-xs font-bold">Contact Telephone</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={barangaySettings.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold">Official Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={barangaySettings.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Leadership */}
        <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#f0f2f5]">
            <div className="size-10 rounded-2xl bg-[#0064e0]/10 flex items-center justify-center text-[#0064e0]">
              <Users className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0a1317]">
                Lupon Tagapamayapa Leadership
              </h3>
              <p className="text-xs text-[#657786]">
                Designated signatories for official Katarungang Pambarangay proceedings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="punongBarangay" className="text-xs font-bold">
                Punong Barangay (Lupon Chairman)
              </Label>
              <Input
                id="punongBarangay"
                name="punongBarangay"
                value={barangaySettings.punongBarangay}
                onChange={handleChange}
                required
              />
              <p className="text-[11px] text-[#8899a6]">
                Presides over initial 15-day Punong Barangay mediation.
              </p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="luponSecretary" className="text-xs font-bold">
                Barangay / Lupon Secretary
              </Label>
              <Input
                id="luponSecretary"
                name="luponSecretary"
                value={barangaySettings.luponSecretary}
                onChange={handleChange}
                required
              />
              <p className="text-[11px] text-[#8899a6]">
                Attests notices, summons, and certified true copies.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Statutory Standards */}
        <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#f0f2f5]">
            <div className="size-10 rounded-2xl bg-[#ffd700]/20 flex items-center justify-center text-[#0a1317]">
              <Scale className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0a1317]">
                Statutory Timelines (RA 7160 Chapter 7)
              </h3>
              <p className="text-xs text-[#657786]">
                Rules for statutory countdowns before issuing Certificate to File Action.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <Label htmlFor="mediationDaysLimit" className="text-xs font-bold">
                Mediation Window (Days)
              </Label>
              <Input
                id="mediationDaysLimit"
                name="mediationDaysLimit"
                type="number"
                value={barangaySettings.mediationDaysLimit}
                onChange={handleChange}
              />
              <p className="text-[11px] text-[#8899a6]">Default: 15 statutory days</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="conciliationDaysLimit" className="text-xs font-bold">
                Pangkat Conciliation (Days)
              </Label>
              <Input
                id="conciliationDaysLimit"
                name="conciliationDaysLimit"
                type="number"
                value={barangaySettings.conciliationDaysLimit}
                onChange={handleChange}
              />
              <p className="text-[11px] text-[#8899a6]">Extendible by 15 days</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="casePrefix" className="text-xs font-bold">
                Docket Sequence Prefix
              </Label>
              <Input
                id="casePrefix"
                name="casePrefix"
                value={barangaySettings.casePrefix}
                onChange={handleChange}
              />
              <p className="text-[11px] text-[#8899a6]">Format: KP-YYYY-</p>
            </div>
          </div>
        </div>

        {/* Card 4: Infrastructure & Security */}
        <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#f0f2f5]">
            <div className="size-10 rounded-2xl bg-[#00875a]/10 flex items-center justify-center text-[#00875a]">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0a1317]">
                Infrastructure & Authentication Status
              </h3>
              <p className="text-xs text-[#657786]">
                Edge database and identity verification connection status.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#f5f6f8] p-4 border border-[#e4e6eb] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0a1317]">Turso libSQL Cloud</span>
                <span className="size-2 rounded-full bg-[#00875a]" />
              </div>
              <p className="text-[11px] text-[#657786]">
                Connected to aws-ap-northeast-1 instance (Tokyo).
              </p>
            </div>

            <div className="rounded-2xl bg-[#f5f6f8] p-4 border border-[#e4e6eb] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0a1317]">Clerk Enterprise Auth</span>
                <span className="size-2 rounded-full bg-[#0064e0]" />
              </div>
              <p className="text-[11px] text-[#657786]">
                Authenticated as authorized barangay personnel.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-[#f0f2f5]">
            <Button
              type="submit"
              variant="cobalt"
              disabled={saving}
              className="px-8 py-3 text-sm flex items-center gap-2"
            >
              <Save className="size-4" />
              <span>{saving ? "Saving Changes..." : "Save Barangay Settings"}</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
