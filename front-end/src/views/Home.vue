<template>
<div class="home">
  <h1 class="explanation">Click on a meme to expand and view comments, or filter by tag:</h1>
  <br>
  <div class="tagContainer">
    <button class="tagButtons" @click="filter(0)">All</button>
    <button class="tagButtons" @click="filter(1)">Textposts</button>
    <button class="tagButtons" @click="filter(2)">Punny</button>
    <button class="tagButtons" @click="filter(3)">Star Wars</button>
    <button class="tagButtons" @click="filter(4)">Current Events</button>
    <button class="tagButtons" @click="filter(5)">Classics</button>
    <button class="tagButtons" @click="filter(6)">Wholesome</button>
    <button class="tagButtons" @click="filter(7)">Other</button>
  </div>
  <image-gallery :photos="filtered" />
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
      filtered: [],
      memes: [],
      error: '',
    }
  },
  components: {
    ImageGallery,
  },
  created() {
    this.getMemes();
  },
  methods: {
    async getMemes() {
      try {
        let response = await axios.get("/api/memes/all");
        this.memes = response.data;
        this.filtered = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    filter(index) {
      if (index === 0) {this.filtered = this.memes;}
      if (index === 1) {this.filtered = this.memes.filter(meme => meme.tag1 === true);}
      if (index === 2) {this.filtered = this.memes.filter(meme => meme.tag2 === true);}
      if (index === 3) {this.filtered = this.memes.filter(meme => meme.tag3 === true);}
      if (index === 4) {this.filtered = this.memes.filter(meme => meme.tag4 === true);}
      if (index === 5) {this.filtered = this.memes.filter(meme => meme.tag5 === true);}
      if (index === 6) {this.filtered = this.memes.filter(meme => meme.tag6 === true);}
      if (index === 7) {this.filtered = this.memes.filter(meme => meme.tag7 === true);}
    },
  }
}
</script>

<style>
.explanation {
  text-align: center;
}

.tagContainer {
  display: flex;
  justify-content: center;
}

.tagButtons {
  margin-left: 1.5em;
  margin-bottom: 1.5em;
}
</style>
