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

export {
    getImage,
    uploadImage,
    deleteImage
}
