import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const hearings = await db.hearing.findMany({
      orderBy: { scheduledAt: "desc" },
      include: {
        case: {
          select: {
            id: true,
            caseNumber: true,
            complaintTitle: true,
            complainantName: true,
            respondentName: true,
            status: true,
          },
        },
      },
    });
    return NextResponse.json(hearings);
  } catch (error) {
    console.error("GET /api/hearings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hearings" },
      { status: 500 }
    );
  }
}
