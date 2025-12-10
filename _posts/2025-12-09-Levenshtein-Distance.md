---
title: Levenshtein Distance
description: Levenshtein distance is a measure of the similarity between two strings, which takes into account the number of insertion, deletion and substitution operations needed to transform one string into the other. 
author: tawhidmonowar
date: 2025-12-09 11:30:00 +06:00
categories: [Algorithm, Levenshtein Distance]
---

## Operations in Levenshtein distance are:
- `Insertion:` Adding a character to string A.
- `Deletion:` Removing a character from string A.
- `Replacement:` Replacing a character in string A with another character.

Let's see an example that there is String A: "kitten"  which need to be converted in String B: "sitting" so we need to determine the minimum operation required

- kitten → sitten (substitution of “s” for “k”)
- sitten → sittin (substitution of “i” for ????”)
- sittin → sitting (insertion of “g” at the end).

In this case it took three operation do this, so the levenshtein distance will be 3.
- `Upper and lower bounds:` If and only if the two strings are identical, the Levenshtein distance is always non-negative and zero. Because it requires completely changing one string into the other through deletions or insertions, the most feasible Levenshtein distance between two strings of length `m` and `n` is `max(m, n)`.

## Applications of Levenshtein distance:

The Levenshtein distance has various applications in various fields such as:
- Autocorrect Algorithms
- Data cleaning
- Data clustering and classification

## Other Distance Metrics:
- **Damerau-Levenshtein distance:** It is similar to the Levenshtein distance, but it just also allows transpositions as an additional operation making it 4 operations.
- **Hamming distance:** It can only be applied to strings of equal length, it is used measures the number of positions at which the corresponding characters are different.

## Example 01: Levenshtein distance using Iterative with the full matrix approach
The iterative technique with a full matrix uses a 2D matrix to hold the intermediate results of the Levenshtein distance calculation. It begins with empty strings and iteratively fills the matrix row by row. It computes the minimum cost of insertions, deletions, and replacements based on the characters of both strings. 

```cpp
#include <bits/stdc++.h>
using namespace std;

int levenshteinFullMatrix(const string& str1, const string& str2)
{
    int m = str1.length();
    int n = str2.length();

    vector<vector<int> > dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 0; i <= m; i++) {
        dp[i][0] = i;
    }

    for (int j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (str1[i - 1] == str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
            else {
                dp[i][j] = 1+ min(
                            // Insert
                            dp[i][j - 1],

                            min(
                                // Remove
                                dp[i - 1][j],

                                // Replace
                                dp[i - 1][j - 1])
                  );
            }
        }
    }

    return dp[m][n];
}

int main()
{
    string str1 = "kitten";
    string str2 = "sitting";

    int distance = levenshteinFullMatrix(str1, str2);
    cout << "Levenshtein Distance: " << distance << endl;
    return 0;
}
```

Time complexity: O(m*n)
Auxiliary complexity: O(m*n)

## Example 02: Levenshtein distance using Iterative with two matrix rows approach
By simply storing two rows of the matrix at a time, the iterative technique with two matrix rows reduces space complexity. It iterates through the strings row by row, storing the current and past calculations in two rows.

```cpp
#include <bits/stdc++.h>
using namespace std;

int levenshteinTwoMatrixRows(const string& str1, const string& str2)
{
    int m = str1.length();
    int n = str2.length();

    vector<int> prevRow(n + 1, 0);
    vector<int> currRow(n + 1, 0);

    for (int j = 0; j <= n; j++) {
        prevRow[j] = j;
    }

    for (int i = 1; i <= m; i++) {
        currRow[0] = i;

        for (int j = 1; j <= n; j++) {
            if (str1[i - 1] == str2[j - 1]) {
                currRow[j] = prevRow[j - 1];
            }
            else {
                currRow[j] = 1
                            + min(

                                // Insert
                                currRow[j - 1],
                                min(

                                    // Remove
                                    prevRow[j],

                                    // Replace
                                    prevRow[j - 1]));
            }
        }

        prevRow = currRow;
    }

    return currRow[n];
}

int main()
{
    string str1 = "kitten";
    string str2 = "sitting";

    // Function Call
    int distance = levenshteinTwoMatrixRows(str1, str2);
    cout << "Levenshtein Distance: " << distance;
    return 0;
}
```

Time complexity: O(m*n)
Auxiliary Space: O(n)
