import {modifyDateByOperation} from "../momentUtils";
const checkInDate = modifyDateByOperation(1, 0, 0, 'add');
const checkOutDate = modifyDateByOperation(5, 0, 0, 'add');
const myDestination = 'Amsterdam, Netherlands';
const adultCount = 2;
const childrenCount = 1;
const totalGuestsCount = adultCount + childrenCount;

export const data = {
    destination: myDestination,
    checkInDate: {
        day: checkInDate.days,
        month: checkInDate.months,
        year: checkInDate.years,
    },
    checkOutDate: {
        day: checkOutDate.days,
        month: checkOutDate.months,
        year: checkOutDate.years,
    },
    guests: {
        adults: {
            type: 'adults',
            count: adultCount
        },
        children: {
            type: 'children',
            count: childrenCount
        },
    },
    totalGuestsCount
}

export const updatedChildrenCount = {
    children: {
        type: 'children',
        count: 0
    },
}

export const updatedDates = {
    checkInDate: {
        day: checkInDate.days + 7,
        month: checkInDate.months,
        year: checkInDate.years,
    },
    checkOutDate: {
        day: checkOutDate.days + 7,
        month: checkOutDate.months,
        year: checkOutDate.years,
    }
}
