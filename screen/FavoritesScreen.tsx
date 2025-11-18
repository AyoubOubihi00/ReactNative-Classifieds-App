// screen/FavoritesScreen.tsx
// Liste l'ensemble des films ajoutes aux favoris et permet d'acceder a leur fiche.
import React from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { RacineEtat } from "../store";

export default function FavoritesScreen({ navigation }: any) {
  // Recuperer les favoris stockes dans Redux pour alimenter la FlatList.
  const favoris = useSelector((s: RacineEtat) => s.favoris.elements);

  return (
    <View style={styles.container}>
      {/* Retourne a l'ecran racine (MovieList) pour eviter d'empiler les routes */}
      <Button
        mode="contained-tonal"
        icon="arrow-left"
        onPress={() => navigation.popToTop()}
        style={styles.backButton}
      >
        Retourner à la page précédente
      </Button>

      <Text variant="headlineSmall" style={styles.title}>
        Mes favoris
      </Text>

      {/* Chaque favori est rendu sous forme de carte cliquable vers les details */}
      <FlatList
        data={favoris}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            mode="outlined"
            style={styles.card}
            onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
          >
            <Card.Content style={styles.cardContent}>
              {item.poster_path ? (
                <Image
                  source={{
                    uri: "https://image.tmdb.org/t/p/w200" + item.poster_path,
                  }}
                  style={styles.poster}
                />
              ) : (
                <View style={[styles.poster, styles.posterEmpty]} />
              )}

              <View style={styles.cardText}>
                <Text variant="titleMedium">{item.title}</Text>
                <Text variant="bodySmall" style={styles.itemSub}>
                  Sortie : {item.release_date}
                </Text>
              </View>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <Text variant="bodyMedium" style={styles.empty}>
            Aucun favori pour l'instant.
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
  empty: { textAlign: "center", color: "#666", marginTop: 20 },
  card: { marginBottom: 12 },
  cardContent: { flexDirection: "row", alignItems: "center" },
  poster: { width: 60, height: 90, borderRadius: 6, marginRight: 12 },
  posterEmpty: { backgroundColor: "#ddd" },
  cardText: { flex: 1 },
  itemSub: { marginTop: 4, color: "#666" },
});
