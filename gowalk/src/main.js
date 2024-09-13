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
        const token = localStorage.getItem("accessToken");
        if (token) {
            console.log("Token found in localStorage:", token); // 토큰이 올바르게 가져와졌는지 확인
            this.$store.commit("setAccessToken", token);
        } else {
            console.log("No token found in localStorage");
        }
    },
}).$mount("#app");
