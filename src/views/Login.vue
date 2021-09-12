<template>
  <div id="login">
    <!-- Errors messages -->
    <span ref="notify"></span>
    <form id="login-form" @submit.prevent="login">
      <header>
        <img class="logo" src="@/assets/vue.splash.png" alt="Vue.Splash Logo" />
        <p class="small-letters">Welcome back.</p>
      </header>
      <vs-input
        v-model="identifier"
        id="email"
        type="text"
        :required="true"
        :validator="validateUsernameOrEmail"
        label="Username / Email"
      />
      <vs-input
        v-model="password"
        id="password"
        type="password"
        :required="true"
        label="Password"
      />
      <vs-button type="submit" data-variant="primary">Login</vs-button>
      <footer>
        <p class="small-letters">
          Don't have an account?
          <router-link :to="{ name: 'Register' }"
            ><span>Join us</span></router-link
          >
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
import { validateUsernameOrEmail } from '@/_helpers/validators';
import { alert } from '@/_helpers/notifications';

@Component({
  components: {
    VsInput,
    VsButton,
  },
  methods: {
    validateUsernameOrEmail,
  },
})
export default class Login extends Vue {
  private identifier = '';

  private password = '';

  private messages: Array<string> = [];

  //
  validateUsernameOrEmail!: (input: string) => InputValidationResult;

  async login(): Promise<void> {
    try {
      const { data } = await this.$http.post('Auth/login', {
        Identifier: this.identifier,
        Password: this.password,
      });
      console.log(data);
    } catch (e) {
      alert((this.$refs.notify as Element), e.toString());
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
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

a span {
  text-decoration: underline;
}
</style>
