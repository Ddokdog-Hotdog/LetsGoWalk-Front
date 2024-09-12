import { dailyWalk, monthlyWalk, walkUpdate, walkEnd } from "@/views/walk/util/walkApi";
import { startTracking as trackingModule, startWalk as startModule } from "@/store/modules/tracking";

const state = {
    monthlyWalk: [],
    dailyWalks: [],
    walks: {
        curLocation: {
            lat: null,
            lng: null,
        },
        walkId: null,
        dogs: [],
        distance: 0,
        route: [],
        tmpRoute: [],
        isWalking: false,
        startTime: null,
        lastRequestTime: null,
    },
    trackingWatcher: null,
};

const mutations = {
    setDailyWalks(state, walks) {
        state.dailyWalks = walks;
    },
    setMonthlyWalks(state, walks) {
        state.monthlyWalk = walks;
        console.log(`${walks.month}월 산책정보: `, walks);
    },
    addToRoute(state, point) {
        state.walks.tmpRoute.push(point);
        state.walks.route.push(point);
        console.log("좌표저장:", state.walks.tmpRoute);
    },
    startWalk(state, initWalk) {
        startModule(state, initWalk);
    },
    stopWalk(state) {
        state.walks.isWalking = false;
        state.walks.tmpRoute = [];
    },
    updateWalk(state, { response, time }) {
        console.log("경로 보내기...", state.walks.tmpRoute);
        console.log(response);
        state.walks.distance = response.totalDistance;
        state.walks.dogs = response.dogs.map((dog) => ({
            pet: dog.pet,
            caloriesBurned: dog.caloriesBurned,
        }));
        state.walks.tmpRoute = [];
        state.lastRequestTime = time;
    },
    setCurLocation(state, { lat, lng }) {
        state.walks.curLocation.lat = lat;
        state.walks.curLocation.lng = lng;
    },
    setTrackingWatcher(state, watcherId) {
        state.trackingWatcher = watcherId;
    },
    clearTrackingWatcher(state) {
        if (state.trackingWatcher) {
            navigator.geolocation.clearWatch(state.trackingWatcher);
            state.trackingWatcher = null;
        }
    },
};

const actions = {
    async fetchDailyWalks({ commit }, today) {
        const response = await dailyWalk(today);
        commit("setDailyWalks", response.data.walks);
    },
    async fetchMonthlyWalk({ commit }, month) {
        const response = await monthlyWalk(month);
        commit("setMonthlyWalks", response.data);
    },
    startTracking({ commit, state, dispatch }) {
        trackingModule(commit, state, dispatch);
    },
    async sendRoute({ state, commit }) {
        if (state.walks.tmpRoute.length === 0) return;
        const update = {
            memberId: 0,
            walkId: state.walks.walkId,
            walkPaths: state.walks.tmpRoute,
        };
        const response = await walkUpdate(update);
        commit("updateWalk", { response: response.data, time: new Date().getTime() });
    },
    startWalk({ commit, dispatch }, initWalk) {
        commit("startWalk", initWalk);
        dispatch("startTracking");
    },
    async stopWalk({ commit, dispatch, state }) {
        await dispatch("sendRoute");
        const data = {
            memberId: 0,
            walkId: state.walks.walkId,
            latitude: state.walks.curLocation.lat,
            longitude: state.walks.curLocation.lng,
        };
        const response = await walkEnd(data);
        console.log(`산책 종료: `, response.data);
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
