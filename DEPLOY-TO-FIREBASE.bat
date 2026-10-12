@echo off
title PMP Affiliate - Firebase Deploy
color 0A
echo ============================================
echo   PMP AFFILIATE - FIREBASE HOSTING DEPLOY
echo ============================================
echo.

echo [1/3] Enabling Next.js Web Frameworks support...
.\node_modules\.bin\firebase experiments:enable webframeworks

echo.
echo [2/3] Logging into Firebase...
echo A browser window will open. Click your Google account and Allow.
echo.
.\node_modules\.bin\firebase login

echo.
echo [3/3] Building and deploying to Firebase Hosting...
echo This may take 3-5 minutes. Please wait...
echo.
.\node_modules\.bin\firebase deploy --only hosting --project pmp-affiliate

echo.
echo ============================================
echo   DEPLOYMENT COMPLETE!
echo   Your app is live at:
echo   https://pmp-affiliate.web.app
echo ============================================
echo.
pause
