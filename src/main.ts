import Vue from 'vue';
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd';
import { uniExclamationTriangleMonochrome } from 'vue-unicons/dist/icons';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@/network';
import './assets/fonts/fonts.css';

Unicon.add([uniExclamationTriangleMonochrome]);
Vue.use(Unicon);

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
