# Projet React Native - Gestion de films et favoris

## Architecture

- **App.tsx** : point d'entree Expo. Configure le `PaperProvider` (React Native Paper) et un `NavigationContainer` avec un `NativeStackNavigator` (MovieList, MovieDetail, Favorites). Le composant interne `MovieListScreen` charge les films via `getMovies()` et les affiche dans une `FlatList`. Le header embarque `HeaderFavoritesButton`.
- **Services/MovieService.ts** : fusionne les deux JSON populaires (`helpers/PopularMovies_p1/p2.json`) pour exposer une fonction `getMovies()` qui renvoie un tableau `Movie`.
- **store/** : `favoritesSlice.ts` gere l'etat des favoris (actions `ajouterFavori`, `retirerFavori`, `basculerFavori`, etc.). `index.ts` configure le store Redux et exporte les types (`RacineEtat`, `DispatchAppli`).

## Composants cles

- **components/MovieListe.tsx** : carte Paper reutilisable pour afficher un film dans les listes (poster, chips date/note, resume).
- **components/HeaderFavoritesButton.tsx** : bouton Paper "Mes favoris (N)" affiche dans le header via `useSelector`.

## Ecrans

- **MovieListScreen (App.tsx)** : liste principale + navigation vers la fiche de chaque film.
- **screen/MovieDetails.tsx** : page de details (bouton Retour Paper, image, description). Bouton central "Ajouter/Retirer des favoris" qui declenche `basculerFavori` puis navigue vers Favoris.
- **screen/FavoritesScreen.tsx** : liste les favoris via Redux, propose un bouton Retour (`popToTop`) et permet de rouvrir chaque fiche.

## Flux utilisateur

1. Ouverture -> liste des films + bouton "Mes favoris (0)".
2. Selection d'un film -> fiche detaillee avec bouton Retour + bouton Ajouter aux favoris.
3. Clic sur Ajouter -> film stocke dans le slice, alerte + redirection vers l'ecran Favoris.
4. Ecran Favoris -> cartes cliquables pour revenir a la fiche. Le bouton affiche alors "Retirer des favoris" et supprime le film du slice.

## Outils & conventions

- UI basee sur **React Native Paper** (Card, Button, Text, Chip, IconButton, Badge).
- Code structure en dossiers (`components/`, `screen/`, `store/`, `Services/`) avec noms de fichiers en PascalCase.
- ESLint + Prettier configures (fichier `eslint.config.mjs`, commandes `npx eslint .` et `npx prettier -w .`).

## Rappels hooks

- **useSelector (Redux)** : lit une portion de l'etat global (store). On lui passe une fonction `state -> valeur` et il renvoie cette valeur tout en reabonnant le composant si elle change.
- **useState (React)** : cree un etat local propre au composant (`const [value, setValue] = useState(init)`), utile pour stocker des donnees volatiles (inputs, resultat de fetch, etc.).
- **useEffect** : execute un effet secondaire apres le rendu. Avec `[]` il se lance une seule fois (chargement initial), avec des dependances il se relance lorsqu'elles evoluent.
- **useMemo** : memorise un calcul couteux pour eviter de le refaire a chaque rendu ; il recalcule uniquement si les dependances changent.
- Combiner ces hooks permet de gerer l'etat local (`useState`), declencher des actions asynchrones (`useEffect`), cacher certains calculs (`useMemo`) et consommer l'etat global Redux (`useSelector`).
