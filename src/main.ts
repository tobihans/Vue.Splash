import Vue from 'vue';
import Unicon from 'vue-unicons/dist/vue-unicons-vue2.umd';
import { uniExclamationTriangleMonochrome, uniMultiply } from 'vue-unicons/dist/icons';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from '@/network';
import '@/assets/fonts/fonts.css';
import Notify from '@/services/notify';
import loaderPlugin from '@/plugins/loader';

Unicon.add([uniExclamationTriangleMonochrome, uniMultiply]);
Vue.use(Unicon);
Vue.use(loaderPlugin);

Vue.prototype.$http = axios;
Vue.prototype.$notify = new Notify();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
