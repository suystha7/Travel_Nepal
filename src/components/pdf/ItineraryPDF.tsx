"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// import TravelLogo from "@/assest/logo/travel-logo.webp";

interface PdfData {
  name?: string;
  duration?: number;
  destination?: string;
  start_point?: string;
  end_point?: string;
  group_size?: string;
  current_price?: string;
  itinerary: any[];
  activity?: any[];
  meals?: any[];
  companyName?: string;
}

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", lineHeight: 1.4 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#1d5e41",
    paddingBottom: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  logo: { width: 100 },
  packageName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1d5e41",
    textAlign: "right",
    maxWidth: "70%",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1d5e41",
    marginBottom: 8,
    marginTop: 15,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 3,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#f0fdf4",
    padding: 12,
    borderRadius: 4,
    marginBottom: 15,
  },
  infoBox: { width: "33%", marginBottom: 10 },
  label: {
    fontSize: 7,
    color: "#1d5e41",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  value: { fontSize: 9, color: "#374151", marginTop: 2 },
  table: { width: "auto" },
  tableHeader: { backgroundColor: "#1d5e41", flexDirection: "row" },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#1d5e41",
  },
  headerText: { margin: 6, fontSize: 9, fontWeight: "bold", color: "#ffffff" },
  cellText: { margin: 6, fontSize: 8, color: "#374151" },
  dayCol: { width: "10%", borderRightWidth: 1, borderRightColor: "#1d5e41" },
  titleCol: { width: "30%", borderRightWidth: 1, borderRightColor: "#1d5e41" },
  descCol: { width: "65%" },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 7,
    color: "#9ca3af",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 8,
  },
});

const formatDestinations = (str?: string) => {
  if (!str) return "N/A";
  return str
    .split(",")
    .map(
      (item) =>
        item.trim().charAt(0).toUpperCase() + item.trim().slice(1).toLowerCase()
    )
    .join(", ");
};

const clean = (str: string) =>
  str
    ? str
        .replace(/<[^>]*>?/gm, "")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    : "N/A";

const PdfGenerator = ({ data }: { data: PdfData }) => {
  const {
    name,
    duration = 0,
    destination,
    start_point,
    end_point,
    group_size,
    current_price,
    itinerary = [],
    meals = [],
    companyName = "Travel Nepal Pvt. Ltd.",
  } = data;

  const mealSummary =
    meals.length > 0
      ? Array.from(new Set(meals.map((m: any) => m.title))).join(", ")
      : "Per Itinerary";

  return (
    <Document title={name || "Travel Itinerary"}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {/* <Image source={TravelLogo} style={styles.logo} /> */}
          <Text style={styles.packageName}>{name}</Text>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Duration</Text>
            <Text style={styles.value}>{duration} Days</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Route</Text>
            <Text style={styles.value}>
              {start_point || "N/A"} to {end_point || "N/A"}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Price</Text>
            <Text style={styles.value}>Rs. {current_price || "TBA"}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Destinations</Text>
            <Text style={styles.value}>{formatDestinations(destination)}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Group Size</Text>
            <Text style={styles.value}>{group_size || "Any"}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Meals</Text>
            <Text style={styles.value}>{mealSummary}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Daily Itinerary</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.dayCol}>
              <Text style={styles.headerText}>Day</Text>
            </View>
            <View style={styles.titleCol}>
              <Text style={styles.headerText}>Activity</Text>
            </View>
            <View style={styles.descCol}>
              <Text style={styles.headerText}>Details</Text>
            </View>
          </View>

          {itinerary.map((day, i) => (
            <View
              key={i}
              style={[
                styles.tableRow,
                { backgroundColor: i % 2 === 0 ? "#ffffff" : "#f9fafb" },
              ]}
              wrap={false}
            >
              <View style={styles.dayCol}>
                <Text style={[styles.cellText, { fontWeight: "bold" }]}>
                  {day.day || i + 1}
                </Text>
              </View>
              <View style={styles.titleCol}>
                <Text style={[styles.cellText, { fontWeight: "bold" }]}>
                  {day.title}
                </Text>
              </View>
              <View style={styles.descCol}>
                <Text style={styles.cellText}>{clean(day.description)}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footer} fixed>
          © {new Date().getFullYear()} {companyName} | Generated on{" "}
          {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
};

export default PdfGenerator;
