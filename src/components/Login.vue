<template>
  <section>
    <div>
    <div class="input-container">
    <label for="username">identifiant</label>
    <input type="text" id="username" placeholder="Adresse e-mail" v-model="username">
    </div>
    <div class="over-span">
    <div class="input-container">
      <label for="password">Mot de passe</label>
    <input type="password"  placeholder="Mot de passe" id="password" v-model="password" @keyup.enter="login">
    </div>
      <p class="motdepasse">Mot de passe oublié ?</p>

    </div>
    </div>
    <div class="action">
      <button-current title="Se connecter" @click="login" ></button-current>
      <p>S'inscrire ?</p>

    </div>
  </section>

</template>
<script>
import {mapState} from "vuex";
import {login} from "@/services/login.service";
import Cookies from "js-cookie";
import ButtonCurrent from "@/components/Button/ButtonCurrent.vue";

export default {
  name: 'vLogin',
  components: {ButtonCurrent},
  data () {
    return {
      username: '',
      password: ''
    }
  },computed: {
   ...mapState(['socket']),
    isFormValid() {
      return this.username !== '' && this.password !== ''
    }
  },
  methods: {
    login() {
      login({username:this.username, password:this.password})
        .then((response) => {
          if(response.status !== 200) {
            console.log(response);
            return;
          }
          console.log(response);
          this.$store.dispatch('authenticate', response.data).then(
            () => {

              console.log('authenticated');
              Cookies.set('jwt', response.data.token , { expires: 7 });
              this.$store.dispatch('initializeSocket');
              this.$router.push('/chat');

            }
          )

        })
        .catch((error) => {
          console.log(error);
        })




    },
}
}

</script>
<style scoped>


input {
  width: 280px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 15px;
  background: var(--tertiary-color);
  border: none;
  padding: 10px;
  color: var(--text-color);

}

input:focus {
  outline: none;
  box-shadow: 0 0 10px var(--primary-color);
}

input::placeholder {
  color: var(--secondary-color, #303237);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}


section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--secondary-color);
}

.input-container {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  margin-bottom: 5px;
  margin-left: 10px;
  color: var(--text-color);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.over-span {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.motdepasse {
  color: var(--inactif-color);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  margin-top: -13px;

}

.motdepasse {
  color: var(--inactif-color);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  margin-top: -13px;

}

.action p {
    color: var(--inactif-color);
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    margin-top: 5px;
    text-align: center;

}


section {
  height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: var(--secondary-color);
}




</style>
