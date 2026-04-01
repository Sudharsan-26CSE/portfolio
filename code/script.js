// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll("main > section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "hero";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - window.innerHeight / 3) { // Trigger near middle of screen
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// --- Immediate feedback on click ---
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Remove active class from all links to ensure only one is active
        navLinks.forEach(nav => nav.classList.remove('active'));
        // Add active class to the clicked link for instant visual feedback
        this.classList.add('active');
    });
});

// --- Fade-in Animation on Scroll ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// --- Form Submit Animation ---
const contactForm = document.querySelector('.contact-form');
const successMessage = document.querySelector('.success-message');
const submitBtn = document.querySelector('.contact-form button[type="submit"]');

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const originalBtnText = submitBtn.innerText;
        submitBtn.classList.add('sending');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message & clear form
                successMessage.classList.add('show');
                contactForm.reset();

                // Hide the success message gracefully after 4 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 4000);
            } else {
                // Handle server errors (e.g., Formspree is down)
                alert('Oops! There was a problem submitting your form. Please try again later.');
            }
        } catch (error) {
            // Handle network errors
            console.error('Form submission error:', error);
            alert('Oops! There was a network error. Please check your connection and try again.');
        } finally {
            // Always reset the button
            submitBtn.classList.remove('sending');
            submitBtn.innerText = originalBtnText;
        }
    });
}