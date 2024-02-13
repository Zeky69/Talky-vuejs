import axios from 'axios'
import {API_URL} from "@/variable";


const baseURL = API_URL;

const axiosAgent = axios.create({
    baseURL: baseURL,
    timeout: 10000,
});



function handleError(serviceName, err) {
    if (err.response) {
        console.log("ERROR while calling SERVICE " + serviceName + ": " + JSON.stringify(err.response));

        return {
            data: {
                error: 1,
                data: err.response.data
            }
        };
    }
    else if (err.request) {
        console.log("NETWORK ERROR while calling SERVICE "+serviceName+ ": " + JSON.stringify(err.request));
        return {
            data: {
                error: 1,
                data: 'Le serveur est injoignable ou l\'URL demandée n\'existe pas'
            }
        };
    }
    else {
        console.log("UNKNOWN ERROR while calling SERVICE "+serviceName);
        return {
            data: {
                error: 1,
                data: 'Erreur inconnue'
            }
        };
    }
}

async function getRequest(uri, name) {
    let response = null
    try {
        response = await axiosAgent.get(uri)
    } catch (err) {
        response = handleError(name, err);
    }
    return response;
}


async function postRequest(uri, data, name) {
    let response = null
    try {
        response = await axiosAgent.post(uri, data)
    } catch (err) {
        response = handleError(name, err);
    }
    return response;
}

async function deleteRequest(uri,data, name) {
    let response = null
    try {
        response = await axiosAgent.delete(uri,data)
    } catch (err) {
        response = handleError(name, err);
    }
    return response.data;
}


async function patchRequest(uri, data, name) {
    let response = null
    try {
        response = await axiosAgent.patch(uri, data)
    } catch (err) {

        response = handleError(name, err);
    }
    return response.data;
}


async function putRequest(uri, data, name){
    let response = null
    try {
        response = await axiosAgent.put(uri, data)
    } catch (err) {
        response = handleError(name, err);
    }
    return response.data;
}

async function postFileRequest(uri, data, name) {
    let response = null
    try {
        response = await axiosAgent.post(uri, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (err) {
        response = handleError(name, err);
    }
    return response.data;
}



export {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
    putRequest,
    postFileRequest,
    baseURL,
    axiosAgent
}

