import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Step from '@/views/Step.vue'
import Page from '@/views/Page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/step',
    name: 'step',
    component: Step
  },
  {
    path: '/page/:slug',
    name: 'page',
    component: Page
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach(() => {
  router.app.$mixpanel.track('view')
})

export default router
