const { test: teardown } = require('@playwright/test');

teardown('Closing session', async ({browser, context}) => {
    console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
    console.info('*-- Closing session... Good bye!  --*');
    console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
    await context.close();
    await browser.close();
});
