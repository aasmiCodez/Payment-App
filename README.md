# SecureBank Mobile App

A React Native mobile banking application for secure money transfers with a clean, modern interface.

## Demo Video

## What it does

SecureBank allows users to send money domestically within India (free) or internationally (₹250 fee). The app includes form validation, transaction review, and receipt sharing.

## Features

- Domestic and international money transfers
- Real-time form validation and formatting
- Transaction review before confirmation  
- Success confirmation with shareable receipts
- Clean, single-page layouts without scrolling
- Dynamic color theming based on transfer type

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Formik** for form management
- **Expo Router** for navigation

## Installation

```bash
# Clone and install dependencies
npm install

# Install required packages
npx expo install react-native-safe-area-context

# Start development server
npx expo start
```

## Project Structure

```
├── app/                    # Screen components
│   ├── home.tsx           # Balance and transfer options
│   ├── payment.tsx        # Payment form
│   ├── review.tsx         # Transaction review
│   └── success.tsx        # Confirmation screen
├── components/            
│   └── TextInput.tsx      # Enhanced input component
└── utils/
    └── validationSchema.ts # Form validation rules
```

## How to use

1. **Home**: View balance and choose transfer type
2. **Payment**: Enter recipient details and amount
3. **Review**: Verify transaction details
4. **Success**: Get confirmation and share receipt

- Form validation with proper error handling
- Modern safe area handling for all devices
- Single-page layouts optimized for mobile
