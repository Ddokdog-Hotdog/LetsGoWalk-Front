import axios from "axios";
import { baseURL as baseURL, token as accessToken } from "./config";

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true // 필요에 따라 설정
});

instance.interceptors.request.use(
    (config) => {
        const token = accessToken;
        if (token) {
            // config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
