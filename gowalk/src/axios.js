// src/axios.js
import axios from "axios";
import store from "./store";

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL, // API의 기본 URL을 설정
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = store.getters.getAccessToken;
        console.log("JWT Token being sent:", token); // 이 로그가 콘솔에 출력되는지 확인

        /*const token = localStorage.getItem("accessToken");*/

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
            console.log(token);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// 응답 인터셉터 설정
instance.interceptors.response.use(
    (response) => {
        // 서버가 토큰을 Authorization 헤더가 아닌 다른 헤더에 포함할 가능성 고려
        const newToken = response.headers["authorization"] || response.data.accessToken;
        if (newToken) {
            const token = newToken.replace("Bearer ", ""); // "Bearer " 접두어 제거
            store.commit("setAccessToken", token);
            localStorage.setItem("accessToken", token); // 새로운 토큰 저장
        }
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            store.dispatch("logout");
            // 리프레시 토큰을 사용하는 로직 추가 가능
        }
        return Promise.reject(error);
    }
);

export default instance;
/*
// 요청 인터셉터 설정
axios.interceptors.request.use(
    (config) => {
        const token = store.getters.getAccessToken;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`; // 헤더에 토큰 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
axios.interceptors.response.use(
    (response) => {
        const newToken = response.headers["authorization"];
        if (newToken) {
            const token = newToken.replace("Bearer ", ""); // "Bearer " 접두어 제거
            store.commit("setAccessToken", token);
            localStorage.setItem("accessToken", token); // 새로운 토큰 저장
        }
        return response;
    },
    (error) => {
        // 401 에러가 발생하면 로그아웃 처리하거나 리프레시 토큰을 사용해 토큰 갱신
        if (error.response.status === 401) {
            store.dispatch("logout");
            // 또는 리프레시 토큰을 사용하는 로직을 추가 가능
        }
        return Promise.reject(error);
    }
);

export default axios;*/
