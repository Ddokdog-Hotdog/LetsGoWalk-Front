import { dailyWalk } from "@/views/walk/util/walkApi";

const state = {
    dailyWalks: [],
    walks: {
        startTime: null,
        duration: null,
        tmpRoute: [],
    },
};

const mutations = {
    setDailyWalks(state, walks) {
        state.dailyWalks = walks;
    },
};

const actions = {
    async fetchDailyWalks({ commit }, today) {
        try {
            const response = await dailyWalk(today);
            commit("setDailyWalks", response.data.walks);
        } catch (error) {
            console.error("산책 데이터를 가져오는 중 오류가 발생했습니다.", error);
        }
    },
};

const getters = {
    dailyWalks: (state) => state.dailyWalks,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
