import {expect} from "@playwright/test";
import {capitalizer} from "../utilities/stringUtils";

export default class ReservationPage {
    constructor(page) {
        this.page = page;
        this.confirmAndPay = this.page.locator('div[data-section-id="DESKTOP_TITLE"]');

    }

    async verifyURLGuestsCount(guestType, count) {
        await this.confirmAndPay.waitFor();
        const url = await this.page.url();
        const capitalizedGuest = capitalizer(guestType);
        const numberOfAdultsParam = url.split(`numberOf${capitalizedGuest}=`)[1].split('&')[0];
        expect(parseInt(numberOfAdultsParam)).toBe(count);
    }


}