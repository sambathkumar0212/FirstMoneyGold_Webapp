@echo off
cd /d "%~dp0"
title Build & Package for cPanel

echo =======================================================
echo         BUILDING & PACKAGING FOR CPANEL HOSTING
echo =======================================================
echo.

node package_for_cpanel.js

echo.
echo =======================================================
echo  DONE! Upload 'cpanel_deploy.zip' to public_html in cPanel.
echo =======================================================
pause
