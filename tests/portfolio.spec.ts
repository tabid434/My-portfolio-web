import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function canvasPixels(page: Page) {
  return page.locator('canvas[data-ready="true"]').evaluate((canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("webgl2");
    if (!context) return { painted: 0, fingerprint: 0 };
    const pixels = new Uint8Array(canvas.width * canvas.height * 4);
    context.readPixels(0, 0, canvas.width, canvas.height, context.RGBA, context.UNSIGNED_BYTE, pixels);
    let painted = 0;
    let fingerprint = 0;
    for (let index = 0; index < pixels.length; index += 16) {
      if (pixels[index + 3] > 0) painted++;
      fingerprint = (fingerprint + pixels[index] * ((index % 131) + 1)) % 1000000007;
    }
    return { painted, fingerprint };
  });
}

async function fillContact(page: Page) {
  await page.getByLabel("Your name", { exact: true }).fill("Portfolio Test");
  await page.getByLabel("Email address", { exact: true }).fill("test@example.com");
  await page.getByLabel("What are you working on?", { exact: true }).fill("Product collaboration");
  await page.getByLabel("A little more detail", { exact: true }).fill("A test enquiry about a cross-platform application with a responsive web interface.");
}

test("desktop themes, real canvas pixels, interaction, content, and screenshots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ colorScheme: "dark" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("TALHA");
  await expect(page.locator("canvas")).toBeVisible();
  await expect.poll(async () => (await canvasPixels(page)).painted).toBeGreaterThan(1000);
  const initial = await canvasPixels(page);
  await page.mouse.move(1000, 370);
  await expect.poll(async () => (await canvasPixels(page)).fingerprint).not.toBe(initial.fingerprint);
  await page.screenshot({ path: test.info().outputPath("desktop-dark.png") });
  const bounds = await page.locator(".hero-identity").boundingBox();
  expect(bounds?.width).toBeGreaterThan(300);
  await expect(page.locator("body")).not.toHaveJSProperty("scrollWidth", 0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.screenshot({ path: test.info().outputPath("desktop-light.png") });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await page.locator(".showcase-0").screenshot({ path: test.info().outputPath("cairasu-showcase.png") });
  await page.locator(".showcase-1").screenshot({ path: test.info().outputPath("kaido-showcase.png") });
  await expect(page.getByText("DEVFIED", { exact: true })).toBeVisible();
  await expect(page.getByText("July 2023 – February 2026", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "View Cairasu case study", exact: true }).hover();
  await expect(page.locator(".custom-cursor")).toHaveText("VIEW");
  await page.getByRole("link", { name: "View Cairasu case study", exact: true }).click();
  await expect(page).toHaveURL(/projects\/cairasu/);
  await expect(page.locator(".case-metadata")).toContainText("Frontend Lead");
  await expect(page.getByRole("heading", { name: "The problem", exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test("mobile layout, canvas, menu focus, projects and contact", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, colorScheme: "dark" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible();
  await expect.poll(async () => (await canvasPixels(page)).painted).toBeGreaterThan(300);
  await page.screenshot({ path: test.info().outputPath("mobile-dark.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator(".custom-cursor")).toBeHidden();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.screenshot({ path: test.info().outputPath("mobile-menu.png") });
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Projects" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.locator(".showcase-0").screenshot({ path: test.info().outputPath("mobile-cairasu.png") });
  await page.locator(".showcase-1").screenshot({ path: test.info().outputPath("mobile-kaido.png") });
  await page.locator("#contact").screenshot({ path: test.info().outputPath("mobile-contact.png") });
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow at ${width}px`).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: test.info().outputPath("mobile-light.png") });
  await context.close();
});

test("reduced motion, no-WebGL fallback, keyboard ecosystem, and accessibility", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible();
  await expect.poll(async () => (await canvasPixels(page)).painted).toBeGreaterThan(1000);
  const first = await canvasPixels(page);
  await page.mouse.move(1000, 450);
  expect((await canvasPixels(page)).fingerprint).toBe(first.fingerprint);
  await page.getByRole("tab", { name: /Interfaces/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /Systems/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("NestJS");
  for (const theme of ["dark", "light"]) {
    if (theme === "light") await page.getByRole("button", { name: "Toggle color theme" }).click();
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations.map((item) => ({ id: item.id, nodes: item.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })) })), `${theme} accessibility`).toEqual([]);
  }
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null;
      return original.apply(this, [type, ...args] as Parameters<typeof original>);
    } as typeof original;
  });
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".architecture-fallback")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("contact validates, handles server failure, disables pending submissions, and shows provider-accepted state", async ({ page, request }) => {
  const origin = "http://localhost:3100";
  const payload = { name: "Test User", email: "test@example.com", subject: "Portfolio enquiry", message: "This is a sufficiently detailed product enquiry for validation.", website: "" };
  const invalid = await request.post("/api/contact", { headers: { origin }, data: { ...payload, email: "invalid" } });
  expect(invalid.status()).toBe(422);
  const foreign = await request.post("/api/contact", { headers: { origin: "https://example.com" }, data: payload });
  expect(foreign.status()).toBe(403);
  const tooLarge = await request.post("/api/contact", { headers: { origin }, data: { ...payload, message: "a".repeat(25000) } });
  expect(tooLarge.status()).toBe(413);
  const unconfigured = await request.post("/api/contact", { headers: { origin }, data: payload });
  expect(unconfigured.status()).toBe(503);
  await page.goto("/#contact");
  await fillContact(page);
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.locator(".contact-form").getByRole("alert")).toContainText("temporarily unavailable");
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("Portfolio Test");
  let release: (() => void) | undefined;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/api/contact", async (route) => {
    await gate;
    await route.fulfill({ status: 200, json: { message: "Your message has been accepted for email delivery. Thank you for reaching out." } });
  });
  await page.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sending" })).toBeDisabled();
  release?.();
  await expect(page.getByRole("status")).toContainText("accepted for email delivery");
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("");
});

test("all case studies and downloadable and SEO assets resolve", async ({ page, request }) => {
  for (const slug of ["cairasu", "kaido", "tudu", "dermeez", "boltiq", "brackets-team", "eflea", "veronicas-insurance", "tour-27", "save-e"]) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { name: "The problem", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Where the complexity lives.", exact: true })).toBeVisible();
  }
  const missing = await request.get("/projects/not-a-project");
  expect(missing.status()).toBe(404);
  for (const path of ["/robots.txt", "/sitemap.xml", "/icon.svg", "/opengraph-image", "/talha-abid.jpg", "/property-study.jpg"]) expect((await request.get(path)).ok(), path).toBe(true);
  const resume = await request.get("/Talha_Abid_Resume.pdf");
  expect(resume.ok()).toBe(true);
  expect((await resume.body()).subarray(0, 4).toString()).toBe("%PDF");
  await page.goto("/projects/kaido");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: test.info().outputPath("mobile-case-study.png"), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});