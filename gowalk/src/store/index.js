// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null, // JWT 액세스 토큰 저장소
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token; // JWT 토큰 저장
    },
  },
  actions: {
    login({ commit }, payload) {
      // 백엔드에 로그인 요청
      return axios.post('/api/login', payload).then(response => {
        const token = response.data.accessToken;
        commit('setAccessToken', token); // Vuex에 토큰 저장
        localStorage.setItem('accessToken', token); // localStorage에 토큰 저장 (페이지 새로고침 시에도 유지)
      });
    },
    logout({ commit }) {
      commit('setAccessToken', null); // Vuex의 토큰 제거
      localStorage.removeItem('accessToken'); // localStorage의 토큰 제거
    },
  },
  getters: {
    isAuthenticated: state => !!state.accessToken, // 로그인 여부 확인
    getAccessToken: state => state.accessToken, // 액세스 토큰 가져오기
  },
});
