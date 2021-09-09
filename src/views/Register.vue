<template>
  <div id="register">
    <form autocomplete="off" aria-autocomplete="off" @submit.prevent="register">
      <header>
        <img class="logo" src="@/assets/vue.splash.png" alt="Vue.Splash Logo" />
        <p class="small-letters">Talents like you have their place here.</p>
      </header>
      <vs-input
        v-model="username"
        id="email"
        type="text"
        label="Username"
      />
      <vs-input
        v-model="email"
        id="password"
        type="email"
        label="Email"
      />
      <vs-input
        v-model="password"
        id="password"
        type="password"
        label="Password"
      />
      <vs-input
        v-model="confirmPassword"
        id="password"
        type="password"
        label="Confirm Password"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import VsInput from '@/components/VsInput.vue';
import VsButton from '@/components/VsButton.vue';

@Component({
  components: {
    VsInput,
    VsButton,
  },
})
export default class Homepage extends Vue {
  private username = '';

  private email = '';

  private password = '';

  private confirmPassword = '';

  private messages: Array<string> = [];

  async register(): Promise<void> {
    try {
      const { data } = await this.$http.post('Auth/register', {
        Email: this.email,
        Username: this.username,
        Password: this.password,
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style lang="scss" scoped>
#register {
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
