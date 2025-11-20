import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as THREE from 'three'
import 'minireset.css/minireset.min.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);



// import HUI from 'hui';
// import 'hui/lib/hui.css';
import axios from 'axios';

// Vue.use(HUI);

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);

// import layout from '@hui-pro/layout';
// import '@hui-pro/layout/theme/index.scss';
// Vue.use(layout);

// import './assets/my.css'
import './assets/my_icon.css'

Vue.prototype.$axios = axios
Vue.prototype.$three = THREE

// import icons from '@hui/svg-icon'

// for (let icon of icons) {
//     Vue.component(icon.name, icon);
// }

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')