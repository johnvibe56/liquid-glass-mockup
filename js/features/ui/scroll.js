/**
 * Scroll Handling Module
 * Manages scroll-based UI effects and optimizations
 */

let lastScroll = 0;
let isScrolling = false;

/**
 * Initialize scroll handling
 */
export function initScrollHandler() {
    console.log('RIVO: Initializing scroll handling...');
    
    const header = document.querySelector('.page-header');
    const navWrapper = document.querySelector('.nav-wrapper');
    const mainContent = document.querySelector('.main-content');
    
    if (!header && !navWrapper) {
        console.warn('RIVO: No scrollable elements found');
        return;
    }
    
    // Add scroll event with debounce
    const handleScroll = () => {
        if (isScrolling) return;
        
        isScrolling = true;
        
        // Use requestAnimationFrame for smooth animations
        requestAnimationFrame(() => {
            const currentScroll = window.scrollY || document.documentElement.scrollTop;
            
            // Header show/hide on scroll
            if (header) {
                if (currentScroll <= 0) {
                    header.classList.remove('scrolled');
                } else if (currentScroll > lastScroll && currentScroll > 100) {
                    header.classList.add('scrolled');
                } else if (currentScroll < lastScroll) {
                    header.classList.remove('scrolled');
                }
            }
            
            // Navbar background on scroll
            if (navWrapper) {
                if (currentScroll > 50) {
                    navWrapper.classList.add('scrolled');
                } else {
                    navWrapper.classList.remove('scrolled');
                }
            }
            
            lastScroll = currentScroll;
            isScrolling = false;
        });
    };
    
    // Add scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (mainContent) {
        mainContent.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Initial check
    handleScroll();
    
    console.log('RIVO: Scroll handling initialized');
}

// Export public API
export default {
    init: initScrollHandler
};
