/**
 * RIVO Web App - Main Entry Point
 * Loads and initializes all core functionality
 */

// Import core modules
import { initApp } from './core/app.js';

// Initialize the application when the DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
