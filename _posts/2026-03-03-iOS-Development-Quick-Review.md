---
title: iOS Development Quick Review
description: A concise summary of essential iOS concepts and frequently asked questions compiled to strengthen understanding and support technical preparation.
author: tawhidmonowar
date: 2026-03-03 11:30:00 +06:00
categories: [Development, iOS Development]
---


# Outstanding iOS Developer Skills — Complete Notes with Swift Examples

To become an outstanding iOS developer, you need to master Swift, SwiftUI, UIKit, architecture, networking, storage, performance, security, testing, debugging, App Store release, and product thinking.

---

## 1. Swift Mastery

Swift is the core programming language for iOS development. A strong iOS developer should deeply understand Swift fundamentals, not only how to write code.

---

### Variables and Constants

Swift uses `var` for changeable values and `let` for fixed values.

```swift
import Foundation

let appName = "My iOS App"   // Constant value
var downloadCount = 100      // Variable value

downloadCount = 150

print(appName)
print(downloadCount)
```

---

### Struct

A `struct` is a value type. It is commonly used for models in Swift.

```swift
struct User {
    let id: Int
    var name: String
    var isPremium: Bool
}

let user = User(id: 1, name: "Envobyte", isPremium: true)

print(user.name)
```

---

### Class

A `class` is a reference type. It is useful when you need shared object references.

```swift
class UserManager {
    var username: String = "Guest"

    func updateName(_ name: String) {
        username = name
    }
}

let manager = UserManager()
manager.updateName("Envobyte")

print(manager.username)
```

---

### Value Type vs Reference Type

Structs are copied when assigned. Classes share the same reference.

```swift
struct ProfileStruct {
    var name: String
}

class ProfileClass {
    var name: String

    init(name: String) {
        self.name = name
    }
}

// Struct example
var profile1 = ProfileStruct(name: "A")
var profile2 = profile1

profile2.name = "B"

print(profile1.name) // A
print(profile2.name) // B

// Class example
let classProfile1 = ProfileClass(name: "A")
let classProfile2 = classProfile1

classProfile2.name = "B"

print(classProfile1.name) // B
print(classProfile2.name) // B
```

---

### Optionals

Optionals are used when a value may or may not exist.

```swift
var username: String? = "Envobyte"

if let name = username {
    print("Username is \(name)")
} else {
    print("Username not found")
}
```

---

### Guard Let

`guard let` is commonly used to safely unwrap optionals and return early.

```swift
func showUserName(_ name: String?) {
    guard let name = name else {
        print("No name found")
        return
    }

    print("User name is \(name)")
}

showUserName("Envobyte")
showUserName(nil)
```

---

### Closures

Closures are blocks of code that can be passed around like functions.

```swift
let greeting: (String) -> String = { name in
    return "Hello, \(name)"
}

print(greeting("Envobyte"))
```

---

### Protocols

Protocols define rules that a class, struct, or enum must follow.

```swift
protocol Downloadable {
    func download()
}

struct VideoDownloader: Downloadable {
    func download() {
        print("Video download started")
    }
}

let downloader = VideoDownloader()
downloader.download()
```

---

### Extensions

Extensions allow you to add new functionality to existing types.

```swift
extension String {
    func addWelcomeText() -> String {
        return "Welcome, \(self)"
    }
}

let name = "Envobyte"
print(name.addWelcomeText())
```

---

### Generics

Generics allow you to write reusable and flexible code.

```swift
func printValue<T>(_ value: T) {
    print(value)
}

printValue("Hello")
printValue(100)
printValue(true)
```

---

### Error Handling

Swift uses `do`, `try`, and `catch` for error handling.

```swift
enum LoginError: Error {
    case invalidPassword
    case userNotFound
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

### Async/Await

`async/await` is used for modern asynchronous code.

```swift
import Foundation

func fetchUserName() async -> String {
    return "Envobyte"
}

Task {
    let name = await fetchUserName()
    print(name)
}
```

---

### ARC and Memory Management

Swift uses ARC, which means Automatic Reference Counting. It automatically manages memory for class instances.

```swift
class User {
    let name: String

    init(name: String) {
        self.name = name
        print("\(name) created")
    }

    deinit {
        print("\(name) removed from memory")
    }
}

var user: User? = User(name: "Envobyte")
user = nil
```

---

## 2. SwiftUI

SwiftUI is Apple's modern declarative UI framework. It allows developers to build user interfaces with less code and cleaner structure.

---

### Layout

SwiftUI supports layout systems based on stacks such as `VStack`, `HStack`, and `ZStack`. This system simplifies the alignment of components in the current view. It also allows nesting of views.

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("TutorialsPoint")
                .font(.title)

            Text("Learn SwiftUI")
                .font(.subheadline)
        }
    }
}
```

---

### HStack

`HStack` arranges views horizontally.

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        HStack {
            Image(systemName: "star.fill")
            Text("Premium User")
        }
        .font(.title)
        .padding()
    }
}
```

---

### ZStack

`ZStack` places views on top of each other.

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        ZStack {
            Color.blue
                .ignoresSafeArea()

            Text("Welcome")
                .font(.largeTitle)
                .foregroundStyle(.white)
        }
    }
}
```

---

### State Management with @State

`@State` is used when a view owns a simple value that can change.

```swift
import SwiftUI

struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack {
            Text("Count: \(count)")
                .font(.title)

            Button("Increase") {
                count += 1
            }
        }
        .padding()
    }
}
```

---

### Binding with @Binding

`@Binding` is used to pass a mutable value from parent view to child view.

```swift
import SwiftUI

struct ParentView: View {
    @State private var isOn = false

    var body: some View {
        ToggleChildView(isOn: $isOn)
    }
}

struct ToggleChildView: View {
    @Binding var isOn: Bool

    var body: some View {
        Toggle("Enable Feature", isOn: $isOn)
            .padding()
    }
}
```

---

### ObservableObject

`ObservableObject` is used when a class manages state for a view.

```swift
import SwiftUI

class ProfileViewModel: ObservableObject {
    @Published var username = "Guest"

    func updateName() {
        username = "Envobyte"
    }
}

struct ProfileView: View {
    @StateObject private var viewModel = ProfileViewModel()

    var body: some View {
        VStack {
            Text(viewModel.username)
                .font(.title)

            Button("Update Name") {
                viewModel.updateName()
            }
        }
    }
}
```

---

### Navigation

SwiftUI uses `NavigationStack` for screen navigation.

```swift
import SwiftUI

struct HomeView: View {
    var body: some View {
        NavigationStack {
            VStack {
                NavigationLink("Go to Details") {
                    DetailsView()
                }
            }
            .navigationTitle("Home")
        }
    }
}

struct DetailsView: View {
    var body: some View {
        Text("Details Screen")
            .navigationTitle("Details")
    }
}
```

---

### List

`List` is used to show scrollable rows.

```swift
import SwiftUI

struct UserListView: View {
    let users = ["Envobyte", "Alex", "John", "Sarah"]

    var body: some View {
        List(users, id: \.self) { user in
            Text(user)
        }
        .navigationTitle("Users")
    }
}
```

---

### LazyVStack

`LazyVStack` loads content efficiently when scrolling.

```swift
import SwiftUI

struct LazyListView: View {
    var body: some View {
        ScrollView {
            LazyVStack {
                ForEach(1...100, id: \.self) { item in
                    Text("Item \(item)")
                        .padding()
                }
            }
        }
    }
}
```

---

### Sheet

A sheet is used to show a modal screen.

```swift
import SwiftUI

struct SheetExampleView: View {
    @State private var showSheet = false

    var body: some View {
        Button("Open Sheet") {
            showSheet = true
        }
        .sheet(isPresented: $showSheet) {
            Text("This is a sheet")
                .font(.title)
                .padding()
        }
    }
}
```

---

### Animation

SwiftUI makes animations simple with `withAnimation`.

```swift
import SwiftUI

struct AnimationView: View {
    @State private var isExpanded = false

    var body: some View {
        VStack {
            RoundedRectangle(cornerRadius: 20)
                .frame(width: isExpanded ? 250 : 120, height: 120)

            Button("Animate") {
                withAnimation {
                    isExpanded.toggle()
                }
            }
        }
    }
}
```

---

### Gesture

Gestures allow users to interact with views using touch.

```swift
import SwiftUI

struct GestureView: View {
    @State private var scale = 1.0

    var body: some View {
        Text("Tap Me")
            .font(.title)
            .scaleEffect(scale)
            .onTapGesture {
                scale += 0.2
            }
    }
}
```

---

### Dark Mode Support

SwiftUI automatically supports dark mode, but we can customize colors.

```swift
import SwiftUI

struct DarkModeView: View {
    var body: some View {
        Text("Adaptive Color")
            .padding()
            .background(Color(.systemBackground))
            .foregroundStyle(Color(.label))
    }
}
```

---

### Accessibility

Accessibility helps users with visual, hearing, or physical limitations use the app.

```swift
import SwiftUI

struct AccessibilityView: View {
    var body: some View {
        Button {
            print("Favorite tapped")
        } label: {
            Image(systemName: "heart.fill")
        }
        .accessibilityLabel("Add to favorites")
        .accessibilityHint("Double tap to save this item")
    }
}
```

---

## 3. UIKit

UIKit is Apple's older but still very powerful UI framework. Many production apps still use UIKit, so a professional iOS developer should understand it.

---

### UIViewController

`UIViewController` controls a screen in UIKit.

```swift
import UIKit

class HomeViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground

        let label = UILabel()
        label.text = "Hello UIKit"
        label.font = .systemFont(ofSize: 24)
        label.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(label)

        NSLayoutConstraint.activate([
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            label.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }
}
```

---

### UITableView

`UITableView` is used to display scrollable lists in UIKit.

```swift
import UIKit

class UserTableViewController: UITableViewController {
    let users = ["Envobyte", "Alex", "John"]

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
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

### SwiftUI and UIKit Interoperability

SwiftUI can show UIKit views using `UIViewControllerRepresentable`.

```swift
import SwiftUI
import UIKit

struct UIKitLabelView: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        let controller = UIViewController()
        controller.view.backgroundColor = .systemBackground

        let label = UILabel()
        label.text = "UIKit inside SwiftUI"
        label.translatesAutoresizingMaskIntoConstraints = false

        controller.view.addSubview(label)

        NSLayoutConstraint.activate([
            label.centerXAnchor.constraint(equalTo: controller.view.centerXAnchor),
            label.centerYAnchor.constraint(equalTo: controller.view.centerYAnchor)
        ])

        return controller
    }

    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
}
```

---

## 4. App Architecture

Architecture helps you build scalable, testable, and maintainable apps.

---

### MVVM

MVVM means Model, View, ViewModel.

- Model contains data.
- View displays UI.
- ViewModel handles business logic and state.

```swift
import SwiftUI

struct Product: Identifiable {
    let id = UUID()
    let name: String
    let price: Double
}

class ProductViewModel: ObservableObject {
    @Published var products: [Product] = []

    func loadProducts() {
        products = [
            Product(name: "Premium Plan", price: 9.99),
            Product(name: "Lifetime Plan", price: 49.99)
        ]
    }
}

struct ProductView: View {
    @StateObject private var viewModel = ProductViewModel()

    var body: some View {
        List(viewModel.products) { product in
            VStack(alignment: .leading) {
                Text(product.name)
                Text("$\(product.price)")
                    .font(.caption)
            }
        }
        .onAppear {
            viewModel.loadProducts()
        }
    }
}
```

---

### Repository Pattern

Repository pattern separates data source logic from UI logic.

```swift
import Foundation

struct UserModel: Codable {
    let id: Int
    let name: String
}

protocol UserRepositoryProtocol {
    func getUsers() async throws -> [UserModel]
}

class UserRepository: UserRepositoryProtocol {
    func getUsers() async throws -> [UserModel] {
        return [
            UserModel(id: 1, name: "Envobyte"),
            UserModel(id: 2, name: "John")
        ]
    }
}

class UserViewModel: ObservableObject {
    @Published var users: [UserModel] = []

    private let repository: UserRepositoryProtocol

    init(repository: UserRepositoryProtocol = UserRepository()) {
        self.repository = repository
    }

    func loadUsers() async {
        do {
            users = try await repository.getUsers()
        } catch {
            print("Failed to load users")
        }
    }
}
```

---

### Dependency Injection

Dependency Injection means passing dependencies from outside instead of creating them inside the class.

```swift
protocol PaymentService {
    func pay(amount: Double)
}

class StripePaymentService: PaymentService {
    func pay(amount: Double) {
        print("Paid \(amount) using Stripe")
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

let viewModel = CheckoutViewModel(paymentService: StripePaymentService())
viewModel.checkout()
```

---

## 5. Networking and APIs

Most real apps communicate with backend APIs. A professional iOS developer must know how to call APIs, parse JSON, handle errors, and manage authentication.

---

### URLSession GET Request

```swift
import Foundation

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

Task {
    do {
        let posts = try await fetchPosts()
        print(posts.first?.title ?? "No title")
    } catch {
        print("API error: \(error)")
    }
}
```

---

### POST Request

```swift
import Foundation

struct LoginRequest: Codable {
    let email: String
    let password: String
}

struct LoginResponse: Codable {
    let token: String
}

func login(email: String, password: String) async throws -> LoginResponse {
    let url = URL(string: "https://example.com/api/login")!

    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")

    let body = LoginRequest(email: email, password: password)
    request.httpBody = try JSONEncoder().encode(body)

    let (data, _) = try await URLSession.shared.data(for: request)

    return try JSONDecoder().decode(LoginResponse.self, from: data)
}
```

---

### Authorization Header

```swift
import Foundation

func fetchProfile(token: String) async throws {
    let url = URL(string: "https://example.com/api/profile")!

    var request = URLRequest(url: url)
    request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")

    let (_, response) = try await URLSession.shared.data(for: request)

    print(response)
}
```

---

## 6. Local Storage and Database

iOS apps need local storage for settings, cache, user sessions, and offline data.

---

### UserDefaults

Use `UserDefaults` for small simple values.

```swift
import Foundation

UserDefaults.standard.set(true, forKey: "isPremiumUser")

let isPremium = UserDefaults.standard.bool(forKey: "isPremiumUser")

print(isPremium)
```

---

### AppStorage

`@AppStorage` is a SwiftUI-friendly wrapper around `UserDefaults`.

```swift
import SwiftUI

struct SettingsView: View {
    @AppStorage("isDarkMode") private var isDarkMode = false

    var body: some View {
        Toggle("Dark Mode", isOn: $isDarkMode)
            .padding()
    }
}
```

---

### Keychain

Use Keychain for sensitive data like tokens and passwords.

```swift
import Foundation
import Security

class KeychainHelper {
    static func saveToken(_ token: String) {
        let data = Data(token.utf8)

        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: "authToken",
            kSecValueData as String: data
        ]

        SecItemDelete(query as CFDictionary)
        SecItemAdd(query as CFDictionary, nil)
    }
}
```

---

### FileManager

Use `FileManager` to save files locally.

```swift
import Foundation

func saveTextFile() {
    let text = "Hello iOS Developer"

    let fileURL = FileManager.default.urls(
        for: .documentDirectory,
        in: .userDomainMask
    )[0].appendingPathComponent("note.txt")

    do {
        try text.write(to: fileURL, atomically: true, encoding: .utf8)
        print("File saved at \(fileURL)")
    } catch {
        print("Failed to save file")
    }
}
```

---

### SwiftData

SwiftData is Apple's modern persistence framework.

```swift
import SwiftUI
import SwiftData

@Model
class Note {
    var title: String

    init(title: String) {
        self.title = title
    }
}

struct NotesView: View {
    @Environment(\.modelContext) private var context
    @Query private var notes: [Note]

    var body: some View {
        List(notes) { note in
            Text(note.title)
        }
        .toolbar {
            Button("Add") {
                let note = Note(title: "New Note")
                context.insert(note)
            }
        }
    }
}
```

---

## 7. Concurrency and Performance

Outstanding iOS developers know how to make apps fast, smooth, and memory-efficient.

---

### Task

`Task` is used to run asynchronous work.

```swift
import SwiftUI

struct TaskExampleView: View {
    @State private var username = "Loading..."

    var body: some View {
        Text(username)
            .task {
                username = await loadUser()
            }
    }

    func loadUser() async -> String {
        return "Envobyte"
    }
}
```

---

### MainActor

UI updates should happen on the main thread. `@MainActor` guarantees this.

```swift
import Foundation

@MainActor
class DashboardViewModel: ObservableObject {
    @Published var title = "Dashboard"

    func updateTitle() {
        title = "Updated Dashboard"
    }
}
```

---

### Actor

Actors protect shared mutable state from data races.

```swift
actor DownloadCounter {
    private var count = 0

    func increment() {
        count += 1
    }

    func getCount() -> Int {
        return count
    }
}

let counter = DownloadCounter()

Task {
    await counter.increment()
    let count = await counter.getCount()
    print(count)
}
```

---

### Avoid Heavy Work on Main Thread

Heavy work should run in the background to avoid UI freezing.

```swift
import Foundation

func processLargeData() async {
    let result = await Task.detached {
        // Heavy background work
        return (1...1_000_000).reduce(0, +)
    }.value

    print(result)
}
```

---

### Retain Cycle Prevention

Use `[weak self]` to avoid memory leaks inside closures.

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

## 8. iOS System Features

Professional apps often use native iOS capabilities such as camera, photos, notifications, background tasks, widgets, and deep links.

---

### Local Notification

```swift
import UserNotifications

func requestNotificationPermission() {
    UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
        print("Permission granted: \(granted)")
    }
}

func scheduleNotification() {
    let content = UNMutableNotificationContent()
    content.title = "Task Complete"
    content.body = "Your file has been processed successfully."
    content.sound = .default

    let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)

    let request = UNNotificationRequest(
        identifier: UUID().uuidString,
        content: content,
        trigger: trigger
    )

    UNUserNotificationCenter.current().add(request)
}
```

---

### Photo Picker

```swift
import SwiftUI
import PhotosUI

struct PhotoPickerView: View {
    @State private var selectedItem: PhotosPickerItem?

    var body: some View {
        PhotosPicker("Select Image", selection: $selectedItem, matching: .images)
            .padding()
    }
}
```

---

### Share Sheet

```swift
import SwiftUI
import UIKit

struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]

    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: items, applicationActivities: nil)
    }

    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

struct ShareExampleView: View {
    @State private var showShareSheet = false

    var body: some View {
        Button("Share") {
            showShareSheet = true
        }
        .sheet(isPresented: $showShareSheet) {
            ShareSheet(items: ["Hello from my iOS app"])
        }
    }
}
```

---

### Deep Link Handling

```swift
import SwiftUI

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .onOpenURL { url in
                    print("Opened URL: \(url)")
                }
        }
    }
}
```

---

## 9. Security

Security is very important in production iOS apps. Sensitive data should never be stored in plain text.

---

### Secure Token Storage

Use Keychain instead of UserDefaults for tokens.

```swift
// Good
KeychainHelper.saveToken("secure-token")

// Bad
UserDefaults.standard.set("secure-token", forKey: "token")
```

---

### App Transport Security

Always use HTTPS API URLs.

```swift
let secureURL = URL(string: "https://example.com/api/users")!
```

---

### Simple Hash Example

```swift
import Foundation
import CryptoKit

func sha256(_ text: String) -> String {
    let data = Data(text.utf8)
    let hash = SHA256.hash(data: data)

    return hash.compactMap {
        String(format: "%02x", $0)
    }.joined()
}

let result = sha256("Hello")
print(result)
```

---

### Secure API Request Idea

For high-security apps, you can sign requests with timestamp and nonce.

```swift
import Foundation

struct SecureRequestPayload: Codable {
    let path: String
    let timestamp: Int
    let nonce: String
    let body: String
}

let payload = SecureRequestPayload(
    path: "/api/order",
    timestamp: Int(Date().timeIntervalSince1970),
    nonce: UUID().uuidString,
    body: "{\"order_id\":123}"
)

print(payload)
```

---

## 10. App Store and Release Engineering

A real iOS developer should understand how to prepare, test, and release apps.

---

### Important Release Skills

You should learn:

- Apple Developer Account
- Bundle Identifier
- Certificates
- Provisioning Profiles
- App Signing
- TestFlight
- App Store Connect
- App Review Guidelines
- App Privacy Labels
- Crash Reporting
- Analytics
- CI/CD
- Fastlane

---

### App Version Example

```swift
import Foundation

func printAppVersion() {
    let version = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String
    let build = Bundle.main.infoDictionary?["CFBundleVersion"] as? String

    print("Version: \(version ?? "Unknown")")
    print("Build: \(build ?? "Unknown")")
}
```

---

### Environment Configuration

```swift
import Foundation

enum AppEnvironment {
    case development
    case staging
    case production

    var baseURL: String {
        switch self {
        case .development:
            return "https://dev.example.com"
        case .staging:
            return "https://staging.example.com"
        case .production:
            return "https://api.example.com"
        }
    }
}

let environment = AppEnvironment.staging
print(environment.baseURL)
```

---

## 11. Debugging Skills

Outstanding developers are strong debuggers. They know how to find problems quickly.

---

### Print Debugging

```swift
let username = "Envobyte"
print("Current username: \(username)")
```

---

### Debug Only Code

```swift
#if DEBUG
print("This log only appears in debug mode")
#endif
```

---

### Custom Logger

```swift
import Foundation

enum AppLogger {
    static func log(_ message: String) {
        #if DEBUG
        print("DEBUG LOG:", message)
        #endif
    }
}

AppLogger.log("User opened home screen")
```

---

### Useful Debugging Tools

You should master:

- Xcode Breakpoints
- LLDB Console
- Memory Graph Debugger
- Instruments
- Network Logs
- Console Logs
- Crash Logs
- View Hierarchy Debugger

---

## 12. Testing

Testing helps you build stable and professional apps.

---

### Unit Test

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

### ViewModel Test

```swift
import XCTest
import Foundation

class LoginViewModel {
    func isValidEmail(_ email: String) -> Bool {
        return email.contains("@") && email.contains(".")
    }
}

final class LoginViewModelTests: XCTestCase {
    func testValidEmail() {
        let viewModel = LoginViewModel()

        XCTAssertTrue(viewModel.isValidEmail("test@example.com"))
    }

    func testInvalidEmail() {
        let viewModel = LoginViewModel()

        XCTAssertFalse(viewModel.isValidEmail("wrong-email"))
    }
}
```

---

### Mock Repository

```swift
import XCTest

protocol ProductRepositoryProtocol {
    func getProducts() -> [String]
}

class MockProductRepository: ProductRepositoryProtocol {
    func getProducts() -> [String] {
        return ["Product A", "Product B"]
    }
}

class ProductListViewModel {
    private let repository: ProductRepositoryProtocol

    init(repository: ProductRepositoryProtocol) {
        self.repository = repository
    }

    func loadProducts() -> [String] {
        return repository.getProducts()
    }
}

final class ProductListViewModelTests: XCTestCase {
    func testLoadProducts() {
        let repository = MockProductRepository()
        let viewModel = ProductListViewModel(repository: repository)

        let products = viewModel.loadProducts()

        XCTAssertEqual(products.count, 2)
    }
}
```

---

## 13. Product and UX Thinking

A top iOS developer does not only write code. They also understand user experience, app flow, accessibility, and Apple design quality.

---

### Clean Button Design

```swift
import SwiftUI

struct PrimaryButton: View {
    let title: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.headline)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.blue)
                .foregroundStyle(.white)
                .clipShape(RoundedRectangle(cornerRadius: 14))
        }
        .padding(.horizontal)
    }
}
```

---

### Empty State UI

```swift
import SwiftUI

struct EmptyStateView: View {
    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "tray")
                .font(.largeTitle)

            Text("No Files Yet")
                .font(.title2)
                .bold()

            Text("Your scanned files will appear here after you create them.")
                .font(.body)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding()
    }
}
```

---

### Loading State

```swift
import SwiftUI

struct LoadingView: View {
    var body: some View {
        VStack(spacing: 12) {
            ProgressView()

            Text("Processing...")
                .foregroundStyle(.secondary)
        }
        .padding()
    }
}
```

---

### Error State

```swift
import SwiftUI

struct ErrorStateView: View {
    let message: String

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "exclamationmark.triangle")
                .font(.largeTitle)
                .foregroundStyle(.orange)

            Text("Something went wrong")
                .font(.headline)

            Text(message)
                .font(.body)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding()
    }
}
```

---

## 14. Advanced iOS Topics

After learning the core skills, you can move to advanced frameworks and high-value app features.

---

### AVFoundation

AVFoundation is used for audio and video features.

```swift
import AVFoundation

class AudioPlayerManager {
    private var player: AVAudioPlayer?

    func playSound(url: URL) {
        do {
            player = try AVAudioPlayer(contentsOf: url)
            player?.play()
        } catch {
            print("Failed to play audio")
        }
    }
}
```

---

### Vision Framework

Vision can be used for image analysis, OCR, face detection, and object detection.

```swift
import Vision
import UIKit

func recognizeText(from image: UIImage) {
    guard let cgImage = image.cgImage else { return }

    let request = VNRecognizeTextRequest { request, error in
        guard let observations = request.results as? [VNRecognizedTextObservation] else {
            return
        }

        for observation in observations {
            let text = observation.topCandidates(1).first?.string ?? ""
            print(text)
        }
    }

    let handler = VNImageRequestHandler(cgImage: cgImage)

    do {
        try handler.perform([request])
    } catch {
        print("Text recognition failed")
    }
}
```

---

### CoreML

CoreML is used to run machine learning models on-device.

```swift
import CoreML

func loadModel() {
    do {
        // Replace "MyModel" with your generated CoreML model class
        // let model = try MyModel(configuration: MLModelConfiguration())
        print("Model loaded successfully")
    } catch {
        print("Failed to load model")
    }
}
```

---

### Widgets

Widgets show app information on the home screen.

```swift
import WidgetKit
import SwiftUI

struct SimpleEntry: TimelineEntry {
    let date: Date
    let title: String
}

struct SimpleWidgetView: View {
    var entry: SimpleEntry

    var body: some View {
        Text(entry.title)
            .font(.headline)
            .padding()
    }
}
```

---

### App Intents

App Intents allow the system, Siri, and Shortcuts to interact with your app.

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

## 15. Build Real Apps

The fastest way to become an outstanding iOS developer is to build real apps.

You should build apps that include:

- Authentication
- API calling
- Local database
- File handling
- Payment flow
- Subscription screen
- Notifications
- Image picker
- Camera
- SwiftUI navigation
- MVVM architecture
- Error handling
- Loading states
- Offline support

---

### Mini Project Example: Notes App Structure

```swift
import SwiftUI

struct NoteItem: Identifiable {
    let id = UUID()
    var title: String
    var description: String
}

class NotesViewModel: ObservableObject {
    @Published var notes: [NoteItem] = []

    func addNote(title: String, description: String) {
        let note = NoteItem(title: title, description: description)
        notes.append(note)
    }

    func deleteNote(at offsets: IndexSet) {
        notes.remove(atOffsets: offsets)
    }
}

struct NotesAppView: View {
    @StateObject private var viewModel = NotesViewModel()
    @State private var title = ""
    @State private var description = ""

    var body: some View {
        NavigationStack {
            VStack {
                TextField("Title", text: $title)
                    .textFieldStyle(.roundedBorder)

                TextField("Description", text: $description)
                    .textFieldStyle(.roundedBorder)

                Button("Add Note") {
                    viewModel.addNote(title: title, description: description)
                    title = ""
                    description = ""
                }

                List {
                    ForEach(viewModel.notes) { note in
                        VStack(alignment: .leading) {
                            Text(note.title)
                                .font(.headline)

                            Text(note.description)
                                .font(.caption)
                                .foregroundStyle(.secondary)
                        }
                    }
                    .onDelete(perform: viewModel.deleteNote)
                }
            }
            .padding()
            .navigationTitle("Notes")
        }
    }
}
```

---

## Recommended Learning Order

Follow this order to learn iOS development properly:

1. Swift basics
2. Swift optionals and closures
3. Struct, class, protocol, extension
4. SwiftUI basics
5. SwiftUI state management
6. Navigation and lists
7. MVVM architecture
8. Networking
9. Local storage
10. Async/await and concurrency
11. UIKit basics
12. Debugging
13. Testing
14. Security
15. App Store release
16. Advanced frameworks
17. Real project development
