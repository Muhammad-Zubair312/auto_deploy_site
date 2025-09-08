# Authentication Setup Guide

This website includes pre-built UI components for user authentication (Login and Registration). To make them functional, you need to connect them to a backend authentication service.

This guide provides instructions for integrating with popular services like Firebase, Auth0, or Supabase.

---

## 1. Choose an Authentication Provider

- **Firebase Authentication**: A great choice for fast development, offering a generous free tier and easy integration with Google, Facebook, and other social providers.
- **Auth0**: A powerful, enterprise-grade identity platform that is highly customizable and scalable.
- **Supabase**: An open-source Firebase alternative that provides authentication, databases, and storage.

For this example, we will use **Firebase**.

---

## 2. Firebase Setup Steps

### Step 2.1: Create a Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click "Add project" and follow the on-screen instructions to create a new project.
3.  Once your project is created, click the Web icon (`</>`) to add a web app to your project.
4.  Register your app by giving it a nickname. You do not need to set up Firebase Hosting at this stage.
5.  Firebase will provide you with a configuration object (`firebaseConfig`). **Copy this object.**

### Step 2.2: Enable Authentication Methods

1.  In your Firebase project console, navigate to **Authentication** from the left-hand menu.
2.  Click the "Sign-in method" tab.
3.  Enable the following providers:
    *   **Email/Password**
    *   **Google**: Click the pencil icon, enable it, and select a project support email.
    *   **Facebook**: You will need to create a Facebook for Developers app to get an App ID and App Secret. Follow the on-screen instructions in Firebase.

---

## 3. Frontend Integration

### Step 3.1: Add Firebase SDKs to Your HTML

In `login.html` and `register.html`, add the following scripts to the bottom of the `<body>` tag, before your `auth.js` script.

```html
<!-- TODO: Add your project's Firebase SDKs here -->
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
<script>
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
<script src="js/auth.js" defer></script>
```

**Important:** Replace the `firebaseConfig` object with the one you copied from your Firebase project.

### Step 3.2: Update `auth.js`

Now, you need to replace the placeholder functions in `js/auth.js` with actual Firebase authentication calls.

Find the `// TODO: Add real auth here` comments and replace the placeholder code.

**Example for Social Logins:**

```javascript
// In handleOAuthLogin function
const handleOAuthLogin = (providerName) => {
    let provider;
    if (providerName === 'Google') {
        provider = new firebase.auth.GoogleAuthProvider();
    } else if (providerName === 'Facebook') {
        provider = new firebase.auth.FacebookAuthProvider();
    } else {
        return;
    }

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // User signed in.
            console.log('User signed in:', result.user);
            window.location.href = 'dashboard.html'; // Redirect to a protected page
        })
        .catch((error) => {
            // Handle Errors here.
            console.error('OAuth Error:', error.message);
            alert('Error signing in: ' + error.message);
        });
};
```

**Example for Email/Password Registration:**

```javascript
// In the registerForm submit event listener
if (isValid) {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            console.log('User created:', userCredential.user);
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Registration Error:', error.message);
            alert('Error creating account: ' + error.message);
        });
}
```

**Example for Email/Password Login:**

```javascript
// In the loginForm submit event listener
if (isValid) {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            console.log('User signed in:', userCredential.user);
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Login Error:', error.message);
            alert('Error signing in: ' + error.message);
        });
}
```

---

## 4. Next Steps

- **Session Management**: Use `firebase.auth().onAuthStateChanged()` to listen for changes in the user's sign-in state and protect pages like `dashboard.html`.
- **User Profiles**: Once a user is created, you can save additional user information (like their name from the registration form) to a database like Firestore.
- **Logout**: Create a logout button that calls `firebase.auth().signOut()`.