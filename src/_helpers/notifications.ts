import VsNotification from '@/components/VsNotification.vue';

export function alert(ref: Element | undefined, content: string): void {
  const notification = new VsNotification({
    propsData: {
      content,
      autoclose: 0,
      dismissible: true,
      type: 'danger',
    },
  });
  notification.$mount();
  if (ref) ref.appendChild(notification.$el);
  else document.body.appendChild(notification.$el);
}

export default {};
