---
title: Android APK Structure
description: An APK file means Android Package Kit. It is the final packaged file used to install an Android application on an Android device. An APK is basically a compressed archive file, similar to a `.zip` file. If you rename an `.apk` file to `.zip` and extract it, you can see its internal files and folders.

author: tawhidmonowar
date: 2026-05-05 12:30:00 +06:00
categories: [Reverse Engineering, Android Mobile Apps]
--- 

## Basic APK Structure

A typical APK contains files like this:

```text
my-app.apk
│
├── AndroidManifest.xml
├── classes.dex
├── classes2.dex
├── resources.arsc
├── res/
├── assets/
├── lib/
├── META-INF/
├── kotlin/
└── org/
```

Each file or folder has a specific purpose.

---

## 1. AndroidManifest.xml

`AndroidManifest.xml` is one of the most important files inside an APK.

It contains important app information such as:

- Package name
- App permissions
- Activities
- Services
- Broadcast receivers
- Content providers
- App theme
- Minimum SDK
- Target SDK
- App launcher activity
- Deep links
- Exported components

Example:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:theme="@style/AppTheme"
        android:label="@string/app_name">

        <activity
            android:name=".MainActivity"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

        </activity>

    </application>

</manifest>
```

In reverse engineering or security analysis, this file helps identify:

- Which screen opens first
- What permissions the app requests
- Whether any component is exported
- Whether deep links are available
- Whether services or receivers are exposed

---

## 2. classes.dex

`classes.dex` contains the compiled app code.

Android does not directly run Kotlin or Java source code. Kotlin/Java code is compiled into bytecode, then converted into DEX format.

DEX means:

```text
Dalvik Executable
```

This file contains:

- Classes
- Methods
- App logic
- ViewModel logic
- Repository logic
- API calling logic
- Business rules
- Utility functions

Example source code:

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }
}
```

After compilation, this code becomes part of:

```text
classes.dex
```

If the app is large, there may be multiple DEX files:

```text
classes.dex
classes2.dex
classes3.dex
```

This is called **multidex**.

---

## 3. resources.arsc

`resources.arsc` contains compiled Android resources.

It maps resource IDs to actual resource values.

It includes compiled references for:

- Strings
- Colors
- Dimensions
- Styles
- Themes
- Layout references
- Drawable references

Example:

```xml
<string name="app_name">My App</string>
<color name="primary">#2196F3</color>
```

After build, these resources are compiled into:

```text
resources.arsc
```

This file helps Android find resources using generated IDs like:

```kotlin
R.string.app_name
R.color.primary
```

---

## 4. res/ Folder

The `res/` folder contains Android app resources.

Common folders inside `res/`:

```text
res/
├── drawable/
├── mipmap/
├── layout/
├── values/
├── menu/
├── navigation/
├── anim/
├── xml/
└── font/
```

---

### res/drawable/

Contains images, vector drawables, shapes, and backgrounds.

Example:

```text
res/drawable/ic_launcher_background.xml
res/drawable/bg_button.xml
res/drawable/sample_image.png
```

Example shape drawable:

```xml
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#2196F3" />
    <corners android:radius="12dp" />
</shape>
```

---

### res/mipmap/

Usually contains launcher icons for different screen densities.

Example:

```text
res/mipmap-hdpi/ic_launcher.png
res/mipmap-mdpi/ic_launcher.png
res/mipmap-xhdpi/ic_launcher.png
res/mipmap-xxhdpi/ic_launcher.png
res/mipmap-xxxhdpi/ic_launcher.png
```

---

### res/layout/

Contains XML layout files.

Example:

```text
res/layout/activity_main.xml
res/layout/item_user.xml
```

Example layout:

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <TextView
        android:id="@+id/titleText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello Android" />

</LinearLayout>
```

For pure Jetpack Compose apps, this folder may be smaller or almost unused.

---

### res/values/

Contains XML files for app values.

Example:

```text
res/values/strings.xml
res/values/colors.xml
res/values/styles.xml
res/values/themes.xml
res/values/dimens.xml
```

Example:

```xml
<resources>
    <string name="app_name">My Android App</string>
    <color name="primary_color">#2196F3</color>
</resources>
```

---

### res/navigation/

Contains navigation graph files for apps using Jetpack Navigation XML.

Example:

```text
res/navigation/nav_graph.xml
```

---

### res/xml/

Contains configuration XML files.

Common examples:

```text
res/xml/network_security_config.xml
res/xml/file_paths.xml
res/xml/backup_rules.xml
```

Example `network_security_config.xml`:

```xml
<network-security-config>
    <base-config cleartextTrafficPermitted="false" />
</network-security-config>
```

---

## 5. assets/ Folder

The `assets/` folder contains raw files bundled with the app.

Unlike `res/`, files inside `assets/` are not compiled into Android resource IDs.

It may contain:

- JSON files
- HTML files
- Fonts
- ML models
- Text files
- Local database files
- Configuration files

Example:

```text
assets/config.json
assets/index.html
assets/model.tflite
```

Access example:

```kotlin
val json = context.assets.open("config.json")
    .bufferedReader()
    .use { it.readText() }
```

---

## 6. lib/ Folder

The `lib/` folder contains native libraries.

Native libraries are usually written in C or C++ and compiled into `.so` files.

Example:

```text
lib/
├── arm64-v8a/
│   └── libnative-lib.so
├── armeabi-v7a/
│   └── libnative-lib.so
├── x86/
│   └── libnative-lib.so
└── x86_64/
    └── libnative-lib.so
```

Common CPU architectures:

```text
arm64-v8a     Modern 64-bit Android devices
armeabi-v7a   Older 32-bit ARM devices
x86           Emulator / old Intel devices
x86_64        64-bit emulator / Intel devices
```

Native libraries are used for:

- FFmpeg
- OpenCV
- Audio processing
- Video processing
- Encryption logic
- Game engines
- ML inference
- Performance-heavy tasks

Kotlin/Java can call native code using JNI.

Example:

```kotlin
external fun getSecretKey(): String

companion object {
    init {
        System.loadLibrary("native-lib")
    }
}
```

---

## 7. META-INF/ Folder

`META-INF/` contains APK signing and metadata files.

Example:

```text
META-INF/
├── MANIFEST.MF
├── CERT.SF
└── CERT.RSA
```

This folder is related to app signing.

APK signing verifies:

- The APK was created by the original developer
- The APK was not modified after signing
- App updates come from the same signing key

If someone modifies the APK, the original signature becomes invalid.

Modern APKs may also use APK Signature Scheme v2, v3, or v4.

---

## 8. kotlin/ Folder

Some Kotlin apps may include a `kotlin/` folder.

It can contain Kotlin metadata used by the runtime or libraries.

Example:

```text
kotlin/
└── kotlin.kotlin_builtins
```

This folder is not where your actual Kotlin source code is stored. The real compiled code is inside `classes.dex`.

---

## 9. org/ or Other Library Folders

Sometimes APKs contain folders like:

```text
org/
com/
okhttp3/
retrofit2/
```

These may come from included libraries, metadata, or packaged resources.

For example:

- Kotlin metadata
- Dependency files
- License files
- Library-specific configs

---

## 10. Native vs Managed Code

Inside an APK, code can exist in two major forms:

```text
Managed code:
- Kotlin
- Java
- Compiled into classes.dex

Native code:
- C
- C++
- Rust
- Compiled into .so files inside lib/
```

Managed code is usually easier to inspect with tools like JADX.

Native code requires more advanced tools like:

```text
Ghidra
IDA
Radare2
Binary Ninja
```

---

## 11. APK Build Flow

The APK is created through this general process:

```text
Kotlin/Java source code
        ↓
Compiled bytecode
        ↓
DEX files
        ↓
Resources compiled
        ↓
Manifest merged
        ↓
Native libraries added
        ↓
Assets added
        ↓
APK packaged
        ↓
APK signed
        ↓
APK ready to install
```

Simple version:

```text
Source Code + Resources + Manifest + Libraries = APK
```

---

## 12. APK vs AAB

APK and AAB are different.

### APK

APK is the installable file.

```text
app-release.apk
```

Users or devices can directly install APK files.

---

### AAB

AAB means Android App Bundle.

```text
app-release.aab
```

Google Play uses AAB to generate optimized APKs for each device.

AAB can reduce app size because users only download what their device needs.

For example, Google Play can generate APKs based on:

- Device language
- Screen density
- CPU architecture
- Android version

---

## 13. Debug APK vs Release APK

### Debug APK

Used during development.

Usually has:

- Debuggable enabled
- Debug signing key
- More logs
- No strong optimization
- Easier testing

Example:

```text
app-debug.apk
```

---

### Release APK

Used for production.

Usually has:

- Release signing key
- Minification
- Obfuscation
- Resource shrinking
- Better performance
- Debugging disabled

Example:

```text
app-release.apk
```

---

## 14. Important Files for Security Analysis

When analyzing your own APK security, check these carefully:

```text
AndroidManifest.xml
classes.dex
resources.arsc
res/xml/network_security_config.xml
assets/
lib/
```

Look for:

- Hardcoded API keys
- Hardcoded tokens
- Debug logs
- Exposed activities
- Exported services
- Insecure WebView settings
- Cleartext HTTP traffic
- Weak network security config
- Secrets inside assets
- Sensitive logic inside DEX
- Native libraries exposing strings
- Firebase config misuse

---

## 15. Common Security Mistakes in APK

Common mistakes include:

```text
Hardcoded API keys
Debug mode enabled in release
Sensitive logs
HTTP instead of HTTPS
Weak Firebase rules
Tokens stored insecurely
Exported components without permission
Secrets stored in assets
Weak obfuscation
No server-side validation
No request signing
No replay protection
```

---

## 16. Tools to Inspect APK Structure

Common tools:

```text
Android Studio APK Analyzer
JADX
Apktool
MobSF
AAPT
Bundletool
ADB
Ghidra
```

---

### Android Studio APK Analyzer

Used to inspect APK size and files.

It can show:

- DEX files
- Resources
- Native libraries
- APK size breakdown
- Download size
- File structure

---

### JADX

Used to inspect decompiled Kotlin/Java-like code from DEX files.

Useful for reading:

- Activities
- ViewModels
- API classes
- Business logic
- Constants
- Hardcoded values

---

### Apktool

Used to decode APK resources and Smali code.

Useful for checking:

- Manifest
- XML resources
- Smali files
- Assets
- Res folder

---

### MobSF

MobSF is an automated mobile security analysis framework.

Useful for checking:

- Permissions
- Trackers
- Hardcoded secrets
- SSL issues
- Manifest issues
- Security risks

---

## 17. Example APK Structure Summary

```text
AndroidManifest.xml
```

Defines app components, permissions, launcher activity, services, receivers, and providers.

```text
classes.dex
```

Contains compiled Kotlin/Java app code.

```text
resources.arsc
```

Contains compiled resource table.

```text
res/
```

Contains layouts, drawables, strings, colors, themes, XML configs, and icons.

```text
assets/
```

Contains raw bundled files such as JSON, HTML, fonts, ML models, or database files.

```text
lib/
```

Contains native `.so` libraries for different CPU architectures.

```text
META-INF/
```

Contains signing-related metadata.

```text
kotlin/
```

Contains Kotlin metadata, not source code.

---

## Final Note

An APK is not just one file with code. It is a complete package containing:

- App code
- Manifest
- Resources
- Assets
- Native libraries
- Signing metadata
- Configuration files

To understand an APK properly, focus on these key parts first:

```text
AndroidManifest.xml
classes.dex
res/
resources.arsc
assets/
lib/
META-INF/
```
