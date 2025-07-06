---
title: Kotlin Class Types Overview
description: A quick overview of all class types in Kotlin, including regular classes, data classes, object declarations, sealed classes, abstract classes, and more—explaining their purpose and usage in concise terms.
author: tawhidmonowar
date: 2025-01-19 11:30:00 +06:00
categories: [Programming Language, Kotlin]
---

## Normal Class

A normal class is the most basic class type in Kotlin. It acts as a blueprint for creating objects and can contain `properties`, `methods`, and `constructors`.

```kotlin
// Define a class
class Person(val name: String, var age: Int) {
    
    // Member function
    fun introduce() {
        println("Hi, I'm $name and I'm $age years old.")
    }
}

// Main function
fun main() {
    // Create an object (instance) of the class
    val person1 = Person("Tawhid", 22)

    // Access properties and methods
    println(person1.name)      // Output: Tawhid
    println(person1.age)       // Output: 22
    person1.introduce()        // Output: Hi, I'm Tawhid and I'm 22 years old.

    // Modify a mutable property
    person1.age = 23
    person1.introduce()        // Output: Hi, I'm Tawhid and I'm 23 years old.
}

```

## Data Class 

A data class is a special class in Kotlin used to hold data. It automatically provides useful functions like `toString()`, `equals()`, `hashCode()`, and `copy()`.

```kotlin
// Define a data class
data class User(
    val name: String,
    val email: String
)

// Main function
fun main() {
    // Create an object of the data class
    val user1 = User("Tawhid", "tawhid@email.com")

    // Access properties
    println(user1.name)        // Output: Tawhid
    println(user1.email)       // Output: tawhid@email.com

    // Use auto-generated toString()
    println(user1)             // Output: User(name=Tawhid, email=tawhid@email.com)

    // Create a copy with a modified value
    val user2 = user1.copy(email = "new@email.com")
    println(user2)             // Output: User(name=Tawhid, email=new@email.com)

    // Compare objects
    println(user1 == user2)    // Output: false
}

```

## Singleton in Kotlin (Object)

In Kotlin, the `object` keyword is used to declare a singleton — a class with only one instance. It's useful for utilities, managers, or storing global state.

```kotlin

// Singleton object
object AppConfig {
    val appName = "Greedy Coder"
    var version = "1.0"

    fun printInfo() {
        println("App: $appName, Version: $version")
    }
}

// Main function
fun main() {
    // Access members directly without creating an instance
    AppConfig.printInfo()              // Output: App: Greedy Coder, Version: 1.0

    // Modify mutable properties
    AppConfig.version = "1.1"
    AppConfig.printInfo()              // Output: App: Greedy Coder, Version: 1.1
}

```

## Data Object

A data object is a singleton (`object`) that also behaves like a data class, meaning it automatically generates `toString()`, `equals()`, and `hashCode()`. It’s ideal when need a single, constant instance with identity and equality.

```kotlin
// Data object declaration
data object GuestUser {
    val name = "Guest"
    val role = "Viewer"
}

// Main function
fun main() {
    println(GuestUser)           // Output: GuestUser(name=Guest, role=Viewer)

    val user1 = GuestUser
    val user2 = GuestUser

    println(user1 == user2)      // Output: true (same instance)
    println(user1 === user2)     // Output: true (referential equality)
}

```
