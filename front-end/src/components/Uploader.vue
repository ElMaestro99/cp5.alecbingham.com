<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-container">
      <form class="pure-form" @submit.prevent="upload">
        <legend>Upload a picture</legend>
        <fieldset>
          <input v-model="title" placeholder="Title">
        </fieldset>
        <fieldset>
          <div class="tagHolder">
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
        </fieldset>
        <fieldset>
          <div class="imageInput" @click="chooseImage">
            <img v-if="url" :src="url" />
            <div v-if="!url" class="placeholder">
              Choose an Image
            </div>
            <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
          </div>
          <p v-if="error" class="error">{{error}}</p>
        </fieldset>
        <fieldset class="buttons">
          <button type="button" @click="close" class="pure-button">Close</button>
          <button type="submit" class="pure-button pure-button-primary right">Upload</button>
        </fieldset>
      </form>
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      title: '',
      tag1: false,
      tag2: false,
      tag3: false,
      tag4: false,
      tag5: false,
      tag6: false,
      tag7: false,
      url: '',
      file: null,
      error: '',
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    close() {
      this.$emit('close');
    },
    chooseImage() {
        this.$refs.fileInput.click()
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('meme', this.file, this.file.name);
        formData.append('title', this.title);
        formData.append('tag1', this.tag1);
        formData.append('tag2', this.tag2);
        formData.append('tag3', this.tag3);
        formData.append('tag4', this.tag4);
        formData.append('tag5', this.tag5);
        formData.append('tag6', this.tag6);
        formData.append('tag7', this.tag7);
        await axios.post("/api/memes", formData);
        this.file = null;
        this.url = "";
        this.title = "";
        this.tag1 = false;
        this.tag2 = false;
        this.tag3 = false;
        this.tag4 = false;
        this.tag5 = false;
        this.tag6 = false;
        this.tag7 = false;
        this.$emit('uploadFinished');
      } catch (error) {
        this.error = "Error: " + error.response.data.message;
      }
    },
  },
}
</script>

<style scoped>
/* Modals */
.modal-mask {
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: inherit;
  background-color: rgba(0, 0, 0, .3);
  transition: opacity 0.5s ease;
  display: flex;
  transition: background 0.2s ease-in-out, height 1s ease-in-out;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out;
  justify-content: center;
  transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
}

.modal-container {
  width: 50%;
  height: max-content;
  margin-top: 80px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  overflow: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all 0.5s ease;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.tagHolder {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

/* Form */

form {
  font-size: 11pt;
}

input {
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px;
}

.placeholder {
  background: #F0F0F0;
  width: 200px;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.placeholder:hover {
  background: #E0E0E0;
}

.fileInput {
  display: none;
}

img {
  width: 200px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
