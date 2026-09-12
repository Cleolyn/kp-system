import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST /api/cases/[id]/hearings - schedule a new hearing
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const hearing = await db.hearing.create({
      data: {
        caseId: id,
        scheduledAt: new Date(body.scheduledAt),
        type: body.type || "MEDIATION",
        notes: body.notes || null,
      },
    });

    return NextResponse.json(hearing, { status: 201 });
  } catch (error) {
    console.error("POST hearings error:", error);
    return NextResponse.json(
      { error: "Failed to schedule hearing" },
      { status: 500 }
    );
  }
}
