import {Dispatch} from "redux";

import {fetchCards, fetchCardsFail, fetchCardsSuccess} from "../store/slice/data";
import {TCard} from "../types/Card";

import {checkResponse} from "./checkResponse";
import {config} from "./constants";

export const getCards = () => async (dispatch: Dispatch) => {
    dispatch(fetchCards())
    try {
        const response = await fetch(`${config.baseUrl}10`, {
            headers: config.headers
        })

        const data = await checkResponse(response)

        const formattedArray = data.map((obj: TCard) => ({...obj, isLike: false}))

        dispatch(fetchCardsSuccess(formattedArray))

    } catch (err) {
        dispatch(fetchCardsFail())
        console.error(err)
    }
}

export const getNewCard = (array: Array<TCard>) => async (dispatch: Dispatch) => {
    try {
        const response = await fetch(`${config.baseUrl}1`, {
            headers: config.headers
        })
        const data = await checkResponse(response)

        data.isLike = false;

        const newArray: TCard[] = array.map((obj: TCard): TCard => ({...obj}))

        newArray.unshift(data)

        dispatch(fetchCardsSuccess(newArray))
    } catch (err) {
        dispatch(fetchCardsFail())
        console.log(err)
    }
}
