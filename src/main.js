import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClipboardList, faPlusCircle, faNotesMedical, faInfoCircle, faHistory, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import { faStar, faTrashAlt,faShareSquare, faHandPointDown} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/assets/css/tailwind.css'

Vue.config.productionTip = false

library.add(faClipboardList, faStar, faTrashAlt, faPlusCircle, faNotesMedical, faShareSquare, faInfoCircle, faHistory, faUserCircle, faHandPointDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
