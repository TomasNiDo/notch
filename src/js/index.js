require("../manifest.json");

import Vue from 'vue';
import App from './components/App.vue';
import Editor from './components/Editor.vue';
import SimpleMDE from 'simplemde';
require("simplemde/dist/simplemde.min.css");

window.SimpleMDE = SimpleMDE;

Vue.component('editor', Editor);

new Vue({
  el: 'body',
  render: h => h(App)
});
