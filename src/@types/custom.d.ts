/* eslint-disable */
import Vue from 'vue';

declare module 'vue/types/vue' {
  import Notify from "@/services/notify";
  interface Vue {
    $notify: Notify;
  }
}