
/* Общие методы используются для вставки текста в header   footer*/

/**
 * Заполняем header
 * @param title
 * @param selector
 */
export function initHeaderTitle(title:string, selector:string): void {
    initTopLevelElement('header', title, selector);
}

/**
 * Заполняем footer
 * @param title
 * @param selector
 */
export function initFooterTitle(title:string, selector:string):void {
    initTopLevelElement('footer', title, selector);
}

/**
 * Заполняем footer или header переданными данными
 * @param type
 * @param title
 * @param selector
 */
function initTopLevelElement(type:"footer"|"header", title:string, selector:string):void{
    const headerElement:HTMLElement = document.querySelector(type);
    const targetItem:HTMLElement = headerElement.querySelector(selector);
    if (targetItem) {
        targetItem.innerText = title;
    }
}
