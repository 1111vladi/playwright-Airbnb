import moment from "moment";
import {timeUnits} from "./constants";

export const monthNumberToName = (monthNumber) => {
    return moment(monthNumber, 'MM').format('MMMM');
}

const modifyCurrentDate = (numDays, numMonths, numYears, operation) => {
    const currentDate = moment();
    let modifiedDate;

    if (operation === 'add') {
        modifiedDate = currentDate
            .add(numDays, timeUnits.days)
            .add(numMonths, timeUnits.months)
            .add(numYears, timeUnits.years);
    } else if (operation === 'subtract') {
        modifiedDate = currentDate
            .subtract(numDays, timeUnits.days)
            .subtract(numMonths, timeUnits.months)
            .subtract(numYears, timeUnits.years);
    } else {
        throw new Error('Invalid operation. Please use "add" or "subtract".');
    }

    const months = modifiedDate.format('MM');
    const days = modifiedDate.format('DD');
    const years = modifiedDate.format('YYYY');

    return { years, months, days };
};

export const modifyDateByOperation = (numDays, numMonths, numYears, operation) => {
    return modifyCurrentDate(numDays, numMonths, numYears, operation);
};



