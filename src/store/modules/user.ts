import { Module } from 'vuex';

type UserState = {
  loggedIn: boolean,
};

const module: Module<UserState, unknown> = {
  namespaced: true,
  state: {
    loggedIn: false,
  },
  getters: {
    isAuthenticated({ loggedIn }: UserState) {
      return loggedIn;
    },
  },
  mutations: {},
  actions: {},
};

export default module;
