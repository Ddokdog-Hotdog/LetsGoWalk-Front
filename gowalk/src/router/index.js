import Vue from "vue";
import VueRouter from "vue-router";

import MainCompo from "@/components/layout/MainCompo";

import PageNotFoundCompo from "@/components/exception/PageNotFoundCompo.vue";
import mypageRoute from "./mypageRoute";
import questRoute from "./questRoute";
import homeRoute from "./homeRoute";
import notificationRoute from "./notificationRoute";
import postRoute from "./postRoute";
import shopRoute from "./shopRoute";
import walkRoute from "./walkRoute";

import store from "@/store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: MainCompo,
        children: [
            ...homeRoute,
            ...walkRoute,
            ...shopRoute,
            ...mypageRoute,
            ...postRoute,
            ...questRoute,
            ...notificationRoute,
        ],
    },
    {
        path: "*",
        component: PageNotFoundCompo,
    },
    {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "../views/login/LoginCompo.vue"),
    },
    {
        path: "/auth/success",
        name: "AuthSuccess",
        component: MainCompo,
        beforeEnter: (to, from, next) => {
            const token = to.query.accessToken;
            if (token) {
                store.commit("setAccessToken", token);
                localStorage.setItem("accessToken", token);
            }
            next("/");
        },
    },
    {
        path: "/auth/register",
        name: "AuthRegister",
        component: () => import(/* webpackChunkName: "register" */ "../views/mypage/ProfileCompo.vue"),
        beforeEnter: (to, from, next) => {
            const token = to.query.accessToken;
            if (token) {
                store.commit("setAccessToken", token);
                localStorage.setItem("accessToken", token);
            }
            next();
        },
    },
];

export default new VueRouter({
    mode: "history",
    routes,
});
