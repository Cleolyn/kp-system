const { PrismaClient } = require("@prisma/client");
const { PrismaLibSQL } = require("@prisma/adapter-libsql");
const { createClient } = require("@libsql/client");
const fs = require("fs");
const path = require("path");

if (typeof process.loadEnvFile === "function") {
  const envPath = path.join(__dirname, "..", ".env");
  if (fs.existsSync(envPath)) {
    try {
      process.loadEnvFile(envPath);
    } catch {}
  }
}

function getPrismaClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (url && authToken) {
    console.log("Seeding to Turso database: " + url);
    const libsql = createClient({ url, authToken });
    const adapter = new PrismaLibSQL(libsql);
    return new PrismaClient({ adapter });
  }
  console.log("Seeding to local SQLite database...");
  return new PrismaClient();
}

const prisma = getPrismaClient();

async function main() {
  // Seed admin user
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "admin123", // In production, hash this
      name: "Barangay Admin",
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { username: "secretary" },
    update: {},
    create: {
      username: "secretary",
      password: "sec123",
      name: "Maria Santos",
      role: "STAFF",
    },
  });

  await prisma.user.upsert({
    where: { username: "lupon1" },
    update: {},
    create: {
      username: "lupon1",
      password: "lupon123",
      name: "Jose Reyes",
      role: "LUPON",
    },
  });

  // Seed sample cases
  const case1 = await prisma.case.upsert({
    where: { caseNumber: "KP-2026-001" },
    update: {},
    create: {
      caseNumber: "KP-2026-001",
      dateFiled: new Date("2026-08-30"),
      complaintTitle: "Boundary Dispute",
      complainantName: "Juan Dela Cruz",
      complainantAge: 45,
      complainantAddress: "123 Mabini St., Brgy. Sample",
      respondentName: "Pedro Penduko",
      respondentAge: 52,
      respondentAddress: "456 Rizal Ave., Brgy. Sample",
      complaintDetails:
        "Complainant alleges that respondent has encroached on his property boundary by approximately 2 meters, building a fence on his land without consent.",
      status: "MEDIATION",
      personnelInCharge: "Jose Reyes",
    },
  });

  const case2 = await prisma.case.upsert({
    where: { caseNumber: "KP-2026-002" },
    update: {},
    create: {
      caseNumber: "KP-2026-002",
      dateFiled: new Date("2026-08-31"),
      complaintTitle: "Noise Disturbance",
      complainantName: "Maria Clara",
      complainantAge: 38,
      complainantAddress: "78 Luna St., Brgy. Sample",
      respondentName: "Crisostomo Ibarra",
      respondentAge: 40,
      respondentAddress: "90 Bonifacio Rd., Brgy. Sample",
      complaintDetails:
        "Respondent regularly plays loud music past midnight, disturbing the peace and sleep of complainant and her family.",
      status: "PENDING",
      personnelInCharge: "Maria Santos",
    },
  });

  await prisma.case.upsert({
    where: { caseNumber: "KP-2026-003" },
    update: {},
    create: {
      caseNumber: "KP-2026-003",
      dateFiled: new Date("2026-08-25"),
      complaintTitle: "Physical Injuries",
      complainantName: "Andres Bonifacio",
      complainantAge: 30,
      complainantAddress: "11 Kawit St., Brgy. Sample",
      respondentName: "Emilio Aguinaldo",
      respondentAge: 35,
      respondentAddress: "22 Cavite Rd., Brgy. Sample",
      complaintDetails:
        "Respondent allegedly punched and kicked complainant during a heated argument over a parking dispute.",
      status: "CONCILIATION",
      personnelInCharge: "Jose Reyes",
    },
  });

  await prisma.case.upsert({
    where: { caseNumber: "KP-2026-004" },
    update: {},
    create: {
      caseNumber: "KP-2026-004",
      dateFiled: new Date("2026-08-20"),
      complaintTitle: "Unpaid Debt",
      complainantName: "Jose Rizal",
      complainantAge: 50,
      complainantAddress: "5 Dapitan St., Brgy. Sample",
      respondentName: "Antonio Luna",
      respondentAge: 48,
      respondentAddress: "7 Calamba Rd., Brgy. Sample",
      complaintDetails:
        "Respondent borrowed PHP 15,000 from complainant eight months ago and has not made any payment despite repeated demands.",
      status: "SETTLED",
      personnelInCharge: "Maria Santos",
    },
  });

  // Seed hearings
  await prisma.hearing.create({
    data: {
      caseId: case1.id,
      scheduledAt: new Date("2026-09-15T14:00:00"),
      type: "MEDIATION",
      notes: "First mediation hearing. Both parties notified.",
    },
  });

  await prisma.hearing.create({
    data: {
      caseId: case2.id,
      scheduledAt: new Date("2026-09-16T10:00:00"),
      type: "CONCILIATION",
      notes: "Initial conciliation session.",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
