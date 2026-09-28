@echo off
cd /d "%~dp0"
echo Abrir http://127.0.0.1:4198/
node scripts/serve.mjs . 4198
pause
