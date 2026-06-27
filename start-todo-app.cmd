@echo off
setlocal

cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found.
  echo Please install Node.js, then run this file again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo Starting todo-app-v2...
start "todo-app-v2 dev server" cmd /k "cd /d ""%~dp0"" && npm run dev -- --host 127.0.0.1 --port 5173 --strictPort"

timeout /t 3 /nobreak >nul
start "" "http://127.0.0.1:5173/"

endlocal
