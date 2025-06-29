/**
 * UI Module
 * Coordinates all UI-related functionality
 */

import { initGlassEffects } from './glass.js';
import { initScrollHandler } from './scroll.js';
import { initContrast } from './contrast.js';

/**
 * Initialize all UI features
 */
export function initUI() {
    console.log('RIVO: Initializing UI...');
    
    // Initialize UI components
    initGlassEffects();
    initScrollHandler();
    initContrast();
    
    console.log('RIVO: UI initialized');
}

// Export public API
export default {
    init: initUI
};
