@echo off
echo CRM Demo Uygulamasi Baslatiliyor...
echo.

echo Backend baslatiliyor...
start "Backend" cmd /k "cd backend && npm install && npm run dev"

timeout /t 3 /nobreak > nul

echo Frontend baslatiliyor...
start "Frontend" cmd /k "cd frontend && npm install && npm run dev"

echo.
echo Uygulamalar baslatildi!
echo Backend: http://localhost:3000
echo Frontend: http://localhost:3001
echo.
echo Herhangi bir tuşa basarak kapatabilirsiniz...
pause > nul
