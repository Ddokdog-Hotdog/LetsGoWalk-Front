import axios from "axios";
import { baseURL as baseURL, token as accessToken } from "./config";

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = accessToken;
        if (token) {
            // config.headers["Authorization"] = `Bearer ${token}`; 배포 시에는 주석 풀어야함
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
