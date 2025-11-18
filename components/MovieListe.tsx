// components/MovieListe.tsx
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, Chip, Text } from "react-native-paper";
import { Movie } from "../Services/MovieService";

interface Props {
  movie: Movie;
  onPress?: () => void;
}

const MovieCard: React.FC<Props> = ({ movie, onPress }) => {
  return (
    <Card
      mode="elevated"
      style={styles.card}
      onPress={onPress}
      accessibilityRole={onPress ? "button" : "text"}
    >
      <Card.Content style={styles.content}>
        {movie.poster_path ? (
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/w200" + movie.poster_path,
            }}
            style={styles.poster}
          />
        ) : (
          <View style={[styles.poster, styles.posterEmpty]}>
            <Text variant="labelSmall" style={styles.posterEmptyText}>
              Pas d'affiche
            </Text>
          </View>
        )}

        <View style={styles.info}>
          <Text variant="titleMedium" style={styles.movieTitle}>
            {movie.title}
          </Text>

          <View style={styles.chipsRow}>
            <Chip
              icon="calendar-blank"
              mode="outlined"
              compact
              style={styles.chip}
            >
              {movie.release_date}
            </Chip>
            <Chip icon="star" compact style={styles.voteChip}>
              {movie.vote_average.toFixed(1)}/10
            </Chip>
          </View>

          <Text numberOfLines={3} variant="bodyMedium" style={styles.overview}>
            {movie.overview}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    flexDirection: "row",
  },
  poster: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  posterEmpty: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  posterEmptyText: { color: "#666" },
  info: { flex: 1, padding: 12, justifyContent: "center" },
  movieTitle: { marginBottom: 4 },
  chipsRow: {
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  chip: { marginRight: 8 },
  voteChip: { backgroundColor: "#fff3cd" },
  overview: { color: "#444" },
});
