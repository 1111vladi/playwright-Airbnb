import {getElementAttributeFromList} from "../../../extensions/uiActions";
import {pagesNameList} from "../../../utilities/constants";

export default class DatePickerComponent {

    constructor(page) {
        this.page = page;
        // Main Page
        this.mainPageDatePickerContainer = this.page.locator('div[data-testid="structured-search-input-field-dates-panel"]');
        this.mainPageCheckInDate = this.page.locator('div[data-testid="structured-search-input-field-split-dates-0"]');
        this.mainPageCheckOutDate = this.page.locator('div[data-testid="structured-search-input-field-split-dates-1"]');
        // ListingPage
        this.listingPageDatePickerContainer = this.page.locator('div[data-testid="bookit-sidebar-availability-calendar"]');
        this.listingPageCheckInDate = this.page.locator('div[data-testid="change-dates-checkIn"]');
        this.listingPageCheckOutDate = this.page.locator('div[data-testid="change-dates-checkOut"]');
        this.listingPageCloseModal = this.page.locator('button[data-testid="availability-calendar-save"]');
    }

    async datePicker(pageName, checkinOptions, checkoutOptions) {
        // Check in
        await this.selectDate(pageName, checkinOptions);
        // Check out
        await this.selectDate(pageName, checkoutOptions);
    }

    getDatePickerElementsByPage(pageName) {
        const datePickerElements = {
            [pagesNameList.mainPage]: {
                containerLocator: this.mainPageDatePickerContainer,
                closeModalButton: '' // Add the correct close modal button here
            },
            [pagesNameList.listingPage]: {
                containerLocator: this.listingPageDatePickerContainer,
                closeModalButton: this.listingPageCloseModal
            },
            'default': {
                containerLocator: '',
                closeModalButton: ''
            }
        };

        return datePickerElements[pageName] || datePickerElements['default'];
    }


    async closeDatePickerModal(pageName) {
        const {closeModalButton} = this.getDatePickerElementsByPage(pageName);
        await closeModalButton.click();
    }

    async openDatePickerModal() {
        await this.listingPageCheckInDate.click();
    }

    async getDaysList(pageName, month, year) {
        const {containerLocator} = this.getDatePickerElementsByPage(pageName);
        return containerLocator.locator(`div[data-testid^="calendar-day-${month}"][data-testid$="${year}"][data-is-day-blocked="false"]`);
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
}