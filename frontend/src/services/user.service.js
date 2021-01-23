import config from '../config';
import {fetchWrapper} from './fetchWrapper';

const baseUrl = `${config.host}/users`;

export const usersService = {
    getAll,
    getById
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}
