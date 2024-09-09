import quests from "@/router/questRoute";
import walkStore from "@/store/walkStore";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        walkStore,
        quests,
        walkStore,
    },
    state: {
        showLoginModal: false, // 모달 표시 여부
        redirectPath: null, // 리다이렉트 경로
        accessToken: localStorage.getItem("accessToken") || null, // JWT 액세스 토큰 초기화
    },
    mutations: {
        setAccessToken(state, token) {
            state.accessToken = token; // JWT 토큰 저장
        },
        clearAccessToken(state) {
            state.accessToken = null; // JWT 토큰 제거
        },
        showLoginModal(state, show) {
            state.showLoginModal = show; // 모달 표시 여부 설정
        },
        setRedirectPath(state, path) {
            state.redirectPath = path; // 리다이렉트 경로 설정
        },
    },
    getters: {
        //isAuthenticated: (state) => !!state.accessToken,
        //shouldShowLoginModal: (state) => state.showLoginModal, // 모달 표시 여부를 가져오는 getter
        //getRedirectPath: (state) => state.redirectPath, // 리다이렉트 경로 가져오기

        isAuthenticated: (state) => !!state.accessToken,
        shouldShowLoginModal: (state) => state.showLoginModal,
        getRedirectPath: (state) => state.redirectPath,
        getAccessToken: (state) => state.accessToken,
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
});
