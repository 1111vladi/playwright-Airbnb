export default class CardComponent {

    constructor(page) {
        this.page = page;
        // TODO - Improve locators
        this.cardList = this.page.locator('div[aria-live="polite"] > div > div[class = " dir dir-ltr"]');
        this.cardContainer = this.cardList.locator('div[data-testid="card-container"]');
        this.cardNameList = this.cardContainer.locator('div[data-testid = "listing-card-title"]');
        this.cardRatingList = this.cardContainer.locator(' > div > div:last-child > div:last-child');
        this.cardSubtitleList = this.cardContainer.locator(' > div > div:last-child > div[data-testid="listing-card-subtitle"]:nth-child(2) ');
    }

    getCardList(){
        return this.cardList;
    }

    getCardNameList(){
        return this.cardNameList;
    }

    getCardRatingList(){
        return this.cardRatingList;
    }

    getCardSubtitleList(){
        return this.cardSubtitleList;
    }

}
