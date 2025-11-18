// store/index.ts
// Point central qui instancie le store Redux et expose les types utilitaires.
import { configureStore } from "@reduxjs/toolkit";
import favorisReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    // Chaque clé ici correspond à un slice. On peut en ajouter autant que nécessaire.
    favoris: favorisReducer,
  },
});

// Types utiles pour typer useSelector (RacineEtat) et useDispatch (DispatchAppli) dans l'app.
export type RacineEtat = ReturnType<typeof store.getState>;
export type DispatchAppli = typeof store.dispatch;
