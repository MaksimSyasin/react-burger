export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_INGREDIENT_IN_CONSTRUCTOR = 'ADD_INGREDIENT_IN_CONSTRUCTOR'
export const REMOVE_INGREDINT_IN_CONSTRUCTOR = 'REMOVE_INGREDINT_IN_CONSTRUCTOR'
export const ADD_ORDER = 'ADD_ORDER'
export const RESET_INGREDIENTS_IN_CONSTRUCTOR = 'RESET_INGREDIENTS_IN_CONSTRUCTOR'
export const ADD_INGREDIENT_IN_MODAL = 'ADD_INGREDIENT_IN_MODAL'
export const RESET_INGREDIENT_IN_MODAL = 'RESET_INGREDIENT_IN_MODAL'
export const MOVE_INGREDIENT_IN_CONSTRUCTOR = 'MOVE_INGREDIENT_IN_CONSTRUCTOR'

export function getIngredients() {
  return function(dispatch) {

    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })


    fetch('https://norma.nomoreparties.space/api/ingredients')
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED
                })
            }
        })
        .then(data => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: data.data
            })
        }).catch(err => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
  }
} 


