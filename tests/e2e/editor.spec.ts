import { test, expect } from '@playwright/test';

test.describe('Text Editor App', () => {
  test('should load the editor page', async ({ page }) => {
    await page.goto('/');

    // Prevent welcome modal from opening
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Check that the page title is visible
    await expect(page).toHaveTitle(/Harper Autofix/);

    // Check that the main editor textarea is present
    const editor = page.locator('[data-testid="input-editor"]');
    await expect(editor).toBeVisible();
  });

  test('should allow typing in the editor', async ({ page }) => {
    await page.goto('/');

    // Prevent welcome modal from opening
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    const editor = page.locator('[data-testid="input-editor"]');
    await editor.click();

    await page.keyboard.type('Hello, world!');

    await expect(editor).toHaveValue('Hello, world!');
  });

  test('should open settings panel', async ({ page }) => {
    await page.goto('/');

    // Prevent welcome modal from opening
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Click the settings button
    const settingsButton = page.locator('[data-testid="button-settings"]');
    await settingsButton.click();

    // Check that settings panel is visible
    const settingsPanel = page.locator('[data-testid="panel-settings"]');
    await expect(settingsPanel).toBeVisible();
  });

  test('should open keyboard shortcuts modal', async ({ page }) => {
    await page.goto('/');

    // Prevent welcome modal from opening
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Press the keyboard shortcut Ctrl+/
    await page.keyboard.press('Control+/');

    // Check that modal is visible
    const shortcutsModal = page.locator('[data-testid="modal-shortcuts"]');
    await expect(shortcutsModal).toBeVisible();
  });

  test('should open providers modal from settings', async ({ page }) => {
    await page.goto('/');

    // Prevent welcome modal from opening
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Open settings panel
    const settingsButton = page.locator('[data-testid="button-settings"]');
    await settingsButton.click();

    // Click the "Learn more" link
    const learnMoreLink = page.locator('text=Learn more');
    await learnMoreLink.click();

    // Check that providers modal is visible
    const providersModal = page.locator('[data-testid="modal-providers"]');
    await expect(providersModal).toBeVisible();

    // Check modal content
    await expect(providersModal).toContainText('AI Providers');
    await expect(providersModal).toContainText('Google Gemini 3.0 Pro Preview');
    await expect(providersModal).toContainText('SambaNova GPT-OSS-120B');
  });

  test('should update word count', async ({ page }) => {
    await page.goto('/');

    // Prevent welcome modal from opening
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    const editor = page.locator('[data-testid="input-editor"]');
    await editor.click();
    await page.keyboard.type('This is a test sentence.');

    // Check word count
    const wordCount = page.locator('[data-testid="text-word-count"]');
    await expect(wordCount).toContainText('5');
  });
});
