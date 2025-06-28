// Enhanced scroll-based nav behavior

function initNavScroll() {
    console.log('Initializing nav scroll handler...');
    
    const navWrapper = document.querySelector('.nav-wrapper');
    const productFeed = document.querySelector('.product-feed');
    
    if (!navWrapper || !productFeed) {
        console.error('Required elements not found!', {
            navWrapper: !!navWrapper,
            productFeed: !!productFeed
        });
        return;
    }
    
    const body = document.body;
    const html = document.documentElement;
    
    if (!navWrapper) {
        console.error('Nav wrapper not found!');
        return;
    }
    
    console.log('Nav wrapper found:', navWrapper);
    
    // Set initial state (expanded)
    navWrapper.classList.remove('collapsed');
    navWrapper.style.transition = 'all 0.3s ease';
    

    // Track scroll position
    let lastScroll = 0;
    let scrollTimeout = null;
    
    // Enhanced scroll handler with debouncing and better edge case handling
    function handleScroll() {
        // Get scroll position from the product feed or fallback to window
        let currentScroll = 0;
        let maxScroll = 0;
        
        if (productFeed) {
            currentScroll = productFeed.scrollTop;
            maxScroll = productFeed.scrollHeight - productFeed.clientHeight;

        } else {
            // Fallback to window scroll position
            currentScroll = Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop
            );
            maxScroll = document.documentElement.scrollHeight - window.innerHeight;

        }
        
        // Calculate scroll direction
        const isScrollingDown = currentScroll > lastScroll;
        const isAtTop = currentScroll <= 0;
        const isAtBottom = currentScroll >= maxScroll - 10; // 10px threshold for bottom detection
        

        
        // Clear any existing timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Set a new timeout with debouncing
        scrollTimeout = setTimeout(() => {
            // Always expand if at the very top
            if (isAtTop) {
                navWrapper.classList.remove('collapsed');
            } 
            // Collapse when scrolling down past threshold (100px)
            else if (isScrollingDown && currentScroll > 100) {
                navWrapper.classList.add('collapsed');
            } 
            // Expand when scrolling up (unless at the very bottom)
            else if (!isScrollingDown && !isAtBottom) {
                navWrapper.classList.remove('collapsed');
            }
            // Special case: if at bottom, keep the current state (don't auto-expand)
            // No state change needed for bottom case
            
            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
            console.groupEnd();
        }, 50); // 50ms debounce
    }
    
    // Add scroll listener to the product feed with throttling
    const scrollOptions = { passive: true };
    let lastScrollTime = 0;
    const scrollThrottle = 100; // ms
    
    // Main scroll listener for product feed with throttling

    productFeed.addEventListener('scroll', (e) => {
        const now = Date.now();
        if (now - lastScrollTime >= scrollThrottle) {
            handleScroll();
            lastScrollTime = now;
        }
    }, scrollOptions);
    
    // Also listen to window scroll as fallback with throttling
    window.addEventListener('scroll', (e) => {
        const now = Date.now();
        if (now - lastScrollTime >= scrollThrottle) {
            handleScroll();
            lastScrollTime = now;
        }
    }, scrollOptions);
    

    
    // Initial check
    handleScroll();
    
    // For debugging: Add a button to manually toggle collapse and log state
    const debugButton = document.createElement('button');
    debugButton.textContent = 'Toggle Nav';
    debugButton.style.position = 'fixed';
    debugButton.style.top = '10px';
    debugButton.style.right = '10px';
    debugButton.style.zIndex = '9999';
    debugButton.style.padding = '8px 16px';
    debugButton.style.background = '#333';
    debugButton.style.color = 'white';
    debugButton.style.border = 'none';
    debugButton.style.borderRadius = '4px';
    debugButton.style.cursor = 'pointer';
    debugButton.addEventListener('click', () => {
        navWrapper.classList.toggle('collapsed');
        console.log('Manually toggled nav. Current state:', 
                   navWrapper.classList.contains('collapsed') ? 'collapsed' : 'expanded');
    });
    document.body.appendChild(debugButton);
    
    // Test scroll button removed
    // Navigation handler initialized
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavScroll);
} else {
    initNavScroll();
}
