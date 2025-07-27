import { test, expect } from "@playwright/test";

test.describe("Todo CRUD Operations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Login first
    await page.getByLabel("Email").fill("john@example.com");
    await page.getByLabel("Password").fill("password");
    await page.getByRole("button", { name: "Login" }).click();

    // Wait for login to complete
    await expect(page.getByText("Welcome, John Doe!")).toBeVisible();
    await expect(page.getByRole("heading", { name: "My Todos" })).toBeVisible();
  });

  test("should display empty state when no todos exist", async ({ page }) => {
    await expect(page.getByText("No todos yet. Add one above!")).toBeVisible();
  });

  test("should add a new todo", async ({ page }) => {
    const todoText = "Buy groceries";
    await page.getByPlaceholder("What needs to be done?").fill(todoText);
    await page.getByRole("button", { name: "Add Todo" }).click();

    await expect(page.getByText(todoText)).toBeVisible();
    await expect(
      page.getByText("No todos yet. Add one above!")
    ).not.toBeVisible();
  });

  test("should not add empty todo", async ({ page }) => {
    await page.getByRole("button", { name: "Add Todo" }).click();
    await expect(page.getByText("No todos yet. Add one above!")).toBeVisible();
  });

  test("should add multiple todos", async ({ page }) => {
    const todos = ["Buy groceries", "Walk the dog", "Read a book"];

    for (const todo of todos) {
      await page.getByPlaceholder("What needs to be done?").fill(todo);
      await page.getByRole("button", { name: "Add Todo" }).click();
    }

    for (const todo of todos) {
      await expect(page.getByText(todo)).toBeVisible();
    }
  });

  test("should toggle todo completion status", async ({ page }) => {
    // Add a todo
    await page.getByPlaceholder("What needs to be done?").fill("Test todo");
    await page.getByRole("button", { name: "Add Todo" }).click();

    const todoItem = page.locator(".todo-item").first();
    const checkbox = todoItem.locator('input[type="checkbox"]');

    // Initially unchecked
    await expect(checkbox).not.toBeChecked();

    // Check the todo
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await expect(todoItem).toHaveClass(/completed/);

    // Uncheck the todo
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    await expect(todoItem).not.toHaveClass(/completed/);
  });

  test("should delete a todo", async ({ page }) => {
    // Add a todo
    await page
      .getByPlaceholder("What needs to be done?")
      .fill("Todo to delete");
    await page.getByRole("button", { name: "Add Todo" }).click();

    await expect(page.getByText("Todo to delete")).toBeVisible();

    // Delete the todo
    await page.getByRole("button", { name: "Delete" }).first().click();

    await expect(page.getByText("Todo to delete")).not.toBeVisible();
    await expect(page.getByText("No todos yet. Add one above!")).toBeVisible();
  });

  test("should edit a todo", async ({ page }) => {
    // Add a todo
    await page.getByPlaceholder("What needs to be done?").fill("Original todo");
    await page.getByRole("button", { name: "Add Todo" }).click();

    await expect(page.getByText("Original todo")).toBeVisible();

    // Double click to edit
    await page.getByText("Original todo").dblclick();

    // Edit the todo
    const editInput = page.locator(".todo-edit-input").first();
    await editInput.fill("Updated todo");
    await editInput.press("Enter");

    await expect(page.getByText("Updated todo")).toBeVisible();
    await expect(page.getByText("Original todo")).not.toBeVisible();
  });

  test("should cancel todo edit with Escape key", async ({ page }) => {
    // Add a todo
    await page.getByPlaceholder("What needs to be done?").fill("Test todo");
    await page.getByRole("button", { name: "Add Todo" }).click();

    // Double click to edit
    await page.getByText("Test todo").dblclick();

    // Edit and cancel with Escape
    const editInput = page.locator(".todo-edit-input").first();
    await editInput.fill("Changed text");
    await editInput.press("Escape");

    // Should revert to original text
    await expect(page.getByText("Test todo")).toBeVisible();
    await expect(page.getByText("Changed text")).not.toBeVisible();
  });

  test("should save todo edit on blur", async ({ page }) => {
    // Add a todo
    await page.getByPlaceholder("What needs to be done?").fill("Test todo");
    await page.getByRole("button", { name: "Add Todo" }).click();

    // Double click to edit
    await page.getByText("Test todo").dblclick();

    // Edit and blur
    const editInput = page.locator(".todo-edit-input").first();
    await editInput.fill("Saved on blur");
    await editInput.blur();

    await expect(page.getByText("Saved on blur")).toBeVisible();
  });

  test("should not save empty todo edit", async ({ page }) => {
    // Add a todo
    await page.getByPlaceholder("What needs to be done?").fill("Test todo");
    await page.getByRole("button", { name: "Add Todo" }).click();

    // Double click to edit
    await page.getByText("Test todo").dblclick();

    // Clear the input and save
    const editInput = page.locator(".todo-edit-input").first();
    await editInput.fill("");
    await editInput.press("Enter");

    // Should keep original text
    await expect(page.getByText("Test todo")).toBeVisible();
  });

  test("should use edit button to edit todo", async ({ page }) => {
    // Add a todo
    await page.getByPlaceholder("What needs to be done?").fill("Test todo");
    await page.getByRole("button", { name: "Add Todo" }).click();

    // Click edit button
    await page.getByRole("button", { name: "Edit" }).first().click();

    // Should be in edit mode
    await expect(page.locator(".todo-edit-input").first()).toBeVisible();
  });

  test("should persist todos after page reload", async ({ page }) => {
    // Add a todo
    await page
      .getByPlaceholder("What needs to be done?")
      .fill("Persistent todo");
    await page.getByRole("button", { name: "Add Todo" }).click();

    await expect(page.getByText("Persistent todo")).toBeVisible();

    // Reload page
    await page.reload();

    // Should still be logged in and have the todo
    await expect(page.getByText("Welcome, John Doe!")).toBeVisible();
    await expect(page.getByText("Persistent todo")).toBeVisible();
  });

  test("should handle multiple todo operations", async ({ page }) => {
    // Add multiple todos
    const todos = ["First todo", "Second todo", "Third todo"];
    for (const todo of todos) {
      await page.getByPlaceholder("What needs to be done?").fill(todo);
      await page.getByRole("button", { name: "Add Todo" }).click();
    }

    // Complete first todo
    await page.locator(".todo-checkbox").first().check();

    // Edit second todo
    await page.getByText("Second todo").dblclick();
    await page.locator(".todo-edit-input").first().fill("Updated second todo");
    await page.locator(".todo-edit-input").first().press("Enter");

    // Delete third todo
    await page.getByRole("button", { name: "Delete" }).last().click();

    // Verify results
    await expect(page.getByText("First todo")).toBeVisible();
    await expect(page.getByText("Updated second todo")).toBeVisible();
    await expect(page.getByText("Third todo")).not.toBeVisible();

    // First todo should be completed
    await expect(page.locator(".todo-checkbox").first()).toBeChecked();
  });
});
