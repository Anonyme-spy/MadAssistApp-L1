
# 🚨 MadAssistant

> **⚠️ AVERTISSEMENT** : Ceci est un projet éducatif/de démonstration. Les informations de contact d'urgence peuvent ne pas être 100% exactes ou à jour. En cas d'urgence réelle, contactez toujours directement les services d'urgence officiels.

<p align="center">
  <img src="./assets/images/3.png" alt="Logo MadAssistant" width="120" height="120">
</p>

<p align="center">
  <strong>Assistant d'Urgence Intelligent pour Madagascar</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Plateforme-iOS%20%7C%20Android-blue?style=flat-square" alt="Plateforme">
  <img src="https://img.shields.io/badge/React%20Native-0.79.2-61DAFB?style=flat-square&logo=react" alt="React Native">
  <img src="https://img.shields.io/badge/Expo-~53.0.9-000020?style=flat-square&logo=expo" alt="Expo">
  <img src="https://img.shields.io/badge/TypeScript-~5.8.3-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
</p>

## 📱 À Propos

MadAssistant est une application mobile React Native conçue pour fournir un accès rapide aux services d'urgence à Madagascar. L'application dispose d'une interface intuitive avec support multilingue (français/anglais) et des informations complètes sur les contacts d'urgence.

## ✨ Fonctionnalités

- 🚨 **Appels d'Urgence Rapides** - Accès en un clic aux services d'urgence
- 📞 **Contacts Organisés** - Contacts d'urgence catégorisés (Santé, Sécurité, Pompiers, etc.)
- 🩺 **Guide de Premiers Secours** - Procédures d'urgence étape par étape
- 🌍 **Multilingue** - Support français et anglais
- 🎨 **Thèmes Adaptatifs** - Modes clair, sombre et automatique
- 📱 **Multi-plateforme** - Fonctionne sur iOS et Android

## 🏗️ Stack Technique

- **Framework** : React Native avec Expo
- **Langage** : TypeScript
- **Navigation** : Expo Router
- **Composants UI** : React Native Elements, UI Kitten
- **Internationalisation** : i18next
- **Gestion d'État** : React Context API
- **Icônes** : Expo Vector Icons, Eva Icons

## 🚀 Démarrage

### Prérequis

- Node.js (v16 ou supérieur)
- Yarn ou npm
- Expo CLI
- Simulateur iOS / Émulateur Android (optionnel)

### Installation

1. Cloner le dépôt
```bash
git clone https://github.com/your-username/madassistant.git
cd madassistant
```

2. Installer les dépendances
```bash
yarn install
# ou
npm install
```

3. Démarrer le serveur de développement
```bash
yarn start
# ou
npm start
```

4. Lancer sur votre plateforme préférée
```bash
# iOS
yarn ios

# Android
yarn android

# Web
yarn web
```

## 📁 Structure du Projet

```
MadAssistant/
├── app/                    # Écrans et navigation de l'app
├── components/             # Composants UI réutilisables
├── constants/             # Constantes et utilitaires de l'app
├── DataBase/              # Fichiers de données JSON
│   ├── contact.json       # Contacts d'urgence (français)
│   ├── contact-en.json    # Contacts d'urgence (anglais)
│   ├── FirstAid.json      # Procédures de premiers secours (français)
│   └── FirstAid-en.json   # Procédures de premiers secours (anglais)
├── i18n/                  # Internationalisation
├── assets/                # Images et ressources statiques
│   ├── images/            # Icônes et images de l'app
│   └── icons/             # Icônes universitaires et autres
└── hooks/                 # Hooks React personnalisés
```

## 🌐 Internationalisation

L'application supporte les langues française et anglaise avec des traductions complètes pour :
- Éléments d'interface et navigation
- Informations de contact d'urgence
- Procédures de premiers secours
- Conditions générales et mentions légales

## ⚠️ Notes Importantes

- **But Éducatif** : Ce projet a été développé dans le cadre d'une initiative éducative
- **Exactitude des Données** : Les informations de contact d'urgence peuvent ne pas être actuelles ou complètes
- **Urgences Réelles** : Contactez toujours les services d'urgence officiels (117, 118, 119) en cas d'urgence réelle
- **Responsabilité** : Les développeurs ne sont pas responsables de l'exactitude des informations fournies

## 🎓 Contexte Académique

<p align="center">
  <img src="./assets/icons/ISPM.jpg" alt="Logo ISPM" width="100" height="100">
</p>

Ce projet a été développé à l'**ISPM (Institut Supérieur Polytechnique de Madagascar)** dans le cadre d'un cursus de développement d'applications mobiles.

## 📱 Captures d'Écran

<p align="center">
  <img src="./docs/screenshots/home.png" alt="Écran d'Accueil" width="250">
  <img src="./docs/screenshots/contacts.png" alt="Écran des Contacts" width="250">
  <img src="./docs/screenshots/firstaid.png" alt="Écran Premiers Secours" width="250">
</p>

## 🤝 Contribuer

Il s'agit d'un projet éducatif, mais les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le dépôt
2. Créer une branche de fonctionnalité
3. Apporter vos modifications
4. Soumettre une pull request

## 📄 Licence

Ce projet est à des fins éducatives. Veuillez vérifier auprès des autorités compétentes pour obtenir des informations exactes sur les contacts d'urgence.

## 📞 Numéros d'Urgence (Madagascar)

- **Police** : 117
- **Pompiers** : 118
- **Gendarmerie** : 119

---

<p align="center">
  Fait avec ❤️ à des fins éducatives<br>
  <strong>Toujours vérifier les contacts d'urgence avec des sources officielles</strong>
</p>
