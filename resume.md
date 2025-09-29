# SocialHub – Réseau social collaboratif fullstack

**SocialHub** est un projet fullstack moderne qui combine les fonctionnalités clés des grandes plateformes sociales :  
un **fil d’actualité façon Facebook**, un **système de messagerie inspiré de Discord**, et une **gestion de fichiers simplifiée à la Google Drive / Teams**.

## 🚀 Objectif
Créer un écosystème social complet avec :
- Authentification sécurisée (JWT)
- Relations d’amis
- Publication de posts, commentaires, réactions
- Système de messagerie privé et en groupe
- Notifications en temps réel
- Espace de partage de fichiers avec gestion d’accès

## ⚙️ Technologies utilisées

### 🧠 Backend
- **NestJS** — Framework backend Node.js modulaire et typé
- **Prisma ORM** — Accès type-safe à la base de données SQL
- **MySQL** — Base de données relationnelle (port 3307)
- **JWT (JSON Web Tokens)** — Authentification sécurisée
- **Bcrypt** — Hashage des mots de passe

### 🎨 Frontend
- **React** — Framework frontend réactif
- **Vite** — Dev server rapide pour React
- **TailwindCSS v3** — Styling utilitaire moderne
- **ShadCN/UI** — Composants UI élégants et accessibles
- **React Router v6** — Gestion des routes et navigation frontend
- **Zustand (optionnel)** — Gestion d’état légère

## 🔐 Fonctionnalités principales (MVP)
- 🔑 Login JWT (access token uniquement pour l’instant)
- 👤 Gestion des utilisateurs & profils
- 👥 Système d’amis & demandes
- 📰 Feed de posts + commentaires + réactions
- 💬 Messagerie (privée & en groupe)
- 🔔 Notifications utilisateur
- 📁 Drive utilisateur pour fichiers attachés aux posts/messages
- ⚙️ Backend RESTful organisé par domaines fonctionnels

## 🧪 Base de données
- Déjà créée et seedée localement
- Modèles Prisma : `User`, `Profile`, `Post`, `Comment`, `Message`, `Notification`, `Friendship`, `Ressource`, etc.
- Relations complexes (many-to-many, jointures, cascade deletes…)

## 📍 État du projet
- ✅ Authentification + Dashboard minimal OK
- ⚙️ Actuellement : mise en place des pages frontend et du routeur React
- 🛠️ À venir : finalisation des composants, ajout des routes backend (posts, messages, notifications...)

---

> 🧑‍💻 Projet personnel en cours, destiné à renforcer mon portfolio avec une stack moderne complète et une architecture propre.
