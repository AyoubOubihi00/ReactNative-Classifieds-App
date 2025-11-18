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
        mode="contained"
        icon="heart"
        onPress={onPress}
        compact
        contentStyle={styles.buttonContent}
        labelStyle={styles.label}
        style={styles.button}
        buttonColor="#ffffff"
        textColor="#0d47a1"
        uppercase={false}
      >
        Mes favoris : {nb}
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
  button: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    elevation: 1,
  },
  buttonContent: { flexDirection: "row-reverse", paddingHorizontal: 12 },
  label: { fontSize: 13, fontWeight: "700", color: "#0d47a1" },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
  },
});
