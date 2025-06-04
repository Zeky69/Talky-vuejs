import Vue from 'vue'
import Vuex from 'vuex'
import {friends} from "@/store/friend";
import Cookies from "js-cookie";
import {
    createConversation,
    getConversations,
    getFriends,
    getRequestFriends,
    removeFriendRequest
} from "@/services/friends.service";
import {connectSocket} from "@/services/socket.service";
import {uploadAvatar} from "@/services/image.service";
import {axiosAgent} from "@/services/axios.service";
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
    email: null,
    token: null,
    conversations: [],
    requestFriends: [],
    theme: 'dark'
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
    getEmail(state) {
      return state.email;
    },
    getToken(state) {
      return state.token;
    },
    getConversations(state) {
      return state.conversations;
    },
    getRequestFriends(state) {
      return state.requestFriends;
    },
    getTheme(state) {
      return state.theme;
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
    setEmail(state, email) {
      state.email = email;
    },
    addConversation(state, conversation) {
      state.conversations.push(conversation);
    },
    setRequestFriends(state, requestFriends) {
    state.requestFriends = requestFriends;
    },
    removeRequestFriends(state, id) {
         state.requestFriends.splice(state.requestFriends.findIndex(friend => friend.id === id), 1);
      }
    ,setTheme(state, theme) {
      state.theme = theme;
    }
  },
  actions: {

    loadTheme({commit}) {
      const theme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      commit('setTheme', theme);
    },

    toggleTheme({commit, state}) {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      commit('setTheme', newTheme);
    },

    initializeSocket({ commit ,rootState}) {
        const socket = connectSocket(Cookies.get('jwt'));

        socket.on('newFriend', (data) => {
            commit('addConversation', data.conversation);
            getFriends().then((friend) => {
               if(friend.error === 0){
                   rootState.friends.friends = friend.data;
               }
            });

        }
        );

        socket.on('newRequest', async () => {
            try {
                const requestFriends = await getRequestFriends();
                console.log(requestFriends);
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
        socket.on('newConversation', (conversation) => {
            commit('addConversation', conversation);
        }
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
        commit('setEmail', data.email);
        commit('setToken', data.token);
        axiosAgent.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    },
    unAuthenticate({ commit ,state}) {
        commit('setIsAuthenticated', false);
        commit('setUserId', null);
        commit('setUsername', null);
        commit('setEmail', null);
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

      });
      state.socket.on('newMessage', (message) => {
        friends.state.conversation.push(message);
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
    },
      async uploadAvatar({ commit }, avatar) {
        try {
            const response = await uploadAvatar(avatar);
            if (response.error === 0) {
                commit('setAvatar', response.data);
                return response.data;
            }
            else {
                console.log(response.data);
            }
        }
        catch (err) {
            console.log(err);
        }

      },
      async removeRequestFriend({ commit }, id) {

        try {
            const response = await removeFriendRequest(id);
            if (response.error === 0) {
                commit('removeRequestFriends', id);
                return true
            }
            else {
                console.log(response.data);
                return false
            }
        }
        catch (err) {
            console.log(err);
        }
      },
      async createConversation({ commit }, data) {
        try {
            const response = await createConversation(data.friends, data.name);
            if (response.error === 0) {
                commit('addConversation', response.data);
                return response.data;
            }
            else {
                console.log(response.data);
            }
        }catch (err) {
            console.log(err);
        }

      }





  },
})
