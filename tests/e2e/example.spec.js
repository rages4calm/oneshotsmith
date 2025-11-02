import { test, expect } from "@playwright/test";
test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /OneShotsmith/i })).toBeVisible();
});
test("has character creation button", async ({ page }) => {
    await page.goto("/");
    const createButton = page.getByRole("button", { name: /Create Character/i });
    await expect(createButton).toBeVisible();
});
test("has one-shot generation button", async ({ page }) => {
    await page.goto("/");
    const generateButton = page.getByRole("button", { name: /Generate One-Shot/i });
    await expect(generateButton).toBeVisible();
});
