import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Vuex from 'vuex';
import Login from '@/views/Login.vue';

describe('Login.vue', () => {
  test('Inform user when network error occured', async () => {
    const $http = {
      post: () => new Promise((_, reject) => reject(new Error())),
    };
    const wrapper = mount(Login, {
      mocks: {
        $http,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    await wrapper.find('div.input-group input#email').setValue('learn@gmail.com');
    await wrapper.find('div.input-group input#password').setValue('fakepwd');
    await wrapper.find('form#login-form').trigger('submit.prevent');

    await flushPromises();

    expect(wrapper.find('.notification')).toBeTruthy();
  });

  test('Update store on login and redirects', async () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const $http = {
      post: () => new Promise((resolve) => resolve({ data: { token: 'blabla' } })),
    };
    const $router = {
      push: jest.fn(),
    };
    const actions = {
      authenticate: jest.fn(),
    };
    const store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          state: {},
          actions,
        },
      },
    });
    const wrapper = mount(Login, {
      localVue,
      store,
      mocks: {
        $http,
        $router,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    await wrapper.find('div.input-group input#email').setValue('learn@gmail.com');
    await wrapper.find('div.input-group input#password').setValue('fakepwd');
    await wrapper.find('form#login-form').trigger('submit.prevent');

    await flushPromises();

    expect(actions.authenticate).toHaveBeenCalledWith(expect.any(Object), {
      email: 'learn@gmail.com',
      token: 'blabla',
    });
    expect($router.push).toHaveBeenCalledWith({ name: 'Homepage' });
  });
});
