import { authAction, isErrorAction, getUserAction, getTokensAction, logoutAction } from "../actions/auth";
import { registerUser, login, getUser, refreshToken, updateUserApi, logout } from "../../utils/ingredientsApi";

export const registerUserAsync = (email, password, userName) => {
    return function (dispatch) {
        registerUser(email, password, userName)
            .then((res) => {
                dispatch(authAction(res));
            })
            .catch(err => dispatch(isErrorAction(err)))
    }
}

export const authUserAsync = (email, password) => {
    return function (dispatch) {
        login(email, password)
            .then((res) => {
                dispatch(authAction(res));
            })
            .catch(err => dispatch(isErrorAction(err)))
    }
}


export const getUserAsync = (accessToken, refreshUserToken) => {
    return function (dispatch) {
        getUser(accessToken)
            .then((res) => {
                dispatch(getUserAction(res.user))
                dispatch(getTokensAction({accessToken, refreshUserToken}))
            })
            .catch(err => {
                if (err === 403) {
                    refreshToken(accessToken, refreshUserToken)
                        .then((res) => {
                            const access = res.accessToken;
                            const refresh = res.refreshToken
                            document.cookie = `accessToken=${access}`
                            if (res.refreshToken) {
                                document.cookie = `refreshToken=${refresh}`
                            }
                            
                            getUser(res.accessToken)
                                .then((res) => {
                                    dispatch(getUserAction(res.user))
                                    dispatch(getTokensAction({access, refresh}))
                                } )
                                .catch(err => dispatch(isErrorAction(err)))
                        })
                        .catch((err) => dispatch(isErrorAction(err)))
                } else dispatch(isErrorAction(err))
            })
    }
}

export const updateUserAsync = (accessToken, changesInfo) => {
    return function (dispatch) {
        updateUserApi(accessToken, changesInfo)
        .then(res => dispatch(getUserAction(res.user)))
        .catch(err => console.log(err))
    }
}

export const logoutUserAsync = (token) => {
    return function (dispatch) {
        logout(token)
        .then(res => dispatch(logoutAction()))
    }
}