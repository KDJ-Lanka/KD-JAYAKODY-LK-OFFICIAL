// Main JavaScript - Multi-page Logic (NO GSAP dependency!)

document.addEventListener('DOMContentLoaded', () => {
    // Inject Layout Components if elements exist
    if(document.getElementById('header-container')) loadHeader();
    if(document.getElementById('footer-container')) loadFooter();

    // Note: Page transitions and animations are now handled by CSS and Intersection Observer
    // See index.html for the lightweight animation implementation
});

async function loadHeader() {
    try {
        const res = await fetch('components/header.html');
        const html = await res.text();
        document.getElementById('header-container').innerHTML = html;
    } catch(e) { console.error(e); }
}

async function loadFooter() {
    try {
        const res = await fetch('components/footer.html');
        const html = await res.text();
        document.getElementById('footer-container').innerHTML = html;
    } catch(e) { console.error(e); }
}

// Smooth scroll for anchor links (if not handled in index.html)
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        const href = link.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }
});
