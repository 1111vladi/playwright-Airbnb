const { test: teardown } = require('@playwright/test');

teardown('Closing session', async ({browser}) => {
    console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
    console.info('*-- Closing session... Good bye!  --*');
    console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
    await browser.close();
});
