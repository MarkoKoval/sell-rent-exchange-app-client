/*jshint -W099 */
import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from "bootstrap-vue";
import routes from './routes'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueFormGenerator from "vue-form-generator";
import VModal from 'vue-js-modal';
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LMarker, LTileLayer } from "vue2-leaflet";
import L from "leaflet"
import 'leaflet/dist/leaflet.css'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)
// Global registration
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

/*
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)*/
/*
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)
Vue.directive('tooltip', VTooltip)
*/
Vue.use(VModal)
Vue.use(VModal, { dialog: true })
Vue.use(PerfectScrollbar)
import linkify from 'vue-linkify'

Vue.directive('linkified', linkify)
import VGeosearch from 'vue2-leaflet-geosearch';
 import {Treeselect} from '@riophae/vue-treeselect'
Vue.use(Treeselect);
Vue.use(VGeosearch );
Vue.use(L);
Vue.use(LMap);
Vue.use(LMarker);
Vue.use(LTileLayer);
Vue.use(VModal);
Vue.component("vue-form-generator", VueFormGenerator);

Vue.use(BootstrapVue);
//Vue.use(VeeValidate);

Vue.config.productionTip = false;
delete Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  render: h => h(App),
  router: routes
}).$mount('#app')
