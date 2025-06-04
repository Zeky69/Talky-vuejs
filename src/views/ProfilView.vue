<template>
  <div class="profile-view">
    <div class="profile-card">
      <img :src="avatarUrl" class="avatar" alt="avatar" />
      <h2>{{ profile.username }}</h2>
      <p>{{ profile.email }}</p>
      <div v-if="isOwnProfile" class="actions">
        <input type="file" @change="upload" accept="image/*" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {getImage} from '@/services/image.service';
import {getProfile} from '@/services/profile.service';

export default {
  name: 'ProfilView',
  props: ['id'],
  data() {
    return {
      profile: {}
    }
  },
  computed: {
    ...mapState(['userId', 'username', 'avatar', 'email']),
    isOwnProfile() {
      return !this.id || parseInt(this.id) === this.userId;
    },
    avatarUrl() {
      const file = this.profile.avatar || this.avatar;
      return getImage(file || 'default.png');
    }
  },
  methods: {
    async upload(e) {
      const file = e.target.files[0];
      if (!file) return;
      const form = new FormData();
      form.append('upload', file);
      const res = await this.$store.dispatch('uploadAvatar', form);
      if (res) {
        this.profile.avatar = res;
      }
    }
  },
  async created() {
    if (this.isOwnProfile) {
      this.profile = {
        username: this.username,
        avatar: this.avatar,
        email: this.email
      };
    } else {
      const res = await getProfile(this.id);
      if (res.error === 0) {
        this.profile = res.data;
      }
    }
  }
}
</script>

<style scoped>
.profile-view {
  display: flex;
  justify-content: center;
  padding: 20px;
}
.profile-card {
  background-color: var(--secondary-color);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: var(--text-color);
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}
.actions input {
  margin-top: 15px;
}
</style>
