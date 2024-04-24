export const startSession = async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/'); // baseUrl
    return { page, context };
};
