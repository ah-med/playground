# Algorithm

This file explains the algorithm used in the `index.html` file to process the bookmark file.

## Overview

The algorithm processes Netscape-format bookmark files (exported from browsers) and converts them into a structured table view. The process involves several key steps:

🔍 File Validation
📋 Content Validation
📥 Bookmark Extraction
🧹 Data Sanitization
📊 Table Population

## Data Structures and Algorithms

### Data Structures

1. **Stack**

   - Used in `folderStack` array to maintain the current folder hierarchy
   - LIFO (Last In, First Out) structure
   - Used to track nested folder paths during DOM traversal

2. **Array**

   - Used to store bookmarks (`bookmarks` array)
   - Used for folder path segments
   - Used for DOM node children traversal

3. **Set**

   - Used in `findDuplicates` function to track unique URLs
   - O(1) lookup time for duplicate detection

4. **Tree**
   - The bookmark file structure is inherently a tree
   - DL > H3/DT > A hierarchy
   - Converted to a flat structure for display

### Algorithms

1. **Depth-First Search (DFS)**

   - Used in `processNode` function for DOM traversal
   - Recursive implementation
   - Time Complexity: O(n) where n is the number of nodes
   - Space Complexity: O(h) where h is the height of the tree

2. **String Manipulation**

   - Path joining with ">" separator
   - String sanitization for folder names
   - Time Complexity: O(n) for string operations

3. **Date Formatting**

   - Unix timestamp conversion
   - Locale-based date formatting
   - Time Complexity: O(1)

4. **Duplicate Detection**
   - Using Set for O(1) lookups
   - Time Complexity: O(n) for n bookmarks
   - Space Complexity: O(n) for storing unique URLs

### Time and Space Complexity

- Overall Time Complexity: O(n) where n is the number of bookmarks
- Overall Space Complexity: O(n) for storing bookmarks and folder structure
- DOM Traversal: O(n) where n is the number of nodes
- Table Population: O(n) where n is the number of bookmarks

## Detailed Steps

### 🔍 File Validation

- Checks if a file is selected
- Validates file type (must be HTML/HTM)
- Validates file extension (.html/.htm)
- Checks file size (max 10MB)

### 📋 Content Validation

- Verifies the DOCTYPE is "netscape-bookmark-file-1"
- Confirms presence of DL element (root container)
- Checks for at least one bookmark link (A element with HREF)

### 📥 Bookmark Extraction

The extraction process uses a depth-first traversal of the DOM tree:

```javascript
DL
├── H3 (Folder)
│   ├── DT
│   │   └── A (Bookmark)
│   └── DT
│       └── A (Bookmark)
└── H3 (Folder)
    └── DT
        └── A (Bookmark)
```

Key points:

- Maintains a folder stack to track current path
- H3 elements represent folders
- DT elements contain bookmarks (A elements)
- A elements inside DT belong to their parent H3 folder
- Depth is not incremented for DT elements to maintain proper folder hierarchy

### 🧹 Data Sanitization

For each bookmark:

- Trims whitespace from title and URL
- Sanitizes folder names (removes invalid characters)
- Formats dates from Unix timestamp to readable format
- Handles missing icons with a default link emoji

### 📊 Table Population

- Creates a flat table structure
- Groups bookmarks under their respective folders
- Displays:
  - Sequential number
  - Bookmark icon
  - Bookmark title (linked)
  - URL (linked)
  - Date added

## Data Structures

### 📝 BookmarkEntry Class

```javascript
{
    title: string,
    url: string,
    folder: string,
    addDate: string,
    icon: string
}
```

### 📁 Folder Structure

- Folders are represented as paths with ">" separator
- Example: "Parent > Child > Grandchild"
- Empty folder name represents "Uncategorized"

## Error Handling

The algorithm includes comprehensive error handling:

- File validation errors
- Content structure validation
- Date parsing errors
- Missing or malformed data

## Performance Considerations

- Uses efficient DOM traversal
- Processes bookmarks in a single pass
- Maintains a flat table structure for better rendering performance
- Limits file size to prevent memory issues
