import { combineReducers } from 'redux';

import dataReducer from '../slice/data';


export const rootReducer = combineReducers({
    data: dataReducer,
})