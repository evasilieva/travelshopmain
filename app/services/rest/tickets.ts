import {IPostTicketData} from "../../models/tickets/tickets";

/**
 * Получаем информацию по билетам тура по id тура
 * @param id
 */
export function getTicketsById<T>(id: string): Promise<T[]> {
    return fetch('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/ticket')
        .then((response) => response.json())
        .then((ticketsData: T[]) => {
            return ticketsData;
        })
        .catch((error) => {
            console.log(error);
            return [];
        });
}

export function getTicketByTourId<T>(id: string): Promise<T | null> {
    return fetch('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/ticket')
        .then((response) => response.json())
        .then((ticketsData: T[]) => {
            if (ticketsData.length <= 0) {
                return null;
            }
            return ticketsData.pop();
        })
        .catch((error) => {
            console.log(error);
            return null;
        });
}

// запрос на отправку данных - пока не используется
/**
 * Отправляем данные по билету на сервер
 * @param postData
 */
export function postTicketData(postData: IPostTicketData): Promise<{ success: boolean }> {
    return fetch('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/ticket')
        .then((response) => response.json())
        .then((data: { success: boolean }) => {
            return {success: true};
        });
}



