document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggler --- //
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-icon-light');
    const darkIcon = document.getElementById('theme-icon-dark');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    };

    // Check for saved theme in localStorage or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // --- Mobile Menu --- //
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Toast Notification --- //
    const toast = document.getElementById('toast-notification');
    let toastTimeout;

    function showToast(message, duration = 3000) {
        if (!toast) return;
        clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.classList.remove('hidden');
        toast.classList.add('animate-fade-in'); // A simple fade-in animation could be added in CSS
        toastTimeout = setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('animate-fade-in');
        }, duration);
    }

    // --- Form Submission Simulation --- //
    const handleFormSubmit = (formId, successMessage) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showToast(successMessage);
                form.reset();
            });
        }
    };

    handleFormSubmit('contact-form', 'Message sent! We will get back to you soon.');
    handleFormSubmit('login-form', 'Login successful! Redirecting...');
    handleFormSubmit('register-form', 'Account created! Please check your email to verify.');
});