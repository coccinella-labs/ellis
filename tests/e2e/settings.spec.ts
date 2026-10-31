import { test, expect } from '@playwright/test';

test.describe('Settings Panel', () => {
  test.beforeEach(async ({ page }) => {
    // Prevent the welcome modal from opening on every navigation.
    await page.addInitScript(() => {
      localStorage.setItem('hasVisited', 'true');
    });
  });

  test('should change AI provider in settings', async ({ page }) => {
    await page.goto('/');

    // Open settings
    const settingsButton = page.locator('[data-testid="button-settings"]');
    await settingsButton.waitFor({ state: 'visible' });
    await settingsButton.click();

    // Switch to AI tab
    const aiTab = page.locator('[data-testid="tab-ai"]');
    await aiTab.click();

    // Change AI provider to Gemini only
    const providerSelect = page.locator('[data-testid="select-ai-provider"]');
    await providerSelect.selectOption('gemini');

    // Close settings
    const closeButton = page.locator('[data-testid="button-close-settings"]');
    await closeButton.click();

    // Reopen settings to verify persistence
    await settingsButton.click();
    await aiTab.click();
    await expect(providerSelect).toHaveValue('gemini');
  });

  test('should change completion mode and writing style', async ({ page }) => {
    await page.goto('/');

    // Open settings
    const settingsButton = page.locator('[data-testid="button-settings"]');
    await settingsButton.waitFor({ state: 'visible' });
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
});
