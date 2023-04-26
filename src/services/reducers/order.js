import { ADD_ORDER } from "../actions/order";



const initialState = {
    orders: null
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case ADD_ORDER: {
            let newOrder = [ ];

            if (!state.orders) {
                newOrder = [action.order]
            } else {
                newOrder = [...state.orders, action.order]
            }

            return {
              ...state,
              orders: newOrder,
            };
        }

        default: {
            return state;
        }
    }
}