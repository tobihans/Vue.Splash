import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Register from '@/views/Register.vue';

describe('Register.vue', () => {
  test('Inform user when network error occured', async () => {
    const $http = {
      post: () => new Promise((_, reject) => reject(new Error())),
    };
    const wrapper = mount(Register, {
      mocks: {
        $http,
      },
      stubs: ['router-link'],
    });

    await wrapper.find('div.input-group input#username').setValue('hans');
    await wrapper.find('div.input-group input#email').setValue('learn@gmail.com');
    await wrapper.find('div.input-group input#password').setValue('fakepwd');
    await wrapper.find('div.input-group input#confirm-password').setValue('fakepwd');
    await wrapper.find('form#register-form').trigger('submit.prevent');

    await flushPromises();

    expect(wrapper.find('.notification')).toBeTruthy();
  });
});
