import {expect} from "@playwright/test";
import ReservationCardComponent from "./components/ReservationCardComponent";
import {pagesNameList} from "../utilities/constants";

export default class ListingPage {
    constructor(page) {
        this.page = page;
        this.reservationCardComponent = new ReservationCardComponent(page);
        this.roomHeader = this.page.locator('div[data-section-id="TITLE_DEFAULT"]');
        this.translatePopupCloseButton = this.page.locator('div[data-testid = "modal-container"] button[aria-label="Close"]');
    }

    // TODO - not always the same subtitle
    async verifyRoomIsSelected(roomHeader) {
        const roomSubTitleElem = await this.roomHeader.locator('h1')
        await expect(roomSubTitleElem).toHaveText(roomHeader);
    }

    async closeTranslatePopup() {
        try {
            await this.translatePopupCloseButton.click({ timeout: 2000 });
        } catch (error) {
            console.warn(`Element ${this.translatePopupCloseButton} was not found`);
        }
    }

    async verifyReservationInfo(reservationDetails) {
        await this.reservationCardComponent.verifyReservationInfo(pagesNameList.listingPage, reservationDetails);
    }

    async verifyGuestsCount(guestsNum) {
        await this.reservationCardComponent.verifyGuestsCount(pagesNameList.listingPage, guestsNum);
    }

    async guestsSetter(guests) {
        await this.reservationCardComponent.guestsSetter(pagesNameList.listingPage, guests)
    }

    async clickReserve(){
        await this.reservationCardComponent.clickReserve();
    }

    async datePicker(checkinOptions, checkoutOptions){
        await this.reservationCardComponent.datePicker(pagesNameList.listingPage, checkinOptions, checkoutOptions);
    }
}