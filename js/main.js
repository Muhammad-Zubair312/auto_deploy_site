document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMain = document.querySelector('.nav-main');

    if (navToggle && navMain) {
        navToggle.addEventListener('click', () => {
            navMain.classList.toggle('active');
            const isExpanded = navMain.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Cart Count Simulation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountSpan = document.getElementById('cart-count');
    let cartCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            if (cartCountSpan) {
                cartCountSpan.textContent = cartCount;
            }
        });
    });

    // Form Submission Simulation
    const handleFormSubmit = (formId, successMessage) => {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formStatus = document.getElementById('form-status');
            if (!formStatus) return;

            formStatus.textContent = successMessage;
            formStatus.className = 'success';
            formStatus.style.display = 'block';

            form.reset();

            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        });
    };

    handleFormSubmit('contact-form', 'Thank you for your message! We will get back to you shortly.');
    handleFormSubmit('login-form', 'Login successful! Redirecting...');
    handleFormSubmit('register-form', 'Registration successful! Please check your email to verify your account.');
    handleFormSubmit('profile-form', 'Profile updated successfully!');

});
