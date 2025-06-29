/**
 * Navigation Module
 * Handles all navigation-related functionality
 */

import { loadNavigation } from './loader.js';

/**
 * Initialize navigation features
 */
export function initNavigation() {
    console.log('RIVO: Initializing navigation...');
    
    // Load navigation partial
    loadNavigation()
        .then(() => {
            console.log('RIVO: Navigation loaded');
        })
        .catch(error => {
            console.error('RIVO: Failed to load navigation:', error);
        });
}

// Export public API
export default {
    init: initNavigation
};
