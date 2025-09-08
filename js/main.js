document.addEventListener('DOMContentLoaded', () => {

    // --- Firebase Configuration ---
    const firebaseConfig = {
        apiKey: "FIREBASE_API_KEY_PLACEHOLDER",
        authDomain: "FIREBASE_AUTH_DOMAIN_PLACEHOLDER",
        projectId: "FIREBASE_PROJECT_ID_PLACEHOLDER",
        storageBucket: "FIREBASE_STORAGE_BUCKET_PLACEHOLDER",
        messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER",
        appId: "FIREBASE_APP_ID_PLACEHOLDER"
    };

    let auth;
    try {
        if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'FIREBASE_API_KEY_PLACEHOLDER') {
            throw new Error('Firebase config is not set.');
        }
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
    } catch (error) {
        console.error("Firebase initialization failed:", error.message);
        const alert = document.getElementById('firebase-config-alert');
        if (alert) alert.classList.remove('hidden');
    }

    // --- UI Elements ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // --- Mobile Menu Toggle ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Dark Mode ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            sunIcon?.classList.add('hidden');
            moonIcon?.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            sunIcon?.classList.remove('hidden');
            moonIcon?.classList.add('hidden');
        }
    };

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.theme = newTheme;
            applyTheme(newTheme);
        });
    }

    // --- Real-time Form Validation ---
    const validateField = (field) => {
        const errorMsg = field.parentElement.querySelector('.error-message');
        let message = '';
        if (field.hasAttribute('required') && !field.value.trim()) {
            message = 'This field is required.';
        } else if (field.type === 'email' && field.value.trim() && !/^\S+@\S+\.\S+$/.test(field.value)) {
            message = 'Please enter a valid email address.';
        } else if (field.type === 'password' && field.hasAttribute('minlength') && field.value.length < field.minLength) {
            message = `Password must be at least ${field.minLength} characters.`;
        }
        errorMsg.textContent = message;
        return !message;
    };
    
    document.querySelectorAll('input[required], input[type="email"], input[type="password"]').forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });
    
    const validateForm = (form) => {
        let isValid = true;
        form.querySelectorAll('input[required], input[type="email"], input[type="password"]').forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    };

    // --- Authentication Logic ---
    const updateNavUI = (user) => {
        const authLinksDesktop = document.getElementById('auth-links-desktop');
        const userMenuDesktop = document.getElementById('user-menu-desktop');
        const authLinksMobile = document.getElementById('auth-links-mobile');
        const userMenuMobile = document.getElementById('user-menu-mobile');

        if (user) {
            const displayName = user.displayName || user.email;
            const userMenuHTML = `
                <div class="flex items-center space-x-4">
                    <a href="dashboard.html" class="text-sm font-medium hover:text-brand dark:hover:text-indigo-400">Dashboard</a>
                    <button id="logout-button" class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">Log Out</button>
                </div>
            `;
            const userMenuMobileHTML = `
                 <div class="flex flex-col space-y-2">
                    <a href="dashboard.html" class="block w-full text-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Dashboard</a>
                    <button id="logout-button-mobile" class="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">Log Out</button>
                 </div>
            `;

            if (authLinksDesktop) authLinksDesktop.style.display = 'none';
            if (userMenuDesktop) { userMenuDesktop.innerHTML = userMenuHTML; userMenuDesktop.style.display = 'flex'; }
            if (authLinksMobile) authLinksMobile.style.display = 'none';
            if (userMenuMobile) { userMenuMobile.innerHTML = userMenuMobileHTML; userMenuMobile.style.display = 'block'; }

            document.querySelectorAll('#logout-button, #logout-button-mobile').forEach(btn => btn.addEventListener('click', () => auth.signOut()));
        } else {
            if (authLinksDesktop) authLinksDesktop.style.display = 'flex';
            if (userMenuDesktop) userMenuDesktop.style.display = 'none';
            if (authLinksMobile) authLinksMobile.style.display = 'block';
            if (userMenuMobile) userMenuMobile.style.display = 'none';
        }
    };
    
    const handleAuthError = (error, form) => {
        const formError = form.querySelector('#form-error');
        console.error("Authentication Error:", error);
        let message = "An unknown error occurred.";
        switch(error.code) {
            case 'auth/wrong-password': message = 'Incorrect password. Please try again.'; break;
            case 'auth/user-not-found': message = 'No account found with this email.'; break;
            case 'auth/email-already-in-use': message = 'This email is already registered.'; break;
            case 'auth/weak-password': message = 'Password is too weak.'; break;
            default: message = error.message; break;
        }
        if (formError) formError.textContent = message;
    };

    if (auth) {
        auth.onAuthStateChanged(user => {
            updateNavUI(user);

            // Page-specific logic for dashboard
            if (window.location.pathname.endsWith('dashboard.html')) {
                if (user) {
                    document.getElementById('loading-spinner')?.classList.add('hidden');
                    document.getElementById('dashboard-content')?.classList.remove('hidden');
                    document.getElementById('user-email').textContent = `Logged in as: ${user.email}`;
                } else {
                    window.location.replace('login.html');
                }
            }
        });

        // Login Form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!validateForm(loginForm)) return;
                const email = loginForm.email.value;
                const password = loginForm.password.value;
                auth.signInWithEmailAndPassword(email, password)
                    .then(() => window.location.href = 'dashboard.html')
                    .catch(error => handleAuthError(error, loginForm));
            });
        }

        // Register Form
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!validateForm(registerForm)) return;
                const email = registerForm.email.value;
                const password = registerForm.password.value;
                const name = registerForm.name.value;
                auth.createUserWithEmailAndPassword(email, password)
                    .then(userCredential => {
                         return userCredential.user.updateProfile({ displayName: name });
                    })
                    .then(() => window.location.href = 'dashboard.html')
                    .catch(error => handleAuthError(error, registerForm));
            });
        }

        // Social Sign-in
        const handleSocialSignIn = (provider) => {
            auth.signInWithPopup(provider)
                .then(() => window.location.href = 'dashboard.html')
                .catch(error => console.error("Social Sign-In Error:", error));
        };
        
        const googleBtn = document.getElementById('google-signin');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                const provider = new firebase.auth.GoogleAuthProvider();
                handleSocialSignIn(provider);
            });
        }

        const facebookBtn = document.getElementById('facebook-signin');
        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => {
                const provider = new firebase.auth.FacebookAuthProvider();
                handleSocialSignIn(provider);
            });
        }
    }
});