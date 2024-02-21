import {getRequest , deleteRequest , postRequest} from "@/services/axios.service";


export async function getFriends() {
    try {
        const req = await getRequest(`/friends`, 'getFriends');
        if(req.status === 200){
            return {error:0 , data: req.data}

        }
        return {error:1 , data: req.data}
    }
    catch (err) {
        console.log(err);
        return {error:1 , data: "Erreur inconnue"}

    }
}



export async function getRequestFriends() {
    try {
        const req = await getRequest(`/friends/request`, 'getRequestFriends');
        if(req.status === 200){
            return {error:0 , data: req.data}

        }
        return {error:1 , data: req.data}
    }
    catch (err) {
        console.log(err);
        return {error:1 , data: "Erreur inconnue"}

    }

}

export async  function getConversations(){
    try {
        const req = await getRequest(`/conversations`, 'getConversations');
        if(req.status === 200){
            return {error:0 , data: req.data}

        }
        return {error:1 , data: req.data}
    }
    catch (err) {
        console.log(err);
        return {error:1 , data: "Erreur inconnue"}

    }
}

export async function getConversation(id) {
    try {
        const req = await getRequest(`/conversations/${id}`, 'getConversation');
        if(req.status === 200){
            return {error:0 , data: req.data}

        }
        return {error:1 , data: req.data}
    }
    catch (err) {
        console.log(err);
        return {error:1 , data: "Erreur inconnue"}

    }
}

export async function createConversation(friends , name) {
    try {
        const req = await postRequest(`/conversations`, {friends , name}, 'createConversation');
        if(req.status === 200){
            return {error:0 , data: req.data}

        }
        return {error:1 , data: req.data}
    }
    catch (err) {
        console.log(err);
        return {error:1 , data: "Erreur inconnue"}

    }
}



export async function acceptFriend(id) {
    try {
        const req = await postRequest(`/friends/accept/${id}`, {}, 'acceptFriend');
        if (req.status === 200) {
            return {error: 0, data: req.data}

        }
        return {error: 1, data: req.data}
    }
    catch (err) {
        console.log(err);
        return {error: 1, data: "Erreur inconnue"}


}
}


export async function blockFriend(id) {
    try {
        const req = await postRequest(`/friends/block/${id}`, {}, 'blockFriend');
        if (req.status === 200) {
            return {error: 0, data: req.data}

        }
        return {error: 1, data: req.data}
    }
    catch (err) {
        console.log(err);
        return {error: 1, data: "Erreur inconnue"}

    }

}


export async function getBlockedFriends() {
    try {
        const req = await getRequest(`/friends/blocked`, 'getBlockedFriends');
        if(req.status === 200){
            return {error:0 , data: req.data}

        }
        return {error:1 , data: req.data}
    }
    catch (err) {
        console.log(err);
        return {error:1 , data: "Erreur inconnue"}

    }
}

export async function addFriend(id) {
    try {
        const req = await postRequest(`/friends/add/${id}`, {}, 'addFriend');
        if (req.status === 200) {
            return {error: 0, data: req.data}

        }
        return {error: 1, data: req.data}
    }
    catch (err) {
        return {error: 1, data: "Erreur inconnue"}

    }
}

export async function deleteFriend(id) {
    try {
        const req = await deleteRequest(`/friends/delete/${id}`, {}, 'deleteFriend');
        if (req.status === 200) {
            return {error: 0, data: req.data}

        }
        return {error: 1, data: req.data}
    }
    catch (err) {
        console.log(err);
        return {error: 1, data: "Erreur inconnue"}

    }
}


export async function getListNotFriendStartLike(username) {
    try {
        const req = await getRequest(`/friends/search/${username}`, 'getListNotFriendStartLike');
        if(req.status === 200){
            return {error:0 , data: req.data}

        }
        return {error:1 , data: req.data}
    }
    catch (err) {
        console.log(err);
        return {error:1 , data: "Erreur inconnue"}

    }
}


export async function removeFriendRequest(id) {
    try {
        const req = await deleteRequest(`/friends/refuse/${id}`, {}, 'removeFriendRequest');
        if (req.status === 200) {
            return {error: 0, data: req.data}

        }
        return {error: 1, data: req.data}
    }
    catch (err) {
        console.log(err);
        return {error: 1, data: "Erreur inconnue"}

    }
}

