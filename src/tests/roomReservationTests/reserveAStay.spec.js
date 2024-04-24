import {test} from "@playwright/test";
import POManager from "../../main/pageObjects/POManager";
import {data, updatedChildrenCount, updatedDates} from '../../main/utilities/testData/reserveAStayTestData'
import {getNewPageContext} from "../../main/extensions/uiActions";
import {setup, teardown} from "../../main/utilities/commonOps";

let mainPage, searchResultsPage, listingPage, reservationPage;
let page, context, poManager;
let highestRatedRoom;
test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({browser}) => {
    ({page, context} = await setup({browser}));
    poManager = new POManager(page);
    mainPage = poManager.getMainPage();
    searchResultsPage = poManager.getSearchResultsPage();
});

// test.beforeEach(async ({}, testInfo) => {
//     // if(testInfo.title !== 'Search for a Stay'){
//     //     await page.goto('/');
//     //     highestRatedRoom = await searchResultsPage.selectHighestRatedRoom();
//     // }
// });

test.afterEach(async ({}, testInfo) => {
    // Save test names in a const?
    if(testInfo.title === 'Change Booking Dates'){
        await listingPage.clickReserve();
    }
});

test.afterAll(async ({browser}) => {
    await teardown({browser});
});

test.describe("Reservation Process @Web", () => {
    test(`Search for a Stay`, async () => {
        await mainPage.searchForAStay(data);
        await searchResultsPage.verifyRoomResultsVisible();
    });

    test('Select a Listing', async () => {
         highestRatedRoom = await searchResultsPage.selectHighestRatedRoom();

        // *****
        // Should be a better way for this
        const newPage = await getNewPageContext(context);
        await newPage.waitForLoadState();
        poManager = new POManager(newPage);
        listingPage = poManager.getListingPage();
        reservationPage = poManager.getReservationPage();
        // *****

        await listingPage.verifyRoomIsSelected(highestRatedRoom.subTitle);
        await listingPage.closeTranslatePopup();
    });

    test('Confirm Booking Details', async () => {
        await listingPage.verifyReservationInfo(data);
    });

    test('Adjust and Verify Guest Count', async () => {
        await listingPage.guestsSetter(updatedChildrenCount);
        await listingPage.verifyGuestsCount(2);
    });

    test('Change Booking Dates', async () => {
        await listingPage.datePicker(updatedDates.checkInDate, updatedDates.checkOutDate);
    });

    test('Reserve and Validate', async () => {
        const { type, count } = data.guests.adults;
        await reservationPage.verifyURLGuestsCount(type, count);
    });
});
