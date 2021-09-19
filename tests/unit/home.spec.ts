import { createLocalVue, mount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import Home from '@/views/Home.vue';
import Register from '@/views/Register.vue';

describe('Home', () => {
  test('Redirect to register with email as query when filled', async () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const router = new VueRouter({
      mode: 'abstract',
      routes: [
        {
          path: '/',
          component: Home,
        },
        {
          path: '/register',
          component: Register,
        },
      ],
    });
    const wrapper = mount(App, {
      localVue,
      router,
    });

    await wrapper.find('input#email').setValue('vue@splash.net');
    await wrapper.find('form#get-started').trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    expect(router.currentRoute.path).toBe('/register');
    expect(router.currentRoute.query).toBe({
      addr: 'vue@splash.net',
    });
    expect(wrapper.findComponent(Register).exists()).toBe(true);
  });
});
