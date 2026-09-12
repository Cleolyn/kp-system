"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { format, isPast } from "date-fns";
import Link from "next/link";

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

  const HearingCard = ({ h }: { h: Hearing }) => {
    const hearingDate = new Date(h.scheduledAt);
    const isUpcoming = !isPast(hearingDate);

    return (
      <Link href={`/dashboard/cases/${h.case.id}`}>
        <div className="flex items-start gap-4 p-4 rounded-xl border bg-white hover:bg-slate-50 transition-colors cursor-pointer">
          <div
            className={`flex flex-col items-center justify-center h-14 w-14 rounded-xl flex-shrink-0 ${
              isUpcoming ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
            }`}
          >
            <span className="text-xl font-bold leading-none">
              {format(hearingDate, "dd")}
            </span>
            <span className="text-xs font-medium">
              {format(hearingDate, "MMM")}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-blue-700">
                {h.case.caseNumber}
              </span>
              <Badge variant="outline" className="text-xs">
                {h.type}
              </Badge>
              {isUpcoming ? (
                <Badge className="bg-blue-100 text-blue-800 text-xs">Upcoming</Badge>
              ) : (
                <Badge className="bg-slate-100 text-slate-600 text-xs">Past</Badge>
              )}
            </div>
            <p className="text-sm font-medium truncate">{h.case.complaintTitle}</p>
            <p className="text-xs text-muted-foreground">
              {h.case.complainantName} vs. {h.case.respondentName}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3" />
              {format(hearingDate, "h:mm a")}
              {h.notes && ` • ${h.notes}`}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Hearings Schedule</h2>
        <p className="text-muted-foreground">
          All scheduled mediation, conciliation, and arbitration hearings
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-muted-foreground">
          Loading hearings...
        </div>
      ) : hearings.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <Calendar className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>No hearings scheduled yet.</p>
            <p className="text-xs mt-1">
              Schedule a hearing from a case's detail page.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {upcoming.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Upcoming ({upcoming.length})
              </h3>
              {upcoming.map((h) => (
                <HearingCard key={h.id} h={h} />
              ))}
            </div>
          )}
          {past.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Past Hearings ({past.length})
              </h3>
              {past.map((h) => (
                <HearingCard key={h.id} h={h} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
