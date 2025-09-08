# Authentication Setup Guide

This guide explains how to set up authentication for this web template. The default implementation uses Firebase Authentication, but alternatives like Auth0 and Supabase are also excellent choices.

## Option 1: Firebase Authentication (Default)

This template is pre-configured to use the Firebase SDK. You just need to create a Firebase project and enable the sign-in methods.

### Step 1: Create a Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click "Add project" and follow the on-screen instructions to create a new project.

### Step 2: Register Your Web App

1.  In your new project's dashboard, click the web icon (`</>`) to add a new web app.
2.  Give your app a nickname and click "Register app".
3.  Firebase will provide you with a `firebaseConfig` object. **Copy this object.**

### Step 3: Enable Sign-In Methods

1.  In the Firebase Console, go to **Authentication** (in the Build section).
2.  Click the **Sign-in method** tab.
3.  Enable the following providers:
    *   **Email/Password**: Just click enable.
    *   **Google**: Click enable, provide a project support email, and save.
    *   **Facebook**: Click enable. You'll need a Facebook for Developers App ID and App Secret. Follow their on-screen guide to get these.

### Step 4: Add Your Credentials to the Code

1.  Open the `js/main.js` file in your project.
2.  Find the `firebaseConfig` object at the top of the file.
3.  Replace the placeholder values with the ones you copied from the Firebase console.

```javascript
// js/main.js

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 5: Configure Authorized Domains

1.  In the Firebase Authentication **Sign-in method** tab, scroll down to **Authorized domains**.
2.  Ensure that the domain where you are hosting your website is listed (e.g., `localhost` for local development).

That's it! Your login and registration pages should now work correctly.

---

## Option 2: Auth0 Integration

Auth0 is a powerful and flexible identity platform.

1.  **Sign up for Auth0**: Create a free account at [Auth0](https://auth0.com/).
2.  **Create an Application**: In the Auth0 dashboard, go to Applications and create a new "Single Page Web Application".
3.  **Configure URLs**: In your application settings, add your app's URL (e.g., `http://localhost:3000`) to "Allowed Callback URLs", "Allowed Logout URLs", and "Allowed Web Origins".
4.  **Install SDK**: Replace the Firebase CDN scripts in `login.html` and `register.html` with the Auth0 SPA JS SDK:
    `<script src="https://cdn.auth0.com/js/auth0-spa-js/2.0/auth0-spa-js.production.js"></script>`
5.  **Update `main.js`**: You will need to replace the Firebase initialization and auth calls with Auth0's methods. Refer to the [Auth0 Single-Page App Quickstart](https://auth0.com/docs/quickstart/spa) for detailed instructions.

---

## Option 3: Supabase Integration

Supabase is an open-source Firebase alternative with a great developer experience.

1.  **Create a Supabase Project**: Sign up at [Supabase](https://supabase.com/) and create a new project.
2.  **Get API Keys**: In your project dashboard, go to **Settings** -> **API**. You will find your Project URL and `anon` public key.
3.  **Enable Providers**: Go to **Authentication** -> **Providers** and enable the social logins you want (Google, Facebook, etc.). Follow the on-screen guides to add your provider credentials.
4.  **Install SDK**: Replace the Firebase CDN scripts in `login.html` and `register.html` with the Supabase JS library:
    `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`
5.  **Update `main.js`**: Replace the Firebase logic with Supabase's. You will initialize the Supabase client with your URL and key and then use `supabase.auth.signInWith...` methods. Refer to the [Supabase Auth Quickstart](https://supabase.com/docs/guides/auth) for code examples.