<template>
    <div class="map-wrapper">
        <WalkMenuCompo />
        <WalkCalendar
            :is-visible="calendarVisible"
            @date-selected="dateSelected"
            @month-selected="monthSelcted"
            class="overlay-card"
        />
        <MonthlyExerciseCard class="monthly-card" :is-visible="monthlyCardVisible" />
        <TodayExerciseCard :is-visible="dailyCardVisible" />
        <KakaoMap ref="kakaoMap" :enable-summary="true" class="kakao-map" />
    </div>
</template>

<script>
import { nextTick } from "vue";
import WalkCalendar from "@/views/walk/components/WalkCalendar.vue";
import KakaoMap from "@/views/walk/components/KakaoMap.vue";
import WalkMenuCompo from "@/views/walk/components/WalkMenuCompo.vue";
import TodayExerciseCard from "@/views/walk/components/cards/TodayExerciseCard.vue";
import MonthlyExerciseCard from "@/views/walk/components/cards/MonthlyExerciseCard.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "WalkSummaryPage",
    components: {
        KakaoMap,
        WalkCalendar,
        WalkMenuCompo,
        MonthlyExerciseCard,
        TodayExerciseCard,
    },
    data() {
        return {
            selectModalVisible: false,
            monthlyCardVisible: true,
            dailyCardVisible: false,
            calendarVisible: true,
        };
    },
    computed: {
        curLocation() {
            return this.$store.getters["walkStore/getCurLocation"];
        },
    },
    methods: {
        ...mapGetters("walkStore", ["getCurLocation"]),
        ...mapMutations("walkStore", ["setDailyWalks"]),
        closeSelectModal() {
            this.selectModalVisible = false;
            this.selectedPets = [];
        },
        async dateSelected(selectedDate) {
            console.log("날짜선택: ", selectedDate);
            this.setDailyWalks(selectedDate.walks);
            await nextTick();
            this.monthlyCardVisible = false;
            this.dailyCardVisible = true;
            this.$refs.kakaoMap.drawDailyWalks();
        },
        async monthSelcted() {
            this.monthlyCardVisible = true;
            this.dailyCardVisible = false;
            await nextTick();
            this.$refs.kakaoMap.drawMonthlyWalks();
        },
    },
};
</script>

<style scoped>
.map-wrapper {
    position: relative;
    width: 100%;
    height: 85vh;
}

.kakao-map {
    width: 100%;
    height: 100%;
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: auto;
    overflow: hidden;
}

.overlay-card {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: 10;
    pointer-events: auto;
}
</style>
