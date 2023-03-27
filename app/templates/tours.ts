import {ITours} from "../models/tours/tour";

/**
 * Возвращаем заполненный шаблон тура
 * @param obj
 * @param i
 */

export function getTourTemplate(obj: ITours, i:number): string {
    return `
       <div  data-tour-item-index=${i} class="tour-block">
           <h2>${obj.name}</h2>
           <img class='tour-pic' src="/dist/${obj.img}" alt="${obj.name} photo"/>
           <div class="tour-block-description">${obj.description}</div>
           <p class="tour-block-price">${obj.price}</p>
       </div>
    `;
}
