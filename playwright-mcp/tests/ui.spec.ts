import { test, expect } from "@playwright/test";

test.describe("UI and Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should have proper page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Todo App/);
  });

  test("should have proper heading structure", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Todo App" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("should have proper form labels", async ({ page }) => {
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("should have proper button labels", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
  });

  test("should have proper input types", async ({ page }) => {
    const emailInput = page.getByLabel("Email");
    const passwordInput = page.getByLabel("Password");

    await expect(emailInput).toHaveAttribute("type", "email");
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should have proper form validation", async ({ page }) => {
    const emailInput = page.getByLabel("Email");
    const passwordInput = page.getByLabel("Password");

    await expect(emailInput).toHaveAttribute("required");
    await expect(passwordInput).toHaveAttribute("required");
  });

  test("should handle keyboard navigation", async ({ page }) => {
    const emailInput = page.getByLabel("Email");
    const passwordInput = page.getByLabel("Password");
    const loginButton = page.getByRole("button", { name: "Login" });

    // Tab through form elements
    await page.keyboard.press("Tab");
    await expect(emailInput).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(passwordInput).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(loginButton).toBeFocused();
  });

  test("should handle form submission with Enter key", async ({ page }) => {
    await page.getByLabel("Email").fill("john@example.com");
    await page.getByLabel("Password").fill("password");
    await page.keyboard.press("Enter");

    // Should attempt to login
    await expect(page.getByText("Welcome, John Doe!")).toBeVisible();
  });

  test("should display loading states", async ({ page }) => {
    await page.getByLabel("Email").fill("john@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();

    // Should show loading state briefly
    await expect(
      page.getByRole("button", { name: "Logging in..." })
    ).toBeVisible();
  });

  test("should handle responsive design", async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Should still be functional
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("should have proper focus management", async ({ page }) => {
    // Login first
    await page.getByLabel("Email").fill("john@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Welcome, John Doe!")).toBeVisible();

    // Todo input should be focused after login
    const todoInput = page.getByPlaceholder("What needs to be done?");
    await expect(todoInput).toBeVisible();
  });

  test("should handle error states properly", async ({ page }) => {
    await page.getByLabel("Email").fill("invalid@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid email or password")).toBeVisible();

    // Error should be cleared when user starts typing
    await page.getByLabel("Email").fill("john@example.com");
    await expect(page.getByText("Invalid email or password")).not.toBeVisible();
  });

  test("should have proper ARIA attributes", async ({ page }) => {
    // Check for proper form structure
    await expect(page.getByRole("form")).toBeVisible();

    // Check for proper button roles
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
  });

  test("should handle form switching properly", async ({ page }) => {
    // Switch to signup
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();

    // Switch back to login
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("should display demo credentials", async ({ page }) => {
    await expect(page.getByText("Demo Credentials:")).toBeVisible();
    await expect(page.getByText("Email: john@example.com")).toBeVisible();
    await expect(page.getByText("Password: password")).toBeVisible();
  });
});
