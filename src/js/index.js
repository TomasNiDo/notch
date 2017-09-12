require("../manifest.json");

import Vue from 'vue';
import App from './components/App.vue';
import Editor from './components/Editor.vue';
import SimpleMDE from 'simplemde';
import swal from 'sweetalert2';

require("normalize.css");
require("milligram");
require("simplemde/dist/simplemde.min.css");
require("sweetalert2/dist/sweetalert2.min.css");
require("animate.css");

window.SimpleMDE = SimpleMDE;

Vue.component('editor', Editor);

new Vue({
  el: 'body',
  render: h => h(App)
});
