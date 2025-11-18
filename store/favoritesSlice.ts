// store/favoritesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Job } from "../Services/JobService";

/** état des favoris : un simple tableau d'annonces */
export interface FavorisEtat {
  elements: Job[];
}

const etatInitial: FavorisEtat = {
  elements: [],
};

const favorisSlice = createSlice({
  name: "favoris",
  initialState: etatInitial,
  reducers: {
    /** Ajoute une annonce aux favoris (si pas déjà présente) */
    ajouterFavori(state, action: PayloadAction<Job>) {
      const existe = state.elements.some((f) => f.id === action.payload.id);
      if (!existe) {
        state.elements.push(action.payload);
      }
    },

    /** Retire une annonce des favoris via son identifiant */
    retirerFavori(state, action: PayloadAction<string>) {
      state.elements = state.elements.filter((f) => f.id !== action.payload);
    },

    /** Ajoute si absente, retire si déjà présente */
    basculerFavori(state, action: PayloadAction<Job>) {
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
