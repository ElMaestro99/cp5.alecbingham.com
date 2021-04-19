<template>
<div class="home">
  <image-gallery :photos="photos" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import ImageGallery from '@/components/ImageGallery.vue';
export default {
  name: 'Home',
  data() {
    return {
      photos: [],
      error: '',
    }
  },
  components: {
    ImageGallery,
  },
  created() {
    this.getPhotos();
  },
  methods: {
    async getPhotos() {
      try {
        let response = await axios.get("/api/memes/all");
        this.photos = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }
}
</script>
