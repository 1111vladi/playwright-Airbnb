export default class NavigationComponent {

    constructor(page) {
        this.page = page;
        this.navigationContainer = this.page.locator('nav[aria-label = "Search results pagination"]');
        this.visiblePagesList = this.navigationContainer.locator('div > a[href]');
        this.navigationNext = this.navigationContainer.locator('a[aria-label="Next"]');
        this.navigationPrevious = this.navigationContainer.locator('a[aria-label="Previous"]');
    }

    async getPagesCount() {
        return await (await this.visiblePagesList.nth(await this.visiblePagesList.count() - 2)).textContent();
    }

    async navigateNextPage() {
        await this.navigationNext.click();
    }

    async navigatePrevPage() {
        await this.navigationPrevious.click();
    }
}