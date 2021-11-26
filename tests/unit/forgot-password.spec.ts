import { mount, RouterLinkStub } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import axios from 'axios';
import ForgotPassword from '@/views/ForgotPassword.vue';

jest.mock('axios');

describe('ForgotPassword.vue', () => {
  test('Make api call with user email and feedback the user', async () => {
    const wrapper = mount(ForgotPassword, {
      mocks: {
        $loading: jest.fn(),
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    await wrapper.find('div.input-group input#email').setValue('vue@splash.net');
    await wrapper.find('form').trigger('submit.prevent');
    await wrapper.vm.$nextTick();

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/password/forgot', {
      Email: 'vue@splash.net',
    });
    expect(wrapper.find('#inform-user').text())
      .toContain(
        'An email with instructions to follow, will be sent to vue@splash.net if your account exists.',
      );
  });

  test('Handles error cases', async () => {
    (axios as any).get.mockImplementation(() => Promise.reject(Error()));
    const $notify = {
      alert: jest.fn(),
    };
    const wrapper = mount(ForgotPassword, {
      mocks: {
        $loading: jest.fn(),
        $notify,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    await wrapper.find('div.input-group input#email').setValue('vue@splash.net');
    await wrapper.find('form').trigger('submit.prevent');

    await flushPromises();

    await wrapper.vm.$nextTick();

    const notification = wrapper.find('div.message');
    expect(notification).not.toBeNull();
  });
});
