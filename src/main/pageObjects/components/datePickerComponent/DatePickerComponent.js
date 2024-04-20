import {monthNumberToName} from "../../../utilities/momentUtils";
import {getElementAttributeFromList} from "../../../extensions/uiActions";

export default class DatePickerComponent {

    constructor(page) {
        this.page = page;
        this.checkInDate = this.page.locator('div[data-testid="change-dates-checkIn"]');
        this.checkOutDate = this.page.locator('div[data-testid="change-dates-checkOut"]');
        this.closeModal = this.page.locator('button[data-testid="availability-calendar-save"]');
    }

    async closeDatePickerModal(){
        await this.closeModal.click();
    }

    async openDatePickerModal(){
        await this.checkInDate.click();
    }

    async getDaysList(month, year) {
        const monthName = monthNumberToName(month);
        return this.page.locator(`//div[@aria-label = "Calendar"]//*[text() = "${monthName} ${year}"]/../../../../div/table[@role = "presentation"]/tbody/tr/td/div[@data-is-day-blocked]`);
    }

    async datePicker(checkinOptions, checkoutOptions) {
        const expectedAttValue = 'data-testid';

        // Check in
        const { day: checkinDay, month: checkinMonth, year: checkinYear } = checkinOptions;
        const checkInDaysList = await this.getDaysList(checkinMonth, checkinYear);
        const expectedCheckInDate = `${checkinMonth}/${checkinDay}/${checkinYear}`;
        const availableCheckinDay = await getElementAttributeFromList(checkInDaysList, expectedAttValue, expectedCheckInDate);
        await availableCheckinDay.click();
        // const checkInDaysCount = await checkInDaysList.count();
        // for(let i = 0; i < checkInDaysCount - 1; i++){
        //     const day = await checkInDaysList.nth(i).getAttribute('data-is-day-blocked');
        //     if(day !== 'false'){
        //         const availableCheckinDay = await getElementAttributeFromList(checkInDaysList, expectedAttValue, expectedCheckInDate);
        //         await availableCheckinDay.click();
        //     }
        // }

        // Check out
        const { day: checkoutDay, month: checkoutMonth, year: checkoutYear } = checkoutOptions;
        const checkOutDaysList = await this.getDaysList(checkoutMonth, checkoutYear);
        const expectedCheckOutDate = `${checkoutMonth}/${checkoutDay}/${checkoutYear}`;
        // const checkOutDaysCount = await checkOutDaysList.count();
        // for(let i = 0; i < checkOutDaysCount - 1; i++){
        //     const day = await checkOutDaysList.nth(i).getAttribute('data-is-day-blocked');
        //     if(day !== 'false'){
        //         const availableCheckOutDay = await getElementAttributeFromList(checkOutDaysList, expectedAttValue, expectedCheckOutDate);
        //         await availableCheckOutDay.click();
        //     }
        // }
        const availableCheckOutDay = await getElementAttributeFromList(checkOutDaysList, expectedAttValue, expectedCheckOutDate);
        await availableCheckOutDay.click();

    }
}