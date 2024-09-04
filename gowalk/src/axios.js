//API 요청 시 예시

// src/axios.js
import axios from 'axios';
import store from './store';

// 요청 인터셉터 설정
axios.interceptors.request.use(
    (config) => {
        const token = store.getters.getAccessToken || localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // 헤더에 토큰 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axios;

//백엔드에서 만료된 Access Token을 재발급하면, 프론트엔드에서는 응답 Interceptor를 사용하여 새로운 Access Token을 저장
axios.interceptors.response.use(
    (response) => {
        const newToken = response.headers['authorization'];
        if (newToken) {
            const token = newToken.replace('Bearer ', ''); // "Bearer " 접두어 제거
            store.commit('setAccessToken', token);
            localStorage.setItem('accessToken', token); // 새로운 토큰 저장
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    },
);
