import { combineReducers } from 'redux';
import { ingredientReducer } from './burger-constructor';

export const rootReducer = combineReducers({
    ingredients: ingredientReducer
});