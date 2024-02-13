import Vue from 'vue'
import Vuex from 'vuex'
import {friends} from "@/store/friend";
import Cookies from "js-cookie";
import {getConversations, getFriends, getRequestFriends} from "@/services/friends.service";
import {connectSocket} from "@/services/socket.service";
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    friends
  },
  state: {
    socket: null,
    isAuthenticated: false,
    userId: null,
    username: null,
    avatar: null,
    token: null,
    conversations: [],
    requestFriends: []
  },
  getters: {
    getSocket(state) {
      return state.socket;
    },
    getIsAuthenticated(state) {
      return state.isAuthenticated;
    },
    getUserId(state) {
      return state.userId;
    },
    getUsername(state) {
      return state.username;
    },
    getAvatar(state) {
        return state.avatar;
    },
    getToken(state) {
      return state.token;
    },
    getConversations(state) {
      return state.conversations;
    },
    getRequestFriends(state) {
      return state.requestFriends;
    }
  },
  mutations: {
    setSocket(state, socket) {
      state.socket = socket;
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setToken(state, token) {
      state.token = token;
    },
    setConversations(state, conversations) {
      state.conversations = conversations;
    },
    setAvatar(state, avatar) {
    state.avatar = avatar;
    },
    addConversation(state, conversation) {
      state.conversations.push(conversation);
    },
    setRequestFriends(state, requestFriends) {
    state.requestFriends = requestFriends;
    }
  },
  actions: {

    initializeSocket({ commit }) {
        console.log("initializeSocket");
        const socket = connectSocket(Cookies.get('jwt'));

        socket.on('newFriend', (data) => {
            commit('addConversation', data.conversation);
            getFriends().then((friend) => {
               if(friend.error === 0){
                   friends.state.friends = friend.data;
               }
            });

        }
        );

        socket.on('newRequest', async () => {
            try {
                const requestFriends = await getRequestFriends();
                if (requestFriends.error === 0){
                    commit('setRequestFriends', requestFriends.data);
                    return requestFriends.data;
                }
                else {
                    console.log(requestFriends.data);
                }
            } catch (err) {
                console.log(err);
            }

        },
        );

        socket.on('removeFriend', (friend) => {
            console.log(friend);
        });

        socket.on('blockFriend', (friend) => {
            console.log(friend);
        });

        socket.on('unblockFriend', (friend) => {
            console.log(friend);
        } );

        socket.on('acceptFriend', (friend) => {
            console.log(friend);
        });

        socket.on('message', (message) => {
            console.log(message);
        } );





        commit('setSocket', socket);

    },
    authenticate({ commit }, data) {
        commit('setIsAuthenticated', true);
        commit('setUserId', data.userId);
        commit('setUsername', data.username);
        commit('setAvatar', data.avatar);
        commit('setToken', data.token);
    },
    unAuthenticate({ commit ,state}) {
        commit('setIsAuthenticated', false);
        commit('setUserId', null);
        commit('setUsername', null);
        commit('setToken', null);
        state.socket.disconnect();
        commit('setSocket', null);
        Cookies.remove('jwt');
    },
    async getConversations({ commit }) {
      try {
        const conversations = await getConversations();
        if (conversations.error === 0){
          commit('setConversations', conversations.data);
          return conversations.data;
        }
        else {
          console.log(conversations.data);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async joinConversation({ state }, id) {
      if(state.socket === null) {
        return false;
      }
      state.socket.emit('joinConversation', id);
      state.socket.off('conversation');
      state.socket.off('newMessage');

      state.socket.on('conversation', (data) => {

        friends.state.conversation = data.messages;
        friends.state.participant = data.participant;
        console.log(friends.state.conversation , "conversation");
        console.log(friends.state.participant , "participant");

      });
      state.socket.on('newMessage', (message) => {
        friends.state.conversation.push(message);
        console.log(friends.state.conversation , "conversation");
      });
      return true;
    },
    async sendMessage({ state }, data) {
      state.socket.emit('sendMessage', {conversation_id: data.to, from: state.userId, text: data.message});

    },
    async addConversation({ commit }, data) {
        commit('addConversation', data);
    },

    async getRequestFriends({ commit }) {
        try {
            const requestFriends = await getRequestFriends();
            if (requestFriends.error === 0){
                commit('setRequestFriends', requestFriends.data);
                return requestFriends.data;
            }
            else {
                console.log(requestFriends.data);
            }
        } catch (err) {
            console.log(err);
        }
    }





  },
})
