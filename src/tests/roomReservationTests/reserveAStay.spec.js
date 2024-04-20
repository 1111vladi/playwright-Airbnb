import {test} from "@playwright/test";
import POManager from "../../main/pageObjects/POManager";
import {data, updatedChildrenCount, updatedDates} from '../../main/utilities/testData/reserveAStayTestData'
import {getNewPageContext} from "../../main/extensions/uiActions";
import {setup, teardown} from "../../main/utilities/commonOps";

let mainPage, searchResultsPage, listingPage, reservationPage;
let page, context, poManager;

test.beforeAll(async ({browser}) => {
    ({page, context} = await setup({browser}));
    poManager = new POManager(page);
    mainPage = poManager.getMainPage();
    searchResultsPage = poManager.getSearchResultsPage();
});

test.beforeEach(async ({}, testInfo) => {
    // if(testInfo.title !== 'Search for a Stay'){
    //     await page.goto('/');
    //     highestRatedRoom = await searchResultsPage.selectHighestRatedRoom();
    // }
});

test.afterAll(async ({browser}) => {
    await teardown({browser});
});

test.describe("Reservation Process @Web", () => {
    test('Search for a Stay', async () => {
        await mainPage.searchForAStay(data);
        await searchResultsPage.verifyRoomResultsVisible();
    });

    test('Select a Listing', async () => {
        const highestRatedRoom = await searchResultsPage.selectHighestRatedRoom();

        // *****
        // Should be a better way for this
        const newPage = await getNewPageContext(context);
        await newPage.waitForLoadState();
        // *****

        poManager = new POManager(newPage);
        listingPage = poManager.getListingPage();
        reservationPage = poManager.getReservationPage();

        await listingPage.verifyRoomIsSelected(highestRatedRoom.subTitle);
        await listingPage.closeTranslatePopup();
    });

    test('Confirm Booking Details', async () => {
        await listingPage.verifyReservationInfo(data);
    });

    test('Adjust and Verify Guest Count', async () => {
        await listingPage.guestsSetter(updatedChildrenCount);
        await listingPage.verifyReservationGuestsCount(2);
    });

    test('Change Booking Dates', async () => {
        // await listingPage.openDatePickerModal();
        // await listingPage.datePicker(updatedDates); // change element
        // await listingPage.verifyDates(updatedDates);
    });

    test('Reserve and Validate', async () => {
        await listingPage.clickReserve();
        await reservationPage.verifyURLGuestsCount(data.guests.adults.type, data.guests.adults.count);
    });
});
