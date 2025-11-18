// screen/MovieDetails.tsx
// Ecran de détails d'un film : affiche les infos complètes et permet de gérer les favoris.
import React, { useMemo } from "react";
import { ScrollView, View, StyleSheet, Image, Alert } from "react-native";
import { Button, Card, Chip, Divider, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { basculerFavori } from "../store/favoritesSlice";
import { RacineEtat } from "../store";
import { getMovies } from "../Services/MovieService";

export default function MovieDetailScreen({ route, navigation }: any) {
  const { id } = route.params || {};
  const dispatch = useDispatch();

  // Retrouver le film correspondant à l'id reçu via la navigation.
  const movie = useMemo(() => {
    const all = getMovies();
    return all.find((m) => m.id === id);
  }, [id]);

  // Déterminer si le film est dans les favoris pour adapter l'affichage.
  const estFavori = useSelector(
    (s: RacineEtat) =>
      !!movie && s.favoris.elements.some((f) => f.id === movie.id),
  );

  if (!movie) {
    return (
      <View style={styles.containerCenter}>
        <Text variant="bodyLarge" style={styles.notFound}>
          Film introuvable (id: {id})
        </Text>
      </View>
    );
  }

  // Ajoute ou retire des favoris + redirige vers l'écran Favoris pour visualiser le résultat.
  const onToggleFavori = () => {
    dispatch(basculerFavori(movie));
    if (!estFavori) {
      Alert.alert("Favoris", `"${movie.title}" a ete ajoute aux favoris`);
      navigation.navigate("Favorites");
    } else {
      Alert.alert("Favoris", `"${movie.title}" a ete retire des favoris`);
      navigation.navigate("Favorites");
    }
  };

  return (
    // ScrollView pour couvrir tout le contenu de la fiche.
    <ScrollView contentContainerStyle={styles.container}>
      {/* Bouton explicite pour revenir à l'écran précédent */}
      <Button
        mode="contained-tonal"
        icon="arrow-left"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        Retourner à la page précédente
      </Button>

      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            {movie.title}
          </Text>
          <View style={styles.metaRow}>
            <Chip icon="calendar" mode="outlined" style={styles.metaChip}>
              {movie.release_date}
            </Chip>
            <Chip icon="star" style={[styles.metaChip, styles.voteChip]}>
              {movie.vote_average.toFixed(1)}/10
            </Chip>
          </View>
        </Card.Content>

        {/* Poster haute résolution ou bloc vide si indisponible */}
        {movie.poster_path ? (
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
            }}
            style={styles.poster}
          />
        ) : (
          <View style={[styles.poster, styles.posterEmpty]} />
        )}

        <Divider />

        <Card.Content>
          <Text variant="titleMedium" style={styles.label}>
            Description
          </Text>
          <Text variant="bodyMedium" style={styles.overview}>
            {movie.overview || "Aucune description disponible."}
          </Text>
        </Card.Content>

        {/* CTA centré pour ajouter/retirer le film des favoris */}
        <Card.Actions style={styles.actions}>
          <Button
            mode={estFavori ? "contained-tonal" : "contained"}
            icon={estFavori ? "bookmark-remove" : "bookmark-plus"}
            onPress={onToggleFavori}
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
  title: { marginBottom: 8, textAlign: "center" },
  metaRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  metaChip: { marginHorizontal: 4, marginBottom: 8 },
  voteChip: { backgroundColor: "#ffe8a1" },
  poster: { width: "100%", height: 320, resizeMode: "cover" },
  posterEmpty: { backgroundColor: "#ddd" },
  label: { marginTop: 12, marginBottom: 8 },
  overview: { lineHeight: 22 },
  actions: { justifyContent: "center" },
});
