import Vue from 'vue';

declare module 'vue/types/vue' {
  import { AxiosInstance } from 'axios';

  interface VueConstructor {
    $http: AxiosInstance;
  }
}
