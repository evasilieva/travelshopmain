/**
 * Возвращаем заполненный блок шаблона билета
 * @param data
 * @param i
 */
export function initTicketElementTemplate(data: string, i: number): string {
    return `
       <div  data-item-index=${i} class="ticket-block">
           <p>${data}</p>
       </div>
    `;
}
