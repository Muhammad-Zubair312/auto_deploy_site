# Authentication Setup Guide

This guide explains how to set up authentication for your static website using a third-party service. This site is pre-configured to use **Firebase Authentication**, but the principles apply to other providers like **Auth0** or **Supabase**.

## Why Firebase Authentication?

Firebase is a popular choice for static sites because:
- It has a generous free tier.
- It handles all the complexity of user management, sessions, and security.
- It provides easy-to-use SDKs for social logins (Google, Facebook, etc.) and email/password authentication.

---

## Firebase Setup Instructions

### Step 1: Create a Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click "Add project" and follow the on-screen instructions to create a new project.
3.  Once your project is created, click the **Web icon (`</>`)** to add a new web app to your project.
4.  Give your app a nickname and click "Register app".
5.  Firebase will provide you with a configuration object. **Copy this object.**

### Step 2: Paste Your Firebase Config

1.  Open the `js/main.js` file in your project.
2.  Find the `firebaseConfig` object at the top of the file.
3.  Replace the placeholder values with the actual values from your Firebase project config.

    ```javascript
    // js/main.js

    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    ```

### Step 3: Enable Authentication Providers

1.  In the Firebase Console, go to the **Authentication** section (under "Build").
2.  Click the "Sign-in method" tab.
3.  Enable the providers you want to use:
    *   **Email/Password**: Click, enable the toggle, and save.
    *   **Google**: Click, enable the toggle, provide a project support email, and save.
    *   **Facebook**: Click, enable the toggle. You will need to create a Facebook for Developers app to get an App ID and App Secret. Follow the link and instructions provided by Firebase.

### Step 4: Configure Authorized Domains

For security, Firebase only allows authentication requests from authorized domains.

1.  In the Firebase Console -> Authentication -> Sign-in method tab, scroll down to the **Authorized domains** section.
2.  Click "Add domain" and add the domain where you will deploy your site (e.g., `localhost` for testing, `your-app.netlify.app`, `your-username.github.io`).

When using social login providers like Google and Facebook, they will redirect the user back to your app after they sign in. You must also add your deployed site's URL to the list of authorized redirect URIs in the Google Cloud and Facebook Developer consoles.

---

## Alternatives: Auth0 or Supabase

If you prefer not to use Firebase, the setup process for other providers is very similar:

1.  **Create an Application**: Sign up for Auth0 or Supabase and create a new "Single Page Application" (SPA).
2.  **Get Credentials**: The provider will give you a `Client ID` and `Domain` (for Auth0) or `URL` and `anon key` (for Supabase).
3.  **Enable Providers**: In their dashboard, enable the social connections (Google, Facebook) and database (email/password) connections you need.
4.  **Configure Callbacks**: Add your deployed site's URL to the "Allowed Callback URLs" and "Allowed Web Origins" fields in the provider's settings. This is the equivalent of Firebase's "Authorized domains".
5.  **Update JS**: You would need to replace the Firebase SDK script tags in `login.html` and `register.html` with the SDK for your chosen provider and update the functions in `js/main.js` to use their specific methods (e.g., `auth0.loginWithPopup()` or `supabase.auth.signIn()`).