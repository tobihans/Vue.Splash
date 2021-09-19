import { mount } from '@vue/test-utils';
import ForgotPassword from '@/views/ForgotPassword.vue';

describe('ForgotPassword.vue', () => {
  test('Make api call with user email and feedback the user', async () => {
    const $http = {
      post: jest.fn(),
    };
    const wrapper = mount(ForgotPassword, {
      mocks: {
        $http,
      },
    });

    await wrapper.find('div.input-group input#email').setValue('vue@splash.net');
    await wrapper.find('form').trigger('submit.prevent');

    expect($http.post).toHaveBeenCalledWith('/api/password/forgot', {
      email: 'vue@splash.net',
    });
    expect(wrapper.html())
      .toContain('An email was sent to vue@splash.net. Check your inbox.');
  });

  test('Handles invalid email address case', async () => {
    const $http = {
      post: () => Promise.resolve({ status: 500 }),
    };
    const $notify = {
      alert: jest.fn(),
    };
    const wrapper = mount(ForgotPassword, {
      mocks: {
        $http,
        $notify,
      },
    });

    await wrapper.find('div.input-group input#email').setValue('vue@splash.net');
    await wrapper.find('form').trigger('submit.prevent');

    expect($notify.alert).toHaveBeenCalled();
  });
});
