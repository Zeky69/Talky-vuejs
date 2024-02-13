import {getRequest, postRequest} from '@/services/axios.service'



export async function login(data) {
    return postRequest('/auth/login', data, 'login');
}

export async function register(data) {
    return postRequest('/auth/register', data, 'register');
}


export async function checkToken() {
    return getRequest('/auth/checkToken', 'checkToken');
}