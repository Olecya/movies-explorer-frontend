export const BASE_URL = 'https://olecyadiploma.nomoredomains.monster';
// export const BASE_URL = 'http://localhost:3001';

export const register = (email, password, name) => {
    console.log(email, password, name);
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email, name })
    })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((response => response.json()))
        .catch(err => console.log(err))
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(res => res.json())
        // .then(console.log('!!!!!!!!!!!!'))
        .catch(err => console.log(err))
}