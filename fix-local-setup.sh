#!/bin/bash

# Fix Local Setup Script for E.O.A Line Project
# This script ensures all dependencies and configurations are correct

echo "🚀 E.O.A Line - Local Setup Fix Script"
echo "========================================"
echo ""

# Step 1: Clean everything
echo "📦 Step 1: Cleaning old files..."
rm -rf node_modules
rm -rf dist
rm -rf node_modules/.vite
rm -f package-lock.json
echo "✅ Clean complete"
echo ""

# Step 2: Clear npm cache
echo "🧹 Step 2: Clearing npm cache..."
npm cache clean --force
echo "✅ Cache cleared"
echo ""

# Step 3: Install dependencies
echo "📥 Step 3: Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Step 4: Verify Tailwind CSS
echo "🎨 Step 4: Verifying Tailwind CSS..."
if [ -f "tailwind.config.js" ]; then
    echo "✅ tailwind.config.js found"
else
    echo "❌ tailwind.config.js missing!"
fi

if [ -f "postcss.config.js" ]; then
    echo "✅ postcss.config.js found"
else
    echo "❌ postcss.config.js missing!"
fi
echo ""

# Step 5: Check environment file
echo "🔐 Step 5: Checking environment file..."
if [ -f ".env" ]; then
    echo "✅ .env file found"
    echo "⚠️  Make sure it contains:"
    echo "   - VITE_SUPABASE_URL"
    echo "   - VITE_SUPABASE_ANON_KEY"
    echo "   - VITE_STRIPE_PUBLIC_KEY"
else
    echo "❌ .env file not found!"
    echo "⚠️  Create .env file with your credentials"
fi
echo ""

# Step 6: Build once
echo "🔨 Step 6: Running production build..."
npm run build
echo "✅ Build complete"
echo ""

echo "======================================"
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Verify your .env file has correct values"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:5173"
echo "4. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)"
echo ""
echo "If buttons still don't render:"
echo "- Clear browser cache completely"
echo "- Try in incognito/private window"
echo "- Check browser console for errors (F12)"
echo ""
