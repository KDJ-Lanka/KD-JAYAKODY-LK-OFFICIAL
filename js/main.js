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
    // Create the shutter overlay structure
    const container = document.createElement('div');
    container.className = 'transition-container';
    
    // Create 5 bars
    for(let i=0; i<5; i++) {
        const bar = document.createElement('div');
        bar.className = 'transition-bar';
        // Set initial state to "covering" the screen, so we can reveal
        bar.style.transform = "scaleY(1)"; 
        container.appendChild(bar);
    }
    document.body.appendChild(container);

    // Animate out (Reveal page from bottom up)
    gsap.to(container.querySelectorAll('.transition-bar'), {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 1,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: 0.2
    });

    // Handle Link Clicks for internal navigation
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href.includes(window.location.origin) && !link.href.includes('#') && !link.target) {
            e.preventDefault();
            const target = link.href;
            
            // Check if clicking same page
            if(target === window.location.href) return;

            // Animate in (Cover page from top down)
            gsap.to(container.querySelectorAll('.transition-bar'), {
                scaleY: 1,
                transformOrigin: "top",
                duration: 0.8,
                stagger: 0.1,
                ease: "power4.inOut",
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
