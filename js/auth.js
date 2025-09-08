document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // --- OAuth Button Handlers ---
    const googleBtn = document.getElementById('google-login-btn');
    const facebookBtn = document.getElementById('facebook-login-btn');

    const handleOAuthLogin = (provider) => {
        alert(`${provider} login is not yet configured. See AUTH.md for setup instructions.`);
        // TODO: Add real auth here using Firebase, Auth0, or Supabase.
        // Example with Firebase:
        // const provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithPopup(provider).then(result => ...);
    };

    if (googleBtn) {
        googleBtn.addEventListener('click', () => handleOAuthLogin('Google'));
    }
    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => handleOAuthLogin('Facebook'));
    }

    // --- Form Validation ---
    const showError = (input, message) => {
        const errorElement = input.nextElementSibling;
        input.classList.add('border-red-500');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    };

    const hideError = (input) => {
        const errorElement = input.nextElementSibling;
        input.classList.remove('border-red-500');
        errorElement.classList.add('hidden');
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const email = loginForm.querySelector('#email');
            const password = loginForm.querySelector('#password');

            if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email address.');
                isValid = false;
            } else {
                hideError(email);
            }

            if (password.value.trim() === '') {
                showError(password, 'Password is required.');
                isValid = false;
            } else {
                hideError(password);
            }

            if (isValid) {
                alert('Login form submitted successfully (UI only)!');
                // TODO: Add real auth here.
                // firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(...) 
                 window.location.href = 'dashboard.html';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const name = registerForm.querySelector('#name');
            const email = registerForm.querySelector('#email');
            const password = registerForm.querySelector('#password');
            const confirmPassword = registerForm.querySelector('#confirm-password');

            if (name.value.trim() === '') {
                showError(name, 'Name is required.');
                isValid = false;
            } else {
                hideError(name);
            }

            if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email address.');
                isValid = false;
            } else {
                hideError(email);
            }

            if (password.value.length < 8) {
                showError(password, 'Password must be at least 8 characters.');
                isValid = false;
            } else {
                hideError(password);
            }

            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Passwords do not match.');
                isValid = false;
            } else {
                hideError(confirmPassword);
            }

            if (isValid) {
                alert('Registration form submitted successfully (UI only)!');
                // TODO: Add real auth here.
                // firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(...)
                window.location.href = 'dashboard.html';
            }
        });
    }
});
