import {numValidationCheck} from "./numUtils";

export const addLeadingZero = (number) => {
    numValidationCheck(number);
    const integerNumber = Math.floor(number);

    if (integerNumber < 10) {
        return `0${integerNumber}`;
    } else {
        return `${integerNumber}`;
    }
}

export const capitalizer = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

