const { test: setup } = require('@playwright/test');

setup('starting session', async ({}) => {
    console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
    console.info('*--*  Starting session... Hello! *--*');
    console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
});
