import {BehaviorSubject} from 'rxjs';

import config from '../config';
import {fetchWrapper} from './fetchWrapper';
import {history} from '../helpers/history';

const userSubject = new BehaviorSubject(null);
const baseUrl = `${config.host}/accounts`;

export const accountService = {
    login,
    logout,
    refreshToken,
    register,
    forgotPassword,
    validateResetToken,
    resetPassword,
    update,
    delete: _delete,
    user: userSubject.asObservable(),
    get userValue() {
        return userSubject.value;
    }
};

function login(username, password) {
    return Promise.resolve({
        firstName: 'Kamil',
        lastName: 'Aliev',
        email: 'test@mail.ru',
        jwtToken: generateJwtToken({id: 1})
    })//fetchWrapper.post(`${baseUrl}/login`, {username, password})
        .then((user) => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function logout() {
    // revoke token, stop refresh timer, publish null to user subscribers and redirect to login page
    fetchWrapper.post(`${baseUrl}/logout`, {});
    stopRefreshTokenTimer();
    userSubject.next(null);
    history.push('/account/login');
}

function refreshToken() {
    return fetchWrapper.post(`${baseUrl}/refresh-token`, {})
        .then((user) => {
            // publish user to subscribers and start timer to refresh token
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}

function generateJwtToken(user) {
    // create token that expires in 15 minutes
    const tokenPayload = {
        exp: Math.round(new Date(Date.now() + 15*60*1000).getTime() / 1000),
        id: user.id
    };
    return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
}

function register(params) {
    return Promise.resolve(); //fetchWrapper.post(`${baseUrl}/register`, params);
}

function forgotPassword(email) {
    return fetchWrapper.post(`${baseUrl}/forgot-password`, {email});
}

function validateResetToken(token) {
    return fetchWrapper.post(`${baseUrl}/validate-reset-token`, {token});
}

function resetPassword({token, password, confirmPassword}) {
    return fetchWrapper.post(`${baseUrl}/reset-password`, {token, password, confirmPassword});
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then((user) => {
            // update stored user if the logged in user updated their own record
            if (user.id === userSubject.value.id) {
                // publish updated user to subscribers
                user = {...userSubject.value, ...user};
                userSubject.next(user);
            }
            return user;
        });
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`)
        .then((x) => {
            // auto logout if the logged in user deleted their own record
            if (id === userSubject.value.id) {
                logout();
            }
            return x;
        });
}

let refreshTokenTimeout;

function startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(userSubject.value.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    refreshTokenTimeout = setTimeout(refreshToken, timeout);
}

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}
