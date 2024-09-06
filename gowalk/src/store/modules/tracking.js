export const startTracking = (commit, state, dispatch) => {
    commit("clearTrackingWatcher");

    const watcherId = navigator.geolocation.watchPosition(
        (position) => {
            if (!state.walks.isWalking) {
                commit("clearTrackingWatcher");
                return;
            }

            const point = {
                recordTime: new Date().toISOString(),
                location: {
                    type: "Point",
                    coordinates: [position.coords.longitude, position.coords.latitude],
                },
            };

            commit("addToRoute", point);

            const currentTime = new Date().getTime();
            const timeElapsed = currentTime - state.lastRequestTime;

            if (state.walks.tmpRoute.length >= 20 || timeElapsed >= 40000) {
                dispatch("sendRoute");
            }
        },
        (error) => {
            console.error("위치 추적 오류:", error);
        },
        {
            enableHighAccuracy: true, // 정확도 설정
            timeout: 10000, // 10초 동안 응답이 없을 때의 타임아웃 설정
            maximumAge: 0, // 캐시된 위치 정보를 사용하지 않도록 설정
        }
    );

    commit("setTrackingWatcher", watcherId);
};
