import {expect} from "@playwright/test";
import ReservationCardComponent from "./components/ReservationCardComponent";
import GuestsComponent from "./components/GuestsComponent";
import DatePickerComponent from "./components/datePickerComponent/DatePickerComponent";
import {pagesNameList} from "../utilities/constants";

export default class ListingPage {
    constructor(page) {
        this.page = page;
        this.roomHeader = this.page.locator('div[data-section-id="TITLE_DEFAULT"]');
        this.translatePopupCloseButton = this.page.locator('div[data-testid = "modal-container"] button[aria-label="Close"]');
        this.reservationCardComponent = new ReservationCardComponent(page);
        this.guestsComponent = new GuestsComponent(page);
        this.datePickerComponent = new DatePickerComponent(page);
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

    async verifyDates(dates){
        const {checkInDate, checkOutDate } = dates
        await this.reservationCardComponent.verifyDates(checkInDate, checkOutDate);
    }

    async verifyReservationInfo(info) {
        await this.reservationCardComponent.verifyReservationInfo(info);
    }

    async verifyReservationGuestsCount(guestsNum) {
        const guestsCountElem = await this.reservationCardComponent.guestsMainInfo.locator('span');
        await expect(guestsCountElem).toHaveText(`${guestsNum} guests`);
    }

    async guestsSetter(guests) {
        await this.reservationCardComponent.openGuestsInfo();
        for (const { type, count } of Object.values(guests)) {
            const currentGuest = await this.reservationCardComponent.getGuestsNumPerType(type);
            let guestsSetterNum = this.guestsComponent.calculateGuestsSetterNum(count, currentGuest.count);
            const actionType = await this.reservationCardComponent.getActionTypeByGuest(type, count, currentGuest.count);
            await this.guestsComponent.setGuests(actionType, guestsSetterNum);
        }
        await this.guestsComponent.closeGuestsModal();
    }

    async clickReserve(){
        await this.reservationCardComponent.reserveButton.click();
    }

    async openDatePickerModal(){
        await this.datePickerComponent.openDatePickerModal();
    }

    async datePicker(checkinOptions, checkoutOptions){
        await this.openDatePickerModal();
        await this.datePickerComponent.datePicker(pagesNameList.listingPage, checkinOptions, checkoutOptions);
    }
}