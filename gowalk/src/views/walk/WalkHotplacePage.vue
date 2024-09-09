<template>
    <div class="map-wrapper">
        <WalkMenuCompo />
        <KakaoMap :enable-hotplace="true" ref="kakaoMap" class="kakao-map" />
    </div>
</template>

<script>
import KakaoMap from "@/views/walk/components/KakaoMap.vue";
import WalkMenuCompo from "@/views/walk/components/WalkMenuCompo.vue";

export default {
    name: "WalkHotplacePage",
    components: {
        KakaoMap,
        WalkMenuCompo,
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
