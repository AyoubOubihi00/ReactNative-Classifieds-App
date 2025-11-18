// components/JobCard.tsx
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, Chip, Text } from "react-native-paper";
import { Job } from "../Services/JobService";

interface Props {
  job: Job;
  onPress?: () => void;
}

const JobCard: React.FC<Props> = ({ job, onPress }) => {
  const salaire =
    typeof job.salaireAnnuel === "number"
      ? `${job.salaireAnnuel.toLocaleString("fr-FR")} € / an`
      : "Salaire non communiqué";

  return (
    <Card
      mode="elevated"
      style={styles.card}
      onPress={onPress}
      accessibilityRole={onPress ? "button" : "text"}
    >
      <Card.Content style={styles.content}>
        {job.entreprisePhoto ? (
          <Image source={{ uri: job.entreprisePhoto }} style={styles.logo} />
        ) : (
          <View style={[styles.logo, styles.logoEmpty]}>
            <Text variant="labelSmall" style={styles.logoEmptyText}>
              {job.entreprise?.charAt(0)?.toUpperCase() ?? "?"}
            </Text>
          </View>
        )}

        <View style={styles.info}>
          <Text variant="titleMedium" style={styles.jobTitle}>
            {job.poste}
          </Text>
          <Text variant="bodySmall" style={styles.subtitle}>
            {job.entreprise} • {job.ville}
          </Text>

          <View style={styles.chipsRow}>
            <Chip
              icon="cash"
              mode="outlined"
              compact
              style={styles.chip}
              textStyle={styles.chipText}
            >
              {salaire}
            </Chip>
            {job.date && (
              <Chip
                icon="calendar-blank"
                compact
                style={styles.chip}
                textStyle={styles.chipText}
              >
                Publiée le {job.date}
              </Chip>
            )}
          </View>

          <Text numberOfLines={3} variant="bodyMedium" style={styles.overview}>
            {job.description || "Aucune description fournie."}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    flexDirection: "row",
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  logoEmpty: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  logoEmptyText: { color: "#666" },
  info: { flex: 1, paddingLeft: 12, justifyContent: "center" },
  jobTitle: { marginBottom: 2 },
  subtitle: { color: "#666", marginBottom: 10 },
  chipsRow: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  chip: { marginRight: 8, marginBottom: 4 },
  chipText: { fontSize: 11 },
  overview: { color: "#444" },
});
