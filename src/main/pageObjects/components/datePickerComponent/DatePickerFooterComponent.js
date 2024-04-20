import {getElementTextFromList} from "../../../extensions/uiActions";

export default class DatePickerFooterComponent {

    constructor(page){
        this.page = page;
        this.footerDateList = this.page.locator('div[id = "micro-flex-chips"] > div > label');

    }

    async dateFooterPicker(footerDateOption){
        const destinationOption = await getElementTextFromList(this.footerDateList, footerDateOption);
        await destinationOption.click();
    }


}