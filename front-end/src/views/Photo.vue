<template>
  <div class="photoPage">
    <div class="bigContainer" v-if="meme">
      <div class="info">
        <h3>{{meme.title}}</h3>
        <img class="currentPhoto" :src="meme.path"/>
        <div class="belowPhoto">
          <h4>{{formatDate(meme.created)}}</h4>
          <h4>{{meme.user.firstName}} {{meme.user.lastName}}</h4>
        </div>
      </div>
      <div class="description">
        <div class="comContainer" v-for="comment in comments" v-bind:key="comment._id">
          <p>{{comment.text}}</p>
          <p class="commentDetails"><em>-{{comment.user.firstName}} {{comment.user.lastName}}</em> {{formatDate(comment.created)}}</p>
        </div>
        <div class="addComment" v-if="user">
          <form @submit.prevent="addComment">
            <input class="commentHere" type="text" v-model="newText" placeholder="Comment">
            <button type="submit">Post comment</button>
          </form>
        </div>
        <div v-else>
          <p>Log in to post a comment!</p>
        </div>
      </div>
    </div>
    <h2 v-if="error">{{error}}</h2>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  export default {
    name: 'Photo',
    data() {
      return {
        meme: null,
        comments: [],
        newText: '',
        error: '',
      }
    },
    async created() {
      await this.getPhoto();
      await this.getComments();
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    computed: {
      user() {
        return this.$root.$data.user;
      }
    },
    methods: {
      async getPhoto() {
        try {
          let response = await axios.get("/api/memes/" + this.$route.params.id);
          this.meme = response.data;
        } catch (error) {
          this.error = error.response.data.message;
        }
      },
      async getComments() {
        try {
          let response = await axios.get("/api/comments/" + this.meme._id);
          this.comments = response.data;
        } catch (error) {
          this.error = error.response.data.message;
        }
      },
      async addComment() {
        try {
          await axios.post('/api/comments/', {
            user: this.$root.$data.user,
            meme: this.meme,
            text: this.newText,
          });
          this.text = "";
          this.getComments();
        } catch (error) {
          this.error = error.response.data.message;
        }
      },
      formatDate(date) {
        if (moment(date).diff(Date.now(), 'days') < 15)
          return moment(date).fromNow();
        else
          return moment(date).format('d MMMM YYYY');
      }
    },
  }
</script>

<style scoped>
  .bigContainer {
    display: flex;
    flex-direction: row;
    margin-top: 75px;
    justify-content: space-around;
    width: 100%;
  }

  .currentPhoto {
    max-width: 100%;
  }

  .info {
    display: flex;
    max-width: 40%;
    flex-direction: column;
    justify-content: center;
  }

  .belowPhoto {
    display: flex;
    max-width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }

  .comContainer {
    border: solid black 1px;
  }

  .commentDetails {
    display: flex;
    justify-content: space-between;
  }

  .description {
    display: flex;
    max-width: 40%;
    flex-direction: column;
    justify-content: center;
  }
</style>
