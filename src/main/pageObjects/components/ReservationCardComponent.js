import GuestsComponent from "./GuestsComponent";
import DatePickerComponent from "./datePickerComponent/DatePickerComponent";

export default class ReservationCardComponent {
    constructor(page) {
        this.page = page;
        this.datePickerComponent = new DatePickerComponent(page);
        this.guestsComponent = new GuestsComponent(page);
        this.reservationCardContainer = this.page.locator('div[data-section-id="BOOK_IT_SIDEBAR"]');
        this.headerInfo = this.reservationCardContainer.locator('div[data-testid="book-it-default"]');
        this.reserveButton = this.headerInfo.locator('button[data-testid="homes-pdp-cta-btn"]');
    }

    async guestsSetter(pageName, guests) {
        await this.guestsComponent.guestsSetter(pageName, guests);
        await this.guestsComponent.closeGuestsModal();
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
        await this.verifyGuestsCount(pageName, totalGuestsCount);
    }

    async verifyGuestsCount(pageName, guestsNum) {
        await this.guestsComponent.verifyGuestsCount(pageName, guestsNum);
    }

    async openDatePickerModal() {
        await this.datePickerComponent.openDatePickerModal();
    }

    async datePicker(pageName, checkinOptions, checkoutOptions){
        await this.openDatePickerModal();
        await this.datePickerComponent.datePicker(pageName, checkinOptions, checkoutOptions);
    }

}