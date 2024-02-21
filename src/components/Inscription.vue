<template>
  <section>
    <div v-if="step === 1">
      <div class="input-container">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" placeholder="Nom d'utilisateur" v-model="username">
        <span class="error" v-if="usernameisUsed">Le nom d'utilisateur est déjà utilisé ou invalide</span>
      </div>
      <div class="input-container">
        <label for="username">Adresse e-mail</label>
        <input type="text" id="username" placeholder="Adresse e-mail" v-model="email">
        <span class="error" v-if="emailisNotValid">Adresse e-mail invalide</span>
      </div>
      <div class="over-span">
        <div class="input-container">
          <label for="password">Mot de passe</label>
          <input type="password"  placeholder="Mot de passe" id="password" v-model="password" @keyup.enter="inscription">
          <span class="error" v-if="passwordisNotValid">Mot de passe : min. 8 caractères, 1 lettre, 1 chiffre, 1 caractère spécial</span>        </div>

      </div>
    </div>
    <div class="action">
      <button-current title="S'inscrire" @click="inscription" ></button-current>
      <p @click="goTo('/login')">J'ai déjà un compte ?</p>

    </div>

    <div v-if="step ===2" class="pop-up">
      <span @click="goTo('/chat')" class="after-button">Plus tard</span>
      <div class="photo-profil">
        <div>
          <div class="photo">
              <img :src=image alt="photo de profil">

          </div>
        <p class="title">Choisir une photo de profil</p>
        </div>


        <div class="input-zone">
          <label for="photo"><i class="fas fa-download"></i> Séléctionner une image</label>
          <input type="file" id="photo" @change="imageSelected" accept="image/*" hidden="hidden">
        </div>
        <div class="action-button">
        <button-current v-if="cancelButton" color="red" title="Annuler" ></button-current>
        <button-current title="Terminer" @click="uploadImage" ></button-current>
        </div>
      </div>

    </div>

  </section>

</template>
<script>
import {mapState} from "vuex";
import {signup} from "@/services/login.service";
import Cookies from "js-cookie";
import ButtonCurrent from "@/components/Button/ButtonCurrent.vue";
import {getImage} from "@/services/image.service";

export default {
  name: 'vRegister',
  components: {ButtonCurrent},
  data () {
    return {
      username: '',
      password: '',
      email:'',
      usernameisUsed: false,
      passwordisNotValid: false,
      emailisNotValid: false,
      image: getImage('default.png'),
      cancelButton: false,
      imageSelect: null,
      step: 1,
    }
  },computed: {
    ...mapState(['socket']),
    isUsernameValid() {
      return this.username !== '';
    },
    isPasswordValid() {
      const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
      return this.password !== '' && passwordRegex.test(this.password);
    },
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return this.email !== '' && emailRegex.test(this.email);
    }
  },
  methods: {
    imageSelected(evt) {
      evt.preventDefault()
      this.cancelButton = true;
      this.imageSelect = evt.target.files[0];
      this.image = URL.createObjectURL(evt.target.files[0]);


    },
    uploadImage() {
      if(this.imageSelect === null) {
        this.$router.push('/chat').catch(() => {});
      }
      const formData = new FormData();
      formData.append('upload', this.imageSelect);
      this.$store.dispatch('uploadAvatar', formData).then(() => {
        this.$router.push('/chat').catch(() => {});
      })
    }
  ,
    inscription() {
      if(!this.isUsernameValid) {
        this.usernameisUsed = true;
      }else if(!this.isEmailValid) {
        this.emailisNotValid = true;
      }else if(!this.isPasswordValid) {
        this.passwordisNotValid = true;
      }
      else {

        signup({username: this.username, password: this.password, email: this.email})
            .then((response) => {
              if (response.error === 1 && response.data.error === 'Invalid Infomartion') {

                this.usernameisUsed = response.data.data.username === false
                this.passwordisNotValid = response.data.data.password === false
                this.emailisNotValid = response.data.data.email === false

              } else if (response.error === 0) {
                this.$store.dispatch('authenticate', response.data).then(
                    () => {

                      Cookies.set('jwt', response.data.token, {expires: 7});
                      this.$store.dispatch('initializeSocket');
                      this.step = 2;

                    }
                )
              }


            })
            .catch((error) => {
              console.log(error);
            })
      }




    },
    goTo(route) {
      this.$router.push(route).catch(() => {});
    }
  },
  watch: {
    username() {
      this.usernameisUsed = false;
    },
    password() {
      this.passwordisNotValid = false;
    },
    email() {
      this.emailisNotValid = false;
    }
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

.error {
  color: var(--red-color);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 5px;
  text-align: justify;
  width: 300px;
}

.pop-up {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--secondary-color);
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  padding: 20px;
  box-sizing: border-box;
}


.after-button {
  color: var(--inactif-color);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  margin-top: 5px;
  text-align: center;
  margin-left: auto;
  margin-right: 10px;
  box-sizing: border-box;
}

.photo-profil {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 10vh;
  height: 80vh;
  width: 100vw;
  max-height: 600px;
  box-sizing: border-box;
  background: var(--secondary-color);
}

.photo {
  width: 250px;
  height: 250px;
  border-radius: 500px;
  overflow: hidden;
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title{
  color: var(--text-color);
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 20px;
  text-align: center;
}

.input-zone label {
  display: grid;
  grid-template-columns: 1fr 4fr;
  border-radius: 20px;
  width: 312px;
  height: 56px;
  background-color: var(--tertiary-color);
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  color: var(--inactif-color);
  align-items: center;
}

.input-zone label i {
  display: flex;
  justify-content: center;

}

.action-button {
  display: flex;
  flex-direction: column;
  gap: 10px;
}






</style>
