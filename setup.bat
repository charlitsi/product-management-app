@echo off
REM Product Management App - Quick Setup Script (Windows)

echo ======================================
echo Product Management App - Quick Setup
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    echo         Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo [OK] npm is installed
npm --version
echo.

REM Check if we're in the right directory
if not exist package.json (
    echo [ERROR] package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

echo Installing dependencies...
echo This may take a few minutes...
echo.

npm install

if %errorlevel% equ 0 (
    echo.
    echo [OK] Dependencies installed successfully!
) else (
    echo.
    echo [ERROR] Failed to install dependencies. Trying with --legacy-peer-deps...
    npm install --legacy-peer-deps
)

echo.
echo [OK] Setup complete!
echo.
echo Next steps:
echo 1. Start the development server: npm start
echo 2. Press 'i' for iOS simulator
echo 3. Press 'a' for Android emulator
echo 4. Scan QR code with Expo Go app on your phone
echo.
echo Documentation:
echo - README.md - Project overview and features
echo - IMPLEMENTATION_GUIDE.md - Step-by-step guide
echo - ARCHITECTURE.md - Design decisions and interview prep
echo.
echo Happy coding!
echo.
pause
