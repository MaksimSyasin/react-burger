import { postOrderApi } from "../../utils/ingredientsApi";
import { getOrderNumberAction, orderErrorAction } from "../actions/orderActions";
import { clearConstructorAction } from "../actions/burgerConstructorActions";
import { clearIngredientsCount } from "../actions/ingredientsActions";

export const orderNumberAsync = (idArray, token) => {
    return function (dispatch) {
        postOrderApi(idArray, token)
            .then((res) => dispatch(getOrderNumberAction(res.order.number)))
            .then(() => {
                dispatch(clearConstructorAction())
                dispatch(clearIngredientsCount())
            })
            .catch(err => {
                dispatch(orderErrorAction(err.message))
                dispatch(getOrderNumberAction(null))
            }
            )
    }
}