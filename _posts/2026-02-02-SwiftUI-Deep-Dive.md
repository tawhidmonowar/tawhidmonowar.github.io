---
title: SwiftUI Deep Dive
description: SwiftUI is a modern framework to develop user interfaces for all of Apple's platforms such as iOS, watchOS, macOS, tvOS, iPadOS, and visionOS. It was developed by Apple in 2019 as a replacement of traditional frameworks such as UIKit.
author: tawhidmonowar
date: 2026-02-02 11:30:00 +06:00
categories: [Development, iOS Development]
---


## SwiftUI - Overview
### Declarative Syntax
SwiftUI uses declarative syntaxes to develop an App. Declarative syntaxes allow developers to describe the user interface and its behaviour and the rest of the implementation is done by the SwiftUI itself. This approach simplifies the code so that it would be easy to understand and reuse. It focuses on what should be displayed rather than how it is rendered.

Example: 

```swift
struct ContentView: View {
   var body: some View {
      Text("Hello")
   }
}
```

### Layout 
SwiftUI supports layout systems based on stacks such as VStack, HStack, and ZStack. This system simplifies the alignment of components in the current view. It can also allow nesting of views.

```swift
struct ContentView: View {   
   var body: some View {
      VStack{
         Text("TutorialsPoint").font(.title)
      }
   }
}
```


### Views and Modifiers
SwiftUI provides various in-built views such as Text, Image, Toggle, etc., and modifiers such as .font, .fill, .stroke, .foregroundColor, etc. Views are the fundamental building block of the interface whereas modifiers are used to change the appearance of the views. Using these views and modifiers we can create easy or complex user interfaces with few lines of code.

```swift
struct ContentView: View {
   var body: some View {
      Text("TutorialsPoint").font(.title)
   }
}
```

### Gesture
Gestures are used to add interactivity to the interface by responding to the user inputs like tap, long press, drag, hover, etc. SwiftUI provides some in-built gestures like Tap, Long Press, Drag, Rotation, etc., using these gestures we can create an interactive UI.

```swift
struct ContentView: View {
   var body: some View {
      Text("TutorialsPoint").onTapGesture {
         // Handling tap gesture
      }
   }
}
```

### Animation
In SwiftUI, we can animate any component very easily with the help of the .withAnimation() modifier. It also provides inbuilt animations and transitions which we can easily apply on the UI components. Animation enhances the user experience of the app and can improve the interactivity of the App. We can create custom animation very easily.

```swift
struct ContentView: View {
   @State private var size: CGFloat = 2.0

   var body: some View {
      Button("Tap me to see the magic") {
         withAnimation {
            self.size *= 2.5
         }
      }.scaleEffect(size)
   }
}
```

### UI Controls
SwiftUI supports various in-built UI controls such as buttons, sliders, text fields, pickers, etc. Controls are the most essential part of the UI using these controls developers can easily develop user-friendly apps for Apple's platforms.

```swift
struct ContentView: View {
   var body: some View {
      Button(action:{
         // Hanldle button action
      })
   }
}
```

## Basic Components






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
