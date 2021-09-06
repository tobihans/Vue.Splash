<template>
  <div class="home">
  </div>
</template>

<script lang='ts'>

export default {
  name: 'Home',
  mounted(): void {
    console.log(process.env.VUE_APP_ENV);
    console.log(this.$http);
  },
};
</script>
