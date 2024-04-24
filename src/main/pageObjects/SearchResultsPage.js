import NavigationComponent from "./components/NavigationComponent";
import CardComponent from "./components/CardComponent";
import {getHighestRatedRoomObj} from "../utilities/filterUtils";
import {waitForAll} from "../extensions/uiActions";
import {verifyMultipleElementsVisible} from "../extensions/verifications";

const maxRoomRating = '5.0';

export default class SearchResultsPage {
    constructor(page) {
        this.page = page;
        this.navigationComponent = new NavigationComponent(page);
        this.cardComponent = new CardComponent(page);
        this.cardList = this.cardComponent.getCardList();
        this.cardNameList = this.cardComponent.getCardNameList();
        this.cardRatingList = this.cardComponent.getCardRatingList();
        this.cardSubtitleList = this.cardComponent.getCardSubtitleList();
    }

    async navigateNextPage() {
        await this.navigationComponent.navigateNextPage();
    }

    async getPagesCount() {
        return await this.navigationComponent.getPagesCount();
    }


    async selectHighestRatedRoom() {
        // await allure.step("Select the highest rated room", async () => {
            const roomResults = await this.getAllPagesRoomResults();
            if (roomResults.status === 'success' && roomResults.rating === maxRoomRating) {
                return roomResults;
            }
            const highestRatedRoomObj = getHighestRatedRoomObj(roomResults.allPagesRoomResults);
            const roomId = highestRatedRoomObj.id;
            const goBackCount = roomResults.currentPagesCount - 1 - highestRatedRoomObj.pageIndex;
            for (let i = 0; i < goBackCount; i++) {
                await this.page.goBack();
            }
            const highestRatedRoom = await this.page.locator(`#${roomId}`);
            await highestRatedRoom.click({force: true});
        // });

    }

    async getCurrentPageRoomResults() {
        const currentRoomResults = [];
        for (let i = 0; i < await this.cardRatingList.count() - 1; i++) {
            const roomRatingLocator = this.cardRatingList.nth(i).locator('span[aria-hidden="true"]');
            const roomRatingTextList = await roomRatingLocator.count() > 0 ? await roomRatingLocator.textContent() : 'none';
            // TODO - should move to cardComponent getCardInfo()
            const roomNameTextList = await this.cardNameList.allTextContents();
            const roomSubtitleTextList = await this.cardSubtitleList.allTextContents();
            const roomIDList = await this.cardNameList.nth(i).getAttribute('id');
            const actualRating = (roomRatingTextList.split(' '))[0];
            // Remove if wanting to iterate over all pages regardless
            if (actualRating === maxRoomRating) {
                await (await this.page.locator(`#${roomIDList}`)).click({force: true});
                return {
                    id: roomIDList,
                    status: 'success',
                    roomName: roomNameTextList[i],
                    subTitle: roomSubtitleTextList[i],
                    rating: actualRating
                };
            }
            currentRoomResults.push({
                id: roomIDList,
                roomName: roomNameTextList[i],
                subTitle: roomSubtitleTextList[i],
                rating: actualRating
            });
        }
        return currentRoomResults;
    }

    async getAllPagesRoomResults() {
        const currentPagesCount = await this.getPagesCount();
        const allPagesRoomResults = [];
        let results = [];

        for (let i = 0; i < currentPagesCount; i++) {
            if (i !== 0) {
                await this.navigateNextPage();
            }

            await waitForAll(await this.cardList.count(), this.cardNameList);

            results = await this.getCurrentPageRoomResults();
            if (results.status === 'success' && results.rating === maxRoomRating) {
                console.log('Highest rated room: ', results);
                return results;
            }
            allPagesRoomResults.push(results);
            results = [];
        }

        return {allPagesRoomResults, currentPagesCount};
    }

    async verifyRoomResultsVisible(){
        await verifyMultipleElementsVisible(this.cardList);
    }
}