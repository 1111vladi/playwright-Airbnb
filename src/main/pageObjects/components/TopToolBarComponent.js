import SearchComponent from "./SearchComponent";
import GuestsComponent from "./GuestsComponent";
import DatePickerComponent from "./datePickerComponent/DatePickerComponent";
import {pagesNameList} from "../../utilities/constants";

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

    async guestsSetter(guests) {
        await this.guestsComponent.openGuestsPanel();
        for (const {type, count} of Object.values(guests)) {
            const currentGuest = await this.guestsComponent.getGuestsNumPerType(type);
            let guestsSetterNum = this.guestsComponent.calculateGuestsSetterNum(count, currentGuest.count);
            const actionType = await this.guestsComponent.getActionTypeByGuest(type, count, currentGuest.count);
            await this.guestsComponent.setGuests(actionType, guestsSetterNum);
        }
    }

    async searchForAStay(stayDetails) {
        const {destination, checkInDate, checkOutDate, guests} = stayDetails;
        await this.destinationPicker(destination);
        await this.datePicker(pagesNameList.mainPage, checkInDate, checkOutDate);
        await this.guestsSetter(guests);
        await this.clickSearchButton();
    }
}