import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/cases - list all cases
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const cases = await db.case.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  { complainantName: { contains: search } },
                  { respondentName: { contains: search } },
                  { caseNumber: { contains: search } },
                  { complaintTitle: { contains: search } },
                ],
              }
            : {},
          status ? { status } : {},
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(cases);
  } catch (error) {
    console.error("GET /api/cases error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 }
    );
  }
}

// POST /api/cases - create new case
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Auto-generate case number
    const count = await db.case.count();
    const year = new Date().getFullYear();
    const caseNumber = `KP-${year}-${String(count + 1).padStart(3, "0")}`;

    const newCase = await db.case.create({
      data: {
        caseNumber,
        complaintTitle: body.complaintTitle,
        complainantName: body.complainantName,
        complainantAge: body.complainantAge ? parseInt(body.complainantAge) : null,
        complainantAddress: body.complainantAddress || null,
        respondentName: body.respondentName,
        respondentAge: body.respondentAge ? parseInt(body.respondentAge) : null,
        respondentAddress: body.respondentAddress || null,
        complaintDetails: body.complaintDetails,
        personnelInCharge: body.personnelInCharge || null,
        status: "PENDING",
      },
    });

    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    console.error("POST /api/cases error:", error);
    return NextResponse.json(
      { error: "Failed to create case" },
      { status: 500 }
    );
  }
}
