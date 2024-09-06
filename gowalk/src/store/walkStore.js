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
};

const actions = {
    async fetchDailyWalks({ commit }, today) {
        const response = await dailyWalk(today);
        commit("setDailyWalks", response.data.walks);
    },
    startTracking({ commit, state, dispatch }) {
        const trackingInterval = setInterval(() => {
            if (state.walks.isWalking) {
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
            } else {
                clearInterval(trackingInterval); // 산책이 종료되면 트래킹 중지
            }
        }, state.walks.interval); //interval 시간마다 반복
    },
    async sendRoute({ state }) {
        const update = {
            memberId: 0,
            walkId: state.walks.walkId,
            walkPaths: state.walks.tmpRoute,
        };
        const response = await walkUpdate(update);
        console.log(response.data);
        state.walks.total;
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
