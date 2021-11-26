import { PluginFunction } from 'vue';

const route = (path = ''): string => `${window.location.origin}/${path}`;

const helpersPlugin: PluginFunction<never> = (Vue) => {
  Vue.mixin({
    methods: {
      route,
    },
  });
};
export default helpersPlugin;
