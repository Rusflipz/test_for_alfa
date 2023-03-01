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