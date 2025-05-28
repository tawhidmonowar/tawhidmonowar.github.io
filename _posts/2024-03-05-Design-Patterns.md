---
title: Design Patterns
description: A design pattern is a reusable solution to common problems in software development. There are different types of design patterns, such as creational patterns, which focus on how objects are created and ensure efficient and controlled creation, and architectural patterns, which define the overall structure and organization of an application to improve maintainability and scalability. 
author: tawhidmonowar
date: 2024-03-05 12:00:00 +06:00
categories: [Development, Design Patterns]
---

## Architectural Design Patterns

An architectural design pattern is a general, reusable solution to a commonly occurring problem in software architecture. It defines how software components should be organized and interact — focusing on the high-level structure of an application.

### Clean Architecture 

Clean Architecture is a software design pattern that emphasizes separation of concerns, testability, and maintainability by organizing code into distinct layers. In Android development, it's often structured into the following layers:

Presentation Layer

- Handles the UI and user interactions.
- Uses ViewModels or MVI/MVVM patterns.
- Communicates with the domain layer to perform actions or fetch data.

Domain Layer

- Contains business logic and application rules.
- Independent of any frameworks or libraries.
- Includes use cases (interactors) that encapsulate specific functionality.

Data Layer

- Manages data sources (e.g., local database, network API).
- Implements repository interfaces defined in the domain layer.

![clean architecture](/assets/img/posts/clean-arc.png)

Benefits:

- **Testable**: Each layer can be tested independently.
- **Maintainable**: Clear boundaries make the code easier to update or refactor.
- **Scalable**: Easy to add new features or switch data sources without affecting other layers.

**Example**: Get User Name

**Domain Layer:**

```kotlin
class GetUserNameUseCase(private val userRepository: UserRepository) {
    fun execute(): String {
        return userRepository.getUserName()
    }
}

interface UserRepository {
    fun getUserName(): String
}
```

**Data Layer:**

```kotlin
class UserRepositoryImpl : UserRepository {
    override fun getUserName(): String {
        return "tawhidmonowar" // could be from API or DB
    }
}
```

**Presentation Layer (ViewModel):**

```kotlin
class UserViewModel(private val getUserNameUseCase: GetUserNameUseCase) {
    fun showUserName(): String {
        return getUserNameUseCase.execute()
    }
}
```

### MVVM (Model–View–ViewModel)

MVVM is a design pattern that separates UI (View), business logic (ViewModel), and data (Model). It is widely used in Android. MVVM is an architectural pattern that divides an application into three core components:

![Model–View–ViewModel](/assets/img/posts/mvvm.png)

- **View**: This layer handles the user interface (UI) elements and their layout. It displays data to the user and captures user interactions.
- **ViewModel**: This layer acts as the intermediary between the Model and the View. It prepares the data for the View in a consumable way, handles business logic, and exposes observable data streams to the View.
- **Model**: This layer represents the data of a application. It interacts with data sources like databases or network APIs.
  
Example: Task Manager

**1) `Task` (Model)**

```kotlin
data class Task(
    val id: Int,
    val title: String,
    val isDone: Boolean = false
)
```
{: file='Task.kt'}


**2) `TaskViewModel` (ViewModel)**

```kotlin
class TaskViewModel : ViewModel() {

    private var nextId = 1

    // Empty task list initially
    var tasks by mutableStateOf(listOf<Task>())
        private set

    // Add a new task
    fun addTask(title: String) {
        if (title.isNotBlank()) {
            val newTask = Task(id = nextId++, title = title.trim())
            tasks = tasks + newTask
        }
    }

    // Toggle completion status
    fun toggleTaskDone(taskId: Int) {
        tasks = tasks.map { task ->
            if (task.id == taskId) task.copy(isDone = !task.isDone) else task
        }
    }

    // Delete a task
    fun deleteTask(taskId: Int) {
        tasks = tasks.filter { it.id != taskId }
    }
}
```
{: file='TaskViewModel.kt'}

**3) `TaskScreen` (Compose UI/View)**

```kotlin
@Composable
fun TaskScreen(viewModel: TaskViewModel) {
    var newTaskTitle by remember { mutableStateOf("") }
    val tasks = viewModel.tasks

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Task Manager", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(16.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            TextField(
                value = newTaskTitle,
                onValueChange = { newTaskTitle = it },
                placeholder = { Text("Enter new task") },
                modifier = Modifier.weight(1f)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Button(onClick = {
                viewModel.addTask(newTaskTitle)
                newTaskTitle = ""
            }) {
                Text("Add")
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        if (tasks.isEmpty()) {
            Text(
                text = "No tasks yet. Add one above!",
                style = MaterialTheme.typography.bodyLarge
            )
        } else {
            LazyColumn {
                items(tasks) { task ->
                    TaskItem(
                        taskTitle = task.title,
                        isDone = task.isDone,
                        onToggle = { viewModel.toggleTaskDone(task.id) },
                        onDelete = { viewModel.deleteTask(task.id) }
                    )
                }
            }
        }
    }
}

@Composable
fun TaskItem(
    taskTitle: String,
    isDone: Boolean,
    onToggle: () -> Unit,
    onDelete: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .clickable { onToggle() },
        verticalAlignment = Alignment.CenterVertically
    ) {
        Checkbox(
            checked = isDone,
            onCheckedChange = { onToggle() }
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = taskTitle,
            style = MaterialTheme.typography.bodyLarge,
            modifier = Modifier.weight(1f)
        )
        IconButton(onClick = onDelete) {
            Icon(Icons.Default.Delete, contentDescription = "Delete Task")
        }
    }
}
```
{: file='TaskScreen.kt'}

**4) `MainActivity`**

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            TaskAppTheme {
                val viewModel: TaskViewModel = viewModel()
                TaskScreen(viewModel)
            }
        }
    }
}
```
{: file='MainActivity.kt'}

### MVI (Model-View-Intent)

MVI, the most recent addition to the MV* family, structures an application into three components.

- **Model**: Represents the states for the UI
- **View**: Represents the UI itself
- **Intent**: Represents actions triggering state updates

The following diagram provides a comprehensive overview of the MVI architecture.

![mvi](/assets/img/posts/mvi.jpg)

Example: Task Manager

**1) `Task` (Model)**
   
```kotlin
data class Task(
    val id: Int,
    val title: String,
    val isDone: Boolean = false
)
```
{: file='Task.kt'}

**2) `TaskState` (State)**

```kotlin
data class TaskState(
    val tasks: List<Task> = emptyList(),
    val input: String = ""
)
```
{: file='TaskState.kt'}

**3) `Intents` (User actions)**

```kotlin
sealed class TaskIntent {
    data class AddTask(val title: String) : TaskIntent()
    data class ToggleTaskDone(val taskId: Int) : TaskIntent()
    data class DeleteTask(val taskId: Int) : TaskIntent()
    data class UpdateInput(val input: String) : TaskIntent()
}
```
{: file='TaskIntent.kt'}

**4) `ViewModel` (State + Intent processing)**

```kotlin
class TaskViewModel : ViewModel() {

    private var nextId = 1

    private val _state = MutableStateFlow(TaskState())
    val state: StateFlow<TaskState> = _state.asStateFlow()

    fun process(intent: TaskIntent) {
        when (intent) {
            is TaskIntent.AddTask -> addTask(intent.title)
            is TaskIntent.ToggleTaskDone -> toggleTaskDone(intent.taskId)
            is TaskIntent.DeleteTask -> deleteTask(intent.taskId)
            is TaskIntent.UpdateInput -> updateInput(intent.input)
        }
    }

    private fun addTask(title: String) {
        if (title.isBlank()) return

        _state.update { currentState ->
            val newTask = Task(id = nextId++, title = title.trim())
            currentState.copy(
                tasks = currentState.tasks + newTask,
                input = ""
            )
        }
    }

    private fun toggleTaskDone(taskId: Int) {
        _state.update { currentState ->
            currentState.copy(
                tasks = currentState.tasks.map {
                    if (it.id == taskId) it.copy(isDone = !it.isDone) else it
                }
            )
        }
    }

    private fun deleteTask(taskId: Int) {
        _state.update { currentState ->
            currentState.copy(
                tasks = currentState.tasks.filter { it.id != taskId }
            )
        }
    }

    private fun updateInput(input: String) {
        _state.update { currentState ->
            currentState.copy(input = input)
        }
    }
}
```
{: file='ViewModel.kt'}

**5) Composable UI TaskScreen**

```kotlin
@Composable
fun TaskScreen(viewModel: TaskViewModel) {
    val state by viewModel.state.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Task Manager (MVI)", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(16.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            TextField(
                value = state.input,
                onValueChange = { viewModel.process(TaskIntent.UpdateInput(it)) },
                placeholder = { Text("Enter new task") },
                modifier = Modifier.weight(1f)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Button(
                onClick = { viewModel.process(TaskIntent.AddTask(state.input)) }
            ) {
                Text("Add")
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        if (state.tasks.isEmpty()) {
            Text(
                text = "No tasks yet. Add one above!",
                style = MaterialTheme.typography.bodyLarge
            )
        } else {
            LazyColumn {
                items(state.tasks) { task ->
                    TaskItem(
                        taskTitle = task.title,
                        isDone = task.isDone,
                        onToggle = { viewModel.process(TaskIntent.ToggleTaskDone(task.id)) },
                        onDelete = { viewModel.process(TaskIntent.DeleteTask(task.id)) }
                    )
                }
            }
        }
    }
}

@Composable
fun TaskItem(
    taskTitle: String,
    isDone: Boolean,
    onToggle: () -> Unit,
    onDelete: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .clickable { onToggle() },
        verticalAlignment = Alignment.CenterVertically
    ) {
        Checkbox(
            checked = isDone,
            onCheckedChange = { onToggle() }
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(
            text = taskTitle,
            style = MaterialTheme.typography.bodyLarge,
            modifier = Modifier.weight(1f)
        )
        IconButton(onClick = onDelete) {
            Icon(Icons.Default.Delete, contentDescription = "Delete Task")
        }
    }
}
```
{: file='TaskScreen.kt'}

**6) MainActivity**

```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            val viewModel: TaskViewModel = viewModel()
            TaskScreen(viewModel)
        }
    }
}
```
{: file='MainActivity.kt'}

## Creational Design Patterns

Creational design patterns are a category of design patterns focused on object creation mechanisms. They provide flexible ways to create objects, helping to control how objects are instantiated, while hiding the creation logic from the client.

