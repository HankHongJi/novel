import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './uitl/interceptors'
import VueAxios from 'vue-axios'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
