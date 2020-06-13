// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './core/store/index'
import VueToastify from "vue-toastify";
import { rounder } from './helpers/rounder'
Vue.use(VueToastify);
Vue.filter('rounder', rounder)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})