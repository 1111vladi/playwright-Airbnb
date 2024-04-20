import {expect} from "@playwright/test";
import {capitalizer} from "../utilities/stringUtils";

export default class ReservationPage {
    constructor(page) {
        this.page = page;

    }

    async verifyURLGuestsCount(guestType, count) {
        const url = await this.page.url();
        const capitalizedGuest = capitalizer(guestType);
        const numberOfAdultsParam = url.split(`numberOf${capitalizedGuest}=`)[1].split('&')[0];
        expect(parseInt(numberOfAdultsParam)).toBe(count);
    }


}