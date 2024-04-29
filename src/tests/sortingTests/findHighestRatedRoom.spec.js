import {test} from "@playwright/test";
import POManager from "../../main/pageObjects/POManager";
import {data, updatedChildrenCount, updatedDates} from '../../main/utilities/testData/reserveAStayTestData'
import {getNewPageContext} from "../../main/extensions/uiActions";
import {startSession} from "../../main/utilities/commonOps";

let mainPage, searchResultsPage, listingPage, reservationPage;
let page, context, poManager;
let highestRatedRoom;
const { destination, guests, checkInDate, checkOutDate } = data;
const { adults, children } = guests;
const checkinDateUrlFormat = `${checkInDate.year}-${checkInDate.month}-${checkInDate.day}`
const checkoutDateUrlFormat = `${checkOutDate.year}-${checkOutDate.month}-${checkOutDate.day}`

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({browser}) => {
    ({page, context} = await startSession({browser}));
    poManager = new POManager(page);
    // mainPage = poManager.getMainPage();
    searchResultsPage = poManager.getSearchResultsPage();
    listingPage = poManager.getListingPage();
    await searchResultsPage.navigateToPageUrl({
        destination,
        adultsCount: adults.count,
        childrenCount: children.count,
        checkinDate: checkinDateUrlFormat,
        checkoutDate: checkoutDateUrlFormat
    });
});

// test.beforeEach(async ({}, testInfo) => {
//     await searchResultsPage.navigateToPageUrl({
//         destination,
//         adultsCount: adults.count,
//         childrenCount: children.count,
//         checkinDate: checkinDateUrlFormat,
//         checkoutDate: checkoutDateUrlFormat
//     });
// });

// test.afterEach(async ({}, testInfo) => {
//     // Save test names in a const?
//     // if(testInfo.title === 'Change Booking Dates'){
//     //     await listingPage.clickReserve();
//     // }
// });

test.describe("Find highest rated room @Web", () => {
    test('Verify highest rated room', async () => {
        highestRatedRoom = await searchResultsPage.selectHighestRatedRoom();
        console.log('highestRatedRoom: ', highestRatedRoom);
        await listingPage.navigateToPageUrl({
            roomTitleID: ((highestRatedRoom.id).split('_'))[1],
            destination,
            adultsCount: adults.count,
            childrenCount: children.count,
            checkinDate: checkinDateUrlFormat,
            checkoutDate: checkoutDateUrlFormat
        })
        // await page.pause();

        // // *****
        // // Should be a better way for this
        // const newPage = await getNewPageContext(context);
        // await newPage.waitForLoadState();
        // poManager = new POManager(newPage);
        // listingPage = poManager.getListingPage();
        // reservationPage = poManager.getReservationPage();
        // // *****
        //
        await listingPage.verifyRoomIsSelected(highestRatedRoom.subTitle);
        // await listingPage.closeTranslatePopup();
    });
});
