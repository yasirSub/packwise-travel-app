# PackWise - AI-Powered Travel Packing Assistant

A modern travel app built with Expo and React Native that helps users plan their trips with an AI-powered packing assistant that suggests items based on destination, trip type, activities, travel companions, and duration.

## Features

- **Trip Management**: Create, view, and manage your upcoming and past trips
- **AI-Powered Packing Assistant**: Get personalized packing suggestions based on:
  - Trip destination
  - Trip type (Beach, City, Mountain, Business, Adventure, Family, etc.)
  - Planned activities (Swimming, Hiking, Sightseeing, etc.)
  - Travel companions (Solo, Friend, Partner, Family)
  - Relationship type (Friends, Couple, Family, Colleagues)
  - Trip duration
- **Smart Checklist Categories**:
  - Documents (Passport, ID, Travel Insurance)
  - Clothing (Weather and activity appropriate)
  - Personal Care (Toiletries, Medications)
  - Gadgets & Electronics (Smartphone, Chargers)
  - Safety Items (First Aid Kit, Hand Sanitizer)
  - Activity-specific gear
- **Customization Options**:
  - Add custom items to your packing list
  - Check off items as you pack
  - Save your packing list for future reference
- **Sharing Functionality**:
  - Export as PDF
  - Share via WhatsApp
  - Share via Email
  - Copy to clipboard
- **Explore Destinations**: Browse popular travel destinations with information and ratings
- **User Profile**: Manage your account settings and preferences

## Tech Stack

- [Expo](https://expo.dev/) - React Native development platform
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing for Expo apps
- [React Navigation](https://reactnavigation.org/) - Navigation library for React Native
- [React Native Elements](https://reactnativeelements.com/) - UI component library
- [Axios](https://axios-http.com/) - HTTP client for API requests

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- iOS Simulator (macOS) or Android Emulator / physical device

### Installation

1. Clone the repository
```
git clone https://github.com/yasirSub/packwise-travel-app.git
cd packwise-travel-app
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npx expo start
```

4. Run on your preferred platform
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## Project Structure

```
packwise-travel-app/
├── app/              # Main application code with file-based routing
│   ├── (tabs)/       # Tab-based screens
│   │   ├── home.tsx  # Home screen
│   │   ├── trips.tsx # Trip management screen
│   │   ├── explore.tsx # Destination exploration screen
│   │   └── profile.tsx # User profile screen
│   ├── new-trip.tsx  # Trip creation screen with AI packing
│   └── _layout.tsx   # Root layout configuration
├── assets/           # Static assets (images, fonts)
├── components/       # Reusable components
├── constants/        # App constants (colors, theme)
└── hooks/            # Custom React hooks
```

## Key Improvement Features

- **Weather API Integration**: Get real-time weather data for destinations to make more accurate packing suggestions
- **Offline Access**: Save your packing lists for offline use when traveling
- **User Authentication**: Personal account to save and access your trips across devices
- **Machine Learning**: Improve packing suggestions based on user feedback and preferences
- **Trip Itinerary Planning**: Add activities and points of interest to your trip schedule
- **Multi-language Support**: Expand accessibility to international travelers

## Screenshots

![Home Screen](https://github.com/yasirSub/packwise-travel-app/raw/main/screenshots/home-screen.png)
![New Trip Form](https://github.com/yasirSub/packwise-travel-app/raw/main/screenshots/new-trip-form.png)
![Packing List](https://github.com/yasirSub/packwise-travel-app/raw/main/screenshots/packing-list.png)

## License

This project is licensed under the MIT License - see the LICENSE file for details.