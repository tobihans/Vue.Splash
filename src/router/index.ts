import Vue from 'vue';
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "authentication" */ '../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "authentication" */ '../views/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'Forgot-Password',
    component: () => import(/* webpackChunkName: "account-recovery" */ '../views/ForgotPassword.vue'),
  },
  {
    path: '/homepage',
    name: 'Homepage',
    component: () => import(/* webpackChunkName: "home" */ '../views/Homepage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  if (to.matched.some((x) => x.meta.requiresAuth) && !store.getters['user/isAuthenticated']) {
    next('/login');
  } else {
    next();
  }
});

export default router;
