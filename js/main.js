// Main JavaScript - Multi-page Logic

document.addEventListener('DOMContentLoaded', () => {
    // Inject Layout Components if elements exist
    if(document.getElementById('header-container')) loadHeader();
    if(document.getElementById('footer-container')) loadFooter();

    // Init Page Transition
    initPageTransition();
    
    // Init GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Slight delay to ensure DOM is ready for certain animations
    setTimeout(() => {
        initAnimations();
    }, 100);
});

async function loadHeader() {
    try {
        const res = await fetch('components/header.html');
        const html = await res.text();
        document.getElementById('header-container').innerHTML = html;
        
        // Highlight active link manually if needed (though script inside header.html handles it too)
    } catch(e) { console.error(e); }
}

async function loadFooter() {
    try {
        const res = await fetch('components/footer.html');
        const html = await res.text();
        document.getElementById('footer-container').innerHTML = html;
    } catch(e) { console.error(e); }
}

function initPageTransition() {
    // Create the overlay
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    document.body.appendChild(overlay);

    // Initial State: Complete black covering the screen
    gsap.set(overlay, { 
        position: 'fixed',
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#050505', 
        zIndex: 9999,
        transformOrigin: 'bottom'
    });

    // Animate out (Reveal page) - Smooth Fade/Slide Up
    gsap.to(overlay, {
        scaleY: 0,
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.1
    });

    // Handle Link Clicks
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        // Check if internal link and not a hash link or new tab
        if (link && 
            link.href.startsWith(window.location.origin) && 
            !link.href.includes('#') && 
            link.target !== '_blank') {
            
            e.preventDefault();
            const target = link.href;
            
            if(target === window.location.href) return;

            // Animate in (Cover page) - Smooth Slide Down
            gsap.set(overlay, { transformOrigin: 'top' });
            gsap.to(overlay, {
                scaleY: 1,
                duration: 0.8,
                ease: "power3.inOut",
                onComplete: () => {
                    window.location.href = target;
                }
            });
        }
    });
}

function initAnimations() {
    // General Fade In Up
    const fadeElements = document.querySelectorAll('.animate-on-scroll');
    fadeElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Text splitting/reveals if any
    // ...
}
