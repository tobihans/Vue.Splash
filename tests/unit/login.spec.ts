import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Login from '@/views/Login.vue';

describe('Login.vue', () => {
  test('Show warning when email is incorrect', async () => {
    const wrapper = mount(Login);

    await wrapper.find('div.input-group input#email').setValue('dev-at-dev.io');
    await wrapper.find('div.input-group input#password').setValue('fakepwd');
    await wrapper.find('form#login-form').trigger('submit.prevent');

    const err = wrapper.find('div.input-group .warning');
    expect(err).toBeTruthy();
    expect(err).toContain('not a valid email address');
  });

  test('Inform user when network error occured', async () => {
    const $http = {
      post: () => new Promise((_, reject) => reject(new Error())),
    };
    const wrapper = mount(Login, {
      mocks: {
        $http,
      },
    });

    await wrapper.find('div.input-group input#email').setValue('learn@gmail.com');
    await wrapper.find('div.input-group input#password').setValue('fakepwd');
    await wrapper.find('form#login-form').trigger('submit.prevent');

    await flushPromises();

    expect(wrapper.find('.message').text()).toBe('An error occured. Please check your connection and retry.');
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
