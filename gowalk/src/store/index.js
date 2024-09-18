import axios2 from "@/axios";
import quests from "@/router/questRoute";
import auth from "@/store/auth";
import walkStore from "@/store/walkStore";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

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
        hasUnreadNotifications: false, // 알림 상태 저장
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
        setUnreadNotifications(state, status) {
            state.hasUnreadNotifications = status; // 읽지 않은 알림 상태 업데이트
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.accessToken,
        shouldShowLoginModal: (state) => state.showLoginModal,
        getRedirectPath: (state) => state.redirectPath,
        getAccessToken: (state) => state.accessToken,
        hasUnreadNotifications: (state) => state.hasUnreadNotifications, // 알림 상태 getter
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

        async fetchNotifications({ commit }) {
            try {
                const response = await axios2.get('/api/notification/check', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
                console.log('Notification response:', response.data);  // 응답 데이터 확인
        
                // 서버에서 받은 값이 true이면 읽지 않은 알림이 있는 것으로 판단
                const unreadNotifications = response.data === true;
                commit('setUnreadNotifications', unreadNotifications); // 읽지 않은 알림이 있으면 true
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        },

        markAllNotificationsAsRead({ commit }) {
            axios2.patch('/api/notification/read-all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then(() => {
                commit('setUnreadNotifications', false); // 읽음 상태로 업데이트
            })
            .catch(error => {
                console.error('Error marking notifications as read:', error);
            });
        },
    },
});

export default store;