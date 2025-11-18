// components/HeaderFavoritesButton.tsx
// Bouton placé dans l'en-tête qui affiche "Mes favoris (N)" et ouvre l'écran des favoris.
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { RacineEtat } from "../store";

interface Props {
  onPress?: () => void;
}

export default function HeaderFavoritesButton({ onPress }: Props) {
  // Calculer dynamiquement le nombre de favoris pour l'afficher dans le libellé.
  const nb = useSelector((s: RacineEtat) => s.favoris.elements.length);

  return (
    <View style={styles.container}>
      <Button
        mode="contained-tonal"
        icon="heart"
        onPress={onPress}
        compact
        contentStyle={styles.buttonContent}
        labelStyle={styles.label}
      >
        Mes favoris ({nb})
      </Button>

      {/* Ancienne version icon-only conservée en commentaire pour revenir facilement à un IconButton.
      <IconButton
        icon={nb ? "heart" : "heart-outline"}
        mode="contained-tonal"
        size={24}
        onPress={onPress}
        accessibilityLabel="Mes favoris"
      />
      {nb > 0 && (
        <Badge style={styles.badge} size={16}>
          {nb}
        </Badge>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: { flexDirection: "row-reverse" },
  label: { fontSize: 13, fontWeight: "700" },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
  },
});
