function Navigate(index) {
    // Example: scroll to the slide with the given index
    const slides = document.querySelectorAll('.swiper-slide');
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
    // Update active button
    document.querySelectorAll('.Links button').forEach((btn, i) => {
        btn.classList.toggle('activeLink', i === index);
    });
}
// Initialize: show first slide only
document.addEventListener('DOMContentLoaded', () => {
    Navigate(0);
});

