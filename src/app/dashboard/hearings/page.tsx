"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronRight, Plus, AlertCircle, Gavel, Users } from "lucide-react";
import { format, isPast } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Hearing {
  id: string;
  scheduledAt: string;
  type: string;
  notes?: string;
  case: {
    id: string;
    caseNumber: string;
    complaintTitle: string;
    complainantName: string;
    respondentName: string;
    status: string;
  };
}

export default function HearingsPage() {
  const [hearings, setHearings] = useState<Hearing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "UPCOMING" | "PAST">("ALL");

  useEffect(() => {
    const fetchHearings = async () => {
      try {
        const res = await fetch("/api/hearings");
        if (res.ok) {
          const data = await res.json();
          setHearings(data);
        }
      } catch (err) {
        console.error("Failed to fetch hearings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHearings();
  }, []);

  const upcoming = hearings.filter((h) => !isPast(new Date(h.scheduledAt)));
  const past = hearings.filter((h) => isPast(new Date(h.scheduledAt)));

  const filteredHearings =
    filter === "UPCOMING" ? upcoming : filter === "PAST" ? past : hearings;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#f0f2f5]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0064e0]">
              Session Hall Registry
            </span>
            <span className="size-1 rounded-full bg-[#8899a6]" />
            <span className="text-xs font-bold text-[#657786]">Conciliation Calendar</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0a1317]">
            Hearings Schedule
          </h1>
          <p className="text-sm text-[#657786] mt-1">
            Official calendar of Punong Barangay mediations, Pangkat conciliations, and arbitrations.
          </p>
        </div>

        <Link
          href="/dashboard/cases"
          className="btn-pill-cobalt text-sm px-6 py-2.5 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Schedule from Docket</span>
        </Link>
      </div>

      {/* 2. Filter Pills */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter("ALL")}
          className={cn(
            "rounded-full px-5 py-2 text-xs md:text-sm font-bold transition-all cursor-pointer",
            filter === "ALL"
              ? "bg-[#14161a] text-white shadow-2xs"
              : "bg-white text-[#465a65] border border-[#e4e6eb] hover:bg-[#f5f6f8]"
          )}
        >
          All Sessions ({hearings.length})
        </button>
        <button
          onClick={() => setFilter("UPCOMING")}
          className={cn(
            "rounded-full px-5 py-2 text-xs md:text-sm font-bold transition-all cursor-pointer",
            filter === "UPCOMING"
              ? "bg-[#14161a] text-white shadow-2xs"
              : "bg-white text-[#465a65] border border-[#e4e6eb] hover:bg-[#f5f6f8]"
          )}
        >
          Upcoming ({upcoming.length})
        </button>
        <button
          onClick={() => setFilter("PAST")}
          className={cn(
            "rounded-full px-5 py-2 text-xs md:text-sm font-bold transition-all cursor-pointer",
            filter === "PAST"
              ? "bg-[#14161a] text-white shadow-2xs"
              : "bg-white text-[#465a65] border border-[#e4e6eb] hover:bg-[#f5f6f8]"
          )}
        >
          Past Minutes ({past.length})
        </button>
      </div>

      {/* 3. Hearings List Container ({rounded.xxxl} 32px rounded) */}
      <div className="rounded-[32px] bg-white border border-[#f0f2f5] p-6 md:p-8 shadow-2xs space-y-4">
        {loading ? (
          <div className="py-20 text-center text-sm font-bold text-[#8899a6]">
            Loading hearing schedules...
          </div>
        ) : filteredHearings.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <Calendar className="h-10 w-10 text-[#8899a6] mx-auto opacity-40" />
            <p className="text-base font-bold text-[#0a1317]">No hearings found for this filter</p>
            <p className="text-xs text-[#657786]">
              To schedule a conciliation hearing, open any active docket from the Cases view.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHearings.map((h) => {
              const hearingDate = new Date(h.scheduledAt);
              const isUpcoming = !isPast(hearingDate);

              return (
                <Link
                  key={h.id}
                  href={`/dashboard/cases/${h.case.id}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[#f0f2f5] bg-white hover:bg-[#fbfcff] hover:border-[#0064e0]/30 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    {/* Date Block */}
                    <div
                      className={cn(
                        "flex flex-col items-center justify-center size-14 rounded-2xl shrink-0 font-bold border",
                        isUpcoming
                          ? "bg-[#0064e0] text-white border-[#0064e0]"
                          : "bg-[#f5f6f8] text-[#657786] border-[#e4e6eb]"
                      )}
                    >
                      <span className="text-lg leading-none">{format(hearingDate, "dd")}</span>
                      <span className="text-[10px] uppercase mt-0.5">{format(hearingDate, "MMM")}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-[#0064e0]">
                          {h.case.caseNumber}
                        </span>
                        <span className="rounded-full bg-[#f5f6f8] border border-[#e4e6eb] px-2.5 py-0.5 text-[10px] font-bold text-[#465a65] uppercase">
                          {h.type}
                        </span>
                        {isUpcoming ? (
                          <Badge variant="cobalt" className="text-[10px]">
                            Upcoming
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px]">
                            Completed
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-sm font-bold text-[#0a1317] group-hover:text-[#0064e0] transition-colors">
                        {h.case.complaintTitle}
                      </h3>

                      <p className="text-xs text-[#657786]">
                        {h.case.complainantName} vs. {h.case.respondentName}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-[#8899a6] pt-1">
                        <Clock className="size-3.5 text-[#f59e0b]" />
                        <span>{format(hearingDate, "h:mm a")}</span>
                        {h.notes && (
                          <>
                            <span>•</span>
                            <span className="truncate max-w-sm">{h.notes}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                    <span className="text-xs font-bold text-[#0064e0] group-hover:underline flex items-center gap-1">
                      Open Docket <ChevronRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
