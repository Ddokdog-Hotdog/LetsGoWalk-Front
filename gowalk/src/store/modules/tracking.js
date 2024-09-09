export const startTracking = (commit, state, dispatch) => {
    commit("clearTrackingWatcher");

    const watcherId = navigator.geolocation.watchPosition(
        (position) => {
            if (!state.walks.isWalking) {
                commit("clearTrackingWatcher");
                return;
            }

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            state.walks.curLocation.lat = lat;
            state.walks.curLocation.lng = lng;

            const point = {
                recordTime: new Date().toISOString(),
                location: {
                    type: "Point",
                    coordinates: [lng, lat],
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

export const startWalk = (state, initWalk) => {
    state.walks.walkId = initWalk.walkId;
    state.walks.dogs = initWalk.dogs.map((dog) => ({
        pet: {
            petId: dog.petId,
            breedId: dog.breedId,
            breedName: dog.breedName,
            name: dog.name,
            dateOfBirth: dog.dateOfBirth,
            gender: dog.gender,
            weight: dog.weight,
            neutering: dog.neutering,
            profileImageUrl: dog.profileImageUrl,
        },
        caloriesBurned: 0,
    }));
    state.walks.startTime = initWalk.startTime;
    state.walks.isWalking = true;
};
