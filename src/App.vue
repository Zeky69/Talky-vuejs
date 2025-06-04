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
    this.$store.dispatch('loadTheme');
    let jwt = Cookies.get('jwt');
    if(jwt) {
       await checkToken().then(async (response) => {
         if (response.error === 0) {
           await this.$store.dispatch('authenticate', {token: jwt, ...response.data});
           await this.$store.dispatch('initializeSocket');

         }
          else {
            Cookies.remove('jwt');
            this.$router.push('/login').catch(() => {});
          }
       }).catch(() => {
        Cookies.remove('jwt');
      })
    }
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
:root[data-theme='dark'] {
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

:root[data-theme='light'] {
  --primary-color: #ffffff;
  --secondary-color: #f4f4f4;
  --tertiary-color: #e5e5e5;
  --text-color: #1d1d1d;
  --actif-color: #000000;
  --selection-color: #cccccc;
  --inactif-color: #555555;
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
