import TopToolBarComponent from "./components/TopToolBarComponent";

export default class MainPage {
    constructor(page) {
        this.page = page;
        this.topToolBarComponent = new TopToolBarComponent(page);
    }

    async datePicker(checkinOptions, checkoutOptions) {
        await this.topToolBarComponent.datePicker(checkinOptions, checkoutOptions);
    }

    async destinationPicker(destination) {
        await this.topToolBarComponent.destinationPicker(destination);
    }

    async clickSearchButton() {
        await this.topToolBarComponent.clickSearchButton();
    }

    async guestsSetter(guests) {
        await this.topToolBarComponent.guestsSetter(guests);
    }

    async searchForAStay(stayDetails) {
        await this.topToolBarComponent.searchForAStay(stayDetails);
    }
}