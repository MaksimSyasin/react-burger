import { ADD_INGREDIENT_IN_MODAL, RESET_INGREDIENT_IN_MODAL } from "../actions/modal";



const initialState = {
    ingredientDetail: null,
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_IN_MODAL: {
            return {
                ...state,
                ingredientDetail: action.item
            }
        }

        case RESET_INGREDIENT_IN_MODAL: {
            return {
                ...state,
                ingredientDetail: null
            }
        }
        
        default: {
            return state;
        }
    }
}