import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import SingleMeme from '../views/SingleMeme.vue'
import Edit from '../views/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/meme/:id',
    name: 'SingleMeme',
    component: SingleMeme
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
]

const router = new VueRouter({
  routes
})

export default router
