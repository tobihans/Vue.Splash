import { PluginFunction } from 'vue';

export type Loader = (status: boolean) => void

const loader: Loader = (s: boolean) => {
  const template = document.createElement('template');
  template.innerHTML = (`
    <svg id="loader" width="100%" height="2.75">
      <style>
        #loader {
          position: fixed;
          top:0;
          left: 0;
          z-index: 10000;
        }

        #loading-line {
          animation: loading 1.5s cubic-bezier(.58, .63, .58, .95) infinite;
        }
        @keyframes loading {
          50% {
            x: 0%;
            width: 100%;
          }

          100% {
            x: 100%;
          }
        }
      </style>
      <rect id="loading-line" x="0" y="0" width="0%" height="5" fill="#111">
    </svg>
  `).trim();

  if (s) {
    loader(false); // Remove an old loader if any
    document.body.style.paddingTop = '3px';
    document.body.appendChild(template.content.firstChild as Node);
  } else {
    document.body.style.paddingTop = '';
    const loader = document.querySelector('#loader');
    if (loader) { document.body.removeChild(loader); }
  }
};

const loaderPlugin: PluginFunction<never> = (Vue) => {
  Vue.prototype.$loading = loader;
};
export default loaderPlugin;
