import { mount, RouterLinkStub } from '@vue/test-utils';
import ForgotPassword from '@/views/ForgotPassword.vue';

describe('ForgotPassword.vue', () => {
  test('Make api call with user email and feedback the user', async () => {
    const $http = {
      post: jest.fn(),
    };
    const wrapper = mount(ForgotPassword, {
      mocks: {
        $loading: jest.fn(),
        $http,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    await wrapper.find('div.input-group input#email').setValue('vue@splash.net');
    await wrapper.find('form').trigger('submit.prevent');
    await wrapper.vm.$nextTick;

    expect($http.post).toHaveBeenCalledWith('password/forgot', {
      Email: 'vue@splash.net',
    });
    expect(await wrapper.find('#inform-user').text())
      .toContain('An email was sent to vue@splash.net. Check your inbox.');
  });

  test('Handles invalid email address case', async () => {
    const $http = {
      post: () => Promise.reject(),
    };
    const $notify = {
      alert: jest.fn(),
    };
    const wrapper = mount(ForgotPassword, {
      mocks: {
        $loading: jest.fn(),
        $http,
        $notify,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    await wrapper.find('div.input-group input#email').setValue('vue@splash.net');
    await wrapper.find('form').trigger('submit.prevent');

    expect($notify.alert).toHaveBeenCalled();
  });
});
