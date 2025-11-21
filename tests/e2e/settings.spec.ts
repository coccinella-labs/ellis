import { test, expect } from '@playwright/test';

test.describe('Settings Panel', () => {
  test('should change AI provider in settings', async ({ page }) => {
    await page.goto('/');

    // Prevent welcome modal from opening
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Open settings
    const settingsButton = page.locator('[data-testid="button-settings"]');
    await settingsButton.click();

    // Change AI provider to Gemini only
    const providerSelect = page.locator('[data-testid="select-ai-provider"]');
    await providerSelect.selectOption('gemini');

    // Close settings
    const closeButton = page.locator('[data-testid="button-close-settings"]');
    await closeButton.click();

    // Reopen settings to verify persistence
    await settingsButton.click();
    await expect(providerSelect).toHaveValue('gemini');
  });

  test('should change completion mode and writing style', async ({ page }) => {
    await page.goto('/');

    // Prevent welcome modal from opening
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Open settings
    const settingsButton = page.locator('[data-testid="button-settings"]');
    await settingsButton.click();

    // Change completion mode to paragraph
    const modeSelect = page.locator('[data-testid="select-completion-mode"]');
    await modeSelect.selectOption('paragraph');

    // Change writing style to formal
    const styleSelect = page.locator('[data-testid="select-writing-style"]');
    await styleSelect.selectOption('formal');

    // Close settings
    const closeButton = page.locator('[data-testid="button-close-settings"]');
    await closeButton.click();

    // Reopen settings to verify persistence
    await settingsButton.click();
    await expect(modeSelect).toHaveValue('paragraph');
    await expect(styleSelect).toHaveValue('formal');
  });

  test('should toggle auto-save setting', async ({ page }) => {
    await page.goto('/');

    // Prevent welcome modal from opening
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Open settings
    const settingsButton = page.locator('[data-testid="button-settings"]');
    await settingsButton.click();

    // Toggle auto-save
    const autoSaveSwitch = page.locator('[data-testid="switch-auto-save"]');
    await autoSaveSwitch.check();

    // Check that it's checked
    await expect(autoSaveSwitch).toBeChecked();
  });
});
