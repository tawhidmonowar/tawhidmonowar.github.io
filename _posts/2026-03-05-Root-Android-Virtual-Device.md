---
title: How to root an Android Virtual Device
description: Rooting Android Emulator (AVD) with rootAVD on (Mac - Apple Silicon)
author: tawhidmonowar
date: 2026-03-05 11:30:00 +06:00
categories: [Reverse Engineering, Android Mobile Apps]
---

## Prerequisites
- Android Studio installed
- AVD (Android Emulator) created
- Prefer API 33 (Android 13) with **Google APIs (NOT Play Store)**
- ADB working (`adb devices` should show emulator)

## Step-by-Step Guide

### 1. Clone rootAVD
```bash
git clone https://gitlab.com/newbit/rootAVD.git
cd rootAVD
```

### 2. Setup Android SDK Path
```bash
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$ANDROID_HOME/platform-tools:$PATH
```

Verify:
```bash
adb devices
```

### 3. Start Emulator
Start from Android Studio or CLI:
```bash
emulator -avd AVD_NAME
```

Wait until fully booted.

### 4. Ensure Only Emulator Connected
```bash
adb devices
```

If other devices exist:
```bash
adb disconnect
```

### 5. Add Latest Magisk
- Download latest Magisk APK: https://github.com/topjohnwu/Magisk
- Rename to:
```bash
Magisk.zip
```
- Place inside `rootAVD` folder


### 6. Run rootAVD Script
```bash
./rootAVD.sh system-images/android-33/google_apis/arm64-v8a/ramdisk.img
```

### 7. Emulator Crash / Not Starting Fix

Kill stuck process:
```bash
killall -9 emulator
killall -9 adb
adb kill-server
adb start-server
```

Start clean:
```bash
emulator -avd AVD_NAME -wipe-data -no-snapshot
```

## Important Tips
- Disable **Snapshot / Quick Boot**
- Always use **Cold Boot**
- API 33 is most stable for rootAVD
- Use `arm64-v8a` for Apple Silicon

## Done!
Your emulator should now be rooted with Magisk.

You can verify:
```bash
adb shell su
```

## Enable ADB Root Access (Important)

After setup, you may see:

```bash
su → Permission denied
```
or a toast:
> "Shell was denied Superuser rights"

### Fix:

1. Open Magisk app inside emulator
2. Go to **Superuser**
3. Find:
   ```
   Shell (com.android.shell)
   ```
4. Change permission to:
   ```
   Allow / Grant
   ```

### Alternative Quick Trigger

```bash
adb shell su -c id
```

Then tap **Allow** in Magisk popup

### Recommended Setting

Magisk → Settings:

```
Superuser Access → Apps and ADB
```

### Verify Root

```bash
adb shell
su
whoami
```

Expected:

```bash
root
```
