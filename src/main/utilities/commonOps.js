export const setup = async ({ browser }) => {
    console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
    console.info('*--*  Starting session... Hello! *--*');
    console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/'); // baseUrl
    return { page, context };
};

export const teardown = async ({ browser }) => {
    console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
    console.info('*-- Closing session... Good bye!  --*');
    console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
    await browser.close();
};
