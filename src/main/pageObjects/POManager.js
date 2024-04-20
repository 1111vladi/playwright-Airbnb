import MainPage from "../pageObjects/MainPage";
import SearchResultsPage from "./SearchResultsPage";
import ListingPage from "./ListingPage";
import ReservationPage from "./ReservationPage";

export default class POManager {
    constructor(page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.searchResultsPage = new SearchResultsPage(page);
        this.listingPage = new ListingPage(page);
        this.reservationPage = new ReservationPage(page);


    }

    getListingPage() {
        return this.listingPage;
    }

    getMainPage() {
        return this.mainPage;
    }

    getSearchResultsPage() {
        return this.searchResultsPage;
    }

    getReservationPage() {
        return this.reservationPage;
    }

}