import {getElementByText, getElementsCount} from "../../extensions/uiActions";

export default class GuestsComponent {

    constructor(page) {
        this.page = page;
        this.guestsField = this.page.locator('div[data-testid = "structured-search-input-field-guests-button"]');
        this.guestsPanel = this.page.locator('div[data-testid = "structured-search-input-field-guests-panel"]');
        //
        this.reservationGuestsMainInfo = this.page.locator('div[id="GuestPicker-book_it-trigger"]');
        this.reservationGuestsPanelInfo = this.page.locator('div[aria-labelledby="GuestPicker-book_it-form"]');
    }

    async getGuestsCountElem(){
        return await this.guestsField.locator(' > div > div:last-child');
    }

    async getGuestsTypeList(){
        return await this.guestsPanel.locator(' > div > div');
    }

    async closeGuestsModal(){
        const closeElem = await this.page.locator(getElementByText('button', 'Close'));
        await closeElem.click();
    }

    // TODO - add toggle support (getCurrentState)
    async openGuestsPanel() {
        await this.guestsField.click();
    }

    async getGuestsNumPerType(guestType){
        const list = await this.getGuestsTypeList();
        const guest = await list.locator(`span[data-testid="stepper-${guestType}-value"]`);
        const guestNum = await guest.textContent();
        return {
            guestType,
            count: guestNum
        };
    }

    async getActionTypeByGuest(guestType, count, currentGuestsNum) {
        const guestsTypeList = await this.getGuestsTypeList();
        const elementsCount = await getElementsCount(guestsTypeList);
        const actionType = count > currentGuestsNum ? 'increase' : 'decrease'; // Determine the action type based on the count

        for (let i = 0; i < elementsCount - 1; i++) {
            const element = await guestsTypeList.nth(i).locator(`button[data-testid*= "${actionType}"]`);
            const expectedElement = await element.getAttribute('data-testid');
            if (expectedElement.includes(`stepper-${guestType}`)) {
                return element;
            }
        }
    }

    async getCurrentGuestsNum(){
        const guestsCountElem = await this.getGuestsCountElem();
        return await guestsCountElem.textContent();
    }

    async setGuests(actionType, guestsSetterNum) {
        for (let i = 0; i < Math.abs(guestsSetterNum); i++) {
            await actionType.click();
        }
    }

    calculateGuestsSetterNum(desiredCount, currentGuestCount) {
        if (isNaN(desiredCount) || desiredCount < 0 || isNaN(currentGuestCount) || currentGuestCount < 0) {
            return "Invalid input";
        }
        if (currentGuestCount === 0 || currentGuestCount === desiredCount) {
            return desiredCount;
        } else if (desiredCount > currentGuestCount) {
            return desiredCount - currentGuestCount;
        } else if (desiredCount < currentGuestCount) {
            return currentGuestCount - desiredCount;
        }
    }

}