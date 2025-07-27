import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should display login form by default", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("should switch to signup form", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByLabel("Confirm Password")).toBeVisible();
  });

  test("should switch back to login form", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("should show validation errors for empty login form", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Please fill in all fields")).toBeVisible();
  });

  test("should show validation errors for empty signup form", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.getByRole("button", { name: "Sign Up" }).click();
    await expect(page.getByText("Please fill in all fields")).toBeVisible();
  });

  test("should show password mismatch error in signup", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").first().fill("password123");
    await page.getByLabel("Confirm Password").fill("different");
    await page.getByRole("button", { name: "Sign Up" }).click();
    await expect(page.getByText("Passwords do not match")).toBeVisible();
  });

  test("should show password length error in signup", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").first().fill("123");
    await page.getByLabel("Confirm Password").fill("123");
    await page.getByRole("button", { name: "Sign Up" }).click();
    await expect(
      page.getByText("Password must be at least 6 characters long")
    ).toBeVisible();
  });

  test("should successfully login with valid credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("john@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for login to complete
    await expect(page.getByText("Welcome, John Doe!")).toBeVisible();
    await expect(page.getByRole("heading", { name: "My Todos" })).toBeVisible();
  });

  test("should show error for invalid login credentials", async ({ page }) => {
    await page.getByLabel("Email").fill("invalid@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });

  test("should successfully signup with valid credentials", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.getByLabel("Name").fill("New User");
    await page.getByLabel("Email").fill("newuser@example.com");
    await page.getByLabel("Password").first().fill("password123");
    await page.getByLabel("Confirm Password").fill("password123");
    await page.getByRole("button", { name: "Sign Up" }).click();

    // Wait for signup to complete
    await expect(page.getByText("Welcome, New User!")).toBeVisible();
    await expect(page.getByRole("heading", { name: "My Todos" })).toBeVisible();
  });

  test("should show error for existing email in signup", async ({ page }) => {
    await page.getByRole("button", { name: "Sign up" }).click();
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill("john@example.com");
    await page.getByLabel("Password").first().fill("password123");
    await page.getByLabel("Confirm Password").fill("password123");
    await page.getByRole("button", { name: "Sign Up" }).click();
    await expect(
      page.getByText("User with this email already exists")
    ).toBeVisible();
  });

  test("should logout successfully", async ({ page }) => {
    // First login
    await page.getByLabel("Email").fill("john@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for login to complete
    await expect(page.getByText("Welcome, John Doe!")).toBeVisible();

    // Then logout
    await page.getByRole("button", { name: "Logout" }).click();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("should persist login state after page reload", async ({ page }) => {
    // Login first
    await page.getByLabel("Email").fill("john@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for login to complete
    await expect(page.getByText("Welcome, John Doe!")).toBeVisible();

    // Reload page
    await page.reload();

    // Should still be logged in
    await expect(page.getByText("Welcome, John Doe!")).toBeVisible();
    await expect(page.getByRole("heading", { name: "My Todos" })).toBeVisible();
  });
});
