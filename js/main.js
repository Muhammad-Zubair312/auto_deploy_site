document.addEventListener('DOMContentLoaded', () => {

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Firebase Authentication integration
    // IMPORTANT: Replace placeholders with your actual Firebase config
    const firebaseConfig = {
        apiKey: "FIREBASE_API_KEY_PLACEHOLDER",
        authDomain: "FIREBASE_AUTH_DOMAIN_PLACEHOLDER",
        projectId: "FIREBASE_PROJECT_ID_PLACEHOLDER",
        storageBucket: "FIREBASE_STORAGE_BUCKET_PLACEHOLDER",
        messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER",
        appId: "FIREBASE_APP_ID_PLACEHOLDER"
    };

    // Initialize Firebase if the SDK is loaded
    if (typeof firebase !== 'undefined') {
        try {
            firebase.initializeApp(firebaseConfig);
        } catch (error) {
            console.error("Firebase initialization failed. Make sure your config is correct.", error);
        }
    }

    const authErrorElement = document.getElementById('auth-error');

    function showAuthError(message) {
        if (authErrorElement) {
            authErrorElement.textContent = message;
            authErrorElement.classList.remove('hidden');
        }
    }

    // Auth functions to be called from HTML onclick attributes
    const authHandler = {
        signInWithGoogle: () => {
            if (!firebase) return console.error('Firebase not initialized.');
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    console.log('Google sign-in successful:', result.user);
                    window.location.href = 'index.html'; // Redirect to a dashboard or home page
                })
                .catch((error) => {
                    console.error('Google sign-in error:', error);
                    showAuthError(error.message);
                });
        },

        signInWithFacebook: () => {
            if (!firebase) return console.error('Firebase not initialized.');
            const provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    console.log('Facebook sign-in successful:', result.user);
                    window.location.href = 'index.html'; // Redirect
                })
                .catch((error) => {
                    console.error('Facebook sign-in error:', error);
                    showAuthError(error.message);
                });
        }
    };

    // Expose auth handler to the global scope
    window.auth = authHandler;

    // Handle email/password login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!firebase) return showAuthError('Authentication service is not available.');
            
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log('Login successful:', userCredential.user);
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error('Login error:', error);
                    showAuthError(error.message);
                });
        });
    }

    // Handle email/password registration
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!firebase) return showAuthError('Authentication service is not available.');

            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const confirmPassword = registerForm['confirm-password'].value;

            if (password !== confirmPassword) {
                return showAuthError("Passwords do not match.");
            }

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log('Registration successful:', userCredential.user);
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error('Registration error:', error);
                    showAuthError(error.message);
                });
        });
    }
});
