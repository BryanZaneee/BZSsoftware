# Deployment Guide for BZS Software Website

## 🚀 Vercel Deployment

This is a static HTML/CSS/JavaScript website that deploys seamlessly to Vercel.

### Deployment Configuration

The website is configured for Vercel deployment with:
- **Build Command**: None required (static site)
- **Output Directory**: `.` (root directory)
- **Install Command**: `npm install`

### Files Required for Deployment

- `index.html` - Main HTML file
- `styles.css` - Stylesheet
- `script.js` - JavaScript functionality
- `package.json` - NPM configuration
- `vercel.json` - Vercel deployment configuration

### How to Deploy

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update website"
   git push origin main
   ```

2. **Vercel Auto-Deploy**
   - Vercel will automatically detect the push
   - Build process will run (no build step needed)
   - Site will be live in seconds!

### Vercel Configuration (`vercel.json`)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "."
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

This configuration tells Vercel:
- ✅ This is a static site (no build required)
- ✅ Serve files from the root directory
- ✅ Route all requests to their corresponding files

### Troubleshooting

**Issue**: "vite: command not found"
- **Solution**: This is resolved! The `package.json` now includes a dummy build script that doesn't require Vite.

**Issue**: Build cache warnings
- **Solution**: These are harmless warnings about package manager changes. Vercel will rebuild from scratch.

**Issue**: Deprecated package warnings
- **Solution**: These are warnings from `live-server` dependencies. They don't affect the deployed site since we only use `live-server` for local development.

### Local Development

Run locally with:
```bash
npm start
```

This starts a local server at `http://localhost:3000`

### Production URL

Once deployed, your site will be available at:
- Production: `https://bzssoftware.vercel.app` (or your custom domain)
- Preview: Unique URL for each commit

### Environment Variables

No environment variables are required for the static site to function. The Formspree integration works client-side with the form ID embedded in the HTML.

---

**Need Help?** Check the Vercel documentation: https://vercel.com/docs

