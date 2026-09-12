import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/dashboard/stats - real-time stats for dashboard
export async function GET(request: NextRequest) {
  try {
    const [totalCases, pendingCases, settledCases, activeLupon] = await Promise.all([
      db.case.count(),
      db.case.count({ where: { status: { not: "SETTLED" } } }),
      db.case.count({ where: { status: "SETTLED" } }),
      db.user.count({ where: { role: "LUPON" } }),
    ]);

    const upcomingHearings = await db.hearing.findMany({
      where: {
        scheduledAt: {
          gte: new Date(),
        },
      },
      orderBy: { scheduledAt: "asc" },
      take: 5,
      include: {
        case: {
          select: {
            caseNumber: true,
            complaintTitle: true,
            status: true,
          },
        },
      },
    });

    const recentCases = await db.case.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const settlementRate = totalCases > 0
      ? Math.round((settledCases / totalCases) * 100)
      : 0;

    return NextResponse.json({
      totalCases,
      pendingCases,
      settledCases,
      activeLupon,
      settlementRate,
      upcomingHearings,
      recentCases,
    });
  } catch (error) {
    console.error("GET /api/dashboard/stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
