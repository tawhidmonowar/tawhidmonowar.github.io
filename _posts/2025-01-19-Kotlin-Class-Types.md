---
title: Kotlin Class Types
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

## Singleton 

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

## Enum Class

An enum class is used to define a fixed set of constants. It’s great for representing states, options, or categories like days of the week, directions, or user roles.

```kotlin

enum class Direction {
    NORTH, SOUTH, EAST, WEST
}

enum class Planet(val gravity: Double) {
    EARTH(9.8),
    MARS(3.7),
    JUPITER(24.8)
}

fun main() {
    val dir = Direction.EAST
    println("Direction: $dir")         // Output: Direction: EAST

    val planet = Planet.MARS
    println("Planet: ${planet.name}")         // Output: Planet: MARS
    println("Gravity: ${planet.gravity} m/s²") // Output: Gravity: 3.7 m/s²
}

```

## Sealed Class

A sealed class is used to define a closed set of subclasses. All possible subclasses must be declared in the same file, which helps Kotlin ensure exhaustive when expressions.

```kotlin

// Sealed class declaration
sealed class Operation {
  
    // Subclasses in the same file
    class Add(val a: Int, val b: Int) : Operation()
    class Subtract(val a: Int, val b: Int) : Operation()
    object NoOp : Operation()

}

fun perform(op: Operation): Int {
    return when (op) {
        is Add -> op.a + op.b
        is Subtract -> op.a - op.b
        NoOp -> 0
    }
}

// Main function
fun main() {
    val result1 = perform(Add(10, 5))        // Output: 15
    val result2 = perform(Subtract(10, 5))   // Output: 5
    val result3 = perform(NoOp)              // Output: 0

    println(result1)
    println(result2)
    println(result3)
}

```

## Abstract class 

An abstract class in Kotlin defines a base class that cannot be instantiated and may contain both abstract methods (without body) and concrete methods (with implementation). It's used when you want to create a common structure for related classes while forcing them to implement specific behavior.

```kotlin

// Abstract base class
abstract class Sensor(val name: String) {
    abstract fun readValue(): Double

    fun displayInfo() {
        println("Reading from $name sensor")
    }
}

// Subclass
class TemperatureSensor : Sensor("Temperature") {
    override fun readValue(): Double {
        return 36.5  // Simulated temperature value
    }
}

// Main function
fun main() {
    val tempSensor = TemperatureSensor()
    tempSensor.displayInfo()            // Output: Reading from Temperature sensor
    println("Value: ${tempSensor.readValue()} °C")  // Output: Value: 36.5 °C
}

```

## Open Class

By default, all classes in Kotlin are `final`, meaning they can’t be inherited. To allow a class to be subclassed, you must mark it with the `open` keyword.

```kotlin

// Base class marked as open
open class Vehicle {
    open fun start() {
        println("Vehicle is starting...")
    }
}

// Subclass
class Car : Vehicle() {
    override fun start() {
        println("Car is starting with key ignition.")
    }
}

// Main function
fun main() {
    val myCar = Car()
    myCar.start()   // Output: Car is starting with key ignition.
}

```

## Anonymous Class

An anonymous class is an instance of a class created on-the-fly without explicitly declaring a subclass. It’s often used to implement interfaces or abstract classes quickly for one-time use. In Kotlin, you create anonymous classes using the  `object` expression.

```kotlin

// Abstract class
abstract class Sensor(val name: String) {
    abstract fun readValue(): Double
}

// Main function
fun main() {
    val lightSensor = object : Sensor("Light") {
        override fun readValue(): Double {
            return 120.0  // Simulated lux value
        }
    }

    println("Sensor: ${lightSensor.name}")             // Output: Sensor: Light
    println("Reading: ${lightSensor.readValue()} lx")  // Output: Reading: 120.0 lx
}

```

## Value Class

A value class is a special kind of class introduced to provide type safety without runtime overhead. It wraps a single property but, at runtime, the compiler tries to avoid allocating an object, treating the value class like its underlying type (called inline class previously).

```kotlin
@JvmInline
value class Email(val value: String) {
    fun isValid(): Boolean {
        // Simple regex for email validation (basic example)
        return Regex("^[A-Za-z](.*)([@]{1})(.+)(\\.)(.+)").matches(value)
    }
}

fun sendWelcomeEmail(email: Email) {
    if (email.isValid()) {
        println("Sending welcome email to ${email.value}")
    } else {
        println("Invalid email: ${email.value}")
    }
}

fun main() {
    val email1 = Email("user@example.com")
    val email2 = Email("invalid-email")

    sendWelcomeEmail(email1)  // Output: Sending welcome email to user@example.com
    sendWelcomeEmail(email2)  // Output: Invalid email: invalid-email
}

```

## Annotation Class

An annotation class is a special kind of class used to attach metadata to code elements (classes, functions, properties, etc.). Annotations can be used by the compiler, tools, or libraries for processing code.

```kotlin
// Define an annotation class
annotation class Info(val author: String, val version: Int)

// Use annotation on a class
@Info(author = "Tawhid", version = 1)
class MyClass {
    // ...
}

// Accessing annotation via reflection (optional)
fun main() {
    val annotations = MyClass::class.annotations
    for (annotation in annotations) {
        println(annotation)
    }
}

```

## Inner class

An `inner` class is a nested class that holds a reference to an instance of its outer class. It can access members (including private ones) of the outer class. To declare an inner class in Kotlin, you use the inner keyword.

```kotlin
class Sensor(val type: String) {
    private val id = 101

    inner class Calibration {
        fun showInfo() {
            println("Calibrating sensor type: $type with id: $id")
        }
    }
}

fun main() {
    val sensor = Sensor("Temperature")
    val calibration = sensor.Calibration()
    calibration.showInfo()  
    // Output: Calibrating sensor type: Temperature with id: 101
}

```
