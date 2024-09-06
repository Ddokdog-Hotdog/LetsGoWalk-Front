<template>
    <div>
        <div id="map"></div>
    </div>
</template>

<script>
import {
    loadKakaoMapScript,
    initializeMap,
    getUserLocation,
    markerImages,
    createMarker,
} from "@/views/walk/util/kakaoMap";
import { defaultPosition } from "@/views/walk/util/config";
import { toRaw } from "vue";
import { mapMutations } from "vuex";
export default {
    name: "KakaoMap",
    data() {
        return {
            map: null,
        };
    },
    mounted() {
        loadKakaoMapScript(this.initMapWithUserLocation);
    },
    methods: {
        ...mapMutations("walkStore", ["setCurLocation"]),
        initMapWithUserLocation() {
            getUserLocation(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    this.map = initializeMap("map", lat, lng);

                    createMarker([lat, lng], markerImages.cafe(), this.map);
                    console.log(`카카오맵 초기화 현재위치: ${lat}, ${lng} `);
                    this.setCurLocation({ lat, lng });
                },
                () => {
                    this.map = initializeMap("map", defaultPosition[0], defaultPosition[1]); // 기본 위치로 지도 초기화
                }
            );
        },
        changeSize(size) {
            const container = document.getElementById("map");
            container.style.width = "100%"; // 너비는 고정
            container.style.height = `${size}px`; // 높이만 변경
            toRaw(this.map).relayout(); // 지도 크기 재조정
        },
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>
