import { createSlice } from '@reduxjs/toolkit';

//Интерфейс для типизирования хранилища
interface CounterState {
    connectionLoading: boolean;
    connectionError: boolean;
    connectionSuccess: boolean;
    dataSuccess: boolean;
    data: Array<any> | null;
    data1: any;
    listOfOrders: Array<any>;
}

//хранилище значений
export const initialState: CounterState = {
    connectionLoading: false,
    connectionError: false,
    connectionSuccess: false,
    dataSuccess: false,
    //Сюда бы записывались данные с back-end
    data: null,
    //Тестовые данные, т.к. нет back-end части
    data1: {
        rateSell: {
            "CHY/RUB": 10.69,
            "EUR/RUB": 78.05,
            "USD/RUB": 72.79,
            "TRY/RUB": 3.87,
            "BYN/RUB": 26.31,
        }, rateBuy: {
            "CHY/RUB": 10.50,
            "EUR/RUB": 74.95,
            "USD/RUB": 72.59,
            "TRY/RUB": 3.67,
            "BYN/RUB": 26.21,
        },
    },
    listOfOrders: []
}

//Методы, котрые можно вызывать через dispatch, для изменения состояния хранилища
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        //Запускает загрузку, использую для анимаций и своевременного отображения контента
        connecting: (state) => {
            state.connectionLoading = true
        },
        //Выключает анимацию загрузки, отрисовывает контент
        connectingSuccess: (state) => {
            state.connectionLoading = false
            state.connectionSuccess = true
        },
        //Записывает данные в хранилище
        getDataSuccess: (state, { payload }) => {
            state.data = payload
            // state.data1 = payload.orders
            state.dataSuccess = true
            state.connectionLoading = false
            state.connectionSuccess = true
        },
        //Записывает данные в хранилище
        getList: (state, { payload }) => {
            state.data = payload
            state.dataSuccess = true
            state.connectionLoading = false
            state.connectionSuccess = true
        },
        //Выводит ошибку
        ConnectingFail: (state) => {
            state.connectionLoading = false
            state.connectionSuccess = false
            state.dataSuccess = false
            state.connectionError = true
        },
        //Добавить запись
        addToList: (state, { payload }) => {
            state.listOfOrders = payload
        },

    }
})


export const {
    connecting, connectingSuccess, getDataSuccess, ConnectingFail, addToList
} = dataSlice.actions

export const dataSelector = (state: { data: any; }) => state.data

export default dataSlice.reducer