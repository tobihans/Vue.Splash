<template>
  <div id="forgot-password">
    <transition>
      <form v-if="step === 1" id="reset-form" @submit.prevent="askForReset">
        <header>
          <img
            class="logo"
            src="@/assets/vue.splash.png"
            alt="Vue.Splash Logo"
          />
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
        <vs-button type="submit" data-variant="primary">
          Send password reset link
        </vs-button>
        <router-link to="/login" class="back small-letters">
          &lt;&nbsp;Go back
        </router-link>
      </form>
      <span v-else>
        <span id="inform-user">
          An email with instructions to follow, will be sent to {{ email }} if your account exists.
        </span>
        <vs-button data-variant="primary">
          <router-link to="/login" class="back">
            &nbsp;Go to login page
          </router-link>
        </vs-button>
      </span>
    </transition>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
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
      await axios.post(`${process.env.VUE_APP_BACKEND_URL}password/forgot`, {
        Email: this.email,
      });
      this.step = 2;
    } catch (_e) {
      // eslint-disable-next-line
      const e = _e as any;
      if (e.response) {
        switch (e.response?.status) {
          case 404:
            this.$notify.alert({
              message: `There is no account associated with ${this.email}`,
            });
            break;
          default:
            this.$notify.alert({
              message: 'An unknow error occured. Please, try later.',
            });
            break;
        }
      } else {
        this.$notify.alert({
          message: 'A network error occured. Check your connection.',
        });
      }
    } finally {
      this.$loading(false);
    }
  }
}
</script>

<style lang="scss" scoped>
#forgot-password, #inform-user {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#inform-user {
 max-width: 370px;
 text-align: center;
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
  margin: 0.5em auto;
  color: #f5f5f5;
}
</style>
