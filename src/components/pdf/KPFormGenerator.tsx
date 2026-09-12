"use client";

import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { KPFormDocument } from "./KPFormDocument";

interface KPFormGeneratorProps {
  formNumber: number;
  caseData: any;
  buttonText?: string;
  variant?: "default" | "outline" | "ghost" | "secondary" | "cobalt";
  className?: string;
}

export const KPFormGenerator = ({
  formNumber,
  caseData,
  buttonText = "Generate KP Form",
  variant = "default",
  className,
}: KPFormGeneratorProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Button variant={variant} disabled size="sm">
        <Printer className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    );
  }

  let title = caseData.complaint_title || "Complaint";
  let content = "";

  if (formNumber === 7) {
    title = caseData.complaint_title || "Complaint";
    content = `I/WE hereby complain against the above-named respondent/s for the following acts:\n\n${caseData.complaint_details || ""}\n\nTHEREFORE, I/WE pray that this complaint be given due course and that the matter be resolved through the Lupong Tagapamayapa in accordance with the Katarungang Pambarangay Law (RA 7160).`;
  } else if (formNumber === 8) {
    title = "Notice of Hearing (Punong Barangay)";
    content = `TO: ${caseData.complainant?.name || "Complainant"}\n\nYou are hereby requested to appear before the Punong Barangay on a date to be set, at _______ o'clock in the morning/afternoon, for the mediation and conciliation of your complaint against ${caseData.respondent?.name || "Respondent"}.\n\nFAILURE TO APPEAR may result in the dismissal of your complaint without prejudice.\n\nIssued this ______ day of ____________, 20___.`;
  } else if (formNumber === 9) {
    title = "Summons";
    content = `TO: ${caseData.respondent?.name || "Respondent"}\n\nYou are hereby SUMMONED to appear before the Lupong Tagapamayapa of this Barangay on a date to be fixed, at _______ o'clock in the morning/afternoon, for the hearing of the complaint filed against you by ${caseData.complainant?.name || "Complainant"} for ${caseData.complaint_title || "the above-mentioned complaint"}.\n\nFAILURE to appear without justifiable cause shall constitute a waiver of your right to be present in the mediation/conciliation proceedings.\n\nGiven under my hand on the ______ day of ____________, 20___.`;
  } else if (formNumber === 10) {
    title = "Notice of Hearing";
    content = `NOTICE OF HEARING\n\nYou are hereby notified that the hearing of the above-entitled case is set on ______________, 20___ at ________ o'clock in the morning/afternoon at the Office of the Lupong Tagapamayapa, Barangay _______________.\n\nKindly make yourself available on the said date and time.\n\nMade this ______ day of ____________, 20___ at _______________.`;
  } else if (formNumber === 16) {
    title = "Amicable Settlement";
    content = `AMICABLE SETTLEMENT (KASUNDUAN)\n\nWe, complainant/s and respondent/s in the above-captioned case, do hereby agree to settle our dispute as follows:\n\n1. The parties agree to respect each other's rights and peace in the community.\n2. In satisfaction of the complaint regarding "${caseData.complaint_title || "the subject matter"}", the respondent hereby agrees to comply with the mutually agreed terms.\n3. The parties pledge and bind themselves to comply honestly and faithfully with the terms of this settlement.\n\nEntered into this ______ day of ____________, 20___ at the Barangay Hall.`;
  } else if (formNumber === 20) {
    title = "Certificate to File Action";
    content = `CERTIFICATE TO FILE ACTION (KATIBAYAN UPANG MAKADULOG SA HUKUMAN)\n\nThis is to certify that:\n\n1. There has been personal confrontation between the parties before the Punong Barangay / Pangkat Tagapagkasundo;\n2. A settlement was not reached / the settlement agreed upon has been repudiated;\n3. Therefore, the corresponding complaint for the dispute may now be filed in court / competent government office in accordance with Section 412 of RA 7160.\n\nIssued this ______ day of ____________, 20___ at the Office of the Lupong Tagapamayapa.`;
  }

  return (
    <PDFDownloadLink
      document={
        <KPFormDocument
          formNumber={formNumber}
          caseNumber={caseData.case_number}
          complainants={caseData.complainant?.name || "Complainant"}
          complainantAge={caseData.complainant?.age}
          complainantAddress={caseData.complainant?.address}
          respondents={caseData.respondent?.name || "Respondent"}
          respondentAge={caseData.respondent?.age}
          respondentAddress={caseData.respondent?.address}
          dateFiled={caseData.date_filed}
          title={title}
          content={content}
          personnelInCharge={caseData.personnel_in_charge}
        />
      }
      fileName={`KP_Form_${formNumber}_${caseData.case_number}.pdf`}
    >
      {/* @ts-ignore */}
      {({ loading }) => (
        <Button variant={variant} disabled={loading} size="sm" className={className}>
          <Printer className="mr-2 h-4 w-4" />
          {loading ? "Preparing PDF..." : buttonText}
        </Button>
      )}
    </PDFDownloadLink>
  );
};
