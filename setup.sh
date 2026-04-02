#!/bin/bash

# Product Management App - Quick Setup Script
# This script automates the initial setup process

echo "🚀 Product Management App - Quick Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📦 Installing dependencies..."
echo "This may take a few minutes..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
else
    echo ""
    echo "❌ Failed to install dependencies. Trying with --legacy-peer-deps..."
    npm install --legacy-peer-deps
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the development server: npm start"
echo "2. Press 'i' for iOS simulator"
echo "3. Press 'a' for Android emulator"
echo "4. Scan QR code with Expo Go app on your phone"
echo ""
echo "📚 Documentation:"
echo "- README.md - Project overview and features"
echo "- IMPLEMENTATION_GUIDE.md - Step-by-step guide"
echo "- ARCHITECTURE.md - Design decisions and interview prep"
echo ""
echo "Happy coding! 🎉"
