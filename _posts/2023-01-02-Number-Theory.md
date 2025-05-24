---
title: Number Theory
description: Number theory is a branch of pure mathematics devoted primarily to the study of the integers and arithmetic functions.
author: tawhidmonowar
date: 2023-01-02 11:30:00 +06:00
categories: [Problem Solving, Number Theory]
---

## Large Numbers
### Doubling a Large Number

When a number is too large to fit in built-in data types like `long long int`, we can represent it as a string and perform arithmetic manually.

**Concept:**

We go through each digit in the number (from right to left), double it, and keep track of any "carry" to the next digit. After we're done, we reverse the result to get the final answer.

**Key Steps:**

- Start from the last digit (rightmost).
- Multiply the digit by 2 and add any carry from the previous step.
- Store the result's last digit and carry over the rest.
- After the loop, if there is a remaining carry, append it.
- Reverse the final string to get the correct result.

**Example**

```cpp
string doubleBigNumber(const string& num) {
    string result = "";
    int carry = 0;

    for (int i = num.size() - 1; i >= 0; --i) {
        int digit = num[i] - '0';
        int doubled = digit * 2 + carry;
        carry = doubled / 10;
        result += (doubled % 10) + '0';
    }

    if (carry) result += carry + '0';
    reverse(result.begin(), result.end());
    return result;
}
```
