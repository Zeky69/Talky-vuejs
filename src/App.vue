<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {checkToken} from "@/services/login.service";

export default {
  name: 'App',
  async created() {
    let jwt = Cookies.get('jwt');
    if(jwt) {
       await checkToken().then(async (response) => {
         console.log(response.data);
         if (response.status === 200) {
           await this.$store.dispatch('authenticate', {token: jwt, ...response.data});
           await this.$store.dispatch('initializeSocket');
         }
       }).catch(() => {
        Cookies.remove('jwt');
      })
    }
  },
  mounted() {
    console.log(process.env.API_URL);

  },
  methods: {
    logout() {
      this.$store.dispatch('unAuthenticate').then(() => {
        this.$router.push('/login').catch(() => {});
      })
    }
  }
}
</script>

<style>
:root {
  --primary-color: #2A2C30;
  --secondary-color: #303237;
  --tertiary-color: rgb(30, 31, 34);
  --text-color: #D1D3D7;
  --actif-color: #FCFCFC;
  --selection-color: #3F4148;
  --inactif-color: #9299A2;
  --red-color: #D12828;
  --green-color: #007B00;
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--secondary-color);
  color: var(--inactif-color);
  font-family: Roboto , sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}



</style>
