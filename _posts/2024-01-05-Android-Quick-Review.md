---
title: Android Quick Review
description: A concise summary of essential Android concepts and frequently asked questions compiled to strengthen understanding and support technical preparation.
author: tawhidmonowar
date: 2024-01-02 11:30:00 +06:00
categories: [Development, Android Development]
---

## 1. Kotlin Mastery

Kotlin is the primary language for modern Android development. A strong Android developer should deeply understand Kotlin syntax, null safety, OOP, functional programming, coroutines, Flow, and clean code practices.

---

### Variables and Constants

Kotlin uses `val` for read-only values and `var` for changeable values.

```kotlin
fun main() {
    val appName = "My Android App" // Read-only
    var downloadCount = 100        // Changeable

    downloadCount = 150

    println(appName)
    println(downloadCount)
}
```

---

### Data Class

A `data class` is commonly used for models, API responses, UI state, and database entities.

```kotlin
data class User(
    val id: Int,
    val name: String,
    val isPremium: Boolean
)

fun main() {
    val user = User(id = 1, name = "Envobyte", isPremium = true)

    println(user.name)
}
```

---

### Class

A class is used to create objects with properties and functions.

```kotlin
class UserManager {
    var username: String = "Guest"

    fun updateName(name: String) {
        username = name
    }
}

fun main() {
    val manager = UserManager()
    manager.updateName("Envobyte")

    println(manager.username)
}
```

---

### Object

`object` creates a singleton class.

```kotlin
object AppConfig {
    const val BASE_URL = "https://api.example.com"
    const val APP_NAME = "My Android App"
}

fun main() {
    println(AppConfig.BASE_URL)
}
```

---

### Companion Object

`companion object` is used for static-like members inside a class.

```kotlin
class AppConstants {
    companion object {
        const val MAX_RETRY = 3
    }
}

fun main() {
    println(AppConstants.MAX_RETRY)
}
```

---

### Null Safety

Kotlin uses nullable types to prevent null pointer crashes.

```kotlin
fun main() {
    val username: String? = "Envobyte"

    if (username != null) {
        println(username.length)
    } else {
        println("No username found")
    }
}
```

---

### Safe Call Operator

The safe call operator `?.` safely accesses nullable values.

```kotlin
fun main() {
    val username: String? = null

    println(username?.length)
}
```

---

### Elvis Operator

The Elvis operator `?:` provides a default value when something is null.

```kotlin
fun main() {
    val username: String? = null

    val finalName = username ?: "Guest"

    println(finalName)
}
```

---

### Lateinit

`lateinit` is used when a non-null variable will be initialized later.

```kotlin
class ProfileManager {
    lateinit var username: String

    fun setup() {
        username = "Envobyte"
    }

    fun printName() {
        println(username)
    }
}
```

---

### Lazy Initialization

`lazy` initializes a value only when it is first used.

```kotlin
val apiService by lazy {
    "Api Service Created"
}

fun main() {
    println(apiService)
}
```

---

### Function

Functions are reusable blocks of code.

```kotlin
fun greetUser(name: String): String {
    return "Hello, $name"
}

fun main() {
    println(greetUser("Envobyte"))
}
```

---

### Lambda

Lambda is an anonymous function.

```kotlin
fun main() {
    val greeting: (String) -> String = { name ->
        "Hello, $name"
    }

    println(greeting("Envobyte"))
}
```

---

### Higher-Order Function

A higher-order function takes another function as a parameter.

```kotlin
fun performAction(action: () -> Unit) {
    action()
}

fun main() {
    performAction {
        println("Action executed")
    }
}
```

---

### Extension Function

Extension functions add new functionality to existing classes.

```kotlin
fun String.addWelcomeText(): String {
    return "Welcome, $this"
}

fun main() {
    val name = "Envobyte"
    println(name.addWelcomeText())
}
```

---

### Sealed Class

Sealed classes are useful for representing fixed states such as loading, success, and error.

```kotlin
sealed class UiState {
    object Loading : UiState()
    data class Success(val data: String) : UiState()
    data class Error(val message: String) : UiState()
}

fun handleState(state: UiState) {
    when (state) {
        is UiState.Loading -> println("Loading...")
        is UiState.Success -> println(state.data)
        is UiState.Error -> println(state.message)
    }
}
```

---

### Enum Class

Enum is used when a value can be one of a fixed set of options.

```kotlin
enum class UserType {
    FREE,
    PREMIUM,
    ADMIN
}

fun main() {
    val type = UserType.PREMIUM

    println(type)
}
```

---

### Interface

Interfaces define rules that classes must follow.

```kotlin
interface Downloader {
    fun download()
}

class VideoDownloader : Downloader {
    override fun download() {
        println("Video download started")
    }
}

fun main() {
    val downloader = VideoDownloader()
    downloader.download()
}
```

---

### Generics

Generics help write reusable and type-safe code.

```kotlin
fun <T> printValue(value: T) {
    println(value)
}

fun main() {
    printValue("Hello")
    printValue(100)
    printValue(true)
}
```

---

### Collection Functions

Kotlin collection functions make data transformation easier.

```kotlin
fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)

    val evenNumbers = numbers.filter { it % 2 == 0 }
    val squaredNumbers = numbers.map { it * it }

    println(evenNumbers)
    println(squaredNumbers)
}
```

---

## 2. Android Fundamentals

Android fundamentals include Activity, Fragment, Lifecycle, Intent, Context, Manifest, permissions, resources, and app components.

---

### Activity

An `Activity` represents a single screen in an Android app.

```kotlin
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.Text

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            Text(text = "Hello Android")
        }
    }
}
```

---

### Activity Lifecycle

The Activity lifecycle controls how a screen behaves when it starts, pauses, resumes, or stops.

```kotlin
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("Lifecycle", "onCreate called")
    }

    override fun onStart() {
        super.onStart()
        Log.d("Lifecycle", "onStart called")
    }

    override fun onResume() {
        super.onResume()
        Log.d("Lifecycle", "onResume called")
    }

    override fun onPause() {
        super.onPause()
        Log.d("Lifecycle", "onPause called")
    }

    override fun onStop() {
        super.onStop()
        Log.d("Lifecycle", "onStop called")
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d("Lifecycle", "onDestroy called")
    }
}
```

---

### Context

`Context` gives access to app resources, system services, files, preferences, and more.

```kotlin
fun showPackageName(context: android.content.Context) {
    val packageName = context.packageName
    println(packageName)
}
```

---

### Intent

Intent is used to open another Activity, share data, open links, or communicate with Android system components.

```kotlin
import android.content.Context
import android.content.Intent
import android.net.Uri

fun openWebsite(context: Context) {
    val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://example.com"))
    context.startActivity(intent)
}
```

---

### Explicit Intent

Explicit Intent opens a specific Activity inside your app.

```kotlin
val intent = Intent(this, DetailsActivity::class.java)
startActivity(intent)
```

---

### Android Manifest

The Android Manifest declares app components, permissions, package settings, and app metadata.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:theme="@style/Theme.MyApp"
        android:label="@string/app_name">

        <activity
            android:name=".MainActivity"
            android:exported="true" />

    </application>

</manifest>
```

---

### Resources

Android resources include strings, colors, drawables, dimensions, and themes.

```xml
<!-- res/values/strings.xml -->
<resources>
    <string name="app_name">My Android App</string>
    <string name="welcome_text">Welcome to Android</string>
</resources>
```

```kotlin
val appName = context.getString(R.string.app_name)
```

---

## 3. Jetpack Compose

Jetpack Compose is Android's modern declarative UI toolkit. It helps build UI faster with Kotlin code instead of XML layouts.

---

### Basic Composable

A composable function describes part of your UI.

```kotlin
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

@Composable
fun Greeting() {
    Text(text = "Hello Jetpack Compose")
}
```

---

### Layout

Jetpack Compose supports layout systems based on `Column`, `Row`, and `Box`. These are similar to `VStack`, `HStack`, and `ZStack` in SwiftUI.

```kotlin
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

@Composable
fun LayoutExample() {
    Column {
        Text(text = "Envobyte")
        Text(text = "Android Developer")
    }
}
```

---

### Row

`Row` arranges components horizontally.

```kotlin
import androidx.compose.foundation.layout.Row
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Star
import androidx.compose.runtime.Composable

@Composable
fun RowExample() {
    Row {
        Icon(
            imageVector = Icons.Default.Star,
            contentDescription = "Premium"
        )

        Text(text = "Premium User")
    }
}
```

---

### Box

`Box` places components on top of each other.

```kotlin
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color

@Composable
fun BoxExample() {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Blue)
    ) {
        Text(text = "Welcome")
    }
}
```

---

### Modifier

`Modifier` is used to control size, padding, background, click, border, alignment, and more.

```kotlin
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun ModifierExample() {
    Text(
        text = "Hello Modifier",
        modifier = Modifier
            .background(Color.LightGray)
            .padding(16.dp)
    )
}
```

---

### State with remember

`remember` stores state inside a composable while it is in composition.

```kotlin
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.*

@Composable
fun CounterScreen() {
    var count by remember { mutableStateOf(0) }

    Button(onClick = { count++ }) {
        Text(text = "Count: $count")
    }
}
```

---

### rememberSaveable

`rememberSaveable` keeps state across configuration changes like screen rotation.

```kotlin
import androidx.compose.material3.OutlinedTextField
import androidx.compose.runtime.*

@Composable
fun NameInput() {
    var name by rememberSaveable { mutableStateOf("") }

    OutlinedTextField(
        value = name,
        onValueChange = { name = it },
        label = {
            Text(text = "Name")
        }
    )
}
```

---

### State Hoisting

State hoisting means moving state up and passing value plus event callback to child composables.

```kotlin
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.*

@Composable
fun ParentCounter() {
    var count by remember { mutableStateOf(0) }

    CounterButton(
        count = count,
        onIncrease = {
            count++
        }
    )
}

@Composable
fun CounterButton(
    count: Int,
    onIncrease: () -> Unit
) {
    Button(onClick = onIncrease) {
        Text(text = "Count: $count")
    }
}
```

---

### LazyColumn

`LazyColumn` is used for efficient vertical lists.

```kotlin
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

@Composable
fun UserList() {
    val users = listOf("Envobyte", "Alex", "John", "Sarah")

    LazyColumn {
        items(users) { user ->
            Text(text = user)
        }
    }
}
```

---

### Card

Cards are useful for modern UI sections.

```kotlin
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun PremiumCard() {
    Card(
        modifier = Modifier.padding(16.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(text = "Premium Plan")
            Text(text = "Unlock all features")
        }
    }
}
```

---

### Button

```kotlin
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

@Composable
fun PrimaryButton() {
    Button(
        onClick = {
            println("Button clicked")
        }
    ) {
        Text(text = "Continue")
    }
}
```

---

### TextField

```kotlin
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.*

@Composable
fun EmailField() {
    var email by remember { mutableStateOf("") }

    OutlinedTextField(
        value = email,
        onValueChange = { email = it },
        label = {
            Text(text = "Email")
        }
    )
}
```

---

### Dialog

```kotlin
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.*

@Composable
fun DeleteDialogExample() {
    var showDialog by remember { mutableStateOf(false) }

    Button(onClick = { showDialog = true }) {
        Text(text = "Delete")
    }

    if (showDialog) {
        AlertDialog(
            onDismissRequest = {
                showDialog = false
            },
            title = {
                Text(text = "Delete File?")
            },
            text = {
                Text(text = "Are you sure you want to delete this file?")
            },
            confirmButton = {
                Button(onClick = { showDialog = false }) {
                    Text(text = "Delete")
                }
            },
            dismissButton = {
                Button(onClick = { showDialog = false }) {
                    Text(text = "Cancel")
                }
            }
        )
    }
}
```

---

### Side Effect with LaunchedEffect

`LaunchedEffect` runs suspend code when a composable enters composition or when its key changes.

```kotlin
import androidx.compose.material3.Text
import androidx.compose.runtime.*

@Composable
fun UserScreen(userId: Int) {
    var username by remember { mutableStateOf("Loading...") }

    LaunchedEffect(userId) {
        username = "User ID: $userId"
    }

    Text(text = username)
}
```

---

### DisposableEffect

`DisposableEffect` is useful when you need cleanup logic.

```kotlin
import androidx.compose.runtime.*

@Composable
fun LifecycleObserverExample() {
    DisposableEffect(Unit) {
        println("Started observing")

        onDispose {
            println("Stopped observing")
        }
    }
}
```

---

### Animation

```kotlin
import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.background
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun AnimationExample() {
    var expanded by remember { mutableStateOf(false) }

    Box(
        modifier = Modifier
            .animateContentSize()
            .size(if (expanded) 200.dp else 100.dp)
            .background(Color.Blue)
    )

    Button(onClick = { expanded = !expanded }) {
        Text(text = "Animate")
    }
}
```

---

### Preview

Preview helps you see UI without running the full app.

```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.material3.Text

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Text(text = "Preview UI")
}
```

---

## 4. XML and View System

Even though Compose is modern, many production apps still use XML and the traditional View system. A strong Android developer should understand both Compose and XML.

---

### XML Layout

```xml
<!-- res/layout/activity_main.xml -->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical">

    <TextView
        android:id="@+id/titleText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello XML"
        android:textSize="24sp" />

</LinearLayout>
```

---

### Using XML in Activity

```kotlin
import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class XmlActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val titleText = findViewById<TextView>(R.id.titleText)
        titleText.text = "Updated Text"
    }
}
```

---

### ViewBinding

ViewBinding gives type-safe access to XML views.

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.titleText.text = "Hello ViewBinding"
    }
}
```

---

### RecyclerView

RecyclerView is used to show large scrollable lists in XML-based apps.

```kotlin
data class Product(
    val name: String,
    val price: String
)

class ProductAdapter(
    private val products: List<Product>
) : RecyclerView.Adapter<ProductAdapter.ProductViewHolder>() {

    class ProductViewHolder(val textView: TextView) : RecyclerView.ViewHolder(textView)

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val textView = TextView(parent.context)
        return ProductViewHolder(textView)
    }

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        holder.textView.text = products[position].name
    }

    override fun getItemCount(): Int {
        return products.size
    }
}
```

---

## 5. Android Architecture

Architecture helps create scalable, testable, and maintainable apps. The most common professional approach is MVVM with Repository pattern and Clean Architecture.

---

### MVVM

MVVM means Model, View, and ViewModel.

- Model contains data.
- View displays UI.
- ViewModel holds UI state and business logic.

```kotlin
data class Product(
    val id: Int,
    val name: String,
    val price: Double
)

data class ProductUiState(
    val isLoading: Boolean = false,
    val products: List<Product> = emptyList(),
    val errorMessage: String? = null
)
```

---

### ViewModel

ViewModel survives configuration changes and manages screen state.

```kotlin
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class ProductViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(ProductUiState())
    val uiState: StateFlow<ProductUiState> = _uiState

    fun loadProducts() {
        _uiState.value = ProductUiState(
            products = listOf(
                Product(1, "Monthly Plan", 4.99),
                Product(2, "Yearly Plan", 29.99)
            )
        )
    }
}
```

---

### ViewModel with Compose

```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun ProductScreen(
    viewModel: ProductViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()

    if (uiState.isLoading) {
        Text(text = "Loading...")
    } else {
        LazyColumn {
            items(uiState.products) { product ->
                Text(text = product.name)
            }
        }
    }
}
```

---

### Repository Pattern

Repository separates data logic from ViewModel.

```kotlin
interface ProductRepository {
    suspend fun getProducts(): List<Product>
}

class ProductRepositoryImpl : ProductRepository {
    override suspend fun getProducts(): List<Product> {
        return listOf(
            Product(1, "Monthly Plan", 4.99),
            Product(2, "Lifetime Plan", 49.99)
        )
    }
}
```

---

### Use Case

Use cases keep business logic separate and reusable.

```kotlin
class GetProductsUseCase(
    private val repository: ProductRepository
) {
    suspend operator fun invoke(): List<Product> {
        return repository.getProducts()
    }
}
```

---

### Clean Architecture Layers

A professional Android project can be organized like this:

```text
app/
data/
    repository/
    remote/
    local/
    mapper/
domain/
    model/
    repository/
    usecase/
presentation/
    screen/
    viewmodel/
    state/
    event/
common/
    utils/
    components/
```

---

### UI State and UI Event

```kotlin
data class LoginUiState(
    val email: String = "",
    val password: String = "",
    val isLoading: Boolean = false,
    val errorMessage: String? = null
)

sealed class LoginEvent {
    data class EmailChanged(val email: String) : LoginEvent()
    data class PasswordChanged(val password: String) : LoginEvent()
    object SubmitClicked : LoginEvent()
}
```

---

## 6. Dependency Injection

Dependency Injection means providing dependencies from outside instead of creating them directly inside a class. It improves testability and scalability.

---

### Manual Dependency Injection

```kotlin
class ApiService {
    fun fetchData(): String {
        return "Data from API"
    }
}

class UserRepository(
    private val apiService: ApiService
) {
    fun getUser(): String {
        return apiService.fetchData()
    }
}

fun main() {
    val apiService = ApiService()
    val repository = UserRepository(apiService)

    println(repository.getUser())
}
```

---

### Hilt Application Class

```kotlin
import android.app.Application
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class MyApp : Application()
```

---

### Hilt Module

```kotlin
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideProductRepository(): ProductRepository {
        return ProductRepositoryImpl()
    }
}
```

---

### Inject Repository into ViewModel

```kotlin
import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class ProductViewModel @Inject constructor(
    private val repository: ProductRepository
) : ViewModel() {

    fun loadProducts() {
        println("Repository injected successfully")
    }
}
```

---

### Hilt Activity

```kotlin
import android.os.Bundle
import androidx.activity.ComponentActivity
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }
}
```

---

## 7. Networking and APIs

Most Android apps communicate with backend APIs. A professional Android developer should know REST APIs, JSON parsing, authentication, multipart upload, retry logic, pagination, WebSocket, and error handling.

---

### Retrofit API Interface

```kotlin
import retrofit2.http.GET

data class PostDto(
    val id: Int,
    val title: String
)

interface ApiService {
    @GET("posts")
    suspend fun getPosts(): List<PostDto>
}
```

---

### Retrofit Builder

```kotlin
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {

    val apiService: ApiService by lazy {
        Retrofit.Builder()
            .baseUrl("https://jsonplaceholder.typicode.com/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}
```

---

### API Call from Repository

```kotlin
class PostRepository(
    private val apiService: ApiService
) {
    suspend fun getPosts(): List<PostDto> {
        return apiService.getPosts()
    }
}
```

---

### OkHttp Interceptor

Interceptor is useful for adding headers like authorization token.

```kotlin
import okhttp3.Interceptor
import okhttp3.Response

class AuthInterceptor(
    private val tokenProvider: () -> String
) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
            .newBuilder()
            .addHeader("Authorization", "Bearer ${tokenProvider()}")
            .build()

        return chain.proceed(request)
    }
}
```

---

### API Result Wrapper

```kotlin
sealed class ApiResult<out T> {
    data class Success<T>(val data: T) : ApiResult<T>()
    data class Error(val message: String) : ApiResult<Nothing>()
    object Loading : ApiResult<Nothing>()
}
```

---

### Safe API Call

```kotlin
suspend fun <T> safeApiCall(
    apiCall: suspend () -> T
): ApiResult<T> {
    return try {
        ApiResult.Success(apiCall())
    } catch (e: Exception) {
        ApiResult.Error(e.message ?: "Something went wrong")
    }
}
```

---

### Multipart Upload

```kotlin
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface UploadApiService {

    @Multipart
    @POST("upload")
    suspend fun uploadImage(
        @Part image: MultipartBody.Part,
        @Part("user_id") userId: RequestBody
    ): UploadResponse
}

data class UploadResponse(
    val success: Boolean,
    val message: String
)
```

---

## 8. Local Storage and Database

Android apps use local storage for settings, cache, user sessions, offline data, and downloaded files.

---

### SharedPreferences

SharedPreferences stores small key-value data. It is older but still used in many apps.

```kotlin
fun saveUserName(context: Context, name: String) {
    val prefs = context.getSharedPreferences("app_prefs", Context.MODE_PRIVATE)

    prefs.edit()
        .putString("username", name)
        .apply()
}

fun getUserName(context: Context): String? {
    val prefs = context.getSharedPreferences("app_prefs", Context.MODE_PRIVATE)

    return prefs.getString("username", null)
}
```

---

### DataStore

DataStore is the modern replacement for simple key-value storage.

```kotlin
import android.content.Context
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.map

val Context.dataStore by preferencesDataStore(name = "settings")

class SettingsManager(
    private val context: Context
) {
    private val USERNAME_KEY = stringPreferencesKey("username")

    val usernameFlow = context.dataStore.data.map { preferences ->
        preferences[USERNAME_KEY] ?: "Guest"
    }

    suspend fun saveUsername(name: String) {
        context.dataStore.edit { preferences ->
            preferences[USERNAME_KEY] = name
        }
    }
}
```

---

### Room Entity

Room is used for local database storage.

```kotlin
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "notes")
data class NoteEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val title: String,
    val description: String
)
```

---

### Room DAO

```kotlin
import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface NoteDao {

    @Query("SELECT * FROM notes ORDER BY id DESC")
    fun getNotes(): Flow<List<NoteEntity>>

    @Insert
    suspend fun insertNote(note: NoteEntity)

    @Delete
    suspend fun deleteNote(note: NoteEntity)
}
```

---

### Room Database

```kotlin
import androidx.room.Database
import androidx.room.RoomDatabase

@Database(
    entities = [NoteEntity::class],
    version = 1
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun noteDao(): NoteDao
}
```

---

### File Storage

```kotlin
fun saveTextFile(context: Context, fileName: String, content: String) {
    val file = File(context.filesDir, fileName)

    file.writeText(content)
}

fun readTextFile(context: Context, fileName: String): String {
    val file = File(context.filesDir, fileName)

    return file.readText()
}
```

---

## 9. Coroutines and Flow

Coroutines are used for asynchronous programming. Flow is used for continuous streams of data such as database updates, download progress, or UI state.

---

### Coroutine Scope

```kotlin
import kotlinx.coroutines.*

fun main() {
    CoroutineScope(Dispatchers.IO).launch {
        println("Running in background")
    }
}
```

---

### Suspend Function

```kotlin
import kotlinx.coroutines.delay

suspend fun fetchUserName(): String {
    delay(1000)
    return "Envobyte"
}
```

---

### viewModelScope

`viewModelScope` runs coroutines inside a ViewModel and automatically cancels them when the ViewModel is cleared.

```kotlin
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

class UserViewModel : ViewModel() {

    fun loadUser() {
        viewModelScope.launch {
            val name = fetchUserName()
            println(name)
        }
    }
}
```

---

### Dispatchers

Dispatchers decide where coroutine work runs.

```kotlin
viewModelScope.launch(Dispatchers.IO) {
    // Database or network work
}

viewModelScope.launch(Dispatchers.Main) {
    // UI-related work
}

viewModelScope.launch(Dispatchers.Default) {
    // CPU-heavy work
}
```

---

### withContext

`withContext` switches coroutine thread context.

```kotlin
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

suspend fun loadData(): String {
    return withContext(Dispatchers.IO) {
        "Data loaded from background"
    }
}
```

---

### Flow

Flow emits multiple values over time.

```kotlin
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

fun downloadProgress(): Flow<Int> = flow {
    for (progress in 1..100) {
        emit(progress)
    }
}
```

---

### StateFlow

StateFlow is commonly used for UI state.

```kotlin
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class CounterViewModel : ViewModel() {

    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count

    fun increase() {
        _count.value += 1
    }
}
```

---

### SharedFlow

SharedFlow is useful for one-time events like toast, snackbar, or navigation.

```kotlin
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

class EventViewModel : ViewModel() {

    private val _event = MutableSharedFlow<String>()
    val event: SharedFlow<String> = _event

    fun showMessage() {
        viewModelScope.launch {
            _event.emit("Action completed")
        }
    }
}
```

---

### Collect Flow in Compose

```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle

@Composable
fun CounterScreen(
    viewModel: CounterViewModel
) {
    val count by viewModel.count.collectAsStateWithLifecycle()

    Text(text = "Count: $count")
}
```

---

## 10. Background Work

Android apps often need background processing for uploads, downloads, sync, compression, OCR, reminders, and scheduled tasks.

---

### WorkManager

WorkManager is used for reliable deferrable background work.

```kotlin
import android.content.Context
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import androidx.work.Result

class SyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        return try {
            // Perform background sync
            Result.success()
        } catch (e: Exception) {
            Result.retry()
        }
    }
}
```

---

### Enqueue Work

```kotlin
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager

fun startSync(context: Context) {
    val request = OneTimeWorkRequestBuilder<SyncWorker>().build()

    WorkManager.getInstance(context).enqueue(request)
}
```

---

### Periodic Work

```kotlin
import androidx.work.PeriodicWorkRequestBuilder
import java.util.concurrent.TimeUnit

fun schedulePeriodicSync(context: Context) {
    val request = PeriodicWorkRequestBuilder<SyncWorker>(
        15,
        TimeUnit.MINUTES
    ).build()

    WorkManager.getInstance(context).enqueue(request)
}
```

---

### Foreground Service

Foreground service is used for ongoing visible tasks like file download, audio recording, or active processing.

```kotlin
class DownloadService : Service() {

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        // Start foreground notification here
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}
```

---

### Cancel WorkManager Task

```kotlin
fun cancelWork(context: Context, workId: UUID) {
    WorkManager.getInstance(context).cancelWorkById(workId)
}
```

---

## 11. Permissions and System Features

Professional Android apps often use permissions and system features such as camera, storage, microphone, notifications, location, sharing, and deep links.

---

### Runtime Permission

```kotlin
import android.Manifest
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

@Composable
fun PermissionExample() {
    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        println("Permission granted: $isGranted")
    }

    Button(
        onClick = {
            launcher.launch(Manifest.permission.CAMERA)
        }
    ) {
        Text(text = "Request Camera Permission")
    }
}
```

---

### Image Picker

```kotlin
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.*

@Composable
fun ImagePickerExample() {
    var imageUri by remember { mutableStateOf<Uri?>(null) }

    val launcher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri ->
        imageUri = uri
    }

    Button(onClick = { launcher.launch("image/*") }) {
        Text(text = "Pick Image")
    }
}
```

---

### Share Text

```kotlin
fun shareText(context: Context, text: String) {
    val intent = Intent(Intent.ACTION_SEND).apply {
        type = "text/plain"
        putExtra(Intent.EXTRA_TEXT, text)
    }

    context.startActivity(Intent.createChooser(intent, "Share using"))
}
```

---

### Deep Link Manifest

```xml
<activity android:name=".MainActivity" android:exported="true">

    <intent-filter>
        <action android:name="android.intent.action.VIEW" />

        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />

        <data
            android:scheme="myapp"
            android:host="details" />
    </intent-filter>

</activity>
```

---

### Handle Deep Link

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val data = intent?.data
    println("Deep link: $data")
}
```

---

### Notification

```kotlin
fun showNotification(context: Context) {
    val notification = NotificationCompat.Builder(context, "default_channel")
        .setSmallIcon(R.drawable.ic_launcher_foreground)
        .setContentTitle("Task Complete")
        .setContentText("Your file has been processed successfully.")
        .setPriority(NotificationCompat.PRIORITY_DEFAULT)
        .build()

    NotificationManagerCompat.from(context).notify(1, notification)
}
```

---

## 12. Security

Security is extremely important for production Android apps. Sensitive data should never be stored in plain text.

---

### Store Token Securely

Use secure storage for tokens, not normal SharedPreferences.

```kotlin
class TokenManager(
    private val encryptedPrefs: SharedPreferences
) {
    fun saveToken(token: String) {
        encryptedPrefs.edit()
            .putString("auth_token", token)
            .apply()
    }

    fun getToken(): String? {
        return encryptedPrefs.getString("auth_token", null)
    }
}
```

---

### Use HTTPS

```kotlin
const val BASE_URL = "https://api.example.com/"
```

---

### Avoid Hardcoding Secrets

```kotlin
// Bad
const val API_KEY = "secret-key-here"

// Better
// Keep sensitive keys on backend or use secure remote configuration.
```

---

### Hashing Example

```kotlin
import java.security.MessageDigest

fun sha256(text: String): String {
    val bytes = MessageDigest.getInstance("SHA-256")
        .digest(text.toByteArray())

    return bytes.joinToString("") { "%02x".format(it) }
}

fun main() {
    println(sha256("Hello"))
}
```

---

### Basic Request Signing Payload

```kotlin
data class SecureRequestPayload(
    val path: String,
    val timestamp: Long,
    val nonce: String,
    val body: String
)

val payload = SecureRequestPayload(
    path = "/api/order",
    timestamp = System.currentTimeMillis(),
    nonce = java.util.UUID.randomUUID().toString(),
    body = """{"order_id":123}"""
)
```

---

## 13. Build System and Gradle

A professional Android developer must understand Gradle, build variants, dependencies, signing configs, product flavors, and CI/CD.

---

### Module Gradle Example

```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.example.myapp"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.myapp"
        minSdk = 23
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }
}
```

---

### Build Types

```kotlin
android {
    buildTypes {
        debug {
            isDebuggable = true
        }

        release {
            isMinifyEnabled = true
            isShrinkResources = true
        }
    }
}
```

---

### Product Flavors

```kotlin
android {
    flavorDimensions += "environment"

    productFlavors {
        create("dev") {
            dimension = "environment"
            applicationIdSuffix = ".dev"
        }

        create("prod") {
            dimension = "environment"
        }
    }
}
```

---

### BuildConfig

```kotlin
android {
    defaultConfig {
        buildConfigField(
            "String",
            "BASE_URL",
            "\"https://api.example.com/\""
        )
    }
}
```

```kotlin
val baseUrl = BuildConfig.BASE_URL
```

---

## 14. App Release and Play Store

A real Android developer should understand release engineering and Google Play publishing.

---

### Important Release Skills

You should learn:

- App signing
- Keystore
- Version code
- Version name
- Build variants
- ProGuard/R8
- Play Console
- Internal testing
- Closed testing
- Open testing
- Production release
- Privacy policy
- Data safety form
- Crash reporting
- Analytics
- In-app updates
- In-app review
- Billing setup

---

### Version Info

```kotlin
fun printAppVersion(context: Context) {
    val packageInfo = context.packageManager.getPackageInfo(context.packageName, 0)

    println("Version name: ${packageInfo.versionName}")
    println("Version code: ${packageInfo.longVersionCode}")
}
```

---

## 15. Debugging Skills

Outstanding developers are strong debuggers. They can quickly find crashes, performance issues, memory leaks, and wrong app behavior.

---

### Logcat

```kotlin
import android.util.Log

Log.d("HomeScreen", "User opened home screen")
Log.e("ApiError", "Failed to load data")
```

---

### Debug Only Code

```kotlin
if (BuildConfig.DEBUG) {
    Log.d("Debug", "This log only appears in debug builds")
}
```

---

### Custom Logger

```kotlin
object AppLogger {
    fun debug(tag: String, message: String) {
        if (BuildConfig.DEBUG) {
            Log.d(tag, message)
        }
    }
}

AppLogger.debug("Login", "Login button clicked")
```

---

### Tools to Master

You should master:

- Logcat
- Android Studio Debugger
- Breakpoints
- Layout Inspector
- Database Inspector
- Network Inspector
- Profiler
- Memory Profiler
- CPU Profiler
- APK Analyzer
- Crashlytics
- StrictMode

---

## 16. Testing

Testing makes Android apps stable and professional. A strong Android developer should write unit tests, UI tests, integration tests, and repository tests.

---

### Unit Test

```kotlin
import org.junit.Assert.assertEquals
import org.junit.Test

class Calculator {
    fun add(a: Int, b: Int): Int {
        return a + b
    }
}

class CalculatorTest {

    @Test
    fun add_returnsCorrectResult() {
        val calculator = Calculator()

        val result = calculator.add(2, 3)

        assertEquals(5, result)
    }
}
```

---

### ViewModel Test

```kotlin
import org.junit.Assert.assertTrue
import org.junit.Assert.assertFalse
import org.junit.Test

class LoginViewModel {

    fun isValidEmail(email: String): Boolean {
        return email.contains("@") && email.contains(".")
    }
}

class LoginViewModelTest {

    @Test
    fun validEmail_returnsTrue() {
        val viewModel = LoginViewModel()

        assertTrue(viewModel.isValidEmail("test@example.com"))
    }

    @Test
    fun invalidEmail_returnsFalse() {
        val viewModel = LoginViewModel()

        assertFalse(viewModel.isValidEmail("wrong-email"))
    }
}
```

---

### Mock Repository

```kotlin
interface UserRepository {
    fun getUsers(): List<String>
}

class FakeUserRepository : UserRepository {
    override fun getUsers(): List<String> {
        return listOf("Envobyte", "John")
    }
}

class UserListViewModel(
    private val repository: UserRepository
) {
    fun loadUsers(): List<String> {
        return repository.getUsers()
    }
}
```

---

### Compose UI Test

```kotlin
@get:Rule
val composeTestRule = createComposeRule()

@Test
fun button_showsCorrectText() {
    composeTestRule.setContent {
        Button(onClick = {}) {
            Text(text = "Continue")
        }
    }

    composeTestRule
        .onNodeWithText("Continue")
        .assertExists()
}
```

---

## 17. Performance Optimization

Performance is one of the biggest differences between beginner and senior Android developers.

---

### Avoid Unnecessary Recomposition

Pass only the required state to composables.

```kotlin
data class HomeUiState(
    val username: String = "",
    val downloadProgress: Int = 0,
    val isLoading: Boolean = false
)

@Composable
fun HomeScreen(uiState: HomeUiState) {
    UserHeader(username = uiState.username)
    DownloadProgress(progress = uiState.downloadProgress)
}

@Composable
fun UserHeader(username: String) {
    Text(text = username)
}

@Composable
fun DownloadProgress(progress: Int) {
    Text(text = "Progress: $progress%")
}
```

---

### Use remember for Expensive Calculation

```kotlin
@Composable
fun ExpensiveCalculationScreen(numbers: List<Int>) {
    val total = remember(numbers) {
        numbers.sum()
    }

    Text(text = "Total: $total")
}
```

---

### Use LazyColumn for Large Lists

```kotlin
@Composable
fun LargeListScreen() {
    LazyColumn {
        items(1000) { index ->
            Text(text = "Item $index")
        }
    }
}
```

---

### Image Loading with Coil

```kotlin
import coil.compose.AsyncImage

@Composable
fun UserAvatar(imageUrl: String) {
    AsyncImage(
        model = imageUrl,
        contentDescription = "User avatar"
    )
}
```

---

### Stable Data Class

Use immutable UI state when possible.

```kotlin
data class ProfileUiState(
    val name: String,
    val imageUrl: String,
    val isPremium: Boolean
)
```

---

### Avoid Heavy Work on Main Thread

```kotlin
viewModelScope.launch {
    val result = withContext(Dispatchers.Default) {
        // CPU-heavy work
        processLargeData()
    }

    println(result)
}
```

---

## 18. Material Design and UX Thinking

A great Android developer does not only write code. They also understand user experience, accessibility, consistency, and Material Design.

---

### Primary Button

```kotlin
@Composable
fun PrimaryButton(
    text: String,
    onClick: () -> Unit
) {
    Button(
        onClick = onClick
    ) {
        Text(text = text)
    }
}
```

---

### Empty State

```kotlin
@Composable
fun EmptyStateView() {
    Column {
        Text(text = "No Files Yet")
        Text(text = "Your scanned files will appear here after you create them.")
    }
}
```

---

### Loading State

```kotlin
@Composable
fun LoadingView() {
    Column {
        CircularProgressIndicator()
        Text(text = "Processing...")
    }
}
```

---

### Error State

```kotlin
@Composable
fun ErrorStateView(message: String) {
    Column {
        Text(text = "Something went wrong")
        Text(text = message)
    }
}
```

---

### Accessibility

```kotlin
@Composable
fun AccessibleFavoriteButton() {
    IconButton(
        onClick = {
            println("Favorite clicked")
        }
    ) {
        Icon(
            imageVector = Icons.Default.Star,
            contentDescription = "Add to favorites"
        )
    }
}
```

---

## 19. Advanced Android Topics

After learning the core skills, you can move to advanced Android development.

---

### CameraX

CameraX is used for camera preview, image capture, video recording, and analysis.

```kotlin
// Common use cases:
// - Preview
// - ImageCapture
// - VideoCapture
// - ImageAnalysis
```

---

### ML Kit

ML Kit is useful for OCR, barcode scanning, translation, face detection, and image labeling.

```kotlin
// Common use cases:
// - Text recognition
// - Face detection
// - Barcode scanning
// - Translation
// - Object detection
```

---

### Media3 / ExoPlayer

Media3 ExoPlayer is used for audio and video playback.

```kotlin
// Common use cases:
// - Video player
// - Audio player
// - Streaming playback
// - Playback controls
```

---

### Billing

Google Play Billing is used for subscriptions, in-app purchases, trials, and premium features.

```kotlin
// Common flow:
// 1. Connect BillingClient
// 2. Query products
// 3. Launch billing flow
// 4. Verify purchase
// 5. Acknowledge purchase
// 6. Unlock premium feature
```

---

### Firebase

Firebase is useful for analytics, crash reporting, remote config, authentication, Firestore, FCM, and cloud functions.

```kotlin
// Common Firebase tools:
// - Firebase Analytics
// - Firebase Crashlytics
// - Firebase Remote Config
// - Firebase Firestore
// - Firebase Authentication
// - Firebase Cloud Messaging
```

---

### Multi-Module Architecture

Large apps should be split into modules.

```text
:app
:core:common
:core:network
:core:database
:core:designsystem
:feature:home
:feature:downloads
:feature:settings
:feature:premium
```

---

### KMP

Kotlin Multiplatform allows sharing business logic between Android and iOS.

```kotlin
// Shared layer can include:
// - Models
// - Repository interfaces
// - Use cases
// - Validation logic
// - API clients
// - Business rules
```

---

## 20. Real Project Practice

The fastest way to become outstanding is to build real apps.

You should build Android apps that include:

- Authentication
- API calling
- Local database
- Offline support
- File handling
- Image picker
- Camera
- Permissions
- Background task
- Notification
- Payment screen
- Subscription logic
- Clean architecture
- Jetpack Compose UI
- Error handling
- Loading state
- Empty state
- Testing
- Release build

---

### Mini Project Example: Notes App

```kotlin
data class Note(
    val id: Int,
    val title: String,
    val description: String
)

data class NotesUiState(
    val notes: List<Note> = emptyList(),
    val title: String = "",
    val description: String = ""
)

class NotesViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(NotesUiState())
    val uiState: StateFlow<NotesUiState> = _uiState

    fun onTitleChanged(title: String) {
        _uiState.value = _uiState.value.copy(title = title)
    }

    fun onDescriptionChanged(description: String) {
        _uiState.value = _uiState.value.copy(description = description)
    }

    fun addNote() {
        val currentState = _uiState.value

        val note = Note(
            id = currentState.notes.size + 1,
            title = currentState.title,
            description = currentState.description
        )

        _uiState.value = currentState.copy(
            notes = currentState.notes + note,
            title = "",
            description = ""
        )
    }
}
```

---

### Notes App UI

```kotlin
@Composable
fun NotesScreen(
    viewModel: NotesViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsState()

    Column(
        modifier = Modifier.padding(16.dp)
    ) {
        OutlinedTextField(
            value = uiState.title,
            onValueChange = viewModel::onTitleChanged,
            label = {
                Text(text = "Title")
            }
        )

        OutlinedTextField(
            value = uiState.description,
            onValueChange = viewModel::onDescriptionChanged,
            label = {
                Text(text = "Description")
            }
        )

        Button(
            onClick = {
                viewModel.addNote()
            }
        ) {
            Text(text = "Add Note")
        }

        LazyColumn {
            items(uiState.notes) { note ->
                Column(
                    modifier = Modifier.padding(vertical = 8.dp)
                ) {
                    Text(text = note.title)
                    Text(text = note.description)
                }
            }
        }
    }
}
```

---

## Recommended Learning Order

1. Kotlin basics
2. Kotlin null safety
3. Kotlin OOP
4. Lambda and higher-order functions
5. Collections
6. Sealed class and data class
7. Coroutines basics
8. Flow and StateFlow
9. Android fundamentals
10. Activity lifecycle
11. Intent and permissions
12. Jetpack Compose basics
13. Compose state management
14. Navigation
15. ViewModel
16. MVVM architecture
17. Repository pattern
18. Clean Architecture
19. Hilt dependency injection
20. Retrofit and OkHttp
21. Room database
22. DataStore
23. WorkManager
24. Foreground service
25. Notifications
26. File handling
27. Security
28. Testing
29. Debugging
30. Performance optimization
31. Gradle and build variants
32. Play Store release
33. Firebase
34. Billing
35. Advanced topics
36. Real project development


The best way to improve is to build real apps repeatedly and solve real production problems.
