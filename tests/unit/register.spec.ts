import { createLocalVue, mount, RouterLinkStub } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Register from '@/views/Register.vue';

describe('Register.vue', () => {
  test('Prefill email accordingly when passed in url', async () => {
    const localVue = createLocalVue();
    const $route = {
      query: {
        addr: 'vue@splash.net',
      },
    };
    const wrapper = mount(Register, {
      localVue,
      mocks: {
        $route,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    const email = wrapper.find('div.input-group input#email');
    await wrapper.vm.$nextTick();
    expect((email.element as HTMLInputElement).value).toContain('vue@splash.net');
  });

  test('Inform user when network error occured', async () => {
    const localVue = createLocalVue();
    const $http = {
      post: () => new Promise((_, reject) => reject(new Error())),
    };
    const $route = {
      query: {
        addr: 'vue@splash.net',
      },
    };
    const wrapper = mount(Register, {
      localVue,
      mocks: {
        $route,
        $http,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
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
