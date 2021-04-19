<template>
<div class="main">
  <div class="menu">
    <button><a @click="toggleUpload">Upload</a></button>
    <router-link to="/edit"><button>Edit/Delete</button></router-link>
    <button><a @click="logout">Logout</a></button>
    <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div>
  <image-gallery :photos="photos" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import ImageGallery from '@/components/ImageGallery.vue';
export default {
  name: 'MyPhotos',
  components: {
    Uploader,
    ImageGallery
  },
  data() {
    return {
      show: false,
      photos: [],
      error: '',
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  created() {
    this.getPhotos();
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getPhotos() {
      try {
        this.response = await axios.get("/api/memes");
        this.photos = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getPhotos();
    },
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}

.menu h2 {
  font-size: 14px;
}
</style>
