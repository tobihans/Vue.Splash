<template>
  <div id="register">
    <span class="message" ref="message"></span>
    <form v-if="step === 1" id="register-form" @submit.prevent="register">
      <header>
        <img class="logo" src="@/assets/vue.splash.png" alt="Vue.Splash Logo"/>
        <p class="small-letters">Talents like you have their place here.</p>
      </header>
      <vs-input
        v-model="username"
        id="username"
        type="text"
        :required="true"
        label="Username"
        :validator="usernameValidator"
      />
      <vs-input
        v-model="email"
        id="email"
        type="email"
        :required="true"
        label="Email"
        :validator="emailValidator"
      />
      <vs-input
        v-model="password"
        id="password"
        type="password"
        :required="true"
        label="Password"
        :validator="passwordValidator"
      />
      <vs-input
        v-model="confirmPassword"
        id="confirm-password"
        type="password"
        :required="true"
        label="Confirm Password"
        :validator="confirmPwdValidator"
      />
      <vs-button type="submit" data-variant="primary">Register</vs-button>
      <footer>
        <p class="small-letters">
          Have an account?
          <router-link :to="{ name: 'Login' }">
            <span>Login</span>
          </router-link>
        </p>
      </footer>
    </form>
    <form v-else id="register-form" @submit.prevent="verifyEmail">
      <header>
        <h3>Email Verification</h3>
        <p class="small-letters">Paste the token sent to <strong>{{ email }}</strong> below.</p>
      </header>
      <vs-input
        v-model="token"
        id="token"
        type="text"
        :required="true"
      />
      <vs-button type="submit" data-variant="primary">Verify Email</vs-button>
      <footer>
        <p class="small-letters" @click="sendCode">
          Resend the code
        </p>
      </footer>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import VsInput from '@/components/VsInput.vue';
import VsButton from '@/components/VsButton.vue';
import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from '@/_helpers/validators';

@Component({
  components: {
    VsInput,
    VsButton,
  },
  methods: {
    emailValidator,
    usernameValidator,
    passwordValidator,
  },
})
export default class Register extends Vue {
  private username = '';

  private email = '';

  private password = '';

  private confirmPassword = '';

  private step: 1 | 2 = 1;

  private token = '';

  private emailValidator!: (input: string) => InputValidationResult;

  passwordValidator!: (input: string) => InputValidationResult;

  usernameValidator!: (input: string) => InputValidationResult;

  confirmPwdValidator(content: string): InputValidationResult {
    if (this.password === content) {
      return true;
    }
    return {
      state: 'danger',
      title: 'Passwords doesn\'t match.',
    };
  }

  async register(): Promise<void> {
    this.$loading(true);
    try {
      await this.$http.post('Auth/register', {
        Email: this.email,
        Username: this.username,
        Password: this.password,
      });
      this.sendCode();
      this.step = 2;
    } catch { } finally {
      this.$loading(false);
    }
  }

  async verifyEmail(): Promise<void> {
    this.$loading(true);
    try {
      await this.$http.post('email/verify', {
        Email: this.email,
        Token: this.token,
      });
      this.$router.push({ name: 'Homepage' });
    } catch { } finally {
      this.$loading(false);
    }
  }

  async sendCode(): Promise<void> {
    this.$loading(true);
    try {
      await this.$http.post('email', {
        Email: this.email,
      });
    } catch { } finally {
      this.$loading(false);
    }
  }

  mounted(): void {
    // Prefills email address if set in query
    // Doesn't do that for invalid addresses
    const email = this.$route.query.addr as string;
    if (this.emailValidator(email) === true) this.email = email;
  }
}
</script>

<style lang="scss" scoped>
#register {
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
  margin: 0 1.5em;
  padding: 1em;
  border: 0.4px solid rgba(17, 17, 17, 0.4);
  border-radius: 0.2em;
  max-width: 500px;
}

.small-letters {
  margin-top: 0.5em;
  text-align: center;
}

a span {
  text-decoration: underline;
}
.message {
  margin-bottom: 20px;
}
</style>
