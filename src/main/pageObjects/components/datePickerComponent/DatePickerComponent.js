import {getElementAttributeFromList} from "../../../extensions/uiActions";
import {pagesNameList} from "../../../utilities/constants";
import {expect} from "@playwright/test";

export default class DatePickerComponent {

    constructor(page) {
        this.page = page;
        // Main Page
        this.mainPageDatePickerContainer = this.page.locator('div[data-testid="structured-search-input-field-dates-panel"]');
        this.mainPageCheckInDate = this.page.locator('div[data-testid="structured-search-input-field-split-dates-0"]');
        this.mainPageCheckOutDate = this.page.locator('div[data-testid="structured-search-input-field-split-dates-1"]');
        // Listing Page
        this.listingPageDatePickerContainer = this.page.locator('div[data-testid="bookit-sidebar-availability-calendar"]');
        this.listingPageCheckInDate = this.page.locator('div[data-testid="change-dates-checkIn"]');
        this.listingPageCheckOutDate = this.page.locator('div[data-testid="change-dates-checkOut"]');
        this.listingPageCloseModal = this.page.locator('button[data-testid="availability-calendar-save"]');
        // Cache
        this.datePickerLocatorsCache = {};
    }

    async datePicker(pageName, checkinOptions, checkoutOptions) {
        // Check in
        await this.selectDate(pageName, checkinOptions);
        // Check out
        await this.selectDate(pageName, checkoutOptions);
    }

    getDatePickerLocatorsByPage(pageName) {
        if (this.datePickerLocatorsCache[pageName]) {
            return this.datePickerLocatorsCache[pageName];
        }

        const datePickerElements = {
            [pagesNameList.mainPage]: {
                container: this.mainPageDatePickerContainer,
                checkInDate: this.mainPageCheckInDate,
                checkOutDate: this.mainPageCheckOutDate,
                closeModalButton: '' // Add the correct close modal button here
            },
            [pagesNameList.listingPage]: {
                container: this.listingPageDatePickerContainer,
                checkInDate: this.listingPageCheckInDate,
                checkOutDate: this.listingPageCheckOutDate,
                closeModalButton: this.listingPageCloseModal
            }
        };

        this.datePickerLocatorsCache[pageName] = datePickerElements[pageName];
        return datePickerElements[pageName];
    }


    async closeDatePickerModal(pageName) {
        const {closeModalButton} = this.getDatePickerLocatorsByPage(pageName);
        await closeModalButton.click();
    }

    async openDatePickerModal() {
        await this.listingPageCheckInDate.click();
    }

    async getDaysList(pageName, month, year) {
        const {container} = this.getDatePickerLocatorsByPage(pageName);
        return container.locator(`div[data-testid^="calendar-day-${month}"][data-testid$="${year}"][data-is-day-blocked="false"]`);
    }

    async selectDate(pageName, options) {
        const {day, month, year} = options;
        const expectedAtt = 'data-testid';
        const daysList = await this.getDaysList(pageName, month, year);
        const expectedDate = `${month}/${day}/${year}`;
        const expectedDayElement = await getElementAttributeFromList(daysList, expectedAtt, expectedDate);
        await this.handleDaySelection(pageName, expectedDayElement);

    };

    async handleDaySelection(pageName, expectedDayElement) {
        const expectedAtt = 'data-is-day-blocked';
        if (expectedDayElement !== 'Element not found') {
            const isDayBlocked = await expectedDayElement.getAttribute(expectedAtt);
            if (isDayBlocked !== 'true') {
                await expectedDayElement.click();
            }
        } else {
            await this.closeDatePickerModal(pageName);
        }
    }

    getModifiedDateFormat(date){
        return `${Math.floor(date.month)}/${Math.floor(date.day)}/${date.year}`
    }

    async verifyCheckInDate(pageName, expectedDate){
        const {checkInDate} = this.getDatePickerLocatorsByPage(pageName);
        const modifiedExpectedDate = this.getModifiedDateFormat(expectedDate);
        await expect(checkInDate).toHaveText(modifiedExpectedDate);
    }

    async verifyCheckOutDate(pageName, expectedDate){
        const {checkOutDate} = this.getDatePickerLocatorsByPage(pageName);
        const modifiedExpectedDate = this.getModifiedDateFormat(expectedDate);
        await expect(checkOutDate).toHaveText(modifiedExpectedDate);
    }

    async verifyDates(pageName, checkInDate, checkOutDate) {
        await this.verifyCheckInDate(pageName, checkInDate);
        await this.verifyCheckOutDate(pageName, checkOutDate);
    }
}