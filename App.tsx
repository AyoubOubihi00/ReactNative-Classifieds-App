// App.tsx
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Provider as PaperProvider,
  MD3LightTheme,
  Text,
} from "react-native-paper";

import { Provider } from "react-redux";
import { store } from "./store";

import { getMovies, Movie } from "./Services/MovieService";
import MovieCard from "./components/MovieListe";
import MovieDetailScreen from "./screen/MovieDetails";
import FavoritesScreen from "./screen/FavoritesScreen";
import HeaderFavoritesButton from "./components/HeaderFavoritesButton";

type RootStackParamList = {
  MovieList: undefined; // cette route n’attend aucun paramètre.
  MovieDetail: { id: number }; //  pour ouvrir la fiche, il faut passer un objet avec l’identifiant numérique du film.
  Favorites: undefined; // l’écran Favoris n’a pas besoin de paramètre non plus.
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#e50914",
    secondary: "#f5c518",
  },
};

// est le composant d’écran qui affiche la liste des films
function MovieListScreen({ navigation }: any): React.ReactElement {
  const [movies, setMovies] = useState<Movie[]>([]); // déclare un état local movies initialisé à un tableau vide.

  useEffect(() => {
    // exécute le bloc une seule fois au montage
    const data = getMovies(); // On appelle getMovies()
    setMovies(data);
  }, []);

  // Configurer dynamiquement le header de l'écran dès son montage.
  // On injecte le bouton "Mes favoris (N)" dans le header et on fixe le titre.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderFavoritesButton
          onPress={() => navigation.navigate("Favorites")}
        />
      ),
      title: "Films",
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Liste des films
      </Text>

      <FlatList // FlatList parcourt movies
        data={movies} // alimente la liste
        keyExtractor={(item) => item.id.toString()} // transforme chaque id en string.
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
          />
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="MovieList" component={MovieListScreen} />
            <Stack.Screen
              name="MovieDetail"
              component={MovieDetailScreen}
              options={{ title: "Details du film" }}
            />
            <Stack.Screen
              name="Favorites"
              component={FavoritesScreen}
              options={{ title: "Mes favoris" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    paddingTop: 40,
  },
});
