document.addEventListener('DOMContentLoaded', function() {
    const bottomNav = document.querySelector('.bottom-nav');
    const topBar = document.querySelector('.top-bar');
    const scrollThreshold = 50; // Pixels to scroll before triggering the effect
    let ticking = false;
    let lastScroll = 0;

    function updateNavbars() {
        const currentScroll = window.scrollY;
        const scrollDelta = currentScroll - lastScroll;
        
        // Update bottom nav
        if (currentScroll > scrollThreshold) {
            bottomNav.classList.add('scrolled');
            bottomNav.style.pointerEvents = 'none';
        } else {
            bottomNav.classList.remove('scrolled');
            bottomNav.style.pointerEvents = 'auto';
        }
        
        // Update top bar
        if (currentScroll > 10) { // Small threshold for top bar to start changing
            topBar.classList.add('scrolled');
            
            // Make top bar more compact when scrolling down, expand when scrolling up
            if (Math.abs(scrollDelta) > 1) { // More sensitive to scroll direction
                if (scrollDelta > 0) {
                    // Scrolling down - make more compact
                    topBar.style.transform = 'translateY(0)';
                    topBar.style.padding = '0.25rem 1.25rem';
                    topBar.style.height = '42px';
                } else {
                    // Scrolling up - make more prominent
                    topBar.style.transform = 'translateY(0)';
                    topBar.style.padding = '0.5rem 1.25rem';
                    topBar.style.height = '54px';
                }
            }
        } else {
            // At top of page - reset to default
            topBar.classList.remove('scrolled');
            topBar.style.transform = 'translateY(0)';
            topBar.style.padding = '1rem 1.25rem';
            topBar.style.height = '64px';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }

    // Use requestAnimationFrame for smoother performance
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbars);
            ticking = true;
        }
    }, { passive: true });

    // Initial check in case page loads with scroll
    updateNavbars();

    // Handle resize events to ensure proper positioning
    function handleResize() {
        if (bottomNav.classList.contains('scrolled') || topBar.classList.contains('scrolled')) {
            // Force reflow to ensure smooth transitions
            void bottomNav.offsetWidth;
            void topBar.offsetWidth;
        }
    }

    window.addEventListener('resize', handleResize);
    
    // Clean up event listeners
    return () => {
        window.removeEventListener('scroll', updateNavbars, { passive: true });
        window.removeEventListener('resize', handleResize);
    };
});
