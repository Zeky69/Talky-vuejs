import {getRequest, postRequest} from '@/services/axios.service'



export async function login(data) {
    try {
        const req = await postRequest('/auth/login', data, 'login');
        if (req.status === 200) {
            return {error: 0, data: req.data}
        }
        return req.data

    } catch (err) {
        console.log(err);
        return {error: 1, data: "Erreur inconnue"}

    }
}

export async function signup(data) {
    try {
        const req = await postRequest('/auth/signup', data, 'register');
        if (req.status === 200) {
            return {error: 0, data: req.data}
        }
        return req.data

    } catch (err) {
        console.log(err);
        return {error: 1, data: "Erreur inconnue"}

    }
}


export async function checkToken() {
    try {
        const req = await getRequest('/auth/checkToken', 'checkToken');
        if (req.status === 200) {
            return {error: 0, data: req.data}

        }
        return {error: 1, data: req.data}

    } catch (err) {
        console.log(err);
        return {error: 1, data: "Erreur inconnue"}

    }
}