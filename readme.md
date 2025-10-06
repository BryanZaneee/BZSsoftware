# BZS Software Website

A bold, striking website design for a software development business, featuring large typography, clean layouts, and modern interactions.

## Features

- **Bold Typography**: Large, impactful text that commands attention
- **Clean Layout**: Minimalist design with strategic use of whitespace
- **Smooth Animations**: Subtle scroll effects and hover interactions
- **Responsive Design**: Fully responsive across all devices
- **Modern Tech Stack**: Pure HTML, CSS, and JavaScript - no framework dependencies

## Design Philosophy

This website embodies a design philosophy centered on:
- Bold, confident typography
- Strategic color blocking
- Generous whitespace
- Smooth, purposeful animations
- Clean, semantic HTML structure

## Getting Started

### Prerequisites

- A modern web browser
- (Optional) Node.js for running a local development server

### Installation

1. Clone or download this repository
2. Open `index.html` in your browser, or
3. Run a local development server:

```bash
# Using npx (no installation required)
npx live-server --port=3000

# Or install live-server globally
npm install -g live-server
live-server --port=3000
```

## Project Structure

```
bzssoftware_v2/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactive features and animations
├── package.json        # Project dependencies
└── README.md          # This file
```

## Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --color-bg-light: #f5f5f0;
    --color-bg-dark: #2d4a4a;
    --color-text-dark: #1a1a1a;
    --color-text-light: #ffffff;
    --color-accent: #8bc34a;
}
```

### Typography

The site uses the Inter font family from Google Fonts. You can change this in the `<head>` of `index.html` and update the CSS variable.

### Content

All content is in `index.html`. Simply update the text, images, and links as needed.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Minimal dependencies
- Optimized CSS animations
- Lazy-loaded images (via Intersection Observer)
- Smooth scroll behavior

## License

MIT License - feel free to use this design for your own projects!

## Credits

Design inspired by bold, modern web design trends. Built with care by BZS Software.

