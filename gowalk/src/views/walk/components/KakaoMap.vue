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
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>
