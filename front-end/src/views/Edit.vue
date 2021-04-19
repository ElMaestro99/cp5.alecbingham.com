<template>
<div>
  <div class="edit" v-if="user">
    <div class="heading">
      <h1>Edit/Delete</h1>
    </div>
    <div class="editBody">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectMeme(s)"> {{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findMeme">
        <input v-model="findMeme.title">
        <img id="selectedMemePhoto" :src="findMeme.path" />
      </div>
      <div class="newTags" v-if="findMeme">
        <input type="checkbox" v-model="tag1" id="tag1" name="tag1" value="Textpost">
        <label for="tag1">Textpost</label><br>
        <input type="checkbox" v-model="tag2" id="tag2" name="tag2" value="Punny">
        <label for="tag2">Punny</label><br>
        <input type="checkbox" v-model="tag3" id="tag3" name="tag3" value="Starwars">
        <label for="tag3">Star Wars</label><br>
        <input type="checkbox" v-model="tag4" id="tag4" name="tag4" value="CurrentEvents">
        <label for="tag4">Current Events</label><br>
        <input type="checkbox" v-model="tag5" id="tag5" name="tag5" value="Classics">
        <label for="tag5">Classics</label><br>
        <input type="checkbox" v-model="tag6" id="tag6" name="tag6" value="Wholesome">
        <label for="tag6">Wholesome</label><br>
        <input type="checkbox" v-model="tag7" id="tag7" name="tag7" value="Others">
        <label for="tag7">Other</label><br>
      </div>
      <div class="actions" v-if="findMeme">
        <button @click="deleteMeme(findMeme)">Delete Meme</button>
        <button @click="edit(findMeme)">Apply New Title & Tags</button>
      </div>
    </div>
  </div>

  <div v-else>
    <h1>Login to edit or delete your photos</h1>
  </div>

</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Edit',
  data() {
    return {
      memes: [],
      findMeme: null,
      findTitle: "",
      tag1: false,
      tag2: false,
      tag3: false,
      tag4: false,
      tag5: false,
      tag6: false,
      tag7: false,
    }
  },
  computed: {
    suggestions() {
      let memes = this.memes.filter(meme => meme.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return memes.sort((a, b) => a.title > b.title);
    },
    user() {
      return this.$root.$data.user;
    }
  },
  created() {
    this.getMemes();
  },
  methods: {
    async getMemes() {
      try {
        this.response = await axios.get("/api/memes");
        this.memes = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    selectMeme(s) {
      this.findTitle = "";
      this.findMeme = s;
    },
    async deleteMeme(s) {
      try {
        await axios.delete("/api/memes/" + s._id);
        this.findMeme = null;
        this.getMemes();
        await axios.delete("/api/comments/" + s._id);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async edit(s) {
      try {
        await axios.put("/api/memes/" + s._id, {
          title: s.title,
          tag1: this.tag1,
          tag2: this.tag2,
          tag3: this.tag3,
          tag4: this.tag4,
          tag5: this.tag5,
          tag6: this.tag6,
          tag7: this.tag7,
        });
        this.findMeme = null;
        this.getMemes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.admin {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.heading {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
  flex-direction: column;
}

.editBody {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 1em;
}

/* Uploaded images */
.upload {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-right: 15px;
}

.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

.newTags {
  margin-left: 15px;
  margin-right: 15px;
}

.actions {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100px;
  margin-left: 15px;
  margin-right: 15px;
}

#selectedMemePhoto {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

</style>
