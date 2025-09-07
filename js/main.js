document.addEventListener('DOMContentLoaded', function () {

    // --- Dark Mode Toggle --- //
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    // Check for saved theme preference or use system preference
    if (localStorage.getItem('color-theme') === 'dark' || 
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if (lightIcon) lightIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        if (darkIcon) darkIcon.classList.remove('hidden');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            // toggle icons inside button
            if (darkIcon) darkIcon.classList.toggle('hidden');
            if (lightIcon) lightIcon.classList.toggle('hidden');

            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
            } else { // if not set via local storage previously
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        });
    }

    // --- Mobile Menu Toggle --- //
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            // Toggle icons
            mobileMenuButton.querySelectorAll('svg').forEach(icon => icon.classList.toggle('hidden'));
        });
    }

    // --- Sign In / Register Page Logic --- //
    const signinTab = document.getElementById('signin-tab');
    const registerTab = document.getElementById('register-tab');
    const signinForm = document.getElementById('signin-form');
    const registerForm = document.getElementById('register-form');

    if (signinTab && registerTab && signinForm && registerForm) {
        signinTab.addEventListener('click', () => {
            signinForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            signinTab.classList.add('text-primary-600', 'border-primary-500');
            signinTab.classList.remove('text-secondary-500', 'border-transparent', 'hover:text-secondary-700', 'hover:border-secondary-300');
            registerTab.classList.add('text-secondary-500', 'border-transparent', 'hover:text-secondary-700', 'hover:border-secondary-300');
            registerTab.classList.remove('text-primary-600', 'border-primary-500');
        });

        registerTab.addEventListener('click', () => {
            registerForm.classList.remove('hidden');
            signinForm.classList.add('hidden');
            registerTab.classList.add('text-primary-600', 'border-primary-500');
            registerTab.classList.remove('text-secondary-500', 'border-transparent', 'hover:text-secondary-700', 'hover:border-secondary-300');
            signinTab.classList.add('text-secondary-500', 'border-transparent', 'hover:text-secondary-700', 'hover:border-secondary-300');
            signinTab.classList.remove('text-primary-600', 'border-primary-500');
        });
    }

    // --- Password Strength Meter --- //
    const passwordInput = document.getElementById('register-password');
    const strengthBar = document.getElementById('password-strength-bar');
    const strengthText = document.getElementById('password-strength-text');

    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            let score = 0;
            if (password.length > 8) score++;
            if (/[A-Z]/.test(password)) score++;
            if (/[a-z]/.test(password)) score++;
            if (/[0-9]/.test(password)) score++;
            if (/[^A-Za-z0-9]/.test(password)) score++;

            strengthBar.classList.remove('strength-weak', 'strength-medium', 'strength-strong');

            switch (score) {
                case 0:
                case 1:
                case 2:
                    strengthBar.style.width = '25%';
                    strengthBar.classList.add('strength-weak');
                    strengthText.textContent = 'Weak';
                    break;
                case 3:
                case 4:
                    strengthBar.style.width = '65%';
                    strengthBar.classList.add('strength-medium');
                    strengthText.textContent = 'Medium';
                    break;
                case 5:
                    strengthBar.style.width = '100%';
                    strengthBar.classList.add('strength-strong');
                    strengthText.textContent = 'Strong';
                    break;
                default:
                    strengthBar.style.width = '0%';
                    strengthText.textContent = '';
            }
            if (password.length === 0) {
                strengthBar.style.width = '0%';
                strengthText.textContent = '';
            }
        });
    }

});