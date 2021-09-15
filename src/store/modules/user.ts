import { Module } from 'vuex';

const MUTATION_TYPES = {
  SET_USERNAME: 'SET_USERNAME',
  SET_EMAIL: 'SET_EMAIL',
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SET_AUTH_STATE: 'SET_AUTH_STATE',
  RESET_ALL: 'RESET_ALL',
};

type UserState = {
  loggedIn: boolean,
  email: string,
  username: string,
  token: string,
};

const module: Module<UserState, unknown> = {
  namespaced: true,
  state: {
    loggedIn: false,
    email: '',
    username: '',
    token: '',
  },
  getters: {
    isAuthenticated({ loggedIn }: UserState): boolean {
      return loggedIn;
    },
    authorization({ token }): string {
      return token;
    },
  },
  mutations: {
    [MUTATION_TYPES.SET_USERNAME](state: UserState, username: string) {
      state.username = username;
    },
    [MUTATION_TYPES.SET_EMAIL](state: UserState, email: string) {
      state.email = email;
    },
    [MUTATION_TYPES.SET_AUTH_TOKEN](state: UserState, token: string) {
      state.token = token;
    },
    [MUTATION_TYPES.SET_AUTH_STATE](state: UserState) {
      state.loggedIn = !state.loggedIn;
    },
    [MUTATION_TYPES.RESET_ALL](state: UserState) {
      state.loggedIn = false;
      state.email = '';
      state.username = '';
      state.token = '';
    },
  },
  actions: {
    authenticate({ commit }, payload: {[key: string]: string}) {
      if ('email' in payload) {
        commit(MUTATION_TYPES.SET_EMAIL, payload.email);
      }
      if ('username' in payload) {
        commit(MUTATION_TYPES.SET_USERNAME, payload.username);
      }
      if ('token' in payload) {
        commit(MUTATION_TYPES.SET_AUTH_TOKEN, payload.token);
      }
    },
    logout({ commit }) {
      commit(MUTATION_TYPES.RESET_ALL);
    },
  },
};

export default module;
