# SnapRead

SnapRead is a mobile app that allows users to scan and summarize any reading material using AI. Take a photo of books, magazines, articles, or newspapers, and get instant summaries, key concepts, and memorable quotes.

## Features

- **Scan Reading Materials**: Capture photos of any text-based content
- **AI-Powered Summaries**: Get concise summaries of scanned content
- **Key Concepts & Quotes**: Extract important keywords and memorable quotes
- **Reading History**: Build a personal library of all your scanned materials
- **Reading Stats**: Track your reading habits and preferences
- **Customizable**: Edit AI-generated summaries to your liking

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- iOS or Android emulator (or physical device)

### Installation

1. Clone the repository
```
git clone https://github.com/your-username/snap-read.git
cd snap-read
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npx expo start
```

4. Run on iOS or Android device/emulator
```
# iOS
npx expo run:ios

# Android
npx expo run:android
```

## Project Structure

The project is organized as follows:

```
src/
├── components/   # Reusable UI components
├── context/      # React Context for state management
├── navigation/   # Navigation configuration
├── screens/      # App screens
├── services/     # Services (DB, AI)
├── types/        # TypeScript definitions
└── utils/        # Helper functions
```

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation
- SQLite (for local storage)
- Expo Camera
- React Native Paper (for UI components)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 