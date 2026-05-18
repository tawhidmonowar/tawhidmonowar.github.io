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

## Text & Display Components

### Text
`Text` is used to display read-only text in SwiftUI.

```swift
struct ContentView: View {
    
    var body: some View {
        
        // Display simple text
        Text("Hello, SwiftUI!")
    }
}
```


### Styled Text
`Text` can be styled with font, color, weight, alignment, and more.

```swift
struct ContentView: View {
    
    var body: some View {
        
        // Styled text
        Text("Welcome to SwiftUI")
            .font(.title)
            .fontWeight(.bold)
            .foregroundColor(.blue)
            .multilineTextAlignment(.center)
            .padding()
    }
}
```

### Label
`Label` displays text with an icon.

```swift
struct ContentView: View {
    
    var body: some View {
        
        // Label with SF Symbol icon
        Label("Settings", systemImage: "gear")
    }
}
```

### Image
`Image` is used to display images from assets or system icons.

```swift
struct ContentView: View {
    
    var body: some View {
        
        // Display SF Symbol image
        Image(systemName: "star.fill")
            .font(.largeTitle)
            .foregroundColor(.yellow)
    }
}
```

### Asset Image
`Image` can display images added to the Assets folder.

```swift
struct ContentView: View {
    
    var body: some View {
        
        // Display image from Assets.xcassets
        Image("profile_photo")
            .resizable()
            .scaledToFit()
            .frame(width: 150, height: 150)
    }
}
```


### AsyncImage
`AsyncImage` loads and displays images from a remote URL.

```swift
struct ContentView: View {
    
    var body: some View {
        
        // Load image from URL
        AsyncImage(url: URL(string: "https://example.com/image.jpg")) { image in
            
            // Loaded image view
            image
                .resizable()
                .scaledToFit()
            
        } placeholder: {
            
            // Placeholder while loading
            ProgressView()
        }
        .frame(width: 200, height: 200)
    }
}
```

### Spacer
`Spacer` creates flexible empty space between views.

```swift
struct ContentView: View {
    
    var body: some View {
        
        HStack {
            
            Text("Left")
            
            // Creates flexible space
            Spacer()
            
            Text("Right")
        }
        .padding()
    }
}
```

### Divider
`Divider` adds a horizontal or vertical separator line.

```swift
struct ContentView: View {
    
    var body: some View {
        
        VStack {
            
            Text("Top Content")
            
            // Separator line
            Divider()
            
            Text("Bottom Content")
        }
        .padding()
    }
}
```

## UI Controls

### Button
SwiftUI provides a built-in `Button` component that is used to trigger actions when the user taps on it.

```swift
struct ContentView: View {
    
    var body: some View {
        
        // Button component
        Button(action: {
            
            // Handle button tap action
            print("Button tapped")
            
        }) {
            
            // Button UI content
            Text("Tap Me")
        }
    }
}
```

### Toggle
`Toggle` is used to switch between ON and OFF states.

```swift
struct ContentView: View {
    
    // Stores toggle state
    @State private var isEnabled = false
    
    var body: some View {
        
        Toggle("Enable Notification", isOn: $isEnabled)
    }
}
```

### Slider
`Slider` allows users to select a value from a range.

```swift
struct ContentView: View {
    
    // Slider current value
    @State private var volume: Double = 50
    
    var body: some View {
        
        VStack {
            
            // Display slider value
            Text("Volume: \(Int(volume))")
            
            // Slider component
            Slider(
                value: $volume,
                in: 0...100
            )
        }
        .padding()
    }
}
```


### Stepper
`Stepper` increases or decreases numeric values.

```swift
struct ContentView: View {
    
    // Counter value
    @State private var quantity = 1
    
    var body: some View {
        
        Stepper(
            "Quantity: \(quantity)",
            value: $quantity,
            in: 1...10
        )
        .padding()
    }
}
```

### Search Bar
SwiftUI provides searchable functionality using the `searchable` modifier.

```swift
struct ContentView: View {
    
    // Search text state
    @State private var searchText = ""
    
    // Sample data
    let fruits = [
        "Apple",
        "Banana",
        "Orange",
        "Mango"
    ]
    
    var body: some View {
        
        NavigationStack {
            
            List {
                
                // Filter list based on search text
                ForEach(
                    fruits.filter {
                        
                        searchText.isEmpty
                        ? true
                        : $0.localizedCaseInsensitiveContains(searchText)
                    },
                    id: \.self
                ) { fruit in
                    
                    Text(fruit)
                }
            }
            
            // Search bar
            .searchable(text: $searchText)
            .navigationTitle("Search")
        }
    }
}
```


### Checkmark
A checkmark is commonly used to show selected items.

```swift
struct ContentView: View {
    
    // Selection state
    @State private var isSelected = false
    
    var body: some View {
        
        Button {
            
            // Toggle selection
            isSelected.toggle()
            
        } label: {
            
            HStack {
                
                Text("Select Item")
                
                Spacer()
                
                // Show checkmark when selected
                if isSelected {
                    
                    Image(systemName: "checkmark")
                        .foregroundColor(.green)
                }
            }
            .padding()
        }
    }
}
```


### Radio Button
SwiftUI has no built-in radio button, but it can be created manually.

```swift
struct ContentView: View {
    
    // Selected option
    @State private var selected = "Apple"
    
    // Radio options
    let fruits = [
        "Apple",
        "Banana",
        "Orange"
    ]
    
    var body: some View {
        
        VStack(alignment: .leading) {
            
            ForEach(fruits, id: \.self) { fruit in
                
                Button {
                    
                    // Update selected value
                    selected = fruit
                    
                } label: {
                    
                    HStack {
                        
                        // Radio icon
                        Image(
                            systemName:
                                selected == fruit
                                ? "largecircle.fill.circle"
                                : "circle"
                        )
                        
                        Text(fruit)
                    }
                }
            }
        }
        .padding()
    }
}
```


### ShareLink
`ShareLink` allows users to share content.

```swift
struct ContentView: View {
    
    var body: some View {
        
        ShareLink(
            item: "Hello SwiftUI!"
        ) {
            
            Label(
                "Share",
                systemImage: "square.and.arrow.up"
            )
        }
    }
}
```


### Gauge
`Gauge` displays progress visually like a speedometer.

```swift
struct ContentView: View {
    
    // Gauge value
    @State private var speed = 70.0
    
    var body: some View {
        
        Gauge(
            value: speed,
            in: 0...100
        ) {
            
            Text("Speed")
            
        } currentValueLabel: {
            
            Text("\(Int(speed))")
        }
        .padding()
    }
}
```


### Refreshable
Adds pull-to-refresh functionality.

```swift
struct ContentView: View {
    
    var body: some View {
        
        List(1...20, id: \.self) { item in
            
            Text("Item \(item)")
        }
        
        // Pull to refresh
        .refreshable {
            
            // Refresh data
            print("Refreshing...")
        }
    }
}
```
### DisclosureGroup
Expands and collapses content.

```swift
struct ContentView: View {
    
    @State private var isExpanded = false
    
    var body: some View {
        
        DisclosureGroup(
            "Show Details",
            isExpanded: $isExpanded
        ) {
            
            Text("Hidden Content")
        }
        .padding()
    }
}
```

### TextField
`TextField` is used for single-line text input.

```swift
struct ContentView: View {
    
    // Stores user input
    @State private var username = ""
    
    var body: some View {
        
        TextField(
            "Enter username",
            text: $username
        )
        .padding()
        .textFieldStyle(.roundedBorder)
    }
}
```

### SecureField
`SecureField` hides typed characters for passwords.

```swift
struct ContentView: View {
    
    // Password value
    @State private var password = ""
    
    var body: some View {
        
        SecureField(
            "Enter password",
            text: $password
        )
        .padding()
    }
}
```

### TextEditor
`TextEditor` is used for multi-line text input.

```swift
struct ContentView: View {
    
    // Stores long text
    @State private var description = ""
    
    var body: some View {
        
        TextEditor(text: $description)
            .frame(height: 200)
            .border(Color.gray)
            .padding()
    }
}
```


### Picker
`Picker` allows users to choose one option from multiple choices.

```swift
struct ContentView: View {
    
    // Selected option
    @State private var selectedFruit = "Apple"
    
    // Picker options
    let fruits = ["Apple", "Banana", "Orange"]
    
    var body: some View {
        
        Picker(
            "Select Fruit",
            selection: $selectedFruit
        ) {
            
            ForEach(fruits, id: \.self) { fruit in
                
                Text(fruit)
            }
        }
        .pickerStyle(.menu)
    }
}
```


### DatePicker
`DatePicker` allows users to select dates and times.

```swift
struct ContentView: View {
    
    // Selected date
    @State private var selectedDate = Date()
    
    var body: some View {
        
        DatePicker(
            "Select Date",
            selection: $selectedDate
        )
        .padding()
    }
}
```

### ColorPicker
`ColorPicker` allows users to choose colors.

```swift
struct ContentView: View {
    
    // Selected color
    @State private var selectedColor = Color.blue
    
    var body: some View {
        
        ColorPicker(
            "Choose Color",
            selection: $selectedColor
        )
        .padding()
    }
}
```

### ProgressView
`ProgressView` displays loading or progress status.

```swift
struct ContentView: View {
    
    var body: some View {
        
        VStack {
            
            // Circular loader
            ProgressView()
            
            // Linear progress bar
            ProgressView(value: 0.7)
        }
        .padding()
    }
}
```


## Layout Components

### VStack
`VStack` arranges views vertically.

```swift
struct ContentView: View {
    
    var body: some View {
        
        VStack {
            
            Text("First Item")
            Text("Second Item")
            Text("Third Item")
        }
    }
}
```


### HStack
`HStack` arranges views horizontally.

```swift
struct ContentView: View {
    
    var body: some View {
        
        HStack {
            
            Image(systemName: "star.fill")
            Text("Favorite")
        }
    }
}
```

### ZStack
`ZStack` overlays views on top of each other.

```swift
struct ContentView: View {
    
    var body: some View {
        
        ZStack {
            
            // Background color
            Color.blue
            
            // Foreground text
            Text("Hello SwiftUI")
                .foregroundColor(.white)
        }
    }
}
```

## Navigation Components

### NavigationStack
`NavigationStack` manages app navigation.

```swift
struct ContentView: View {
    
    var body: some View {
        
        NavigationStack {
            
            Text("Home Screen")
                .navigationTitle("Home")
        }
    }
}
```

### NavigationLink
`NavigationLink` navigates to another screen.

```swift
struct ContentView: View {
    
    var body: some View {
        
        NavigationStack {
            
            NavigationLink("Open Details") {
                
                // Destination screen
                Text("Details Screen")
            }
        }
    }
}
```

### TabView
`TabView` creates bottom tab navigation.

```swift
struct ContentView: View {
    
    var body: some View {
        
        TabView {
            
            Text("Home Screen")
                .tabItem {
                    
                    Image(systemName: "house")
                    Text("Home")
                }
            
            Text("Profile Screen")
                .tabItem {
                    
                    Image(systemName: "person")
                    Text("Profile")
                }
        }
    }
}
```

## List Components

### List
`List` displays scrollable rows of data.

```swift
struct ContentView: View {
    
    // Sample data
    let fruits = ["Apple", "Banana", "Orange"]
    
    var body: some View {
        
        List(fruits, id: \.self) { fruit in
            
            Text(fruit)
        }
    }
}
```

### ScrollView
`ScrollView` creates a scrollable container.

```swift
struct ContentView: View {
    
    var body: some View {
        
        ScrollView {
            
            VStack(spacing: 20) {
                
                ForEach(1...20, id: \.self) { item in
                    
                    Text("Item \(item)")
                }
            }
        }
    }
}
```

## Alerts & Sheets

### Alert
`Alert` shows important popup messages.

```swift
struct ContentView: View {
    
    // Controls alert visibility
    @State private var showAlert = false
    
    var body: some View {
        
        Button("Show Alert") {
            
            showAlert = true
        }
        .alert(
            "Warning",
            isPresented: $showAlert
        ) {
            
            Button("OK", role: .cancel) {
                
                // Handle OK action
            }
        }
    }
}
```

### Sheet
`Sheet` presents a modal screen.

```swift
struct ContentView: View {
    
    // Controls sheet visibility
    @State private var showSheet = false
    
    var body: some View {
        
        Button("Open Sheet") {
            
            showSheet = true
        }
        .sheet(isPresented: $showSheet) {
            
            // Sheet content
            Text("This is a sheet view")
        }
    }
}
```


## Shapes

### Circle
`Circle` creates circular shapes.

```swift
struct ContentView: View {
    
    var body: some View {
        
        Circle()
            .fill(Color.blue)
            .frame(
                width: 120,
                height: 120
            )
    }
}
```

### Rectangle
`Rectangle` creates rectangular shapes.

```swift
struct ContentView: View {
    
    var body: some View {
        
        Rectangle()
            .fill(Color.red)
            .frame(
                width: 200,
                height: 100
            )
    }
}
```

### RoundedRectangle
`RoundedRectangle` creates rectangles with rounded corners.

```swift
struct ContentView: View {
    
    var body: some View {
        
        RoundedRectangle(cornerRadius: 20)
            .fill(Color.green)
            .frame(
                width: 200,
                height: 100
            )
    }
}
```

## State Management

### @State
`@State` stores local mutable data inside a view.

```swift
struct ContentView: View {
    
    // Local state variable
    @State private var count = 0
    
    var body: some View {
        
        VStack {
            
            Text("Count: \(count)")
            
            Button("Increase") {
                
                // Update state
                count += 1
            }
        }
    }
}
```

### @Binding
`@Binding` shares state between parent and child views.

```swift
struct ParentView: View {
    
    // Parent state
    @State private var isOn = false
    
    var body: some View {
        
        ChildView(isOn: $isOn)
    }
}

struct ChildView: View {
    
    // Binding variable
    @Binding var isOn: Bool
    
    var body: some View {
        
        Toggle("Enable", isOn: $isOn)
    }
}
```

### @StateObject
`@StateObject` creates and owns observable objects.

```swift
class CounterViewModel: ObservableObject {
    
    // Published value
    @Published var count = 0
}

struct ContentView: View {
    
    // Create observable object
    @StateObject private var viewModel = CounterViewModel()
    
    var body: some View {
        
        VStack {
            
            Text("Count: \(viewModel.count)")
            
            Button("Increase") {
                
                viewModel.count += 1
            }
        }
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


Example:

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

Example:

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
