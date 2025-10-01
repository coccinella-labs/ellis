import { test, expect } from '@playwright/test';

test.describe('Text Editor App', () => {
  test('should load the editor page', async ({ page }) => {
    await page.goto('/');

    // Check that the page title is visible
    await expect(page).toHaveTitle(/Harper Autofix/);

    // Check that the main editor textarea is present
    const editor = page.locator('[data-testid="input-editor"]');
    await expect(editor).toBeVisible();
  });

  test('should allow typing in the editor', async ({ page }) => {
    await page.goto('/');

    const editor = page.locator('[data-testid="input-editor"]');
    await editor.click();

    await page.keyboard.type('Hello, world!');

    await expect(editor).toHaveValue('Hello, world!');
  });

  test('should open settings panel', async ({ page }) => {
    await page.goto('/');

    // Click the settings button
    const settingsButton = page.locator('[data-testid="button-settings"]');
    await settingsButton.click();

    // Check that settings panel is visible
    const settingsPanel = page.locator('[data-testid="panel-settings"]');
    await expect(settingsPanel).toBeVisible();
  });

  test('should open keyboard shortcuts modal', async ({ page }) => {
    await page.goto('/');

    // Click the keyboard shortcuts button
    const shortcutsButton = page.locator('[data-testid="button-shortcuts"]');
    await shortcutsButton.click();

    // Check that modal is visible
    const shortcutsModal = page.locator('[data-testid="modal-shortcuts"]');
    await expect(shortcutsModal).toBeVisible();
  });

  test('should update word count', async ({ page }) => {
    await page.goto('/');

    const editor = page.locator('[data-testid="input-editor"]');
    await editor.click();
    await page.keyboard.type('This is a test sentence.');

    // Check word count
    const wordCount = page.locator('[data-testid="text-word-count"]');
    await expect(wordCount).toContainText('5');
  });
});
