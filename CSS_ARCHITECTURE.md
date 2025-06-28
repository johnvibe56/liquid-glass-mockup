# CSS Architecture Documentation

This document outlines the CSS architecture and organization for the Liquid Glass Mockup project. The architecture follows a modular, component-based approach to ensure maintainability, scalability, and consistency.

## Directory Structure

```
css/
├── _print.css            # Print-specific styles
├── main.css              # Main CSS file that imports all other files
├── shame.css             # Temporary styles that need refactoring
│
├── base/                 # Base styles and variables
│   ├── _variables.css    # CSS variables and design tokens
│   └── _base.css         # Reset and base element styles
│
├── components/           # Reusable UI components
│   ├── _buttons.css      # Button styles
│   ├── _cards.css        # Card components
│   ├── _components.css   # General component styles
│   └── _navigation.css   # Navigation components
│
├── layout/              # Layout-related styles
│   ├── _grid.css         # Grid system
│   ├── _header.css       # Header styles
│   └── _layout.css       # General layout styles
│
├── pages/               # Page-specific styles
│   ├── _home.css         # Home page styles
│   └── _pages.css        # General page styles
│
├── utilities/           # Utility classes and helpers
│   ├── animations/       # Animation utilities
│   │   └── _animations.css
│   ├── _helpers.css      # Helper classes
│   └── _utilities.css    # General utility styles
│
└── vendor/              # Third-party styles
    └── _font-awesome.css # Font Awesome overrides
```

## Architecture Principles

1. **Modularity**: Each component is self-contained in its own file.
2. **Reusability**: Components and utilities are designed to be reusable.
3. **Maintainability**: Clear organization and naming conventions.
4. **Performance**: Optimized selectors and minimal redundancy.
5. **Accessibility**: Built with accessibility in mind.

## Naming Conventions

- Use kebab-case for file names and class names
- Prefix component classes with the component name (e.g., `.button-primary`)
- Use BEM (Block Element Modifier) methodology for complex components
- Prefix utility classes with `u-` (e.g., `.u-text-center`)
- Prefix state classes with `is-` or `has-` (e.g., `.is-active`, `.has-error`)

## CSS Variables

All design tokens are defined in `_variables.css` using CSS custom properties. This includes:

- Colors
- Typography
- Spacing
- Breakpoints
- Z-index layers
- Border radius
- Shadows
- Transitions

## Component Structure

Each component should follow this structure:

```css
/* Component Name */
.component-name {
  /* Base styles */
}

/* Modifiers */
.component-name--modifier {
  /* Modified styles */
}

/* Elements */
.component-name__element {
  /* Element styles */
}

/* States */
.component-name.is-state {
  /* State styles */
}

/* Media Queries */
@media (min-width: 768px) {
  .component-name {
    /* Responsive styles */
  }
}
```

## Best Practices

1. **Specificity**: Keep selector specificity low.
2. **Nesting**: Limit nesting to 3 levels deep.
3. **Comments**: Document complex logic or non-obvious code.
4. **Performance**: Avoid universal selectors and complex selectors.
5. **Browser Support**: Use feature queries for progressive enhancement.

## Adding New Styles

1. **New Component**: Create a new file in the appropriate directory.
2. **New Utility**: Add to or create a new file in the utilities directory.
3. **New Page**: Create a new file in the pages directory.

## Build Process

The project uses a simple CSS import system. The `main.css` file imports all other CSS files in the correct order:

1. Base
2. Components
3. Layout
4. Pages
5. Utilities
6. Vendor
7. Print

## Browser Support

- Latest Chrome, Firefox, Safari, and Edge
- IE11+ (with polyfills)
- Mobile Safari and Chrome for iOS/Android

## Performance Considerations

- Minimize use of expensive CSS properties (e.g., `box-shadow`, `border-radius`)
- Use `will-change` for elements that will be animated
- Optimize animations with `transform` and `opacity`
- Use `content-visibility` for off-screen content

## Accessibility

- Ensure proper color contrast
- Use semantic HTML elements
- Include ARIA attributes where necessary
- Test keyboard navigation
- Support reduced motion preferences

## Testing

Test your styles:

1. Across different screen sizes
2. In different browsers
3. With keyboard navigation
4. With screen readers
5. With reduced motion preferences

## Troubleshooting

- Use the browser's dev tools to inspect and debug styles
- Check for specificity issues
- Look for CSS variable overrides
- Verify media query breakpoints

## Resources

- [CSS Guidelines](https://cssguidelin.es/)
- [BEM Methodology](http://getbem.com/)
- [SMACSS](https://smacss.com/)
- [CSS Architecture](https://github.com/jareware/css-architecture)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
