<template>
  <div id="app">
    <div class="header">
        <div class="title">
          <h1>Memes R Us</h1>
        </div>
      <div class="dashLink">
        <router-link to="/">
          <h2>Home</h2>
        </router-link>
        <router-link to="/dashboard">
          <h2>My Profile</h2>
        </router-link>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <a id="gitLink" href="https://github.com/ElMaestro99/cp5.alecbingham.com.git">GitHub</a>
      <a>Hours Spent: 8</a>
    </div>

  </div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px 100px 0px 100px;
  background-color: #4D85A8;
  color: #E9fff9;
}

.dashLink {
  display: flex;
  justify-content: space-around;
}

body {
  background-color: #B4DEF8;
}

.header a {
  color: #850A21;
  text-decoration: none;
}

.title {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  color: #850A21;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 20px;
  min-height: 700px;
}

/* Footer */
.footer {
  display: flex;
  justify-content: space-around;
  height: 50px;
  padding: 20px 100px 0px 100px;
  background-color: #4D85A8;
  font-size: 12px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
