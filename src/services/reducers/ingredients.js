
import {
    GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT_IN_CONSTRUCTOR,
    REMOVE_INGREDINT_IN_CONSTRUCTOR,
    RESET_INGREDIENTS_IN_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
} from '../actions/ingredients'


const initialState = {
    ingredients: [],
    bun: null,

    ingredientsRequest: false,
    ingredientsFailed: false,

    ingredientsInConstructor: null,
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
                let arrayNewIngredients = []
                if (!state.ingredientsInConstructor) {
                    arrayNewIngredients = [draggedIngredient]
                } else {
                    arrayNewIngredients = [...state.ingredientsInConstructor, draggedIngredient];
                }

                return { ...state, ingredientsInConstructor: arrayNewIngredients, };
            }
        }

        case REMOVE_INGREDINT_IN_CONSTRUCTOR: {
            const newItems = state.ingredientsInConstructor.filter((item, index) => index !== action.index);
            return { ...state, ingredientsInConstructor: newItems };
        }

        case RESET_INGREDIENTS_IN_CONSTRUCTOR: {
            return{
                ...state,
                bun: false,
                ingredientsInConstructor: false
            }
        }

        case MOVE_INGREDIENT_IN_CONSTRUCTOR: {
            const { dragIndex, hoverIndex } = action.payload;
            const newIngredients = [...state.ingredientsInConstructor];
            const [draggedItem] = newIngredients.splice(dragIndex, 1);
            newIngredients.splice(hoverIndex, 0, draggedItem);
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

