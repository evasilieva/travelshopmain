import '@styles/main.scss';
import '@styles/tickets.scss';
import {IPostTicketData, IVipTicket, TicketType} from "../../models/tickets/tickets";
import {getTicketByTourId, getTicketsById, postTicketData} from "@rest/tickets";
import {initFooterTitle, initHeaderTitle} from "@services/general/general";
import {query_params} from "@services/query_params/query_params";
import {initTicketElementTemplate} from "../../templates/ticketInfo";
import {IUser} from "../../models/users/users";
import {openModal} from "@services/modal/modalService";

const clientType = "custom";

//инициализация приложения (отрисовка страницы tickets)
function initApp(): void {
    //получаем id тура из get запроса
    const tour_id = query_params['tour_id'];

    // получаем данные по билету для тура
    const ticketData: Promise<IVipTicket> = getTicketByTourId<IVipTicket>(tour_id);

    ticketData
        .then((ticketInstance): void => {
            if (!ticketInstance) {
                console.error("no tickets");
                return;
            }
            const ticketName = typeof ticketInstance?.name === "string" ? ticketInstance?.name : '';
            initHeaderTitle(ticketName, 'h2');
            initFooterTitle('Туры по всему миру', 'h2');
            initTicketInfo(ticketInstance);
            registerConfirmButton(ticketInstance);
        });
}

/**
 * Заполняем блок информации о билеты
 * @param ticket
 */
function initTicketInfo(ticket: TicketType): void {
    const targetElement = document.querySelector('.tickets-info');

    const ticketDescription = ticket?.description;
    const ticketOperator = ticket?.tourOperator;

    let vipClientType = clientType;
    if ("vipStatus" in ticket) {
        vipClientType = ticket.vipStatus;
    }

    const ticketElemsArr: [string, string, string] = [ticketDescription, ticketOperator, vipClientType];

    let ticketElemTemplate: string = '';

    ticketElemsArr.forEach((el, i) => {
        ticketElemTemplate += initTicketElementTemplate(el, i);
    });

    targetElement.innerHTML = ticketElemTemplate;
}

/**
 * Получаем данные пользователя из формы
 */
function getUserDataFromForm(): IUser {
    const userInfoInputs = document.querySelectorAll('.users-info > p > label');

    const userInfoObj: IUser = {
        name: "",
        cardNumber: '',
        birthDate: new Date()
    };
    userInfoInputs.forEach((el) => {
        const inputDataName = el.getAttribute('data-name');
        if (inputDataName) {
            const inputElems = el.querySelector('input');
            userInfoObj[inputDataName] = inputElems.value;
        }
    });

    return userInfoObj;
}

function initPostData(ticketInstance: IVipTicket) {
    const userData: IUser = getUserDataFromForm();
    const ticketPostData: IPostTicketData = {
        ticket: ticketInstance,
        user: userData
    }
    postTicketData(ticketPostData)
        .then((data) => {
            if (data.success) {
                openModal('ticketOK', null);
            } else {
                openModal('ticketError', null);
            }
        })
        .catch(() => {
            console.error("some error on send tickets data")
        })
}

/**
 * Регистрируем обработчик клика по кнопке "подтвердить"
 * @param ticketInstance
 */
function registerConfirmButton(ticketInstance: IVipTicket): void {
    const targetEl = document.getElementById('accept-order-button');
    if (!targetEl) {
        console.error('no confirm button');
        return;
    }
    targetEl.addEventListener('click', () => {
        initPostData(ticketInstance);
    });

}

// init main  data
initApp();
