@echo off
title PMP Affiliate - Vercel Deploy
color 0B
echo ============================================
echo   PMP AFFILIATE - VERCEL HOSTING DEPLOY
echo ============================================
echo.
echo Make sure you have the environment variables from .env.local
echo added to your Vercel project settings in the Vercel dashboard!
echo.
echo Press any key to continue to deployment...
pause >nul
echo.
echo Deploying to Vercel (Production)...
echo (If you are not logged in, Vercel may open a browser window to authenticate)
echo.
call npx vercel --prod --yes
echo.
echo ============================================
echo   DEPLOYMENT SCRIPT FINISHED
echo ============================================
pause
