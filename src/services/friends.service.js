import {getRequest , deleteRequest , postRequest} from "@/services/axios.service";


export async function getFriends() {
    try {
        const req = await getRequest(`/friends`, 'getFriends');
        console.log(req)
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
        console.log(req)
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
        console.log(req)
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
        console.log(req)
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
        console.log(req)
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
        console.log(req)
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
        console.log(req)
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
        console.log(req)
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

export async function deleteFriend(id) {
    try {
        const req = await deleteRequest(`/friends/delete/${id}`, {}, 'deleteFriend');
        console.log(req)
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
        console.log(req)
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

