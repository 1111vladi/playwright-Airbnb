import {test} from "@playwright/test";
import POManager from "../../main/pageObjects/POManager";
import {data, updatedChildrenCount, updatedDates} from '../../main/utilities/testData/reserveAStayTestData'
import {startSession} from "../../main/utilities/commonOps";

let mainPage, searchResultsPage, listingPage;
let page, context, poManager, roomID;
const { destination, guests, checkInDate, checkOutDate } = data;
const { adults, children } = guests;
const checkinDateUrlFormat = `${checkInDate.year}-${checkInDate.month}-${checkInDate.day}`
const checkoutDateUrlFormat = `${checkOutDate.year}-${checkOutDate.month}-${checkOutDate.day}`

test.describe.configure({mode: 'parallel'})

test.beforeAll(async ({browser}) => {
    ({page, context} = await startSession({browser}));
    poManager = new POManager(page);
    mainPage = poManager.getMainPage();
    searchResultsPage = poManager.getSearchResultsPage();
    listingPage = poManager.getListingPage();
    await searchResultsPage.navigateToPageUrl({
        destination: 'Amsterdam Netherlands',
        adultsCount: adults.count,
        childrenCount: children.count,
        checkinDate: checkinDateUrlFormat,
        checkoutDate: checkoutDateUrlFormat
    });
    roomID = await searchResultsPage.getFirstRoomID();
});

test.beforeEach(async () => {
    await listingPage.navigateToPageUrl({
        roomTitleID: roomID,
        destination,
        adultsCount: adults.count,
        childrenCount: children.count,
        checkinDate: checkinDateUrlFormat,
        checkoutDate: checkoutDateUrlFormat
    })
    await listingPage.closeTranslatePopup();
})

test.describe("Reservation info adjustment and verification @Web", {
        tag: '@reservationInfo'
    }, () => {
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
});
