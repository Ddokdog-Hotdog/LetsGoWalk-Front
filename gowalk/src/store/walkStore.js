import { dailyWalk, walkUpdate, walkEnd } from "@/views/walk/util/walkApi";

const state = {
    monthlyWalk: [],
    dailyWalks: [],
    walks: {
        curLocation: {
            lat: null,
            lng: null,
        },
        walkId: null,
        startTime: null,
        duration: null,
        distance: null,
        route: [],
        tmpRoute: [],
        isWalking: false,
        interval: 2000, // 경로 저장간격
        dogs: [],
    },
    trackingInterval: null,
};

const mutations = {
    setDailyWalks(state, walks) {
        state.dailyWalks = walks;
    },
    addToRoute(state, point) {
        state.walks.tmpRoute.push(point);
        state.walks.route.push(point);
        // console.log("좌표저장:", state.walks.tmpRoute);
    },
    startWalk(state, initWalk) {
        state.walks.walkId = initWalk.walkId;
        state.walks.dogs = initWalk.dogs;
        state.walks.startTime = initWalk.startTime;
        state.walks.isWalking = true;
    },
    stopWalk(state) {
        state.walks.isWalking = false;
        state.walks.tmpRoute = [];
    },
    clearTmpRoute(state) {
        state.walks.tmpRoute = [];
    },
    setCurLocation(state, { lat, lng }) {
        state.walks.curLocation.lat = lat;
        state.walks.curLocation.lng = lng;
    },
    setTrackingInterval(state, interval) {
        state.trackingInterval = interval;
    },
};

const actions = {
    async fetchDailyWalks({ commit }, today) {
        const response = await dailyWalk(today);
        commit("setDailyWalks", response.data.walks);
    },
    startTracking({ commit, state, dispatch }) {
        if (state.trackingInterval) {
            clearInterval(state.trackingInterval);
        }
        const trackingInterval = setInterval(() => {
            if (!state.walks.isWalking) {
                clearInterval(state.trackingInterval);
                commit("setTrackingInterval", null);
                return;
            }

            navigator.geolocation.getCurrentPosition((position) => {
                const point = {
                    recordTime: new Date().toISOString(),
                    location: {
                        type: "Point",
                        coordinates: [position.coords.longitude, position.coords.latitude],
                    },
                };
                commit("addToRoute", point);

                if (state.walks.tmpRoute.length >= 20) {
                    dispatch("sendRoute");
                    commit("clearTmpRoute");
                }
            });
        }, state.walks.interval);

        commit("setTrackingInterval", trackingInterval);
    },
    async sendRoute({ state }) {
        const update = {
            memberId: 0,
            walkId: state.walks.walkId,
            walkPaths: state.walks.tmpRoute,
        };
        console.log("경로 보내기...", state.walks.tmpRoute);
        const response = await walkUpdate(update);
        state.walks.distance = response.data.totalDistance;
        state.walks.dogs = response.data.dogs;
    },
    startWalk({ commit, dispatch }, initWalk) {
        commit("startWalk", initWalk);
        dispatch("startTracking");
    },
    async stopWalk({ commit, dispatch, state }) {
        dispatch("sendRoute");
        const data = {
            memberId: 0,
            walkId: state.walks.walkId,
            latitude: state.walks.curLocation.lat,
            longitude: state.walks.curLocation.lng,
        };
        const response = await walkEnd(data);
        console.log(`산책 종료: ${response.data}`);
        commit("stopWalk");
    },
};

const getters = {
    dailyWalks: (state) => state.dailyWalks,
    isWalking: (state) => state.walks.isWalking,
    route: (state) => state.walks.route,
    getCurLocation: (state) => state.walks.curLocation,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
