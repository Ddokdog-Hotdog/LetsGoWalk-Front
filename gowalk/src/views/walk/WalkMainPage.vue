<template>
    <div>
        <TodayExerciseCard :walk-time="5402" :walk-distance="3.5" :calories="167" />
        <KakaoMap />
    </div>
</template>

<script>
import KakaoMap from "@/views/walk/KakaoMap.vue";
import TodayExerciseCard from "@/components/walk/TodayExerciseCard.vue";
export default {
    name: "WalkMainPage",
    components: {
        KakaoMap,
        TodayExerciseCard,
    },
};
</script>

<style></style>
