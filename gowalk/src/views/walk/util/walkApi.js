//다음에 공통으로 사용할 axios경로로 변경
import axios from "@/axios";
import { walkURL } from "@/views/walk/util/config";

export const walkStart = (start) => {
    try {
        const data = {
            memberId: start.memberId,
            dogs: start.dogs, // [1, 2, 4]
            latitude: start.latitude,
            longitude: start.longitude,
        };
        return axios.post(walkURL.walkStart, data);
    } catch (error) {
        handleApiError(error, "산책 시작 중 오류 발생");
    }
};

export const walkUpdate = (update) => {
    try {
        const data = {
            memberId: update.memberId,
            walkId: update.walkId,
            walkPaths: update.walkPaths, // [ geojson... ]
        };
        return axios.post(walkURL.walkUpdate, data);
    } catch (error) {
        handleApiError(error, "산책 업데이트 중 오류 발생");
    }
};

export const walkEnd = (end) => {
    try {
        const data = {
            memberId: end.memberId,
            walkId: end.walkId,
            latitude: end.latitude,
            longitude: end.longitude,
        };
        return axios.post(walkURL.walkEnd, data);
    } catch (error) {
        handleApiError(error, "산책 종료 중 오류 발생");
    }
};

export const dailyWalk = (daily) => {
    try {
        const data = {
            memberId: daily.memberId,
            year: daily.year,
            month: daily.month,
            day: daily.day,
        };
        return axios.post(walkURL.walkDaily, data);
    } catch (error) {
        handleApiError(error, "일일 산책 불러오기 중 오류 발생");
    }
};

export const monthlyWalk = (monthly) => {
    try {
        const data = {
            memberId: monthly.memberId,
            year: monthly.year,
            month: monthly.month,
        };
        return axios.post(walkURL.walkMonthly, data);
    } catch (error) {
        handleApiError(error, "월간 산책 불러오기 중 오류 발생");
    }
};

export const nearbyWalks = (nearby) => {
    try {
        const data = {
            latitude: nearby.latitude,
            longitude: nearby.longitude,
        };
        return axios.post(walkURL.walkNearby, data);
    } catch (error) {
        handleApiError(error, "주변 산책경로 불러오는 중 오류 발생");
    }
};

export const nearbyHotplace = (location) => {
    console.log("보내기전 ", location);
    try {
        const data = {
            latitude: location.lat,
            longitude: location.lng,
        };
        return axios.post(walkURL.walkHotplace, data);
    } catch (error) {
        handleApiError(error, "주변 산책경로 불러오는 중 오류 발생");
    }
};

export const getMyPets = async () => {
    try {
        const response = await axios.get(walkURL.getMyPets);
        return response.data;
    } catch (error) {
        handleApiError(error, "강아지 목록 불러오는 중 오류 발생");
    }
};

const handleApiError = (error, errorMessage) => {
    console.error(`${errorMessage}:`, error);
    // throw error;
};
