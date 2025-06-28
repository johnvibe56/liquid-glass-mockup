/**
 * Migration Script for CSS Refactoring
 * 
 * This script helps migrate styles from the old monolithic styles.css to the new
 * modular CSS structure. It provides utilities to analyze the old file and
 * generate migration tasks.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const OLD_CSS_PATH = path.join(__dirname, '../css/styles.css');
const OUTPUT_DIR = path.join(__dirname, '../css/migration');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Categories for organizing styles
const CATEGORIES = {
  BASE: 'base',
  COMPONENTS: 'components',
  LAYOUT: 'layout',
  PAGES: 'pages',
  UTILITIES: 'utilities',
  VENDOR: 'vendor',
  THEME: 'theme',
  ANIMATIONS: 'animations',
};

// Mapping of selectors to categories (for auto-categorization)
const SELECTOR_CATEGORIES = {
  // Base
  ':root': CATEGORIES.BASE,
  'body': CATEGORIES.BASE,
  'html': CATEGORIES.BASE,
  '*, *::before, *::after': CATEGORIES.BASE,
  
  // Components
  '.button': CATEGORIES.COMPONENTS,
  '.card': CATEGORIES.COMPONENTS,
  '.modal': CATEGORIES.COMPONENTS,
  '.nav': CATEGORIES.COMPONENTS,
  
  // Layout
  '.container': CATEGORIES.LAYOUT,
  '.grid': CATEGORIES.LAYOUT,
  '.header': CATEGORIES.LAYOUT,
  '.footer': CATEGORIES.LAYOUT,
  '.main': CATEGORIES.LAYOUT,
  '.sidebar': CATEGORIES.LAYOUT,
  
  // Pages
  '.home': CATEGORIES.PAGES,
  '.profile': CATEGORIES.PAGES,
  
  // Utilities
  '.text-': CATEGORIES.UTILITIES,
  '.bg-': CATEGORIES.UTILITIES,
  '.m-': CATEGORIES.UTILITIES,
  '.p-': CATEGORIES.UTILITIES,
  '.flex': CATEGORIES.UTILITIES,
  '.grid': CATEGORIES.UTILITIES,
  
  // Animations
  '@keyframes': CATEGORIES.ANIMATIONS,
  '.animate-': CATEGORIES.ANIMATIONS,
  
  // Vendor
  '.fa-': CATEGORIES.VENDOR,
  '.swiper': CATEGORIES.VENDOR,
};

/**
 * Analyzes the CSS file and generates a migration report
 */
async function analyzeCSS() {
  const fileStream = fs.createReadStream(OLD_CSS_PATH);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  let currentSelector = '';
  let currentRules = [];
  const styles = [];
  let inMediaQuery = false;
  let currentMediaQuery = '';
  
  for await (const line of rl) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('/*')) {
      continue;
    }
    
    // Handle media queries
    if (trimmedLine.startsWith('@media')) {
      inMediaQuery = true;
      currentMediaQuery = trimmedLine;
      continue;
    }
    
    // End of media query
    if (inMediaQuery && trimmedLine === '}') {
      inMediaQuery = false;
      currentMediaQuery = '';
      continue;
    }
    
    // Start of a new rule
    if (trimmedLine.endsWith('{') && !inMediaQuery) {
      // Save previous rule if exists
      if (currentSelector) {
        styles.push({
          selector: currentSelector,
          rules: currentRules,
          mediaQuery: null
        });
      }
      
      currentSelector = trimmedLine.slice(0, -1).trim();
      currentRules = [];
      continue;
    }
    
    // Start of a rule inside media query
    if (trimmedLine.endsWith('{') && inMediaQuery) {
      currentSelector = trimmedLine.slice(0, -1).trim();
      currentRules = [];
      continue;
    }
    
    // End of a rule
    if (trimmedLine === '}') {
      if (currentSelector) {
        styles.push({
          selector: currentSelector,
          rules: currentRules,
          mediaQuery: inMediaQuery ? currentMediaQuery : null
        });
        currentSelector = '';
        currentRules = [];
      }
      continue;
    }
    
    // Add rule to current selector
    if (currentSelector) {
      currentRules.push(trimmedLine);
    }
  }
  
  // Categorize styles
  const categorizedStyles = styles.map(style => {
    // Try to auto-categorize
    let category = null;
    for (const [pattern, cat] of Object.entries(SELECTOR_CATEGORIES)) {
      if (style.selector.includes(pattern)) {
        category = cat;
        break;
      }
    }
    
    // Default to components if not categorized
    if (!category) {
      // Check for common patterns
      if (style.selector.startsWith('.')) {
        category = CATEGORIES.COMPONENTS;
      } else if (style.selector.startsWith('@keyframes')) {
        category = CATEGORIES.ANIMATIONS;
      } else {
        category = CATEGORIES.UTILITIES;
      }
    }
    
    return {
      ...style,
      category
    };
  });
  
  // Group by category
  const categories = {};
  categorizedStyles.forEach(style => {
    if (!categories[style.category]) {
      categories[style.category] = [];
    }
    categories[style.category].push(style);
  });
  
  // Generate migration report
  const report = {
    totalStyles: styles.length,
    categorizedStyles: Object.entries(categories).map(([category, items]) => ({
      category,
      count: items.length,
      percentage: ((items.length / styles.length) * 100).toFixed(1) + '%',
      file: `${category}.css`
    })),
    uncategorized: styles.filter(s => !s.category).length,
    sampleStyles: {}
  };
  
  // Add samples
  Object.keys(categories).forEach(category => {
    report.sampleStyles[category] = categories[category].slice(0, 3);
  });
  
  // Save analysis
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(OUTPUT_DIR, `migration-report-${timestamp}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Generate migration tasks
  const tasks = [];
  
  Object.entries(categories).forEach(([category, styles]) => {
    const categoryDir = path.join(OUTPUT_DIR, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    const outputFile = path.join(categoryDir, '_index.css');
    let content = `/* ${category.toUpperCase()} STYLES */\n\n`;
    
    // Group by media query
    const mediaQueries = {};
    const baseStyles = [];
    
    styles.forEach(style => {
      if (style.mediaQuery) {
        if (!mediaQueries[style.mediaQuery]) {
          mediaQueries[style.mediaQuery] = [];
        }
        mediaQueries[style.mediaQuery].push(style);
      } else {
        baseStyles.push(style);
      }
    });
    
    // Add base styles
    baseStyles.forEach(style => {
      content += `${style.selector} {\n`;
      content += `  ${style.rules.join('\n  ')}\n`;
      content += `}\n\n`;
    });
    
    // Add media queries
    Object.entries(mediaQueries).forEach(([query, queryStyles]) => {
      content += `\n${query} {\n`;
      
      queryStyles.forEach(style => {
        content += `  ${style.selector} {\n`;
        content += `    ${style.rules.join('\n    ')}\n`;
        content += `  }\n`;
      });
      
      content += `}\n\n`;
    });
    
    fs.writeFileSync(outputFile, content);
    
    tasks.push({
      category,
      file: outputFile,
      styles: styles.length,
      mediaQueries: Object.keys(mediaQueries).length
    });
  });
  
  // Save tasks
  const tasksPath = path.join(OUTPUT_DIR, 'migration-tasks.json');
  fs.writeFileSync(tasksPath, JSON.stringify(tasks, null, 2));
  
  console.log('Migration analysis complete!');
  console.log(`- ${styles.length} total styles analyzed`);
  console.log(`- ${Object.keys(categories).length} categories identified`);
  console.log(`- Report saved to: ${reportPath}`);
  console.log(`- Migration tasks saved to: ${tasksPath}`);
  
  return {
    reportPath,
    tasksPath
  };
}

// Run the analysis
analyzeCSS().catch(console.error);
