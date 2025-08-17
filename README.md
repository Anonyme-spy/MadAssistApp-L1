🇫🇷 [Français](./Readme-fr.md)
🇬🇧 [English](./README.md)

# 🚨 MadAssistant

> **⚠️ DISCLAIMER**: This is an educational/demonstration project. Emergency contact information may not be 100% accurate or up-to-date. In real emergencies, always contact official emergency services directly.

<p align="center">
  <img src="./assets/images/3.png" alt="MadAssistant Logo" width="120" height="120">
</p>

<p align="center">
  <strong>Smart Emergency Assistant for Madagascar</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/React%20Native-0.79.2-61DAFB?style=flat-square&logo=react" alt="React Native">
  <img src="https://img.shields.io/badge/Expo-~53.0.9-000020?style=flat-square&logo=expo" alt="Expo">
  <img src="https://img.shields.io/badge/TypeScript-~5.8.3-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
</p>

## 📱 About

MadAssistant is a React Native mobile application designed to provide quick access to emergency services in Madagascar. The app features an intuitive interface with multilingual support (French/English) and comprehensive emergency contact information.

## ✨ Features

- 🚨 **Quick Emergency Calls** - One-tap access to emergency services
- 📞 **Organized Contacts** - Categorized emergency contacts (Health, Security, Fire, etc.)
- 🩺 **First Aid Guide** - Step-by-step emergency procedures
- 🌍 **Multilingual** - French and English support
- 🎨 **Adaptive Theming** - Light, Dark, and Auto modes
- 📱 **Cross-Platform** - Works on iOS and Android

## 🏗️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **UI Components**: React Native Elements, UI Kitten
- **Internationalization**: i18next
- **State Management**: React Context API
- **Icons**: Expo Vector Icons, Eva Icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm
- Expo CLI
- iOS Simulator / Android Emulator (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/madassistant.git
cd madassistant
```

2. Install dependencies
```bash
yarn install
# or
npm install
```

3. Start the development server
```bash
yarn start
# or
npm start
```

4. Run on your preferred platform
```bash
# iOS
yarn ios

# Android
yarn android

# Web
yarn web
```

## 📁 Project Structure

```
MadAssistant/
├── app/                    # App screens and navigation
├── components/             # Reusable UI components
├── constants/             # App constants and utilities
├── DataBase/              # JSON data files
│   ├── contact.json       # Emergency contacts (French)
│   ├── contact-en.json    # Emergency contacts (English)
│   ├── FirstAid.json      # First aid procedures (French)
│   └── FirstAid-en.json   # First aid procedures (English)
├── i18n/                  # Internationalization
├── assets/                # Images and static assets
│   ├── images/            # App icons and images
│   └── icons/             # University and other icons
└── hooks/                 # Custom React hooks
```

## 🌐 Internationalization

The app supports both French and English languages with complete translations for:
- UI elements and navigation
- Emergency contact information
- First aid procedures
- Legal terms and conditions

## ⚠️ Important Notes

- **Educational Purpose**: This project was developed as part of an educational initiative
- **Data Accuracy**: Emergency contact information may not be current or complete
- **Real Emergencies**: Always contact official emergency services (117, 118, 119) in actual emergencies
- **Liability**: Developers are not responsible for the accuracy of information provided

## 🎓 Academic Context

<p align="center">
  <img src="./assets/icons/ISPM.jpg" alt="ISPM Logo" width="100" height="100">
</p>

This project was developed at **ISPM (Institut Supérieur Polytechnique de Madagascar)** as part of mobile application development coursework.

## 📱 Screenshots

<p align="center">
  <img src="./docs/screenshots/home.png" alt="Home Screen" width="250">
  <img src="./docs/screenshots/contacts.png" alt="Contacts Screen" width="250">
  <img src="./docs/screenshots/firstaid.png" alt="First Aid Screen" width="250">
</p>

## 🤝 Contributing

This is an educational project, but contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for educational purposes. Please check with the appropriate authorities for accurate emergency contact information.

## 📞 Emergency Numbers (Madagascar)

- **Police**: 117
- **Fire Department**: 118
- **Gendarmerie**: 119

---

<p align="center">
  Made with ❤️ for educational purposes<br>
  <strong>Always verify emergency contacts with official sources</strong>
</p>
