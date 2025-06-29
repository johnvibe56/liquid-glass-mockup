/**
 * Contrast Utils Module
 * Handles contrast detection and adjustments for better accessibility
 */

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First color in hex or rgb
 * @param {string} color2 - Second color in hex or rgb
 * @returns {number} Contrast ratio
 */
function getContrastRatio(color1, color2) {
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Calculate relative luminance of a color
 * @param {string} color - Color in hex or rgb
 * @returns {number} Luminance value between 0 and 1
 */
function getLuminance(color) {
    // Convert hex to RGB if needed
    let r, g, b;
    
    if (color.startsWith('#')) {
        const hex = color.replace('#', '');
        r = parseInt(hex.substring(0, 2), 16) / 255;
        g = parseInt(hex.substring(2, 4), 16) / 255;
        b = parseInt(hex.substring(4, 6), 16) / 255;
    } else if (color.startsWith('rgb')) {
        const rgb = color.match(/\d+/g);
        r = parseInt(rgb[0]) / 255;
        g = parseInt(rgb[1]) / 255;
        b = parseInt(rgb[2]) / 255;
    } else {
        return 0.5; // Default for unknown colors
    }
    
    // Convert to linear RGB
    const gamma = 2.2;
    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, gamma);
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, gamma);
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, gamma);
    
    // Calculate relative luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Initialize contrast detection for glass elements
 */
export function initContrast() {
    console.log('RIVO: Initializing contrast detection...');
    
    // Check contrast on all glass elements
    const glassElements = document.querySelectorAll('.glass-overlay, .glass-card');
    
    glassElements.forEach(element => {
        checkElementContrast(element);
    });
    
    // Set up mutation observer to check new elements
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element node
                    if (node.matches('.glass-overlay, .glass-card')) {
                        checkElementContrast(node);
                    }
                    node.querySelectorAll('.glass-overlay, .glass-card').forEach(checkElementContrast);
                }
            });
        });
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
    
    console.log(`RIVO: Contrast detection initialized for ${glassElements.length} elements`);
}

/**
 * Check and adjust contrast for a single element
 * @param {HTMLElement} element - The element to check
 */
function checkElementContrast(element) {
    if (!element) return;
    
    // Get computed styles
    const styles = window.getComputedStyle(element);
    const bgColor = styles.backgroundColor;
    
    // Get text color (either direct or from children)
    const textElement = element.querySelector('p, h1, h2, h3, h4, h5, h6, span, a') || element;
    const textColor = window.getComputedStyle(textElement).color;
    
    // Calculate contrast ratio
    const contrastRatio = getContrastRatio(bgColor, textColor);
    
    // Adjust if contrast is too low (WCAG AA requires at least 4.5:1 for normal text)
    if (contrastRatio < 4.5) {
        element.classList.add('low-contrast');
        
        // Add a subtle outline or shadow to improve readability
        element.style.textShadow = '0 0 2px rgba(0,0,0,0.5)';
        
        // Or adjust the background opacity
        if (element.classList.contains('glass-overlay')) {
            element.style.backdropFilter = 'blur(10px) brightness(0.7)';
        }
    }
}

// Export public API
export default {
    init: initContrast,
    getContrastRatio,
    getLuminance
};
