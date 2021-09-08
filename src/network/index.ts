import axios, { AxiosError, AxiosResponse } from 'axios';
import store from '@/store';

const instance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
});

/**
 * Reload the browser as soon as called
 * This is a hack as `location.reload(true)` to force reload,
 * is deprecated.
 */
const forceReload = () => {
  if (process.env.NODE_ENV === 'production') {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = window.location.href;
    document.body.appendChild(form);
    form.submit();
  } else {
    window.location.reload();
  }
};

/**
 * Response handler for custom axios instance interceptor
 * It doesn't do anything in this case
 * @param response, the AxiosResponse instance from the request
 * @returns response
 */
const onSuccess = (response: AxiosResponse) => response;

/**
 * Error handler for custom axios instance interceptor
 * @param error
 */
const onError = (error: AxiosError) => {
  switch (error.response?.status) {
    // Not authenticated
    case 401:
    case 419:
      // Reset auth header and force reload the browser
      // and send user to login
      store.dispatch('user/logout');
      instance.defaults.headers.common.Authorization = '';
      forceReload();
      break;
    default:
      break;
  }
  return Promise.reject(error);
};

instance.interceptors.response.use(onSuccess, onError);

export default instance;
