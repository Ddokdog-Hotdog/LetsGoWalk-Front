<template>
    <div class="map-wrapper">
        <KakaoMap class="kakao-map" />
        <div class="overlay-container">
            <TodayExerciseCard :walks="walks" class="overlay-card" />
            <WalkStartButton @button-clicked="onButtonClick" class="overlay-button" />
        </div>
    </div>
</template>

<script>
import KakaoMap from "@/views/walk/components/KakaoMap.vue";
import WalkStartButton from "@/views/walk/components/button/WalkStartButton.vue";
import TodayExerciseCard from "@/views/walk/components/cards/TodayExerciseCard.vue";

import walkData from "@/views/walk/sample/dailyWalks.json";
export default {
    name: "WalkMainPage",
    components: {
        KakaoMap,
        TodayExerciseCard,
        WalkStartButton,
    },
    data() {
        return {
            walks: [],
        };
    },
    created() {
        this.walks = walkData.walks;
    },
    methods: {
        onButtonClick() {
            //산책 시작버튼 누르면 산책중 페이지로 이동
            console.log("버튼 클릭");
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
    pointer-events: none;
    overflow: hidden;
}

.overlay-card {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    z-index: 10;
    pointer-events: auto;
}

.overlay-button {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    z-index: 10;
    pointer-events: auto;
}
</style>
