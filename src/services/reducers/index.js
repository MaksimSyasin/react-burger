import { combineReducers } from 'redux';
import { ingredientReducer, ingredients } from './ingredients';
import { orderReducer } from './order';
import { modalReducer } from './modal';


export const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    order: orderReducer,
    modal : modalReducer
});