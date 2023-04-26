import { ADD_INGREDIENT_IN_MODAL, RESET_INGREDIENT_IN_MODAL } from "../actions/modal";



const initialState = {
    ingredientModalActive: null,
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_IN_MODAL: {
            return {
                ...state,
                ingredientModalActive: action.item
            }
        }

        case RESET_INGREDIENT_IN_MODAL: {
            return {
                ...state,
                ingredientModalActive: {}
            }
        }
        
        default: {
            return state;
        }
    }
}