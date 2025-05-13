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

**Parameters**:
- `node`: Head reference.
- `data`: Value to insert.
- `p`: Position (1-based).
- `tail`: Tail reference.

**Explanation**:
1. **Insert at head** (`p == 1`):
   - Calls `insert_at_head` and returns.
     
2. **Insert at tail** (`head->next == NULL`):
     - Calls `insert_at_tail` and returns.

3. **Traverse to position `p-1`**:
     - Uses `head` pointer and counter `cnt`.
     - Loop stops at node before position `p`.

4. **Insert in middle**:
     - Creates `new_node` with `data`.
     - Links `new_node->next` to `head->next`.
     - Updates `head->next` to `new_node`.

**Edge Cases**: Handles head, tail, and middle insertions.

### Full Code Singly Linked List
```cpp
#include<bits/stdc++.h>
using namespace std;

class Node{
public:
    int data;
    Node* next = NULL;

    Node(int data)
    {
        this->data = data;
    }
};

void insert_at_head(Node* &head, int data)
{
    Node* temp = new Node(data);
    temp->next = head;
    head = temp;
}

void insert_at_tail(Node* &tail, int data)
{
    Node* temp = new Node(data);
    tail->next = temp;
    tail = temp;
}

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

void print_linked_list(Node* head)
{
    while(head!=NULL)
    {
        cout << head->data << " ";
        head = head->next;
    }
}

void traverse_recursive(Node* head)
{
    if(head == NULL)
    {
        return;
    }

    cout << head->data << " ";
    traverse_recursive(head->next);
}

int main()
{
    Node* node = new Node(0);
    Node* head = node;
    Node* tail = node;

    insert_at_head(head, 10);
    insert_at_tail(tail, 20);
    insert_at_tail(tail, 30);
    insert_at_head(head, 5);
    insert_at_position(head, 15,6, tail);

    traverse_recursive(head);
    print_linked_list(head);
    
    cout << tail->data << endl;
    cout << head->data << endl;

    return 0;
}
```
