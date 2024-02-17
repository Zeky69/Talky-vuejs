import {baseURL, postFileRequest, deleteRequest} from "@/services/axios.service";

function getImage(filename) {
    return baseURL + '/image/' + filename
}

async function uploadImage(file) {
    let formData = new FormData();
    formData.append('file', file);
    return await postFileRequest('/image', formData, 'UPLOADIMAGE')
}

async function deleteImage(filename) {
    return await deleteRequest('/image/' + filename, 'DELETEIMAGE')
}

async function uploadAvatar(file) {
    try {
        const req = await postFileRequest('/image', file, 'UPLOADAVATAR');
        if (req.status === 200) {
            return {error: 0, data: req.data}
        }
        return req.data

    }
    catch (err) {
        console.log(err);
        return {error: 1, data: "Erreur inconnue"}
    }

}



export {
    getImage,
    uploadImage,
    deleteImage,
    uploadAvatar
}
