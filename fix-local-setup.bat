@echo off
REM Fix Local Setup Script for E.O.A Line Project (Windows)
REM This script ensures all dependencies and configurations are correct

echo ================================================
echo E.O.A Line - Local Setup Fix Script (Windows)
echo ================================================
echo.

REM Step 1: Clean everything
echo Step 1: Cleaning old files...
if exist node_modules rmdir /s /q node_modules
if exist dist rmdir /s /q dist
if exist package-lock.json del /f package-lock.json
echo Done: Clean complete
echo.

REM Step 2: Clear npm cache
echo Step 2: Clearing npm cache...
call npm cache clean --force
echo Done: Cache cleared
echo.

REM Step 3: Install dependencies
echo Step 3: Installing dependencies...
call npm install
echo Done: Dependencies installed
echo.

REM Step 4: Verify files
echo Step 4: Verifying configuration files...
if exist tailwind.config.js (
    echo Found: tailwind.config.js
) else (
    echo MISSING: tailwind.config.js
)

if exist postcss.config.js (
    echo Found: postcss.config.js
) else (
    echo MISSING: postcss.config.js
)
echo.

REM Step 5: Check environment
echo Step 5: Checking environment file...
if exist .env (
    echo Found: .env file
    echo WARNING: Make sure it contains:
    echo    - VITE_SUPABASE_URL
    echo    - VITE_SUPABASE_ANON_KEY
    echo    - VITE_STRIPE_PUBLIC_KEY
) else (
    echo MISSING: .env file
    echo WARNING: Create .env file with your credentials
)
echo.

REM Step 6: Build
echo Step 6: Running production build...
call npm run build
echo Done: Build complete
echo.

echo ================================================
echo Setup complete!
echo.
echo Next steps:
echo 1. Verify your .env file has correct values
echo 2. Run: npm run dev
echo 3. Open: http://localhost:5173
echo 4. Hard refresh browser (Ctrl+Shift+R)
echo.
echo If buttons still don't render:
echo - Clear browser cache completely
echo - Try in incognito/private window
echo - Check browser console for errors (F12)
echo.
pause
