import TopToolBarComponent from "./components/TopToolBarComponent";
import {pagesNameList} from "../utilities/constants";

export default class MainPage {
    constructor(page) {
        this.page = page;
        this.topToolBarComponent = new TopToolBarComponent(page);
    }

    async datePicker(pageName = pagesNameList.mainPage, checkinOptions, checkoutOptions) {
        await this.topToolBarComponent.datePicker(pageName, { checkinOptions, checkoutOptions });
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