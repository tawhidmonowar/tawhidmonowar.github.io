---
title: How to Install JADX and Decompile apk on macOS
description: Install JADX GUI & CLI on macOS and decompile Android APKs for reverse engineering and security analysis
author: tawhidmonowar
date: 2026-04-05 12:30:00 +06:00
categories: [Reverse Engineering, Android Mobile Apps]
---

## 1. Install JADX (Recommended)

Install using Homebrew:

```bash
brew install jadx
```

Verify installation:

```bash
jadx --version
```

## 2. Open APK in GUI Mode

GUI mode is best for manual reverse engineering.

```bash
jadx-gui /path/to/app.apk
```

Example:

```bash
jadx-gui ~/Downloads/app.apk
```

### What You Can Do in GUI
- Browse Java source code
- View Smali code
- Open AndroidManifest.xml
- Search classes and methods
- Trace method usages
- Analyze app logic

## 3. Export Full Decompiled Source (CLI)

Export entire APK source code:

```bash
jadx -d output_folder /path/to/app.apk
```

Example:

```bash
jadx -d ./decoded ~/Downloads/app.apk
```

Output includes:
- Decompiled Java files
- Resources
- AndroidManifest.xml
- Smali code
