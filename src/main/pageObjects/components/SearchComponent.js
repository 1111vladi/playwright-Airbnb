import {getElementTextFromList} from "../../extensions/uiActions";

export default class SearchComponent {

    constructor(page){
        this.page = page;
        this.searchTabPanel = this.page.locator('div[id="search-tabpanel"]');
        this.searchField = this.page.locator('input[id = "bigsearch-query-location-input"]');
        this.clearSearchFieldButton = this.page.locator('button[aria-label= "Clear Input"]');
        this.searchButton = this.page.locator('button[data-testid = "structured-search-input-search-button"]');
        this.searchResultList = this.page.locator('div[id^= "bigsearch-query-location-suggestion"]');

    }

    async clearSearchField(){
        await this.clearSearchFieldButton.click();
    }

    async clickSearchButton(){
        await this.searchButton.click();
    }

    async fillSearchField(destination){
        await this.searchField.click();
        await this.searchField.fill(destination);
    }

    // TODO - Add support to default options
    async destinationPicker(destination){
        await this.fillSearchField(destination); // Maybe take outside
        const destinationOption = await getElementTextFromList(this.searchResultList, destination);
        await destinationOption.click();
    }
}