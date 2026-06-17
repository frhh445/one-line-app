# 📱 One Line - Android APK Build Guide

> حوّل الـ Next.js app لـ APK حقيقي في 10 دقائق باستخدام Capacitor

---

## 🎯 المطلوب منك

### على جهازك (مرة واحدة):
- ✅ Node.js 18+
- ✅ Java JDK 17
- ✅ Android Studio
- ✅ Android SDK

---

## 📋 خطوات البناء (10 دقائق)

### Step 1: Install Android Studio + SDK (مرة واحدة بس - 30 دقيقة)

#### Windows:
```
1. نزل Android Studio: https://developer.android.com/studio
2. Install عادي
3. افتح Android Studio
4. اختار "More Actions" → "SDK Manager"
5. Install:
   - Android 14 (API 34)
   - Android 13 (API 33)
   - Build Tools 34.0.0
6. اضبط ANDROID_HOME Environment Variable:
   - Control Panel → System → Environment Variables
   - New: ANDROID_HOME = C:\Users\YourName\AppData\Local\Android\Sdk
```

#### macOS:
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java
brew install --cask zulu@17

# Install Android Studio
brew install --cask android-studio

# Set environment variables
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/emulator' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
source ~/.zshrc
```

#### Linux:
```bash
# Install Java
sudo apt update
sudo apt install openjdk-17-jdk

# Install Android Studio
sudo snap install android-studio --classic

# Set environment
echo 'export ANDROID_HOME=$HOME/Android/Sdk' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/emulator' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.bashrc
source ~/.bashrc
```

---

### Step 2: Install Project Dependencies (3 دقائق)

```bash
cd /workspace/one-line
npm install
npx cap sync android
```

---

### Step 3: Add Android Platform (دقيقة واحدة)

```bash
npx cap add android
```

ده هيعملك folder `android/` فيه كل الـ Android project files.

---

### Step 4: Generate App Icon (دقيقتين)

#### الطريقة السريعة: استخدم Online Tool
1. روح https://easyappicon.com/
2. ارفع صورة 1024x1024 (اعملها بـ Canva أو Figma)
3. اختار "Android"
4. Download
5. انسخ الملفات لـ `android/app/src/main/res/`:
   - `mipmap-mdpi/ic_launcher.png` (48x48)
   - `mipmap-hdpi/ic_launcher.png` (72x72)
   - `mipmap-xhdpi/ic_launcher.png` (96x96)
   - `mipmap-xxhdpi/ic_launcher.png` (144x144)
   - `mipmap-xxxhdpi/ic_launcher.png` (192x192)

#### أو استخدم الكود التلقائي:
```bash
npm install -g cordova-res
cordova-res android --skip-config --copy
```

---

### Step 5: Build APK (5 دقائق)

#### الطريقة A: Command Line (الأسهل)
```bash
# Debug APK (للاختبار - 15MB)
npm run apk:debug

# Release APK (للنشر على Play Store - 10MB)
npm run apk:release
```

#### الطريقة B: Android Studio (الأسهل بصرياً)
```bash
npm run cap:open
```

ده هيفتح Android Studio. بعدين:
1. اختار `Build` → `Generate Signed Bundle / APK`
2. اختار `APK`
3. اضغط `Create new...` لإنشاء signing key
4. املأ البيانات:
   - Key store path: اختار مكان على جهازك
   - Password: أي password قوي
   - Alias: `onelinedev`
   - Validity: 25 years
5. اضغط `Next`
6. اختار `release`
7. اضغط `Create`
8. استنى 2-3 دقائق
9. اضغط `locate` لفتح مكان الـ APK

---

### Step 6: Install on Your Phone (30 ثانية)

#### الطريقة A: USB
```bash
# وصّل موبايلك بالـ USB
# فعّل USB Debugging في Developer Options
adb install android/app/build/outputs/apk/release/app-release.apk
```

#### الطريقة B: Manual
```
1. انسخ الـ APK من:
   android/app/build/outputs/apk/release/app-release.apk
2. حطه على Google Drive
3. حمّله على الموبايل
4. افتحه → Install
```

---

## 📁 مكان الـ APK

```
one-line/android/app/build/outputs/apk/
├── debug/
│   └── app-debug.apk          ← للاختبار (15MB)
└── release/
    └── app-release.apk        ← للنشر (10MB)
```

---

## 🎨 Customize Android App

### تغيير اسم التطبيق
`android/app/src/main/res/values/strings.xml`:
```xml
<resources>
    <string name="app_name">One Line</string>
    <resources>
```

### تغيير الـ Package Name
`android/app/build.gradle`:
```gradle
android {
    namespace "app.oneline.study"
    defaultConfig {
        applicationId "app.oneline.study"
    }
}
```

### تغيير الألوان
`android/app/src/main/res/values/colors.xml`:
```xml
<resources>
    <color name="colorPrimary">#6366f1</color>
    <color name="colorPrimaryDark">#4f46e5</color>
    <color name="colorAccent">#8b5cf6</color>
</resources>
```

---

## 🚀 نشر على Play Store (1-2 ساعة)

### Step 1: Create Developer Account
1. روح https://play.google.com/console
2. ادفع $25 (مرة واحدة مدى الحياة)
3. املأ بيانات المطور

### Step 2: Create App
1. "Create app"
2. املأ:
   - App name: One Line
   - Default language: English (or Arabic)
   - App or Game: App
   - Free or Paid: Free
3. اقبل السياسات

### Step 3: Store Listing
املأ:
- **Short description (80 chars):**
  ```
  AI-powered study app with Pomodoro timer. 100+ AI tools for students.
  ```

- **Full description (4000 chars):**
  ```
  One Line combines AI study tools, smart Pomodoro sessions, and progress
  tracking in one beautiful app. Built for students who want to actually
  get things done.

  Features:
  • Smart Pomodoro Timer (53 min focus + 17 min break)
  • 100+ AI Study Tools (summarize, quiz, explain, translate)
  • Progress Tracking with streaks, badges, and stats
  • Beautiful design, dark mode, mobile-first
  • Study systems: Cornell, Feynman, Spaced Repetition
  • Free forever • No credit card required

  Whether you're in high school, university, or self-learning, One Line
  helps you study smarter, not harder.
  ```

- **App icon:** 512x512 PNG
- **Feature graphic:** 1024x500 PNG
- **Screenshots:** على الأقل 2 (phone screenshots)

### Step 4: Content Rating
- املأ Questionnaire
- اختار Category: Education
- هيطلع Rating: Everyone أو PEGI 3

### Step 5: Upload APK
1. Production → Create new release
2. Upload AAB (Android App Bundle):
   ```bash
   # في Android Studio:
   Build → Generate Signed Bundle / APK → Android App Bundle
   ```
3. اكتب Release notes
4. Review → Start rollout

### Step 6: Wait
- Google review: 1-7 أيام
- بعد الموافقة → Live! 🎉

---

## 💡 نصائح مهمة

### 1. First Build Issues

لو ظهر error في الـ build:
```bash
# Clean everything
cd android
./gradlew clean
cd ..
npx cap sync android
npm run apk:debug
```

### 2. App Size Optimization

```bash
# في android/app/build.gradle
android {
    buildTypes {
        release {
            minifyEnabled true  # يقلل الحجم
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt', 'proguard-rules.pro'
        }
    }
}
```

### 3. Update App Version

`android/app/build.gradle`:
```gradle
defaultConfig {
    versionCode 2        # increment كل release
    versionName "1.1.0"  # user-facing version
}
```

### 4. Test on Real Device

```bash
# Build + Install + Open
npm run apk:debug && \
adb install android/app/build/outputs/apk/debug/app-debug.apk && \
adb shell am start -n app.oneline.study/.MainActivity
```

---

## 🔥 Hot Tips

### Live Reload أثناء التطوير
```bash
# شغّل dev server
npm run dev

# في Android Studio:
# Edit android/app/src/main/assets/capacitor.config.json
{
  "server": {
    "url": "http://192.168.1.X:3000",  # IP بتاع جهازك
    "cleartext": true
  }
}

# Reload app
```

### Generate App Bundle (AAB) للنشر
```bash
# في Android Studio:
Build → Generate Signed Bundle / APK
→ Android App Bundle
→ release
```

---

## 📊 الـ Timeline الكامل

```
الدقيقة 0:    ابدأ
الدقيقة 1-3:  npm install
الدقيقة 4:    npx cap add android
الدقيقة 5-6:  Generate icon
الدقيقة 7-10: Build APK
الدقيقة 11:   Install on phone ✅
```

```
بعد كده (لما تكون جاهز للنشر):
الساعة 1-2:   Play Store listing
اليوم 2-7:    Google review
اليوم 7+:     Live on Play Store! 🎉
```

---

## ❓ مشاكل شائعة

### "ANDROID_HOME not set"
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# أو
set ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk  # Windows
```

### "Java not found"
```bash
# macOS
brew install --cask zulu@17

# Linux
sudo apt install openjdk-17-jdk

# Windows
# Download from https://adoptium.net/
```

### "Gradle build failed"
```bash
cd android
./gradlew --stop
./gradlew clean
cd ..
npx cap sync android
```

### "APK not installing"
- فعّل "Install from Unknown Sources" في الموبايل
- أو استخدم `adb install -r` للـ reinstall

---

## ✅ Checklist

- [ ] Android Studio installed
- [ ] Java JDK 17 installed
- [ ] ANDROID_HOME set
- [ ] `npm install` done
- [ ] `npx cap add android` done
- [ ] App icon generated
- [ ] `npm run apk:debug` builds successfully
- [ ] APK installed on phone
- [ ] App opens and works
- [ ] Haptic feedback works (test on phone!)
- [ ] Notifications work
- [ ] Theme looks good

---

**يلا ابدأ! أول APK هتعمله هياخد 30 دقيقة، بعدها كل build = 5 دقائق 💪**
