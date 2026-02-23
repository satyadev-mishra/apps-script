# 🚀Apps Script Starter template for building Google Apps Script projects locally with clasp.

<div align="center">

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

_Managing sample orders and shipments with Google Apps Script automation_

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Author](https://img.shields.io/badge/Author-satyadev--mishra-green.svg)](https://github.com/satyadev-mishra)

</div>

## 📋 Overview

A production-ready starter template for building Google Apps Script projects locally with clasp, structured architecture, and Google Sheets as a backend.

---

## 🛠️ Project Setup

### 📊 Setup Google Sheets and Apps Script

#### Step 1: Create Google Sheet

1. Create a new Google Sheet
2. Copy the **Sheet ID** from the URL after `/d/`
   ```
   https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit
   ```
3. Save the Sheet ID for later use

#### Step 2: Setup Apps Script

1. Click **Extensions** → **Apps Script** (opens container-bound script editor)
2. Copy the **Script ID** from the URL after `projects/`
   ```
   https://script.google.com/u/0/home/projects/{APPS_SCRIPT_ID}
   ```
3. Save the Script ID for later use
4. Deploy as Web App with appropriate permissions

---

## 💻 Setting Up from Local Machine

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Google CLASP](https://github.com/google/clasp) installed globally

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/satyadev-mishra/apps-script.git
   cd sample-o2s
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Script ID**
   - Open `clasp.config.json`
   - Paste the Script ID in the desired mode (`dev` or `prod`)

4. **Configure Sheet ID**
   - Open `dev.json` or `prod.json`
   - Paste the Sheet ID in the desired mode

5. **Initialize CLASP**

   ```bash
   npm run clasp dev    # or npm run clasp prod
   clasp login
   clasp pull
   ```

6. **Start Development**
   ```bash
   # Write your code...
   clasp push
   ```

---

## 📁 Folder and File Structure

### Important Notes on Apps Script Structure

> ⚠️ **Important**: When you create folders inside `src`, they appear as files in Apps Script with
> forward slashes in their names.

#### Example Structure

**On Local Machine:**

```
src/
├── folder1/
│   ├── file1.js
│   └── file2.js
├── file3.js
├── Code.js
└── appsscript.json
```

**Appears as in Apps Script:**

```
folder1/file1.gs
folder1/file2.gs
file3.gs
Code.gs
appsscript.json
```

### Key Files

- **`Code.js`** - Main entry point file
- **`appsscript.json`** - Apps Script configuration
- **No ES6 modules** - Cannot use `import`/`export` statements
- **Global scope** - All files share global scope, avoid variable/function name conflicts

> 🚨 **Warning**: If you have a variable `data` in `file1.js` and `file2.js`, it will override each
> other. Same applies to functions.

---

## 🏗️ Project Architecture

### 📂 Directory Structure

```
apps-script/
├── 📁 src/
│   ├── 📄 Code.js              # Main Apps Script entry point
│   ├── 📄 appsscript.json      # Apps Script configuration
│   ├── 📄 dev.constants.js     # Development constants
│   ├── 📁 backend/
│   │   └── 📄 index.js         # Backend logic
│   └── 📁 frontend/
│       └── 📄 index.html       # Frontend interface
├── 📁 scripts/
│   └── 📄 clasp-runner.js      # Environment switcher
├── 📄 .prettierrc              # Code formatting rules
├── 📄 package.json             # Dependencies and scripts
└── 📄 README.md                # This file
```

### 🔄 Environment Management

The project supports two environments:

#### 🛠️ Development Environment

```bash
npm run clasp dev
```

#### 🚀 Production Environment

```bash
npm run clasp prod
```

The `clasp-runner.js` script automatically:

- Switches between development and production script IDs
- Updates `.clasp.json` with the appropriate script ID
- Configures `.claspignore` to exclude environment-specific files

---

## 💻 Server-Side Functions (Code.gs)

### Main Functions

| Function            | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `doGet(e)`          | **Entry point** - Serves web app and injects initial data |
| `include(fileName)` | **Template inclusion** - Includes HTML templates          |

### Function Details

#### `doGet(e)`

- Handles HTTP GET requests
- Routes to appropriate frontend templates
- Sets up web app metadata and configuration
- Calls backend functions for data processing

#### `include(fileName)`

- Includes HTML template files
- Returns HTML content as string
- Used for modular template management

---

## 🎨 Development Tools

### Available Scripts

| Script               | Description                       |
| -------------------- | --------------------------------- |
| `npm run clasp dev`  | Switch to development environment |
| `npm run clasp prod` | Switch to production environment  |
| `npm run format`     | Format code using Prettier        |

### Code Formatting

The project uses [Prettier](https://prettier.io/) with industry-standard configuration:

- **JavaScript**: Single quotes, semicolons, 2-space indentation
- **JSON**: Double quotes, proper formatting
- **HTML**: Optimized for readability
- **Markdown**: Prose-optimized formatting

---

## 🔧 Development Workflow

1. **Environment Setup**

   ```bash
   npm run clasp dev    # or npm run clasp prod
   ```

2. **Code Development**
   - Edit files in `src/` directory
   - Maintain global scope awareness
   - Use `npm run format` for code style

3. **Testing & Deployment**
   ```bash
   clasp push           # Push changes to Apps Script
   clasp open           # Open Apps Script editor
   ```



## 🚨 Important Considerations

### Global Scope Management

- Use unique function and variable names
- Consider using prefixes or namespaces
- Test thoroughly to avoid conflicts

### Performance Optimization

- Minimize API calls to Google services
- Use caching where appropriate
- Optimize spreadsheet operations

### Security Best Practices

- Validate all user inputs
- Use appropriate permissions
- Secure sensitive data

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🐛 Issues & Support

If you encounter any issues or have questions:

- 📋 [Report an Issue](https://github.com/satyadev-mishra/apps-script/issues)
- 💬 [Discussions](https://github.com/satyadev-mishra/apps-script/discussions)

---

## 🙏 Acknowledgments

- [Google Apps Script](https://developers.google.com/apps-script) for the powerful platform
- [CLASP](https://github.com/google/clasp) for enabling local development
- [Prettier](https://prettier.io/) for code formatting
- Google Sheets API for seamless integration

---

<div align="center">

**Built by [Satyadev Mishra](https://github.com/satyadev-mishra)**

</div>
