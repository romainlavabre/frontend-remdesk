import Vue from 'vue'
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Data from "@/plugins/data/index";
import Message from "@/plugins/message/index";
import Event from "@/plugins/event/index";
import "@/assets/css/index.css";
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$storage = Data;
Vue.prototype.$message = Message;
Vue.prototype.$event = Event;
Vue.prototype.$http = axios;

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
