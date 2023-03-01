import { Dispatch } from "redux";
import { checkResponse, config } from "../utils/constants";
import { Icard } from "../utils/Interface";
import { fetchCards, fetchCardsFail, fetchCardsSuccess } from "./slice/data";

export const getCards = () => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchCards())
        try {
            const response = await fetch(`${config.baseUrl}10`, {
                headers: config.headers
            })
            const data = await checkResponse(response)
            if (data) {
                //Это костыль, связанный с апи, обычно приходит ключ значение likes в котроый записан массив с id пользователей, которые нажали Like, соответсвенно, при изменении отправляется POST или PATCH запрос, а в ответ прилетает обновленый обеьект с сервера
                const newArray = data.map((obj: Icard) => ({ ...obj, isLike: false }))
                dispatch(fetchCardsSuccess(newArray))
            }
        } catch (err) {
            console.log(err)
            dispatch(fetchCardsFail())
        }
    }
}

export const getNewCard = (array: Array<Icard>) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await fetch(`${config.baseUrl}1`, {
                headers: config.headers
            })
            const data = await checkResponse(response)
            //Это костыль, связанный с апи, обычно приходит ключ значение likes в котроый записан массив с id пользователей, которые нажали Like, соответсвенно, при изменении отправляется POST или PATCH запрос, а в ответ прилетает обновленый обеьект с сервера
            const newArray = array.map((obj: Icard) => ({ ...obj }))
            data.isLike = false;
            newArray.unshift(data);
            dispatch(fetchCardsSuccess(newArray))
        } catch (err) {
            console.log(err)
            dispatch(fetchCardsFail())
        }
    }
}

//Костыль котрый имитирует буд-то бы сервер прислал новый массив после нажатия like.
//Чтобы не рендерить много раз бывает делают, чтобы изменялся визуал со стороны клиента, и отправлялся запрос на сервер, но массив не переписывается, чтобы заново все не перерисовывать, а новый массив приходит толко после перезагрузки страницы 
//Тоже самое с удалением

export const likeCard = (newArray1: Icard) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchCardsSuccess(newArray1))
    }
}

export const deleteCard = (newArray1: Icard) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchCardsSuccess(newArray1))
    }
}