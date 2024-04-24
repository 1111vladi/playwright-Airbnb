export const numValidationCheck = (num) => {
    if (isNaN(num) || num < 0) {
        return "Invalid input";
    }
}