# 📝 Bloc-Notes Terminal (Pro)

Une application web de prise de notes rapide, légère et moderne, construite avec **Node.js**, **Express** et **SQLite**, containerisée avec **Docker**, orchestrée sous **Kubernetes** et déployée automatiquement via une chaîne **CI/CD / GitOps**.

---

##  Architecture CI/CD & GitOps

Ce projet intègre une pipeline DevOps complète et automatisée :
[200~1. **Intégration Continue (CI) :** À chaque `push` sur la branche `main`, **GitHub Actions** compile le code, valide les configurations, build l'image Docker et la publie sur Docker Hub.
2. **Déploiement Continu (CD / GitOps) :** **ArgoCD** surveille le dossier `k8s/` du dépôt. Dès qu'un changement est détecté dans la configuration, ArgoCD synchronise automatiquement l'état du cluster Kubernetes (Minikube) sans intervention manuelle (*Auto-Sync & Self-Healing*).

---

##  Fonctionnalités & Ergonomie

- **Gestion des documents :** Création, édition, recherche et suppression de notes en temps réel.
- **Auto-sauvegarde :** Enregistrement automatique lors de la saisie sans besoin de cliquer sur "Enregistrer".
- **Interface réactive :** Design épuré avec panneau latéral et éditeur plein écran.
- **Compteur de mots & caractères :** Statistiques mises à jour dynamiquement au bas de la page.
- **Suppression sécurisée :** Boîte de dialogue modale personnalisée pour confirmer la suppression d'une note.
- **Exportation :** Export direct de vos notes aux formats `.TXT`, `.MD` et `.PDF`.
- **Organisation :** Épinglage des documents prioritaires et tri dynamique (par date ou par ordre alphabétique).
- **Interface & Modales :**
  - **Mode Sombre / Mode Clair** basculable en un clic.
  - **Aide intégrée :** Un bouton d'aide (`?`) dans la barre de navigation explique toutes les fonctionnalités.
  - **Gestion des alertes :** Modales personnalisées et élégantes pour la confirmation de suppression et l'avertissement de document vide.
- **Raccourcis clavier :** Touche `Échap` (`Esc`) pour fermer rapidement les modales ou le document ouvert.

---

##  Technologies utilisées

- **Backend :** Node.js, Express.js
- **Base de données :** SQLite (via `better-sqlite3`)
- **Frontend :** HTML5, CSS3, JavaScript Vanilla (Fetch API)
- **Containerisation & Orchestration :** Docker, Docker Hub, Kubernetes (Minikube)
- **CI/CD & GitOps :** GitHub Actions, ArgoCD
- **Versionning :** Git, GitHub

---

##  Installation et Lancement Local

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [Docker](https://www.docker.com/) & [Minikube](https://minikube.sigs.k8s.io/docs/)
- Git

### 1. Cloner le dépôt
```bash
git clone [https://github.com/eunicefelixtine/Bloc-notesTerminal.git](https://github.com/eunicefelixtine/Bloc-notesTerminal.git)

cd Bloc-notesTerminal
