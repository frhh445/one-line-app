#!/bin/bash
# One Line - Build Script
# This script builds the Android APK from your Next.js app

set -e  # Exit on error

echo "🚀 One Line - Android Build Script"
echo "==================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found${NC}"
    echo "Please run this script from the one-line directory"
    exit 1
fi

# Step 1: Install dependencies
echo -e "\n${YELLOW}📦 Step 1: Installing dependencies...${NC}"
npm install

# Step 2: Build Next.js
echo -e "\n${YELLOW}🔨 Step 2: Building Next.js app...${NC}"
npm run build

# Step 3: Check if out folder exists
if [ ! -d "out" ]; then
    echo -e "${RED}❌ Error: 'out' folder not found${NC}"
    echo "Make sure next.config.js has output: 'export'"
    exit 1
fi
echo -e "${GREEN}✅ Build complete: out/ folder ready${NC}"

# Step 4: Check if Android platform exists
if [ ! -d "android" ]; then
    echo -e "\n${YELLOW}📱 Step 3: Adding Android platform...${NC}"
    npx cap add android
fi

# Step 5: Sync
echo -e "\n${YELLOW}🔄 Step 4: Syncing with Capacitor...${NC}"
npx cap sync android

# Step 6: Build APK
echo -e "\n${YELLOW}📱 Step 5: Building Android APK...${NC}"

# Check build type
if [ "$1" == "release" ]; then
    echo -e "${YELLOW}Building RELEASE APK...${NC}"
    cd android && ./gradlew assembleRelease
    APK_PATH="android/app/build/outputs/apk/release/app-release.apk"
else
    echo -e "${YELLOW}Building DEBUG APK...${NC}"
    cd android && ./gradlew assembleDebug
    APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
fi

# Check if APK was created
if [ -f "../$APK_PATH" ]; then
    APK_SIZE=$(du -h "../$APK_PATH" | cut -f1)
    echo -e "\n${GREEN}✅ APK BUILT SUCCESSFULLY!${NC}"
    echo -e "${GREEN}📦 Location: $APK_PATH${NC}"
    echo -e "${GREEN}📏 Size: $APK_SIZE${NC}"
    echo ""
    echo -e "${YELLOW}To install on your phone:${NC}"
    echo "  adb install $APK_PATH"
    echo ""
    echo -e "${YELLOW}Or copy it manually:${NC}"
    echo "  The APK is at: $(realpath ../$APK_PATH)"
else
    echo -e "\n${RED}❌ Build failed. APK not found.${NC}"
    echo "Try opening Android Studio to see errors:"
    echo "  npx cap open android"
    exit 1
fi
