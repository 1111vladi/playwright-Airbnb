import {getElementByText, getElementsCount} from "../../extensions/uiActions";
import {pagesNameList} from "../../utilities/constants";
import {expect} from "@playwright/test";
import {numValidationCheck} from "../../utilities/numUtils";

export default class GuestsComponent {

    constructor(page) {
        this.page = page;
        // Main Page
        this.mainPageGuestsInfo = this.page.locator('div[data-testid = "structured-search-input-field-guests-button"]');
        this.mainPageGuestsContainer = this.page.locator('div[data-testid = "structured-search-input-field-guests-panel"]');
        // Listing Page
        this.listingPageGuestsInfo = this.page.locator('div[id="GuestPicker-book_it-trigger"]');
        this.listingPageGuestsContainer = this.page.locator('div[aria-labelledby="GuestPicker-book_it-form"]');
        // Cache
        this.guestsLocatorsCache = {};
    }

    getGuestsLocatorsByPage(pageName) {
        if (this.guestsLocatorsCache[pageName]) {
            return this.guestsLocatorsCache[pageName];
        }

        const guestsElements = {
            [pagesNameList.mainPage]: {
                info: this.mainPageGuestsInfo,
                container: this.mainPageGuestsContainer,
                closeModalButton: ''
            },
            [pagesNameList.listingPage]: {
                info: this.listingPageGuestsInfo,
                container: this.listingPageGuestsContainer,
                closeModalButton: ''
            }
        };

        this.guestsLocatorsCache[pageName] = guestsElements[pageName];
        return guestsElements[pageName];
    }

    async getGuestsCountElem(pageName) {
        const {info} = this.getGuestsLocatorsByPage(pageName);
        let guestsCountLocator;
        switch (pageName) {
            case pagesNameList.mainPage:
                guestsCountLocator = ' > div > div:last-child'
                break;
            case pagesNameList.listingPage:
                guestsCountLocator = 'span'
                break;
        }
        return await info.locator(guestsCountLocator);
    }

    async verifyGuestsCount(pageName, guestsNum) {
        const {info} = this.getGuestsLocatorsByPage(pageName);
        await expect(info).toHaveText(`${guestsNum} guests`);
    }

    async openGuestsInfo(pageName) {
        const {info} = this.getGuestsLocatorsByPage(pageName);
        await info.click();
    }

    async getGuestsTypeList(pageName) {
        const {container} = this.getGuestsLocatorsByPage(pageName);
        return await container.locator(' > div > div');
    }

    async closeGuestsModal() {
        const closeElem = await this.page.locator(getElementByText('button', 'Close'));
        await closeElem.click();
    }

    async getGuestsNumPerType(pageName, guestType) {
        const list = await this.getGuestsTypeList(pageName);
        let guestCountLocator;
        switch (pageName) {
            case pagesNameList.mainPage:
                guestCountLocator = `span[data-testid="stepper-${guestType}-value"]`
                break;
            case pagesNameList.listingPage:
                guestCountLocator = `span[data-testid*="${guestType}-stepper-value"]`
                break;
        }
        const guest = await list.locator(guestCountLocator);
        const guestNum = await guest.textContent();
        return {
            guestType,
            count: guestNum
        };
    }

    async getGuestsStepperAttValue(pageName, guestType) {
        let guestsStepperLocator;
        switch (pageName) {
            case pagesNameList.mainPage:
                guestsStepperLocator = `stepper-${guestType}`
                break;
            case pagesNameList.listingPage:
                guestsStepperLocator = `${guestType}-stepper`
                break;
        }
        return guestsStepperLocator;
    }

    async getActionTypeByGuest(pageName, guestType, count, currentGuestsNum) {
        const up = 'increase';
        const down = 'decrease';
        const guestsTypeList = await this.getGuestsTypeList(pageName);
        const guestsStepperLocator = await this.getGuestsStepperAttValue(pageName, guestType);
        const elementsCount = await getElementsCount(guestsTypeList);
        const actionType = count > currentGuestsNum ? up : down; // Determine the action type based on the count

        for (let i = 0; i < elementsCount - 1; i++) {
            const element = await guestsTypeList.nth(i).locator(`button[data-testid*= "${actionType}"]`);
            const expectedElement = await element.getAttribute('data-testid');
            if (expectedElement.includes(guestsStepperLocator)) {
                return element;
            }
        }
    }

    async guestsSetter(pageName, guests) {
        await this.openGuestsInfo(pageName);
        for (const {type, count} of Object.values(guests)) {
            const currentGuest = await this.getGuestsNumPerType(pageName, type);
            const guestsSetterNum = this.calculateGuestsSetterNum(count, currentGuest.count);
            const actionType = await this.getActionTypeByGuest(pageName, type, count, currentGuest.count);
            await this.setGuests(actionType, guestsSetterNum);
        }
    }

    async setGuests(actionType, guestsSetterNum) {
        numValidationCheck(guestsSetterNum);
        for (let i = 0; i < Math.abs(guestsSetterNum); i++) {
            await actionType.click();
        }
    }

    calculateGuestsSetterNum(desiredCount, currentGuestCount) {
        numValidationCheck(desiredCount);
        if (currentGuestCount === 0 || currentGuestCount === desiredCount) {
            return desiredCount;
        } else if (desiredCount > currentGuestCount) {
            return desiredCount - currentGuestCount;
        } else if (desiredCount < currentGuestCount) {
            return currentGuestCount - desiredCount;
        }
    }

}