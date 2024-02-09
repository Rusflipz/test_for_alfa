import {createSlice} from '@reduxjs/toolkit';

import {TInitialState} from "../types/types";

export const initialState: TInitialState = {
    cardsLoading: false,
    cardsError: false,
    array: [],
    isFiltered: false,
}


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        fetchCards: (state) => {
            state.cardsLoading = true
        },
        fetchCardsSuccess: (state, {payload}) => {
            state.array = payload
            state.cardsLoading = false
            state.cardsError = false
        },
        fetchCardsFail: (state) => {
            state.cardsLoading = false
            state.cardsError = true
        },
        setFilter: (state) => {
            state.isFiltered = !state.isFiltered
        },
    }
})

export const {
    fetchCards,
    fetchCardsSuccess,
    fetchCardsFail,
    setFilter,
} = dataSlice.actions

export const dataSelector = (state: { data: TInitialState }) => state.data

export default dataSlice.reducer