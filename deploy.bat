@echo off
echo ============================================
echo   PMP Affiliate - Firebase Deploy Script
echo ============================================
echo.
echo Step 1: Installing Firebase Tools...
call npm install -g firebase-tools
echo.
echo Step 2: Logging into Firebase (browser will open)...
call firebase login
echo.
echo Step 3: Enabling Next.js support...
call firebase experiments:enable webframeworks
echo.
echo Step 4: Deploying to Firebase...
call firebase deploy --only hosting
echo.
echo ============================================
echo   DONE! Your app is live on Firebase!
echo ============================================
pause
