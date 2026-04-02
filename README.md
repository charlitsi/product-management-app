# Product Management App

A React Native mobile application built with Expo and NativeWind for managing users, products, and inventory transactions.

## Features

- **User Registration**: Register users with email and full name validation
- **Product Registration**: Add products with SKU, name, price, and initial quantity
- **Stock Management**: Add or remove product stock with validation (prevents negative stock)
- **Product Status**: View real-time product information including SKU, quantity, and last updated time
- **Transaction History**: Complete audit trail with pagination (10 items per page)

##  Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (optional, will be installed with dependencies)
- iOS Simulator (for Mac) or Android Studio (for Android testing)

##  Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd product-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

Depending on how you want to test the app, use one of the following commands:

**📱 1. Interactive Mobile Server (Default/LAN)**
Generates a QR code in your terminal. Scan it with the Expo Go app on your phone (must be on the same Wi-Fi network).
```bash
npx expo start
```
*(Tip: Once running, you can press `w` to open web, `i` for iOS, or `a` for Android simulator.)*

**🌐 2. Web Mode Only (Localhost or LAN)**
Runs the web version without mobile bundling. Access it at `http://localhost:8081` or your local IP address shown in the terminal.
```bash
npx expo start --web
```

**🍏 3. iOS Simulator**
Bypasses the QR code and launches the app inside the Apple iOS Simulator (Requires Mac with Xcode).
```bash
npx expo start --ios
```

**🤖 4. Android Emulator**
Bypasses the QR code and launches the app inside the Android virtual device (Requires Android Studio).
```bash
npx expo start --android
```

**🌍 5. Tunnel Mode (Across Different Networks)**
If your phone is on a cellular network (5G/LTE) or different Wi-Fi, this creates a secure Ngrok tunnel directly to your machine. 
```bash
npx expo start --tunnel
```

**🧹 6. Clear Cache Start (Troubleshooting)**
If the app crashes or complains about missing modules, clearing the Metro bundler cache often fixes it.
```bash
npx expo start -c
```

##  Testing the App

### Quick Test Flow:

1. **Register a User** (Users tab)
   - Enter email: `test@example.com`
   - Enter name: `Test User`
   - Tap "Register User"

2. **Register a Product** (Products tab)
   - SKU: `PROD-001`
   - Name: `Premium Widget`
   - Price: `29.99`
   - Quantity: `100`
   - Tap "Register Product"

3. **Manage Stock** (Management tab)
   - Tap on any product card
   - Choose "Add Stock" or "Remove Stock"
   - Enter quantity
   - Tap to confirm

4. **View History** (History tab)
   - See all transactions
   - Use pagination controls if more than 10 transactions

##  Project Structure

```
product-management-app/
├── App.tsx                 # Main app component with navigation
├── components/             # Reusable UI components
│   ├── Button.tsx
│   ├── FormInput.tsx
│   ├── ProductCard.tsx
│   └── TransactionItem.tsx
├── context/                # State management
│   └── AppContext.tsx
├── screens/                # Screen components
│   ├── UserRegistrationScreen.tsx
│   ├── ProductRegistrationScreen.tsx
│   ├── ProductManagementScreen.tsx
│   └── TransactionHistoryScreen.tsx
├── types/                  # TypeScript type definitions
│   └── index.ts
├── utils/                  # Utility functions
│   └── validation.ts
├── package.json
├── tailwind.config.js      # NativeWind configuration
├── babel.config.js
└── tsconfig.json
```

## 🎨 Technology Stack

- **React Native**: Mobile framework
- **Expo**: Development platform
- **TypeScript**: Type safety
- **NativeWind**: Tailwind CSS for React Native
- **React Navigation**: Tab-based navigation
- **Context API + React Hooks (useState, useEffect)**: State management

## 💡 Approach & Design Decisions

### State Management
- **Choice**: Context API with `useState` and `useEffect`
- **Why**: Simpler than Redux or `useReducer` for this scope, provides predictable state changes grouped by logical domains, and natively incorporates side-effects via hooks.
- **Alternative**: Could use `useReducer` for complex state transitions, or Zustand / Redux for larger apps

### Styling
- **Choice**: NativeWind (Tailwind CSS)
- **Why**: Rapid development, consistent design system, familiar syntax
- **Trade-off**: Slightly larger bundle size vs. raw StyleSheet

### Data Persistence
- **Current**: In-memory state (resets on app restart)
- **Trade-off**: Simplicity vs. persistence
- **Future**: AsyncStorage or local database for persistence

### Validation
- **Approach**: Custom validation functions
- **Why**: Lightweight, no external dependencies
- **Alternative**: Could use Yup or Zod for complex validation

### Navigation
- **Choice**: Bottom Tab Navigator
- **Why**: Standard mobile pattern, easy access to all features
- **Alternative**: Drawer or Stack navigation

## 🔄 Trade-offs & Future Improvements

### Current Limitations
1. **No Persistence**: Data is lost on app restart
2. **No Search/Filter**: All products shown in lists
3. **Basic Pagination**: Simple slice-based, not optimized for large datasets
4. **No Authentication**: Single user context
5. **No Offline Support**: Requires app to be running

### What I Would Improve With More Time

#### High Priority (Next 3-5 hours)
- [ ] **AsyncStorage Integration**: Persist data locally
- [ ] **Search Functionality**: Filter products by SKU/name
- [ ] **Better Error Handling**: Toast notifications instead of alerts
- [ ] **Loading States**: Skeleton screens during operations
- [ ] **Form Libraries**: Use React Hook Form for better form management

#### Medium Priority (Additional 5-10 hours)
- [ ] **Testing**: Unit tests with Jest, component tests with React Testing Library
- [ ] **Advanced Pagination**: Virtual lists for better performance
- [ ] **Batch Operations**: Bulk stock adjustments
- [ ] **Export Data**: CSV export of products and transactions
- [ ] **Dark Mode**: Theme switching

#### Low Priority (Future enhancements)
- [ ] **Backend Integration**: REST API or GraphQL
- [ ] **Multi-user Support**: User roles and permissions
- [ ] **Analytics Dashboard**: Charts and insights
- [ ] **Barcode Scanning**: For product registration
- [ ] **Push Notifications**: Low stock alerts

## 🧪 Validation Rules

### User Registration
- Email: Required, valid email format
- Full Name: Required, minimum 2 characters

### Product Registration
- SKU: Required, minimum 3 characters, auto-uppercased, unique
- Name: Required
- Price: Required, must be > 0
- Quantity: Required, must be >= 0

### Stock Adjustment
- Quantity: Required, must be > 0
- Cannot remove more stock than available

## 🐛 Known Issues & Limitations

1. **Modal on Android**: Stock adjustment modal may have slight rendering differences on older Android versions
2. **Pagination Reset**: Pagination resets when new transactions are added
3. **No Undo**: Stock adjustments are permanent (in current session)

## 📝 Component Reusability

The app demonstrates component reusability:
- `FormInput`: Used across all registration screens
- `Button`: Consistent button styling throughout
- `ProductCard`: Reused in Products and Management screens
- `TransactionItem`: Displays all transaction types uniformly

## 🎯 Performance Considerations

- Memoized pagination calculations with `useMemo`
- Optimized re-renders by clearing errors selectively
- Efficient reducer pattern for state updates
- Minimal external dependencies

## 📄 License

This project is created for interview evaluation purposes.

## 👤 Author

Created as a take-home assignment for product/user management demonstration.

---

**Estimated Development Time**: 4 hours
**Submission Deadline**: April 2nd, 2026 at 3 PM local time
