import {getConversation, getFriends} from "@/services/friends.service";

export const friends = {
    namespaced: true,
    state: {
        friends: [],
        friendRequests: [],
        blockedFriendRequests: [],
        conversation: [],
        participant: [],
    },
    mutations: {
        setFriends(state, friends) {
            state.friends = friends;
        },
        setFriendRequests(state, friendRequests) {
            state.friendRequests = friendRequests;
        },
        setBlockedFriendRequests(state, blockedFriendRequests) {
            state.blockedFriendRequests = blockedFriendRequests;
        },
        setConversation(state, conversation) {
            state.conversation = conversation;
        },
    },
    actions: {
        async getFriends({ commit }) {
            try {
                const friends = await getFriends();
                if (friends.error === 0) {
                    commit('setFriends', friends.data);
                    return friends.data;
                } else {
                    console.log(friends.data);
                }
            }catch (err){
                console.log(err)
            }
        },
        async getConversation({ commit },id) {
            try {
                const conversation = await getConversation(id);
                if (conversation.error === 0) {
                    commit('setConversation', conversation.data);
                    return conversation.data;
                } else {
                    console.log(conversation.data);
                }
            }catch (err){
                console.log(err)
            }

        },
    }
}