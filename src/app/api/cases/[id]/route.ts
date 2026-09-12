import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/cases/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const caseRecord = await db.case.findUnique({
      where: { id },
      include: { hearings: { orderBy: { scheduledAt: "asc" } } },
    });

    if (!caseRecord) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    return NextResponse.json(caseRecord);
  } catch (error) {
    console.error("GET /api/cases/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch case" },
      { status: 500 }
    );
  }
}

// PATCH /api/cases/[id] - update case status or details
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedCase = await db.case.update({
      where: { id },
      data: {
        ...(body.status && { status: body.status }),
        ...(body.personnelInCharge && {
          personnelInCharge: body.personnelInCharge,
        }),
        ...(body.complaintDetails && {
          complaintDetails: body.complaintDetails,
        }),
      },
      include: { hearings: true },
    });

    return NextResponse.json(updatedCase);
  } catch (error) {
    console.error("PATCH /api/cases/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update case" },
      { status: 500 }
    );
  }
}
