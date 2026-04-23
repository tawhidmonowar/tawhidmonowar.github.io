---
title: Ktor Backend
description: Ktor is a lightweight, and asynchronous framework developed by JetBrains for building web applications, HTTP services, and mobile backends using Kotlin.
author: tawhidmonowar
date: 2026-02-15 11:30:00 +06:00
categories: [Development, iOS Development]
---

## 1. What is App Architecture in iOS?
**Answer:** App architecture defines how different parts of an application are structured and interact with each other. A good architecture ensures:
- Maintainability (easy to update)
- Scalability (can grow easily)
- Testability (easy to write unit tests)
- Separation of concerns (each component has a clear responsibility)

## 2. What are the most common iOS architectures?
**Answer:**  
- MVC (Model-View-Controller)
- MVVM (Model-View-ViewModel)
- MVP (Model-View-Presenter)
- VIPER (View-Interactor-Presenter-Entity-Router)
- Clean Architecture

Each architecture solves problems of the previous one.

## 3. What is MVC?
**Answer:**  
MVC divides app into:
- Model → Data + business logic
- View → UI layer
- Controller → Handles interaction between Model & View

**Flow:**  
User → View → Controller → Model → Controller → View

**Problem:**  
In iOS, ViewController becomes overloaded → “Massive View Controller”

## 4. What is MVVM?
**Answer:**  
MVVM separates logic from UI:
- Model → Data
- View → UI
- ViewModel → Business logic + state

**Key Concept:** Binding (View updates automatically)

**Advantages:**
- Cleaner code
- Better testability
- Works well with SwiftUI

## 5. What is MVP?
**Answer:**  
- Model → Data
- View → Passive UI
- Presenter → Handles all logic

**Flow:**  
View → Presenter → Model → Presenter → View

**Advantages:**
- Testable
- No logic in View

**Disadvantages:**
- Too much boilerplate

## 6. What is VIPER?
**Answer:**  
VIPER splits app into modules:

- View → UI
- Interactor → Business logic
- Presenter → Connects View & Interactor
- Entity → Data
- Router → Navigation

**Advantages:**
- Highly scalable
- Very clean separation

**Disadvantages:**
- Too complex for small apps
- Lots of files

## 7. What is Clean Architecture?
**Answer:**  
Clean Architecture divides app into layers:

- Presentation Layer (UI)
- Domain Layer (Business logic)
- Data Layer (API/Database)

**Rule:** Dependencies go inward only.

**Benefits:**
- Highly testable
- Independent layers
- Easy to scale

## 8. MVC vs MVVM?
**Answer:**

| Feature | MVC | MVVM |
|--------|-----|------|
| Complexity | Low | Medium |
| Testability | Poor | Good |
| Logic Location | Controller | ViewModel |
| UI Binding | Manual | Automatic |

## 9. MVVM vs VIPER?
**Answer:**

| Feature | MVVM | VIPER |
|--------|------|------|
| Simplicity | Easy | Complex |
| Scalability | Medium | High |
| Learning Curve | Low | High |
| Files | Less | More |

## 10. What is Dependency Injection?
**Answer:**  
Dependency Injection (DI) means passing dependencies from outside rather than creating them inside a class.

**Example:**  
Instead of creating API service inside ViewModel, inject it.

**Benefits:**
- Easier testing
- Loose coupling

## 11. What is Singleton Pattern?
**Answer:**  
Ensures only one instance exists in the app.

**Example Use Cases:**
- Network Manager
- User Session

**Problem:** Hard to test if overused.

## 12. What is Factory Pattern?
**Answer:**  
Factory pattern creates objects without exposing creation logic.

**Use Case:**  
Creating different types of ViewModels or services.

## 13. What is Observer Pattern?
**Answer:**  
Allows objects to observe changes in another object.

**Example:**
- Combine framework
- NotificationCenter

## 14. What is Delegate Pattern?
**Answer:**  
Used for communication between two objects.

**Example:**
- UITableViewDelegate
- UITextFieldDelegate

## 15. What is Protocol-Oriented Programming?
**Answer:**  
Instead of inheritance, use protocols to define behavior.

**Benefits:**
- Flexibility
- Reusability
- Cleaner architecture

## 16. What is Coordinator Pattern?
**Answer:**  
Moves navigation logic out of ViewControllers.

**Benefits:**
- Cleaner ViewControllers
- Reusable navigation

## 17. What is Repository Pattern?
**Answer:**  
Abstracts data sources.

Instead of calling API directly:
ViewModel → Repository → API/DB

## 18. What is UseCase (Interactor)?
**Answer:**  
Encapsulates business logic.

Example:
- LoginUserUseCase
- FetchPostsUseCase

## 19. What is SOLID Principle?
**Answer:**
- S → Single Responsibility
- O → Open/Closed
- L → Liskov Substitution
- I → Interface Segregation
- D → Dependency Inversion

These principles improve architecture quality.

## 20. Which architecture should you choose?
**Answer:**
- Small apps → MVC / MVVM
- Medium apps → MVVM + Coordinator
- Large apps → Clean Architecture / VIPER

## 21. What is the best architecture for SwiftUI?
**Answer:**  
MVVM is most suitable because SwiftUI is state-driven.

## 22. How does SwiftUI change architecture?
**Answer:**  
- Removes heavy controllers
- Uses state-driven UI
- Encourages MVVM

## 23. What is Unidirectional Data Flow?
**Answer:**  
Data flows in one direction:

State → View → Action → State Update → UI Refresh

## 24. What is State Management?
**Answer:**  
Managing UI data using:
- @State
- @StateObject
- @ObservedObject

## 25. What is the main goal of architecture?
**Answer:**
- Clean code
- Maintainability
- Scalability
- Testability
