# HOB Shop — Simple Cross‑Platform E‑Commerce Starter (Expo)

One codebase → iOS, Android, **Web**. Features:
- Product catalog grid
- Add/remove/quantity
- Totals (subtotal, tax, total)
- Checkout modal (demo order id; no real payments yet)

## Prereqs (macOS)
- Node.js 18+ (check with `node -v`), npm 9+
- Xcode (for iOS Simulator) and/or Android Studio (for Android Emulator)
- Expo CLI (auto-installed when running `npx expo start`)

## Run (any platform)
```bash
npm install
npx expo start
```
Then press **w** (Web), **i** (iOS), or **a** (Android).  
If your phone can't connect to the dev server on LAN, start with tunnel:
```bash
npx expo start --tunnel
```

## Folder structure
```
App.tsx                 # App UI (native components, works on web via RN Web)
src/catalog.ts          # Product catalog
src/cart.ts             # Cart math (pure TypeScript)
src/components/Row.tsx  # Small UI helper
```

## Customize products
Edit `src/catalog.ts`. You can add fields later (e.g., `inventory`, `category`).

## Add persistence
- Use `expo-secure-store` or `AsyncStorage` to persist cart across app restarts.

## Real payments (next step)
- Web: `@stripe/stripe-js` + PaymentElement.
- iOS/Android: `@stripe/stripe-react-native` (supported by Expo).

## Troubleshooting
- Repeated “allow network access” prompts? Use `--tunnel`.- iOS Simulator cannot open? Open Xcode → Settings → Locations → install required components, then `npx expo start -c` and press `i`.- Android: start an emulator in Android Studio (AVD Manager) before pressing `a`.

Enjoy! ✨
