# Projet React Native – Annonces & Favoris

## Fonctionnalités demandées

1. **Accueil** : FlatList des annonces avec compteur dynamique (`filteredJobs.length`).
2. **Recherche** : barre `Searchbar` filtrant par poste/entreprise/ville/description (bonus = multi-propriétés).
3. **Détails** : fiche complète avec description, contact et bouton “Ajouter/Retirer des favoris”.
4. **Favoris** : ajout/suppression dans Redux + écran dédié qui réutilise la fiche au clic et affiche un message si la liste est vide.

## Fonctionnalités bonus

## Tri avancé

Accueil : SegmentedButtons “A → Z / Plus récents” pour trier les annonces immédiatement.
Favoris : même choix, avec tri par date de publication décroissante.

## Recherche enrichie

La barre de recherche filtre simultanément sur le poste, l’entreprise, la ville et la description.

## Filtres salariaux

Sur l’accueil et sur les favoris, un sélecteur de fourchettes (<50k, 50‑80k, 80k+) permet de montrer uniquement les offres dans la tranche désirée.

## Favoris ergonomiques

Bouton “Mes favoris : N” toujours visible en haut de l’accueil.
Alerte à chaque ajout/retrait avec redirection automatique vers la page Favoris.
