// store/favoritesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../Services/MovieService";

/** État des favoris : un simple tableau de films */
export interface FavorisEtat {
  //Tableau unique qui stocke tous les films marqués comme favoris
  elements: Movie[];
}

const etatInitial: FavorisEtat = {
  elements: [], //  la liste des favoris est vide au démarrage.
};

const favorisSlice = createSlice({
  name: "favoris",
  initialState: etatInitial,
  reducers: {
    /** Ajoute un film aux favoris (si pas déjà présent) */
    ajouterFavori(state, action: PayloadAction<Movie>) {
      const existe = state.elements.some((f) => f.id === action.payload.id);
      if (!existe) {
        state.elements.push(action.payload);
      }
    },

    /** Retire un film des favoris via son identifiant */
    retirerFavori(state, action: PayloadAction<number>) {
      state.elements = state.elements.filter((f) => f.id !== action.payload);
    },

    /** Ajoute si absent, retire si déjà présent */
    basculerFavori(state, action: PayloadAction<Movie>) {
      const existe = state.elements.some((f) => f.id === action.payload.id);
      if (existe) {
        state.elements = state.elements.filter(
          (f) => f.id !== action.payload.id,
        );
      } else {
        state.elements.push(action.payload);
      }
    },

    /** Vide complètement la liste des favoris (optionnel) */
    viderFavoris(state) {
      state.elements = [];
    },
  },
});

export const { ajouterFavori, retirerFavori, basculerFavori, viderFavoris } =
  favorisSlice.actions;

export default favorisSlice.reducer;

/* 
const favorisSlice = createSlice({...}) : Redux Toolkit te permet de décrire en une seule fois le nom du slice, son état initial et les reducers (logique de mise à jour). Ici, le slice s’appelle favoris, pointe sur etatInitial (liste vide) et expose quatre reducers.
ajouterFavori(state, action: PayloadAction<Movie>) : l’action transporte un objet Movie. On vérifie s’il est déjà présent (compare les id). S’il est absent, on pousse le film dans state.elements. Grâce à Immer, tu peux modifier state directement sans retourner une copie.
retirerFavori(state, action: PayloadAction<number>) : l’action ne contient que l’id (nombre). On filtre le tableau pour enlever tout film dont l’id correspond. Résultat, le film est supprimé des favoris.
basculerFavori(state, action: PayloadAction<Movie>) : c’est un toggle : si le film est déjà dedans (some), on le retire via filter; sinon on l’ajoute via push. Cette fonction est utilisée par le bouton “Ajouter/Retirer” pour tout faire d’un coup.
viderFavoris(state) : nettoie la liste complète en remplaçant elements par un tableau vide.
export const { … } = favorisSlice.actions; : Redux Toolkit génère automatiquement les creators (ajouterFavori(...), etc.) à partir des reducers. On les exporte pour les dispatcher depuis les composants.
export default favorisSlice.reducer; : on exporte le reducer lui-même pour l’injecter dans configureStore (voir store/index.ts). */
