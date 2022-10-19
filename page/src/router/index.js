import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  DEFAULT_FROM,
  DEFAULT_TO
} from "@/common/language.helper";
import {
  DEFAULT_PART
} from "@/common/helper";
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      redirect: `/${DEFAULT_PART}/${DEFAULT_FROM}/${DEFAULT_TO}`
    },
    {
      path: '/:part/:from/:to',
      name: 'book',
      component: HomeView,
    },
  ]
})

export default router