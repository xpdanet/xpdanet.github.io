import js from '@eslint/js';
import tjwBase from 'eslint-config-tjw-base';
import tjwVue from 'eslint-config-tjw-vue';
import pluginVue from 'eslint-plugin-vue';

const vue3Recommended = pluginVue.configs['flat/recommended'];

export default [
  js.configs.recommended,
  ...vue3Recommended,
  tjwBase,
  tjwVue,
  {
    ignores: [
      '/node_modules',
      '/build/',
      '/config/',
      '/dist/',
      '.eslintrc.js'
    ],
    languageOptions: {
      globals: {
        axios: true,
        beautifyJSON: true,
        helpers: true,
        httpVueLoader: true,
        module: true,
        Promise: true,
        Vue: true
      }
    }
  }
];
