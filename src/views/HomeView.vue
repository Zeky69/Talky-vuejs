<template>
  <div class="body-container">
    <div class="menu-container">
      <v-navbar :state-navbar="stateNavbar" @change-state="changeState" ></v-navbar>
      <div v-if="stateNavbar" class="focus" @click="changeState"></div>
    </div>
    <div class="router-container">
      <router-view @change-state="changeState" ></router-view>
    </div>

  </div>
</template>
<script >
import {mapState} from "vuex";
import VNavbar from "@/components/navbar.vue";

export default {
  name: 'HomeView',
  components: {
    VNavbar
  },data() {
    return {
      conversation : [],
      friends : [],
      stateNavbar: true,
      afficher: false,
    }
  },computed: {
    ...mapState(['socket', 'userId','isAuthenticated']),
  },


  methods: {
    logout() {
      this.$store.dispatch('unAuthenticate').then(() => {
        this.$router.push('/login').catch(() => {});
      })
    },
    changeState() {
      if(document.documentElement.clientWidth < 1500)  {
        this.stateNavbar = !this.stateNavbar;
      }
    }

  }
  ,
  created() {
   addEventListener('resize', () => {
     if(document.documentElement.clientWidth > 1500) {
       this.stateNavbar = true;
     }
   })
  }


}


</script>


<style scoped>
.body-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
}

.router-container{
  overflow-x: hidden;
  overflow-y: auto;
  width: 100vw;
}
.focus{
  width: 30vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  background-color: rgba(30, 31, 34, 0.9);
}



@media (min-width: 1500px) {
  .focus{
    display: none;
  }
}


</style>