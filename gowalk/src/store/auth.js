// src/store/auth.js
const state = {
    accessToken: localStorage.getItem("accessToken") || null,
};

const mutations = {
    setAccessToken(state, token) {
        state.accessToken = token;
        localStorage.setItem("accessToken", token);
    },
    clearAccessToken(state) {
        state.accessToken = null;
        localStorage.removeItem("accessToken");
    },
};

const actions = {
    login({ commit }, token) {
        commit("setAccessToken", token);
    },
    logout({ commit }) {
        commit("clearAccessToken");
    },
};

const getters = {
    getAccessToken: (state) => state.accessToken,
    isAuthenticated: (state) => !!state.accessToken,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
