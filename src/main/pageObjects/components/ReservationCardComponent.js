import {expect} from "@playwright/test";
import GuestsComponent from "./GuestsComponent";
import DatePickerComponent from "./datePickerComponent/DatePickerComponent";
import {getElementsCount} from "../../extensions/uiActions";

export default class ReservationCardComponent {
    constructor(page) {
        this.page = page;
        this.reservationCardContainer = this.page.locator('div[data-section-id="BOOK_IT_SIDEBAR"]');
        this.headerInfo = this.reservationCardContainer.locator('div[data-testid="book-it-default"]');
        this.reserveButton = this.headerInfo.locator('button[data-testid="homes-pdp-cta-btn"]');
        // Date picker component
        this.datePickerComponent = new DatePickerComponent(page);
        // GuestsComponent
        this.guestsComponent = new GuestsComponent(page);
        this.guestsMainInfo = this.guestsComponent.reservationGuestsMainInfo;
        this.guestsPanelInfo = this.guestsComponent.reservationGuestsPanelInfo;

    }

    async getGuestsCountElem(){
        return await this.guestsMainInfo.locator('span');
    }

    async getCurrentGuestsNum(){
        const guestsCountElem = await this.getGuestsCountElem();
        return await guestsCountElem.textContent();
    }

    async getGuestsTypeList(){
        return await this.guestsPanelInfo.locator(' > div > div');
    }

    async getGuestsNumPerType(guestType){
        const list = await this.getGuestsTypeList();
        const guest = await list.locator(`span[data-testid*="${guestType}-stepper-value"]`);
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
            if (expectedElement.includes(`${guestType}-stepper`)) {
                return element;
            }
        }
    }


    async openGuestsInfo(){
        await this.guestsMainInfo.click();
    }

    async clickReserve(){
        await this.reserveButton.click();
    }

    async verifyDates(pageName, checkInDate, checkOutDate) {
        await this.datePickerComponent.verifyDates(pageName, checkInDate, checkOutDate)
    }

    async verifyReservationInfo(pageName, reservationDetails) {
        const {checkInDate, checkOutDate, totalGuestsCount} = reservationDetails;
        await this.verifyDates(pageName, checkInDate, checkOutDate);
        await this.verifyReservationGuestsCount(totalGuestsCount);
    }

    async verifyReservationGuestsCount(guestsNum) {
        const guestsCountElem = await this.guestsMainInfo.locator('span');
        await expect(guestsCountElem).toHaveText(`${guestsNum} guests`);
    }

}