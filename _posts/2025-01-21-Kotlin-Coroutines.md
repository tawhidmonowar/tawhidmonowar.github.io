---
title: Kotlin Coroutines
description: Kotlin Coroutines provide a way to write asynchronous, non-blocking code in a sequential and concise manner. They are lightweight threads that run within a CoroutineScope and help manage long-running tasks like network requests or database operations without blocking the main thread.
author: tawhidmonowar
date: 2025-01-21 11:30:00 +06:00
categories: [Programming Language, Kotlin]
---

## Thread

A Thread is the smallest unit of execution in a program. It allows program to perform multiple operations at the same time, enabling concurrent or parallel execution. Threads are heavier than coroutines and require more resources for context switching and management.

```kotlin
Thread {
    println("Running in background: ${Thread.currentThread().name}")
}.start()

```
## Coroutines

Coroutines are a modern solution for asynchronous and non-blocking programming. They are lightweight and can run concurrently without blocking the main thread, making them efficient for tasks like network requests or background processing. Coroutines use suspending functions (e.g., `delay()`) instead of blocking calls (e.g., `Thread.sleep()`), allowing smooth execution without freezing the UI. They follow structured concurrency, which helps manage their lifecycle and error handling in an organized way.

```kotlin
fun main() = runBlocking {
    launch {
        delay(1000) // Suspend for 1 second without blocking the thread
        println("World!")
    }
    println("Hello,")
}

```

## Coroutines vs Thread

Coroutines in Kotlin can `suspend` their execution without blocking the thread, allowing other tasks to run. This suspension is handled using suspend functions like `delay()`, which `pause` the coroutine at specific points and `resume` it later from the same state. Unlike `threads`, which block system resources when `paused`, coroutines are lightweight and efficient, making them ideal for asynchronous operations like network requests or database access.

## Suspend Function

A `suspend` function is a special type of function that can `pause` its execution without blocking the thread and `resume` later. These functions can only be called from a `coroutine` or another suspend function. They are mainly used to perform long-running or asynchronous operations like network requests or delays.

```kotlin
suspend fun cookFood() {
    println("Cooking started...")
    delay(2000) // Suspends the function for 2 seconds (non-blocking)
    println("Food is ready!")
}

fun main() = runBlocking {
    cookFood() // Calling suspend function from a coroutine
}
```



