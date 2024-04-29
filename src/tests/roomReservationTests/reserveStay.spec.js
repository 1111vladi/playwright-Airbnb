import {test} from "@playwright/test";
import POManager from "../../main/pageObjects/POManager";
import {data} from '../../main/utilities/testData/reserveAStayTestData'
import {getNewPageContext} from "../../main/extensions/uiActions";
import {startSession} from "../../main/utilities/commonOps";

let mainPage, searchResultsPage, listingPage, reservationPage;
let page, context, poManager;
const { guests } = data;
const { adults } = guests;

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({browser}) => {
    ({page, context} = await startSession({browser}));
    await page.goto('/'); // baseUrl
    poManager = new POManager(page);
    mainPage = poManager.getMainPage();
    searchResultsPage = poManager.getSearchResultsPage();
});

test.describe("Reservation Process @Web", () => {
    test(`Reserve a stay`, {
        tag: '@reserveStay'
    }, async () => {
        await mainPage.searchForAStay(data);
        await searchResultsPage.selectFirstRoom();

        // *****
        // Should be a better way for this
        const newPage = await getNewPageContext(context);
        await newPage.waitForLoadState();
        poManager = new POManager(newPage);
        listingPage = poManager.getListingPage();
        reservationPage = poManager.getReservationPage();
        // *****

        // await listingPage.verifyRoomIsSelected(highestRatedRoom.subTitle);
        await listingPage.closeTranslatePopup();
        await listingPage.verifyReservationInfo(data);
        await listingPage.clickReserve();

        const { type, count } = adults;
        await reservationPage.verifyURLGuestsCount(type, count);
    });

    // test('Select a Listing', {
    //     tag: '@reserveStay'
    // }, async () => {
    //      // highestRatedRoom = await searchResultsPage.selectHighestRatedRoom();
    //      await searchResultsPage.navigateToPageUrl({
    //          destination,
    //          adultsCount: adults.count,
    //          childrenCount: children.count,
    //          checkinDate: checkinDateUrlFormat,
    //          checkoutDate: checkoutDateUrlFormat
    //      });
    //      await page.pause();
    //
    //
    //     //
    //
    // });
    //
    // test('Confirm Booking Details', async () => {
    //     await listingPage.verifyReservationInfo(data);
    // });
    //
    // test('Adjust and Verify Guest Count', async () => {
    //     await listingPage.guestsSetter(updatedChildrenCount);
    //     await listingPage.verifyGuestsCount(2);
    // });
    //
    // test('Change Booking Dates', async () => {
    //     await listingPage.datePicker(updatedDates.checkInDate, updatedDates.checkOutDate);
    // });
    //
    // test('Reserve and Validate', async () => {
    //     const { type, count } = adults;
    //     await reservationPage.verifyURLGuestsCount(type, count);
    // });
});
