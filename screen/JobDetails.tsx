// screen/JobDetails.tsx
import React, { useMemo } from "react";
import { ScrollView, View, StyleSheet, Image, Alert } from "react-native";
import { Button, Card, Chip, Divider, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ajouterFavori, retirerFavori } from "../store/favoritesSlice";
import { RacineEtat } from "../store";
import { getJobById } from "../Services/JobService";

type RootStackParamList = {
  JobList: undefined;
  JobDetail: { id: string };
  Favorites: undefined;
};

type JobDetailProps = NativeStackScreenProps<RootStackParamList, "JobDetail">;

export default function JobDetailScreen({ route, navigation }: JobDetailProps) {
  const { id } = route.params || {};
  const dispatch = useDispatch();

  const job = useMemo(() => getJobById(id), [id]);

  const estFavori = useSelector(
    (s: RacineEtat) => !!job && s.favoris.elements.some((f) => f.id === job.id),
  );

  if (!job) {
    return (
      <View style={styles.containerCenter}>
        <Text variant="bodyLarge" style={styles.notFound}>
          Annonce introuvable (id: {id})
        </Text>
      </View>
    );
  }

  const adresse = [job.numeroRue, job.rue, job.codePostal, job.ville].filter(
    Boolean,
  );

  const salaire =
    typeof job.salaireAnnuel === "number"
      ? `${job.salaireAnnuel.toLocaleString("fr-FR")} € / an`
      : "Non communiqué";

  const onFavoriPress = () => {
    if (!job) return;

    if (estFavori) {
      dispatch(retirerFavori(job.id));
      Alert.alert("Favoris", `"${job.poste}" a été retirée de vos favoris.`);
    } else {
      dispatch(ajouterFavori(job));
      Alert.alert("Favoris", `"${job.poste}" a été ajoutée à vos favoris.`);
      navigation.navigate("Favorites");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        mode="contained-tonal"
        icon="arrow-left"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        Retourner à la liste
      </Button>

      <Card mode="elevated" style={styles.card}>
        <Card.Content style={styles.header}>
          {job.entreprisePhoto ? (
            <Image source={{ uri: job.entreprisePhoto }} style={styles.logo} />
          ) : (
            <View style={[styles.logo, styles.logoEmpty]}>
              <Text variant="headlineSmall">
                {job.entreprise?.charAt(0)?.toUpperCase() ?? "?"}
              </Text>
            </View>
          )}

          <View style={styles.headerInfo}>
            <Text variant="headlineSmall" style={styles.title}>
              {job.poste}
            </Text>
            <Text variant="titleMedium" style={styles.company}>
              {job.entreprise}
            </Text>

            <View style={styles.metaRow}>
              <Chip icon="map-marker" mode="outlined" style={styles.metaChip}>
                {adresse.join(" • ") || job.ville}
              </Chip>
              <Chip icon="cash" style={[styles.metaChip, styles.payChip]}>
                {salaire}
              </Chip>
              {job.date && (
                <Chip icon="calendar" mode="outlined" style={styles.metaChip}>
                  Publiée le {job.date}
                </Chip>
              )}
            </View>
          </View>
        </Card.Content>

        <Divider />

        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Description
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {job.description || "Aucune description fournie."}
          </Text>
        </Card.Content>

        <Divider />

        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Contact
          </Text>
          {job.email && <Text style={styles.contact}>Email : {job.email}</Text>}
          {job.telephone && (
            <Text style={styles.contact}>Téléphone : {job.telephone}</Text>
          )}
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button
            mode={estFavori ? "contained-tonal" : "contained"}
            icon={estFavori ? "heart-off" : "heart-plus"}
            onPress={onFavoriPress}
          >
            {estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  notFound: { textAlign: "center" },
  container: { padding: 16, backgroundColor: "#fff" },
  backButton: { alignSelf: "flex-start", marginBottom: 12 },
  card: { marginBottom: 24 },
  header: { flexDirection: "row", alignItems: "center" },
  logo: { width: 72, height: 72, borderRadius: 16 },
  logoEmpty: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: { flex: 1, marginLeft: 16 },
  title: { marginBottom: 4 },
  company: { color: "#666" },
  metaRow: {
    marginTop: 12,
  },
  metaChip: { marginRight: 8, marginBottom: 8 },
  payChip: { backgroundColor: "#fff8e1" },
  sectionTitle: { marginTop: 12, marginBottom: 6 },
  description: { lineHeight: 22 },
  contact: { marginBottom: 4 },
  actions: { justifyContent: "center", paddingBottom: 16 },
});
