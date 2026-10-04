@echo off
cd /d "%~dp0"
title First Money Gold Web App

echo =======================================================
echo           FIRST MONEY GOLD WEB APP LAUNCHER
echo =======================================================
echo.

if not exist node_modules (
    echo [INFO] Installing required dependencies...
    call npm install
)

echo [INFO] Starting web application server...
echo [INFO] Opening http://localhost:3000 in your browser...
echo.

start "" http://localhost:3000
call npm run dev
