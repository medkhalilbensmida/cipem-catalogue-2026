# Site Web Officiel & Catalogue Interactif CIPEM 2026

Site web statique moderne, bilingue (Français / Anglais), intégrant le livre interactif 3D Flipbook haute définition et l'explorateur des 35 domaines et +410 formations certifiantes du centre **CIPEM** (Centre Agréé N° 11-1372-15).

---

## 📁 Structure du Projet

```text
cipem-website/
├── index.html                   # Page principale (HTML5 sémantique, bilingue FR/EN)
├── web_style.css                # Feuille de styles principale (Design moderne & responsive)
├── flipbook.css                 # Styles 3D du livre interactif Flipbook
├── web_app.js                   # Moteur applicatif (Recherche temps réel, filtres, modalités, bilinguisme)
├── web_catalogue_data.js        # Base de données complète des 35 domaines et 410+ cours
├── flipbook.js                  # Moteur 3D réaliste de feuilletage avec son audio et PDF.js
├── netlify.toml                 # Configuration optimisée pour le déploiement Netlify
├── .gitignore                   # Fichiers à ignorer par Git
├── favicon.ico                  # Favicon officiel
├── apple-touch-icon.png         # Icône iOS / Apple
├── favicon-16x16.png            # Favicon 16px
├── favicon-32x32.png            # Favicon 32px
├── extracted_images/            # Logos officiels CIPEM
│   └── cipem_official_logo.png
├── vertical_images/             # Photographies thématiques des domaines
│   ├── civil.jpg
│   ├── electrical.jpg
│   ├── ...
├── CIPEM - Catalogue Formations 2026 - Premium Visual Edition.pdf    # PDF FR Officiel (56 pages)
└── CIPEM - Training Catalogue 2026 - Premium Visual Edition.pdf      # PDF EN Officiel (56 pages)
```

---

## 🚀 Guide de Déploiement

### Étape 1 : Initialiser le dépôt Git et committer

Ouvrez un terminal dans ce dossier `cipem-website` :

```bash
cd cipem-website
git init
git add .
git commit -m "Site Officiel CIPEM 2026 - Version Finale"
```

### Étape 2 : Créer un repository sur GitHub et pusher

1. Rendez-vous sur [github.com/new](https://github.com/new) et créez un nouveau dépôt (par exemple `cipem-catalogue-2026`).
2. Liez votre dossier local et envoyez les fichiers :

```bash
git branch -M main
git remote add origin https://github.com/VOTRE_UTILISATEUR/cipem-catalogue-2026.git
git push -u origin main
```

*(Note : GitHub accepte les fichiers individuels jusqu'à 100 Mo sans configuration supplémentaire. Les catalogues PDF font ~28 Mo chacun et sont donc acceptés directement).*

---

### Étape 3 : Déployer en ligne sur Netlify

#### Option A : Déploiement automatique via GitHub (Recommandé)
1. Connectez-vous sur [Netlify](https://app.netlify.com/).
2. Cliquez sur **"Add new site"** > **"Import an existing project"**.
3. Choisissez **GitHub** et sélectionnez votre dépôt `cipem-catalogue-2026`.
4. Netlify détecte automatiquement le fichier `netlify.toml` :
   - **Build command** : *(laisser vide)*
   - **Publish directory** : `.` *(la racine du projet)*
5. Cliquez sur **"Deploy site"**.
   Votre site sera immédiatement en ligne avec un lien HTTPS gratuit (ex. `https://cipem-2026.netlify.app`), et chaque mise à jour sur GitHub sera automatiquement redéployée !

#### Option B : Déploiement instantané par Glisser-Déposer (Netlify Drop)
1. Allez sur [app.netlify.com/drop](https://app.netlify.com/drop).
2. Glissez-déposez directement tout le dossier `cipem-website` dans la fenêtre.
3. Votre site est en ligne en quelques secondes !

---

## ⚡ Fonctionnalités Clés du Site
- **Bilingue instantané (FR / EN)** sans rechargement de page.
- **Livre interactif 3D Flipbook** avec son réaliste de feuilletage et zoom Retina.
- **Moteur de recherche instantané** et filtres par pôle métier (Technique, Management).
- **Fiches descriptives détaillées** avec objectifs, prérequis, durée et public cible en modalité modale.
- **Téléchargement direct des catalogues PDF officiels 2026** (56 pages haute définition).
