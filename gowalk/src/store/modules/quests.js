import axios from 'axios';

export default {
    state: {
        // 상태 정의
        quests: [],
    },
    mutations: {
        // 변이 메소드 정의
        setQuests(state, quests) {
            state.quests = quests;
        },
    },
    actions: {
        // 액션 메소드 정의
        fetchQuests({ commit }) {
            // API 호출 등의 비동기 작업 수행 후 상태 업데이트
            axios.get('/api/quests').then((response) => {
                commit('setQuests', response.data);
            });
        },
    },
    getters: {
        // 게터 메소드 정의
        allQuests: (state) => state.quests,
    },
};
