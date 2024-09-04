<template>
    <div>
        <div id="map"></div>
        <div class="button-group">
            <button @click="changeSize(0)">Hide</button>
            <button @click="changeSize(400)">show</button>
        </div>
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
import { defaultPosition } from "./util/config";
import { toRaw } from "vue";
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
        initMapWithUserLocation() {
            getUserLocation(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    console.log("산책 페이지 현재 좌표: " + lat + ", " + lng);
                    this.map = initializeMap("map", lat, lng);

                    createMarker([lat, lng], markerImages.cafe(), this.map);
                },
                () => {
                    console.error("위치 정보를 가져올 수 없습니다.");
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
    height: 400px;
}

.button-group {
    margin: 10px 0px;
}

button {
    margin: 0 3px;
}
</style>
