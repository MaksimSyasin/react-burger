
import {
    GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT_IN_CONSTRUCTOR,
    REMOVE_INGREDINT_IN_CONSTRUCTOR,
    ADD_ORDER,
    RESET_INGREDIENTS_IN_CONSTRUCTOR,
    ADD_INGREDIENT_IN_MODAL,
    RESET_INGREDIENT_IN_MODAL,
    MOVE_INGREDIENT_IN_CONSTRUCTOR
} from '../actions/burger-constructor'

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    
    ingredientsInConstructor: [],
    bun: {},

    ingredientModalActive: {},
    orders: []
}

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { ...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false };
        }
        case GET_INGREDIENTS_FAILED: {
            return { ...state, ingredientsFailed: true, ingredientsRequest: false };
        }
        case ADD_INGREDIENT_IN_CONSTRUCTOR: {
            const draggedIngredient = state.ingredients.find((ingredient) => ingredient._id === action.ingredientID);
            if (draggedIngredient.type === 'bun') {
                return {
                    ...state, bun: draggedIngredient
                }
            }
            else  {
                const arrayNewIngredients = [...state.ingredientsInConstructor, draggedIngredient];
                return { ...state, ingredientsInConstructor: arrayNewIngredients, };
            }
        }

        case REMOVE_INGREDINT_IN_CONSTRUCTOR: {
            const newItems = state.ingredientsInConstructor.filter((item, index) => index !== action.index);
            return { ...state, ingredientsInConstructor: newItems };
        }

        case ADD_ORDER: {
            const newOrder = [...state.orders, action.order];
            return {
              ...state,
              orders: newOrder,
            };
        }

        case RESET_INGREDIENTS_IN_CONSTRUCTOR: {
            return{
                ...state,
                bun: {},
                ingredientsInConstructor: []
            }
        }

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

        case MOVE_INGREDIENT_IN_CONSTRUCTOR: {
            const { dragIndex, hoverIndex } = action.payload;
            const newIngredients = [...state.ingredientsInConstructor];
      
            // remove the dragged item from the array
            const draggedIngredient = newIngredients.splice(dragIndex, 1)[0];
      
            // insert the dragged item at the new index
            newIngredients.splice(hoverIndex, 0, draggedIngredient);
      
            return {
              ...state,
              ingredientsInConstructor: newIngredients,
            };
          }

        default: {
            return state;
        }
    }
}