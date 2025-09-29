# The Scrum Book

The Scrum Book is a Vite + React application that curates fixtures, stats, and community resources for rugby league fans. The project has been redesigned with a marketing-style landing page and modular dashboards that can be adapted for future seasons.

## Getting Started

### Prerequisites
- Node.js 18 or newer
- npm 9+

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

The dev server prints a local URL you can open in your browser. Hot module replacement is enabled for rapid iteration on layout and content.

### Production Build
```bash
npm run build
```

The output is written to `dist/` and can be deployed to any static host. Use `npm run preview` to verify the production bundle locally.

## Environment Variables

Firebase powers authentication, profile storage, and match backups. Copy the `.env.example` file to `.env.local` and fill in your project values:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
# VITE_USE_FIREBASE_EMULATORS=true
```

Set `VITE_USE_FIREBASE_EMULATORS` to `true` when running against the local Firebase emulator suite.

## Customisation Tips

- Update the colour palette in `index.html` by editing the CSS custom properties within the `<style>` block.
- Landing page content lives in `components/AboutView.tsx`, while marketing copy and tile definitions are centralised in `content/landing.ts`.
- Tailwind utilities are provided at runtime via the CDN configuration in `index.html`, so no additional build-step changes are required for styling tweaks.
- Update the navigation structure or add feature tiles by adjusting the view exports inside `components/`.

## Template Workflow

The refreshed About page includes a "Template launch checklist" section that mirrors the static-site guidance you shared. Follow these steps to spin up a new branded experience quickly:

1. Duplicate the repository (or download an archive) to create a clean starting point.
2. Swap imagery in `public/` and adjust the colour tokens inside `index.html`.
3. Edit copy, highlight cards, and quick wins in `content/landing.ts`.
4. Rename navigation items or replace feature views in `components/Header.tsx` and the exported view components in `components/`.
5. Update Firebase credentials via `.env.local` when authentication or persistence is required.
6. Build and deploy with `npm run build` followed by your preferred hosting command (`npm run deploy` ships to GitHub Pages).

## Connecting Your Firebase Project

1. **Create a Firebase project** in the [Firebase Console](https://console.firebase.google.com/), then add a new Web app and copy the config block into `.env.local`.
2. **Enable Authentication → Sign-in method → Anonymous** so visitors can save attended matches without creating accounts.
3. **Create a Cloud Firestore database** in production mode. The app expects a `users` collection where each document ID matches a Firebase Auth UID.
4. **Optional: Storage uploads** — enable Cloud Storage if you plan to let fans attach match photos.
5. **Deploy security rules** that match your data model. The starter rules below allow each authenticated user to manage their own profile document:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

6. **Seed initial content** (optional) by creating a document manually via the console. The app will create a starter profile the first time someone logs in anonymously.

### Backing Up Your Data

The Firebase console provides on-demand exports under **Firestore → Data → Export/Import**. For scripted backups, install the [Firebase CLI](https://firebase.google.com/docs/cli) and run:

```bash
firebase login
firebase firestore:export ./backups/scrum-book-$(date +%Y%m%d)
```

Run the command from the project root after authenticating with an account that has export permissions.

## Deployment

The repository includes a `deploy` script that publishes the built assets to GitHub Pages.
```bash
npm run deploy
```
Make sure the `homepage` field in `package.json` reflects the correct repository URL before deploying.
