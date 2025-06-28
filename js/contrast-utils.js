/**
 * Utility functions for handling contrast and color adjustments
 */

/**
 * Get the brightness and saturation values of a color
 * @param {string} color - CSS color value (hex, rgb, rgba, etc.)
 * @returns {{brightness: number, saturation: number, r: number, g: number, b: number}} Object containing brightness and saturation values
 */
function getColorInfo(color) {
    // Create a temporary div to compute the color
    const div = document.createElement('div');
    div.style.color = color;
    div.style.display = 'none';
    document.body.appendChild(div);
    
    // Get computed color
    const computedColor = window.getComputedStyle(div).color;
    document.body.removeChild(div);
    
    // Extract RGB values
    const rgb = computedColor.match(/\d+/g);
    if (!rgb || rgb.length < 3) return { 
        brightness: 128, 
        saturation: 0,
        r: 128, g: 128, b: 128
    };
    
    const [r, g, b] = rgb.map(Number);
    
    // Calculate brightness using the formula: (R*299 + G*587 + B*114) / 1000
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Calculate saturation (0-1)
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    const saturation = max === 0 ? 0 : (max - min) / max;
    
    return { brightness, saturation, r, g, b };
}

/**
 * Get the dominant color from an element's background, including images
 * @param {HTMLElement} element - The element to analyze
 * @returns {Promise<string>} Promise that resolves with the dominant color
 */
async function getBackgroundColor(element) {
    return new Promise((resolve) => {
        // First try to get the background image
        const bgImage = getComputedStyle(element).backgroundImage;
        
        if (bgImage && bgImage !== 'none') {
            // If there's a background image, create a canvas to analyze it
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            
            // Extract URL from background-image CSS
            const urlMatch = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
            if (urlMatch && urlMatch[1]) {
                img.src = urlMatch[1];
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Set canvas size to match image
                    canvas.width = img.width;
                    canvas.height = img.height;
                    
                    // Draw image on canvas
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    
                    try {
                        // Sample color from center of image
                        const pixelData = ctx.getImageData(
                            Math.floor(img.width / 2),
                            Math.floor(img.height / 2),
                            1, 1
                        ).data;
                        
                        // Convert to RGB string
                        const bgColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
                        resolve(bgColor);
                        return;
                    } catch (e) {
                        console.warn('Failed to analyze image:', e);
                    }
                    
                    // Fall through to solid color detection if image analysis fails
                    resolveSolidColor(element, resolve);
                };
                img.onerror = () => resolveSolidColor(element, resolve);
                return;
            }
        }
        
        // If no image or image loading failed, use solid color detection
        resolveSolidColor(element, resolve);
    });
}

/**
 * Resolve background color for solid color backgrounds
 * @param {HTMLElement} element - The element to analyze
 * @param {Function} resolve - Promise resolve callback
 */
function resolveSolidColor(element, resolve) {
    let bgColor = getComputedStyle(element).backgroundColor;
    
    // If the background is transparent, check parent elements
    if (!bgColor || bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
        let parent = element.parentElement;
        while (parent && (!bgColor || bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)')) {
            bgColor = getComputedStyle(parent).backgroundColor;
            parent = parent.parentElement;
        }
    }
    
    // If we still don't have a color, use a default
    if (!bgColor || bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
        bgColor = 'rgb(245, 245, 245)'; // Default to off-white
    }
    
    resolve(bgColor);
}

/**
 * Get the optimal text color class based on background color analysis
 * @param {string} bgColor - Background color to analyze
 * @returns {string} CSS class to apply ('light-bg' or 'dark-bg')
 */
function getOptimalTextColor(bgColor) {
    const { brightness, saturation, r, g, b } = getColorInfo(bgColor);
    
    // Only use dark text on very bright backgrounds
    if (brightness > 200) {
        // For very bright backgrounds (close to white), use dark text
        return 'light-bg';
    }
    
    // For all other cases, use light text for better contrast
    return 'dark-bg';
    
    // Note: Removed the medium brightness logic to simplify and ensure
    // dark text only appears on very bright backgrounds
}

/**
 * Update the contrast of glass elements based on background
 * @param {string} selector - CSS selector for glass elements
 */
async function updateContrast(selector) {
    const elements = document.querySelectorAll(selector);
    
    for (const element of elements) {
        const bgColor = await getBackgroundColor(element);
        const colorClass = getOptimalTextColor(bgColor);
        const oppositeClass = colorClass === 'light-bg' ? 'dark-bg' : 'light-bg';
        
        // Only update if the class needs to change
        if (!element.classList.contains(colorClass) || element.classList.contains(oppositeClass)) {
            element.classList.remove(oppositeClass);
            element.classList.add(colorClass);
        }
    }
}

/**
 * Initialize contrast detection for glass elements
 * @param {Object} options - Configuration options
 * @param {string} [options.selector='.glass, .nav-wrapper, .bottom-nav-container, .new-post-button'] - CSS selector for glass elements
 * @param {number} [options.throttle=100] - Throttle time in ms for scroll/resize events
 */
function initContrastDetection(options = {}) {
    const config = {
        selector: '.glass, .nav-wrapper, .bottom-nav-container, .new-post-button, .nav-item',
        throttle: 100,
        ...options
    };
    
    // Throttle function to limit how often we update
    let isUpdating = false;
    const throttledUpdate = () => {
        if (isUpdating) return;
        isUpdating = true;
        
        setTimeout(() => {
            updateContrast(config.selector);
            isUpdating = false;
        }, config.throttle);
    };
    
    // Initial update
    updateContrast(config.selector);
    
    // Update on scroll and resize
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    window.addEventListener('resize', throttledUpdate, { passive: true });
    
    // Also update when the content changes
    const observer = new MutationObserver(throttledUpdate);
    observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });
    
    // Return cleanup function
    return () => {
        window.removeEventListener('scroll', throttledUpdate);
        window.removeEventListener('resize', throttledUpdate);
        observer.disconnect();
    };
}

export { initContrastDetection };
