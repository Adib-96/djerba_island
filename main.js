function initializeApp() {

    /* =========================================================
       1. Preloader Screen
       ========================================================= */
    const preloader = document.getElementById("preloader");
    
    function hidePreloader() {
        document.body.classList.add("loaded");
        setTimeout(() => {
            if (preloader) preloader.style.display = "none";
        }, 1000);
    }

    if (document.readyState === "complete") {
        setTimeout(hidePreloader, 500);
    } else {
        window.addEventListener("load", () => setTimeout(hidePreloader, 500));
        // Failsafe: always hide after 2 seconds no matter what
        setTimeout(hidePreloader, 2000);
    }

    /* =========================================================
       2. Custom Fluid Cursor
       ========================================================= */
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    // Only set up if we are on a desktop (elements exist and support hover)
    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Move dot instantly
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });

        // Add easing for outline
        function animateOutline() {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            
            outlineX += distX * 0.15; // smoothness factor
            outlineY += distY * 0.15;
            
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Add hover effects for interactive elements
        const iteractives = document.querySelectorAll('a, button, .excursion_card img, .gallery img, video');
        iteractives.forEach(el => {
            el.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });
            el.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });
        });
    }

    /* =========================================================
       3. Intersection Observer (Scroll Animations)
       ========================================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".fade-in-up");
    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    /* =========================================================
       4. Magnetic Button Effect (Parallax Hover)
       ========================================================= */
    const magneticElements = document.querySelectorAll('.voir_excursion, .reserve-btn:not(.phone_menu a)');
    
    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate pull distance
            const pullX = (x - centerX) * 0.2; 
            const pullY = (y - centerY) * 0.2;
            
            btn.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.02)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px) scale(1)`;
        });
    });

    /* =========================================================
       5. Mobile Menu Toggle & Navigation Focus
       ========================================================= */
    const menuBtn = document.getElementById("menu_list");
    const phoneMenu = document.getElementById("phone_menu");
    const hamburger = document.querySelector(".hamburger");
    
    if (menuBtn && phoneMenu) {
        menuBtn.addEventListener("click", () => {
            phoneMenu.classList.toggle("active");
        });
        
        // Close menu on link click
        phoneMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                phoneMenu.classList.remove('active');
            });
        });
    }

    // click outside
    document.addEventListener("click", (e) => {
        if (phoneMenu && phoneMenu.classList.contains("active") && !hamburger.contains(e.target) && !phoneMenu.contains(e.target)) {
            phoneMenu.classList.remove("active");
        }
    });

    /* =========================================================
       6. Back To Top Button
       ========================================================= */
    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    if(backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
