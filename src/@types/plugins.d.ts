/* eslint-disable */
import Vue from 'vue';

declare module 'vue/types/vue' {
  import { AxiosInstance } from 'axios';

  interface Vue {
    $loading: AxiosInstance;
  }
}
