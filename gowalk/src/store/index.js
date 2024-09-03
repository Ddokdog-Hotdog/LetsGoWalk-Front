import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            email: '', // 로그인한 사용자 이메일
        },
    },
    mutations: {
        setUserEmail(state, email) {
            state.user.email = email;
        },
    },
    actions: {
        setUserEmail({ commit }, email) {
            commit('setUserEmail', email);
        },
    },
});
