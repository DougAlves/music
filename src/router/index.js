import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const Home = () => import('@/views/HomeView.vue');
const ManageView = () => import('@/views/ManageView.vue');
const AboutView = () => import('@/views/AboutView.vue');
const Song = () => import('@/views/Song.vue');

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'about',
    path: '/about',
    component: AboutView,
  },
  {
    name: 'manage',
    path: '/manage-music',
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (to, from, next) => {
      console.log('route guard');
      next();
    },
    component: ManageView,
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song,
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  if (store.state.auth.userLoggedIn) {
    next();
    return;
  }
  next({ name: 'home' });
});

export default router;
