export const stellarUrl = 'https://norma.nomoreparties.space/api';

const _checkResponse = (res) => {
    if (res.ok) return res.json();
    else return Promise.reject(res.status);
};

export const resetPassword = (email) => {
    return fetch(`${stellarUrl}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email }),
    })
        .then(_checkResponse)
}

export const changePassword = (password, token) => {
    return fetch(`${stellarUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "password": password,
            "token": token
        }),
    })
        .then(_checkResponse)
}

export const registerUser = (email, password, userName) => {
    
    return fetch(`https://norma.nomoreparties.space/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: userName
        }),
    }).then(_checkResponse)
}

export const login = (email, password) => {
    return fetch(`${stellarUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        }),
    }).then(_checkResponse)
}

export const getUser = (token) => {
    return fetch(`${stellarUrl}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: token
        },
    }).then(_checkResponse)
}

export const refreshToken = (access, refresh) => {
    return fetch(`${stellarUrl}/auth/token`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json;charset=utf-8',
         authorization: access
        },
        body: JSON.stringify({
         "token": `${refresh}`
        })
       }).then(_checkResponse)
}

export const updateUserApi = (token, updateInfo) => {
    return fetch(`${stellarUrl}/auth/user`, {
        method: 'PATCH',
        headers: {
         'Content-Type': 'application/json;charset=utf-8',
         authorization: token
        },
        body: JSON.stringify(updateInfo)
    }).then(_checkResponse)
}

export const logout = (refresh) => {
    return fetch(`${stellarUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            "token": `${refresh}`
        })
    }).then(_checkResponse)
}