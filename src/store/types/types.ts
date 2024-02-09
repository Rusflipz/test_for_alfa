import {TCard} from "../../types/Card";
import {store} from "../index";

type TStore = typeof store;

export type TDispatch = TStore['dispatch'];

export type TInitialState = {
    cardsLoading: boolean;
    cardsError: boolean;
    array: Array<TCard>;
    isFiltered: boolean,
}