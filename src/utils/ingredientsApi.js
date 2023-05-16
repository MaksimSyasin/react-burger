export const stellarUrl = 'https://norma.nomoreparties.space/api';

const _checkResponse = (res) => {
    if (res.ok) return res.json();
    else return Promise.reject(res.status);
};

export const resetPassword = (email) => {
    return fetchWithRefresh(`${stellarUrl}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email }),
    });
}

export const changePassword = (password, token) => {
    return fetchWithRefresh(`${stellarUrl}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "password": password,
            "token": token
        }),
    });
}

export const registerUser = (email, password, userName) => {
    return fetchWithRefresh(`https://norma.nomoreparties.space/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: userName
        }),
    });
}

export const login = (email, password) => {
    return fetchWithRefresh(`${stellarUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
        }),
    });
}

export const getUser = (token) => {
    return fetchWithRefresh(`${stellarUrl}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: token
        },
    });
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
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: token
        },
        body: JSON.stringify(updateInfo)
    };
    
    return fetchWithRefresh(`${stellarUrl}/auth/user`, options);
};

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

export const fetchWithRefresh = (url, options) => {
    return fetch(url, options).then(response => {
        if (response.ok) {
            return response;
        } else {
            if (response.status === 401) {
                return refreshToken().then(newToken => {
                    options.headers.authorization = newToken;
                    return fetch(url, options);
                });
            } else {
                throw new Error(`Request failed with status ${response.status}`);
            }
        }
    }).then(_checkResponse);
};