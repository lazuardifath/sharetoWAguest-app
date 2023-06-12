import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import VueSimpleAlert from "vue-simple-alert";

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPencilAlt, faTrashAlt, faPhoneAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import Toasted from 'vue-toasted';
Vue.use(Toasted, {
  duration: 1500,
  position: 'bottom-center', // ['top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left']
  theme: 'outline', // ['toasted-primary', 'outline', 'bubble']
  iconPack: 'material' // ['material', 'fontawesome', 'mdi', 'custom-class', 'callback']
})

/* add icons to the library */
library.add(faPencilAlt, faTrashAlt, faPhoneAlt, faArrowRight, faInstagram)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
Vue.use(VueSimpleAlert);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
new Vue({
  router,
  components: { App },
  render: h => h(App)
}).$mount('#app')