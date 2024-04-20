import moment from "moment";

export const monthNumberToName = (monthNumber) => {
    return moment(monthNumber, 'MM').format('MMMM');
}

const modifyCurrentDate = (numDays, numMonths, numYears, operation) => {
    const currentDate = moment();
    let modifiedDate;

    if (operation === 'add') {
        modifiedDate = currentDate
            .add(numDays, 'days')
            .add(numMonths, 'months')
            .add(numYears, 'years');
    } else if (operation === 'subtract') {
        modifiedDate = currentDate
            .subtract(numDays, 'days')
            .subtract(numMonths, 'months')
            .subtract(numYears, 'years');
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



