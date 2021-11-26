<template>
  <div class="verification-status" v-if="verificationSuccess">
    You’re done! You can close this tab now.
  </div>
  <div class="verification-status" v-else-if="hasError">
    <div>
      😕This link is no longer valid. Please restart the process.
    </div>
  </div>
  <div v-else></div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class VerifyEmail extends Vue {
  @Prop({ type: String }) private email!: string;

  @Prop({ type: String }) private token!: string;

  private verificationSuccess = false;

  private hasError = false;

  async mounted(): Promise<void> {
    try {
      this.$loading(true);
      await axios.post(`${process.env.VUE_APP_BACKEND_URL}email/verify`, {
        Email: this.email,
        Token: this.token.replaceAll(/\s+/g, '+'),
      });
      this.verificationSuccess = true;
      const totalOnGoingProcess = Number(localStorage.getItem('totalOnGoingProcess')) ?? 0;
      // If there is no ambiguity(i.e ongoingProcess = 1), we can set the verified account status
      if (+totalOnGoingProcess === 1) window.localStorage.setItem('validated', '^-^');
      this.$loading(false);
    } catch (e) {
      console.log(e);
      this.hasError = true;
      this.$loading(false);
    }
  }
}
</script>

<style lang="scss">
.verification-status {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 1em;
}
</style>
