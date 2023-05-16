import { RESET_ORDER, SET_ORDER } from "../actions/order";



const initialState = {
    order: null
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SET_ORDER: {
            return {
              ...state,
              order: action.order,
            };
        }
        case RESET_ORDER: {
            return {
              ...state,
              order: null,
            };
        }

        default: {
            return state;
        }
    }
}