

<template>
  <div>
  <div class="sidebar">
    <h1>Friends</h1>
    <div v-for="friend in friends" :key="friend.username" class="friend-item">
      <div class="friend-username">{{ friend.username }}</div>
    </div>
  </div>

  </div>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'FriendView',
  data() {
    return {
      friends: [],
    }
  },
  computed: {
    ...mapState(['socket', 'userId','isAuthenticated']),
  },
  async mounted() {
    this.friends = await this.$store.dispatch('friends/getFriends');
  }
}

</script>

<style scoped>
  .sidebar {
    width: 200px;
    padding: 20px;
    background-color: #f0f0f0;
    border-right: 1px solid #ccc;
  }
  .friend-item {
    margin-bottom: 10px;
  }
  .friend-username {
    font-size: 20px;
  }

  .friend-link {
    text-decoration: none;
    color: #2a2c2f;
  }
  .friend-link:hover {
    color: #3498db;
  }

  .friend-item:hover {
    background-color: #f8f8f8;
  }

</style>