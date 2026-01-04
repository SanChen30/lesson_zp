import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import your components
import Home from './components/Home.vue'
import About from './components/About.vue'

// Define your routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create the app instance and use the router
const app = createApp(App)
app.use(router)

// Mount the app
app.mount('#app')