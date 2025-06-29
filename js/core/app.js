/**
 * Core Application Initialization
 * Coordinates the setup of all application features
 */

// Import feature modules
import { initNavigation } from '../features/navigation/index.js';
import { initUI } from '../features/ui/index.js';
import { initScrollHandler } from '../features/ui/scroll.js';
import { initGlassEffects } from '../features/ui/glass.js';
import { initContrastDetection } from '../features/ui/contrast.js';

/**
 * Initialize the application
 */
export function initApp() {
    console.log('RIVO: Initializing application...');
    
    try {
        // Initialize all features
        initUI();
        initNavigation();
        initScrollHandler();
        initGlassEffects();
        initContrastDetection();
        
        // Log successful initialization
        console.log('RIVO: Application initialized');
        
        // Dispatch custom event when app is ready
        document.dispatchEvent(new CustomEvent('app:ready'));
    } catch (error) {
        console.error('RIVO: Error initializing application:', error);
    }
}

// Initialize the app when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Export public API
export default {
    init: initApp
};
