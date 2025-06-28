// Navbar scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const navWrapper = document.querySelector('.nav-wrapper');
    const bottomNav = document.querySelector('.bottom-nav-container');
    const navItems = document.querySelectorAll('.nav-item');
    const homeButton = document.querySelector('.nav-item[aria-label="Home"]');
    const searchButton = document.querySelector('.search-button');
    const productFeed = document.querySelector('.product-feed');
    
    // Function to expand the navbar with smooth animation
    function expandNavbar() {
        if (navWrapper.classList.contains('scrolled')) {
            // Force a reflow to ensure the browser recognizes the initial state
            void bottomNav.offsetHeight;
            
            // Remove the collapsed class to trigger the expand animation
            bottomNav.classList.remove('collapsed');
            
            // Add a temporary class for the expand animation
            bottomNav.classList.add('expanding');
            
            // Remove the scrolled class after a short delay to allow the animation to complete
            setTimeout(() => {
                navWrapper.classList.remove('scrolled');
                isScrolled = false;
                // Reset scroll tracking variables
                lastScrollTop = productFeed.scrollTop || document.documentElement.scrollTop;
                lastScrollY = lastScrollTop;
                
                // Remove the expanding class after the animation completes
                setTimeout(() => {
                    bottomNav.classList.remove('expanding');
                }, 300);
            }, 50);
        }
    }

    if (!productFeed) return;

    let lastScrollTop = 0;
    let ticking = false;
    const SCROLL_THRESHOLD = 20; // Pixels to scroll before collapsing
    const SCROLL_DEADZONE = 5;   // Minimum scroll delta to trigger update
    
    // Track scroll direction
    let lastScrollY = 0;
    let isScrolled = false;

    function handleScroll() {
        const scrollTop = productFeed.scrollTop || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollY ? 'down' : 'up';
        
        // Only update if scroll position changed significantly
        if (Math.abs(scrollTop - lastScrollTop) < SCROLL_DEADZONE) {
            ticking = false;
            return;
        }
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // When scrolling down past threshold and not already scrolled
                if (scrollTop > SCROLL_THRESHOLD && !isScrolled && scrollDirection === 'down') {
                    navWrapper.classList.add('scrolled');
                    bottomNav.classList.add('collapsed');
                    isScrolled = true;
                } 
                // When scrolling up and we're scrolled past threshold
                else if (scrollDirection === 'up' && isScrolled) {
                    // Only show full nav if we're close to top or scrolling up significantly
                    if (scrollTop <= SCROLL_THRESHOLD || (lastScrollTop - scrollTop) > SCROLL_DEADZONE * 2) {
                        navWrapper.classList.remove('scrolled');
                        bottomNav.classList.remove('collapsed');
                        isScrolled = false;
                    }
                }
                
                lastScrollY = lastScrollTop;
                lastScrollTop = scrollTop;
                ticking = false;
            });
            
            ticking = true;
        }
    }


    // Add click handler to home button
    if (homeButton) {
        homeButton.addEventListener('click', (e) => {
            // Only handle if navbar is currently collapsed
            if (navWrapper.classList.contains('scrolled')) {
                e.preventDefault(); // Prevent default link behavior
                e.stopPropagation(); // Stop event bubbling
                expandNavbar();
            }
        });
    }

    // Use passive event listener for better performance
    const scrollOptions = { passive: true };
    productFeed.addEventListener('scroll', handleScroll, scrollOptions);

    // Initial check
    handleScroll();
});
