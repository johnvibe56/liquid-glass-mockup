/**
 * Scroll Handling Module
 * Manages scroll-based UI effects and optimizations
 */

let lastScroll = 0;
let isScrolling = false;
let scrollTimeout;

/**
 * Initialize scroll handling
 */
function initScrollHandler() {
    const header = document.querySelector('.top-bar');
    const bottomNav = document.querySelector('.bottom-nav');
    const progressBar = document.querySelector('.scroll-progress');
    const mainContent = document.querySelector('.main-content');
    
    if (!header || !bottomNav) return;
    
    let lastScrollTop = 0;
    let ticking = false;
    
    // Handle scroll events with throttling
    const handleScroll = () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update progress bar
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
            
            if (currentScroll > 10) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        }
        
        // Handle header show/hide on scroll
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Show/hide header on scroll direction
                if (currentScroll <= 0) {
                    header.classList.remove('hidden');
                    bottomNav.classList.remove('hidden');
                } else if (currentScroll > lastScroll && currentScroll > 150) {
                    // Scrolling down
                    header.classList.add('hidden');
                    bottomNav.classList.add('hidden');
                } else if (currentScroll < lastScroll) {
                    // Scrolling up
                    header.classList.remove('hidden');
                    bottomNav.classList.remove('hidden');
                }
                
                // Add scrolled class to bottom nav when scrolled
                if (currentScroll > 50) {
                    bottomNav.classList.add('scrolled');
                } else {
                    bottomNav.classList.remove('scrolled');
                }
                
                lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
                ticking = false;
            });
            
            ticking = true;
        }
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        // Set a timeout to show nav when scrolling stops
        scrollTimeout = setTimeout(() => {
            header.classList.remove('hidden');
            bottomNav.classList.remove('hidden');
        }, 1500);
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Handle touch events for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        const touchDiff = touchStartY - touchEndY;
        
        // Show/hide nav based on scroll direction
        if (touchDiff > 10) {
            // Scrolling down
            header.classList.add('hidden');
            bottomNav.classList.add('hidden');
        } else if (touchDiff < -10) {
            // Scrolling up
            header.classList.remove('hidden');
            bottomNav.classList.remove('hidden');
        }
    }, { passive: true });
    
    // Show nav when tapping near the top/bottom of the screen
    document.addEventListener('touchend', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        if (currentScroll < windowHeight * 0.2 || currentScroll > document.documentElement.scrollHeight - windowHeight * 1.2) {
            header.classList.remove('hidden');
            bottomNav.classList.remove('hidden');
        }
    }, { passive: true });
}

export { initScrollHandler };

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollHandler);
} else {
    initScrollHandler();
}
