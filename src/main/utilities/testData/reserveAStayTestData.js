import {modifyDateByOperation} from "../momentUtils";
const checkInDate = modifyDateByOperation(1, 0, 0, 'add');
const checkOutDate = modifyDateByOperation(3, 0, 0, 'add');
const updatedCheckInDate = modifyDateByOperation(1, 0, 0, 'add');
const updatedCheckOutDate = modifyDateByOperation(4, 0, 0, 'add');
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
        day: updatedCheckInDate.days,
        month: updatedCheckInDate.months,
        year: updatedCheckInDate.years,
    },
    checkOutDate: {
        day: updatedCheckOutDate.days,
        month: updatedCheckOutDate.months,
        year: updatedCheckOutDate.years,
    }
}
