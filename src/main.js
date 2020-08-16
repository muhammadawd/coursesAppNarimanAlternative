import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = true

//jQuery
global.jQuery = require('jquery');
window.$ = global.jQuery;

import {VueEditor} from "vue2-editor";

Vue.component('vue-editor', VueEditor)

import VueFlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

Vue.use(VueFlatPickr);

import VueWow from 'vue-wow'
import '@/assets/css/plugins/animation.css'
// mount with global
Vue.use(VueWow)

import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)

import Multiselect from 'vue-multiselect'
// register globally
Vue.component('multiselect', Multiselect);
import 'vue-multiselect/dist/vue-multiselect.min.css';

// axios
import axios from "./axios.js"

Vue.prototype.$http = axios;

// service worker
import './registerServiceWorker'

// helper
import helper from "./helpers/helper.js"

Vue.prototype.$helper = helper;

// sweet alert 2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

import {Tabs, Tab} from 'vue-slim-tabs'

import "vue-slim-tabs/themes/default.css"

Vue.component('tabs', Tabs);
Vue.component('tab', Tab);


// lodash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.use(VueLodash, {name: 'custom', lodash: lodash});

// Notifications
import Notifications from 'vue-notification'

Vue.use(Notifications)

// window.VeeValidate = require('vee-validate');
// Vue.directive('VeeValidate', VeeValidate)

// i18n
import i18n from './i18n/i18n'

// Styles: Arabic CSS
let language = helper.getLocalStorage('language');
language = language ? language : (helper.setLocalStorage('language', 'ar'));
i18n.locale = language;

const arThemecss = () => {
    import('@/assets/css/styles.css');
    import('@/assets/css/colors.css');
    import('@/assets/css/plugins/bootstrap.rtl.min.css');
    import('@/assets/css/ar.css');
};
arThemecss();
document.documentElement.setAttribute('lang', language);


// VeeValidate
import VeeValidate from 'vee-validate'
import {Validator} from 'vee-validate';
import en from 'vee-validate/dist/locale/en.js';
import ar from 'vee-validate/dist/locale/ar.js';

Vue.directive('VeeValidate', VeeValidate);
Vue.use(VeeValidate, {
    inject: true
});

import translationArMessages from './i18n/translationArMessages';

if (language === 'ar') {
    Validator.localize('ar', translationArMessages);
}


import vueSweetalert2 from 'vue-sweetalert2';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(vueSweetalert2);

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
