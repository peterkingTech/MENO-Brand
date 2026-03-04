# Button Rendering Fix Guide

## Problem
When you download this project and run it locally in VS Code, the hero caption buttons may not render correctly - they might appear as plain text without styling.

## Why This Happens
This is a **Tailwind CSS + Vite build cache issue**. The styles are correct in the code, but your local environment needs proper setup to process the Tailwind classes.

## The Solution (Choose One)

### Option 1: Automated Fix (Recommended)

**For Mac/Linux:**
```bash
./fix-local-setup.sh
```

**For Windows:**
```cmd
fix-local-setup.bat
```

Then:
```bash
npm run dev
```

### Option 2: Manual Fix

**Step-by-step:**

1. **Stop the dev server** (if running): `Ctrl+C`

2. **Complete clean:**
   ```bash
   # Delete everything
   rm -rf node_modules
   rm -rf dist
   rm -rf node_modules/.vite
   rm package-lock.json

   # Clear npm cache
   npm cache clean --force
   ```

   **Windows equivalent:**
   ```cmd
   rmdir /s /q node_modules
   rmdir /s /q dist
   del package-lock.json
   npm cache clean --force
   ```

3. **Fresh install:**
   ```bash
   npm install
   ```

4. **Start dev server:**
   ```bash
   npm run dev
   ```

5. **Clear browser cache:**
   - Open browser to `http://localhost:5173`
   - Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or use Incognito/Private window

## How to Verify It's Fixed

### ✅ Buttons Should Look Like This:

```
Hero Section:
┌──────────────────────────────────────┐
│                                      │
│     [Video or Image Background]      │
│                                      │
│     ┌─────────────────────┐         │
│     │ TUMI COLLECTION     │ ← Button│
│     └─────────────────────┘         │
│                                      │
└──────────────────────────────────────┘
```

**Button appearance:**
- Semi-transparent black background
- White text
- Subtle golden/amber border
- Slight blur effect (backdrop-blur)
- Hover: darker background + slight scale up

### ❌ If Still Broken:

Buttons might look like:
- Plain white text on video/image
- No background box
- No border
- No hover effect

## Advanced Troubleshooting

### Check 1: Verify Tailwind is Processing

```bash
# Should see CSS being generated
npm run build

# Look for this in output:
# dist/assets/index-[hash].css
```

### Check 2: Inspect Element in Browser

1. Open DevTools (F12)
2. Click Elements tab
3. Find a button element
4. Check computed styles

**Should see:**
```css
background-color: rgba(0, 0, 0, 0.7);
backdrop-filter: blur(4px);
border: 1px solid rgba(251, 191, 36, 0.3);
```

**If you see:**
```css
background-color: transparent; /* ❌ WRONG */
```

→ Tailwind not processing correctly

### Check 3: Verify Config Files

**tailwind.config.js:**
```javascript
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // ✅ Must include src/**
  // ...
}
```

**postcss.config.js:**
```javascript
export default {
  plugins: {
    tailwindcss: {}, // ✅ Must be here
    autoprefixer: {},
  },
};
```

**src/main.tsx:**
```typescript
import './index.css'; // ✅ Must import CSS
```

**src/index.css:**
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display...'); // ✅ Fonts first

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Check 4: Node and npm Versions

```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

If outdated:
- Update Node.js from https://nodejs.org
- npm will update automatically with Node

## Still Not Working?

### Nuclear Option (Complete Reset)

```bash
# 1. Delete EVERYTHING
rm -rf node_modules
rm -rf dist
rm -rf node_modules/.vite
rm package-lock.json
rm -rf ~/.npm  # Clear global npm cache

# 2. Reinstall Node packages
npm install

# 3. Verify installations
npm list tailwindcss
npm list vite
npm list @vitejs/plugin-react

# 4. Build once
npm run build

# 5. Start dev
npm run dev

# 6. Browser
# - Open in Incognito
# - Hard refresh
```

## Environment Variables

Don't forget to create `.env`:

```env
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
VITE_STRIPE_PUBLIC_KEY=your_stripe_key_here
```

## What Changed vs. Original

The buttons were updated from `<div>` to `<button>` elements with proper styling:

**Before (Plain div):**
```jsx
<div className="caption">COLLECTION</div>
```

**After (Styled button):**
```jsx
<button
  onClick={handleClick}
  className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2
             bg-black/70 backdrop-blur-sm text-white px-6 md:px-8 py-3 md:py-4
             rounded-lg border border-amber-400/30 cursor-pointer
             hover:bg-black/80 hover:scale-105 transition-all duration-300 shadow-xl"
>
  <h2>COLLECTION NAME</h2>
</button>
```

## Key Tailwind Classes Explained

- `bg-black/70` → Black background at 70% opacity
- `backdrop-blur-sm` → Blur effect behind button
- `border-amber-400/30` → Golden border at 30% opacity
- `hover:scale-105` → Grow 5% on hover
- `transition-all` → Smooth animation for all properties
- `shadow-xl` → Large drop shadow

---

## If Nothing Works

1. Try downloading the project again
2. Ensure you have latest Git LFS files (for images/videos)
3. Check antivirus isn't blocking npm installs
4. Try different browser
5. Check VS Code isn't interfering with file system

**Last resort:** Clone in a completely different directory and start fresh.

---

**Contact:** If you still have issues, check the browser console (F12) and terminal for specific error messages.
