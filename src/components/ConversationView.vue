<template>
  <div>
    <v-navigator @return="returnMenu" :image="image" :title="title" :bool-image="true"></v-navigator>

    <div class="conversation-body" ref="conversation">
    <div v-for="(message,index) in conversation" :key="index + 'conversation'">
      <div class="message">
        <div class="avatar">
          <img :src="getImage(imageMessage(message.sender_id))" alt="img">
        </div>
        <div class="body-message">
          <div class="information">
            <span class="name">{{usernameMessage(message.sender_id)}}</span>
            <span class="date">{{ calculerTempsEcoule(message.created_at) }}</span>
          </div>


        <div class="content">
          <span>{{message.text}}</span>

        </div>
        </div>
      </div>
  </div>
      </div>
    <div class="bottom">

      <div class="content-input">
    <textarea  placeholder="Envoyer votre message" class="input-message"  v-model="newMessage" @input="adjustTextareaHeight" ref="textarea" @keydown.enter.prevent="handleEnter"></textarea>
      <div class="send-button" @click="sendMessage">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="carbon:send-filled">
            <path id="Vector" d="M17.1562 9.44375L3.40624 2.56875C3.29847 2.51486 3.17742 2.49326 3.05766 2.50657C2.93791 2.51988 2.82455 2.56752 2.73124 2.64375C2.64213 2.71844 2.57562 2.8165 2.53918 2.92691C2.50275 3.03732 2.49783 3.1557 2.52499 3.26875L4.18124 9.375H11.25V10.625H4.18124L2.49999 16.7125C2.47451 16.8069 2.47153 16.906 2.4913 17.0018C2.51108 17.0975 2.55305 17.1873 2.61384 17.2639C2.67463 17.3405 2.75255 17.4018 2.84132 17.4428C2.9301 17.4838 3.02726 17.5034 3.12499 17.5C3.22283 17.4994 3.31916 17.4759 3.40624 17.4313L17.1562 10.5563C17.2586 10.5038 17.3445 10.4241 17.4045 10.326C17.4645 10.2278 17.4963 10.115 17.4963 10C17.4963 9.88497 17.4645 9.77218 17.4045 9.67403C17.3445 9.57589 17.2586 9.4962 17.1562 9.44375Z" fill="#9299A2"/>
          </g>
        </svg>

      </div>
        </div>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import VNavigator from "@/components/Navigator.vue";
import {getImage} from "@/services/image.service";
import {nextTick} from "vue";

export default {
  name: 'ConversationView',
  components: {VNavigator},
  props: ['id'],
  data() {
    return {
      messages: [],
      newMessage: '',
    }
  },
  computed: {
    ...mapState(['socket', 'userId', 'isAuthenticated','conversations'])
    ,...mapState('friends',['conversation','participant']),
    getInfo() {
      return [this.socket, this.userId, this.isAuthenticated]
    },
    title() {
      let friend = this.conversations.find((conv) => conv.id === this.id);
      return friend ? friend.name : 'Inconnu';
    },
    image() {
      let friend = this.conversations.find((conv) => conv.id === this.id);
      return friend ? friend.avatar : 'default.png';
    },


  },
  methods: {
    getImage,
    handleEnter(event) {
      if (!event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }else if (event.shiftKey) {
        this.newMessage += '\n';
      }
    }

    ,
    calculerTempsEcoule(dateEnvoi) {
      if (!dateEnvoi) {
        return '';
      }
      dateEnvoi = new Date(dateEnvoi);


      const maintenant = new Date();
      const difference = maintenant - dateEnvoi;

      const secondes = Math.floor(difference / 1000);
      const minutes = Math.floor(secondes / 60);
      const heures = Math.floor(minutes / 60);
      const jours = Math.floor(heures / 24);

      if (jours > 0) {
        return `il y a ${jours} jour${jours > 1 ? 's' : ''}`;
      } else if (heures > 0) {
        return `il y a ${heures} heure${heures > 1 ? 's' : ''}`;
      } else if (minutes > 0) {
        return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
      } else if (secondes > 0) {
        return `il y a ${secondes} seconde${secondes > 1 ? 's' : ''}`;
      }else {
        return 'à l\'instant';
      }
    },
    imageMessage(userid) {
      let friend = this.participant.find((p) => p.user_id === userid);
      return friend ? friend.avatar : 'default.png';
    },
    usernameMessage(userid) {
      let friend = this.participant.find((p) => p.user_id === userid);
      return friend ? friend.username : 'Inconnu';
    },
    async sendMessage() {
      if (this.newMessage === '') {
        return;
      }
      await this.$store.dispatch('sendMessage', {
        to: this.id,
        message: this.newMessage,
      });
      this.newMessage = '';

    },
    returnMenu() {
      this.$emit('change-state');
    },
    adjustTextareaHeight() {
      const textarea = this.$refs.textarea;
      const conversation = this.$refs.conversation;


      textarea.style.height = "18px";
      if((textarea.scrollHeight -19)+"px" !== textarea.style.height) {
        conversation.style.height = "calc(100vh - "+(textarea.scrollHeight -19)+"px - 115px)";


      }

      textarea.style.height = textarea.scrollHeight -19 + "px";
      if (textarea.scrollHeight > 5 * 18) { // 20px est la hauteur d'une ligne
        textarea.style.overflowY = "scroll";
        textarea.style.height = (5 * 18) + "px";
        conversation.style.height = "calc(100vh - "+(5 * 18) +"px - 115px)";

      } else {
        textarea.style.overflowY = "hidden";
      }
    }
  },
  mounted() {
    this.$store.dispatch('joinConversation', this.id).then((res) =>{
        if(res === false) {
          this.$router.push('/chat');
        }
      const conversation = this.$refs.conversation;
      conversation.scrollTop = conversation.scrollHeight;
      console.log('conversation', this.conversation);
      console.log('participant', this.participant);

    });

  },
  watch: {
    'id': {
      handler(newVal) {
        this.$store.dispatch('joinConversation', newVal);
        console.log('newVal', newVal);
      },
    },
    'conversation': {
      handler() {
        nextTick(() => {
          const conversation = this.$refs.conversation;
          conversation.scrollTop = conversation.scrollHeight;
        });
      },
      deep: true
    }
  },

}
</script>
<style scoped>
 .conversation-body {
   height: calc(100vh - 117px - 18px);
   width: 100vw;
   margin-top: 10px;
   overflow-x: hidden;
   overflow-y: auto;
 }

 .avatar {
   width: 50px;
   height: 50px;
   min-width: 50px;
   min-height: 50px;
   border-radius: 500px;
   overflow: hidden;
   margin: 0 10px ;
 }

  .avatar img {
    width: 50px;
    height: 50px;
    object-fit: fill;
  }

  .message {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 15px 0;
  }

  .body-message {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .information {
    display: flex;
    align-items: center;
    justify-content:  flex-start;
    gap: 10px;
    width: fit-content;
    margin-bottom: 5px  ;
  }

  .name {
    font-size: 15px;
    color: var(--actif-color);
  }

  .date {
    font-size: 14px;
    color: var(--inactif-color);
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    color: var(--text-color);
  }








  .bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    background-color: var(--secondary-color);
  }


  .send-button {
    width: 40px;
    height: 40px;
    border-radius: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .send-button:hover svg path {
    fill: var(--actif-color);
  }

  .send-button:hover {
    background-color: var(--selection-color);
  }

  .content-input {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--tertiary-color);
    width: fit-content;
    padding: 5px;
    border-radius: 25px;
  }

  .input-message {
    width: 50vw;
    height: 20px;
    padding: 10px;
    border-radius: 25px;
    border: none;
    background-color: var(--tertiary-color);
    color: var(--text-color);
    resize: none;
    font-family: Roboto , sans-serif;

  }

  .input-message:focus {
    outline: none;
  }

  .input-message::placeholder {
    color: var(--inactif-color);
    font-family: Roboto , sans-serif;

  }


</style>
