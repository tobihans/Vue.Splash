type Options = {
  parent?: Element,
  position?: Position,
  type?: 'popup' | 'toast',
  autoclose?: number,
  dismissible?: boolean,
};

type Notification = {
  title?: string,
  message: string,
};

export default class Notify {
  protected static defaults: Options = {
    parent: document.body,
    position: 'top-center',
    type: 'toast',
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
  private notify(): Notify {
    return this;
  }

  /**
   * Informs the user
   * @returns this
   */
  info(notification: Notification, options?: Options): Notify {
    return this;
  }

  /**
   * Warns the user
   * @returns this
   */
  warn(notification: Notification, options?: Options): Notify {
    return this;
  }

  /**
   * Alerts the user
   * @returns this
   */
  alert(notification: Notification, options?: Options): Notify {
    return this;
  }

  /**
   * Set a delay to close the notification
   * @param delay the number of seconds to wait before closing
   * @returns this
   */
  closeAfter(delay: number): Notify {
    return this;
  }

  /**
 * Show the notification
 * @param at a position that overrides the default one
 */
  show(at?: Position): void {
    throw Error('Not implemented');
  }
}
