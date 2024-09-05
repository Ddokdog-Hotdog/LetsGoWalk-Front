//다음에 공통으로 사용할 axios경로로 변경
import walkAxios from "@/views/walk/util/testAxios";
import { walkURL } from "@/views/walk/util/config";

export const walkStart = (start) => {
    const data = {
        memberId: start.memberId,
        dogs: start.dogs, // [1, 2, 4]
        latitude: start.latitude,
        longitude: start.longitude,
    };
    return walkAxios.post(walkURL.walkStart, data);
};

export const walkUpdate = (update) => {
    const data = {
        memberId: update.memberId,
        walkId: update.walkId,
        walkPaths: update.walkPaths, // [ geojson... ]
    };
    return walkAxios.post(walkURL.walkUpdate, data);
};

export const walkEnd = (end) => {
    const data = {
        memberId: end.memberId,
        walkId: end.walkId,
        latitude: end.latitude,
        longitude: end.longitude,
    };
    return walkAxios.post(walkURL.walkEnd, data);
};

export const dailyWalk = (daily) => {
    const data = {
        memberId: daily.memberId,
        year: daily.year,
        month: daily.month,
        day: daily.day,
    };
    return walkAxios.post(walkURL.walkDaily, data);
};

export const monthlyWalk = (monthly) => {
    const data = {
        memberId: monthly.memberId,
        year: monthly.year,
        month: monthly.month,
    };
    return walkAxios.post(walkURL.walkMonthly, data);
};

export const nearbyWalks = (nearby) => {
    const data = {
        latitude: nearby.latitude,
        longitude: nearby.longitude,
    };
    return walkAxios.post(walkURL.walkNearby, data);
};
