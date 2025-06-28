# CSS Migration Tools

This directory contains scripts to assist with migrating from the monolithic `styles.css` to the new modular CSS architecture.

## migrate-styles.js

This script analyzes the original `styles.css` file and helps migrate styles to the new modular structure.

### Features

- Analyzes the existing CSS and categorizes styles by component type
- Generates a detailed migration report
- Creates categorized CSS files with the migrated styles
- Handles media queries and nested rules
- Provides statistics on the migration process

### Usage

1. Make sure you have Node.js installed
2. Install dependencies (if any):
   ```bash
   npm install
   ```
3. Run the migration script:
   ```bash
   node migrate-styles.js
   ```

### Output

The script generates the following files:

- `css/migration/migration-report-{timestamp}.json`: Detailed analysis of the CSS
- `css/migration/migration-tasks.json`: List of migration tasks
- `css/migration/{category}/_index.css`: Categorized CSS files

### Migration Process

1. **Analysis**: The script analyzes the original CSS and categorizes each rule
2. **Categorization**: Styles are grouped into categories (components, layout, utilities, etc.)
3. **Generation**: New CSS files are created in the appropriate directories
4. **Review**: Manually review the generated files and move them to the correct locations

### Categories

- **base**: Global styles, resets, and CSS variables
- **components**: Reusable UI components (buttons, cards, etc.)
- **layout**: Page layout and structural styles
- **pages**: Page-specific styles
- **utilities**: Helper classes and utility styles
- **animations**: Keyframe animations and transitions
- **vendor**: Third-party library overrides

## Best Practices

1. **Review Generated Files**: Always review the generated CSS before using it
2. **Test Thoroughly**: Test the UI after migrating styles
3. **Remove Duplicates**: Check for and remove duplicate styles
4. **Update Selectors**: Ensure selectors match your HTML structure
5. **Document Changes**: Keep track of manual adjustments made during migration

## Troubleshooting

- If styles are missing, check the migration report for uncategorized styles
- For specificity issues, review the generated CSS and adjust selectors as needed
- If media queries aren't working as expected, check the generated media query blocks

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
