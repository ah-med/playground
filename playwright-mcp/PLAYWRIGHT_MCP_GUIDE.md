# 🚀 Playwright + MCP: Rapid Prototyping → Reliable Automation

> **The Real Win**: Use MCP browser for rapid prototyping, then convert to Playwright tests for reliable CI/CD automation!

## **The Workflow**

### **Phase 1: Rapid Prototyping with MCP Browser**

```javascript
// Quickly test interactions in real-time
mcp_playwright_browser_navigate({ url: "http://localhost:3000" });
mcp_playwright_browser_click({ element: "Login button" });
mcp_playwright_browser_type({ element: "Email", text: "test@example.com" });
mcp_playwright_browser_snapshot(); // See what happened
```

### **Phase 2: Convert to Playwright Tests**

```typescript
// Convert MCP interactions to reliable test code
test("login flow", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByLabel("Email").fill("test@example.com");
  await expect(page.getByText("Welcome")).toBeVisible();
});
```

### **Phase 3: CI/CD Automation**

```bash
# Run in CI/CD pipeline
npm run test:e2e
```

## **Quick Setup**

### 1. **Install Playwright**

```bash
npm install -D @playwright/test
npx playwright install
```

### 2. **Add to package.json**

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug"
  }
}
```

### 3. **Configure .gitignore**

```gitignore
# Playwright
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
```

## **Phase 1: Rapid Prototyping with MCP Browser**

### **Start Your App + MCP Browser**

```bash
# Terminal 1: Start your app
npm start

# Terminal 2: Use MCP browser for rapid testing
# (Available in Cursor with MCP Playwright extension)
```

### **Example Prompts & MCP Tools**

```javascript
// Developer Prompt: "Go to my app and show me what's on the page"
mcp_playwright_browser_navigate({ url: "http://localhost:3000" });
mcp_playwright_browser_snapshot(); // Returns page structure

// Developer Prompt: "Click the login button and fill in the email field"
mcp_playwright_browser_click({ element: "Login button" });
mcp_playwright_browser_type({
  element: "Email input",
  text: "user@example.com",
});

// Developer Prompt: "Take a screenshot and check for any console errors"
mcp_playwright_browser_take_screenshot({ filename: "debug.png" });
mcp_playwright_browser_console_messages(); // Returns console logs
```

## **Phase 2: Convert to Playwright Tests**

### **Basic Test Structure**

```typescript
import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should login successfully", async ({ page }) => {
    await page.getByLabel("Email").fill("user@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Welcome")).toBeVisible();
  });
});
```

### **Best Practices**

```typescript
// ✅ Use semantic selectors
await page.getByRole("button", { name: "Login" }).click();
await page.getByLabel("Email").fill("user@example.com");

// ✅ Avoid CSS selectors
// ❌ await page.locator('.login-btn').click();

// ✅ Wait for elements to be ready
await expect(page.getByText("Welcome")).toBeVisible();

// ✅ Use data-testid for complex cases
await page.getByTestId("todo-item").click();
```

## **The Conversion Process**

### **Step 1: Prototype with MCP**

```javascript
// Developer Prompt: "Test the login flow - go to the app, click login, enter credentials"
mcp_playwright_browser_navigate({ url: "http://localhost:3000" });
mcp_playwright_browser_click({ element: "Login button" });
mcp_playwright_browser_type({ element: "Email", text: "test@example.com" });
mcp_playwright_browser_type({ element: "Password", text: "password123" });
mcp_playwright_browser_click({ element: "Submit button" });
mcp_playwright_browser_snapshot(); // Verify the interaction worked
```

### **Step 2: Convert to Playwright**

**In Cursor/VS Code with AI:**

```bash
# Developer types in chat/command palette:
"Convert this MCP flow to a Playwright test:
- Navigate to http://localhost:3000
- Click login button
- Fill email with test@example.com
- Fill password with password123
- Click submit
- Verify welcome message appears"
```

**AI generates:**

```typescript
// Convert the working MCP flow to reliable test code
test("login flow", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Welcome")).toBeVisible();
});
```

### **Step 3: Debug with MCP**

```javascript
// Developer Prompt: "The login test is failing - show me what's on the page and check for errors"
mcp_playwright_browser_snapshot(); // See current page state
mcp_playwright_browser_take_screenshot({ filename: "debug.png" });
mcp_playwright_browser_console_messages(); // Check for errors

// Developer Prompt: "Try clicking the login button again and see what happens"
mcp_playwright_browser_click({ element: "Login button" });
mcp_playwright_browser_snapshot(); // Check the result
```

## **IDE Workflow Examples**

### **Cursor/VS Code with AI Assistant**

```bash
# 1. After successful MCP prototyping, developer types:
"Create a Playwright test file for the login flow I just tested"

# 2. AI generates tests/auth.spec.ts with:
test("login flow", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Welcome")).toBeVisible();
});

# 3. Developer asks for more tests:
"Add tests for form validation and error handling"
```

### **GitHub Copilot Chat**

```bash
# Developer types in Copilot Chat:
"Convert this MCP browser interaction to a Playwright test:
- Navigate to localhost:3000
- Click 'Add Todo' button
- Type 'Buy groceries' in the input
- Press Enter
- Verify the todo appears in the list"

# Copilot generates:
test("add todo", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "Add Todo" }).click();
  await page.getByPlaceholder("Enter todo").fill("Buy groceries");
  await page.keyboard.press("Enter");
  await expect(page.getByText("Buy groceries")).toBeVisible();
});
```

## **Common Patterns**

### **Form Testing**

```typescript
test("form validation", async ({ page }) => {
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Please fill required fields")).toBeVisible();
});
```

### **API Testing**

```typescript
test("API integration", async ({ page }) => {
  // Intercept API calls
  await page.route("**/api/login", (route) =>
    route.fulfill({ status: 200, body: JSON.stringify({ success: true }) })
  );

  await page.getByRole("button", { name: "Login" }).click();
});
```

### **Mobile Testing**

```typescript
test("mobile view", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
});
```

## **Phase 3: CI/CD Automation**

### **Run Tests in Pipeline**

```bash
# Run all tests
npm run test:e2e

# Run with UI for debugging
npm run test:e2e:ui

# Run specific test
npm run test:e2e -- --grep "login"
```

### **Debugging Failed Tests**

```javascript
// Developer Prompt: "The CI test failed - let me see what the page looks like locally"
mcp_playwright_browser_navigate({ url: "http://localhost:3000" });
mcp_playwright_browser_snapshot(); // See what's different
mcp_playwright_browser_take_screenshot({ filename: "debug.png" });

// Developer Prompt: "Try the same steps that failed in CI"
mcp_playwright_browser_click({ element: "Login button" });
mcp_playwright_browser_type({ element: "Email", text: "test@example.com" });
mcp_playwright_browser_snapshot(); // Check if it works locally
```

## **Performance Tips**

### **Parallel Testing**

```typescript
// playwright.config.ts
export default defineConfig({
  workers: process.env.CI ? 1 : undefined,
  retries: process.env.CI ? 2 : 0,
});
```

### **Smart Waiting**

```typescript
// Wait for network idle
await page.waitForLoadState("networkidle");

// Wait for specific element
await page.waitForSelector('[data-testid="todo-list"]');

// Wait for API response
await page.waitForResponse((response) => response.url().includes("/api/todos"));
```

## **CI/CD Integration**

### **GitHub Actions**

```yaml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npm run test:e2e

- name: Upload test results
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
```

## **Why This Workflow Wins**

### **🚀 Rapid Prototyping**

- **MCP Browser**: Instant visual feedback
- **Real-time Testing**: See interactions immediately
- **Quick Debugging**: Snapshot and screenshot on demand

### **🔄 Seamless Conversion**

- **Same Interactions**: MCP commands → Playwright code
- **Reliable Tests**: Convert working prototypes to automation
- **Best of Both**: Speed of MCP + reliability of Playwright

### **⚡ CI/CD Automation**

- **Parallel Execution**: Run across multiple browsers
- **Rich Reports**: HTML reports with screenshots and traces
- **Pipeline Ready**: Integrate with any CI/CD system

## **Quick Reference**

| Phase         | Tool        | Purpose                   |
| ------------- | ----------- | ------------------------- |
| **Prototype** | MCP Browser | Rapid testing & debugging |
| **Convert**   | Playwright  | Reliable test automation  |
| **Automate**  | CI/CD       | Pipeline integration      |

---

**🎯 The Real Win**: Use MCP browser for rapid prototyping, then convert to Playwright tests for reliable CI/CD automation!
