---
title: Ktor Backend
description: Ktor is a lightweight, and asynchronous framework developed by JetBrains for building web applications, HTTP services, and mobile backends using Kotlin.
author: tawhidmonowar
date: 2025-11-15 11:30:00 +06:00
categories: [Backend, Ktor]
---

# 1. What is Ktor?

Ktor is a backend framework made for Kotlin.

You can use Ktor to build:

- REST APIs
- Authentication systems
- Admin panels
- Mobile app backends
- File upload servers
- Payment APIs
- WebSocket chat apps
- Microservices
- Internal company tools
- AI API wrapper backends

Simple meaning:

```text
Android App / iOS App / Website
        ↓
      API Call
        ↓
   Ktor Backend
        ↓
 Database / External API / File Storage
```

Example:

```text
User clicks Login in Android app
        ↓
Android sends email/password to Ktor API
        ↓
Ktor checks database
        ↓
Ktor returns success + token
```

---

# 2. Why Learn Ktor Backend?

Ktor is good for Android developers because it uses Kotlin.

If you already know Kotlin for Android, Ktor feels easier than learning a fully different backend language.

Benefits:

- Kotlin-based
- Lightweight
- Fast
- Simple routing
- Good for REST API
- Good for microservices
- Supports JSON easily
- Supports JWT authentication
- Supports WebSocket
- Works with databases
- Easy to test
- Good for mobile app backend

---

# 3. Basic Backend Concepts Before Ktor

Before learning Ktor, understand these backend basics.

---

## Server

A server is a program that waits for requests and sends responses.

Example:

```text
Client Request:
GET /users

Server Response:
[
  {
    "id": 1,
    "name": "Envobyte"
  }
]
```

---

## Client

A client is anything that sends requests to the backend.

Examples:

- Android app
- iOS app
- Website
- Postman
- Browser
- Another backend server

---

## API

API means Application Programming Interface.

In simple words, an API is a way for apps to communicate with a backend.

Example API endpoints:

```text
GET /users
POST /login
POST /orders
GET /products
DELETE /notes/1
```

---

## Request

A request is sent from client to server.

Example:

```http
POST /login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456"
}
```

---

## Response

A response is sent from server to client.

Example:

```json
{
  "success": true,
  "token": "jwt-token-here"
}
```

---

## HTTP Methods

Common HTTP methods:

```text
GET     Read data
POST    Create data
PUT     Replace data
PATCH   Update part of data
DELETE  Delete data
```

Example:

```text
GET /products       Get all products
GET /products/1     Get single product
POST /products      Create product
PUT /products/1     Update product
DELETE /products/1  Delete product
```

---

## Status Codes

Status codes tell the client what happened.

```text
200 OK                  Request successful
201 Created             Data created
400 Bad Request          Wrong input
401 Unauthorized         Not logged in
403 Forbidden            No permission
404 Not Found            Data not found
409 Conflict             Duplicate/conflict
500 Internal Server Error Server problem
```

---

# 4. Ktor Project Structure

A simple Ktor project can look like this:

```text
ktor-backend/
│
├── build.gradle.kts
├── settings.gradle.kts
├── src/
│   ├── main/
│   │   ├── kotlin/
│   │   │   └── com/example/
│   │   │       ├── Application.kt
│   │   │       ├── routes/
│   │   │       │   ├── UserRoutes.kt
│   │   │       │   └── AuthRoutes.kt
│   │   │       ├── models/
│   │   │       │   └── User.kt
│   │   │       ├── dto/
│   │   │       │   └── LoginRequest.kt
│   │   │       ├── repository/
│   │   │       │   └── UserRepository.kt
│   │   │       ├── service/
│   │   │       │   └── AuthService.kt
│   │   │       ├── database/
│   │   │       │   └── DatabaseFactory.kt
│   │   │       └── plugins/
│   │   │           ├── Routing.kt
│   │   │           ├── Serialization.kt
│   │   │           ├── Security.kt
│   │   │           └── Monitoring.kt
│   │   │
│   │   └── resources/
│   │       ├── application.conf
│   │       └── logback.xml
│   │
│   └── test/
│       └── kotlin/
│           └── ApplicationTest.kt
```

Simple explanation:

```text
Application.kt      Main entry point
routes/             API endpoints
models/             Main data models
dto/                Request/response models
repository/         Database/data access logic
service/            Business logic
database/           Database connection
plugins/            Ktor plugin setup
resources/          Config files
test/               Backend tests
```

---

# 5. Gradle Setup

Ktor uses Gradle to manage dependencies and build the backend.

Example `build.gradle.kts`:

```kotlin
plugins {
    kotlin("jvm") version "2.0.21"
    id("io.ktor.plugin") version "3.5.0"
    kotlin("plugin.serialization") version "2.0.21"
}

group = "com.example"
version = "1.0.0"

application {
    mainClass.set("io.ktor.server.netty.EngineMain")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-server-core")
    implementation("io.ktor:ktor-server-netty")
    implementation("io.ktor:ktor-server-content-negotiation")
    implementation("io.ktor:ktor-serialization-kotlinx-json")
    implementation("io.ktor:ktor-server-call-logging")
    implementation("io.ktor:ktor-server-status-pages")

    testImplementation("io.ktor:ktor-server-test-host")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit")
}
```

Simple explanation:

```text
ktor-server-core                 Main Ktor server features
ktor-server-netty                Server engine
content-negotiation              JSON conversion plugin
kotlinx-json                     JSON serialization library
call-logging                     API request logging
status-pages                     Error handling
ktor-server-test-host            Testing support
```

---

# 6. application.conf

`application.conf` stores server configuration.

Example:

```hocon
ktor {
    deployment {
        port = 8080
        host = "0.0.0.0"
    }

    application {
        modules = [ com.example.ApplicationKt.module ]
    }
}
```

Simple explanation:

```text
port = 8080       Server will run on port 8080
host = 0.0.0.0    Server accepts external connections
modules           Tells Ktor which function starts the app
```

---

# 7. Main Application File

`Application.kt` is the main backend entry point.

```kotlin
package com.example

import io.ktor.server.application.*

fun Application.module() {
    configureSerialization()
    configureMonitoring()
    configureStatusPages()
    configureRouting()
}
```

Simple explanation:

```text
module() is the starting function of the Ktor app.

Inside this function, we install and configure different features:
- JSON
- Logging
- Error handling
- Routes
```

---

# 8. Basic Hello World API

This is the simplest Ktor API.

```kotlin
package com.example

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello Ktor Backend")
        }
    }
}
```

When you open:

```text
http://localhost:8080/
```

Response:

```text
Hello Ktor Backend
```

Simple explanation:

```text
routing { }       Defines API routes
get("/")          Handles GET request on root URL
call.respondText  Sends text response
```

---

# 9. Routing

Routing means defining API endpoints.

Example:

```kotlin
fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Home API")
        }

        get("/health") {
            call.respondText("Server is running")
        }

        get("/about") {
            call.respondText("This is a Ktor backend")
        }
    }
}
```

API endpoints:

```text
GET /         Home API
GET /health   Server is running
GET /about    This is a Ktor backend
```

---

# 10. Route Grouping

For clean code, group related routes.

```kotlin
fun Route.userRoutes() {
    route("/users") {
        get {
            call.respondText("Get all users")
        }

        get("/{id}") {
            val id = call.parameters["id"]
            call.respondText("Get user with ID: $id")
        }

        post {
            call.respondText("Create user")
        }
    }
}
```

Use it inside main routing:

```kotlin
fun Application.configureRouting() {
    routing {
        userRoutes()
    }
}
```

Simple explanation:

```text
/users        Get all users
/users/1      Get user ID 1
POST /users   Create user
```

---

# 11. Path Parameters

Path parameters come from the URL path.

Example URL:

```text
GET /users/10
```

Ktor code:

```kotlin
get("/users/{id}") {
    val id = call.parameters["id"]

    call.respondText("User ID is $id")
}
```

If request is:

```text
/users/10
```

Response:

```text
User ID is 10
```

---

# 12. Query Parameters

Query parameters come after `?` in the URL.

Example URL:

```text
GET /products?page=1&limit=20
```

Ktor code:

```kotlin
get("/products") {
    val page = call.request.queryParameters["page"] ?: "1"
    val limit = call.request.queryParameters["limit"] ?: "10"

    call.respondText("Page: $page, Limit: $limit")
}
```

Simple explanation:

```text
page and limit are optional.
If not provided, default values are used.
```

---

# 13. JSON Serialization

To send and receive JSON, install `ContentNegotiation`.

```kotlin
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*

fun Application.configureSerialization() {
    install(ContentNegotiation) {
        json()
    }
}
```

Simple explanation:

```text
ContentNegotiation converts Kotlin objects to JSON
and JSON to Kotlin objects.
```

---

# 14. Response DTO

DTO means Data Transfer Object.

It is used for API request and response data.

```kotlin
import kotlinx.serialization.Serializable

@Serializable
data class UserResponse(
    val id: Int,
    val name: String,
    val email: String
)
```

Send JSON response:

```kotlin
get("/user") {
    val user = UserResponse(
        id = 1,
        name = "Envobyte",
        email = "test@example.com"
    )

    call.respond(user)
}
```

Response:

```json
{
  "id": 1,
  "name": "Envobyte",
  "email": "test@example.com"
}
```

Important:

```text
@Serializable is required for kotlinx JSON serialization.
```

---

# 15. POST Request Body

To receive JSON from client, use `call.receive()`.

Request model:

```kotlin
import kotlinx.serialization.Serializable

@Serializable
data class CreateUserRequest(
    val name: String,
    val email: String
)
```

Route:

```kotlin
post("/users") {
    val request = call.receive<CreateUserRequest>()

    call.respondText("User created: ${request.name}")
}
```

Client sends:

```json
{
  "name": "Envobyte",
  "email": "test@example.com"
}
```

Server response:

```text
User created: Envobyte
```

Simple explanation:

```text
call.receive<CreateUserRequest>() reads JSON body
and converts it into Kotlin object.
```

---

# 16. HTTP Status Code Response

You can return proper status codes.

```kotlin
import io.ktor.http.*

post("/users") {
    val request = call.receive<CreateUserRequest>()

    val response = UserResponse(
        id = 1,
        name = request.name,
        email = request.email
    )

    call.respond(HttpStatusCode.Created, response)
}
```

Simple explanation:

```text
201 Created means new data was successfully created.
```

---

# 17. Error Response Model

Always return clean error responses.

```kotlin
import kotlinx.serialization.Serializable

@Serializable
data class ErrorResponse(
    val success: Boolean = false,
    val message: String
)
```

Example:

```kotlin
get("/users/{id}") {
    val id = call.parameters["id"]?.toIntOrNull()

    if (id == null) {
        call.respond(
            HttpStatusCode.BadRequest,
            ErrorResponse(message = "Invalid user ID")
        )
        return@get
    }

    call.respondText("User ID: $id")
}
```

Simple explanation:

```text
If ID is not a valid number, server returns 400 Bad Request.
```

---

# 18. StatusPages Error Handling

`StatusPages` handles errors globally.

```kotlin
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*

fun Application.configureStatusPages() {
    install(StatusPages) {
        exception<IllegalArgumentException> { call, cause ->
            call.respond(
                HttpStatusCode.BadRequest,
                ErrorResponse(message = cause.message ?: "Bad request")
            )
        }

        exception<Throwable> { call, cause ->
            call.respond(
                HttpStatusCode.InternalServerError,
                ErrorResponse(message = "Internal server error")
            )
        }

        status(HttpStatusCode.NotFound) { call, status ->
            call.respond(
                status,
                ErrorResponse(message = "Route not found")
            )
        }
    }
}
```

Simple explanation:

```text
Instead of writing try-catch in every route,
StatusPages catches errors globally.
```

---

# 19. Validation

Validation means checking if user input is correct.

Example:

```kotlin
post("/register") {
    val request = call.receive<CreateUserRequest>()

    if (request.name.isBlank()) {
        call.respond(
            HttpStatusCode.BadRequest,
            ErrorResponse(message = "Name is required")
        )
        return@post
    }

    if (!request.email.contains("@")) {
        call.respond(
            HttpStatusCode.BadRequest,
            ErrorResponse(message = "Invalid email address")
        )
        return@post
    }

    call.respondText("Registration successful")
}
```

Simple explanation:

```text
Never trust client input.
Always validate request body on backend.
```

---

# 20. Repository Pattern

Repository handles data operations.

For learning, start with in-memory data before database.

Model:

```kotlin
import kotlinx.serialization.Serializable

@Serializable
data class User(
    val id: Int,
    val name: String,
    val email: String
)
```

Repository:

```kotlin
class UserRepository {

    private val users = mutableListOf<User>()

    fun getAllUsers(): List<User> {
        return users
    }

    fun getUserById(id: Int): User? {
        return users.find { it.id == id }
    }

    fun createUser(name: String, email: String): User {
        val user = User(
            id = users.size + 1,
            name = name,
            email = email
        )

        users.add(user)

        return user
    }

    fun deleteUser(id: Int): Boolean {
        return users.removeIf { it.id == id }
    }
}
```

Simple explanation:

```text
Repository separates data logic from route logic.
This makes code cleaner and easier to test.
```

---

# 21. Service Layer

Service layer contains business logic.

```kotlin
class UserService(
    private val repository: UserRepository
) {
    fun getUsers(): List<User> {
        return repository.getAllUsers()
    }

    fun createUser(request: CreateUserRequest): User {
        if (request.name.isBlank()) {
            throw IllegalArgumentException("Name is required")
        }

        if (!request.email.contains("@")) {
            throw IllegalArgumentException("Invalid email")
        }

        return repository.createUser(
            name = request.name,
            email = request.email
        )
    }
}
```

Simple explanation:

```text
Route receives request.
Service handles rules.
Repository handles data.
```

Flow:

```text
Route → Service → Repository → Data
```

---

# 22. Route with Service and Repository

```kotlin
fun Route.userRoutes(userService: UserService) {
    route("/users") {
        get {
            val users = userService.getUsers()
            call.respond(users)
        }

        post {
            val request = call.receive<CreateUserRequest>()
            val user = userService.createUser(request)

            call.respond(HttpStatusCode.Created, user)
        }
    }
}
```

Main setup:

```kotlin
fun Application.configureRouting() {
    val userRepository = UserRepository()
    val userService = UserService(userRepository)

    routing {
        userRoutes(userService)
    }
}
```

Simple explanation:

```text
This is manual dependency injection.
We create Repository, then Service, then pass Service into route.
```

---

# 23. Authentication Basics

Authentication means checking who the user is.

Common authentication methods:

```text
Email/password login
JWT token
Session
API key
OAuth login
```

For mobile app backend, JWT is very common.

Flow:

```text
User logs in
        ↓
Backend validates email/password
        ↓
Backend returns JWT token
        ↓
App stores token
        ↓
App sends token in Authorization header
        ↓
Backend allows protected routes
```

Header example:

```http
Authorization: Bearer jwt-token-here
```

---

# 24. Simple Login Route

Request:

```kotlin
@Serializable
data class LoginRequest(
    val email: String,
    val password: String
)
```

Response:

```kotlin
@Serializable
data class LoginResponse(
    val token: String
)
```

Route:

```kotlin
post("/login") {
    val request = call.receive<LoginRequest>()

    if (request.email == "admin@example.com" && request.password == "123456") {
        call.respond(LoginResponse(token = "fake-jwt-token"))
    } else {
        call.respond(
            HttpStatusCode.Unauthorized,
            ErrorResponse(message = "Invalid email or password")
        )
    }
}
```

Simple explanation:

```text
This is only for learning.
In real apps, password must come from database and should be hashed.
```

---

# 25. JWT Authentication Concept

JWT means JSON Web Token.

Simple JWT flow:

```text
Login success → generate token → send token to client
Client saves token → sends token with every protected request
Backend verifies token → gives access
```

Protected API example:

```text
GET /profile
Authorization: Bearer token-here
```

---

# 26. Password Hashing

Never store raw passwords.

Bad:

```text
password = 123456
```

Good:

```text
password_hash = hashed_password_value
```

Simple hashing example:

```kotlin
import java.security.MessageDigest

fun sha256(text: String): String {
    val bytes = MessageDigest.getInstance("SHA-256")
        .digest(text.toByteArray())

    return bytes.joinToString("") { "%02x".format(it) }
}
```

Important:

```text
For real production apps, use strong password hashing like BCrypt or Argon2.
Do not use plain SHA-256 alone for real password storage.
```

---

# 27. Authorization

Authentication checks:

```text
Who are you?
```

Authorization checks:

```text
What are you allowed to do?
```

Example:

```kotlin
get("/admin") {
    val userRole = "USER"

    if (userRole != "ADMIN") {
        call.respond(
            HttpStatusCode.Forbidden,
            ErrorResponse(message = "You do not have permission")
        )
        return@get
    }

    call.respondText("Welcome admin")
}
```

Simple explanation:

```text
A logged-in user may not be allowed to access every route.
```

---

# 28. Database Basics

Most backend apps need a database.

Common databases:

```text
PostgreSQL
MySQL
MariaDB
SQLite
MongoDB
Redis
```

For Ktor with relational database, common options:

```text
Exposed
Ktorm
JDBC
Jooq
SQLDelight
Hibernate
```

Start simple with:

```text
PostgreSQL + Exposed
```

---

# 29. Database Table Concept

A table stores data in rows and columns.

Example `users` table:

```text
id | name     | email
---|----------|------------------
1  | Envobyte | test@example.com
2  | John     | john@example.com
```

SQL example:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
```

---

# 30. Exposed Table Example

Exposed is a Kotlin SQL library.

```kotlin
import org.jetbrains.exposed.sql.Table

object UsersTable : Table("users") {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 255)
    val email = varchar("email", 255).uniqueIndex()

    override val primaryKey = PrimaryKey(id)
}
```

Simple explanation:

```text
This Kotlin object represents the users table in database.
```

---

# 31. Database Connection Example

```kotlin
import org.jetbrains.exposed.sql.Database

object DatabaseFactory {
    fun init() {
        Database.connect(
            url = "jdbc:postgresql://localhost:5432/my_database",
            driver = "org.postgresql.Driver",
            user = "postgres",
            password = "password"
        )
    }
}
```

Use it in `Application.kt`:

```kotlin
fun Application.module() {
    DatabaseFactory.init()

    configureSerialization()
    configureStatusPages()
    configureRouting()
}
```

Simple explanation:

```text
DatabaseFactory.init() connects Ktor backend to database.
```

---

# 32. Database Transaction

Database operations should run inside transactions.

```kotlin
import org.jetbrains.exposed.sql.transactions.transaction

fun getUsersFromDatabase(): List<User> {
    return transaction {
        UsersTable.selectAll().map {
            User(
                id = it[UsersTable.id],
                name = it[UsersTable.name],
                email = it[UsersTable.email]
            )
        }
    }
}
```

Simple explanation:

```text
transaction { } safely runs database queries.
```

---

# 33. Environment Variables

Never hardcode secrets in code.

Bad:

```kotlin
val dbPassword = "my-secret-password"
```

Better:

```kotlin
val dbPassword = System.getenv("DB_PASSWORD")
```

Example:

```kotlin
object AppConfig {
    val databaseUrl: String = System.getenv("DB_URL") ?: "jdbc:postgresql://localhost:5432/app"
    val databaseUser: String = System.getenv("DB_USER") ?: "postgres"
    val databasePassword: String = System.getenv("DB_PASSWORD") ?: ""
    val jwtSecret: String = System.getenv("JWT_SECRET") ?: "dev-secret"
}
```

Simple explanation:

```text
Environment variables keep secrets outside source code.
```

---

# 34. CORS

CORS controls which websites can call your backend.

Useful when frontend website calls your API.

```kotlin
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun Application.configureCors() {
    install(CORS) {
        allowHost("localhost:3000")
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Delete)
    }
}
```

Simple explanation:

```text
CORS is mainly important for browser-based clients.
Android/iOS apps usually do not need CORS like browsers do.
```

---

# 35. Logging

Logging helps you understand what is happening in your backend.

```kotlin
import io.ktor.server.application.*
import io.ktor.server.plugins.calllogging.*

fun Application.configureMonitoring() {
    install(CallLogging)
}
```

Simple explanation:

```text
CallLogging logs incoming API requests.
Useful for debugging and monitoring.
```

---

# 36. Custom Logger

```kotlin
object AppLogger {
    fun info(message: String) {
        println("INFO: $message")
    }

    fun error(message: String) {
        println("ERROR: $message")
    }
}
```

Use:

```kotlin
AppLogger.info("User login started")
AppLogger.error("Failed to connect database")
```

Production note:

```text
For real production, use proper logging with Logback.
```

---

# 37. File Upload

File upload is common for image, PDF, audio, and video apps.

```kotlin
import io.ktor.http.content.*
import io.ktor.server.request.*
import java.io.File

post("/upload") {
    val multipart = call.receiveMultipart()

    multipart.forEachPart { part ->
        if (part is PartData.FileItem) {
            val fileName = part.originalFileName ?: "uploaded-file"

            val file = File("uploads/$fileName")
            part.streamProvider().use { input ->
                file.outputStream().buffered().use { output ->
                    input.copyTo(output)
                }
            }
        }

        part.dispose()
    }

    call.respondText("File uploaded successfully")
}
```

Simple explanation:

```text
receiveMultipart() reads file upload request.
FileItem means uploaded file.
copyTo() saves the uploaded file.
```

Important:

```text
In production, validate file type, size, extension, and storage path.
Never blindly trust uploaded files.
```

---

# 38. File Download

```kotlin
import java.io.File

get("/download/{fileName}") {
    val fileName = call.parameters["fileName"] ?: return@get call.respond(
        HttpStatusCode.BadRequest,
        ErrorResponse(message = "File name is required")
    )

    val file = File("uploads/$fileName")

    if (!file.exists()) {
        call.respond(
            HttpStatusCode.NotFound,
            ErrorResponse(message = "File not found")
        )
        return@get
    }

    call.respondFile(file)
}
```

Simple explanation:

```text
respondFile() sends a file as response.
```

Security note:

```text
Do not allow unsafe paths like ../../secret.txt.
Use safe file validation.
```

---

# 39. Pagination

Pagination means loading data page by page.

Example URL:

```text
GET /products?page=1&limit=20
```

Code:

```kotlin
get("/products") {
    val page = call.request.queryParameters["page"]?.toIntOrNull() ?: 1
    val limit = call.request.queryParameters["limit"]?.toIntOrNull() ?: 20

    val allProducts = listOf("Product 1", "Product 2", "Product 3", "Product 4")

    val result = allProducts
        .drop((page - 1) * limit)
        .take(limit)

    call.respond(result)
}
```

Simple explanation:

```text
page tells which page user wants.
limit tells how many items per page.
```

---

# 40. API Versioning

API versioning helps you update APIs without breaking old apps.

Example:

```text
/api/v1/users
/api/v2/users
```

Route:

```kotlin
routing {
    route("/api/v1") {
        get("/users") {
            call.respondText("Version 1 users API")
        }
    }

    route("/api/v2") {
        get("/users") {
            call.respondText("Version 2 users API")
        }
    }
}
```

Simple explanation:

```text
Old app can keep using v1.
New app can use v2.
```

---

# 41. WebSocket

WebSocket is used for real-time communication.

Use cases:

- Chat app
- Live notification
- Live tracking
- Live dashboard
- Game server
- Real-time order progress

Example:

```kotlin
import io.ktor.server.websocket.*
import io.ktor.websocket.*
import java.time.Duration

fun Application.configureWebSockets() {
    install(WebSockets) {
        pingPeriod = Duration.ofSeconds(15)
        timeout = Duration.ofSeconds(30)
    }

    routing {
        webSocket("/chat") {
            send("Connected to chat server")

            for (frame in incoming) {
                if (frame is Frame.Text) {
                    val text = frame.readText()
                    send("Server received: $text")
                }
            }
        }
    }
}
```

Simple explanation:

```text
HTTP request gives one response.
WebSocket keeps connection open for real-time messages.
```

---

# 42. Background Jobs

Sometimes backend needs background work.

Examples:

- Send email
- Clean old files
- Process video
- Generate report
- Update order status
- Sync third-party API

Simple coroutine example:

```kotlin
import kotlinx.coroutines.*

fun startBackgroundJob() {
    CoroutineScope(Dispatchers.Default).launch {
        while (true) {
            println("Running background job")
            delay(60_000)
        }
    }
}
```

Simple explanation:

```text
This runs a task every 60 seconds.
```

Production note:

```text
For serious jobs, use a proper scheduler, queue, or worker system.
Examples: Quartz, Redis queue, RabbitMQ, Kafka, Cloud Tasks.
```

---

# 43. Ktor HTTP Client

Ktor can also call other APIs using Ktor Client.

Example use cases:

- Call payment gateway API
- Call AI API
- Call Google API
- Call third-party service

```kotlin
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*

val client = HttpClient()

suspend fun fetchExternalData(): String {
    val response: HttpResponse = client.get("https://api.example.com/data")
    return response.bodyAsText()
}
```

Simple explanation:

```text
Ktor Server receives request from your app.
Ktor Client can send request to another external API.
```

---

# 44. Dependency Injection

Dependency Injection means passing dependencies from outside.

Manual example:

```kotlin
val userRepository = UserRepository()
val userService = UserService(userRepository)

routing {
    userRoutes(userService)
}
```

Simple explanation:

```text
UserService needs UserRepository.
Instead of creating repository inside service,
we pass it from outside.
```

For bigger projects, use:

```text
Koin
Kodein
Dagger
Ktor built-in DI
Manual DI
```

---

# 45. Clean Architecture for Ktor

A clean backend separates responsibilities.

Recommended structure:

```text
src/main/kotlin/com/example/
│
├── Application.kt
├── plugins/
│   ├── Routing.kt
│   ├── Serialization.kt
│   ├── Security.kt
│   ├── Monitoring.kt
│   └── StatusPages.kt
│
├── features/
│   ├── auth/
│   │   ├── AuthRoutes.kt
│   │   ├── AuthService.kt
│   │   ├── AuthRepository.kt
│   │   ├── LoginRequest.kt
│   │   └── LoginResponse.kt
│   │
│   └── user/
│       ├── UserRoutes.kt
│       ├── UserService.kt
│       ├── UserRepository.kt
│       ├── User.kt
│       └── UserResponse.kt
│
├── database/
│   ├── DatabaseFactory.kt
│   └── tables/
│       └── UsersTable.kt
│
├── common/
│   ├── ErrorResponse.kt
│   ├── ApiResponse.kt
│   └── AppConfig.kt
│
└── security/
    ├── JwtConfig.kt
    └── PasswordHasher.kt
```

Simple explanation:

```text
plugins/     Ktor setup
features/    Feature-based business code
database/    Database setup and tables
common/      Shared classes
security/    Auth/security logic
```

---

# 46. API Response Wrapper

Many backends use a common response format.

```kotlin
import kotlinx.serialization.Serializable

@Serializable
data class ApiResponse<T>(
    val success: Boolean,
    val message: String,
    val data: T? = null
)
```

Example:

```kotlin
get("/profile") {
    val user = User(
        id = 1,
        name = "Envobyte",
        email = "test@example.com"
    )

    call.respond(
        ApiResponse(
            success = true,
            message = "Profile loaded successfully",
            data = user
        )
    )
}
```

Response:

```json
{
  "success": true,
  "message": "Profile loaded successfully",
  "data": {
    "id": 1,
    "name": "Envobyte",
    "email": "test@example.com"
  }
}
```

---

# 47. Testing Ktor APIs

Ktor supports testing without running a real server.

Example:

```kotlin
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

class ApplicationTest {

    @Test
    fun testRootRoute() = testApplication {
        application {
            module()
        }

        val response = client.get("/")

        assertEquals("Hello Ktor Backend", response.bodyAsText())
    }
}
```

Simple explanation:

```text
testApplication starts a test version of your Ktor app.
client.get("/") sends fake test request.
No real server port is needed.
```

---

# 48. Testing JSON API

```kotlin
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlin.test.Test
import kotlin.test.assertEquals

class UserRouteTest {

    @Test
    fun createUserTest() = testApplication {
        application {
            module()
        }

        val response = client.post("/users") {
            contentType(ContentType.Application.Json)
            setBody(
                """
                {
                    "name": "Envobyte",
                    "email": "test@example.com"
                }
                """.trimIndent()
            )
        }

        assertEquals(HttpStatusCode.Created, response.status)
    }
}
```

Simple explanation:

```text
This test sends a POST request with JSON body
and checks if status code is 201 Created.
```

---

# 49. Security Checklist

For production Ktor backend, remember:

```text
Use HTTPS
Validate all input
Hash passwords
Use JWT/session safely
Never hardcode secrets
Use environment variables
Protect admin routes
Add rate limiting
Check request body size
Sanitize file uploads
Use proper database permissions
Use CORS carefully
Log errors without exposing secrets
Do not return stack traces to users
Use server-side validation
Use token expiry
Use refresh token carefully
Add replay protection for sensitive APIs
Use nonce/timestamp for high-risk operations
```

---

# 50. Rate Limiting

Rate limiting protects APIs from abuse.

Example use cases:

```text
Limit login attempts
Limit OTP requests
Limit free order creation
Limit file uploads
Limit AI generation requests
```

Simple concept:

```text
User can call /login only 5 times per minute.
After that, return 429 Too Many Requests.
```

Example response:

```kotlin
call.respond(
    HttpStatusCode.TooManyRequests,
    ErrorResponse(message = "Too many requests. Try again later.")
)
```

---

# 51. Request Signing Concept

For high-security mobile apps, request signing can help protect APIs from scripted abuse.

Basic idea:

```text
Client creates request body
Client adds timestamp
Client adds nonce
Client signs payload
Server verifies signature
Server rejects replayed request
```

Payload example:

```kotlin
import kotlinx.serialization.Serializable

@Serializable
data class SignedRequest(
    val path: String,
    val timestamp: Long,
    val nonce: String,
    val body: String,
    val signature: String
)
```

Simple explanation:

```text
timestamp prevents old request reuse.
nonce prevents duplicate request replay.
signature proves request was created by trusted client logic.
```

Important:

```text
Do not rely only on app-side security.
Always validate everything on the server.
```

---

# 52. Deployment Options

You can deploy Ktor backend using:

```text
VPS
Docker
Google Cloud Run
AWS
Azure
Railway
Render
Heroku alternatives
Kubernetes
Linux server with systemd
```

Simple deployment flow:

```text
Build JAR
Upload to server
Run with Java
Put Nginx in front
Add HTTPS
Monitor logs
```

---

# 53. Build Runnable JAR

Command:

```bash
./gradlew build
```

Run:

```bash
java -jar build/libs/my-app-all.jar
```

Simple explanation:

```text
The JAR file contains your backend app.
You can run it on a server with Java installed.
```

---

# 54. Dockerfile

Docker packages your backend with its runtime.

```dockerfile
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY build/libs/my-app-all.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

Simple explanation:

```text
Docker creates a container for your Ktor backend.
It makes deployment more consistent.
```

---

# 55. Nginx Reverse Proxy

Nginx can sit in front of Ktor.

Flow:

```text
User → Nginx → Ktor Backend
```

Why use Nginx?

```text
HTTPS
Domain setup
Reverse proxy
Load balancing
Static file serving
Security headers
```

Example:

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Simple explanation:

```text
User calls api.example.com.
Nginx forwards request to Ktor running on localhost:8080.
```

---

# 56. Monitoring

Monitoring helps you know if your backend is healthy.

Monitor:

```text
Server uptime
API response time
Error count
CPU usage
RAM usage
Database health
Disk usage
Request count
Failed login attempts
Slow queries
```

Simple health route:

```kotlin
get("/health") {
    call.respond(
        mapOf(
            "status" to "OK",
            "message" to "Server is running"
        )
    )
}
```

---

# 57. Common Ktor Plugins

Useful Ktor plugins:

```text
Routing                  API routes
ContentNegotiation       JSON/XML serialization
StatusPages              Error handling
CallLogging              Request logging
Authentication           Login/JWT/session auth
CORS                     Browser frontend access control
Sessions                 Cookie/session management
Compression              Compress response
DefaultHeaders           Add default headers
WebSockets               Real-time connection
RateLimit                Limit repeated requests
RequestValidation        Validate incoming requests
PartialContent           File/video streaming support
AutoHeadResponse         Auto HEAD response
```

---

# 58. Common Backend Mistakes

Avoid these mistakes:

```text
Putting all code in Application.kt
No validation
No error handling
Hardcoded secrets
Raw password storage
Returning stack traces to users
No database indexing
No pagination
No logging
No tests
No environment separation
No authentication on private routes
No rate limiting
No HTTPS
No backup plan
No monitoring
No clean project structure
```

---

# 59. Recommended Learning Order

Follow this order:

```text
1. Kotlin basics
2. HTTP basics
3. REST API concept
4. Ktor project setup
5. Routing
6. GET and POST APIs
7. JSON serialization
8. Request and response DTO
9. Status codes
10. Error handling
11. Validation
12. Repository pattern
13. Service layer
14. Authentication basics
15. JWT concept
16. Database basics
17. PostgreSQL or MySQL
18. Exposed ORM
19. Environment variables
20. CORS
21. Logging
22. File upload/download
23. Pagination
24. API versioning
25. WebSocket
26. Background jobs
27. Ktor Client
28. Dependency Injection
29. Clean Architecture
30. Testing
31. Security
32. Rate limiting
33. Request signing
34. Docker
35. Nginx
36. Deployment
37. Monitoring
```

---

# 60. Mini Project: Simple User API

Build this project to practice Ktor.

Features:

```text
GET /health
GET /users
GET /users/{id}
POST /users
POST /login
DELETE /users/{id}
```

Data model:

```kotlin
@Serializable
data class User(
    val id: Int,
    val name: String,
    val email: String
)
```

Request model:

```kotlin
@Serializable
data class CreateUserRequest(
    val name: String,
    val email: String
)
```

Repository:

```kotlin
class UserRepository {
    private val users = mutableListOf<User>()

    fun getAll(): List<User> {
        return users
    }

    fun findById(id: Int): User? {
        return users.find { it.id == id }
    }

    fun create(request: CreateUserRequest): User {
        val user = User(
            id = users.size + 1,
            name = request.name,
            email = request.email
        )

        users.add(user)

        return user
    }

    fun delete(id: Int): Boolean {
        return users.removeIf { it.id == id }
    }
}
```

Routes:

```kotlin
fun Route.userRoutes(repository: UserRepository) {
    route("/users") {
        get {
            call.respond(repository.getAll())
        }

        get("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull()

            if (id == null) {
                call.respond(
                    HttpStatusCode.BadRequest,
                    ErrorResponse(message = "Invalid user ID")
                )
                return@get
            }

            val user = repository.findById(id)

            if (user == null) {
                call.respond(
                    HttpStatusCode.NotFound,
                    ErrorResponse(message = "User not found")
                )
                return@get
            }

            call.respond(user)
        }

        post {
            val request = call.receive<CreateUserRequest>()

            if (request.name.isBlank() || !request.email.contains("@")) {
                call.respond(
                    HttpStatusCode.BadRequest,
                    ErrorResponse(message = "Invalid user data")
                )
                return@post
            }

            val user = repository.create(request)

            call.respond(HttpStatusCode.Created, user)
        }

        delete("/{id}") {
            val id = call.parameters["id"]?.toIntOrNull()

            if (id == null) {
                call.respond(
                    HttpStatusCode.BadRequest,
                    ErrorResponse(message = "Invalid user ID")
                )
                return@delete
            }

            val deleted = repository.delete(id)

            if (!deleted) {
                call.respond(
                    HttpStatusCode.NotFound,
                    ErrorResponse(message = "User not found")
                )
                return@delete
            }

            call.respondText("User deleted successfully")
        }
    }
}
```

Main routing:

```kotlin
fun Application.configureRouting() {
    val userRepository = UserRepository()

    routing {
        get("/health") {
            call.respondText("Server is running")
        }

        userRoutes(userRepository)
    }
}
```

---

# Final Note

Ktor backend development is mainly about understanding:

```text
Request
Response
Route
DTO
Service
Repository
Database
Authentication
Validation
Error handling
Security
Testing
Deployment
```

Simple backend flow:

```text
Client App
   ↓
Ktor Route
   ↓
Validation
   ↓
Service Layer
   ↓
Repository Layer
   ↓
Database
   ↓
Response to Client
```
