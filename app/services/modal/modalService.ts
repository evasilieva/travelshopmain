
import {ITours} from "../../models/tours/tour";
import {Modal} from "../../classess/modal";
import {toursDataArray} from "@services/tours/registry";

export type ModalType = 'order' | 'ticketOK' | 'ticketError';

export function openModal(type: ModalType, i: number | null) {
    const data: ITours = toursDataArray[i];
    if (i !== null && !data) {
        console.log('no data for id =', i);
        return;
    }
    const tourId = data?.id;

    switch (type) {
        case 'order':
            const modalTemplate = `
            <div class="modal-tour-info">
                <span data-moda-id="tour-modal" class="close-modal">x</span>
                <h2>${data.name}</h2>
                <p>${data.description}</p>
                <div data-tour-id="${tourId}" class="ticket-submit">
                    <a href="/ticket.html?tour_id=${tourId}">Купить билет</a> 
                </div>
            </div>
           `
            const modal = new Modal('tour-modal');
            modal.open(modalTemplate);
            break;
        case 'ticketOK':
            const modalTemplateTicketOk = `
            <span data-moda-id="tour-modal" class="close-modal">x</span>
            <p>
                Билет куплен успешно
            </p>
            `;
            const modalTicketOk = new Modal('tickets-ok-modal');
            modalTicketOk.open(modalTemplateTicketOk);
            break
        case 'ticketError':
            const modalTemplateTicketError = `
            <span data-moda-id="tour-modal" class="close-modal">x</span>
            <p>
               Ошибка при покупке билета
            </p>
            `;
            const modalTicketError = new Modal('tickets-error-modal');
            modalTicketError.open(modalTemplateTicketError);
            break
    }
}
