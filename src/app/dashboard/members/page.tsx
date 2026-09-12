"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Plus, ShieldCheck, UserCheck, Scale, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Member {
  id: string;
  username: string;
  name: string;
  role: string;
  createdAt: string;
}

const getRoleBadge = (role: string) => {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return <Badge variant="critical">Punong Barangay (Admin)</Badge>;
    case "LUPON":
      return <Badge variant="cobalt">Lupon Conciliator</Badge>;
    default:
      return <Badge variant="secondary">Barangay Staff</Badge>;
  }
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    role: "LUPON",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/members");
      if (res.ok) setMembers(await res.json());
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to add member");
        setSaving(false);
        return;
      }
      setOpen(false);
      setForm({ name: "", username: "", password: "", role: "LUPON" });
      fetchMembers();
    } catch {
      setError("Connection error");
    }
    setSaving(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header & Modal CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#f0f2f5]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0064e0]">
              Lupong Tagapamayapa
            </span>
            <span className="size-1 rounded-full bg-[#8899a6]" />
            <span className="text-xs font-bold text-[#657786]">Section 399, RA 7160</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0a1317]">
            Lupon Members & Personnel
          </h1>
          <p className="text-sm text-[#657786] mt-1">
            Authorized conciliators, mediators, and administrative staff for barangay justice.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="btn-pill-cobalt text-sm px-6 py-2.5 flex items-center gap-2 self-start sm:self-auto cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>Appoint Member</span>
          </DialogTrigger>
          <DialogContent className="rounded-[28px]">
            <DialogHeader>
              <DialogTitle>Appoint Lupon Member / Staff</DialogTitle>
              <DialogDescription>
                Register an appointed peace conciliator or barangay administrative secretary.
              </DialogDescription>
            </DialogHeader>
            {error && (
              <div className="text-xs font-bold text-[#e02424] bg-red-50 border border-red-200 rounded-xl p-3">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="member-name" className="text-xs font-bold">Full Name *</Label>
                <Input
                  id="member-name"
                  placeholder="e.g. Atty. Roberto C. Santos"
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="member-username" className="text-xs font-bold">Username *</Label>
                <Input
                  id="member-username"
                  placeholder="e.g. rsantos"
                  required
                  value={form.username}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, username: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="member-password" className="text-xs font-bold">Password *</Label>
                <Input
                  id="member-password"
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="member-role" className="text-xs font-bold">Official Role</Label>
                <Select
                  value={form.role}
                  onValueChange={(v) => setForm((p) => ({ ...p, role: v ?? "LUPON" }))}
                >
                  <SelectTrigger id="member-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LUPON">Lupon Conciliator</SelectItem>
                    <SelectItem value="ADMIN">Punong Barangay (Admin)</SelectItem>
                    <SelectItem value="STAFF">Barangay Secretary / Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className="gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="cobalt" disabled={saving}>
                  {saving ? "Registering..." : "Confirm Appointment"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reassurance Callout */}
      <div className="rounded-[28px] bg-white border border-[#f0f2f5] p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-2xl bg-[#0064e0]/10 flex items-center justify-center text-[#0064e0]">
            <Award className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0a1317]">
              Lupong Tagapamayapa Statutory Constitution
            </h4>
            <p className="text-xs text-[#657786]">
              Every barangay maintains 10 to 20 members appointed every 3 years by the Punong Barangay.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#0064e0] bg-[#0064e0]/10 px-3 py-1 rounded-full w-fit">
          {members.length} Active Appointees
        </span>
      </div>

      {/* Members Grid ({rounded.xxxl} 32px Cards) */}
      {loading ? (
        <div className="py-20 text-center text-sm font-bold text-[#8899a6]">
          Loading Lupon directory...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <div
              key={m.id}
              className="rounded-[28px] bg-white border border-[#f0f2f5] p-6 shadow-2xs hover:border-[#0064e0]/30 transition-all space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-[#14161a] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-2xs">
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-[#0a1317] truncate">
                    {m.name}
                  </h3>
                  <p className="text-xs text-[#8899a6] truncate">
                    @{m.username}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f0f2f5] flex items-center justify-between">
                <div>{getRoleBadge(m.role)}</div>
                <div className="flex items-center gap-1 text-[11px] text-[#8899a6]">
                  <UserCheck className="size-3 text-[#00875a]" />
                  <span>
                    {new Date(m.createdAt).toLocaleDateString("en-PH", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
