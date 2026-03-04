# Quick Start Guide

## For Unix/Mac/Linux Users

Run the automated setup script:
```bash
./fix-local-setup.sh
```

Or manually:
```bash
# 1. Clean and reinstall
rm -rf node_modules package-lock.json dist node_modules/.vite
npm cache clean --force
npm install

# 2. Create .env file (if you haven't)
# Add your credentials to .env file

# 3. Start dev server
npm run dev
```

## For Windows Users

Run the automated setup script:
```cmd
fix-local-setup.bat
```

Or manually in Command Prompt:
```cmd
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
npm run dev
```

## Must-Have in .env File

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLIC_KEY=pk_test_your-key
```

## After Running Dev Server

1. Open browser to `http://localhost:5173`
2. **Hard refresh**: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
3. Check browser console (F12) for any errors

## Button Rendering Issue - Final Checklist

If buttons still don't show correctly:

✅ **Check 1: Dependencies installed**
```bash
ls node_modules/tailwindcss  # Should exist
```

✅ **Check 2: Dev server running without errors**
- Look at terminal output
- Should say "ready in XXXms"

✅ **Check 3: Browser cache cleared**
- Open DevTools (F12)
- Right-click refresh button → "Empty Cache and Hard Reload"
- Or try Incognito/Private window

✅ **Check 4: CSS is loading**
- Open DevTools → Network tab
- Refresh page
- Look for `index.css` (should load successfully)

✅ **Check 5: Tailwind classes working**
- Open DevTools → Elements tab
- Inspect a button
- Check if classes like `bg-black/70`, `backdrop-blur-sm` are applied

## The Button Should Look Like:

```
┌─────────────────────────┐
│  TUMI COLLECTION        │  ← White text
│  (Semi-transparent       │  ← Black background with blur
│   golden bordered box)   │  ← Amber/golden border
└─────────────────────────┘
    ↑ Hover: scales up slightly
```

## Still Having Issues?

Run these diagnostic commands:

```bash
# Check Node version (should be 18+)
node --version

# Check npm version
npm --version

# Check if Vite is installed
npm list vite

# Check if Tailwind is installed
npm list tailwindcss

# Verify project structure
ls src/components/Hero.tsx  # Should exist
ls src/index.css            # Should exist
ls tailwind.config.js       # Should exist
```

## Common Pitfalls

❌ **Don't:**
- Run `npm install` while dev server is running
- Modify files while building
- Use old browser versions
- Skip the hard refresh

✅ **Do:**
- Stop server before cleaning (`Ctrl+C`)
- Wait for installs to complete
- Hard refresh after any changes
- Check for TypeScript/build errors

---

**Need more help?** Check `LOCAL_SETUP_GUIDE.md` for detailed troubleshooting.
