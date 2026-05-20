---
title: iOS Developer Interview Questions
description: This note covers important iOS developer interview questions from beginner to advanced level.
author: tawhidmonowar
date: 2026-04-03 11:30:00 +06:00
categories: [Interview Prep, Software Engineer]
---

## Topics covered:

- Swift
- OOP
- Memory management
- SwiftUI
- UIKit
- Lifecycle
- Networking
- Database
- Concurrency
- Architecture
- Testing
- Security
- Performance
- App Store
- Advanced iOS topics

---

# 1. Swift Basics

---

### Q1. What is Swift?

Swift is Apple's modern programming language used to build apps for iOS, macOS, watchOS, tvOS, and visionOS.

Swift is:

- Fast
- Safe
- Modern
- Type-safe
- Easy to read
- Good for app development

Example:

```swift
let name = "Envobyte"
print("Hello, \(name)")
```

---

### Q2. What is the difference between `let` and `var`?

`let` is used for constant values.  
`var` is used for changeable values.

```swift
let appName = "My App"
var downloadCount = 10

downloadCount = 20

print(appName)
print(downloadCount)
```

Use `let` by default unless the value needs to change.

---

### Q3. What is type inference in Swift?

Type inference means Swift can automatically understand the data type.

```swift
let name = "Envobyte" // Swift understands this is String
let age = 25          // Swift understands this is Int
let price = 9.99      // Swift understands this is Double
```

You can also define type manually:

```swift
let username: String = "Envobyte"
let count: Int = 10
```

---

### Q4. What are optionals in Swift?

Optional means a value may exist or may be nil.

```swift
var username: String? = "Envobyte"
username = nil
```

Optional is useful when data may be missing.

Example:

```swift
var email: String? = nil

if let email = email {
    print(email)
} else {
    print("Email not found")
}
```

---

### Q5. What is optional binding?

Optional binding safely unwraps an optional value.

```swift
let name: String? = "Envobyte"

if let unwrappedName = name {
    print("Name is \(unwrappedName)")
} else {
    print("Name is nil")
}
```

This avoids crashes.

---

### Q6. What is `guard let`?

`guard let` safely unwraps an optional and exits early if the value is nil.

```swift
func showUserName(_ name: String?) {
    guard let name = name else {
        print("Name not found")
        return
    }

    print("Name is \(name)")
}
```

Use `guard let` when invalid data should stop the function.

---

### Q7. What is force unwrapping?

Force unwrapping uses `!` to extract an optional value.

```swift
let name: String? = "Envobyte"
print(name!)
```

This is risky. If value is nil, the app will crash.

Bad example:

```swift
let email: String? = nil
print(email!) // Crash
```

Use force unwrap only when you are 100% sure value is not nil.

---

### Q8. What is nil coalescing operator?

Nil coalescing operator `??` provides a default value if optional is nil.

```swift
let name: String? = nil
let finalName = name ?? "Guest"

print(finalName)
```

Output:

```text
Guest
```

---

# 2. Swift Data Types

---

### Q9. What are common Swift data types?

Common data types:

```swift
let name: String = "Envobyte"
let age: Int = 25
let price: Double = 9.99
let isPremium: Bool = true
let rating: Float = 4.5
```

---

### Q10. What is an Array?

Array stores multiple values in order.

```swift
let users = ["Envobyte", "John", "Sarah"]

print(users[0])
```

Loop example:

```swift
for user in users {
    print(user)
}
```

---

### Q11. What is a Dictionary?

Dictionary stores key-value pairs.

```swift
let user = [
    "name": "Envobyte",
    "email": "test@example.com"
]

print(user["name"] ?? "")
```

---

### Q12. What is a Set?

Set stores unique values.

```swift
let numbers: Set<Int> = [1, 2, 3, 3, 4]

print(numbers)
```

Output does not contain duplicate `3`.

---

# 3. Functions and Closures

---

### Q13. What is a function in Swift?

A function is a reusable block of code.

```swift
func greetUser(name: String) -> String {
    return "Hello, \(name)"
}

let message = greetUser(name: "Envobyte")
print(message)
```

---

### Q14. What is a closure?

A closure is a block of code that can be stored or passed around.

```swift
let greeting: (String) -> String = { name in
    return "Hello, \(name)"
}

print(greeting("Envobyte"))
```

---

### Q15. What is a trailing closure?

Trailing closure means writing the closure outside function parentheses.

```swift
func performTask(action: () -> Void) {
    action()
}

performTask {
    print("Task completed")
}
```

---

### Q16. What is escaping closure?

An escaping closure is a closure that is executed after the function returns.

```swift
var savedCompletion: (() -> Void)?

func loadData(completion: @escaping () -> Void) {
    savedCompletion = completion
}

loadData {
    print("Data loaded")
}

savedCompletion?()
```

Use `@escaping` for async tasks, API callbacks, and stored closures.

---

# 4. Struct, Class, Enum, Protocol

---

### Q17. What is a struct in Swift?

A struct is a value type.

```swift
struct User {
    let id: Int
    var name: String
}

let user = User(id: 1, name: "Envobyte")
print(user.name)
```

Structs are commonly used for models.

---

### Q18. What is a class in Swift?

A class is a reference type.

```swift
class UserManager {
    var name = "Guest"

    func updateName(_ newName: String) {
        name = newName
    }
}

let manager = UserManager()
manager.updateName("Envobyte")

print(manager.name)
```

---

### Q19. What is the difference between struct and class?

Main difference:

```text
Struct = Value type
Class  = Reference type
```

Struct example:

```swift
struct Profile {
    var name: String
}

var profile1 = Profile(name: "A")
var profile2 = profile1

profile2.name = "B"

print(profile1.name) // A
print(profile2.name) // B
```

Class example:

```swift
class ProfileClass {
    var name: String

    init(name: String) {
        self.name = name
    }
}

let p1 = ProfileClass(name: "A")
let p2 = p1

p2.name = "B"

print(p1.name) // B
print(p2.name) // B
```

Use struct for models and simple data.  
Use class when shared reference or inheritance is needed.

---

### Q20. What is an enum?

Enum represents fixed possible values.

```swift
enum UserType {
    case free
    case premium
    case admin
}

let type = UserType.premium
```

Enum with raw value:

```swift
enum PaymentStatus: String {
    case pending = "Pending"
    case completed = "Completed"
    case failed = "Failed"
}

print(PaymentStatus.completed.rawValue)
```

---

### Q21. What is a protocol?

A protocol defines rules that a class, struct, or enum must follow.

```swift
protocol Downloadable {
    func download()
}

struct VideoDownloader: Downloadable {
    func download() {
        print("Download started")
    }
}
```

Protocols are useful for abstraction and testability.

---

### Q22. What is protocol-oriented programming?

Protocol-oriented programming means designing code around protocols instead of inheritance.

Example:

```swift
protocol PaymentService {
    func pay(amount: Double)
}

class StripePaymentService: PaymentService {
    func pay(amount: Double) {
        print("Paid using Stripe")
    }
}

class CheckoutViewModel {
    private let paymentService: PaymentService

    init(paymentService: PaymentService) {
        self.paymentService = paymentService
    }

    func checkout() {
        paymentService.pay(amount: 19.99)
    }
}
```

This makes code flexible and testable.

---

### Q23. What is an extension?

Extension adds new functionality to an existing type.

```swift
extension String {
    func addWelcomeText() -> String {
        return "Welcome, \(self)"
    }
}

print("Envobyte".addWelcomeText())
```

---

### Q24. What are generics?

Generics allow writing reusable code for different data types.

```swift
func printValue<T>(_ value: T) {
    print(value)
}

printValue("Hello")
printValue(100)
printValue(true)
```

---

# 5. Error Handling

---

### Q25. How does Swift handle errors?

Swift uses `do`, `try`, and `catch`.

```swift
enum LoginError: Error {
    case invalidPassword
}

func login(password: String) throws {
    if password != "123456" {
        throw LoginError.invalidPassword
    }

    print("Login successful")
}

do {
    try login(password: "wrong")
} catch {
    print("Login failed: \(error)")
}
```

---

### Q26. What is the difference between `try`, `try?`, and `try!`?

```text
try    = normal error handling
try?   = converts result to optional
try!   = force try, crashes if error occurs
```

Example:

```swift
let result = try? login(password: "wrong")
```

Avoid `try!` unless you are 100% sure no error will happen.

---

# 6. Memory Management

---

### Q27. What is ARC?

ARC means Automatic Reference Counting.

Swift uses ARC to manage memory automatically for class instances.

```swift
class User {
    let name: String

    init(name: String) {
        self.name = name
        print("\(name) created")
    }

    deinit {
        print("\(name) removed")
    }
}

var user: User? = User(name: "Envobyte")
user = nil
```

When no strong reference remains, object is removed from memory.

---

### Q28. What is a strong reference?

A strong reference keeps an object alive.

```swift
class User {}

var user1: User? = User()
var user2 = user1
```

As long as `user1` or `user2` references the object, it stays in memory.

---

### Q29. What is a retain cycle?

A retain cycle happens when two objects strongly hold each other, so ARC cannot remove them.

Bad example:

```swift
class User {
    var profile: Profile?
}

class Profile {
    var user: User?
}
```

If both hold each other strongly, memory leak can happen.

---

### Q30. How to fix retain cycle?

Use `weak` or `unowned`.

```swift
class User {
    var profile: Profile?
}

class Profile {
    weak var user: User?
}
```

Use `weak` when the reference can become nil.

---

### Q31. What is the difference between weak and unowned?

```text
weak    = optional, can become nil
unowned = non-optional, should never become nil while used
```

Example:

```swift
class Parent {
    var child: Child?
}

class Child {
    weak var parent: Parent?
}
```

Use `weak` more commonly because it is safer.

---

### Q32. How do you avoid retain cycles in closures?

Use `[weak self]`.

```swift
class DownloadManager {
    var onComplete: (() -> Void)?

    func startDownload() {
        onComplete = { [weak self] in
            self?.showSuccess()
        }
    }

    func showSuccess() {
        print("Download completed")
    }
}
```

---

# 7. SwiftUI Basics

---

### Q33. What is SwiftUI?

SwiftUI is Apple's modern declarative UI framework.

Instead of describing how to change UI step by step, you describe what UI should look like based on state.

Example:

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello SwiftUI")
    }
}
```

---

### Q34. What is a View in SwiftUI?

A View is a UI component.

```swift
struct ProfileView: View {
    var body: some View {
        Text("Profile Screen")
    }
}
```

Everything in SwiftUI is a View:

- Text
- Button
- Image
- VStack
- HStack
- List
- Form

---

### Q35. What is VStack, HStack, and ZStack?

```text
VStack = vertical layout
HStack = horizontal layout
ZStack = overlay layout
```

Example:

```swift
struct LayoutExample: View {
    var body: some View {
        VStack {
            Text("Title")

            HStack {
                Text("Left")
                Text("Right")
            }

            ZStack {
                Color.blue
                Text("Overlay Text")
                    .foregroundStyle(.white)
            }
            .frame(height: 100)
        }
    }
}
```

---

### Q36. What is @State?

`@State` stores local view state.

```swift
struct CounterView: View {
    @State private var count = 0

    var body: some View {
        Button("Count: \(count)") {
            count += 1
        }
    }
}
```

Use `@State` when the view owns the data.

---

### Q37. What is @Binding?

`@Binding` allows a child view to modify parent state.

```swift
struct ParentView: View {
    @State private var isOn = false

    var body: some View {
        ChildView(isOn: $isOn)
    }
}

struct ChildView: View {
    @Binding var isOn: Bool

    var body: some View {
        Toggle("Enable", isOn: $isOn)
    }
}
```

---

### Q38. What is @StateObject?

`@StateObject` creates and owns an ObservableObject.

```swift
class ProfileViewModel: ObservableObject {
    @Published var name = "Guest"
}

struct ProfileView: View {
    @StateObject private var viewModel = ProfileViewModel()

    var body: some View {
        Text(viewModel.name)
    }
}
```

Use `@StateObject` when the view creates the ViewModel.

---

### Q39. What is @ObservedObject?

`@ObservedObject` observes an object passed from outside.

```swift
class CounterViewModel: ObservableObject {
    @Published var count = 0
}

struct CounterView: View {
    @ObservedObject var viewModel: CounterViewModel

    var body: some View {
        Button("Count: \(viewModel.count)") {
            viewModel.count += 1
        }
    }
}
```

Use `@ObservedObject` when parent owns the object.

---

### Q40. What is @EnvironmentObject?

`@EnvironmentObject` shares an object across many views.

```swift
class AppSession: ObservableObject {
    @Published var isLoggedIn = false
}

struct HomeView: View {
    @EnvironmentObject var session: AppSession

    var body: some View {
        Text(session.isLoggedIn ? "Logged In" : "Guest")
    }
}
```

Inject:

```swift
HomeView()
    .environmentObject(AppSession())
```

---

### Q41. What is @Published?

`@Published` notifies SwiftUI when a value changes.

```swift
class UserViewModel: ObservableObject {
    @Published var username = "Guest"

    func updateName() {
        username = "Envobyte"
    }
}
```

When `username` changes, UI updates automatically.

---

### Q42. What is NavigationStack?

`NavigationStack` is used for navigation in SwiftUI.

```swift
struct HomeView: View {
    var body: some View {
        NavigationStack {
            NavigationLink("Go to Details") {
                DetailsView()
            }
            .navigationTitle("Home")
        }
    }
}

struct DetailsView: View {
    var body: some View {
        Text("Details")
            .navigationTitle("Details")
    }
}
```

---

### Q43. What is List in SwiftUI?

`List` shows scrollable rows.

```swift
struct UserListView: View {
    let users = ["Envobyte", "John", "Sarah"]

    var body: some View {
        List(users, id: \.self) { user in
            Text(user)
        }
    }
}
```

---

### Q44. What is the difference between List and ScrollView?

```text
List       = optimized list with built-in row behavior
ScrollView = flexible custom scrolling layout
```

Example:

```swift
ScrollView {
    VStack {
        ForEach(1...50, id: \.self) { item in
            Text("Item \(item)")
        }
    }
}
```

Use `List` for normal lists.  
Use `ScrollView` for custom designs.

---

# 8. UIKit Basics

---

### Q45. What is UIKit?

UIKit is Apple's older UI framework for building iOS apps.

UIKit uses:

- UIViewController
- UIView
- UILabel
- UIButton
- UITableView
- UICollectionView
- Auto Layout

UIKit is still important because many production apps use it.

---

### Q46. What is UIViewController?

`UIViewController` manages one screen.

```swift
import UIKit

class HomeViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
    }
}
```

---

### Q47. What is UIViewController lifecycle?

Important lifecycle methods:

```swift
override func viewDidLoad() {
    super.viewDidLoad()
    print("View loaded")
}

override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    print("View will appear")
}

override func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    print("View appeared")
}

override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    print("View will disappear")
}

override func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(animated)
    print("View disappeared")
}
```

Simple meaning:

```text
viewDidLoad        Called once when view loads
viewWillAppear     Called before screen appears
viewDidAppear      Called after screen appears
viewWillDisappear  Called before screen disappears
viewDidDisappear   Called after screen disappears
```

---

### Q48. What is Auto Layout?

Auto Layout is a system for creating responsive layouts.

Example:

```swift
let label = UILabel()
label.text = "Hello UIKit"
label.translatesAutoresizingMaskIntoConstraints = false

view.addSubview(label)

NSLayoutConstraint.activate([
    label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
    label.centerYAnchor.constraint(equalTo: view.centerYAnchor)
])
```

---

### Q49. What is UITableView?

`UITableView` displays vertical lists.

```swift
class UserTableViewController: UITableViewController {
    let users = ["Envobyte", "John", "Sarah"]

    override func tableView(
        _ tableView: UITableView,
        numberOfRowsInSection section: Int
    ) -> Int {
        return users.count
    }

    override func tableView(
        _ tableView: UITableView,
        cellForRowAt indexPath: IndexPath
    ) -> UITableViewCell {
        let cell = UITableViewCell()
        cell.textLabel?.text = users[indexPath.row]
        return cell
    }
}
```

---

### Q50. What is UICollectionView?

`UICollectionView` displays grid or custom layouts.

Use cases:

- Photo gallery
- Product grid
- Dashboard cards
- Horizontal list
- Custom complex lists

Simple explanation:

```text
UITableView is mainly for vertical rows.
UICollectionView is more flexible and supports grid/custom layouts.
```

---

### Q51. Can SwiftUI and UIKit work together?

Yes.

Use UIKit inside SwiftUI:

```swift
import SwiftUI
import UIKit

struct UIKitLabelView: UIViewRepresentable {
    func makeUIView(context: Context) -> UILabel {
        let label = UILabel()
        label.text = "UIKit inside SwiftUI"
        return label
    }

    func updateUIView(_ uiView: UILabel, context: Context) {}
}
```

Use SwiftUI inside UIKit:

```swift
let swiftUIView = UIHostingController(rootView: Text("SwiftUI inside UIKit"))
```

---

# 9. App Lifecycle

---

### Q52. What is App lifecycle in iOS?

App lifecycle means how the app moves between states.

Common states:

```text
Not Running
Inactive
Active
Background
Suspended
```

---

### Q53. What is SceneDelegate?

`SceneDelegate` manages UI scene lifecycle in UIKit apps.

Important methods:

```swift
func sceneDidBecomeActive(_ scene: UIScene) {
    print("App active")
}

func sceneWillResignActive(_ scene: UIScene) {
    print("App inactive")
}

func sceneDidEnterBackground(_ scene: UIScene) {
    print("App background")
}

func sceneWillEnterForeground(_ scene: UIScene) {
    print("App foreground")
}
```

---

### Q54. What is @main in SwiftUI app?

`@main` marks the app entry point.

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

This is the starting point of a SwiftUI app.

---

# 10. Networking

---

### Q55. How do you call an API in iOS?

Use `URLSession`.

```swift
struct Post: Codable {
    let id: Int
    let title: String
}

func fetchPosts() async throws -> [Post] {
    let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!

    let (data, response) = try await URLSession.shared.data(from: url)

    guard let httpResponse = response as? HTTPURLResponse,
          httpResponse.statusCode == 200 else {
        throw URLError(.badServerResponse)
    }

    return try JSONDecoder().decode([Post].self, from: data)
}
```

---

### Q56. What is Codable?

`Codable` allows Swift models to convert to/from JSON.

```swift
struct User: Codable {
    let id: Int
    let name: String
}
```

Decode JSON:

```swift
let user = try JSONDecoder().decode(User.self, from: data)
```

Encode JSON:

```swift
let data = try JSONEncoder().encode(user)
```

---

### Q57. How do you send a POST request?

```swift
struct LoginRequest: Codable {
    let email: String
    let password: String
}

func login(email: String, password: String) async throws {
    let url = URL(string: "https://example.com/login")!

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")

    let body = LoginRequest(email: email, password: password)
    request.httpBody = try JSONEncoder().encode(body)

    let (_, response) = try await URLSession.shared.data(for: request)

    print(response)
}
```

---

### Q58. How do you add authorization token in API request?

```swift
func fetchProfile(token: String) async throws {
    let url = URL(string: "https://example.com/profile")!

    var request = URLRequest(url: url)
    request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")

    let (_, response) = try await URLSession.shared.data(for: request)

    print(response)
}
```

---

### Q59. How do you handle API errors?

Create a custom error.

```swift
enum APIError: Error {
    case invalidURL
    case invalidResponse
    case decodingFailed
    case serverError(Int)
}
```

Use it:

```swift
guard let httpResponse = response as? HTTPURLResponse else {
    throw APIError.invalidResponse
}

if httpResponse.statusCode >= 500 {
    throw APIError.serverError(httpResponse.statusCode)
}
```

---

# 11. Local Storage

---

### Q60. What is UserDefaults?

`UserDefaults` stores small key-value data.

```swift
UserDefaults.standard.set(true, forKey: "isPremium")

let isPremium = UserDefaults.standard.bool(forKey: "isPremium")
```

Use for:

- App settings
- Small flags
- Simple preferences

Do not store sensitive data here.

---

### Q61. What is AppStorage?

`@AppStorage` is SwiftUI wrapper for UserDefaults.

```swift
struct SettingsView: View {
    @AppStorage("isDarkMode") private var isDarkMode = false

    var body: some View {
        Toggle("Dark Mode", isOn: $isDarkMode)
    }
}
```

---

### Q62. What is Keychain?

Keychain securely stores sensitive data.

Use Keychain for:

- Auth token
- Refresh token
- Password
- Secret keys

Simple explanation:

```text
UserDefaults = normal small data
Keychain     = sensitive secure data
```

---

### Q63. What is FileManager?

`FileManager` handles local files.

```swift
func saveTextFile() {
    let text = "Hello iOS"

    let url = FileManager.default.urls(
        for: .documentDirectory,
        in: .userDomainMask
    )[0].appendingPathComponent("note.txt")

    try? text.write(to: url, atomically: true, encoding: .utf8)
}
```

---

### Q64. What is Core Data?

Core Data is Apple's object graph and persistence framework.

Use Core Data for:

- Offline database
- Large local data
- Complex relationships
- Caching

---

### Q65. What is SwiftData?

SwiftData is Apple's modern persistence framework.

```swift
import SwiftData

@Model
class Note {
    var title: String

    init(title: String) {
        self.title = title
    }
}
```

SwiftData is easier and more SwiftUI-friendly than Core Data.

---

# 12. Concurrency

---

### Q66. What is concurrency?

Concurrency means doing multiple tasks without blocking the app.

Examples:

- API call
- Image loading
- File processing
- Database query
- Background task

---

### Q67. What is async/await?

`async/await` is modern Swift concurrency.

```swift
func fetchName() async -> String {
    return "Envobyte"
}

Task {
    let name = await fetchName()
    print(name)
}
```

---

### Q68. What is Task?

`Task` starts asynchronous work.

```swift
Task {
    let data = await loadData()
    print(data)
}
```

Use Task in SwiftUI for async operations.

---

### Q69. What is MainActor?

`MainActor` ensures code runs on the main thread.

```swift
@MainActor
class ProfileViewModel: ObservableObject {
    @Published var username = "Guest"

    func updateName() {
        username = "Envobyte"
    }
}
```

UI updates should happen on main thread.

---

### Q70. What is actor?

Actor protects shared mutable state from data races.

```swift
actor Counter {
    private var value = 0

    func increment() {
        value += 1
    }

    func getValue() -> Int {
        return value
    }
}

let counter = Counter()

Task {
    await counter.increment()
    let value = await counter.getValue()
    print(value)
}
```

---

### Q71. What is GCD?

GCD means Grand Central Dispatch.

It is an older way to handle background tasks.

```swift
DispatchQueue.global().async {
    print("Background work")

    DispatchQueue.main.async {
        print("Update UI")
    }
}
```

Modern Swift prefers `async/await`, but GCD is still useful to know.

---

# 13. Combine

---

### Q72. What is Combine?

Combine is Apple's reactive programming framework.

It handles asynchronous data streams.

Examples:

- Search text changes
- API responses
- Timer events
- Form validation
- State updates

---

### Q73. What is Publisher?

A Publisher emits values over time.

```swift
import Combine

let publisher = Just("Hello Combine")

let cancellable = publisher.sink { value in
    print(value)
}
```

---

### Q74. What is AnyCancellable?

`AnyCancellable` stores Combine subscriptions.

```swift
var cancellables = Set<AnyCancellable>()
```

If you do not store the subscription, it may be cancelled immediately.

---

# 14. Architecture

---

### Q75. What is MVVM?

MVVM means:

```text
Model      = Data
View       = UI
ViewModel  = State and business logic
```

Example:

```swift
struct Product: Identifiable {
    let id = UUID()
    let name: String
}

class ProductViewModel: ObservableObject {
    @Published var products: [Product] = []

    func loadProducts() {
        products = [
            Product(name: "Monthly Plan"),
            Product(name: "Yearly Plan")
        ]
    }
}

struct ProductView: View {
    @StateObject private var viewModel = ProductViewModel()

    var body: some View {
        List(viewModel.products) { product in
            Text(product.name)
        }
        .onAppear {
            viewModel.loadProducts()
        }
    }
}
```

---

### Q76. Why use MVVM?

MVVM helps with:

- Cleaner code
- Testability
- Separation of concerns
- Better state management
- Easier maintenance

---

### Q77. What is Clean Architecture?

Clean Architecture separates code into layers.

```text
Presentation Layer
    View
    ViewModel

Domain Layer
    Use Cases
    Repository Protocols
    Business Models

Data Layer
    API
    Database
    Repository Implementation
```

Simple flow:

```text
View → ViewModel → UseCase → Repository → API/Database
```

---

### Q78. What is Repository Pattern?

Repository hides data source details.

```swift
protocol UserRepositoryProtocol {
    func getUsers() async throws -> [String]
}

class UserRepository: UserRepositoryProtocol {
    func getUsers() async throws -> [String] {
        return ["Envobyte", "John"]
    }
}
```

ViewModel depends on protocol:

```swift
class UserViewModel: ObservableObject {
    @Published var users: [String] = []

    private let repository: UserRepositoryProtocol

    init(repository: UserRepositoryProtocol) {
        self.repository = repository
    }

    func loadUsers() async {
        users = (try? await repository.getUsers()) ?? []
    }
}
```

---

### Q79. What is Dependency Injection?

Dependency Injection means passing required objects from outside.

```swift
class AuthViewModel {
    private let repository: UserRepositoryProtocol

    init(repository: UserRepositoryProtocol) {
        self.repository = repository
    }
}
```

Benefits:

- Easier testing
- Flexible code
- Less tight coupling

---

### Q80. What is Coordinator Pattern?

Coordinator Pattern handles navigation outside ViewController or View.

UIKit example:

```swift
class AppCoordinator {
    func start() {
        print("Start app navigation")
    }

    func showLogin() {
        print("Show login screen")
    }

    func showHome() {
        print("Show home screen")
    }
}
```

It keeps navigation logic clean.

---

# 15. Testing

---

### Q81. What is unit testing?

Unit testing checks small pieces of code.

```swift
import XCTest

struct Calculator {
    func add(_ a: Int, _ b: Int) -> Int {
        return a + b
    }
}

final class CalculatorTests: XCTestCase {
    func testAdd() {
        let calculator = Calculator()

        let result = calculator.add(2, 3)

        XCTAssertEqual(result, 5)
    }
}
```

---

### Q82. How do you test ViewModel?

```swift
final class LoginViewModelTests: XCTestCase {
    func testValidEmail() {
        let viewModel = LoginViewModel()

        XCTAssertTrue(viewModel.isValidEmail("test@example.com"))
    }
}

class LoginViewModel {
    func isValidEmail(_ email: String) -> Bool {
        return email.contains("@") && email.contains(".")
    }
}
```

---

### Q83. What is mocking?

Mocking means creating fake dependencies for testing.

```swift
class MockUserRepository: UserRepositoryProtocol {
    func getUsers() async throws -> [String] {
        return ["Mock User"]
    }
}
```

Use mock in test:

```swift
let viewModel = UserViewModel(repository: MockUserRepository())
```

---

### Q84. What is UI testing?

UI testing checks app screens and user interactions.

Example use cases:

- Tap login button
- Type email
- Check text appears
- Navigate screen

Simple concept:

```text
Unit test checks logic.
UI test checks user interface behavior.
```

---

# 16. Security

---

### Q85. Where should you store authentication tokens?

Use Keychain.

```text
Good:
Keychain

Bad:
UserDefaults
Plain text file
Hardcoded variable
```

---

### Q86. What is SSL pinning?

SSL pinning helps ensure the app talks only to the trusted server certificate/public key.

It protects against some man-in-the-middle attacks.

Simple explanation:

```text
Normal HTTPS checks if certificate is trusted.
SSL pinning checks if certificate/public key matches your expected server.
```

---

### Q87. What is App Transport Security?

App Transport Security encourages secure HTTPS connections.

Use:

```text
https://api.example.com
```

Avoid:

```text
http://api.example.com
```

---

### Q88. What are common iOS security mistakes?

Common mistakes:

```text
Storing token in UserDefaults
Hardcoding API keys
Logging sensitive data
Using HTTP instead of HTTPS
No certificate validation
Weak backend validation
No jailbreak/root detection for high-risk apps
Saving private files without protection
Exposing debug builds
```

---

### Q89. How do you protect sensitive files?

Use file protection.

```swift
try? FileManager.default.setAttributes(
    [.protectionKey: FileProtectionType.complete],
    ofItemAtPath: fileURL.path
)
```

This helps protect files when device is locked.

---

# 17. Performance

---

### Q90. How do you improve iOS app performance?

Important techniques:

```text
Avoid heavy work on main thread
Use lazy loading
Optimize images
Use Instruments
Avoid memory leaks
Reduce unnecessary SwiftUI updates
Cache data properly
Optimize app launch time
Use background queues
Reuse cells in UIKit
Avoid large JSON parsing on main thread
```

---

### Q91. What causes UI freezing?

UI freezes when heavy work runs on the main thread.

Bad:

```swift
func buttonTapped() {
    let result = heavyCalculation()
    print(result)
}
```

Better:

```swift
Task.detached {
    let result = heavyCalculation()

    await MainActor.run {
        print(result)
    }
}
```

---

### Q92. What is Instruments?

Instruments is Apple’s performance analysis tool.

Use Instruments to find:

- Memory leaks
- CPU usage
- Network usage
- Energy usage
- App launch time
- Slow code
- Retain cycles

---

### Q93. What is a memory leak?

A memory leak happens when unused objects are not removed from memory.

Common causes:

- Retain cycles
- Strong closure references
- Timers not invalidated
- Notification observers not removed
- Long-living references

---

### Q94. How do you optimize images?

Best practices:

```text
Use correct image size
Avoid loading huge images
Use lazy loading
Cache images
Compress images
Use async image loading
Use thumbnails where possible
```

SwiftUI example:

```swift
AsyncImage(url: URL(string: "https://example.com/image.jpg")) { image in
    image.resizable()
} placeholder: {
    ProgressView()
}
```

---

# 18. App Store and Release

---

### Q95. What is TestFlight?

TestFlight is Apple’s tool for beta testing iOS apps before App Store release.

Use TestFlight for:

- Internal testing
- External testing
- QA testing
- Client review
- Pre-release feedback

---

### Q96. What is App Store Connect?

App Store Connect is Apple’s platform to manage apps.

You use it for:

- Uploading builds
- App metadata
- Screenshots
- Pricing
- Subscriptions
- TestFlight
- App review
- Analytics
- Crash reports

---

### Q97. What is provisioning profile?

A provisioning profile connects:

```text
App ID
Certificate
Device IDs
Entitlements
```

It allows the app to run on devices or be distributed.

---

### Q98. What is code signing?

Code signing proves the app was built by a trusted developer.

iOS apps must be signed before running on real devices or App Store.

---

### Q99. What is app entitlement?

Entitlements give special capabilities to an app.

Examples:

```text
Push Notifications
iCloud
App Groups
Sign in with Apple
Associated Domains
Keychain Sharing
In-App Purchase
```

---

# 19. Push Notifications

---

### Q100. What is push notification?

Push notification allows server to send messages to user device.

Common use cases:

- Chat message
- Order update
- Reminder
- Marketing notification
- Subscription alert

---

### Q101. What is APNs?

APNs means Apple Push Notification service.

Flow:

```text
Backend server
   ↓
APNs
   ↓
User device
```

---

### Q102. How do you request notification permission?

```swift
import UserNotifications

UNUserNotificationCenter.current().requestAuthorization(
    options: [.alert, .badge, .sound]
) { granted, error in
    print("Permission granted: \(granted)")
}
```

---

# 20. Advanced iOS Topics

---

### Q103. What is AVFoundation?

AVFoundation is used for audio and video.

Use cases:

- Camera
- Video recording
- Audio recording
- Video player
- Audio processing
- Media editing

---

### Q104. What is Vision framework?

Vision framework is used for image analysis.

Use cases:

- OCR
- Face detection
- Object detection
- Barcode scanning
- Image classification

---

### Q105. What is CoreML?

CoreML allows running machine learning models on-device.

Use cases:

- Text classification
- Image recognition
- Prediction
- Audio analysis
- AI-powered features

---

### Q106. What is WidgetKit?

WidgetKit is used to create iOS home screen widgets.

Use cases:

- Weather widget
- Task widget
- Reminder widget
- App summary widget
- Quick status widget

---

### Q107. What is App Intents?

App Intents allow your app features to work with Siri, Shortcuts, Spotlight, and system actions.

Example:

```swift
import AppIntents

struct OpenScannerIntent: AppIntent {
    static var title: LocalizedStringResource = "Open Scanner"

    func perform() async throws -> some IntentResult {
        return .result()
    }
}
```

---

### Q108. What is Background Task?

Background tasks allow limited work when app is not active.

Use cases:

- Refresh content
- Upload file
- Process data
- Sync data
- Finish important work

iOS controls background execution strictly to save battery.

---

### Q109. What is Deep Linking?

Deep linking opens a specific screen from a URL.

Example:

```text
myapp://product/10
```

SwiftUI handling:

```swift
ContentView()
    .onOpenURL { url in
        print("Opened URL: \(url)")
    }
```

---

### Q110. What is Universal Link?

Universal Link opens your app from a normal web URL.

Example:

```text
https://example.com/product/10
```

If app is installed, it opens the app.  
If app is not installed, it opens the website.

---

# 21. Practical Scenario Questions

---

### Q111. How would you design a login screen?

Answer:

```text
I would use MVVM architecture.

View:
- Email field
- Password field
- Login button
- Loading state
- Error message

ViewModel:
- Validate email/password
- Call login API
- Save token securely in Keychain
- Update UI state

Repository:
- Send login request to backend

Security:
- Store token in Keychain
- Use HTTPS
- Do not log password/token
```

Simple UI state:

```swift
struct LoginUiState {
    var email: String = ""
    var password: String = ""
    var isLoading: Bool = false
    var errorMessage: String?
}
```

---

### Q112. How would you handle API loading, success, and error state?

Use enum.

```swift
enum ViewState<T> {
    case idle
    case loading
    case success(T)
    case error(String)
}
```

Example:

```swift
@Published var state: ViewState<[User]> = .idle
```

This makes UI state clean.

---

### Q113. How would you optimize a slow screen?

Steps:

```text
Check main thread work
Use Instruments
Check network delay
Check large image loading
Check memory usage
Check unnecessary recomposition/state updates
Lazy load data
Cache API response
Move heavy work to background
Optimize database query
```

---

### Q114. How would you debug a crash?

Steps:

```text
Read crash log
Check stack trace
Reproduce issue
Use breakpoints
Check optional force unwrap
Check array index out of range
Check threading issue
Check memory issue
Fix root cause
Add test if possible
```

---

### Q115. How would you secure an iOS app?

Answer:

```text
Use HTTPS
Store tokens in Keychain
Avoid hardcoded secrets
Do not log sensitive data
Validate data on backend
Use certificate pinning for high-risk apps
Use file protection
Handle jailbreak risk if needed
Use proper authentication
Use token expiration
Keep dependencies updated
```

---

### Q116. How would you structure a large iOS project?

Example structure:

```text
App/
Core/
    Network/
    Database/
    Security/
    Extensions/
    Utilities/
Features/
    Auth/
        View/
        ViewModel/
        Model/
        Repository/
    Home/
    Profile/
    Settings/
Shared/
    Components/
    Theme/
Resources/
Tests/
```

Clean flow:

```text
View → ViewModel → UseCase → Repository → API/Database
```

---

# 22. Coding Interview Questions

---

### Q117. Reverse a string in Swift

```swift
func reverseString(_ text: String) -> String {
    return String(text.reversed())
}

print(reverseString("Swift"))
```

Output:

```text
tfiwS
```

---

### Q118. Check palindrome

```swift
func isPalindrome(_ text: String) -> Bool {
    let cleaned = text.lowercased()
    return cleaned == String(cleaned.reversed())
}

print(isPalindrome("madam"))
print(isPalindrome("hello"))
```

---

### Q119. Find maximum number

```swift
func findMax(_ numbers: [Int]) -> Int? {
    return numbers.max()
}

print(findMax([10, 5, 20, 7]) ?? 0)
```

---

### Q120. Remove duplicates from array

```swift
func removeDuplicates(_ numbers: [Int]) -> [Int] {
    return Array(Set(numbers))
}

print(removeDuplicates([1, 2, 2, 3, 4, 4]))
```

If order matters:

```swift
func removeDuplicatesKeepingOrder(_ numbers: [Int]) -> [Int] {
    var seen = Set<Int>()
    var result: [Int] = []

    for number in numbers {
        if !seen.contains(number) {
            seen.insert(number)
            result.append(number)
        }
    }

    return result
}
```

---

### Q121. Count character frequency

```swift
func characterCount(_ text: String) -> [Character: Int] {
    var result: [Character: Int] = [:]

    for char in text {
        result[char, default: 0] += 1
    }

    return result
}

print(characterCount("hello"))
```

---

### Q122. FizzBuzz

```swift
func fizzBuzz() {
    for number in 1...100 {
        if number % 3 == 0 && number % 5 == 0 {
            print("FizzBuzz")
        } else if number % 3 == 0 {
            print("Fizz")
        } else if number % 5 == 0 {
            print("Buzz")
        } else {
            print(number)
        }
    }
}
```

---

# 23. Senior-Level Questions

---

### Q123. How do you decide between SwiftUI and UIKit?

Answer:

```text
Use SwiftUI:
- New apps
- Faster UI development
- Declarative UI
- Modern Apple ecosystem
- Simple to medium complex UI

Use UIKit:
- Existing legacy apps
- Complex custom controls
- Advanced collection layouts
- Better mature control over UI
- When team already uses UIKit

Best senior answer:
I can work with both and also integrate SwiftUI inside UIKit or UIKit inside SwiftUI when needed.
```

---

### Q124. How do you prevent massive ViewModels?

Answer:

```text
Move business logic into UseCases
Move API/database logic into Repository
Use smaller feature-specific ViewModels
Keep ViewModel focused on UI state
Use services for reusable logic
Use dependency injection
```

Bad:

```text
ViewModel does API + validation + database + navigation + formatting
```

Good:

```text
ViewModel handles UI state and calls UseCases
```

---

### Q125. How do you handle offline-first apps?

Answer:

```text
Store data locally
Show cached data first
Sync with server when internet is available
Handle conflict resolution
Queue pending operations
Use background sync
Show sync status to user
```

Flow:

```text
UI → Local Database → Repository → API Sync
```

---

### Q126. How do you handle token refresh?

Answer:

```text
Access token expires quickly
Refresh token lives longer
When API returns 401, call refresh token API
Save new access token securely
Retry original request
If refresh fails, logout user
```

Important:

```text
Store tokens in Keychain.
Never store tokens in plain UserDefaults.
```

---

### Q127. How do you handle large file upload?

Answer:

```text
Use background URLSession
Show upload progress
Support retry
Validate file size
Compress file if needed
Handle network failure
Do not block main thread
Secure upload API
```

---

### Q128. How do you improve app launch time?

Answer:

```text
Avoid heavy work in app startup
Delay non-critical SDK initialization
Optimize dependency loading
Reduce initial API calls
Use lazy loading
Avoid large database work on main thread
Profile with Instruments
```

---

### Q129. How do you make iOS app scalable?

Answer:

```text
Use clean architecture
Feature-based modules
Dependency injection
Reusable components
Clear state management
Good error handling
Testing
Logging
Documentation
CI/CD
```

---

### Q130. What makes you a strong iOS developer?

A strong answer:

```text
A strong iOS developer does not only write UI.
They build stable, secure, fast, maintainable, and user-friendly apps.

They understand:
- Swift deeply
- SwiftUI and UIKit
- Architecture
- API integration
- Local storage
- Memory management
- Performance
- Security
- Testing
- App Store release
- Product experience
```

---

# Final Interview Preparation Checklist

Before an iOS interview, revise these topics:

```text
Swift basics
Optionals
Struct vs Class
Protocol
Extension
Generics
Closure
ARC
Weak and unowned
Retain cycle
SwiftUI state management
UIKit lifecycle
Navigation
URLSession
Codable
Async/await
MainActor
Actor
UserDefaults
Keychain
Core Data / SwiftData
MVVM
Clean Architecture
Repository Pattern
Dependency Injection
Testing
Debugging
Performance
Security
Push Notification
App Store release
Advanced frameworks
```

---

# Final Advice

For interviews, do not memorize only definitions.

For every question, answer in this format:

```text
1. Simple definition
2. Why it is used
3. Small example
4. Real app use case
```

Example:

```text
Question: What is Keychain?

Answer:
Keychain is secure storage provided by Apple.
It is used to store sensitive data like auth tokens and passwords.
Unlike UserDefaults, Keychain is encrypted and more secure.
In real apps, I would store access tokens and refresh tokens in Keychain, not in UserDefaults.
```

This style sounds professional, practical, and interview-ready.
