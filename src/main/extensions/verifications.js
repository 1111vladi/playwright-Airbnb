import {expect} from "@playwright/test";
import {getElementsCount} from "./uiActions";

export const verifyMultipleElementsVisible = async(elements) => {
    const elementsCount = await getElementsCount(elements);
    for (let i = 0; i < elementsCount - 2; i++) {
        const element = await elements.nth(i);
        await expect(element).toBeVisible();
    }
}

// TODO - modify
export const verifyExistenceElement = async(toExist, element) => {
    if (toExist) {
        await expect(await element.count()).toBeGreaterThan(0);
    } else {
        await expect(await element.count()).toBe(0);
    }
}

