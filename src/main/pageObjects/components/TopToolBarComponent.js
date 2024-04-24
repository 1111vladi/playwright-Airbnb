import SearchComponent from "./SearchComponent";
import GuestsComponent from "./GuestsComponent";
import DatePickerComponent from "./datePickerComponent/DatePickerComponent";

export default class TopToolBarComponent {

    constructor(page) {
        this.page = page;
        this.searchComponent = new SearchComponent(page);
        this.guestsComponent = new GuestsComponent(page);
        this.datePickerComponent = new DatePickerComponent(page);
    }

    async datePicker(pageName, checkinOptions, checkoutOptions) {
        await this.datePickerComponent.datePicker(pageName, checkinOptions, checkoutOptions);
    }

    async destinationPicker(destination) {
        await this.searchComponent.destinationPicker(destination);
    }

    async clickSearchButton() {
        await this.searchComponent.clickSearchButton();
    }

    async guestsSetter(pageName, guests) {
        await this.guestsComponent.guestsSetter(pageName, guests);
    }

    async searchForAStay(pageName, stayDetails) {
        const {destination, checkInDate, checkOutDate, guests} = stayDetails;
        await this.destinationPicker(destination);
        await this.datePicker(pageName, checkInDate, checkOutDate);
        await this.guestsSetter(pageName, guests);
        await this.clickSearchButton();
    }
}