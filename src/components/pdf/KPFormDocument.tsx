import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    fontSize: 11,
    lineHeight: 1.6,
    color: "#111",
  },
  headerSection: {
    textAlign: "center",
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 10,
  },
  headerBold: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  formTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 4,
    textDecoration: "underline",
  },
  partiesSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 14,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "#555",
  },
  partiesLeft: {
    width: "55%",
  },
  partiesRight: {
    width: "40%",
    alignItems: "flex-end",
  },
  partyName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  partyLabel: {
    fontSize: 9,
    color: "#444",
    marginBottom: 4,
  },
  partyDetail: {
    fontSize: 9,
    color: "#555",
  },
  vsText: {
    marginVertical: 5,
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#333",
  },
  caseInfo: {
    fontSize: 10,
    marginBottom: 3,
  },
  caseInfoBold: {
    fontFamily: "Helvetica-Bold",
  },
  body: {
    marginTop: 12,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 11,
    textAlign: "justify",
    marginBottom: 10,
  },
  signatureSection: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    width: "45%",
    alignItems: "center",
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#000",
    width: "100%",
    paddingTop: 4,
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  signatureLabel: {
    fontSize: 9,
    color: "#555",
    textAlign: "center",
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: "center",
    fontSize: 8,
    color: "#999",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    paddingTop: 6,
  },
});

interface KPFormProps {
  formNumber: number;
  caseNumber: string;
  complainants: string;
  complainantAge?: number;
  complainantAddress?: string;
  respondents: string;
  respondentAge?: number;
  respondentAddress?: string;
  dateFiled: string;
  title: string;
  content: string;
  personnelInCharge?: string;
}

const formDescriptions: Record<number, string> = {
  7: "COMPLAINANT'S STATEMENT",
  8: "NOTICE OF HEARING (PB)",
  9: "SUMMONS",
  10: "NOTICE OF HEARING",
  16: "AMICABLE SETTLEMENT (KASUNDUAN)",
  20: "CERTIFICATE TO FILE ACTION",
};

export const KPFormDocument = ({
  formNumber,
  caseNumber,
  complainants,
  complainantAge,
  complainantAddress,
  respondents,
  respondentAge,
  respondentAddress,
  dateFiled,
  title,
  content,
  personnelInCharge,
}: KPFormProps) => {
  const today = new Date(dateFiled);
  const formattedDate = today.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Government Header */}
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>Republic of the Philippines</Text>
          <Text style={styles.headerText}>
            Province / City / Municipality of _______________
          </Text>
          <Text style={styles.headerBold}>
            OFFICE OF THE LUPONG TAGAPAMAYAPA
          </Text>
          <Text style={styles.headerText}>Barangay _______________</Text>
        </View>

        {/* Form Title */}
        <Text style={styles.formTitle}>
          KP FORM NO. {formNumber} — {formDescriptions[formNumber] || title.toUpperCase()}
        </Text>

        {/* Parties */}
        <View style={styles.partiesSection}>
          <View style={styles.partiesLeft}>
            <Text style={styles.partyName}>{complainants.toUpperCase()}</Text>
            {complainantAge && (
              <Text style={styles.partyDetail}>Age: {complainantAge}</Text>
            )}
            {complainantAddress && (
              <Text style={styles.partyDetail}>{complainantAddress}</Text>
            )}
            <Text style={styles.partyLabel}>Complainant</Text>
            <Text style={styles.vsText}>— versus —</Text>
            <Text style={styles.partyName}>{respondents.toUpperCase()}</Text>
            {respondentAge && (
              <Text style={styles.partyDetail}>Age: {respondentAge}</Text>
            )}
            {respondentAddress && (
              <Text style={styles.partyDetail}>{respondentAddress}</Text>
            )}
            <Text style={styles.partyLabel}>Respondent</Text>
          </View>
          <View style={styles.partiesRight}>
            <Text style={styles.caseInfo}>
              Barangay Case No.:{" "}
              <Text style={styles.caseInfoBold}>{caseNumber}</Text>
            </Text>
            <Text style={styles.caseInfo}>
              For: <Text style={styles.caseInfoBold}>{title}</Text>
            </Text>
            <Text style={styles.caseInfo}>Date Filed: {formattedDate}</Text>
            {personnelInCharge && (
              <Text style={styles.caseInfo}>
                In-Charge: {personnelInCharge}
              </Text>
            )}
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.bodyText}>{content}</Text>
        </View>

        {/* Signature Block */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine}>
              <Text>{complainants.toUpperCase()}</Text>
            </View>
            <Text style={styles.signatureLabel}>Complainant's Signature</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine}>
              <Text>
                {personnelInCharge
                  ? personnelInCharge.toUpperCase()
                  : "PUNONG BARANGAY / LUPON"}
              </Text>
            </View>
            <Text style={styles.signatureLabel}>
              Punong Barangay / Lupon Tagapamayapa
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated by KP System • Katarungang Pambarangay Management •{" "}
          {new Date().toLocaleDateString("en-PH")}
        </Text>
      </Page>
    </Document>
  );
};
