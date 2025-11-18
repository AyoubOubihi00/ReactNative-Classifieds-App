// screen/FavoritesScreen.tsx
// Liste toutes les annonces sauvegardées en favoris.
import React, { useMemo, useState } from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import { Button, Card, Text, SegmentedButtons } from "react-native-paper";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RacineEtat } from "../store";

type RootStackParamList = {
  JobList: undefined;
  JobDetail: { id: string };
  Favorites: undefined;
};

type FavoritesProps = NativeStackScreenProps<
  RootStackParamList,
  "Favorites"
>;

export default function FavoritesScreen({ navigation }: FavoritesProps) {
  const favoris = useSelector((s: RacineEtat) => s.favoris.elements);
  const [sortMode, setSortMode] = useState<"alpha" | "date">("alpha");
  const [salaryFilter, setSalaryFilter] = useState<
    "all" | "0-50000" | "50000-80000" | "80000plus"
  >("all");

  const matchesSalary = (salaire?: number | null): boolean => {
    if (salaryFilter === "all") {
      return true;
    }
    if (typeof salaire !== "number") {
      return false;
    }
    if (salaryFilter === "0-50000") {
      return salaire < 50000;
    }
    if (salaryFilter === "50000-80000") {
      return salaire >= 50000 && salaire < 80000;
    }
    return salaire >= 80000;
  };

  const filteredFavoris = useMemo(() => {
    const filtered = favoris.filter((job) =>
      matchesSalary(job.salaireAnnuel),
    );
    if (sortMode === "date") {
      return [...filtered].sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });
    }
    return [...filtered].sort((a, b) => a.poste.localeCompare(b.poste));
  }, [favoris, sortMode, salaryFilter]);

  return (
    <View style={styles.container}>
      <Button
        mode="contained-tonal"
        icon="arrow-left"
        onPress={() => navigation.popToTop()}
        style={styles.backButton}
      >
        Retourner à l'accueil
      </Button>

      <Text variant="headlineSmall" style={styles.title}>
        Mes annonces favorites
      </Text>

      <View style={styles.sortRow}>
        <Text variant="labelLarge">Ordre d'affichage</Text>
        <SegmentedButtons
          value={sortMode}
          onValueChange={(val) => setSortMode(val as "alpha" | "date")}
          buttons={[
            { value: "alpha", label: "A → Z" },
            { value: "date", label: "Plus récents" },
          ]}
          density="small"
        />
      </View>

      <View style={styles.salaryFilterContainer}>
        <Text variant="labelLarge">Fourchette de salaire</Text>
        <SegmentedButtons
          value={salaryFilter}
          onValueChange={(val) =>
            setSalaryFilter(
              val as "all" | "0-50000" | "50000-80000" | "80000plus",
            )
          }
          buttons={[
            { value: "all", label: "Tous" },
            { value: "0-50000", label: "< 50k€" },
            { value: "50000-80000", label: "50-80k€" },
            { value: "80000plus", label: "80k€ +" },
          ]}
          density="small"
          style={styles.segmented}
        />
      </View>

      <FlatList
        data={filteredFavoris}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            mode="outlined"
            style={styles.card}
            onPress={() => navigation.navigate("JobDetail", { id: item.id })}
          >
            <Card.Content style={styles.cardContent}>
              {item.entreprisePhoto ? (
                <Image
                  source={{ uri: item.entreprisePhoto }}
                  style={styles.logo}
                />
              ) : (
                <View style={[styles.logo, styles.logoEmpty]}>
                  <Text variant="bodyLarge">
                    {item.entreprise?.charAt(0)?.toUpperCase() ?? "?"}
                  </Text>
                </View>
              )}

              <View style={styles.cardText}>
                <Text variant="titleMedium">{item.poste}</Text>
                <Text variant="bodySmall" style={styles.itemSub}>
                  {item.entreprise} • {item.ville}
                </Text>
              </View>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <Text variant="bodyMedium" style={styles.empty}>
            Vous n'avez pas encore de favoris.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  backButton: { alignSelf: "flex-start", marginBottom: 12 },
  title: { textAlign: "center", marginBottom: 12 },
  sortRow: {
    marginBottom: 12,
    paddingHorizontal: 6,
  },
  salaryFilterContainer: {
    marginBottom: 12,
    paddingHorizontal: 6,
  },
  segmented: {
    marginTop: 6,
  },
  empty: { textAlign: "center", color: "#666", marginTop: 20 },
  card: { marginBottom: 12 },
  cardContent: { flexDirection: "row", alignItems: "center" },
  logo: { width: 56, height: 56, borderRadius: 12, marginRight: 12 },
  logoEmpty: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: { flex: 1 },
  itemSub: { marginTop: 4, color: "#666" },
});
