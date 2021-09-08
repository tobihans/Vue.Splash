<template>
  <div class="home">
  </div>
</template>

<script lang='ts'>
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class Home extends Vue {
  mounted(): void {
    console.log(this.$http);
  }
}
</script>
