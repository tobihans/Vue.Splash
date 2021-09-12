import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
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
      stubs: ['router-link'],
    });

    await wrapper.find('div.input-group input#email').setValue('learn@gmail.com');
    await wrapper.find('div.input-group input#password').setValue('fakepwd');
    await wrapper.find('form#login-form').trigger('submit.prevent');

    await flushPromises();

    expect(wrapper.find('.notification')).toBeTruthy();
  });

  test('Redirect to dashboard when succesfully logged in and update store', async () => {
    const $http = {
      post: () => new Promise((resolve) => resolve({ data: {} })),
    };
    const $store = {
      modules: {
        user: {
          state: {},
          actions: {
            authenticate: jest.fn(),
          },
        },
      },
    };
    const $router = {

    };
    const wrapper = mount(Login, {
      mocks: {
        $http,
        $store,
        $router,
      },
    });

    await wrapper.find('div.input-group input#email').setValue('learn@gmail.com');
    await wrapper.find('div.input-group input#password').setValue('fakepwd');
    await wrapper.find('form#login-form').trigger('submit.prevent');

    await flushPromises();

    expect($store.modules.user.actions.authenticate).toHaveBeenCalled();
  });
});
