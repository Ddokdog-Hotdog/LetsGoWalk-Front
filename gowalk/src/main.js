// main.js
import Vue from "vue";
import App from "./App.vue";

import router from "./router/index";
import store from "./store/index";

// vuetify
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify: new Vuetify(),
    render: (h) => h(App),
    beforeCreate() {
        // 어플리케이션 시작 시 localStorage에 있는 토큰으로 초기화
        const token = localStorage.getItem("accessToken");
        if (token) {
            this.$store.commit("setAccessToken", token);
        }
    },
}).$mount("#app");
