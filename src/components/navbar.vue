<template>
  <div class="navbar-all" v-if="stateNavbar">
    <div class="header">
      <svg viewBox="0 0 152 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Logo" fill-rule="evenodd" clip-rule="evenodd"
              d="M21.1873 22.9067C22.6794 22.2846 24.009 21.1502 25.1755 19.5045C33.664 11.5546 43.6346 5.96523 55.0874 2.73654C84.53 -4.36614 110.038 2.35744 131.612 22.9067C152.22 46.4033 157.205 72.8107 146.568 102.129C145.169 105.505 143.507 108.745 141.582 111.85C141.126 117.403 141.458 122.912 142.579 128.375C144.246 134.302 146.157 140.134 148.312 145.872C145.4 145.98 142.574 145.575 139.837 144.657C132.767 142.02 125.954 138.861 119.398 135.179C96.7899 149.215 72.8605 151.726 47.6094 142.713C23.1779 132.181 7.80676 114.279 1.49537 89.0067C-2.54736 67.8425 1.60704 48.4014 13.9586 30.6832C16.0415 27.7106 18.4509 25.1182 21.1873 22.9067ZM95.9668 14.1582C97.0995 14.5563 98.2631 14.88 99.4565 15.1303C99.627 15.5376 99.9591 15.6999 100.454 15.6163C101.677 16.3745 103.006 16.8605 104.442 17.0744C107.997 19.052 111.487 21.158 114.911 23.3928C115.806 24.5592 116.97 25.3694 118.401 25.8229C120.727 28.4149 123.22 30.845 125.879 33.1133C125.892 33.9391 126.225 34.5875 126.876 35.0575C128.899 37.6135 130.727 40.3673 132.36 43.32C132.587 43.7078 132.92 43.8697 133.357 43.806C134.095 46.2147 135.092 48.483 136.348 50.6104C136.495 51.5353 136.828 52.3455 137.345 53.0405C137.211 53.8177 137.378 54.4656 137.843 54.9846C141.014 64.5322 141.761 74.2528 140.087 84.1464C139.385 87.2472 138.638 90.3253 137.843 93.3809C137.366 94.2567 137.033 95.2288 136.846 96.2971C135.923 97.78 135.258 99.3999 134.852 101.157C134.069 102.195 133.404 103.329 132.858 104.56C130.644 108.002 127.652 108.731 123.885 106.747C121.908 104.208 121.991 101.697 124.134 99.2133C125.711 97.4363 127.04 95.4922 128.122 93.3809C137.833 65.0741 129.774 42.798 103.943 26.552C82.0808 15.8904 61.1425 17.3485 41.1285 30.9262C17.7759 51.1299 13.5384 74.7023 28.416 101.643C39.8807 118.536 56.0829 127.285 77.0227 127.889C85.1926 127.538 93.0863 125.918 100.703 123.029C104.133 123.561 105.629 125.505 105.19 128.861C105.023 129.835 104.607 130.645 103.943 131.291C101.822 132.197 99.6619 133.007 97.4624 133.721C87.2201 137.267 76.751 138.158 66.055 136.394C62.8744 135.711 59.7172 134.982 56.5829 134.207C56.0505 133.753 55.386 133.591 54.5888 133.721C53.9507 133.026 53.1197 132.702 52.0962 132.749C50.4331 131.665 48.605 130.855 46.6123 130.319C43.1251 128.055 39.6354 125.786 36.1432 123.515C32.4875 120.274 28.9978 116.872 25.6741 113.308C23.6785 110.388 21.6843 107.472 19.6917 104.56C19.1932 103.588 18.6947 102.615 18.1961 101.643C10.7546 86.5201 9.5915 70.9672 14.7064 54.9846C15.172 54.4656 15.3386 53.8177 15.2049 53.0405C15.9183 52.4184 16.2509 51.6082 16.202 50.6104C17.3581 48.3781 18.5217 46.1102 19.6917 43.806C21.6843 40.8937 23.6785 37.9775 25.6741 35.0575C26.4996 34.1048 27.3307 33.1328 28.1667 32.1413C29.9948 30.6832 31.6564 29.0633 33.152 27.281C34.169 26.4659 35.1661 25.6557 36.1432 24.8509C39.1384 22.9053 42.1296 20.9612 45.1168 19.0185C46.4463 18.3706 47.7754 17.7223 49.105 17.0744C64.363 10.2452 79.9835 9.27315 95.9668 14.1582ZM48.6065 56.9288C57.9714 55.7856 64.203 59.512 67.3013 68.1074C68.7187 77.2457 64.9797 83.3211 56.0844 86.3335C46.7111 87.7153 40.4794 84.0701 37.3895 75.3979C36.0779 66.2454 39.8169 60.0889 48.6065 56.9288ZM96.4654 56.9288C105.83 55.7856 112.062 59.512 115.16 68.1074C116.578 77.2457 112.839 83.3211 103.943 86.3335C94.5699 87.7153 88.3383 84.0701 85.2484 75.3979C83.9368 66.2454 87.6758 60.0889 96.4654 56.9288ZM67.0521 94.353C69.4061 94.5284 71.5668 95.2575 73.533 96.5401C77.1877 97.3168 80.5114 96.6689 83.5036 94.596C87.7411 94.1911 89.6519 96.0541 89.2367 100.185C87.759 103.304 85.3496 105.491 82.008 106.747C78.1858 107.071 74.364 107.071 70.5418 106.747C67.7485 105.507 65.5051 103.644 63.8116 101.157C63.168 98.0405 64.2483 95.7722 67.0521 94.353Z"
              fill="currentColor"/>
      </svg>
      <div class="search">
        <input placeholder="Rechercher" class="search-input">
        <i class="fa fa-search"></i>

      </div>

      <hr>

    </div>

    <div class="menu">
      <router-link to="/profil" class="menu-item">
        <i class="fa fa-user"></i><span>Profil</span>
      </router-link>
      <router-link to="/friends" @click.native="changeState" class="menu-item">
        <i class="fa fa-users"></i><span>Amis</span>
      </router-link>

    </div>

    <div class="conversation-container">

      <div class="conversation-header">
        <span>Conversations</span>
        <button class="conversation-header-button" @click="menuConversation = true">
          <i class="fa fa-plus"></i>
        </button>
        <!--    Menu pour ajouter un ami    -->
        <div v-if="menuConversation" class="back-menu" @click="clickOutside">
          <div class="menu-group" ref="menuGroup">
            <div class="close-menu">
              <div class="grid-2"><h1>Nouvelle Conversation</h1></div>
              <div class="grid-3">
                <i class="fas fa-times" @click="menuConversation=false"></i>
              </div>
            </div>
            <div class="input-container">
              <div class="added-friend" v-for="(element , index ) in friendAddForGroup " :key="index +'friend'">
                <img :src="getImage(element.avatar)" alt="avatar">
                <span>{{ element.username }}</span>
                <i @click="removeFriendAddForGroup($event,index)" class="fas fa-times"></i>
              </div>

              <input v-model="searchFriends" @input="selectedFriendIndex = 0" @keyup.delete="removeSelected"
                     @keydown.delete="removeLastFriendAddForGroup" @keydown.enter="addFriendSearchforEnter"
                     class="input-add-friends" placeholder="Ajouter un ami">
            </div>

            <div class="list-ami">
              <div class="element-ami" v-for="(ami, index) in getFriendsForAdd" :key="index"
                   :class="{ 'selected': index === selectedFriendIndex}" @mouseenter="selectedFriendIndex = index"
                   @mouseleave="selectedFriendIndex = null">
                <div class="element-info">
                  <img :src="getImage(ami.avatar)" alt="avatar">
                  <span>{{ ami.username }}</span>
                </div>
                <i @click="addFriendAddForGroup($event,ami)" class="fas fa-plus"></i>
              </div>
            </div>
            <div class="container-name-input">
              <input v-model="nameConversation"  maxlength="30" type="text" placeholder="Nom de la conversation">
              <div class="action-button">
                <button class="button-create" @click="createConversation" :disabled="!formIsValid">Créer</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="conversation-list">

        <div v-for="conv in conversation" :key="conv.id" class="friend-item" @click="changeState">
          <router-link :to="'/chat/' + conv.id" class="friend-link">
            <img :src="getImage(conv.avatar)" alt="">
            <div class="friend-username">{{ conv.name }}</div>
            <div class="new-message-indicator" v-if="conv.hasNewMessage"></div>
          </router-link>
        </div>
      </div>

      <hr>
    </div>
    <div class="footer">
      <img :src="getImage(getAvatar)" alt="tqt">
      <span>{{ getUsername }}</span>
      <div @blur="paramMenu = false" tabindex="0" class="menu-gear">
        <i @click="paramMenu=!paramMenu" class="fas fa-cog"></i>
        <div v-if="paramMenu" class="menu-param">
          <div class="logout" @click="logout">
            <i class="fas fa-sign-out-alt"></i>
            <span> Déconnexion</span>
          </div>
          <div>
            <i class="fas fa-moon"></i>
            <span>Apparance</span></div>
          <div>
            <i class="fas fa-user-shield"></i>
            <span>Compte</span></div>
          <div>
            <i class="fas fa-ban"></i>
            <span>Gestion d'Amis</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getImage} from "@/services/image.service";
import {mapState} from "vuex";
import {nextTick} from "vue";

export default {
  name: 'vNavbar',
  props: {
    stateNavbar: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState(['username', 'avatar']),
    ...mapState('friends', ['friends']),
    getUsername() {
      return this.username || 'Pseudo';
    },
    getAvatar() {
      return this.avatar || 'default.png';
    },

    getFriendsForAdd() {
      return this.friends.filter(friend => this.friendAddForGroup.indexOf(friend) === -1 && friend.username.toLowerCase().includes(this.searchFriends.toLowerCase()))
    },
    formIsValid(){
      return this.friendAddForGroup.length > 1 && this.nameConversation.length > 0 && this.nameConversation.length < 30;
    }

  },
  data() {
    return {
      conversation: [],
      paramMenu: false,
      friendAddForGroup: [],
      searchFriends: '',
      selectedFriendIndex: null,
      menuConversation: false,
      nameConversation: ''
    }
  },
  methods: {
    getImage,
    logout() {
      this.$store.dispatch('unAuthenticate').then(() => {
        this.$router.push('/login').catch(() => {
        });
      })
    },
    removeFriendAddForGroup(evt, index) {
      this.friendAddForGroup.splice(index, 1);
      evt.stopPropagation();

    },
    addFriendAddForGroup(evt, element) {
      this.friendAddForGroup.push(element);
      evt.stopPropagation();
    },
    changeState() {
      this.$emit('change-state');
    },
    removeLastFriendAddForGroup() {
      if (this.searchFriends === '' && this.friendAddForGroup.length > 0) {
        nextTick(() => {
          this.friendAddForGroup.pop();
        })
      }
    },
    addFriendSearchforEnter() {
      if (this.searchFriends.length !== 0 && this.selectedFriendIndex !== null && this.getFriendsForAdd.length > 0) {
        this.friendAddForGroup.push(this.getFriendsForAdd[0]);
        this.searchFriends = '';
      }
    },
    removeSelected() {
      if (this.searchFriends === '') {
        this.selectedFriendIndex = null;

      }
    },
    clickOutside(event) {
      this.$refs.menuGroup.contains(event.target) ? this.menuConversation = true : this.menuConversation = false;
    },
    createConversation() {
      let variable = {
        name: this.nameConversation,
        friends: this.friendAddForGroup.map(friend => friend.friend_id)
      }

      this.$store.dispatch('createConversation', variable).then(() => {
        this.menuConversation = false;
        this.searchFriends = '';
        this.friendAddForGroup = [];
        this.nameConversation = '';
      })
    }
  },
  async mounted() {
    this.conversation = await this.$store.dispatch('getConversations');
    await this.$store.dispatch('friends/getFriends');
  }
}

</script>

<style scoped>


.navbar-all {
  background-color: var(--primary-color);
  width: 70vw;
  height: 100vh;
}


/* HEADER */

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 10px 0;
  gap: 10px;

}

.header svg {
  width: 40px;
  height: 40px;

}

#Logo {
  fill: var(--actif-color);

}

.header hr {
  width: 100%;
  border: 1px solid var(--secondary-color);
}

.search {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--tertiary-color);
  border-radius: 15px;

  width: 100%;
  box-sizing: border-box;

}

.search-input {
  box-sizing: border-box;
  border-radius: 15px;
  width: 100%;

  background: var(--tertiary-color);
  border: none;
  padding: 10px;
  color: var(--text-color);

}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: var(--secondary-color, #303237);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.search i {
  color: var(--inactif-color);
  padding-right: 10px;
}

/* MENU */
.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.menu-item {
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 30px 1fr;
  align-items: center;
  justify-content: center;
  gap: 25px;
  text-decoration: none;
  box-sizing: border-box;
  color: var(--inactif-color);
}

.menu-item i {
  font-size: 25px;
  text-align: center;
}

.menu-item:hover {
  background-color: var(--selection-color);
  color: var(--actif-color);
}


/* CONVERSATION */
.conversation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 10px 0;
}

.conversation-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  color: var(--inactif-color);
}

.conversation-header-button{
  border: none;
  background-color: transparent;
  color: var(--inactif-color);
  cursor: pointer;
  padding: 5px 9px;
  border-radius: 50%;
}

.conversation-header-button:hover {
  color: var(--actif-color);
  background-color: var(--selection-color);

}


.conversation-header i {
  font-size: 14px;
  text-align: center;
}

.conversation-list {
  width: 100%;
  box-sizing: border-box;
  gap: 10px;
  height: calc(100vh - 346px);

  overflow-y: scroll;
  overflow-x: hidden;

}

.friend-link img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.friend-item {
  margin-bottom: 10px;
  border-radius: 5px;
}

.friend-link {
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  text-decoration: none;
  color: var(--inactif-color);
  padding: 5px 20px;
  border-radius: 10px;

}

.active {
  background-color: var(--selection-color);
  color: var(--actif-color);
}

.friend-link:hover {
  background-color: var(--selection-color);
  color: var(--actif-color);
}

.conversation-container hr {
  width: 100%;
  margin: 0;
  border: 1px solid var(--secondary-color);
}


/* FOOTER */
.footer {
  position: relative;
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  color: var(--inactif-color);
  gap: 10px;
}

.footer img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.footer .menu-gear i {
  position: relative;
  font-size: 25px;
  text-align: center;
  cursor: pointer;
  z-index: 2;
}


/* MENU PARAM */

.menu-param {
  position: absolute;
  top: -177px;
  right: 25px;
  background-color: var(--secondary-color);
  border-radius: 10px;
  box-shadow: 0 0 10px var(--primary-color);
  color: var(--inactif-color);
  z-index: 1;
  padding: 10px 10px 35px;
}

.menu-param div {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
}

.menu-param div:hover {
  background-color: var(--selection-color);
  color: var(--actif-color);
}

.menu-param div i {
  font-size: 1px;
  text-align: center;
}

.logout {
  color: var(--red-color);
}


/* MENU FOR CREATE CONVERSATION */

.back-menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(30, 31, 34, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  z-index: 15;
  padding: 10px;
  box-sizing: border-box;
}

.menu-group {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 60vw;
  max-width: 500px;
  height: 60vh;
  padding: 10px;
  box-sizing: border-box;
  background-color: var(--secondary-color);
  border-radius: 10px;
}

.input-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1 1 auto;
  gap: 3px;
  padding: 5px;
  background-color: var(--tertiary-color);
  width: 95%;
  border-radius: 10px;
}


.input-add-friends {
  box-sizing: border-box;
  background: transparent;
  border: none;
  resize: none;
  flex: 1;
  min-width: 48px;
  min-height: 38px;
  margin: 1px;
  appearance: none;
  color: var(--text-color);
}

.input-add-friends::placeholder {
  color: var(--inactif-color);
}

.input-add-friends:focus {
  outline: none;
}

.list-ami {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 95%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  padding: 5px;
  background-color: var(--primary-color);
  overflow-x: hidden;
}

.element-ami {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1px;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 10px;
}


.element-ami img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}


.element-ami i {
  font-size: 17px;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
}

.element-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 5px;
  box-sizing: border-box;
}


.added-friend {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 10px;
  box-sizing: border-box;
  gap: 5px;
  background-color: var(--primary-color);
  color: var(--text-color);
}

.added-friend img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.added-friend i {
  font-size: 18px;
  text-align: center;
  cursor: pointer;
}


.added-friend i:hover {
  color: var(--red-color);
}

.added-friend span {
  font-size: 15px;
  color: var(--text-color);
}

.selected {
  background-color: var(--selection-color);
  color: var(--actif-color);
}

.close-menu {
  display: grid;
  z-index: 20;
  width: 100%;
  grid-template-columns: 1fr 5fr 1fr;
  align-items: center;
}

.close-menu i {
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  padding: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50px;
}

.close-menu i:hover {
  background-color: var(--selection-color);
}

.grid-3 {
  grid-column: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.grid-2 {
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

}

.grid-2 h1 {
  font-size: 1.1em;
  color: var(--text-color);
}


.container-name-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.container-name-input input {
  box-sizing: border-box;
  background: var(--tertiary-color);
  border: none;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  color: var(--text-color);
  outline: none;
}

.container-name-input input::placeholder {
  color: var(--inactif-color);
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.button-create {
  background-color: var(--selection-color);
  color: var(--text-color);
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  outline: none;
}

.button-create:hover {
  background-color: var(--primary-color);
}

.button-create:disabled {
  background-color: var(--inactif-color);
  color: var(--text-color);
  cursor: not-allowed;
}






@media (min-width: 1500px) {
  .navbar-all {
    width: 15vw;
  }


}


</style>