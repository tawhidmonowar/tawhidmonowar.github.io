---
title: UIKit Deep Dive
description: UIKit is Apple's traditional UI framework for building iOS apps. It is older than SwiftUI but still very important because many production iOS apps are built with UIKit.
author: tawhidmonowar
date: 2026-03-04 11:30:00 +06:00
categories: [Development, iOS Development]
---

UIKit is mainly based on:

- `UIViewController`
- `UIView`
- `UILabel`
- `UIButton`
- `UIImageView`
- `UITextField`
- `UITableView`
- `UICollectionView`
- `UINavigationController`
- `UITabBarController`
- Auto Layout
- Delegates
- Target-action pattern

---

## 1. UIViewController

`UIViewController` controls one screen in a UIKit app. It manages the screen's view, lifecycle, UI setup, user interaction, and navigation.

```swift
import UIKit

class HomeViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
    }
}
```

---

## 2. View Controller Lifecycle

UIKit screens have lifecycle methods. These methods are called when the screen loads, appears, disappears, or is removed.

```swift
import UIKit

class HomeViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        print("View loaded once")
    }

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        print("View will appear")
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        print("View appeared")
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        print("View will disappear")
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        print("View disappeared")
    }
}
```

### Simple Explanation

- `viewDidLoad()` → called once when the view is loaded.
- `viewWillAppear()` → called before the screen appears.
- `viewDidAppear()` → called after the screen appears.
- `viewWillDisappear()` → called before the screen disappears.
- `viewDidDisappear()` → called after the screen disappears.

---

## 3. Programmatic UI

Programmatic UI means creating the interface using Swift code instead of Storyboard.

```swift
import UIKit

class HomeViewController: UIViewController {

    private let titleLabel = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupTitleLabel()
    }

    private func setupTitleLabel() {
        titleLabel.text = "Hello UIKit"
        titleLabel.font = .systemFont(ofSize: 28, weight: .bold)
        titleLabel.textAlignment = .center
        titleLabel.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(titleLabel)

        NSLayoutConstraint.activate([
            titleLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            titleLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }
}
```

---

## 4. Layout with Auto Layout

UIKit uses Auto Layout to position UI elements on different screen sizes. Auto Layout works with constraints.

```swift
import UIKit

class LayoutViewController: UIViewController {

    private let boxView = UIView()

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupBoxView()
    }

    private func setupBoxView() {
        boxView.backgroundColor = .systemBlue
        boxView.layer.cornerRadius = 16
        boxView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(boxView)

        NSLayoutConstraint.activate([
            boxView.widthAnchor.constraint(equalToConstant: 200),
            boxView.heightAnchor.constraint(equalToConstant: 120),
            boxView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            boxView.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }
}
```

### Important

When using Auto Layout programmatically, always set:

```swift
view.translatesAutoresizingMaskIntoConstraints = false
```

---

## 5. Safe Area Layout

Safe area helps avoid the notch, status bar, home indicator, and navigation bar.

```swift
import UIKit

class SafeAreaViewController: UIViewController {

    private let titleLabel = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupUI()
    }

    private func setupUI() {
        titleLabel.text = "Safe Area Example"
        titleLabel.font = .systemFont(ofSize: 24, weight: .bold)
        titleLabel.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(titleLabel)

        NSLayoutConstraint.activate([
            titleLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 24),
            titleLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            titleLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20)
        ])
    }
}
```

---

## 6. UIStackView

`UIStackView` arranges views vertically or horizontally. It makes layout easier.

```swift
import UIKit

class StackViewController: UIViewController {

    private let stackView = UIStackView()
    private let titleLabel = UILabel()
    private let subtitleLabel = UILabel()
    private let button = UIButton(type: .system)

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupStackView()
    }

    private func setupStackView() {
        titleLabel.text = "Welcome"
        titleLabel.font = .systemFont(ofSize: 28, weight: .bold)

        subtitleLabel.text = "Learn UIKit step by step"
        subtitleLabel.font = .systemFont(ofSize: 16)
        subtitleLabel.textColor = .secondaryLabel

        button.setTitle("Continue", for: .normal)

        stackView.axis = .vertical
        stackView.spacing = 12
        stackView.alignment = .center
        stackView.translatesAutoresizingMaskIntoConstraints = false

        stackView.addArrangedSubview(titleLabel)
        stackView.addArrangedSubview(subtitleLabel)
        stackView.addArrangedSubview(button)

        view.addSubview(stackView)

        NSLayoutConstraint.activate([
            stackView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            stackView.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }
}
```

---

## 7. UILabel

`UILabel` is used to show text.

```swift
import UIKit

class LabelViewController: UIViewController {

    private let label = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupLabel()
    }

    private func setupLabel() {
        label.text = "This is a UILabel"
        label.font = .systemFont(ofSize: 24, weight: .semibold)
        label.textColor = .label
        label.textAlignment = .center
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(label)

        NSLayoutConstraint.activate([
            label.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            label.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            label.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }
}
```

---

## 8. UIButton

`UIButton` is used for clickable actions.

```swift
import UIKit

class ButtonViewController: UIViewController {

    private let button = UIButton(type: .system)

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupButton()
    }

    private func setupButton() {
        button.setTitle("Tap Me", for: .normal)
        button.titleLabel?.font = .systemFont(ofSize: 18, weight: .bold)
        button.backgroundColor = .systemBlue
        button.tintColor = .white
        button.layer.cornerRadius = 12
        button.translatesAutoresizingMaskIntoConstraints = false

        button.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)

        view.addSubview(button)

        NSLayoutConstraint.activate([
            button.widthAnchor.constraint(equalToConstant: 180),
            button.heightAnchor.constraint(equalToConstant: 50),
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            button.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }

    @objc private func buttonTapped() {
        print("Button tapped")
    }
}
```

---

## 9. Target-Action Pattern

UIKit uses target-action to handle button taps and control events.

```swift
button.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)

@objc private func buttonTapped() {
    print("Button clicked")
}
```

### Simple Explanation

- `target` means who will handle the action.
- `action` means which method will run.
- `.touchUpInside` means button tap event.

---

## 10. UIImageView

`UIImageView` is used to display images.

```swift
import UIKit

class ImageViewController: UIViewController {

    private let imageView = UIImageView()

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupImageView()
    }

    private func setupImageView() {
        imageView.image = UIImage(systemName: "photo")
        imageView.tintColor = .systemBlue
        imageView.contentMode = .scaleAspectFit
        imageView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(imageView)

        NSLayoutConstraint.activate([
            imageView.widthAnchor.constraint(equalToConstant: 120),
            imageView.heightAnchor.constraint(equalToConstant: 120),
            imageView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            imageView.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }
}
```

---

## 11. UITextField

`UITextField` is used for single-line text input.

```swift
import UIKit

class TextFieldViewController: UIViewController {

    private let emailTextField = UITextField()

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupTextField()
    }

    private func setupTextField() {
        emailTextField.placeholder = "Enter email"
        emailTextField.borderStyle = .roundedRect
        emailTextField.keyboardType = .emailAddress
        emailTextField.autocapitalizationType = .none
        emailTextField.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(emailTextField)

        NSLayoutConstraint.activate([
            emailTextField.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            emailTextField.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            emailTextField.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            emailTextField.heightAnchor.constraint(equalToConstant: 48)
        ])
    }
}
```

---

## 12. UITextView

`UITextView` is used for multi-line text input.

```swift
import UIKit

class TextViewController: UIViewController {

    private let textView = UITextView()

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupTextView()
    }

    private func setupTextView() {
        textView.font = .systemFont(ofSize: 16)
        textView.text = "Write something..."
        textView.layer.borderWidth = 1
        textView.layer.borderColor = UIColor.systemGray4.cgColor
        textView.layer.cornerRadius = 12
        textView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(textView)

        NSLayoutConstraint.activate([
            textView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            textView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            textView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
            textView.heightAnchor.constraint(equalToConstant: 180)
        ])
    }
}
```

---

## 13. UISwitch

`UISwitch` is used for on/off settings.

```swift
import UIKit

class SwitchViewController: UIViewController {

    private let premiumSwitch = UISwitch()

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupSwitch()
    }

    private func setupSwitch() {
        premiumSwitch.isOn = false
        premiumSwitch.translatesAutoresizingMaskIntoConstraints = false
        premiumSwitch.addTarget(self, action: #selector(switchChanged), for: .valueChanged)

        view.addSubview(premiumSwitch)

        NSLayoutConstraint.activate([
            premiumSwitch.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            premiumSwitch.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }

    @objc private func switchChanged() {
        print("Switch value: \(premiumSwitch.isOn)")
    }
}
```

---

## 14. UISlider

`UISlider` is used to select a value from a range.

```swift
import UIKit

class SliderViewController: UIViewController {

    private let slider = UISlider()
    private let valueLabel = UILabel()

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupUI()
    }

    private func setupUI() {
        valueLabel.text = "Value: 50"
        valueLabel.textAlignment = .center

        slider.minimumValue = 0
        slider.maximumValue = 100
        slider.value = 50
        slider.addTarget(self, action: #selector(sliderChanged), for: .valueChanged)

        let stackView = UIStackView(arrangedSubviews: [valueLabel, slider])
        stackView.axis = .vertical
        stackView.spacing = 16
        stackView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(stackView)

        NSLayoutConstraint.activate([
            stackView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            stackView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            stackView.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }

    @objc private func sliderChanged() {
        valueLabel.text = "Value: \(Int(slider.value))"
    }
}
```

---

## 15. UISegmentedControl

`UISegmentedControl` is used to switch between multiple options.

```swift
import UIKit

class SegmentViewController: UIViewController {

    private let segmentedControl = UISegmentedControl(items: ["Free", "Pro", "Ultra"])

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupSegment()
    }

    private func setupSegment() {
        segmentedControl.selectedSegmentIndex = 0
        segmentedControl.addTarget(self, action: #selector(segmentChanged), for: .valueChanged)
        segmentedControl.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(segmentedControl)

        NSLayoutConstraint.activate([
            segmentedControl.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            segmentedControl.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            segmentedControl.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }

    @objc private func segmentChanged() {
        print("Selected index: \(segmentedControl.selectedSegmentIndex)")
    }
}
```

---

## 16. UIScrollView

`UIScrollView` is used when content is larger than the screen.

```swift
import UIKit

class ScrollViewController: UIViewController {

    private let scrollView = UIScrollView()
    private let contentView = UIView()

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupScrollView()
        setupContent()
    }

    private func setupScrollView() {
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        contentView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(scrollView)
        scrollView.addSubview(contentView)

        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            scrollView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            contentView.topAnchor.constraint(equalTo: scrollView.contentLayoutGuide.topAnchor),
            contentView.leadingAnchor.constraint(equalTo: scrollView.contentLayoutGuide.leadingAnchor),
            contentView.trailingAnchor.constraint(equalTo: scrollView.contentLayoutGuide.trailingAnchor),
            contentView.bottomAnchor.constraint(equalTo: scrollView.contentLayoutGuide.bottomAnchor),

            contentView.widthAnchor.constraint(equalTo: scrollView.frameLayoutGuide.widthAnchor)
        ])
    }

    private func setupContent() {
        let label = UILabel()
        label.text = String(repeating: "UIKit ScrollView Example\n", count: 50)
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false

        contentView.addSubview(label)

        NSLayoutConstraint.activate([
            label.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 20),
            label.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 20),
            label.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -20),
            label.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -20)
        ])
    }
}
```

---

## 17. UITableView

`UITableView` is used to show vertical lists.

```swift
import UIKit

class UserListViewController: UIViewController {

    private let tableView = UITableView()
    private let users = ["Tawheed", "John", "Sarah", "Alex"]

    override func viewDidLoad() {
        super.viewDidLoad()

        title = "Users"
        view.backgroundColor = .systemBackground
        setupTableView()
    }

    private func setupTableView() {
        tableView.dataSource = self
        tableView.delegate = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "UserCell")
        tableView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(tableView)

        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            tableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
}

extension UserListViewController: UITableViewDataSource, UITableViewDelegate {

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        users.count
    }

    func tableView(
        _ tableView: UITableView,
        cellForRowAt indexPath: IndexPath
    ) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "UserCell", for: indexPath)
        cell.textLabel?.text = users[indexPath.row]
        return cell
    }

    func tableView(
        _ tableView: UITableView,
        didSelectRowAt indexPath: IndexPath
    ) {
        tableView.deselectRow(at: indexPath, animated: true)
        print("Selected user: \(users[indexPath.row])")
    }
}
```

---

## 18. UITableView Custom Cell

Custom cells are used when each row needs custom design.

```swift
import UIKit

class UserTableViewCell: UITableViewCell {

    static let identifier = "UserTableViewCell"

    private let nameLabel = UILabel()
    private let subtitleLabel = UILabel()

    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)

        setupUI()
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func setupUI() {
        nameLabel.font = .systemFont(ofSize: 18, weight: .bold)
        subtitleLabel.font = .systemFont(ofSize: 14)
        subtitleLabel.textColor = .secondaryLabel

        let stackView = UIStackView(arrangedSubviews: [nameLabel, subtitleLabel])
        stackView.axis = .vertical
        stackView.spacing = 4
        stackView.translatesAutoresizingMaskIntoConstraints = false

        contentView.addSubview(stackView)

        NSLayoutConstraint.activate([
            stackView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 12),
            stackView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 16),
            stackView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -16),
            stackView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -12)
        ])
    }

    func configure(name: String, subtitle: String) {
        nameLabel.text = name
        subtitleLabel.text = subtitle
    }
}
```

Usage:

```swift
tableView.register(UserTableViewCell.self, forCellReuseIdentifier: UserTableViewCell.identifier)
```

```swift
let cell = tableView.dequeueReusableCell(
    withIdentifier: UserTableViewCell.identifier,
    for: indexPath
) as! UserTableViewCell

cell.configure(name: "Tawheed", subtitle: "iOS Developer")

return cell
```

---

## 19. UICollectionView

`UICollectionView` is used for grid layouts and advanced list designs.

```swift
import UIKit

class GridViewController: UIViewController {

    private var collectionView: UICollectionView!
    private let items = Array(1...20)

    override func viewDidLoad() {
        super.viewDidLoad()

        title = "Grid"
        view.backgroundColor = .systemBackground
        setupCollectionView()
    }

    private func setupCollectionView() {
        let layout = UICollectionViewFlowLayout()
        layout.itemSize = CGSize(width: 100, height: 100)
        layout.minimumLineSpacing = 12
        layout.minimumInteritemSpacing = 12

        collectionView = UICollectionView(frame: .zero, collectionViewLayout: layout)
        collectionView.backgroundColor = .systemBackground
        collectionView.dataSource = self
        collectionView.delegate = self
        collectionView.register(UICollectionViewCell.self, forCellWithReuseIdentifier: "GridCell")
        collectionView.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(collectionView)

        NSLayoutConstraint.activate([
            collectionView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            collectionView.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 16),
            collectionView.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16),
            collectionView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
}

extension GridViewController: UICollectionViewDataSource, UICollectionViewDelegate {

    func collectionView(
        _ collectionView: UICollectionView,
        numberOfItemsInSection section: Int
    ) -> Int {
        items.count
    }

    func collectionView(
        _ collectionView: UICollectionView,
        cellForItemAt indexPath: IndexPath
    ) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(
            withReuseIdentifier: "GridCell",
            for: indexPath
        )

        cell.backgroundColor = .systemBlue
        cell.layer.cornerRadius = 12

        return cell
    }
}
```

---

## 20. UINavigationController

`UINavigationController` manages screen-to-screen navigation.

```swift
import UIKit

class HomeViewController: UIViewController {

    private let button = UIButton(type: .system)

    override func viewDidLoad() {
        super.viewDidLoad()

        title = "Home"
        view.backgroundColor = .systemBackground
        setupButton()
    }

    private func setupButton() {
        button.setTitle("Go to Details", for: .normal)
        button.addTarget(self, action: #selector(openDetails), for: .touchUpInside)
        button.translatesAutoresizingMaskIntoConstraints = false

        view.addSubview(button)

        NSLayoutConstraint.activate([
            button.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            button.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }

    @objc private func openDetails() {
        let detailsVC = DetailsViewController()
        navigationController?.pushViewController(detailsVC, animated: true)
    }
}

class DetailsViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        title = "Details"
        view.backgroundColor = .systemBackground
    }
}
```

Scene setup example:

```swift
let homeVC = HomeViewController()
let navigationController = UINavigationController(rootViewController: homeVC)

window?.rootViewController = navigationController
window?.makeKeyAndVisible()
```

---

## 21. UITabBarController

`UITabBarController` is used for bottom tab navigation.

```swift
import UIKit

class MainTabBarController: UITabBarController {

    override func viewDidLoad() {
        super.viewDidLoad()

        let homeVC = UINavigationController(rootViewController: HomeViewController())
        homeVC.tabBarItem = UITabBarItem(
            title: "Home",
            image: UIImage(systemName: "house"),
            tag: 0
        )

        let settingsVC = UINavigationController(rootViewController: SettingsViewController())
        settingsVC.tabBarItem = UITabBarItem(
            title: "Settings",
            image: UIImage(systemName: "gear"),
            tag: 1
        )

        viewControllers = [homeVC, settingsVC]
    }
}

class SettingsViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        title = "Settings"
        view.backgroundColor = .systemBackground
    }
}
```

---

## 22. UIAlertController

`UIAlertController` is used to show alert dialogs.

```swift
import UIKit

class AlertViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
    }

    private func showAlert() {
        let alert = UIAlertController(
            title: "Delete File?",
            message: "Are you sure you want to delete this file?",
            preferredStyle: .alert
        )

        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel))
        alert.addAction(UIAlertAction(title: "Delete", style: .destructive) { _ in
            print("File deleted")
        })

        present(alert, animated: true)
    }
}
```

---

## 23. Action Sheet

Action sheet shows options from the bottom.

```swift
let actionSheet = UIAlertController(
    title: "Choose Option",
    message: nil,
    preferredStyle: .actionSheet
)

actionSheet.addAction(UIAlertAction(title: "Camera", style: .default))
actionSheet.addAction(UIAlertAction(title: "Gallery", style: .default))
actionSheet.addAction(UIAlertAction(title: "Cancel", style: .cancel))

present(actionSheet, animated: true)
```

---

## 24. Modal Presentation

Modal presentation opens a screen over the current screen.

```swift
let detailsVC = DetailsViewController()
detailsVC.modalPresentationStyle = .pageSheet

present(detailsVC, animated: true)
```

Dismiss modal:

```swift
dismiss(animated: true)
```

---

## 25. Passing Data Between Screens

Data can be passed by setting a property before navigation.

```swift
class DetailsViewController: UIViewController {

    var username: String?

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        print(username ?? "No username")
    }
}
```

Pass data:

```swift
let detailsVC = DetailsViewController()
detailsVC.username = "Tawheed"

navigationController?.pushViewController(detailsVC, animated: true)
```

---

## 26. Closure Callback

Closure callback is useful for sending data back.

```swift
class EditProfileViewController: UIViewController {

    var onNameUpdated: ((String) -> Void)?

    private func saveName() {
        onNameUpdated?("Tawheed")
        navigationController?.popViewController(animated: true)
    }
}
```

Use callback:

```swift
let editVC = EditProfileViewController()

editVC.onNameUpdated = { updatedName in
    print("Updated name: \(updatedName)")
}

navigationController?.pushViewController(editVC, animated: true)
```

---

## 27. Delegate Pattern

Delegate pattern allows one object to send events to another object.

```swift
protocol ProfileUpdateDelegate: AnyObject {
    func didUpdateName(_ name: String)
}

class EditProfileViewController: UIViewController {

    weak var delegate: ProfileUpdateDelegate?

    private func saveName() {
        delegate?.didUpdateName("Tawheed")
        navigationController?.popViewController(animated: true)
    }
}

class ProfileViewController: UIViewController, ProfileUpdateDelegate {

    func didUpdateName(_ name: String) {
        print("Name updated: \(name)")
    }
}
```

### Important

Use `weak` for delegate to avoid memory leaks.

---

## 28. Gesture Recognizer

Gesture recognizers detect taps, swipes, pinches, and long press actions.

```swift
import UIKit

class GestureViewController: UIViewController {

    private let boxView = UIView()

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupBoxView()
    }

    private func setupBoxView() {
        boxView.backgroundColor = .systemBlue
        boxView.layer.cornerRadius = 16
        boxView.translatesAutoresizingMaskIntoConstraints = false

        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(boxTapped))
        boxView.addGestureRecognizer(tapGesture)
        boxView.isUserInteractionEnabled = true

        view.addSubview(boxView)

        NSLayoutConstraint.activate([
            boxView.widthAnchor.constraint(equalToConstant: 160),
            boxView.heightAnchor.constraint(equalToConstant: 160),
            boxView.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            boxView.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }

    @objc private func boxTapped() {
        print("Box tapped")
    }
}
```

---

## 29. Animation

UIKit supports animations using `UIView.animate`.

```swift
UIView.animate(withDuration: 0.3) {
    self.view.backgroundColor = .systemBlue
}
```

Example with transform:

```swift
UIView.animate(withDuration: 0.3) {
    self.button.transform = CGAffineTransform(scaleX: 1.2, y: 1.2)
}
```

Reset:

```swift
UIView.animate(withDuration: 0.3) {
    self.button.transform = .identity
}
```

---

## 30. UIActivityIndicatorView

`UIActivityIndicatorView` shows loading state.

```swift
import UIKit

class LoadingViewController: UIViewController {

    private let activityIndicator = UIActivityIndicatorView(style: .large)

    override func viewDidLoad() {
        super.viewDidLoad()

        view.backgroundColor = .systemBackground
        setupLoader()
    }

    private func setupLoader() {
        activityIndicator.translatesAutoresizingMaskIntoConstraints = false
        activityIndicator.startAnimating()

        view.addSubview(activityIndicator)

        NSLayoutConstraint.activate([
            activityIndicator.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            activityIndicator.centerYAnchor.constraint(equalTo: view.centerYAnchor)
        ])
    }
}
```

---

## 31. Pull to Refresh

Pull to refresh is commonly used with table views.

```swift
private let refreshControl = UIRefreshControl()

private func setupRefreshControl() {
    refreshControl.addTarget(self, action: #selector(refreshData), for: .valueChanged)
    tableView.refreshControl = refreshControl
}

@objc private func refreshData() {
    print("Refreshing data")

    DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
        self.refreshControl.endRefreshing()
    }
}
```

---

## 32. UserDefaults

`UserDefaults` stores small local data like settings.

```swift
UserDefaults.standard.set(true, forKey: "isPremiumUser")

let isPremium = UserDefaults.standard.bool(forKey: "isPremiumUser")

print(isPremium)
```

Use UserDefaults for:

- Theme preference
- Login flag
- Simple app settings
- Small values

Do not store sensitive tokens or passwords in UserDefaults.

---

## 33. URLSession API Call

`URLSession` is used for network requests.

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
```

Use in UIKit:

```swift
Task {
    do {
        let posts = try await fetchPosts()
        print(posts)
    } catch {
        print("Failed: \(error)")
    }
}
```

---

## 34. Keyboard Dismiss

Dismiss keyboard when tapping outside.

```swift
override func viewDidLoad() {
    super.viewDidLoad()

    let tapGesture = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
    view.addGestureRecognizer(tapGesture)
}

@objc private func dismissKeyboard() {
    view.endEditing(true)
}
```

---

## 35. Keyboard Handling

Move UI when keyboard appears.

```swift
override func viewDidLoad() {
    super.viewDidLoad()

    NotificationCenter.default.addObserver(
        self,
        selector: #selector(keyboardWillShow),
        name: UIResponder.keyboardWillShowNotification,
        object: nil
    )

    NotificationCenter.default.addObserver(
        self,
        selector: #selector(keyboardWillHide),
        name: UIResponder.keyboardWillHideNotification,
        object: nil
    )
}

@objc private func keyboardWillShow(notification: Notification) {
    view.frame.origin.y = -100
}

@objc private func keyboardWillHide(notification: Notification) {
    view.frame.origin.y = 0
}
```

---

## 36. Dark Mode Support

Use system colors to support light and dark mode automatically.

```swift
view.backgroundColor = .systemBackground
label.textColor = .label
subtitleLabel.textColor = .secondaryLabel
button.backgroundColor = .systemBlue
```

Common adaptive colors:

```swift
.systemBackground
.secondarySystemBackground
.label
.secondaryLabel
.systemBlue
.systemGray
```

---

## 37. Accessibility

Accessibility helps all users use the app properly.

```swift
button.accessibilityLabel = "Continue"
button.accessibilityHint = "Double tap to continue to the next screen"
button.accessibilityTraits = .button
```

For image:

```swift
imageView.accessibilityLabel = "Profile picture"
imageView.isAccessibilityElement = true
```

---

## 38. Reusable Custom Button

Reusable components keep code clean.

```swift
import UIKit

class PrimaryButton: UIButton {

    init(title: String) {
        super.init(frame: .zero)

        setTitle(title, for: .normal)
        titleLabel?.font = .systemFont(ofSize: 18, weight: .bold)
        backgroundColor = .systemBlue
        tintColor = .white
        layer.cornerRadius = 12
        translatesAutoresizingMaskIntoConstraints = false

        heightAnchor.constraint(equalToConstant: 52).isActive = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
```

Use:

```swift
let button = PrimaryButton(title: "Continue")
view.addSubview(button)
```

---

## 39. MVC in UIKit

UIKit traditionally uses MVC.

```text
Model      = Data
View       = UI
Controller = Handles UI logic and user interaction
```

Example model:

```swift
struct User {
    let id: Int
    let name: String
}
```

Controller:

```swift
class UserViewController: UIViewController {
    private let user = User(id: 1, name: "Tawheed")

    override func viewDidLoad() {
        super.viewDidLoad()

        print(user.name)
    }
}
```

Problem:

```text
ViewController can become too large if all logic is inside it.
```

---

## 40. MVVM in UIKit

MVVM helps keep UIKit code clean.

```text
Model      = Data
View       = UIKit UI
ViewModel  = State and business logic
```

Model:

```swift
struct Product {
    let id: Int
    let name: String
}
```

ViewModel:

```swift
class ProductViewModel {

    private(set) var products: [Product] = []

    func loadProducts() {
        products = [
            Product(id: 1, name: "Monthly Plan"),
            Product(id: 2, name: "Yearly Plan")
        ]
    }
}
```

ViewController:

```swift
class ProductViewController: UIViewController {

    private let viewModel = ProductViewModel()

    override func viewDidLoad() {
        super.viewDidLoad()

        viewModel.loadProducts()
        print(viewModel.products)
    }
}
```

---

## 41. UIKit with SwiftUI

You can use SwiftUI inside UIKit using `UIHostingController`.

```swift
import UIKit
import SwiftUI

class SwiftUIHostViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        let swiftUIView = Text("SwiftUI inside UIKit")
            .font(.title)

        let hostingController = UIHostingController(rootView: swiftUIView)

        addChild(hostingController)
        view.addSubview(hostingController.view)
        hostingController.didMove(toParent: self)

        hostingController.view.translatesAutoresizingMaskIntoConstraints = false

        NSLayoutConstraint.activate([
            hostingController.view.topAnchor.constraint(equalTo: view.topAnchor),
            hostingController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            hostingController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            hostingController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
}
```

---

## 42. Storyboard

Storyboard is a visual way to design UIKit screens.

Storyboard can be useful for:

- Simple apps
- Quick UI design
- Visual layout
- Beginner learning

But many professional teams prefer programmatic UI because:

- Easier Git collaboration
- Easier code review
- Better control
- Easier reusable components
- Better for large projects

---

## 43. XIB

XIB is a separate UI file for reusable views or cells.

Use XIB for:

- Custom table cells
- Reusable UI sections
- Small reusable components

Programmatic UI is still often preferred in large modern projects.

---

## 44. Memory Management

UIKit uses classes heavily, so memory management is important.

Use `[weak self]` inside closures to avoid retain cycles.

```swift
class DownloadViewController: UIViewController {

    private var onComplete: (() -> Void)?

    override func viewDidLoad() {
        super.viewDidLoad()

        onComplete = { [weak self] in
            self?.showSuccess()
        }
    }

    private func showSuccess() {
        print("Download completed")
    }
}
```

---

## 45. Performance Tips

UIKit performance tips:

```text
Do not block main thread.
Reuse table view and collection view cells.
Use lazy loading for images.
Use correct image sizes.
Avoid unnecessary layout updates.
Avoid too many nested views.
Use Instruments to detect memory leaks.
Use weak delegate references.
Cache expensive data.
Use background thread for heavy work.
```

---

## 46. UIKit Learning Order

Follow this order:

```text
1. UIViewController
2. View lifecycle
3. Programmatic UI
4. Auto Layout
5. Safe area
6. UILabel
7. UIButton
8. UIImageView
9. UITextField
10. UITextView
11. UIStackView
12. UIScrollView
13. UITableView
14. Custom table cell
15. UICollectionView
16. UINavigationController
17. UITabBarController
18. UIAlertController
19. Modal presentation
20. Passing data
21. Closure callback
22. Delegate pattern
23. Gesture recognizer
24. Animation
25. URLSession
26. UserDefaults
27. Keyboard handling
28. Dark mode
29. Accessibility
30. Reusable components
31. MVC
32. MVVM
33. UIKit + SwiftUI
34. Performance optimization
35. Memory management
```

---

## Key Takeaways

```text
UIKit is still very important for iOS development.
UIViewController controls one screen.
Auto Layout makes UI responsive.
UIStackView simplifies layout.
UITableView is used for vertical lists.
UICollectionView is used for grids and custom layouts.
UINavigationController handles screen navigation.
UITabBarController handles bottom tabs.
Delegate pattern is very common in UIKit.
Target-action is used for button and control events.
Use weak delegates to avoid memory leaks.
Use system colors for dark mode support.
Use MVVM to avoid massive ViewControllers.
```

---

## Final Note

UIKit is powerful because it gives deep control over iOS UI.

```text
Programmatic UI
Auto Layout
ViewController lifecycle
Navigation
TableView
CollectionView
Delegates
Reusable components
Memory management
Performance
Clean architecture
```
