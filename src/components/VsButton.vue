<template>
  <button v-bind="$attrs">
    <slot>
    </slot>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class VsButton extends Vue {

}
</script>

<style lang="scss" scoped>
button {
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
