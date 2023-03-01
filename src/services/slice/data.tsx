import { createSlice } from '@reduxjs/toolkit';
import { Icard } from '../../utils/Interface';

interface CounterState {
    cardsLoading: boolean;
    cardsError: boolean;
    cardsSuccess: boolean;
    array: Array<Icard> | null;
    isFiltered: boolean,
    isFilteredArrayEmpty: boolean,
    isArrayEmpty: boolean,
}

export const initialState: CounterState = {
    cardsLoading: false,
    cardsError: false,
    cardsSuccess: false,
    array: null,
    isFiltered: false,
    isFilteredArrayEmpty: false,
    isArrayEmpty: false,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        fetchCards: (state) => {
            state.cardsLoading = true
        },
        fetchCardsSuccess: (state, { payload }) => {
            state.array = payload
            state.cardsLoading = false
            state.cardsSuccess = true
        },
        fetchCardsFail: (state) => {
            state.cardsLoading = false
            state.cardsSuccess = false
            state.cardsError = true
        },
        setFilter: (state) => {
            state.isFiltered = !state.isFiltered
        },
        setFilterArrayState: (state, { payload }) => {
            state.isFilteredArrayEmpty = payload
        },
        setIsArrayEmpty: (state, { payload }) => {
            state.isArrayEmpty = payload
        },
    }
})


export const {
    fetchCards, fetchCardsSuccess, fetchCardsFail, setFilter, setFilterArrayState, setIsArrayEmpty
} = dataSlice.actions

export const dataSelector = (state: { data: any; }) => state.data

export default dataSlice.reducer