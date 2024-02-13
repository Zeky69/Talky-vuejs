<template>
  <div class="all-contain-amis">
    <VNavigator title="Amis" :bool-image="false" @return="returnMenu"></VNavigator>
  <div v-if="!AjouterAmi" class="amis-container">
    <div class="flex-amis">
    <button @click="AjouterAmi = true" class="add">Ajouter un ami</button>

    <span>Liste des amis</span>
    <div class="list-amis">
      <div class="element-amis" v-for="(ami,index) in amis" :key="index">
        <div class="ami-avatar"><img :src="getImage(ami.avatar)" alt="avatar" /></div>
        <div class="ami-username">{{ ami.username }}</div>

      </div>
    </div>

    <span>Demandes d'amis</span>
    <div class="list-amis">
      <div class="element-amis" v-for="(ami,index) in requestFriends" :key="index+'5555'">
        <div class="ami-avatar"><img :src="getImage(ami.avatar)" alt="avatar" /></div>
        <div class="ami-username">{{ ami.username }}</div>
        <div class="action">
          <i @click="refuseFriend(ami.id)" class="fas fa-times"></i>
          <i @click="acceptFriendHandle(ami.id)" class="fas fa-check"></i>
        </div>
      </div>
      <div v-if="requestFriends.length ===0" class="nothing"> Aucune demande d'ami </div>
    </div>

    </div>


  </div>


    <div class="amis-container" v-else>
      <div class="subheader"><button @click="AjouterAmi = false" class="btn-back">&lsaquo; Liste d'amis</button></div>

      <div class="list-request">
        <div class="search">
          <input placeholder="Rechercher" v-model="search" class="search-input" @input="handleInput">
          <i class="fa fa-search"></i>
        </div>

        <div class="list-amis">
        <div class="element-amis" v-for="(ami,index) in listNotFriend" :key="index+'5555'">
          <div class="ami-avatar"><img :src="getImage(ami.avatar)" alt="avatar" /></div>
          <div class="ami-username">{{ ami.username }}</div>
          <div class="action">
            <i @click="sendRequestFriend(ami.id)" class="fas fa-user-plus"></i>
          </div>
        </div>
        <div v-if="listNotFriend.length ===0" class="nothing"> Aucune resultat</div>
      </div>

      </div>


    </div>
  </div>
</template>
<script>
import {getImage} from "@/services/image.service";
import {
  acceptFriend,
  addFriend,
  getFriends,
  getListNotFriendStartLike,
} from "@/services/friends.service";
import VNavigator from "@/components/Navigator.vue";
import {mapState} from "vuex";

export default {
  name: 'vAmis',

  components: {VNavigator},
  computed: {
    ...mapState(['requestFriends'])
  },
  methods: {getImage,
    returnMenu() {
      this.$emit('change-state');
    },
    refuseFriend(id) {
      console.log(id);
    },
    searchList() {
      if (this.search.length === 0) {
        this.listNotFriend = [];
        return;
      }
      getListNotFriendStartLike(this.search).then((data) => {
        this.listNotFriend = data.data;
      })
    },
    handleInput() {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        this.searchList();
      }, 500);
    },

    async sendRequestFriend(id) {

      const resultat = await addFriend(id)
      console.log(resultat);

      if(resultat.error === 0) {
        this.listNotFriend.splice(this.listNotFriend.findIndex((ami) => ami.id === id), 1);
        console.log(this.listNotFriend);

      }

    },



    acceptFriendHandle(id) {
      acceptFriend(id).then((data) => {
        if(data.error === 1) {
          console.log(data.data);
        } else {
          getFriends().then((amis) => {
            console.log(amis);
            this.amis = amis.data;
          });
          this.$store.dispatch('addConversation', data.data.conversation);
        }

        this.$store.dispatch('getRequestFriends')

      })
    }
  },
  data() {
    return {
      amis: [],
      AjouterAmi: false,
      search: '',
      listNotFriend: [],
      searchTimeout: null,


    }
  },
  mounted() {
    getFriends().then((amis) => {
      console.log(amis);
      this.amis = amis.data;
    });

    this.$store.dispatch('getRequestFriends')


  }
}
</script>
<style scoped>
.all-contain-amis {
  width: 100vw;
  height: 100vh;
}

.flex-amis {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.list-request {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  gap: 5px;
  max-height: max-content;
}

.amis-container{
  width: 100vw;
  height: calc(100vh - 50px);
  overflow-y: scroll;
}

.amis-container span {
  color: var(--inactif-color);
  width: 75vw;
  max-width: 400px;
  margin-bottom: 5px;

}

.list-amis {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75vw;
  height: 50vh;
  background-color: var(--primary-color);
  border-radius: 10px;
  padding: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 400px;
  margin-bottom: 50px;

}
.element-amis {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 5px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  transition: background-color 0.3s;
}

.ami-avatar {
  width: 50px;
  height: 50px;
  border-radius: 500px;
  overflow: hidden;
  margin: 0 10px;
}

.ami-avatar img {
  width: 50px;
  height: 50px;
  object-fit: fill;
}

.ami-username {
  font-size: 15px;
  color: var(--inactif-color );
}

.element-amis:hover {
  background-color: var(--secondary-color);
  cursor: pointer;
}

.add {
  width: 150px;
  height: 35px;
  background-color: var(--green-color);
  color: var(--text-color);
  border-radius: 10px;
  margin: 50px 5px;
  transition: background-color 0.2s;
  border : none;
  cursor: pointer;
}

.add:hover {
  background-color: var(--selection-color);
}
.add:active {
  background-color: var(--primary-color);
}

.nothing {
  color: var(--inactif-color);
  font-size: 15px;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action
{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  margin-right: 10px;
  box-sizing: border-box;
}

.action i {
  font-size: 17px;
  color: var(--inactif-color);
  cursor: pointer;
  padding: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%
}

.action i:hover {
  color: var(--actif-color);
  background-color: var(--selection-color);
}



.search {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--tertiary-color);
  border-radius: 15px;
max-width: 350px;
  width: 40vw;
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

.subheader {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
}

.btn-back {
  color: var(--inactif-color);
  font-size: 15px;
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  transition: color 0.3s;
  border: none;
}

.btn-back:hover {
  color: var(--actif-color);
}

.btn-back:active {
  color: var(--selection-color);
}

.search i {
  color: var(--inactif-color);
  padding-right: 10px;
}

@media (min-width: 1500px){
  .all-contain-amis {
    width: 100%;
  }

  .amis-container {
    width: 100%;

  }





}

</style>