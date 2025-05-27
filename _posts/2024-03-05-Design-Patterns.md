---
title: Design Patterns
description: A design pattern is a reusable solution to common problems in software development. There are different types of design patterns, such as creational patterns, which focus on how objects are created and ensure efficient and controlled creation, and architectural patterns, which define the overall structure and organization of an application to improve maintainability and scalability. 
author: tawhidmonowar
date: 2024-03-05 12:00:00 +06:00
categories: [Development, Design Patterns]
---

## Architectural Design Patterns

An architectural design pattern is a general, reusable solution to a commonly occurring problem in software architecture. It defines how software components should be organized and interact — focusing on the high-level structure of an application.

### MVVM (Model–View–ViewModel)

MVVM is a design pattern that separates UI (View), business logic (ViewModel), and data (Model). It is widely used in Android. MVVM is an architectural pattern that divides an application into three core components:

![Model–View–ViewModel](/assets/img/posts/mvvm.png)

- **View**: This layer handles the user interface (UI) elements and their layout. It displays data to the user and captures user interactions.
- **ViewModel**: This layer acts as the intermediary between the Model and the View. It prepares the data for the View in a consumable way, handles business logic, and exposes observable data streams to the View.
- **Model**: This layer represents the data of a application. It interacts with data sources like databases or network APIs.
  
Example: Task Manager

1. `Task.kt` (Model)

```kotlin
data class Task(
    val id: Int,
    val title: String,
    val isDone: Boolean = false
)
```
{: file='Task.kt'}


2. `TaskViewModel.kt` (ViewModel)

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

3. `TaskScreen.kt` (Compose UI/View)

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

4. `MainActivity.kt`

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

## Creational Design Patterns

Creational design patterns are a category of design patterns focused on object creation mechanisms. They provide flexible ways to create objects, helping to control how objects are instantiated, while hiding the creation logic from the client.

