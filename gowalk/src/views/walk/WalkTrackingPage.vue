<template>
    <div class="map-wrapper">
        <KakaoMap class="kakao-map" />
        <div class="overlay-container">
            <ExerciseCard :walk="walk" class="overlay-card" />
            <WalkEndButton @button-clicked="walkEnd" class="overlay-button" />
        </div>
    </div>
</template>

<script>
import KakaoMap from "@/views/walk/components/KakaoMap.vue";
import WalkEndButton from "@/views/walk/components/button/WalkEndButton.vue";
import ExerciseCard from "@/views/walk/components/cards/ExerciseCard.vue";

import walkData from "@/views/walk/sample/updateWalk.json";
import { mapActions } from "vuex";
// import { mapGetters, mapActions } from 'vuex';
export default {
    name: "WalkTrackingPage",
    components: {
        KakaoMap,
        ExerciseCard,
        WalkEndButton,
    },
    data() {
        return {
            walk: null,
            dogs: [],
        };
    },
    created() {
        this.walk = walkData;
    },
    methods: {
        ...mapActions("walkStore", ["stopWalk"]),
        walkEnd() {
            this.stopWalk();
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
