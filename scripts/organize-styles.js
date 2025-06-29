/**
 * Organize Migrated CSS Script
 * 
 * This script helps organize the migrated CSS files into the modular structure.
 * It moves styles from the migration directory to their appropriate locations
 * in the main CSS modules.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

// Promisify file system functions
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Paths
const MIGRATION_DIR = path.join(__dirname, '../css/migration');
const CSS_DIR = path.join(__dirname, '../css');

// Mapping of migration categories to target directories
const TARGET_DIRS = {
  base: 'base',
  components: 'components',
  layout: 'layout',
  utilities: 'utilities',
  animations: 'utilities/animations',
  vendor: 'vendor',
  pages: 'pages'
};

/**
 * Process a single CSS file and move it to the appropriate location
 */
async function processCategory(category) {
  try {
    const sourceFile = path.join(MIGRATION_DIR, category, '_index.css');
    const targetDir = path.join(CSS_DIR, TARGET_DIRS[category] || category);
    const targetFile = path.join(targetDir, `_${category}.css`);
    
    // Skip if source file doesn't exist
    if (!fs.existsSync(sourceFile)) {
      console.log(`Skipping ${category}: Source file not found`);
      return;
    }
    
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`Created directory: ${targetDir}`);
    }
    
    // Read the source file
    const content = await readFile(sourceFile, 'utf8');
    
    // Process content if needed (e.g., update paths, fix imports)
    let processedContent = content;
    
    // Special handling for specific categories
    if (category === 'base') {
      // Merge with existing _variables.css if it exists
      const variablesFile = path.join(CSS_DIR, 'base', '_variables.css');
      if (fs.existsSync(variablesFile)) {
        const variablesContent = await readFile(variablesFile, 'utf8');
        processedContent = `/* Base Styles */\n\n${variablesContent}\n\n${content.substring(content.indexOf('body'))}`;
      }
    }
    
    // Write to target file
    await writeFile(targetFile, processedContent, 'utf8');
    console.log(`✓ Moved ${category} styles to ${targetFile}`);
    
    // Update main.css imports if needed
    await updateMainCssImports();
    
  } catch (error) {
    console.error(`Error processing ${category}:`, error);
  }
}

/**
 * Update main.css to import all the modular CSS files
 */
async function updateMainCssImports() {
  const mainCssPath = path.join(CSS_DIR, 'main.css');
  let imports = [];
  
  // Define the order of imports
  const importOrder = [
    'base/variables',
    'base/base',
    'components/buttons',
    'components/cards',
    'components/navigation',
    'layout/grid',
    'layout/header',
    'utilities/animations',
    'utilities/helpers',
    'vendor/font-awesome',
    'pages/home',
    'shame'
  ];
  
  // Generate import statements
  imports = importOrder.map(impPath => {
    const fullPath = path.join(CSS_DIR, `${impPath}.css`);
    if (fs.existsSync(fullPath)) {
      return `@import '${impPath}.css';`;
    }
    return `/* Missing: ${impPath}.css */`;
  });
  
  // Add a header
  const header = [
    '/**',
    ' * Main CSS File',
    ' *',
    ' * This file imports all other CSS files in the correct order.',
    ' * Do not write styles directly in this file.',
    ' */',
    ''
  ];
  
  const content = [...header, ...imports, ''].join('\n');
  
  // Write to main.css
  await writeFile(mainCssPath, content, 'utf8');
  console.log('✓ Updated main.css with imports');
}

/**
 * Main function
 */
async function main() {
  console.log('Organizing migrated CSS files...\n');
  
  // Process each category
  const categories = Object.keys(TARGET_DIRS);
  for (const category of categories) {
    await processCategory(category);
  }
  
  console.log('\n✓ CSS organization complete!');
  console.log('\nNext steps:');
  console.log('1. Review the organized CSS files');
  console.log('2. Test the application to ensure all styles are applied correctly');
  console.log('3. Remove the old styles.css file once confirmed everything works');
  console.log('4. Run `npm run lint:css` to check for any issues');
}

// Run the script
main().catch(console.error);
