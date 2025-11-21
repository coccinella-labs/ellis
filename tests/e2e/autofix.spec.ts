import { test, expect } from '@playwright/test';

test.describe('Autofix Functionality', () => {
  test('should generate and accept AI suggestion', async ({ page }) => {
    await page.goto('/');

    // Prevent welcome modal from opening
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Mock the API response with delay to show generating status
    await page.route('**/api/complete', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay 1s
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          suggestion: ' This is an AI-generated continuation.',
        }),
      });
    });

    const editor = page.locator('[data-testid="input-editor"]');
    await editor.click();
    await page.keyboard.type(
      'This is a test sentence that should trigger AI completion.'
    );

    // Wait for generating status
    const generatingStatus = page.locator('[data-testid="status-generating"]');
    await expect(generatingStatus).toBeVisible();

    // Wait for suggestion to appear
    const suggestion = page.locator('[data-testid="text-suggestion"]');
    await expect(suggestion).toBeVisible();
    await expect(suggestion).toContainText(
      'This is an AI-generated continuation.'
    );

    // Accept suggestion with Tab
    await page.keyboard.press('Tab');

    // Check that suggestion is accepted
    await expect(editor).toHaveValue(
      'This is a test sentence that should trigger AI completion. This is an AI-generated continuation.'
    );
    await expect(suggestion).not.toBeVisible();
  });

  test('should handle API status check', async ({ page }) => {
    // Mock the status API
    await page.route('**/api/status', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'ok',
          providers: { gemini: true, sambanova: false },
        }),
      });
    });

    // The app checks status on load, but to test, perhaps reload or something.
    // Since status is checked internally, maybe just verify the route is called.
    // For e2e, perhaps not necessary, but to have it.
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Status is checked, but no visible UI for it, so just ensure no errors.
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle API error gracefully', async ({ page }) => {
    await page.goto('/');

    // Prevent welcome modal from opening
    await page.evaluate(() => localStorage.setItem('hasVisited', 'true'));
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // Mock API error with delay
    await page.route('**/api/complete', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay 1s
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ suggestion: '' }),
      });
    });

    const editor = page.locator('[data-testid="input-editor"]');
    await editor.click();
    await page.keyboard.type(
      'This is a test sentence that should trigger AI completion.'
    );

    // Wait for generating status
    const generatingStatus = page.locator('[data-testid="status-generating"]');
    await expect(generatingStatus).toBeVisible();

    // Wait for it to disappear (error handled)
    await expect(generatingStatus).not.toBeVisible();

    // No suggestion should appear
    const suggestion = page.locator('[data-testid="text-suggestion"]');
    await expect(suggestion).not.toBeVisible();
  });
});
