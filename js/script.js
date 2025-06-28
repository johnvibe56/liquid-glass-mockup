import { initContrastDetection } from './contrast-utils.js';

document.addEventListener('DOMContentLoaded', function() {
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    const header = document.querySelector('.page-header');
    const mainContent = document.querySelector('.main-content');
    const navWrapper = document.querySelector('.nav-wrapper');
    let lastScroll = 0;
    let isScrolling = false;
    
    // Add glass effect to product text overlays
    productCards.forEach(card => {
        const infoSection = card.querySelector('.product-text-overlay');
        if (infoSection) {
            // Create a new glass overlay div
            const glassOverlay = document.createElement('div');
            glassOverlay.className = 'glass-overlay';
            
            // Move all child nodes into the glass overlay
            while (infoSection.firstChild) {
                glassOverlay.appendChild(infoSection.firstChild);
            }
            
            // Add the glass overlay back to the info section
            infoSection.appendChild(glassOverlay);
        }
    });
    
    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle scroll effect for header and nav
    function handleScroll() {
        // Get scroll position from window or main content
        const scrollTop = window.scrollY || (mainContent ? mainContent.scrollTop : 0);
        
        // Handle header scroll effect
        if (scrollTop > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Handle nav collapse on scroll down
        if (scrollTop > lastScroll && scrollTop > 100) {
            navWrapper.classList.add('collapsed');
        } else if (scrollTop < lastScroll - 10 || scrollTop <= 50) {
            navWrapper.classList.remove('collapsed');
        }
        
        lastScroll = scrollTop <= 0 ? 0 : scrollTop;
        console.log('Scroll position:', scrollTop, 'Last scroll:', lastScroll, 'Collapsed:', navWrapper.classList.contains('collapsed'));
    }
    
    // Initialize contrast detection for glass elements
    initContrastDetection();
    
    // Add scroll event with debounce
    const handleScrollDebounced = () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    };

    // Add scroll event to both window and main content
    window.addEventListener('scroll', handleScrollDebounced, { passive: true });
    if (mainContent) {
        mainContent.addEventListener('scroll', handleScrollDebounced, { passive: true });
    }
    
    // Initial check in case page is loaded with scroll position
    handleScroll();
    
    // Also handle touch events for mobile
    document.addEventListener('touchmove', handleScrollDebounced, { passive: true });
});
