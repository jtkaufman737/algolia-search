import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);

new Vue({
  render: function (h) { return h(App) }
}).$mount('#app')
