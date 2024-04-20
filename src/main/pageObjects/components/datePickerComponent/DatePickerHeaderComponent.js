import {getElementTextFromList} from "../../../extensions/uiActions";

export default class DatePickerHeaderComponent {

    constructor(page){
        this.page = page;
        this.headerOptionsList = this.page.locator('div[id = "tabs"] div[data-testid = "tab-list-wrapper"] div[role = "tablist"] > button');
    }

    async dateHeaderPicker(dateHeader){
        const headerOption = await getElementTextFromList(this.headerOptionsList, dateHeader);
        await headerOption.click();
    }
}