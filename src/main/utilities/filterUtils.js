import {flatten, sortBy} from "lodash";

export const getHighestRatedRoomObj = (list) => {
    const flattenedArray = flatten(list);
    const sortedArray = sortBy(flattenedArray, obj => -parseFloat(obj.rating));
    const highestRated = sortedArray[0];
    const { pageIndex, roomIndex } = getHighestRatedPosition(list, highestRated);

    console.log(`The highest rated stay is "${highestRated.roomName}" with rating ${highestRated.rating} at position [${pageIndex}][${roomIndex}]`);

    return {
        id: highestRated.id,
        roomName: highestRated.roomName,
        subtitle: highestRated.subtitle,
        roomRating: highestRated.rating,
        pageIndex
    };
};

const getHighestRatedPosition = (list, highestRated) => {
    let pageIndex = 0;
    let roomIndex = 0;
    let found = false;

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].length; j++) {
            if (list[i][j] === highestRated) {
                pageIndex = i;
                roomIndex = j;
                found = true;
                break;
            }
        }
        if (found) break;
    }

    return { pageIndex, roomIndex };
}
