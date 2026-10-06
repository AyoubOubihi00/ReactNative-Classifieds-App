# 📱 React Native – Annonces & Favoris

Application mobile développée avec **React Native et TypeScript** permettant de consulter des annonces, d'effectuer des recherches multicritères et de gérer une liste de favoris.

Ce projet a été réalisé **individuellement dans le cadre d'un TP noté de développement mobile** en Master Génie Informatique à l'Université de Lorraine.

## 🚀 Fonctionnalités

### 🏠 Consultation des annonces

- Affichage des annonces sous forme de liste avec `FlatList`
- Affichage dynamique du nombre d'annonces disponibles
- Accès au détail d'une annonce
- Affichage des informations détaillées : poste, entreprise, ville, description et contact

### 🔎 Recherche multicritère

Une barre de recherche permet de filtrer dynamiquement les annonces.

La recherche ne se limite pas au nom de l'annonce et fonctionne également sur :

- le poste ;
- l'entreprise ;
- la ville ;
- la description.

Le compteur d'annonces est automatiquement mis à jour en fonction des résultats.

### ❤️ Gestion des favoris

- Ajout d'une annonce aux favoris
- Suppression d'une annonce des favoris
- Gestion de l'état des favoris avec **Redux**
- Écran dédié aux annonces favorites
- Navigation depuis les favoris vers le détail d'une annonce
- Message spécifique lorsqu'aucune annonce n'est enregistrée
- Compteur dynamique `Mes favoris : N`
- Alerte lors de l'ajout ou du retrait d'un favori
- Redirection automatique vers la page des favoris

## ✨ Fonctionnalités supplémentaires

Plusieurs fonctionnalités ont été ajoutées au-delà des exigences initiales du projet.

### ↕️ Tri des annonces

Des `SegmentedButtons` permettent de modifier instantanément l'ordre d'affichage :

- **A → Z** : tri alphabétique ;
- **Plus récents** : tri selon la date de publication.

Le système de tri est disponible sur l'accueil ainsi que dans les favoris.

### 🔍 Recherche enrichie

La recherche a été étendue à plusieurs propriétés d'une annonce :

- poste ;
- entreprise ;
- ville ;
- description.

Cela permet d'effectuer une recherche plus flexible qu'un simple filtrage par nom.

### 💰 Filtres salariaux

Les annonces peuvent être filtrées selon différentes fourchettes de salaire :

- moins de 50k ;
- 50k – 80k ;
- 80k et plus.

Les filtres sont disponibles à la fois sur la liste principale et sur les favoris.

### ❤️ Favoris améliorés

L'accès aux favoris reste disponible directement depuis l'accueil grâce à un compteur dynamique.

Lorsqu'une annonce est ajoutée ou retirée des favoris, l'utilisateur reçoit une confirmation et peut être redirigé vers l'écran correspondant.

## 🛠️ Technologies

- **React Native**
- **TypeScript**
- **Redux**
- **React Native Paper**
- **ESLint**
- **Prettier**
- **npm**

## 🏗️ Organisation du projet

Le projet est organisé afin de séparer les différentes responsabilités de l'application :

```text
├── assets/
├── components/
├── helpers/
├── screen/
├── Services/
├── store/
├── App.tsx
├── index.ts
├── eslint.config.mjs
├── prettier.config.cjs
├── package.json
└── tsconfig.json
```

- `components/` : composants réutilisables de l'interface
- `screen/` : écrans principaux de l'application
- `Services/` : logique liée aux services et aux données
- `store/` : gestion de l'état global avec Redux
- `helpers/` : fonctions utilitaires
- `assets/` : ressources utilisées par l'application

## ▶️ Installation et lancement

### Prérequis

- Node.js
- npm
- environnement React Native compatible avec le projet

### Installation

Cloner le repository :

```bash
git clone https://github.com/AyoubOubihi00/ReactNative-Classifieds-App.git
cd ReactNative-Classifieds-App
```

Installer les dépendances :

```bash
npm install
```

Puis lancer l'application avec la commande prévue par le projet :

```bash
npm start
```

## 🎯 Objectifs pédagogiques

Ce projet m'a permis de mettre en pratique plusieurs concepts du développement mobile :

- développement d'une application avec React Native ;
- utilisation de TypeScript et de son système de typage ;
- création de composants réutilisables ;
- navigation entre différents écrans ;
- gestion d'un état global avec Redux ;
- recherche, filtrage et tri de données ;
- utilisation d'une bibliothèque de composants graphiques ;
- organisation d'un projet mobile ;
- configuration d'ESLint et Prettier pour maintenir la qualité du code.

## 👤 Auteur

**Ayoub OUBIHI**  
Master Génie Informatique – Université de Lorraine
