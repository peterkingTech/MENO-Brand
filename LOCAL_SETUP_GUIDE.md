# Local Development Setup Guide

This guide will help you set up and run the E.O.A Line project on your local machine.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

**Important:** Replace the placeholder values with your actual credentials.

### 3. Clear Cache (If you had previous build issues)

```bash
# Remove node_modules
rm -rf node_modules

# Remove package lock
rm -f package-lock.json

# Remove build artifacts
rm -rf dist
rm -rf node_modules/.vite

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application should now be running at `http://localhost:5173`

## Common Issues and Solutions

### Issue 1: Buttons Not Rendering Correctly

**Symptom:** Caption buttons on hero slides appear as plain text without styling

**Solution:**
1. Make sure Tailwind CSS is processing correctly:
   ```bash
   # Check if PostCSS is configured
   cat postcss.config.js
   ```

2. Ensure `tailwind.config.js` includes all source files:
   ```javascript
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
   ```

3. Clear browser cache:
   - Open DevTools (F12)
   - Right-click refresh button
   - Select "Empty Cache and Hard Reload"

4. Restart dev server:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

### Issue 2: Styles Not Loading

**Solution:**
1. Check that `src/index.css` is imported in `src/main.tsx`
2. Verify fonts are loading from Google Fonts
3. Check browser console for CSS errors

### Issue 3: Build Fails

**Solution:**
```bash
# Update Vite and dependencies
npm update

# Try building again
npm run build
```

### Issue 4: Hot Reload Not Working

**Solution:**
1. Check Vite configuration in `vite.config.ts`
2. Restart the dev server
3. Clear `.vite` cache:
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

## Verify Installation

After setup, verify everything works:

1. **Homepage loads** - Check hero videos display correctly
2. **Navigation works** - Click header links to navigate
3. **Buttons render** - Collection caption buttons should have:
   - Semi-transparent black background
   - White text
   - Golden border
   - Hover effects (darker + slight zoom)
4. **Product grid displays** - Scroll to collections section
5. **Cart functions** - Add items to cart

## Build for Production

```bash
npm run build
```

Build output will be in the `dist` folder.

## Additional Notes

### Tailwind CSS Classes Used

The buttons use these Tailwind classes:
- `bg-black/70` - Semi-transparent black background
- `backdrop-blur-sm` - Blur effect
- `border-amber-400/30` - Golden border with opacity
- `hover:scale-105` - Scale on hover
- `transition-all` - Smooth transitions

If these don't work, Tailwind CSS might not be processing correctly.

### Font Loading

The project uses:
- **Playfair Display** (serif) - For headings
- **Inter** (sans-serif) - For body text

Both load from Google Fonts CDN.

## Getting Help

If you continue to experience issues:

1. Check Node.js version: `node --version` (should be v18+)
2. Check npm version: `npm --version`
3. Verify all files exist in the project
4. Look for errors in browser console
5. Check terminal for build errors

## Performance Tips

For better local development experience:

1. Use Chrome/Firefox (better DevTools)
2. Install React DevTools extension
3. Keep browser cache disabled during development
4. Use fast refresh (enabled by default in Vite)

---

If problems persist, ensure you're using the latest version of the code and all environment variables are correctly set.
