// App.tsx
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  Provider as PaperProvider,
  MD3LightTheme,
  Text,
  Searchbar,
  SegmentedButtons,
} from "react-native-paper";

import { Provider } from "react-redux";
import { store } from "./store";

import { getJobs, Job } from "./Services/JobService";
import JobCard from "./components/JobCard";
import JobDetailScreen from "./screen/JobDetails";
import FavoritesScreen from "./screen/FavoritesScreen";
import HeaderFavoritesButton from "./components/HeaderFavoritesButton";

type RootStackParamList = {
  JobList: undefined;
  JobDetail: { id: string };
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
type SalaryFilter = "all" | "0-50000" | "50000-80000" | "80000plus";
type SortMode = "alpha" | "date";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0d47a1",
    secondary: "#f9a825",
  },
};

type JobListProps = NativeStackScreenProps<RootStackParamList, "JobList">;

function JobListScreen({ navigation }: JobListProps): React.ReactElement {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("alpha");
  const [salaryFilter, setSalaryFilter] = useState<SalaryFilter>("all");

  useEffect(() => {
    const data = getJobs();
    setJobs(data);
  }, []);

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

  const filteredJobs = useMemo(() => {
    const term = query.trim().toLowerCase();
    const base = term
      ? jobs.filter((job) => {
          const haystack = [
            job.poste,
            job.entreprise,
            job.ville,
            job.description,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return haystack.includes(term);
        })
      : jobs;

    const salaryFiltered = base.filter((job) =>
      matchesSalary(job.salaireAnnuel),
    );

    if (sortMode === "date") {
      return [...salaryFiltered].sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : 0;
        const dateB = b.date ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });
    }

    return [...salaryFiltered].sort((a, b) => a.poste.localeCompare(b.poste));
  }, [jobs, query, sortMode, salaryFilter]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Liste des annonces",
      headerRight: undefined,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.favoritesWrapper}>
        <HeaderFavoritesButton
          onPress={() => navigation.navigate("Favorites")}
        />
      </View>
      <Searchbar
        placeholder="Rechercher un poste"
        value={query}
        onChangeText={setQuery}
        style={styles.searchbar}
        autoCorrect={false}
        accessibilityLabel="Barre de recherche d'annonces"
      />
      <View style={styles.sortRow}>
        <SegmentedButtons
          value={sortMode}
          onValueChange={(value) => setSortMode(value as SortMode)}
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
          onValueChange={(value) => setSalaryFilter(value as SalaryFilter)}
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

      <Text variant="labelLarge" style={styles.counter}>
        {filteredJobs.length} annonce
        {filteredJobs.length > 1 ? "s" : ""} affichée
      </Text>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate("JobDetail", { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Aucune annonce ne correspond à la recherche.
          </Text>
        }
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
            <Stack.Screen name="JobList" component={JobListScreen} />
            <Stack.Screen
              name="JobDetail"
              component={JobDetailScreen}
              options={{ title: "Détail de l'annonce" }}
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
  searchbar: { marginHorizontal: 16, marginBottom: 8 },
  counter: {
    textAlign: "center",
    marginBottom: 8,
  },
  favoritesWrapper: {
    alignItems: "center",
    marginBottom: 12,
  },
  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  salaryFilterContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  segmented: {
    marginTop: 6,
  },
  empty: {
    textAlign: "center",
    color: "#666",
    marginTop: 40,
  },
});
