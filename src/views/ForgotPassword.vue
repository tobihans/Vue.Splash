<template>
  <div id="forgot-password">
    <transition>
      <form v-if="step === 1" id="reset-form" @submit.prevent="askForReset">
        <header>
          <img class="logo" src="@/assets/vue.splash.png" alt="Vue.Splash Logo" />
          <p class="small-letters">Recover your account</p>
        </header>
        <vs-input
          v-model="email"
          id="email"
          type="text"
          :required="true"
          :validator="emailValidator"
          label="Email Address"
        />
        <vs-button type="submit" data-variant="primary"
          >Send password reset link</vs-button
        >
        <vs-button data-variant="primary">
          <router-link to="/login" class="back"> &lt;&nbsp;Go back </router-link>
        </vs-button>
      </form>
      <span v-else>
          <span id="inform-user">An email was sent to {{ email }}. Check your inbox.</span>
          <vs-button data-variant="primary">
            <router-link to="/login" class="back">
              &lt;&nbsp;Go back
            </router-link>
          </vs-button>
      </span>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import VsInput from '@/components/VsInput.vue';
import VsButton from '@/components/VsButton.vue';
import { emailValidator } from '@/_helpers/validators';

@Component({
  components: {
    VsInput,
    VsButton,
  },
  methods: {
    emailValidator,
  },
})
export default class ForgotPassword extends Vue {
  private email = '';

  private step = 1;

  emailValidator!: (input: string) => InputValidationResult;

  async askForReset(): Promise<void> {
    this.$loading(true);
    try {
      await this.$http.post('password/forgot', {
        Email: this.email,
      });
      this.step = 2;
    } catch { } finally {
      this.$loading(false);
    }
  }
}
</script>

<style lang="scss" scoped>
#forgot-password {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

header {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;

  .logo {
    max-width: 75px;
    height: auto;
  }

  .app-name {
    font-size: 1.5em;
  }
}

form {
  padding: 1em;
  border: 0.4px solid rgba(17, 17, 17, 0.4);
  border-radius: 0.2em;
  max-width: 500px;
}

.small-letters {
  margin-top: 0.5em;
  font-size: 0.85em;
  text-align: center;
}

.back {
  display: block;
  color: #f5f5f5;
}
</style>
