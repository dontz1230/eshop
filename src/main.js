import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';

// import ElementUI from 'element-ui'
// Vue.use(ElementUI);

//使用Vue matertial
import { MdCard, MdButton, MdContent, MdDialog, MdDialogConfirm, MdTabs, MdDialogPrompt, Modal} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdDialog)
Vue.use(MdTabs)
Vue.use(MdDialogConfirm)
Vue.use(MdDialogPrompt)
Vue.component(Modal)

import VueFirestore from 'vue-firestore'
require('firebase/firestore')
Vue.use(VueFirestore, {
    key: 'id',         // the name of the property. Default is '.key'.
    enumerable: true  //  whether it is enumerable or not. Default is true.
})

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

Vue.component('my-nav',require('./components/Navbar.vue').default);
Vue.component('add-cart',require('./components/AddToCart.vue').default);
import ProductList from './components/ProductList'
Vue.component('product-list', ProductList)

import 'popper.js';
import './assets/app.scss'

import Swal from 'sweetalert2'
window.Swal = Swal

import VueCarousel from 'vue-carousel'
Vue.use(VueCarousel)

import { fb } from './firebase.js'

Vue.config.productionTip = false

import store from './store.js'

//firebase user auth
let app = '';
fb.auth().onAuthStateChanged(function(user){
  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
