"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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
  RotateCcw,
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
    // Load current session
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setCurrentUser(data.user);
      })
      .catch(() => {});

    // Load persisted settings from localStorage if available
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
      setSavedMessage("Settings saved successfully!");
      setTimeout(() => setSavedMessage(""), 3500);
    }, 400);
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Barangay Settings</h2>
        <p className="text-muted-foreground">
          Configure jurisdiction information, Lupon officials, and KP
          proceedings parameters
        </p>
      </div>

      {savedMessage && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          <CheckCircle className="h-4 w-4 text-green-600" />
          {savedMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Barangay Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <CardTitle>Barangay Profile & Jurisdiction</CardTitle>
            </div>
            <CardDescription>
              This information will be displayed on all generated KP Forms,
              summons, and hearing notices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="barangayName">Barangay Name</Label>
                <Input
                  id="barangayName"
                  name="barangayName"
                  value={barangaySettings.barangayName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipality">City / Municipality</Label>
                <Input
                  id="municipality"
                  name="municipality"
                  value={barangaySettings.municipality}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province / District</Label>
                <Input
                  id="province"
                  name="province"
                  value={barangaySettings.province}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  name="region"
                  value={barangaySettings.region}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 col-span-1 md:col-span-2">
                <Label htmlFor="hallAddress">Barangay Hall Address</Label>
                <Input
                  id="hallAddress"
                  name="hallAddress"
                  value={barangaySettings.hallAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  value={barangaySettings.contactNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Official Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={barangaySettings.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lupon Tagapamayapa Leadership */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              <CardTitle>Lupon Tagapamayapa Leadership</CardTitle>
            </div>
            <CardDescription>
              Key officials authorized to preside over mediation hearings and sign
              KP certificates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="punongBarangay">
                  Punong Barangay (Lupon Chairman)
                </Label>
                <Input
                  id="punongBarangay"
                  name="punongBarangay"
                  value={barangaySettings.punongBarangay}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Presides over the initial 15-day mediation stage.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="luponSecretary">
                  Barangay Secretary / Lupon Secretary
                </Label>
                <Input
                  id="luponSecretary"
                  name="luponSecretary"
                  value={barangaySettings.luponSecretary}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Responsible for issuing notices and keeping blotter records.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KP Law Standards */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-amber-600" />
              <CardTitle>KP Statutory Timeline (RA 7160)</CardTitle>
            </div>
            <CardDescription>
              Default statutory time frames under Chapter 7 of the Local
              Government Code of 1991.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mediationDaysLimit">
                  Mediation Limit (Days)
                </Label>
                <Input
                  id="mediationDaysLimit"
                  name="mediationDaysLimit"
                  type="number"
                  value={barangaySettings.mediationDaysLimit}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  Standard: 15 days before Punong Barangay
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="conciliationDaysLimit">
                  Conciliation Limit (Days)
                </Label>
                <Input
                  id="conciliationDaysLimit"
                  name="conciliationDaysLimit"
                  type="number"
                  value={barangaySettings.conciliationDaysLimit}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  Standard: 15 days before Pangkat Tagapagkasundo
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="casePrefix">Case Number Prefix</Label>
                <Input
                  id="casePrefix"
                  name="casePrefix"
                  value={barangaySettings.casePrefix}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  Format prefix for new blotters
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current User Session */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-slate-600" />
              <CardTitle>Session & Security</CardTitle>
            </div>
            <CardDescription>
              Your currently authenticated account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50">
              <div>
                <p className="font-semibold text-slate-900">
                  {currentUser?.name || "Loading..."}
                </p>
                <p className="text-sm text-slate-500">
                  Username: @{currentUser?.username || "—"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">
                  {currentUser?.role || "STAFF"}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t pt-4">
            <p className="text-xs text-muted-foreground">
              Authentication powered by Iron Session (encrypted cookie)
            </p>
            <Button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-500"
            >
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
