/**
 * Glass Effects Module
 * Handles glassmorphism effects for UI elements
 */

/**
 * Initialize glass effects on product cards
 */
export function initGlassEffects() {
    console.log('RIVO: Initializing glass effects...');
    
    // Process all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const infoSection = card.querySelector('.product-text-overlay');
        if (!infoSection) return;
        
        // Skip if already initialized
        if (infoSection.querySelector('.glass-overlay')) return;
        
        // Create glass overlay
        const glassOverlay = document.createElement('div');
        glassOverlay.className = 'glass-overlay';
        
        // Move all child nodes into the glass overlay
        while (infoSection.firstChild) {
            glassOverlay.appendChild(infoSection.firstChild);
        }
        
        // Add the glass overlay back to the info section
        infoSection.appendChild(glassOverlay);
    });
    
    console.log(`RIVO: Glass effects applied to ${productCards.length} cards`);
}

// Export public API
export default {
    init: initGlassEffects
};
