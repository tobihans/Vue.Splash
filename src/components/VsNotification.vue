<template>
  <div :class="['message', type]">
    <span class="title" v-show="title.length > 0">
      {{ title }}
    </span>
    <span class="content">
      {{ content }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const VsProps = Vue.extend({
  props: {
    content: String,
    type: String,
    autoclose: {
      type: Number,
      required: false,
      default: () => 0,
    },
    dismissible: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    title: {
      type: String,
      required: false,
      default: () => '',
    },
  },
});

@Component
export default class VsNotification extends VsProps {

}
</script>

<style lang="scss" scoped>
.message {
  font-family: "Nt Sans", sans-serif;
  min-height: calc(32px + 0.30em + 2px);
  min-width: 286px;
  width: 100%;
  margin-top: 1.5em;
  border: none;
  outline: none;
  border-radius: 0.25em;
  cursor: pointer;
  background: #111;
  color: #fff;
}
</style>
