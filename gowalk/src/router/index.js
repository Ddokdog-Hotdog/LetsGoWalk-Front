import Vue from "vue";
import VueRouter from "vue-router";

import MainCompo from "@/components/layout/MainCompo";

import PageNotFoundCompo from "@/components/exception/PageNotFoundCompo.vue";
import homeRoute from "./homeRoute";
import mypageRoute from "./mypageRoute";
import notificationRoute from "./notificationRoute";
import postRoute from "./postRoute";
import questRoute from "./questRoute";
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
        beforeEnter: (to, from, next) => {
            const isLoggedIn = store.getters.isAuthenticated;
            if (isLoggedIn) {
                next("/"); // 액세스 토큰이 있는 경우 메인 페이지로 리다이렉트
            } else {
                next(); // 토큰이 없으면 로그인 페이지로 이동
            }
        },
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
            if (from.name && from.name !== "login") {
                next(from.fullPath);
            } else {
                next("/"); // 이전 페이지가 없거나 로그인 페이지였다면 홈으로
            }
        },
    },
    {
        path: "/auth/register",
        name: "AuthRegister",
        component: () => import(/* webpackChunkName: "register" */ "../views/login/RegisterCompo.vue"),
        beforeEnter: (to, from, next) => {
            const token = to.query.accessToken;
            if (token) {
                store.commit("setAccessToken", token);
                localStorage.setItem("accessToken", token);
            }
            next();
        },
        props: true,
        meta: { hideBottom: true },
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

// 전역 네비게이션 가드
router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.isAuthenticated;
    const isPublicPage =
        to.path === "/" || to.path === "/login" || to.path === "/auth/register" || to.path === "/auth/success";
    const isWalking = store.getters["walkStore/isWalking"];

    if (isWalking) {
        store.dispatch("walkStore/startTracking");
    }

    if (!isLoggedIn && !isPublicPage) {
        store.commit("showLoginModal", true);
        store.commit("setRedirectPath", to.fullPath);
        next(false);
    } else {
        store.commit("showLoginModal", false);
        // next();
        // 페이지 이동 시마다 알림 상태 확인
        store.dispatch('fetchNotifications')
            .then(() => {
                console.log('Notifications checked.');
                next(); // 알림 상태 확인 후 페이지 이동
            })
            .catch(error => {
                console.error('Error checking notifications:', error);
                next(); // 오류가 발생해도 페이지 이동은 진행
            });
    }
});

export default router;