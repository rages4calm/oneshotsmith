import { test, expect } from "@playwright/test";

test("homepage renders a live generated module cover", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/forged from a seed/i);
  // The hero shows a real generated adventure with its map and title.
  await expect(page.getByText(/Adventure Module/i).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Run this adventure/i })).toBeVisible();
});

test("forging another cover regenerates the adventure", async ({ page }) => {
  await page.goto("/");
  const title = page.locator(".module-frame h2");
  const before = await title.textContent();
  await page.getByRole("button", { name: /Forge another/i }).click();
  await expect(title).not.toHaveText(before ?? "", { timeout: 5000 });
});

test("generator builds a module from a seeded URL", async ({ page }) => {
  await page.goto("/one-shot-generator?s=k3v9pq&t=haunting&l=5&p=4&d=hard&tb=3h");
  await expect(page.locator(".module-sheet h1")).toBeVisible();
  await expect(page.getByRole("heading", { name: /For the Game Master/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Secrets & Clues/i })).toBeVisible();
  // Same seed must produce the same title on reload.
  const first = await page.locator(".module-sheet h1").textContent();
  await page.reload();
  await expect(page.locator(".module-sheet h1")).toHaveText(first ?? "");
});

test("character creator produces a sheet from a pregen link", async ({ page }) => {
  await page.goto("/character-creator?pregen=ser-caldor-brightshield&level=5&role=Frontliner");
  await expect(page.getByText(/Character record sheet/i)).toBeVisible();
  await expect(page.getByText(/Armor Class/i)).toBeVisible();
});
