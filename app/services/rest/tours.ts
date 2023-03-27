import {ITours} from "../../models/tours/tour";


export function getTours(): Promise<ITours[]> {
    return fetch('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/')
        .then((response) => response.json())
        .then((data: ITours[]) => {
            return data;
        })
        .catch((error)=>{
            console.log(error);
            return [];
        });
}



