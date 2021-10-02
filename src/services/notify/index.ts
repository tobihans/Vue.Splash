import VsNotification from '@/components/VsNotification.vue';

type Options = {
  position?: Position,
  shape?: 'popup' | 'toast',
  autoclose?: number,
  dismissible?: boolean,
  type?: string,
};

type Notification = {
  title?: string,
  message: string,
};

export default class Notify {
  protected static defaults: Options = {
    position: 'top-center',
    shape: 'toast',
    autoclose: 0,
    dismissible: true,
  };

  protected userDefaults: Options;

  /**
   * Create an instance of Notify
   * User can override all or part of the default options
   * @param defaults the user default options
   */
  constructor(defaults?: Options) {
    if (defaults) {
      this.userDefaults = { ...Notify.defaults, ...defaults };
    } else {
      this.userDefaults = Notify.defaults;
    }
  }

  /**
   * Configures a notification basic params
   * @returns this
   */
  private notify(notif: Notification, options?: Options): Notify {
    const {
      type,
      position,
      autoclose,
      dismissible,
    } = { ...this.userDefaults, ...options };
    const { title, message: content } = notif;
    const notification = new VsNotification({
      propsData: {
        autoclose,
        dismissible,
        type,
        position,
        content,
        title: title || '',
      },
    });
    notification.$mount();
    document.body.appendChild(notification.$el);
    console.log(notification.$el);

    return this;
  }

  /**
   * Informs the user
   * @returns this
   */
  info(notification: Notification, options?: Options): Notify {
    return this.notify(notification, {
      ...options,
      type: 'info',
    });
  }

  /**
   * Warns the user
   * @returns this
   */
  warn(notification: Notification, options?: Options): Notify {
    return this.notify(notification, {
      ...options,
      type: 'warn',
    });
  }

  /**
   * Alerts the user
   * @returns this
   */
  alert(notification: Notification, options?: Options): Notify {
    return this.notify(notification, {
      ...options,
      type: 'danger',
    });
  }
}
