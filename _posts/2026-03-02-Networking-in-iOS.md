 ---
title: Networking in iOS (Swift)
description: Networking in iOS is the process of communicating with APIs, servers, and internet resources to send or receive data.
author: tawhidmonowar
date: 2026-03-02 11:30:00 +06:00
categories: [Development, iOS Development]
---

### URL in Swift

URL represents an internet address or API endpoint.
```swift
let url = URL(string: "https://jsonplaceholder.typicode.com/users")
```

### URLSession

URLSession is the main networking API in iOS used to perform HTTP requests. It supports:

- GET request
- POST request
- PUT request
- DELETE request
- Uploading
- Downloading

### Simple GET Request

Fetch Data from API

```swift
struct ContentView: View {
    
    var body: some View {
        
        Button("Fetch Users") {
            
            // Call API
            fetchUsers()
        }
    }
    
    // API request function
    func fetchUsers() {
        
        // API URL
        guard let url = URL(
            string: "https://jsonplaceholder.typicode.com/users"
        ) else {
            return
        }
        
        // Create network request
        URLSession.shared.dataTask(
            with: url
        ) { data, response, error in
            
            // Handle error
            if let error = error {
                
                print(error.localizedDescription)
                return
            }
            
            // Check response data
            if let data = data {
                
                // Convert data to string
                let result = String(
                    data: data,
                    encoding: .utf8
                )
                
                print(result ?? "")
            }
            
        }.resume()
    }
}
```

### Codable
`Codable` converts JSON into Swift objects automatically. It combines:

- Encodable
- Decodable

Example: API JSON Response

```json
{
   "id": 1,
   "name": "John"
}
```

Convert JSON into Swift Model

```swift
struct User: Codable {
    let id: Int
    let name: String
}
```

Parse API Response

```swift
func fetchUser() {
    
    // API URL
    guard let url = URL(
        string: "https://jsonplaceholder.typicode.com/users/1"
    ) else {
        return
    }
    
    // Fetch data
    URLSession.shared.dataTask(
        with: url
    ) { data, response, error in
        
        // Ensure data exists
        guard let data = data else {
            return
        }
        
        do {
            
            // Decode JSON data
            let user = try JSONDecoder()
                .decode(User.self, from: data)
            
            print(user.name)
            
        } catch {
            
            print(error.localizedDescription)
        }
        
    }.resume()
}
```

## HTTP Methods

### GET Request
Used to fetch data.

```swift
request.httpMethod = "GET"
```

### POST Request
Used to create new data.

```swift
request.httpMethod = "POST"
```

### PUT Request
Used to update existing data.

```swift
request.httpMethod = "PUT"
```

### DELETE Request
Used to remove data.

```swift
request.httpMethod = "DELETE"
```

### POST Request Example

Send Data to API

```swift
struct PostData: Codable {
    
    let title: String
    let body: String
}

func createPost() {
    
    // API URL
    guard let url = URL(
        string: "https://jsonplaceholder.typicode.com/posts"
    ) else {
        return
    }
    
    // Create request object
    var request = URLRequest(url: url)
    
    // Set request method
    request.httpMethod = "POST"
    
    // Set header
    request.setValue(
        "application/json",
        forHTTPHeaderField: "Content-Type"
    )
    
    // Request body model
    let post = PostData(
        title: "Hello",
        body: "Networking in Swift"
    )
    
    do {
        
        // Convert object into JSON data
        request.httpBody = try JSONEncoder()
            .encode(post)
        
    } catch {
        
        print(error.localizedDescription)
    }
    
    // Send request
    URLSession.shared.dataTask(
        with: request
    ) { data, response, error in
        
        print("Post Created")
        
    }.resume()
}
```

## Async Await

Swift supports async networking using async/await.

```swift
func fetchUsers() async {
    
    // API URL
    guard let url = URL(
        string: "https://jsonplaceholder.typicode.com/users"
    ) else {
        return
    }
    
    do {
        
        // Fetch data
        let (data, response) = try await URLSession.shared
            .data(from: url)
        
        // Decode JSON
        let users = try JSONDecoder()
            .decode([User].self, from: data)
        
        print(users)
        
    } catch {
        
        print(error.localizedDescription)
    }
}
```

## API Headers 

Headers provide extra information to the server.

Example:

- Authorization
- Content-Type
- Language
- Token

```swift
// Authorization header
request.setValue(
    "Bearer TOKEN_HERE",
    forHTTPHeaderField: "Authorization"
)
```

## Error Handling

```swift
if let error = error {
    
    // Print error message
    print(error.localizedDescription)
    
    return
}
```

## Update UI on Main Thread

```swift
DispatchQueue.main.async {
    
    // Update UI safely
    self.users = decodedUsers
}
```

## ObservableObject Networking

```swift
class UserViewModel: ObservableObject {
    
    // Published users array
    @Published var users: [User] = []
    
    // Fetch users
    func fetchUsers() {
        
        // API URL
        guard let url = URL(
            string: "https://jsonplaceholder.typicode.com/users"
        ) else {
            return
        }
        
        // Network request
        URLSession.shared.dataTask(
            with: url
        ) { data, response, error in
            
            // Ensure data exists
            guard let data = data else {
                return
            }
            
            do {
                
                // Decode JSON response
                let decodedUsers = try JSONDecoder()
                    .decode([User].self, from: data)
                
                // Update UI safely
                DispatchQueue.main.async {
                    
                    self.users = decodedUsers
                }
                
            } catch {
                
                print(error.localizedDescription)
            }
            
        }.resume()
    }
}
```


## MVVM Networking Structure

### Model
Represents API data.

```swift
struct User: Codable {
    
    let id: Int
    let name: String
}
```

---

### ViewModel
Handles business logic and networking.

```swift
class UserViewModel: ObservableObject {
    
}
```

---

### View
Displays UI.

```swift
struct ContentView: View {
    
}
```
