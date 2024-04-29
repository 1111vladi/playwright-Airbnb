export const startSession = async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    return { page, context };
};
