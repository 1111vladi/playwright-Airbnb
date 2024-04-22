export const getElementAttributeFromList = async (elements, attName, expectedValue) => {
    let returnElem = 'Element not found';
    const elementsCount = await getElementsCount(elements);
    for (let i = 0; i < elementsCount; i++) {
        const element = await elements.nth(i);
        const expectedElement = await element.getAttribute(attName);
        if (expectedElement.includes(expectedValue)) {
            return element;
        }
    }
    return returnElem;
};


export const getElementTextFromList = async(elements, expectedValue) => {
    const elementsCount = await getElementsCount(elements);
    for (let i = 0; i < elementsCount - 1; i++) {
        const element = await elements.nth(i);
        const expectedElement = await element.textContent();
        if (expectedElement.includes(expectedValue)) {
            return element;
        }
    }
}

export const waitForAll = async(iterations, elementsToWaitFor) => {
    await elementsToWaitFor.first().waitFor();
    for (let i = 0; i < iterations - 1; i++) {
        await elementsToWaitFor.nth(i).waitFor();
    }
}

export const getElementsCount = async(elements) => {
    await elements.first().waitFor();
    return await elements.count();
}

// Would be better to go with a loop over and check the page title
export const getNewPageContext = async(context) => {
    const pagePromise = context.waitForEvent('page');
    return await pagePromise;
}

export const getElementByText = (tagName, text) => {
    return `//${tagName}[text()="${text}"]`;
}