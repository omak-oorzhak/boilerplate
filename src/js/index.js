import 'jquery';
import 'bootstrap';
import Vue from 'vue';
import Lorem from './../components/Lorem.vue';

console.log(`Hello from index.js`);

new Vue({
  el: '#lorem',
  render: h => h(Lorem)
});