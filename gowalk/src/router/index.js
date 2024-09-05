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
];

export default new VueRouter({
    mode: "history",
    routes,
});
