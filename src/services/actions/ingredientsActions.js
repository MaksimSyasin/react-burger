export const GET_BURGER_INGREDIENTS = 'GET_BURGER_INGREDIENTS';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_ERROR = 'GET_BURGER_INGREDIENTS_ERROR';
export const INCREASE_INGREDIENT_COUNT = 'UPDATE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';
export const CLEAR_ALL_INGREDIENTS_COUNT = 'CLEAR_ALL_INGREDIENTS_COUNT'

export const addIngredietntsAction = (payload) => ({ type: GET_BURGER_INGREDIENTS, payload });
export const increaseIngredientCountAction = (payload) => ({ type: INCREASE_INGREDIENT_COUNT, payload });
export const decreaseIngredientCountAction = (payload) => ({ type: DECREASE_INGREDIENT_COUNT, payload });
export const getIngredientsSuccessAction = () => ({ type: GET_BURGER_INGREDIENTS_SUCCESS });
export const getIngredientsErrorAction = () => ({ type: GET_BURGER_INGREDIENTS_ERROR });
export const clearIngredientsCount = () => ({type: CLEAR_ALL_INGREDIENTS_COUNT});