# Liquid Glass Mockup

A modern, responsive e-commerce UI with a glassmorphism design.

## Features

- Responsive product grid
- Collapsible bottom navigation
- Glassmorphism UI elements
- Smooth animations and transitions

## Project Structure

```
.
├── css/
│   ├── components/     # Component-specific styles
│   ├── layout/         # Layout styles
│   └── utilities/      # Helper classes and mixins
├── js/
│   ├── script.js      # Main application logic
│   └── scroll-handler.js # Navigation scroll behavior
├── images/             # Product and UI images
├── index.html          # Main HTML file
└── netlify.toml        # Deployment configuration
```

## Deployment Instructions

### Option 1: Netlify (Recommended)

1. **Prerequisites**:
   - Netlify account
   - Git installed locally

2. **Deploy using Netlify CLI**:
   ```bash
   # Install Netlify CLI if you haven't
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy the site
   netlify deploy --prod
   ```

3. **Deploy using Netlify Web UI**:
   - Go to [Netlify](https://app.netlify.com/)
   - Drag and drop the project folder to the Netlify dashboard
   - Follow the prompts to complete deployment

### Option 2: Vercel

1. **Prerequisites**:
   - Vercel account
   - Vercel CLI installed (`npm i -g vercel`)

2. **Deploy**:
   ```bash
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   ```

### Option 3: GitHub Pages

1. Push your code to a GitHub repository
2. Go to Repository Settings > Pages
3. Select the main branch and click Save

## Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd liquid-glass-mockup
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python's built-in server
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## Image Optimization

For optimal performance, ensure all images are optimized for web:

```bash
# Install ImageMagick (macOS)
brew install imagemagick

# Run optimization script
chmod +x optimize-images.sh
./optimize-images.sh
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- Vanilla JavaScript (no frameworks)
- CSS3 (with CSS Variables)
- HTML5

## License

MIT
