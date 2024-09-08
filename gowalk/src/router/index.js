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

const router = new VueRouter({
    mode: "history",
    routes,
});

// 전역 네비게이션 가드
router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.isAuthenticated;
    const isPublicPage = to.path === "/" || to.path === "/login" || to.path === "/auth/register";

    if (!isLoggedIn && !isPublicPage) {
        store.commit("showLoginModal", true); // 보호된 페이지에서만 모달 표시
        store.commit("setRedirectPath", to.fullPath); // 리다이렉트 경로 저장
        next(false); // 페이지 이동 중단
    } else {
        store.commit("showLoginModal", false); // 로그인 페이지나 메인 페이지에서는 모달 숨김
        next();
    }
});

export default router;
