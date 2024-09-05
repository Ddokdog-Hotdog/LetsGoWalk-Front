import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import quests from "@/router/questRoute";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        quests,
    },
    state: {
        accessToken: localStorage.getItem("accessToken") || null, // JWT 액세스 토큰 초기화
    },
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token; // JWT 토큰 저장
        },
        clearAccessToken(state) {
            state.accessToken = null; // JWT 토큰 제거
        },
    },
    actions: {
        async login({ commit }, payload) {
            try {
                const response = await axios.post("/api/login", payload);
                const token = response.data.accessToken;
                commit("setAccessToken", token); // Vuex에 토큰 저장
                localStorage.setItem("accessToken", token); // localStorage에 토큰 저장 (페이지 새로고침 시에도 유지)
            } catch (error) {
                console.error("Login error:", error);
            }
        },
        logout({ commit }) {
            commit("clearAccessToken"); // Vuex의 토큰 제거
            localStorage.removeItem("accessToken"); // localStorage의 토큰 제거
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.accessToken, // 로그인 여부 확인
        getAccessToken: (state) => state.accessToken, // 액세스 토큰 가져오기
    },
});
