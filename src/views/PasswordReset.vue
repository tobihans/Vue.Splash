<template>
  <div id="password-reset">
    <form id="pwd-reset-form" @submit.prevent="reset">
      <header>
       <img class="logo" src="@/assets/vue.splash.png" alt="Vue.Splash Logo" />
       <p class="small-letters">Recover access to your account.</p>
      </header>
      <vs-input
        v-model="pwd"
        id="pwd"
        type="password"
        :required="true"
        :validator="passwordValidator"
        label="Password"
      />
      <vs-input
        v-model="pwd2"
        id="pwd2"
        type="password"
        :required="true"
        label="Confirm Password"
        :validator="confirmPwdValidator"
      />
     <vs-button type="submit" data-variant="primary">Reset password</vs-button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import { Prop } from 'vue-property-decorator';
import VsInput from '@/components/VsInput.vue';
import VsButton from '@/components/VsButton.vue';
import { passwordValidator } from '@/_helpers/validators';

@Component({
  components: {
    VsInput,
    VsButton,
  },
  methods: {
    passwordValidator,
  },
})
export default class Login extends Vue {
  @Prop({ type: String }) private email!: string;

  @Prop({ type: String }) private token!: string;

  private pwd = '';

  private pwd2 = '';

  private passwordValidator!: (input: string) => InputValidationResult;

  confirmPwdValidator(content: string): InputValidationResult {
    if (this.pwd === content) {
      return true;
    }
    return {
      state: 'danger',
      title: 'Passwords doesn\'t match.',
    };
  }

  async reset(): Promise<void> {
    this.$loading(true);
    try {
      await axios.post(`${process.env.VUE_APP_BACKEND_URL}password/reset`, {
        Email: this.email,
        Token: this.token.replaceAll(/\s+/g, '+'),
        Password: this.pwd,
        ConfirmPassword: this.pwd2,
      });
      this.$router.push({ name: 'Login' });
    } catch {
      this.$notify.alert({
        message: 'An error occured. Please restart the process.',
      });
    } finally {
      this.$loading(false);
    }
  }
}
</script>

<style lang="scss" scoped>
#password-reset {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
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

a span {
  text-decoration: underline;
}
</style>
