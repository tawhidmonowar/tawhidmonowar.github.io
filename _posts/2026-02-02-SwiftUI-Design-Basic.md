---
title: SwiftUI Design Basic
description: SwiftUI is Apple’s UI framework used to build apps for iPhone, iPad, Mac, and more.
author: tawhidmonowar
date: 2026-02-02 11:30:00 +06:00
categories: [Development, iOS Development]
---

## SwiftUI Layout
SwiftUI uses stacks, frames, spacing, and alignment to build responsive UI layouts.

### VStack
Arranges views vertically.

```swift
VStack(alignment: .leading, spacing: 8) {
    Text("Hello")
    Text("World")
}
```

### HStack
Arranges views horizontally.

```swift
HStack {
    Text("Left")
    Spacer()
    Text("Right")
}
```

- `Spacer()` pushes views apart.

### ZStack
Overlays views on top of each other.

```swift
ZStack {
    Color.blue
    Text("Overlay")
}
```

**Example:**

```swift
import SwiftUI

struct StacksDemo: View {
    
    var body: some View {
        
        VStack(alignment: .leading, spacing: 12) {
            
            Text("Title")
                .font(.title)
            
            HStack {
                Text("Left")
                Spacer()
                Text("Right")
            }
            
            ZStack {
                Color.blue.opacity(0.1)
                Text("Overlay")
            }
        }
        .padding()
    }
}
```

## Frames and Alignment

### frame()

Controls size and alignment.

```swift
.frame(width: 200, height: 100)

.frame(maxWidth: .infinity, alignment: .leading)
```

### padding()

Adds spacing around a view.

```swift
.padding()

.padding(16)
```

### alignmentGuide()

Custom alignment control.

```swift
.alignmentGuide(.firstTextBaseline) { d in
    d[.bottom]
}
```


### Frame Example

```swift
import SwiftUI

struct FrameDemo: View {
    
    var body: some View {
        
        VStack(spacing: 16) {
            
            ZStack(alignment: .topLeading) {
                Color.yellow.opacity(0.2)
                
                Text("Top Left")
                    .padding(6)
            }
            .frame(width: 200, height: 100)
            
            HStack {
                Text("Left")
                Spacer()
                Text("Right")
            }
            .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding()
    }
}
```

## SwiftUI Layout: Grids

SwiftUI grids are used to display items in rows and columns.

### Lazy Grids

SwiftUI provides:

- `LazyVGrid` → Vertical grid
- `LazyHGrid` → Horizontal grid

They load items lazily for better performance.

### LazyVGrid

Displays items vertically in grid format.

```swift
LazyVGrid(columns: columns, spacing: 12) {
    
}
```

GridItem Defines column or row layout.

### Flexible Grid

```swift
let columns = [
    GridItem(.flexible()),
    GridItem(.flexible())
]
```

- Automatically adjusts item width.

**Example:**

```swift
import SwiftUI

struct GridDemo: View {
    
    let columns = [
        GridItem(.flexible()),
        GridItem(.flexible())
    ]
    
    var body: some View {
        
        LazyVGrid(columns: columns, spacing: 12) {
            
            ForEach(1...6, id: \.self) { i in
                
                Text("Item \(i)")
                    .frame(maxWidth: .infinity)
                    .padding(12)
                    .background(.blue.opacity(0.1))
                    .cornerRadius(8)
            }
        }
        .padding()
    }
}
```

### Adaptive Grid

Automatically fits as many items as possible in a row.

## Syntax

```swift
[GridItem(.adaptive(minimum: 100))]
```

- `minimum` defines minimum item width.

Adaptive Grid Example

```swift
import SwiftUI

struct AdaptiveGridDemo: View {
    
    let columns = [
        GridItem(.adaptive(minimum: 100), spacing: 12)
    ]
    
    var body: some View {
        
        LazyVGrid(columns: columns, spacing: 12) {
            
            ForEach(1...12, id: \.self) { i in
                
                Text("Card \(i)")
                    .frame(maxWidth: .infinity, minHeight: 60)
                    .background(.green.opacity(0.12))
                    .cornerRadius(8)
            }
        }
        .padding()
    }
}
```
