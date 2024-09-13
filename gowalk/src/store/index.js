import quests from "@/router/questRoute";
import walkStore from "@/store/walkStore";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        walkStore,
        quests,
        auth,
    },
    state: {
        showLoginModal: false, // 모달 표시 여부
        redirectPath: null, // 리다이렉트 경로
        accessToken: localStorage.getItem("accessToken") || null, // JWT 액세스 토큰 초기화
    },
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token; // JWT 토큰 저장
            localStorage.setItem("accessToken", token); // localStorage에 토큰 저장
        },
        clearAccessToken(state) {
            state.accessToken = null; // JWT 토큰 제거
            localStorage.removeItem("accessToken"); // localStorage의 토큰 제거
        },
        showLoginModal(state, show) {
            state.showLoginModal = show; // 모달 표시 여부 설정
        },
        setRedirectPath(state, path) {
            state.redirectPath = path; // 리다이렉트 경로 설정
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.accessToken,
        shouldShowLoginModal: (state) => state.showLoginModal,
        getRedirectPath: (state) => state.redirectPath,
        getAccessToken: (state) => state.accessToken,
    },
    actions: {
        async login({ commit }, payload) {
            console.log("Login"); // 응답 확인
            try {
                const response = await axios.post("/api/login", payload);
                console.log("Login response:", response.data); // 응답 확인
                const token = response.data.accessToken;
                if (token) {
                    commit("setAccessToken", token); // Vuex에 토큰 저장
                } else {
                    console.error("No token received from login response.");
                }
            } catch (error) {
                console.error("Login error:", error);
            }
        },

        logout({ commit }) {
            commit("clearAccessToken"); // Vuex의 토큰 제거
        },
    },
});

export default store;
