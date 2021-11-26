import Vue from 'vue';

declare module 'vue/types/vue' {
  import { Loader } from '@/plugins/loader';

  interface Vue {
    $loading: Loader;
  }
}
