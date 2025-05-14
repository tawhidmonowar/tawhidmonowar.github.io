---
title: Linked List
description: A linked list is a linear data structure where each element (node) contains a value and a reference to the next node in the sequence. It allows efficient insertions and deletions but slower access compared to arrays, as elements are not stored in contiguous memory.
author: tawhidmonowar
date: 2025-04-01 11:30:00 +06:00
categories: [Data Structure, Linked List]
---

## Singly Linked List
In a singly linked list, each node consists of two parts: data and a pointer to the next node. This structure allows nodes to be dynamically linked together, forming a chain-like sequence.

![singly linked list](/assets/img/posts/img_linkedlists_singly.svg)

### Representation

```cpp
class Node{
public:
    int data;
    Node* next = NULL;

    Node(int data)
    {
        this->data = data;
    }
};
```
**Purpose:** Defines the structure of a node in a singly linked list.

Explanation:
 - `data`: Stores the value of the node.
 - `next`: Pointer to the next node in the list.
 - Constructor initializes the data field and sets next to `NULL`.

### Traversal (Iterative Approach)

```cpp
void print_linked_list(Node* head)
{
    while(head!=NULL)
    {
        cout << head->data << " ";
        head = head->next;
    }
}
```

### Traversal (Recursive Approach)

```cpp
void traverse_recursive(Node* head)
{
    if(head == NULL)
    {
        return;
    }
    cout << head->data << " ";
    traverse_recursive(head->next);
}
```

### Insert at Head

```cpp
void insert_at_head(Node* &head, int data)
{
    Node* temp = new Node(data);
    temp->next = head;
    head = temp;
}
```

### Insert at Tail

```cpp
void insert_at_tail(Node* &tail, int data)
{
    Node* temp = new Node(data);
    tail->next = temp;
    tail = temp;
}
```

### Insert at Position

```cpp
void insert_at_position(Node* &node, int data, int p, Node* &tail)
{
    if(p==1)
    {
        insert_at_head(node, data);
        return;
    }
    Node* head = node;
    int cnt=1;

    while(cnt<p-1)
    {
        head = head->next;
        cnt++;
    }

    if(head->next == NULL)
    {
        insert_at_tail(tail, data);
        return;
    }

    Node* new_node = new Node(data);
    new_node->next = head->next;
    head->next = new_node;
}
```

**Purpose**: Inserts a node with `data` at position `p` in a linked list.

**Explanation**:
- **Insert at head** (`p == 1`):
   - Calls `insert_at_head` and returns.
     
- **Insert at tail** (`head->next == NULL`):
     - Calls `insert_at_tail` and returns.

- **Traverse to position `p-1`**:
     - Uses `head` pointer and counter `cnt`.
     - Loop stops at node before position `p`.

- **Insert in middle**:
     - Creates `new_node` with `data`.
     - Links `new_node->next` to `head->next`.
     - Updates `head->next` to `new_node`.

**Edge Cases**: Handles head, tail, and middle insertions.


### Delete Node (Any Position) 

**Destructor (~Node())**

Ensures memory is cleaned up properly:
- If the current node points to another node `(next != NULL)`, it deletes the next node recursively.
- This helps prevent memory leaks when deleting a chain of nodes.

```cpp
class Node{
public:
    int data;
    Node* next = NULL;

    Node(int data)
    {
        this->data = data;
    }

    ~Node() 
    {
        if(this->next != NULL)
        {
            delete next;
            this->next = NULL;
        }
    }
};
```
**Destructor** is an instance member function that is invoked automatically whenever an object is going to be destroyed. Meaning, a destructor is the last function that is going to be called before an object is destroyed.

**Delete Node Function**

```cpp
void delete_node(int position, Node* &head, Node* &tail)
{
    if(position == 1)
    {
        Node* temp = head;
        head = head->next;
        temp->next = NULL;
        delete temp;
    }
    else
    {
        Node* current = head;
        Node* pre = NULL;
        int cnt = 1;
        while(cnt<position)
        {
            pre = current;
            current = current->next;
            cnt++;
        }

        if(current->next == NULL)
        {
            tail=pre;
        }

        pre->next = current->next;
        current->next = NULL;
        delete current;

    }
}
```
**Purpose:** Deletes a node at a given `position` from a singly linked list.

**Explanation:**
- position == 1:
   - Deletes the head node. Updates head to the next node and frees memory.
- Else:
    - Traverses to the node at the given position.
    - Updates the next pointer of the previous node to skip the current node.
    - If deleting the last node, updates tail.
    -  Frees the memory of the deleted node.

### Full Code: Singly Linked List
```cpp
#include<bits/stdc++.h>
using namespace std;

// Node class for singly linked list
class Node {
public:
    int data;
    Node* next = NULL;

    Node(int data) {
        this->data = data;
    }

    // Recursively delete entire list from this node
    ~Node() {
        if(this->next != NULL) {
            delete next;
            this->next = NULL;
        }
    }
};

// Insert new node at head
void insert_at_head(Node* &head, int data) {
    Node* temp = new Node(data);
    temp->next = head;
    head = temp;
}

// Insert new node at tail
void insert_at_tail(Node* &tail, int data) {
    Node* temp = new Node(data);
    tail->next = temp;
    tail = temp;
}

// Insert new node at given position (1-based)
void insert_at_position(Node* &node, int data, int p, Node* &tail) {
    if(p==1) {
        insert_at_head(node, data);
        return;
    }

    Node* head = node;
    int cnt=1;
    while(cnt < p-1) {
        head = head->next;
        cnt++;
    }

    if(head->next == NULL) {
        insert_at_tail(tail, data);
        return;
    }

    Node* new_node = new Node(data);
    new_node->next = head->next;
    head->next = new_node;
}

// Print linked list (iteratively)
void print_linked_list(Node* head) {
    while(head != NULL) {
        cout << head->data << " ";
        head = head->next;
    }
}

// Print linked list (recursively)
void traverse_recursive(Node* head) {
    if(head == NULL) return;
    cout << head->data << " ";
    traverse_recursive(head->next);
}

// Delete node at given position (1-based)
void delete_node(int position, Node* &head, Node* &tail) {
    if(position == 1) {
        Node* temp = head;
        head = head->next;
        temp->next = NULL;
        delete temp;
    } else {
        Node* current = head;
        Node* pre = NULL;
        int cnt = 1;

        while(cnt < position) {
            pre = current;
            current = current->next;
            cnt++;
        }

        if(current->next == NULL) tail = pre;

        pre->next = current->next;
        current->next = NULL;
        delete current;
    }
}

int main() {
    // Create initial node
    Node* node = new Node(0);
    Node* head = node;
    Node* tail = node;

    // Insertions
    insert_at_head(head, 10);     // 10 -> 0
    insert_at_head(head, 5);      // 5 -> 10 -> 0
    insert_at_tail(tail, 20);     // ... -> 0 -> 20
    insert_at_tail(tail, 30);     // ... -> 20 -> 30
    insert_at_position(head, 15, 3, tail);  // Insert 15 at pos 3

    // Print list
    cout << "Linked List (Iterative): ";
    print_linked_list(head);
    cout << endl;

    // Delete 4th node
    delete_node(4, head, tail);

    // Print list after deletion
    cout << "After deletion at position 4: ";
    print_linked_list(head);
    cout << endl;

    // Print list recursively
    cout << "Linked List (Recursive): ";
    traverse_recursive(head);
    cout << endl;

    // Print head and tail values
    cout << "Head: " << (head ? head->data : -1) << endl;
    cout << "Tail: " << (tail ? tail->data : -1) << endl;

    // Clean memory (deletes entire list from head)
    delete head;

    return 0;
}
```
